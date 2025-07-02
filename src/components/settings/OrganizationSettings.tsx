import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, inviteUserToOrganization } from "@/lib/supabase";
import {
  AlertCircle,
  UserPlus,
  Users,
  Building,
  PlusCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrganizationSettings = () => {
  const { user, organization, refreshUser } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [orgLogo, setOrgLogo] = useState<File | null>(null);
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orgUsers, setOrgUsers] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<
    "org_admin" | "manager" | "employee"
  >("employee");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  useEffect(() => {
    if (organization) {
      setOrgName(organization.name);
      setOrgLogoUrl(organization.logo_url || "");
      fetchOrgUsers();
    }
  }, [organization]);

  const fetchOrgUsers = async () => {
    if (!organization) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("organization_id", organization.id);

      if (error) throw error;
      setOrgUsers(data || []);
    } catch (err) {
      console.error("Error fetching organization users:", err);
    }
  };

  const handleUpdateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let logoUrl = organization.logo_url;

      // Upload logo if changed
      if (orgLogo) {
        const fileExt = orgLogo.name.split(".").pop();
        const fileName = `${organization.id}-logo.${fileExt}`;
        const filePath = `organization-logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("public")
          .upload(filePath, orgLogo, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("public").getPublicUrl(filePath);
        logoUrl = data.publicUrl;
      }

      // Update organization
      const { error } = await supabase
        .from("organizations")
        .update({
          name: orgName,
          logo_url: logoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", organization.id);

      if (error) throw error;

      setSuccess("تم تحديث بيانات المؤسسة بنجاح");
      refreshUser(); // Refresh user to get updated organization data
    } catch (err: any) {
      console.error("Error updating organization:", err);
      setError(err.message || "حدث خطأ أثناء تحديث بيانات المؤسسة");
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;

    setInviteLoading(true);
    setError("");
    setSuccess("");

    try {
      await inviteUserToOrganization(inviteEmail, inviteRole, organization.id);
      setSuccess(`تم إرسال دعوة إلى ${inviteEmail} بنجاح`);
      setInviteEmail("");
      setInviteRole("employee");
    } catch (err: any) {
      console.error("Error inviting user:", err);
      setError(err.message || "حدث خطأ أثناء إرسال الدعوة");
    } finally {
      setInviteLoading(false);
    }
  };

  const handleAddUser = async (userData: any) => {
    setError("");
    setSuccess("");

    try {
      // In a real app, you would call an API to create the user
      // For now, we'll just add it to the local state
      setOrgUsers([...orgUsers, userData]);
      setSuccess(`تم إضافة المستخدم ${userData.full_name} بنجاح`);
      setShowUserForm(false);
    } catch (err: any) {
      console.error("Error adding user:", err);
      setError(err.message || "حدث خطأ أثناء إضافة المستخدم");
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleUpdateUser = async (userData: any) => {
    setError("");
    setSuccess("");

    try {
      // In a real app, you would call an API to update the user
      // For now, we'll just update the local state
      const updatedUsers = orgUsers.map((user) =>
        user.id === userData.id ? { ...user, ...userData } : user,
      );
      setOrgUsers(updatedUsers);
      setSuccess(`تم تحديث بيانات المستخدم ${userData.full_name} بنجاح`);
      setShowUserForm(false);
      setEditingUser(null);
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message || "حدث خطأ أثناء تحديث بيانات المستخدم");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOrgLogo(e.target.files[0]);
      setOrgLogoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Only org admins can access this page
  if (user?.role !== "org_admin" && user?.role !== "super_admin") {
    return (
      <Card className="border shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            إعدادات المؤسسة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              ليس لديك صلاحية للوصول إلى هذه الصفحة
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">إعدادات المؤسسة</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="organization" dir="rtl">
          <TabsList className="mb-4">
            <TabsTrigger value="organization">
              <Building className="ml-2 h-4 w-4" />
              المؤسسة
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="ml-2 h-4 w-4" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="invite">
              <UserPlus className="ml-2 h-4 w-4" />
              دعوة مستخدم
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="organization">
            <form onSubmit={handleUpdateOrg} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-right block">
                  اسم المؤسسة
                </Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgLogo" className="text-right block">
                  شعار المؤسسة
                </Label>
                <div className="flex items-center gap-4">
                  {orgLogoUrl && (
                    <div className="h-16 w-16 rounded-md overflow-hidden border">
                      <img
                        src={orgLogoUrl}
                        alt="شعار المؤسسة"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <Input
                    id="orgLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">المستخدمين</h3>
                <Button
                  onClick={() => {
                    setEditingUser(null);
                    setShowUserForm(true);
                  }}
                >
                  <PlusCircle className="ml-2 h-4 w-4" />
                  إضافة مستخدم
                </Button>
              </div>

              {showUserForm ? (
                <UserForm
                  onSubmit={editingUser ? handleUpdateUser : handleAddUser}
                  onCancel={() => {
                    setShowUserForm(false);
                    setEditingUser(null);
                  }}
                  initialData={editingUser}
                  isEditing={!!editingUser}
                />
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="p-2 text-right">البريد الإلكتروني</th>
                        <th className="p-2 text-right">الاسم</th>
                        <th className="p-2 text-right">الدور</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">{user.full_name || "-"}</td>
                          <td className="p-2">
                            {user.role === "super_admin"
                              ? "مدير النظام"
                              : user.role === "org_admin"
                                ? "مدير المؤسسة"
                                : user.role === "manager"
                                  ? "مدير"
                                  : "موظف"}
                          </td>
                          <td className="p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              تعديل
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {orgUsers.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-4 text-center text-gray-500"
                          >
                            لا يوجد مستخدمين
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="invite">
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail" className="text-right block">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="أدخل البريد الإلكتروني للمستخدم"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteRole" className="text-right block">
                  الدور
                </Label>
                <Select
                  value={inviteRole}
                  onValueChange={(value: any) => setInviteRole(value)}
                >
                  <SelectTrigger className="text-right" dir="rtl">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="org_admin">مدير المؤسسة</SelectItem>
                    <SelectItem value="manager">مدير</SelectItem>
                    <SelectItem value="employee">موظف</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={inviteLoading}>
                  {inviteLoading ? "جاري إرسال الدعوة..." : "إرسال دعوة"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrganizationSettings;
