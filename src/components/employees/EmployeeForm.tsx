import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface EmployeeFormData {
  id?: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: "active" | "vacation" | "sick" | "absent";
  avatar?: string;
  idNumber?: string;
  idExpiryDate?: string;
  nationality?: string;
  phone?: string;
  address?: string;
  salary?: number;
  email?: string;
  education?: string;
  birthDate?: string;
  employeeId?: string;
  workLocation?: string;
}

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EmployeeFormData) => void;
  initialData?: EmployeeFormData;
  isEditing?: boolean;
}

const defaultEmployee: EmployeeFormData = {
  name: "",
  position: "",
  department: "",
  joinDate: new Date().toISOString().split("T")[0],
  status: "active",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(7)}`,
  idNumber: "",
  idExpiryDate: "",
  nationality: "سعودي",
  phone: "",
  address: "",
  salary: 0,
  email: "",
  education: "",
  birthDate: "",
  employeeId: "",
  workLocation: "",
};

const EmployeeForm = ({
  open,
  onOpenChange,
  onSubmit,
  initialData = defaultEmployee,
  isEditing = false,
}: EmployeeFormProps) => {
  const [formData, setFormData] = React.useState<EmployeeFormData>(initialData);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">
            {isEditing ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الموظف</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسم الموظف"
                required
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">المنصب</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="أدخل المنصب الوظيفي"
                required
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">القسم</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  handleSelectChange("department", value)
                }
              >
                <SelectTrigger id="department" className="text-right">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="تقنية المعلومات">
                    تقنية المعلومات
                  </SelectItem>
                  <SelectItem value="المالية">المالية</SelectItem>
                  <SelectItem value="الموارد البشرية">
                    الموارد البشرية
                  </SelectItem>
                  <SelectItem value="المبيعات">المبيعات</SelectItem>
                  <SelectItem value="التسويق">التسويق</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">رقم الهوية</Label>
              <Input
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="أدخل رقم الهوية"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idExpiryDate">تاريخ انتهاء الهوية</Label>
              <Input
                id="idExpiryDate"
                name="idExpiryDate"
                type="date"
                value={formData.idExpiryDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">الجنسية</Label>
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="أدخل الجنسية"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="أدخل رقم الهاتف"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="أدخل العنوان"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">الراتب</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={formData.salary?.toString() || ""}
                onChange={handleChange}
                placeholder="أدخل الراتب"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="أدخل البريد الإلكتروني"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">المؤهل التعليمي</Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="أدخل المؤهل التعليمي"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">الرقم الوظيفي</Label>
              <Input
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="أدخل الرقم الوظيفي"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workLocation">موقع العمل</Label>
              <Input
                id="workLocation"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                placeholder="أدخل موقع العمل"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">تاريخ الميلاد</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">تاريخ التعيين</Label>
              <Input
                id="joinDate"
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleSelectChange("status", value as any)
                }
              >
                <SelectTrigger id="status" className="text-right">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">يعمل</SelectItem>
                  <SelectItem value="vacation">إجازة</SelectItem>
                  <SelectItem value="sick">مرضي</SelectItem>
                  <SelectItem value="absent">غائب</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button type="submit">
              {isEditing ? "حفظ التغييرات" : "إضافة الموظف"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
