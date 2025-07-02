import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, User } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface UserFormProps {
  onSubmit: (userData: {
    username: string;
    password: string;
    fullName: string;
    email: string;
    role: string;
    permissions: Permission[];
  }) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    role: "user",
  });

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "canViewEmployees",
      name: "عرض الموظفين",
      description: "إمكانية عرض بيانات الموظفين",
      enabled: false,
    },
    {
      id: "canEditEmployees",
      name: "تعديل الموظفين",
      description: "إمكانية تعديل بيانات الموظفين",
      enabled: false,
    },
    {
      id: "canDeleteEmployees",
      name: "حذف الموظفين",
      description: "إمكانية حذف بيانات الموظفين",
      enabled: false,
    },
    {
      id: "canViewAttendance",
      name: "عرض الحضور",
      description: "إمكانية عرض سجلات الحضور",
      enabled: false,
    },
    {
      id: "canManageAttendance",
      name: "إدارة الحضور",
      description: "إمكانية إدارة سجلات الحضور",
      enabled: false,
    },
    {
      id: "canCheckAttendance",
      name: "تسجيل الحضور والانصراف",
      description: "إمكانية تسجيل الحضور والانصراف",
      enabled: false,
    },
    {
      id: "canViewLeaves",
      name: "عرض الإجازات",
      description: "إمكانية عرض طلبات الإجازات",
      enabled: false,
    },
    {
      id: "canManageLeaves",
      name: "إدارة الإجازات",
      description: "إمكانية إدارة طلبات الإجازات",
      enabled: false,
    },
    {
      id: "canSubmitLeave",
      name: "تقديم طلب إجازة",
      description: "إمكانية تقديم طلب إجازة",
      enabled: false,
    },
    {
      id: "canViewPayroll",
      name: "عرض المرتبات",
      description: "إمكانية عرض بيانات المرتبات",
      enabled: false,
    },
    {
      id: "canManagePayroll",
      name: "إدارة المرتبات",
      description: "إمكانية إدارة المرتبات",
      enabled: false,
    },
    {
      id: "canSubmitAdvance",
      name: "تقديم طلب سلفة",
      description: "إمكانية تقديم طلب سلفة",
      enabled: false,
    },
    {
      id: "canSubmitResignation",
      name: "تقديم استقالة",
      description: "إمكانية تقديم طلب استقالة",
      enabled: false,
    },
    {
      id: "canViewReports",
      name: "عرض التقارير",
      description: "إمكانية عرض التقارير",
      enabled: false,
    },
    {
      id: "canManageSettings",
      name: "إدارة الإعدادات",
      description: "إمكانية إدارة إعدادات النظام",
      enabled: false,
    },
    {
      id: "canViewTasks",
      name: "عرض المهام",
      description: "إمكانية عرض المهام",
      enabled: false,
    },
    {
      id: "canManageTasks",
      name: "إدارة المهام",
      description: "إمكانية إدارة المهام",
      enabled: false,
    },
    {
      id: "canViewMaintenance",
      name: "عرض الصيانة",
      description: "إمكانية عرض طلبات الصيانة",
      enabled: false,
    },
    {
      id: "canManageMaintenance",
      name: "إدارة الصيانة",
      description: "إمكانية إدارة طلبات الصيانة",
      enabled: false,
    },
    {
      id: "canViewVehicles",
      name: "عرض السيارات",
      description: "إمكانية عرض بيانات السيارات",
      enabled: false,
    },
    {
      id: "canManageVehicles",
      name: "إدارة السيارات",
      description: "إمكانية إدارة بيانات السيارات",
      enabled: false,
    },
    {
      id: "canViewRecruitment",
      name: "عرض التوظيف",
      description: "إمكانية عرض بيانات التوظيف",
      enabled: false,
    },
    {
      id: "canManageRecruitment",
      name: "إدارة التوظيف",
      description: "إمكانية إدارة عمليات التوظيف",
      enabled: false,
    },
    {
      id: "canViewTraining",
      name: "عرض التدريب",
      description: "إمكانية عرض برامج التدريب",
      enabled: false,
    },
    {
      id: "canManageTraining",
      name: "إدارة التدريب",
      description: "إمكانية إدارة برامج التدريب",
      enabled: false,
    },
  ]);

  const [filteredPermissions, setFilteredPermissions] =
    useState<Permission[]>(permissions);

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
  }>({});

  // تحديث الصلاحيات المعروضة عند تغيير الدور الوظيفي
  useEffect(() => {
    const getPermissionsForRole = (role: string) => {
      const rolePermissions = {
        employee: [
          "canCheckAttendance",
          "canViewAttendance",
          "canViewLeaves",
          "canSubmitLeave",
          "canViewPayroll",
          "canSubmitAdvance",
          "canSubmitResignation",
          "canViewTasks",
          "canViewTraining",
        ],
        manager: [
          "canViewEmployees",
          "canEditEmployees",
          "canViewAttendance",
          "canManageAttendance",
          "canCheckAttendance",
          "canViewLeaves",
          "canManageLeaves",
          "canSubmitLeave",
          "canSubmitAdvance",
          "canSubmitResignation",
          "canViewReports",
          "canViewTasks",
          "canManageTasks",
          "canViewMaintenance",
          "canViewVehicles",
          "canViewRecruitment",
          "canViewTraining",
          "canManageTraining",
        ],
        org_admin: permissions.map((p) => p.id),
        super_admin: permissions.map((p) => p.id),
        admin: permissions.map((p) => p.id),
      };

      const allowedPermissions = rolePermissions[role] || [];

      return permissions.map((permission) => ({
        ...permission,
        enabled: allowedPermissions.includes(permission.id),
      }));
    };

    const updatedPermissions = getPermissionsForRole(userData.role);
    setPermissions(updatedPermissions);
    setFilteredPermissions(updatedPermissions);
  }, [userData.role]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const togglePermission = (id: string) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === id
          ? { ...permission, enabled: !permission.enabled }
          : permission,
      ),
    );
  };

  const validateForm = () => {
    const newErrors: {
      username?: string;
      password?: string;
      confirmPassword?: string;
      email?: string;
    } = {};

    if (!userData.username) {
      newErrors.username = "اسم المستخدم مطلوب";
    }

    if (!userData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (userData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    if (userData.email && !/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        username: userData.username,
        password: userData.password,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        permissions: permissions.filter((p) => p.enabled),
      });
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 overflow-y-auto flex-grow pr-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="username">
              اسم المستخدم <span className="text-destructive">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="أدخل اسم المستخدم"
              value={userData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">الاسم الكامل</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="أدخل الاسم الكامل"
              value={userData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              كلمة المرور <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={userData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              تأكيد كلمة المرور <span className="text-destructive">*</span>
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="أدخل تأكيد كلمة المرور"
              value={userData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              value={userData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">الدور الوظيفي</Label>
            <select
              id="role"
              name="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={userData.role}
              onChange={handleInputChange}
            >
              <option value="admin">مدير النظام</option>
              <option value="manager">مدير</option>
              <option value="user">مستخدم</option>
              <option value="employee">موظف</option>
            </select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">الصلاحيات التفصيلية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPermissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-start space-x-2 space-x-reverse"
              >
                <input
                  type="checkbox"
                  id={permission.id}
                  checked={permission.enabled}
                  onChange={() => togglePermission(permission.id)}
                  className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label
                    htmlFor={permission.id}
                    className="text-sm font-medium"
                  >
                    {permission.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      <div className="sticky bottom-0 pt-4 mt-4 bg-background border-t flex justify-end space-x-2 space-x-reverse">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          حفظ المستخدم
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
