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
import { Textarea } from "@/components/ui/textarea";
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
    title: initialData?.title || "",
    location: initialData?.location || "",
    type: initialData?.type || "",
    priority: initialData?.priority || "متوسطة",
    description: initialData?.description || "",
    requestDate: initialData?.requestDate
      ? new Date(initialData.requestDate)
      : new Date(),
    requestedBy: initialData?.requestedBy || "أحمد محمد",
  });

  const [date, setDate] = useState<Date | undefined>(
    initialData?.requestDate ? new Date(initialData.requestDate) : new Date(),
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

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setFormData((prev) => ({ ...prev, requestDate: date }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new request with a unique ID and additional fields
    const newRequest = {
      ...formData,
      id: isEditing && initialData?.id ? initialData.id : Date.now(),
      status: isEditing && initialData?.status ? initialData.status : "معلقة",
      requestDate: formData.requestDate.toISOString().split("T")[0],
    };

    if (onSubmit) {
      onSubmit(newRequest);
    }
  };

  // Maintenance types
  const maintenanceTypes = [
    { id: "ac", name: "تكييف" },
    { id: "plumbing", name: "سباكة" },
    { id: "electrical", name: "كهرباء" },
    { id: "carpentry", name: "نجارة" },
    { id: "electronics", name: "أجهزة إلكترونية" },
  ];

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle>
          {isEditing ? "تعديل طلب صيانة" : "إضافة طلب صيانة جديد"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان الطلب</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="أدخل عنوان طلب الصيانة"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">الموقع</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="أدخل موقع الصيانة"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">نوع الصيانة</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الصيانة" />
              </SelectTrigger>
              <SelectContent>
                {maintenanceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">الأولوية</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleSelectChange("priority", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="عالية">عالية</SelectItem>
                <SelectItem value="متوسطة">متوسطة</SelectItem>
                <SelectItem value="منخفضة">منخفضة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">وصف المشكلة</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="أدخل وصف المشكلة"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestDate">تاريخ الطلب</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-right"
                  type="button"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ar }) : "اختر تاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
