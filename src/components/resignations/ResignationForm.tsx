import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ChevronDown } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ResignationFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const ResignationForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: ResignationFormProps = {}) => {
  const [lastWorkingDate, setLastWorkingDate] = React.useState<
    Date | undefined
  >(
    initialData?.lastWorkingDate
      ? new Date(initialData.lastWorkingDate)
      : undefined,
  );
  const [noticePeriod, setNoticePeriod] = useState(
    initialData?.noticePeriod || "",
  );
  const [reason, setReason] = useState(initialData?.reason || "");
  const [handover, setHandover] = useState(initialData?.handover || "");
  const [contactInfo, setContactInfo] = useState(
    initialData?.contactInfo || "",
  );
  const [additionalNotes, setAdditionalNotes] = useState(
    initialData?.additionalNotes || "",
  );

  // تسليم والتسلم (Handover) fields
  const [handoverItems, setHandoverItems] = useState(
    initialData?.handoverItems || "",
  );
  const [handoverRecipient, setHandoverRecipient] = useState(
    initialData?.handoverRecipient || "",
  );
  const [handoverDate, setHandoverDate] = React.useState<Date | undefined>(
    initialData?.handoverDate ? new Date(initialData.handoverDate) : undefined,
  );
  const [handoverNotes, setHandoverNotes] = useState(
    initialData?.handoverNotes || "",
  );

  // حساب آخر المدة والمخالصة النهائية (Final Settlement) fields
  const [finalSalary, setFinalSalary] = useState(
    initialData?.finalSalary || "",
  );
  const [vacationCompensation, setVacationCompensation] = useState(
    initialData?.vacationCompensation || "",
  );
  const [endOfServiceBenefit, setEndOfServiceBenefit] = useState(
    initialData?.endOfServiceBenefit || "",
  );
  const [deductions, setDeductions] = useState(initialData?.deductions || "");
  const [deductionsReason, setDeductionsReason] = useState(
    initialData?.deductionsReason || "",
  );
  const [finalSettlementNotes, setFinalSettlementNotes] = useState(
    initialData?.finalSettlementNotes || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id: isEditing && initialData?.id ? initialData.id : Date.now().toString(),
      lastWorkingDate,
      noticePeriod,
      reason,
      handover,
      contactInfo,
      additionalNotes,
      // تسليم والتسلم (Handover) fields
      handoverItems,
      handoverRecipient,
      handoverDate,
      handoverNotes,
      // حساب آخر المدة والمخالصة النهائية (Final Settlement) fields
      finalSalary,
      vacationCompensation,
      endOfServiceBenefit,
      deductions,
      deductionsReason,
      finalSettlementNotes,
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
          {isEditing ? "تعديل طلب استقالة" : "تقديم طلب استقالة"}
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
              <Label>تاريخ آخر يوم عمل</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                    type="button"
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {lastWorkingDate ? (
                      format(lastWorkingDate, "dd/MM/yyyy", { locale: ar })
                    ) : (
                      <span>اختر تاريخ آخر يوم عمل</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={lastWorkingDate}
                    onSelect={setLastWorkingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="noticeperiod">فترة الإشعار (بالأيام)</Label>
              <Input
                id="noticeperiod"
                type="number"
                placeholder="30"
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">سبب الاستقالة</Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب الاستقالة هنا"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handover">خطة تسليم المهام</Label>
            <Textarea
              id="handover"
              placeholder="اكتب تفاصيل خطة تسليم المهام والمسؤوليات"
              rows={4}
              value={handover}
              onChange={(e) => setHandover(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">معلومات الاتصال بعد الاستقالة</Label>
            <Input
              id="contactInfo"
              placeholder="البريد الإلكتروني أو رقم الهاتف"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">ملاحظات إضافية</Label>
            <Textarea
              id="additionalNotes"
              placeholder="أي ملاحظات إضافية تود إضافتها"
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>

          <Accordion type="single" collapsible className="w-full mb-4">
            <AccordionItem value="handover">
              <AccordionTrigger className="text-right font-semibold text-lg">
                تسليم والتسلم
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="handoverItems">
                      العهد والأدوات المراد تسليمها
                    </Label>
                    <Textarea
                      id="handoverItems"
                      placeholder="قائمة بالعهد والأدوات المراد تسليمها"
                      rows={3}
                      value={handoverItems}
                      onChange={(e) => setHandoverItems(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="handoverRecipient">الشخص المستلم</Label>
                    <Input
                      id="handoverRecipient"
                      placeholder="اسم الشخص المستلم للعهد"
                      value={handoverRecipient}
                      onChange={(e) => setHandoverRecipient(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>تاريخ التسليم</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-right"
                          type="button"
                        >
                          <Calendar className="ml-2 h-4 w-4" />
                          {handoverDate ? (
                            format(handoverDate, "dd/MM/yyyy", { locale: ar })
                          ) : (
                            <span>اختر تاريخ التسليم</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={handoverDate}
                          onSelect={setHandoverDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="handoverNotes">
                      ملاحظات التسليم والتسلم
                    </Label>
                    <Textarea
                      id="handoverNotes"
                      placeholder="أي ملاحظات إضافية متعلقة بعملية التسليم والتسلم"
                      rows={2}
                      value={handoverNotes}
                      onChange={(e) => setHandoverNotes(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="finalSettlement">
              <AccordionTrigger className="text-right font-semibold text-lg">
                حساب آخر المدة والمخالصة النهائية
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="finalSalary">الراتب النهائي</Label>
                      <Input
                        id="finalSalary"
                        type="number"
                        placeholder="0"
                        value={finalSalary}
                        onChange={(e) => setFinalSalary(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vacationCompensation">
                        تعويض الإجازات
                      </Label>
                      <Input
                        id="vacationCompensation"
                        type="number"
                        placeholder="0"
                        value={vacationCompensation}
                        onChange={(e) =>
                          setVacationCompensation(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endOfServiceBenefit">
                        مكافأة نهاية الخدمة
                      </Label>
                      <Input
                        id="endOfServiceBenefit"
                        type="number"
                        placeholder="0"
                        value={endOfServiceBenefit}
                        onChange={(e) => setEndOfServiceBenefit(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deductions">الخصومات</Label>
                      <Input
                        id="deductions"
                        type="number"
                        placeholder="0"
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deductionsReason">
                      سبب الخصومات (إن وجدت)
                    </Label>
                    <Input
                      id="deductionsReason"
                      placeholder="سبب الخصومات"
                      value={deductionsReason}
                      onChange={(e) => setDeductionsReason(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalSettlementNotes">
                      ملاحظات المخالصة النهائية
                    </Label>
                    <Textarea
                      id="finalSettlementNotes"
                      placeholder="أي ملاحظات إضافية متعلقة بالمخالصة النهائية"
                      rows={2}
                      value={finalSettlementNotes}
                      onChange={(e) => setFinalSettlementNotes(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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

export default ResignationForm;
