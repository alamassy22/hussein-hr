import React, { useState } from "react";
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
import { DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  startDate: string;
  endDate: string;
  maxCapacity: number;
  enrolledCount: number;
  status: string;
}

interface EnrollmentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const EnrollmentForm = ({ onSubmit, onCancel }: EnrollmentFormProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState("");

  // Sample employees data
  const employees: Employee[] = [
    {
      id: "EMP001",
      name: "أحمد محمد",
      department: "تقنية المعلومات",
      position: "مطور برمجيات",
      email: "ahmed@example.com",
    },
    {
      id: "EMP002",
      name: "فاطمة علي",
      department: "الموارد البشرية",
      position: "مدير موارد بشرية",
      email: "fatima@example.com",
    },
    {
      id: "EMP003",
      name: "خالد عبدالله",
      department: "المالية",
      position: "محاسب",
      email: "khalid@example.com",
    },
    {
      id: "EMP004",
      name: "نورة محمد",
      department: "التسويق",
      position: "مدير تسويق",
      email: "noura@example.com",
    },
    {
      id: "EMP005",
      name: "عبدالرحمن سعيد",
      department: "المبيعات",
      position: "مندوب مبيعات",
      email: "abdulrahman@example.com",
    },
  ];

  // Sample courses data
  const courses: Course[] = [
    {
      id: 1,
      title: "مهارات القيادة الإدارية",
      instructor: "د. أحمد محمد",
      startDate: "2023-07-10",
      endDate: "2023-07-14",
      maxCapacity: 20,
      enrolledCount: 15,
      status: "قادم",
    },
    {
      id: 2,
      title: "أساسيات الموارد البشرية",
      instructor: "أ. سارة أحمد",
      startDate: "2023-06-20",
      endDate: "2023-06-22",
      maxCapacity: 15,
      enrolledCount: 12,
      status: "جاري",
    },
    {
      id: 4,
      title: "مهارات التواصل الفعال",
      instructor: "د. فاطمة خالد",
      startDate: "2023-07-25",
      endDate: "2023-07-26",
      maxCapacity: 25,
      enrolledCount: 8,
      status: "قادم",
    },
  ];

  // Filter available courses (not completed and have space)
  const availableCourses = courses.filter(
    (course) =>
      course.status !== "مكتمل" && course.enrolledCount < course.maxCapacity,
  );

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.includes(searchTerm) ||
      employee.department.includes(searchTerm) ||
      employee.position.includes(searchTerm),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedCourse) {
      alert("يرجى اختيار الموظف والدورة");
      return;
    }

    const employee = employees.find((emp) => emp.id === selectedEmployee);
    const course = courses.find((c) => c.id.toString() === selectedCourse);

    const enrollmentData = {
      employeeId: selectedEmployee,
      employeeName: employee?.name,
      courseId: selectedCourse,
      courseName: course?.title,
      department: employee?.department,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "مؤكد",
      notes,
    };

    onSubmit(enrollmentData);
  };

  const selectedEmployeeData = employees.find(
    (emp) => emp.id === selectedEmployee,
  );
  const selectedCourseData = courses.find(
    (c) => c.id.toString() === selectedCourse,
  );

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">اختيار الموظف</Label>

          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن موظف..."
              className="pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedEmployee === employee.id
                    ? "bg-blue-50 border-blue-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedEmployee(employee.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                    <p className="text-sm text-gray-500">
                      {employee.department}
                    </p>
                  </div>
                  <Badge variant="outline">{employee.id}</Badge>
                </div>
              </div>
            ))}
          </div>

          {selectedEmployeeData && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="font-medium text-blue-800">الموظف المختار:</p>
              <p className="text-blue-700">
                {selectedEmployeeData.name} - {selectedEmployeeData.department}
              </p>
            </div>
          )}
        </div>

        {/* Course Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            اختيار الدورة التدريبية
          </Label>

          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الدورة التدريبية" />
            </SelectTrigger>
            <SelectContent>
              {availableCourses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  <div className="flex flex-col items-start">
                    <span>{course.title}</span>
                    <span className="text-sm text-gray-500">
                      {course.instructor} - ({course.enrolledCount}/
                      {course.maxCapacity} مشارك)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCourseData && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="font-medium text-green-800">الدورة المختارة:</p>
              <p className="text-green-700">{selectedCourseData.title}</p>
              <p className="text-sm text-green-600">
                المدرب: {selectedCourseData.instructor} | من{" "}
                {new Date(selectedCourseData.startDate).toLocaleDateString(
                  "ar-SA",
                )}
                إلى{" "}
                {new Date(selectedCourseData.endDate).toLocaleDateString(
                  "ar-SA",
                )}
              </p>
              <p className="text-sm text-green-600">
                المقاعد المتاحة:{" "}
                {selectedCourseData.maxCapacity -
                  selectedCourseData.enrolledCount}
              </p>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">ملاحظات (اختياري)</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أدخل أي ملاحظات إضافية..."
          />
        </div>

        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit">تسجيل الموظف</Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default EnrollmentForm;
