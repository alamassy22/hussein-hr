import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface OrganizationCreateProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface FormData {
  organizationName: string;
  managerName: string;
  managerEmail: string;
  password: string;
  isActive: boolean;
}

const OrganizationCreate: React.FC<OrganizationCreateProps> = ({
  onCancel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    managerName: "",
    managerEmail: "",
    password: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "اسم المؤسسة مطلوب";
    }

    if (!formData.managerName.trim()) {
      newErrors.managerName = "اسم المدير مطلوب";
    }

    if (!formData.managerEmail.trim()) {
      newErrors.managerEmail = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.managerEmail)) {
      newErrors.managerEmail = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Create organization
      const { data: organization, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: formData.organizationName,
          is_active: formData.isActive,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // 2. Create auth user for the manager
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.managerEmail,
        password: formData.password,
        options: {
          data: {
            full_name: formData.managerName,
            organization_id: organization.id,
          },
        },
      });

      if (authError) throw authError;

      // 3. Create user record in users table
      const { error: userError } = await supabase.from("users").insert({
        id: authData.user!.id,
        email: formData.managerEmail,
        full_name: formData.managerName,
        organization_id: organization.id,
        role: "org_admin",
      });

      if (userError) throw userError;

      // Success
      alert("تم إنشاء المؤسسة بنجاح!");
      onSuccess();
    } catch (error: any) {
      console.error("Error creating organization:", error);
      alert(`خطأ في إنشاء المؤسسة: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onCancel}
            variant="ghost"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            العودة
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            إضافة مؤسسة جديدة
          </h1>
          <p className="text-gray-600 mt-2">
            أدخل بيانات المؤسسة والمدير المسؤول
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>بيانات المؤسسة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <Label htmlFor="organizationName">اسم المؤسسة *</Label>
                <Input
                  id="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  placeholder="أدخل اسم المؤسسة"
                  className={errors.organizationName ? "border-red-500" : ""}
                />
                {errors.organizationName && (
                  <p className="text-red-500 text-sm">
                    {errors.organizationName}
                  </p>
                )}
              </div>

              {/* Manager Name */}
              <div className="space-y-2">
                <Label htmlFor="managerName">اسم المدير *</Label>
                <Input
                  id="managerName"
                  type="text"
                  value={formData.managerName}
                  onChange={(e) =>
                    handleInputChange("managerName", e.target.value)
                  }
                  placeholder="أدخل اسم المدير"
                  className={errors.managerName ? "border-red-500" : ""}
                />
                {errors.managerName && (
                  <p className="text-red-500 text-sm">{errors.managerName}</p>
                )}
              </div>

              {/* Manager Email */}
              <div className="space-y-2">
                <Label htmlFor="managerEmail">البريد الإلكتروني للمدير *</Label>
                <Input
                  id="managerEmail"
                  type="email"
                  value={formData.managerEmail}
                  onChange={(e) =>
                    handleInputChange("managerEmail", e.target.value)
                  }
                  placeholder="manager@example.com"
                  className={errors.managerEmail ? "border-red-500" : ""}
                />
                {errors.managerEmail && (
                  <p className="text-red-500 text-sm">{errors.managerEmail}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="أدخل كلمة المرور"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
                <Label htmlFor="isActive">المؤسسة نشطة</Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {loading ? "جاري الحفظ..." : "حفظ المؤسسة"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={loading}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationCreate;
