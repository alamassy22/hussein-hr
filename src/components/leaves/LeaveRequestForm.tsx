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

interface LeaveRequestFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const LeaveRequestForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: LeaveRequestFormProps = {}) => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    initialData?.startDate ? new Date(initialData.startDate) : undefined,
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    initialData?.endDate ? new Date(initialData.endDate) : undefined,
  );
  const [leaveType, setLeaveType] = useState(initialData?.leaveType || "");
  const [contactInfo, setContactInfo] = useState(
    initialData?.contactInfo || "",
  );
  const [reason, setReason] = useState(initialData?.reason || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id: isEditing && initialData?.id ? initialData.id : Date.now().toString(),
      leaveType,
      startDate,
      endDate,
      contactInfo,
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
          {isEditing ? "تعديل طلب إجازة" : "تقديم طلب إجازة جديد"}
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
              <Label htmlFor="leaveType">نوع الإجازة</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger id="leaveType">
                  <SelectValue placeholder="اختر نوع الإجازة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">سنوية</SelectItem>
                  <SelectItem value="sick">مرضية</SelectItem>
                  <SelectItem value="emergency">طارئة</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>تاريخ البداية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                    type="button"
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "dd/MM/yyyy", { locale: ar })
                    ) : (
                      <span>اختر تاريخ البداية</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>تاريخ النهاية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                    type="button"
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "dd/MM/yyyy", { locale: ar })
                    ) : (
                      <span>اختر تاريخ النهاية</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactInfo">معلومات الاتصال أثناء الإجازة</Label>
              <Input
                id="contactInfo"
                placeholder="رقم الهاتف أو البريد الإلكتروني"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">سبب الإجازة</Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب طلب الإجازة هنا"
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

export default LeaveRequestForm;
