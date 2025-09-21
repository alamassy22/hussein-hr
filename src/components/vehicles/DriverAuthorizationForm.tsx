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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface DriverAuthorizationFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const DriverAuthorizationForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: DriverAuthorizationFormProps) => {
  const [formData, setFormData] = useState({
    driverName: initialData?.driverName || "",
    driverID: initialData?.driverID || "",
    vehiclePlateNumber: initialData?.vehiclePlateNumber || "",
    vehicleModel: initialData?.vehicleModel || "",
    startDate: initialData?.startDate
      ? new Date(initialData.startDate)
      : new Date(),
    endDate: initialData?.endDate ? new Date(initialData.endDate) : new Date(),
    purpose: initialData?.purpose || "",
    department: initialData?.department || "",
    status: initialData?.status || "معلق",
  });

  const [startDate, setStartDate] = useState<Date | undefined>(
    initialData?.startDate ? new Date(initialData.startDate) : new Date(),
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    initialData?.endDate ? new Date(initialData.endDate) : new Date(),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      setFormData((prev) => ({ ...prev, startDate: date }));
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setEndDate(date);
      setFormData((prev) => ({ ...prev, endDate: date }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Departments
  const departments = [
    { id: "management", name: "الإدارة" },
    { id: "sales", name: "المبيعات" },
    { id: "hr", name: "الموارد البشرية" },
    { id: "logistics", name: "الخدمات اللوجستية" },
  ];

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle>
          {isEditing ? "تعديل تفويض سائق" : "إضافة تفويض سائق جديد"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="driverName">اسم السائق</Label>
            <Input
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              placeholder="أدخل اسم السائق"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="driverID">رقم هوية السائق</Label>
            <Input
              id="driverID"
              name="driverID"
              value={formData.driverID}
              onChange={handleChange}
              placeholder="أدخل رقم هوية السائق"
              required
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">تاريخ بداية التفويض</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "PPP", { locale: ar })
                      : "اختر تاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">تاريخ نهاية التفويض</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "PPP", { locale: ar })
                      : "اختر تاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">الغرض من التفويض</Label>
            <Input
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="أدخل الغرض من التفويض"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">القسم</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isEditing && (
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
                </SelectContent>
              </Select>
            </div>
          )}
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

export default DriverAuthorizationForm;
