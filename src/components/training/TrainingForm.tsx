import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainingFormProps {
  initialData?: {
    id?: number;
    title: string;
    instructor: string;
    department: string;
    startDate: string;
    endDate: string;
    description?: string;
    location?: string;
    maxCapacity: number;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TrainingForm = ({
  initialData,
  onSubmit,
  onCancel,
}: TrainingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    department: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    maxCapacity: 20,
    ...initialData,
  });

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        startDate: date.toISOString().split("T")[0],
      }));
      setStartDateOpen(false);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        endDate: date.toISOString().split("T")[0],
      }));
      setEndDateOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">عنوان الدورة</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="أدخل عنوان الدورة"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructor">المدرب</Label>
          <Input
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="أدخل اسم المدرب"
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
              <SelectItem value="الإدارة">الإدارة</SelectItem>
              <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
              <SelectItem value="المشاريع">المشاريع</SelectItem>
              <SelectItem value="التطوير">التطوير</SelectItem>
              <SelectItem value="المبيعات">المبيعات</SelectItem>
              <SelectItem value="خدمة العملاء">خدمة العملاء</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">مكان الدورة</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="أدخل مكان الدورة"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {formData.startDate ? (
                  format(new Date(formData.startDate), "yyyy-MM-dd")
                ) : (
                  <span>اختر تاريخ البداية</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  formData.startDate ? new Date(formData.startDate) : undefined
                }
                onSelect={handleStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {formData.endDate ? (
                  format(new Date(formData.endDate), "yyyy-MM-dd")
                ) : (
                  <span>اختر تاريخ النهاية</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  formData.endDate ? new Date(formData.endDate) : undefined
                }
                onSelect={handleEndDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxCapacity">الحد الأقصى للمشاركين</Label>
          <Input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            value={formData.maxCapacity}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">وصف الدورة</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="أدخل وصف الدورة"
          rows={4}
        />
      </div>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit">{initialData?.id ? "تحديث" : "إضافة"}</Button>
      </DialogFooter>
    </form>
  );
};

export default TrainingForm;
