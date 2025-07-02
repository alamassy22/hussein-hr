import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PayrollData } from "./PayrollForm";
import { CheckCircle, X, AlertTriangle, FileText, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PayrollReviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payroll: PayrollData | null;
  onApprove: (id: string, notes: string) => void;
  onReject: (id: string, notes: string) => void;
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

const PayrollReview = ({
  open,
  onOpenChange,
  payroll,
  onApprove,
  onReject,
  onPrint,
}: PayrollReviewProps) => {
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!payroll) return null;

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onApprove(payroll.id, notes);
      setIsSubmitting(false);
      setNotes("");
      onOpenChange(false);
    }, 500);
  };

  const handleReject = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onReject(payroll.id, notes);
      setIsSubmitting(false);
      setNotes("");
      onOpenChange(false);
    }, 500);
  };

  const getMonthName = (monthNum: string) => {
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
    const monthIndex = parseInt(monthNum) - 1;
    return monthNames[monthIndex];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>مراجعة واعتماد مسير الرواتب</span>
            <Badge className={statusColors[payroll.status]}>
              {statusText[payroll.status]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto flex-grow pr-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">{payroll.title}</h3>
                <p className="text-gray-500">
                  {getMonthName(payroll.month)} {payroll.year}
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">تاريخ المسير: {payroll.date}</p>
                <p className="text-gray-500">
                  عدد الموظفين: {payroll.employees.length}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">ملخص المسير</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPrint(payroll)}
              >
                <Printer className="h-4 w-4 ml-2" />
                طباعة المسير
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-md border">
                <p className="text-sm text-gray-500">إجمالي الرواتب الأساسية</p>
                <p className="text-lg font-semibold">
                  {payroll.employees
                    .reduce((sum, emp) => sum + emp.baseSalary, 0)
                    .toLocaleString()}{" "}
                  ر.س
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border">
                <p className="text-sm text-gray-500">إجمالي الخصومات</p>
                <p className="text-lg font-semibold">
                  {payroll.employees
                    .reduce((sum, emp) => sum + emp.deductions, 0)
                    .toLocaleString()}{" "}
                  ر.س
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border">
                <p className="text-sm text-gray-500">إجمالي السلف</p>
                <p className="text-lg font-semibold">
                  {payroll.employees
                    .reduce((sum, emp) => sum + emp.advances, 0)
                    .toLocaleString()}{" "}
                  ر.س
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border bg-blue-50">
                <p className="text-sm text-gray-500">صافي المبلغ المستحق</p>
                <p className="text-lg font-semibold text-blue-700">
                  {payroll.totalAmount.toLocaleString()} ر.س
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">تفاصيل الموظفين</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-right">
                    <th className="p-2 border">الاسم</th>
                    <th className="p-2 border">المنصب</th>
                    <th className="p-2 border">الراتب الأساسي</th>
                    <th className="p-2 border">الخصومات</th>
                    <th className="p-2 border">السلف</th>
                    <th className="p-2 border">صافي الراتب</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.employees.map((emp) => (
                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 border">{emp.name}</td>
                      <td className="p-2 border">{emp.position}</td>
                      <td className="p-2 border">
                        {emp.baseSalary.toLocaleString()} ر.س
                      </td>
                      <td className="p-2 border">
                        {emp.deductions.toLocaleString()} ر.س
                      </td>
                      <td className="p-2 border">
                        {emp.advances.toLocaleString()} ر.س
                      </td>
                      <td className="p-2 border font-medium">
                        {emp.netSalary.toLocaleString()} ر.س
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={5} className="p-2 border text-left">
                      الإجمالي
                    </td>
                    <td className="p-2 border">
                      {payroll.totalAmount.toLocaleString()} ر.س
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات المراجعة</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أدخل ملاحظاتك حول مسير الرواتب هنا..."
              rows={4}
            />
          </div>

          <DialogFooter className="flex justify-between sticky bottom-0 bg-white py-4 mt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 ml-2" />
              إلغاء
            </Button>

            <div className="flex gap-2">
              {payroll.status === "draft" && (
                <>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleReject}
                    disabled={isSubmitting}
                  >
                    <AlertTriangle className="h-4 w-4 ml-2" />
                    رفض المسير
                  </Button>
                  <Button
                    type="button"
                    onClick={handleApprove}
                    disabled={isSubmitting}
                  >
                    <CheckCircle className="h-4 w-4 ml-2" />
                    اعتماد المسير
                  </Button>
                </>
              )}

              {payroll.status === "approved" && (
                <Button type="button" variant="outline">
                  <FileText className="h-4 w-4 ml-2" />
                  تصدير للنظام المالي
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayrollReview;
