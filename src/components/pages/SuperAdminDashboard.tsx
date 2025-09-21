import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Users, Activity } from "lucide-react";
import OrganizationList from "../superadmin/OrganizationList";
import OrganizationCreate from "../superadmin/OrganizationCreate";
import OrganizationDetails from "../superadmin/OrganizationDetails";
import { supabase } from "@/lib/supabase";

interface Organization {
  id: string;
  name: string;
  created_at: string;
  is_active: boolean;
  user_count?: number;
}

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    activeOrganizations: 0,
    totalUsers: 0,
  });

  // Check if user is super admin
  if (user?.role !== "super_admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              غير مصرح
            </h2>
            <p className="text-gray-600">
              ليس لديك صلاحية للوصول إلى لوحة تحكم المسؤول العام
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fetchOrganizations = async () => {
    try {
      // Check if supabase is properly initialized
      if (!supabase) {
        console.warn('Supabase client is not initialized. Using mock data for super admin.');
        
        // Set mock data for super admin when Supabase is not configured
        const mockOrganizations = [
          {
            id: 'mock-org-1',
            name: 'مؤسسة تجريبية 1',
            created_at: new Date().toISOString(),
            is_active: true,
            user_count: 25
          },
          {
            id: 'mock-org-2', 
            name: 'مؤسسة تجريبية 2',
            created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            is_active: true,
            user_count: 15
          }
        ];
        
        setOrganizations(mockOrganizations);
        setStats({
          totalOrganizations: mockOrganizations.length,
          activeOrganizations: mockOrganizations.filter(org => org.is_active).length,
          totalUsers: mockOrganizations.reduce((sum, org) => sum + (org.user_count || 0), 0)
        });
        
        setLoading(false);
        return;
      }

      setLoading(true);

      // Fetch organizations with user count
      const { data: orgsData, error: orgsError } = await supabase.from(
        "organizations",
      ).select(`
          id,
          name,
          created_at,
          is_active,
          users(count)
        `);

      if (orgsError) throw orgsError;

      const organizationsWithCount =
        orgsData?.map((org) => ({
          ...org,
          user_count: org.users?.[0]?.count || 0,
        })) || [];

      setOrganizations(organizationsWithCount);

      // Calculate stats
      const totalOrgs = organizationsWithCount.length;
      const activeOrgs = organizationsWithCount.filter(
        (org) => org.is_active,
      ).length;
      const totalUsers = organizationsWithCount.reduce(
        (sum, org) => sum + (org.user_count || 0),
        0,
      );

      setStats({
        totalOrganizations: totalOrgs,
        activeOrganizations: activeOrgs,
        totalUsers,
      });
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleOrganizationCreated = () => {
    setShowCreateForm(false);
    fetchOrganizations();
  };

  const handleOrganizationUpdated = () => {
    fetchOrganizations();
    setSelectedOrganization(null);
  };

  if (selectedOrganization) {
    return (
      <OrganizationDetails
        organization={selectedOrganization}
        onBack={() => setSelectedOrganization(null)}
        onUpdate={handleOrganizationUpdated}
      />
    );
  }

  if (showCreateForm) {
    return (
      <OrganizationCreate
        onCancel={() => setShowCreateForm(false)}
        onSuccess={handleOrganizationCreated}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                لوحة تحكم المسؤول العام
              </h1>
              <p className="text-gray-600 mt-2">
                إدارة المؤسسات والمستخدمين في النظام
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              إضافة مؤسسة جديدة
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي المؤسسات
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalOrganizations}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                المؤسسات النشطة
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.activeOrganizations}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي المستخدمين
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Organizations List */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة المؤسسات</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationList
              organizations={organizations}
              loading={loading}
              onSelectOrganization={setSelectedOrganization}
              onRefresh={fetchOrganizations}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
