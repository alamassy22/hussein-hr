import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface MaintenanceRequestFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const MaintenanceRequestForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: MaintenanceRequestFormProps) => {
  const [formData, setFormData] = useState({
    vehiclePlateNumber: initialData?.vehiclePlateNumber || "",
    vehicleModel: initialData?.vehicleModel || "",
    maintenanceType: initialData?.maintenanceType || "صيانة دورية",
    description: initialData?.description || "",
    requestDate: initialData?.requestDate
      ? new Date(initialData.requestDate)
      : new Date(),
    scheduledDate: initialData?.scheduledDate
      ? new Date(initialData.scheduledDate)
      : new Date(),
    status: initialData?.status || "معلق",
    cost: initialData?.cost || "",
    notes: initialData?.notes || "",
  });

  const [requestDate, setRequestDate] = useState<Date | undefined>(
    initialData?.requestDate ? new Date(initialData.requestDate) : new Date(),
  );

  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    initialData?.scheduledDate
      ? new Date(initialData.scheduledDate)
      : new Date(),
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestDateChange = (date: Date | undefined) => {
    if (date) {
      setRequestDate(date);
      setFormData((prev) => ({ ...prev, requestDate: date }));
    }
  };

  const handleScheduledDateChange = (date: Date | undefined) => {
    if (date) {
      setScheduledDate(date);
      setFormData((prev) => ({ ...prev, scheduledDate: date }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle>
          {isEditing ? "تعديل طلب صيانة" : "إضافة طلب صيانة جديد"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehiclePlateNumber">رقم لوحة السيارة</Label>
              <Input
                id="vehiclePlateNumber"
                name="vehiclePlateNumber"
                value={formData.vehiclePlateNumber}
                onChange={handleChange}
                placeholder="أدخل رقم لوحة السيارة"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleModel">موديل السيارة</Label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                placeholder="أدخل موديل السيارة"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maintenanceType">نوع الصيانة</Label>
            <Select
              value={formData.maintenanceType}
              onValueChange={(value) =>
                handleSelectChange("maintenanceType", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الصيانة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="صيانة دورية">صيانة دورية</SelectItem>
                <SelectItem value="تغيير زيت">تغيير زيت</SelectItem>
                <SelectItem value="إصلاح عطل">إصلاح عطل</SelectItem>
                <SelectItem value="فحص فني">فحص فني</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">وصف الصيانة</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="أدخل وصف الصيانة المطلوبة"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requestDate">تاريخ الطلب</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {requestDate
                      ? format(requestDate, "PPP", { locale: ar })
                      : "اختر تاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={requestDate}
                    onSelect={handleRequestDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledDate">تاريخ الصيانة المجدول</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {scheduledDate
                      ? format(scheduledDate, "PPP", { locale: ar })
                      : "اختر تاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={handleScheduledDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {isEditing && (
            <>
              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="معلق">معلق</SelectItem>
                    <SelectItem value="موافق">موافق</SelectItem>
                    <SelectItem value="مرفوض">مرفوض</SelectItem>
                    <SelectItem value="مكتمل">مكتمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">التكلفة</Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="أدخل تكلفة الصيانة"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="أدخل أي ملاحظات إضافية"
              rows={2}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit">{isEditing ? "تحديث" : "حفظ"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MaintenanceRequestForm;
