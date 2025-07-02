import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface AdvanceRequestFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const AdvanceRequestForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: AdvanceRequestFormProps = {}) => {
  const [requestDate, setRequestDate] = React.useState<Date | undefined>(
    initialData?.requestDate ? new Date(initialData.requestDate) : undefined,
  );
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [advanceType, setAdvanceType] = useState(
    initialData?.advanceType || "",
  );
  const [repaymentPeriod, setRepaymentPeriod] = useState(
    initialData?.repaymentPeriod || "",
  );
  const [reason, setReason] = useState(initialData?.reason || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id: isEditing && initialData?.id ? initialData.id : Date.now().toString(),
      requestDate,
      amount,
      advanceType,
      repaymentPeriod,
      reason,
      notes,
      status:
        isEditing && initialData?.status ? initialData.status : "قيد المراجعة",
      submissionDate:
        isEditing && initialData?.submissionDate
          ? initialData.submissionDate
          : new Date().toISOString().split("T")[0],
      employeeName: initialData?.employeeName || "أحمد محمد",
    };

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {isEditing ? "تعديل طلب سلفة" : "تقديم طلب سلفة جديد"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {initialData?.status &&
          initialData.status !== "قيد المراجعة" &&
          initialData.approvalReason && (
            <div
              className={`mb-4 p-4 rounded-md ${initialData.status === "موافق" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <h3 className="font-semibold mb-2">
                {initialData.status === "موافق"
                  ? "تمت الموافقة على الطلب"
                  : "تم رفض الطلب"}
              </h3>
              <p className="text-sm">{initialData.approvalReason}</p>
              <p className="text-xs mt-2 text-gray-500">
                تاريخ {initialData.status === "موافق" ? "الموافقة" : "الرفض"}:{" "}
                {initialData.approvalDate
                  ? new Date(initialData.approvalDate).toLocaleDateString(
                      "ar-SA",
                    )
                  : ""}
              </p>
            </div>
          )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>تاريخ الطلب</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                    type="button"
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {requestDate ? (
                      format(requestDate, "dd/MM/yyyy", { locale: ar })
                    ) : (
                      <span>اختر تاريخ الطلب</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={requestDate}
                    onSelect={setRequestDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ المطلوب</Label>
              <Input
                id="amount"
                type="number"
                placeholder="أدخل المبلغ"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advanceType">نوع السلفة</Label>
              <Select value={advanceType} onValueChange={setAdvanceType}>
                <SelectTrigger id="advanceType">
                  <SelectValue placeholder="اختر نوع السلفة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">سلفة راتب</SelectItem>
                  <SelectItem value="housing">سلفة سكن</SelectItem>
                  <SelectItem value="emergency">سلفة طارئة</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repaymentPeriod">فترة السداد (بالأشهر)</Label>
              <Input
                id="repaymentPeriod"
                type="number"
                placeholder="أدخل عدد الأشهر"
                value={repaymentPeriod}
                onChange={(e) => setRepaymentPeriod(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">سبب طلب السلفة</Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب طلب السلفة هنا"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              placeholder="أي ملاحظات إضافية تود إضافتها"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              إلغاء
            </Button>
            <Button type="submit">{isEditing ? "تحديث" : "تقديم الطلب"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdvanceRequestForm;
