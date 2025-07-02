import React from "react";
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
import { Check, X } from "lucide-react";

interface PermissionTableProps {
  className?: string;
}

const PermissionsTable = ({ className }: PermissionTableProps) => {
  const permissions = [
    {
      module: "الموظفين",
      permission: "عرض قائمة الموظفين",
      employee: false,
      manager: true, // فقط الموظفين المباشرين
      admin: true,
      description: "المدير يرى فقط موظفيه المباشرين",
    },
    {
      module: "الموظفين",
      permission: "تعديل بيانات الموظفين",
      employee: false,
      manager: true, // فقط الموظفين المباشرين
      admin: true,
      description: "المدير يعدل فقط بيانات موظفيه المباشرين",
    },
    {
      module: "الموظفين",
      permission: "حذف الموظفين",
      employee: false,
      manager: false,
      admin: true,
      description: "فقط المدير العام يمكنه حذف الموظفين",
    },
    {
      module: "الحضور",
      permission: "تسجيل الحضور والانصراف",
      employee: true, // الخاص به فقط
      manager: true,
      admin: true,
      description: "الموظف يسجل حضوره فقط",
    },
    {
      module: "الحضور",
      permission: "عرض سجلات الحضور",
      employee: true, // الخاص به فقط
      manager: true, // فريقه فقط
      admin: true,
      description: "الموظف يرى حضوره، المدير يرى حضور فريقه",
    },
    {
      module: "الحضور",
      permission: "إدارة سجلات الحضور",
      employee: false,
      manager: true, // فريقه فقط
      admin: true,
      description: "تعديل وتصحيح سجلات الحضور",
    },
    {
      module: "الإجازات",
      permission: "تقديم طلب إجازة",
      employee: true,
      manager: true,
      admin: true,
      description: "الجميع يمكنهم تقديم طلبات إجازة",
    },
    {
      module: "الإجازات",
      permission: "عرض طلبات الإجازات",
      employee: true, // الخاصة به فقط
      manager: true, // فريقه فقط
      admin: true,
      description: "الموظف يرى طلباته، المدير يرى طلبات فريقه",
    },
    {
      module: "الإجازات",
      permission: "الموافقة/رفض الإجازات",
      employee: false,
      manager: true, // فريقه فقط
      admin: true,
      description: "المدير يوافق على إجازات فريقه",
    },
    {
      module: "المرتبات",
      permission: "عرض المرتبات",
      employee: true, // الخاص به فقط
      manager: false,
      admin: true,
      description: "الموظف يرى راتبه فقط",
    },
    {
      module: "المرتبات",
      permission: "إدارة المرتبات",
      employee: false,
      manager: false,
      admin: true,
      description: "فقط المدير العام يدير المرتبات",
    },
    {
      module: "المرتبات",
      permission: "تقديم طلب سلفة",
      employee: true,
      manager: true,
      admin: true,
      description: "الجميع يمكنهم طلب سلفة",
    },
    {
      module: "التقارير",
      permission: "عرض التقارير",
      employee: false,
      manager: true, // تقارير فريقه فقط
      admin: true,
      description: "المدير يرى تقارير فريقه",
    },
    {
      module: "المهام",
      permission: "عرض المهام",
      employee: true, // مهامه فقط
      manager: true, // مهام فريقه
      admin: true,
      description: "الموظف يرى مهامه، المدير يرى مهام فريقه",
    },
    {
      module: "المهام",
      permission: "إدارة المهام",
      employee: false,
      manager: true, // مهام فريقه
      admin: true,
      description: "تعيين وتعديل المهام",
    },
    {
      module: "الإعدادات",
      permission: "إدارة إعدادات النظام",
      employee: false,
      manager: false,
      admin: true,
      description: "فقط المدير العام يدير الإعدادات",
    },
    {
      module: "الإعدادات",
      permission: "إدارة المستخدمين",
      employee: false,
      manager: false,
      admin: true,
      description: "إضافة وتعديل وحذف المستخدمين",
    },
    {
      module: "التدريب",
      permission: "عرض برامج التدريب",
      employee: true, // التدريبات الخاصة به
      manager: true, // تدريبات فريقه
      admin: true,
      description: "الموظف يرى تدريباته، المدير يرى تدريبات فريقه",
    },
    {
      module: "التدريب",
      permission: "إدارة برامج التدريب",
      employee: false,
      manager: true, // لفريقه
      admin: true,
      description: "تسجيل الموظفين في برامج التدريب",
    },
    {
      module: "الصيانة",
      permission: "عرض طلبات الصيانة",
      employee: false,
      manager: true,
      admin: true,
      description: "عرض ومتابعة طلبات الصيانة",
    },
    {
      module: "الصيانة",
      permission: "إدارة طلبات الصيانة",
      employee: false,
      manager: false,
      admin: true,
      description: "الموافقة وتنفيذ طلبات الصيانة",
    },
  ];

  const renderPermissionIcon = (hasPermission: boolean) => {
    return hasPermission ? (
      <Check className="h-4 w-4 text-green-600" />
    ) : (
      <X className="h-4 w-4 text-red-600" />
    );
  };

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    },
    {} as Record<string, typeof permissions>,
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            جدول صلاحيات النظام
          </CardTitle>
          <div className="text-sm text-gray-600 text-center">
            توضيح الصلاحيات لكل نوع مستخدم في النظام
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right font-bold">الوحدة</TableHead>
                  <TableHead className="text-right font-bold">
                    الصلاحية
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      موظف
                    </Badge>
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      مدير مباشر
                    </Badge>
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      مدير النظام
                    </Badge>
                  </TableHead>
                  <TableHead className="text-right font-bold">
                    ملاحظات
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedPermissions).map(
                  ([module, modulePermissions]) =>
                    modulePermissions.map((permission, index) => (
                      <TableRow
                        key={`${module}-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">
                          {index === 0 ? (
                            <Badge variant="secondary" className="font-medium">
                              {module}
                            </Badge>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {permission.permission}
                        </TableCell>
                        <TableCell className="text-center">
                          {renderPermissionIcon(permission.employee)}
                        </TableCell>
                        <TableCell className="text-center">
                          {renderPermissionIcon(permission.manager)}
                        </TableCell>
                        <TableCell className="text-center">
                          {renderPermissionIcon(permission.admin)}
                        </TableCell>
                        <TableCell className="text-xs text-gray-600">
                          {permission.description}
                        </TableCell>
                      </TableRow>
                    )),
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ملخص الأدوار */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge className="bg-blue-500">موظف</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>ما يمكنه رؤيته:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>بياناته الشخصية فقط</li>
              <li>حضوره وانصرافه</li>
              <li>طلبات الإجازات الخاصة به</li>
              <li>راتبه ومستحقاته</li>
              <li>مهامه المسندة إليه</li>
              <li>برامج التدريب الخاصة به</li>
            </ul>
            <p className="mt-3">
              <strong>ما يمكنه تعديله:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>تسجيل الحضور والانصراف</li>
              <li>تقديم طلبات الإجازات</li>
              <li>تقديم طلبات السلف</li>
              <li>تقديم طلب الاستقالة</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge className="bg-green-500">مدير مباشر</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>ما يمكنه رؤيته:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>بيانات موظفيه المباشرين فقط</li>
              <li>حضور وانصراف فريقه</li>
              <li>طلبات إجازات فريقه</li>
              <li>تقارير أداء فريقه</li>
              <li>مهام فريقه</li>
              <li>برامج تدريب فريقه</li>
            </ul>
            <p className="mt-3">
              <strong>ما يمكنه تعديله:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>بيانات موظفيه المباشرين</li>
              <li>الموافقة/رفض إجازات فريقه</li>
              <li>تعديل سجلات حضور فريقه</li>
              <li>تعيين وإدارة مهام فريقه</li>
              <li>تسجيل فريقه في برامج التدريب</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge className="bg-purple-500">مدير النظام</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>ما يمكنه رؤيته:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>جميع بيانات النظام</li>
              <li>جميع الموظفين والمديرين</li>
              <li>جميع التقارير والإحصائيات</li>
              <li>جميع المرتبات والمستحقات</li>
              <li>إعدادات النظام</li>
            </ul>
            <p className="mt-3">
              <strong>ما يمكنه تعديله:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>إضافة وحذف وتعديل المستخدمين</li>
              <li>إدارة المرتبات والمستحقات</li>
              <li>إعدادات النظام العامة</li>
              <li>الموافقة على طلبات الصيانة</li>
              <li>إدارة الفروع والأقسام</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ملاحظات الأمان */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg text-orange-800">
            ملاحظات مهمة حول الأمان
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-orange-700 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>فصل البيانات:</strong> كل مستخدم يرى فقط البيانات المخصصة
              له حسب دوره
            </li>
            <li>
              <strong>التحقق من الصلاحيات:</strong> يتم التحقق من الصلاحيات في
              كل عملية
            </li>
            <li>
              <strong>تسجيل العمليات:</strong> جميع العمليات الحساسة يتم تسجيلها
            </li>
            <li>
              <strong>انتهاء الجلسات:</strong> الجلسات تنتهي تلقائياً بعد فترة
              عدم نشاط
            </li>
            <li>
              <strong>كلمات المرور:</strong> يجب تغيير كلمات المرور دورياً
            </li>
            <li>
              <strong>النسخ الاحتياطي:</strong> يتم عمل نسخ احتياطية منتظمة
              للبيانات
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionsTable;
