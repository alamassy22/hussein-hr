import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Calendar,
  Briefcase,
  Building2,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  GraduationCap,
  Flag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: "active" | "vacation" | "sick" | "absent";
  avatar: string;
  idNumber?: string;
  idExpiryDate?: string;
  nationality?: string;
  phone?: string;
  address?: string;
  salary?: number;
  email?: string;
  education?: string;
  birthDate?: string;
}

interface EmployeeDetailsProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (employee: Employee) => void;
  onPrint: (employee: Employee) => void;
}

const statusText = {
  active: "يعمل",
  vacation: "إجازة",
  sick: "مرضي",
  absent: "غائب",
};

const statusColors = {
  active: "bg-green-100 text-green-700",
  vacation: "bg-blue-100 text-blue-700",
  sick: "bg-amber-100 text-amber-700",
  absent: "bg-red-100 text-red-700",
};

const EmployeeDetails = ({
  employee,
  open,
  onOpenChange,
  onEdit,
  onPrint,
}: EmployeeDetailsProps) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">بيانات الموظف</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-gray-500">{employee.position}</p>
          <div className="mt-2">
            <span
              className={`text-xs px-3 py-1 rounded-full ${statusColors[employee.status]}`}
            >
              {statusText[employee.status]}
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-50">
              <Briefcase className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">المنصب</p>
              <p className="font-medium">{employee.position}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-50">
              <Building2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">القسم</p>
              <p className="font-medium">{employee.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-50">
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">تاريخ التعيين</p>
              <p className="font-medium">{employee.joinDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-50">
              <BadgeCheck className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">الرقم الوظيفي</p>
              <p className="font-medium">{employee.id}</p>
            </div>
          </div>

          {employee.idNumber && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-indigo-50">
                <User className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">رقم الهوية</p>
                <p className="font-medium">{employee.idNumber}</p>
              </div>
            </div>
          )}

          {employee.idExpiryDate && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-50">
                <Calendar className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">تاريخ انتهاء الهوية</p>
                <p className="font-medium">{employee.idExpiryDate}</p>
              </div>
            </div>
          )}

          {employee.nationality && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-sky-50">
                <Building2 className="h-5 w-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">الجنسية</p>
                <p className="font-medium">{employee.nationality}</p>
              </div>
            </div>
          )}

          {employee.phone && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-teal-50">
                <User className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">رقم الهاتف</p>
                <p className="font-medium">{employee.phone}</p>
              </div>
            </div>
          )}

          {employee.address && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-50">
                <Building2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">العنوان</p>
                <p className="font-medium">{employee.address}</p>
              </div>
            </div>
          )}

          {employee.salary !== undefined && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-50">
                <Briefcase className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">الراتب</p>
                <p className="font-medium">{employee.salary} ريال</p>
              </div>
            </div>
          )}

          {employee.email && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-50">
                <User className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-medium">{employee.email}</p>
              </div>
            </div>
          )}

          {employee.education && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-rose-50">
                <BadgeCheck className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">المؤهل التعليمي</p>
                <p className="font-medium">{employee.education}</p>
              </div>
            </div>
          )}

          {employee.birthDate && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-pink-50">
                <Calendar className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">تاريخ الميلاد</p>
                <p className="font-medium">{employee.birthDate}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onPrint(employee)}>
              طباعة البيانات
            </Button>
            <Button onClick={() => onEdit(employee)}>تعديل البيانات</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetails;
