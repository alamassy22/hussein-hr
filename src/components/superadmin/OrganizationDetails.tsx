import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Users,
  Calendar,
  Activity,
  AlertTriangle,
  Trash2,
  Power,
  PowerOff,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Organization {
  id: string;
  name: string;
  created_at: string;
  is_active: boolean;
  user_count?: number;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in?: string;
}

interface OrganizationDetailsProps {
  organization: Organization;
  onBack: () => void;
  onUpdate: () => void;
}

const OrganizationDetails: React.FC<OrganizationDetailsProps> = ({
  organization,
  onBack,
  onUpdate,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showToggleDialog, setShowToggleDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      if (!supabase) {
        console.warn("Supabase client is not available");
        setUsers([]);
        return;
      }
      
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [organization.id]);

  const handleToggleStatus = async () => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("organizations")
        .update({ is_active: !organization.is_active })
        .eq("id", organization.id);

      if (error) throw error;

      alert(`تم ${organization.is_active ? "تعطيل" : "تفعيل"} المؤسسة بنجاح`);
      onUpdate();
    } catch (error: any) {
      console.error("Error toggling organization status:", error);
      alert(
        `خطأ في ${organization.is_active ? "تعطيل" : "تفعيل"} المؤسسة: ${error.message}`,
      );
    } finally {
      setActionLoading(false);
      setShowToggleDialog(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      // First, delete all users in the organization
      const { error: usersError } = await supabase
        .from("users")
        .delete()
        .eq("organization_id", organization.id);

      if (usersError) throw usersError;

      // Then delete the organization
      const { error: orgError } = await supabase
        .from("organizations")
        .delete()
        .eq("id", organization.id);

      if (orgError) throw orgError;

      alert("تم حذف المؤسسة بنجاح");
      onUpdate();
    } catch (error: any) {
      console.error("Error deleting organization:", error);
      alert(`خطأ في حذف المؤسسة: ${error.message}`);
    } finally {
      setActionLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "super_admin":
        return "مسؤول عام";
      case "org_admin":
        return "مدير المؤسسة";
      case "manager":
        return "مدير";
      case "employee":
        return "موظف";
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            العودة إلى القائمة
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {organization.name}
              </h1>
              <p className="text-gray-600 mt-2">
                تم التسجيل في{" "}
                {format(new Date(organization.created_at), "dd MMMM yyyy", {
                  locale: ar,
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowToggleDialog(true)}
                variant={organization.is_active ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {organization.is_active ? (
                  <>
                    <PowerOff size={16} />
                    تعطيل المؤسسة
                  </>
                ) : (
                  <>
                    <Power size={16} />
                    تفعيل المؤسسة
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                حذف المؤسسة
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                عدد المستخدمين
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                تاريخ التسجيل
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {format(new Date(organization.created_at), "dd/MM/yyyy")}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                حالة المؤسسة
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge
                variant={organization.is_active ? "default" : "secondary"}
                className={
                  organization.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {organization.is_active ? "نشطة" : "معطلة"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>المستخدمون التابعون للمؤسسة</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">جاري تحميل البيانات...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">لا يوجد مستخدمون في هذه المؤسسة</p>
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">
                        البريد الإلكتروني
                      </TableHead>
                      <TableHead className="text-right">الدور</TableHead>
                      <TableHead className="text-right">
                        تاريخ التسجيل
                      </TableHead>
                      <TableHead className="text-right">
                        آخر تسجيل دخول
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-right">
                          {user.full_name || "غير محدد"}
                        </TableCell>
                        <TableCell className="text-right">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">
                            {getRoleName(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {format(new Date(user.created_at), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          {user.last_sign_in
                            ? format(new Date(user.last_sign_in), "dd/MM/yyyy")
                            : "لم يسجل دخول"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Toggle Status Dialog */}
        <Dialog open={showToggleDialog} onOpenChange={setShowToggleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                تأكيد {organization.is_active ? "تعطيل" : "تفعيل"} المؤسسة
              </DialogTitle>
              <DialogDescription>
                هل أنت متأكد من {organization.is_active ? "تعطيل" : "تفعيل"}{" "}
                مؤسسة "{organization.name}"؟
                {organization.is_active &&
                  " سيؤدي هذا إلى منع جميع المستخدمين من الوصول إلى النظام."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={handleToggleStatus}
                disabled={actionLoading}
                variant={organization.is_active ? "destructive" : "default"}
              >
                {actionLoading
                  ? "جاري المعالجة..."
                  : `نعم، ${organization.is_active ? "تعطيل" : "تفعيل"} المؤسسة`}
              </Button>
              <Button
                onClick={() => setShowToggleDialog(false)}
                variant="outline"
                disabled={actionLoading}
              >
                إلغاء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                تأكيد حذف المؤسسة
              </DialogTitle>
              <DialogDescription>
                هل أنت متأكد من حذف مؤسسة "{organization.name}"؟
                <br />
                <strong className="text-red-600">
                  تحذير: سيتم حذف جميع البيانات والمستخدمين التابعين لهذه
                  المؤسسة نهائياً ولا يمكن التراجع عن هذا الإجراء.
                </strong>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={handleDelete}
                disabled={actionLoading}
                variant="destructive"
              >
                {actionLoading ? "جاري الحذف..." : "نعم، احذف المؤسسة"}
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(false)}
                variant="outline"
                disabled={actionLoading}
              >
                إلغاء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrganizationDetails;
