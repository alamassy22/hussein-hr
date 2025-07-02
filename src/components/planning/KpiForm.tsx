import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface KpiFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const KpiForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: KpiFormProps) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    category: initialData?.category || "الموارد البشرية",
    target: initialData?.target || "",
    current: initialData?.current || "",
    status: initialData?.status || "قيد التنفيذ",
    trend: initialData?.trend || "ثابت",
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
        <Label htmlFor="name" className="text-right">
          اسم المؤشر
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
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
        <Label htmlFor="target" className="text-right">
          المستهدف
        </Label>
        <Input
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="current" className="text-right">
          القيمة الحالية
        </Label>
        <Input
          id="current"
          name="current"
          value={formData.current}
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
        <Label htmlFor="trend" className="text-right">
          الاتجاه
        </Label>
        <Select
          value={formData.trend}
          onValueChange={(value) => handleSelectChange("trend", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="اختر الاتجاه" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="تحسن">تحسن</SelectItem>
            <SelectItem value="تراجع">تراجع</SelectItem>
            <SelectItem value="ثابت">ثابت</SelectItem>
          </SelectContent>
        </Select>
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

export default KpiForm;
