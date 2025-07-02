import React, { useState, useEffect } from "react";
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
import { Employee } from "../employees/EmployeesList";
import { Plus, Trash2, Save, Printer } from "lucide-react";

export interface PayrollEmployee {
  id: string;
  employeeId: string;
  name: string;
  position: string;
  baseSalary: number;
  deductions: number;
  advances: number;
  netSalary: number;
  attendanceDeductions?: number;
  workHours?: {
    totalWorkDays: number;
    actualWorkDays: number;
    absentDays: number;
    lateHours: number;
    startTime: string;
    endTime: string;
  };
}

export interface PayrollData {
  id: string;
  title: string;
  month: string;
  year: string;
  date: string;
  status: "draft" | "approved" | "paid";
  employees: PayrollEmployee[];
  totalAmount: number;
}

interface PayrollFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PayrollData) => void;
  initialData?: PayrollData;
  isEditing?: boolean;
}

// Sample employee data with salary information
const employeesWithSalary: (Employee & {
  baseSalary: number;
  deductions: number;
  advances: number;
  workHours?: {
    totalWorkDays: number;
    actualWorkDays: number;
    absentDays: number;
    lateHours: number;
    startTime: string;
    endTime: string;
  };
})[] = [
  {
    id: "1",
    name: "أحمد محمد",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "15/03/2022",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee1",
    baseSalary: 12000,
    deductions: 500,
    advances: 1000,
    workHours: {
      totalWorkDays: 22,
      actualWorkDays: 20,
      absentDays: 2,
      lateHours: 3,
      startTime: "08:00",
      endTime: "16:00",
    },
  },
  {
    id: "2",
    name: "سارة أحمد",
    position: "محاسب",
    department: "المالية",
    joinDate: "10/05/2021",
    status: "vacation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee2",
    baseSalary: 9000,
    deductions: 300,
    advances: 0,
    workHours: {
      totalWorkDays: 22,
      actualWorkDays: 22,
      absentDays: 0,
      lateHours: 1,
      startTime: "09:00",
      endTime: "17:00",
    },
  },
  {
    id: "3",
    name: "محمد علي",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "22/01/2023",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee3",
    baseSalary: 15000,
    deductions: 700,
    advances: 2000,
    workHours: {
      totalWorkDays: 22,
      actualWorkDays: 19,
      absentDays: 3,
      lateHours: 2,
      startTime: "07:30",
      endTime: "15:30",
    },
  },
  {
    id: "4",
    name: "فاطمة محمد",
    position: "مسؤول موارد بشرية",
    department: "الموارد البشرية",
    joinDate: "03/08/2022",
    status: "sick",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee4",
    baseSalary: 10000,
    deductions: 400,
    advances: 500,
    workHours: {
      totalWorkDays: 22,
      actualWorkDays: 21,
      absentDays: 1,
      lateHours: 0,
      startTime: "08:00",
      endTime: "16:00",
    },
  },
  {
    id: "5",
    name: "خالد عبدالله",
    position: "مصمم جرافيك",
    department: "التسويق",
    joinDate: "17/11/2021",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee5",
    baseSalary: 8500,
    deductions: 250,
    advances: 1500,
    workHours: {
      totalWorkDays: 22,
      actualWorkDays: 20,
      absentDays: 2,
      lateHours: 4,
      startTime: "08:30",
      endTime: "16:30",
    },
  },
];

const months = [
  { value: "01", label: "يناير" },
  { value: "02", label: "فبراير" },
  { value: "03", label: "مارس" },
  { value: "04", label: "أبريل" },
  { value: "05", label: "مايو" },
  { value: "06", label: "يونيو" },
  { value: "07", label: "يوليو" },
  { value: "08", label: "أغسطس" },
  { value: "09", label: "سبتمبر" },
  { value: "10", label: "أكتوبر" },
  { value: "11", label: "نوفمبر" },
  { value: "12", label: "ديسمبر" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) =>
  (currentYear - 2 + i).toString(),
);

const PayrollForm = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}: PayrollFormProps) => {
  const [formData, setFormData] = useState<PayrollData>({
    id: initialData?.id || `${Date.now()}`,
    title: initialData?.title || "",
    month:
      initialData?.month || new Date().getMonth().toString().padStart(2, "0"),
    year: initialData?.year || new Date().getFullYear().toString(),
    date: initialData?.date || new Date().toISOString().split("T")[0],
    status: initialData?.status || "draft",
    employees: initialData?.employees || [],
    totalAmount: initialData?.totalAmount || 0,
  });

  const [availableEmployees, setAvailableEmployees] = useState<
    typeof employeesWithSalary
  >([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

  useEffect(() => {
    // Filter out employees that are already added to the payroll
    const addedEmployeeIds = formData.employees.map((emp) => emp.employeeId);
    const filteredEmployees = employeesWithSalary.filter(
      (emp) => !addedEmployeeIds.includes(emp.id),
    );
    setAvailableEmployees(filteredEmployees);
  }, [formData.employees]);

  const calculateTotalAmount = (employees: PayrollEmployee[]) => {
    return employees.reduce((total, emp) => total + emp.netSalary, 0);
  };

  const handleAddEmployee = () => {
    if (!selectedEmployeeId) return;

    const selectedEmployee = employeesWithSalary.find(
      (emp) => emp.id === selectedEmployeeId,
    );

    if (selectedEmployee) {
      // Calculate attendance deductions
      const dailyRate =
        selectedEmployee.baseSalary /
        (selectedEmployee.workHours?.totalWorkDays || 22);
      const absentDeduction =
        (selectedEmployee.workHours?.absentDays || 0) * dailyRate;
      const lateHourRate = dailyRate / 8; // Assuming 8 hour workday
      const lateDeduction =
        (selectedEmployee.workHours?.lateHours || 0) * lateHourRate;
      const attendanceDeductions = absentDeduction + lateDeduction;

      const netSalary =
        selectedEmployee.baseSalary -
        selectedEmployee.deductions -
        selectedEmployee.advances -
        attendanceDeductions;

      const newPayrollEmployee: PayrollEmployee = {
        id: `${Date.now()}-${selectedEmployee.id}`,
        employeeId: selectedEmployee.id,
        name: selectedEmployee.name,
        position: selectedEmployee.position,
        baseSalary: selectedEmployee.baseSalary,
        deductions: selectedEmployee.deductions,
        advances: selectedEmployee.advances,
        attendanceDeductions: attendanceDeductions,
        workHours: selectedEmployee.workHours,
        netSalary: netSalary,
      };

      const updatedEmployees = [...formData.employees, newPayrollEmployee];
      const totalAmount = calculateTotalAmount(updatedEmployees);

      setFormData({
        ...formData,
        employees: updatedEmployees,
        totalAmount,
      });

      setSelectedEmployeeId("");
    }
  };

  const handleRemoveEmployee = (id: string) => {
    const updatedEmployees = formData.employees.filter((emp) => emp.id !== id);
    const totalAmount = calculateTotalAmount(updatedEmployees);

    setFormData({
      ...formData,
      employees: updatedEmployees,
      totalAmount,
    });
  };

  const handleUpdateEmployeeData = (
    id: string,
    field: string,
    value: number,
  ) => {
    const updatedEmployees = formData.employees.map((emp) => {
      if (emp.id === id) {
        const updatedEmp = { ...emp, [field]: value };
        // Recalculate net salary including attendance deductions
        updatedEmp.netSalary =
          updatedEmp.baseSalary -
          updatedEmp.deductions -
          updatedEmp.advances -
          (updatedEmp.attendanceDeductions || 0);
        return updatedEmp;
      }
      return emp;
    });

    const totalAmount = calculateTotalAmount(updatedEmployees);

    setFormData({
      ...formData,
      employees: updatedEmployees,
      totalAmount,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "تعديل مسير الرواتب" : "إضافة مسير رواتب جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان مسير الرواتب</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="مسير رواتب شهر ..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">الشهر</Label>
              <Select
                value={formData.month}
                onValueChange={(value) =>
                  setFormData({ ...formData, month: value })
                }
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="اختر الشهر" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">السنة</Label>
              <Select
                value={formData.year}
                onValueChange={(value) =>
                  setFormData({ ...formData, year: value })
                }
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">الموظفين المضافين للمسير</h3>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedEmployeeId}
                  onValueChange={setSelectedEmployeeId}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="اختر موظف لإضافته" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEmployees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} - {emp.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddEmployee}
                  disabled={!selectedEmployeeId}
                >
                  <Plus size={16} className="ml-1" />
                  إضافة
                </Button>
              </div>
            </div>

            {formData.employees.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-right">
                      <th className="p-2 border">الاسم</th>
                      <th className="p-2 border">المنصب</th>
                      <th className="p-2 border">الراتب الأساسي</th>
                      <th className="p-2 border">الخصومات</th>
                      <th className="p-2 border">السلف</th>
                      <th className="p-2 border">خصومات الحضور</th>
                      <th className="p-2 border">أيام العمل</th>
                      <th className="p-2 border">صافي الراتب</th>
                      <th className="p-2 border">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.employees.map((emp) => (
                      <tr key={emp.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 border">{emp.name}</td>
                        <td className="p-2 border">{emp.position}</td>
                        <td className="p-2 border">
                          <Input
                            type="number"
                            value={emp.baseSalary}
                            onChange={(e) =>
                              handleUpdateEmployeeData(
                                emp.id,
                                "baseSalary",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="h-8 text-left"
                          />
                        </td>
                        <td className="p-2 border">
                          <Input
                            type="number"
                            value={emp.deductions}
                            onChange={(e) =>
                              handleUpdateEmployeeData(
                                emp.id,
                                "deductions",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="h-8 text-left"
                          />
                        </td>
                        <td className="p-2 border">
                          <Input
                            type="number"
                            value={emp.advances}
                            onChange={(e) =>
                              handleUpdateEmployeeData(
                                emp.id,
                                "advances",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="h-8 text-left"
                          />
                        </td>
                        <td className="p-2 border font-medium text-left">
                          {(emp.attendanceDeductions || 0).toLocaleString()} ر.س
                          {emp.workHours && (
                            <div className="text-xs text-gray-500 mt-1">
                              غياب: {emp.workHours.absentDays} يوم | تأخير:{" "}
                              {emp.workHours.lateHours} ساعة
                            </div>
                          )}
                        </td>
                        <td className="p-2 border">
                          {emp.workHours ? (
                            <div className="text-sm">
                              <div>
                                {emp.workHours.actualWorkDays} /{" "}
                                {emp.workHours.totalWorkDays}
                              </div>
                              <div className="text-xs text-gray-500">
                                {emp.workHours.startTime} -{" "}
                                {emp.workHours.endTime}
                              </div>
                            </div>
                          ) : (
                            "غير متوفر"
                          )}
                        </td>
                        <td className="p-2 border font-medium text-left">
                          {emp.netSalary.toLocaleString()} ر.س
                        </td>
                        <td className="p-2 border">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEmployee(emp.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                      <td colSpan={7} className="p-2 border text-left">
                        الإجمالي
                      </td>
                      <td className="p-2 border text-left">
                        {formData.totalAmount.toLocaleString()} ر.س
                      </td>
                      <td className="p-2 border"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                لم يتم إضافة أي موظفين بعد. قم باختيار موظف من القائمة وإضافته
                للمسير.
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                إلغاء
              </Button>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline">
                <Printer size={16} className="ml-1" />
                طباعة
              </Button>
              <Button type="submit">
                <Save size={16} className="ml-1" />
                {isEditing ? "تحديث" : "حفظ"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PayrollForm;
