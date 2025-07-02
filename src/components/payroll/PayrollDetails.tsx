import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PayrollData } from "./PayrollForm";
import { Printer, Pencil, CheckCircle, Clock, CreditCard } from "lucide-react";

interface PayrollDetailsProps {
  payroll: PayrollData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (payroll: PayrollData) => void;
  onPrint: (payroll: PayrollData) => void;
}

const statusColors = {
  draft: "bg-amber-100 text-amber-700",
  approved: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
};

const statusText = {
  draft: "مسودة",
  approved: "معتمد",
  paid: "مدفوع",
};

const statusIcons = {
  draft: <Clock className="h-4 w-4 ml-1" />,
  approved: <CheckCircle className="h-4 w-4 ml-1" />,
  paid: <CreditCard className="h-4 w-4 ml-1" />,
};

const PayrollDetails = ({
  payroll,
  open,
  onOpenChange,
  onEdit,
  onPrint,
}: PayrollDetailsProps) => {
  if (!payroll) return null;

  const monthNames = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  const monthIndex = parseInt(payroll.month) - 1;
  const monthName = monthNames[monthIndex];

  const totalBaseSalary = payroll.employees.reduce(
    (sum, emp) => sum + emp.baseSalary,
    0,
  );
  const totalDeductions = payroll.employees.reduce(
    (sum, emp) => sum + emp.deductions,
    0,
  );
  const totalAdvances = payroll.employees.reduce(
    (sum, emp) => sum + emp.advances,
    0,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">تفاصيل مسير الرواتب</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-bold">{payroll.title}</h3>
              <p className="text-gray-500">
                شهر {monthName} {payroll.year}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span
                className={`text-sm px-3 py-1 rounded-full flex items-center ${statusColors[payroll.status]}`}
              >
                {statusIcons[payroll.status]}
                {statusText[payroll.status]}
              </span>
              <p className="text-gray-500 mt-1">
                تاريخ الإنشاء:{" "}
                {new Date(payroll.date).toLocaleDateString("ar-SA")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">عدد الموظفين</p>
              <p className="text-xl font-bold">{payroll.employees.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">إجمالي الرواتب</p>
              <p className="text-xl font-bold">
                {totalBaseSalary.toLocaleString()} ر.س
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">إجمالي الخصومات والسلف</p>
              <p className="text-xl font-bold">
                {(totalDeductions + totalAdvances).toLocaleString()} ر.س
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">صافي المبلغ</p>
              <p className="text-xl font-bold">
                {payroll.totalAmount.toLocaleString()} ر.س
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-right">
                  <th className="p-2 border">م</th>
                  <th className="p-2 border">الاسم</th>
                  <th className="p-2 border">المنصب</th>
                  <th className="p-2 border">الراتب الأساسي</th>
                  <th className="p-2 border">الخصومات</th>
                  <th className="p-2 border">السلف</th>
                  <th className="p-2 border">صافي الراتب</th>
                </tr>
              </thead>
              <tbody>
                {payroll.employees.map((emp, index) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{emp.name}</td>
                    <td className="p-2 border">{emp.position}</td>
                    <td className="p-2 border text-left">
                      {emp.baseSalary.toLocaleString()} ر.س
                    </td>
                    <td className="p-2 border text-left">
                      {emp.deductions.toLocaleString()} ر.س
                    </td>
                    <td className="p-2 border text-left">
                      {emp.advances.toLocaleString()} ر.س
                    </td>
                    <td className="p-2 border text-left font-medium">
                      {emp.netSalary.toLocaleString()} ر.س
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={3} className="p-2 border text-left">
                    الإجمالي
                  </td>
                  <td className="p-2 border text-left">
                    {totalBaseSalary.toLocaleString()} ر.س
                  </td>
                  <td className="p-2 border text-left">
                    {totalDeductions.toLocaleString()} ر.س
                  </td>
                  <td className="p-2 border text-left">
                    {totalAdvances.toLocaleString()} ر.س
                  </td>
                  <td className="p-2 border text-left">
                    {payroll.totalAmount.toLocaleString()} ر.س
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onPrint(payroll)}>
              <Printer size={16} className="ml-1" />
              طباعة
            </Button>
            {payroll.status !== "paid" && (
              <Button onClick={() => onEdit(payroll)}>
                <Pencil size={16} className="ml-1" />
                تعديل
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayrollDetails;
