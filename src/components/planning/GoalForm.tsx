import React from "react";
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

interface GoalFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const GoalForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: GoalFormProps) => {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "الموارد البشرية",
    targetDate: initialData?.targetDate || "",
    status: initialData?.status || "قيد التنفيذ",
    progress: initialData?.progress || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          عنوان الهدف
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          الوصف
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          الفئة
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
            <SelectItem value="التوظيف">التوظيف</SelectItem>
            <SelectItem value="التدريب">التدريب</SelectItem>
            <SelectItem value="التطوير">التطوير</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="targetDate" className="text-right">
          تاريخ الاستحقاق
        </Label>
        <Input
          id="targetDate"
          name="targetDate"
          type="date"
          value={formData.targetDate}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          الحالة
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleSelectChange("status", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="اختر الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
            <SelectItem value="مكتمل">مكتمل</SelectItem>
            <SelectItem value="متأخر">متأخر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="progress" className="text-right">
          نسبة الإنجاز
        </Label>
        <div className="col-span-3 flex items-center gap-2">
          <Input
            id="progress"
            name="progress"
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            className="flex-1"
          />
          <span className="w-12 text-center">{formData.progress}%</span>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit">{isEditing ? "تحديث" : "إضافة"}</Button>
      </div>
    </form>
  );
};

export default GoalForm;
