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

interface VehicleFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const VehicleForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: VehicleFormProps) => {
  const [formData, setFormData] = useState({
    plateNumber: initialData?.plateNumber || "",
    model: initialData?.model || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    color: initialData?.color || "",
    status: initialData?.status || "متاحة",
    fuelType: initialData?.fuelType || "بنزين",
    department: initialData?.department || "",
    assignedTo: initialData?.assignedTo || "",
    condition: initialData?.condition || "ممتازة",
    licenseExpiry: initialData?.licenseExpiry
      ? new Date(initialData.licenseExpiry)
      : new Date(),
    insuranceExpiry: initialData?.insuranceExpiry
      ? new Date(initialData.insuranceExpiry)
      : new Date(),
    lastMaintenance: initialData?.lastMaintenance
      ? new Date(initialData.lastMaintenance)
      : new Date(),
    nextMaintenance: initialData?.nextMaintenance
      ? new Date(initialData.nextMaintenance)
      : new Date(),
  });

  const [insuranceDate, setInsuranceDate] = useState<Date | undefined>(
    initialData?.insuranceExpiry
      ? new Date(initialData.insuranceExpiry)
      : new Date(),
  );

  const [licenseDate, setLicenseDate] = useState<Date | undefined>(
    initialData?.licenseExpiry
      ? new Date(initialData.licenseExpiry)
      : new Date(),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsuranceDateChange = (date: Date | undefined) => {
    if (date) {
      setInsuranceDate(date);
      setFormData((prev) => ({ ...prev, insuranceExpiry: date }));
    }
  };

  const handleLicenseDateChange = (date: Date | undefined) => {
    if (date) {
      setLicenseDate(date);
      setFormData((prev) => ({ ...prev, licenseExpiry: date }));
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
          {isEditing ? "تعديل بيانات السيارة" : "إضافة سيارة جديدة"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plateNumber">رقم اللوحة</Label>
              <Input
                id="plateNumber"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="أدخل رقم اللوحة"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">الموديل</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="أدخل الموديل"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">سنة الصنع</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="أدخل سنة الصنع"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">اللون</Label>
              <Input
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="أدخل اللون"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">مستخدم السيارة</Label>
            <Input
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="أدخل اسم مستخدم السيارة"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">حالة السيارة</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر حالة السيارة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="متاح">متاح</SelectItem>
                  <SelectItem value="قيد الاستخدام">قيد الاستخدام</SelectItem>
                  <SelectItem value="في الصيانة">في الصيانة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">حالة السيارة الفنية</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  handleSelectChange("condition", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر حالة السيارة الفنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ممتازة">ممتازة</SelectItem>
                  <SelectItem value="جيدة">جيدة</SelectItem>
                  <SelectItem value="تحتاج صيانة">تحتاج صيانة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuelType">نوع الوقود</Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => handleSelectChange("fuelType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الوقود" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="بنزين">بنزين</SelectItem>
                  <SelectItem value="ديزل">ديزل</SelectItem>
                  <SelectItem value="كهرباء">كهرباء</SelectItem>
                  <SelectItem value="هجين">هجين</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">القسم</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  handleSelectChange("department", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الإدارة">الإدارة</SelectItem>
                  <SelectItem value="المبيعات">المبيعات</SelectItem>
                  <SelectItem value="الموارد البشرية">
                    الموارد البشرية
                  </SelectItem>
                  <SelectItem value="الخدمات اللوجستية">
                    الخدمات اللوجستية
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceExpiry">تاريخ انتهاء التأمين</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {insuranceDate
                      ? format(insuranceDate, "PPP", { locale: ar })
                      : "اختر تاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={insuranceDate}
                    onSelect={handleInsuranceDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseExpiry">تاريخ انتهاء رخصة السير</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {licenseDate
                      ? format(licenseDate, "PPP", { locale: ar })
                      : "اختر تاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={licenseDate}
                    onSelect={handleLicenseDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
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

export default VehicleForm;
