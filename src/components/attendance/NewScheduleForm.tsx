import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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

interface NewScheduleFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const NewScheduleForm = ({
  onSubmit = () => {},
  onCancel = () => {},
}: NewScheduleFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      employeeName: formData.get("employeeName"),
      employeeId: formData.get("employeeId"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      location: formData.get("location"),
      workDays: formData.get("workDays"),
    };
    onSubmit(data);
  };

  return (
    <Card className="border shadow-sm bg-white w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          إضافة موعد دوام جديد
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="scheduleForm">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">رقم الموظف</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  placeholder="أدخل رقم الموظف"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeName">اسم الموظف</Label>
                <Input
                  id="employeeName"
                  name="employeeName"
                  placeholder="أدخل اسم الموظف"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">بداية الدوام</Label>
                <Input id="startTime" name="startTime" type="time" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">نهاية الدوام</Label>
                <Input id="endTime" name="endTime" type="time" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workDays">عدد أيام العمل</Label>
              <Input
                id="workDays"
                name="workDays"
                type="number"
                min="1"
                max="7"
                placeholder="أدخل عدد أيام العمل في الأسبوع"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">موقع الدوام</Label>
              <Select name="location" required>
                <SelectTrigger id="location">
                  <SelectValue placeholder="اختر موقع الدوام" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="المقر الرئيسي">المقر الرئيسي</SelectItem>
                  <SelectItem value="الفرع الشمالي">الفرع الشمالي</SelectItem>
                  <SelectItem value="الفرع الجنوبي">الفرع الجنوبي</SelectItem>
                  <SelectItem value="الفرع الشرقي">الفرع الشرقي</SelectItem>
                  <SelectItem value="الفرع الغربي">الفرع الغربي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" form="scheduleForm">
          حفظ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewScheduleForm;
