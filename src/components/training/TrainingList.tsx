import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Printer,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface TrainingCourse {
  id: number;
  title: string;
  instructor: string;
  department: string;
  startDate: string;
  endDate: string;
  status: string;
  enrolledCount: number;
  maxCapacity: number;
  location?: string;
}

interface TrainingListProps {
  courses?: TrainingCourse[];
  onViewCourse?: (courseId: number) => void;
  onEditCourse?: (courseId: number) => void;
  onDeleteCourse?: (courseId: number) => void;
}

const TrainingList = ({
  courses = [],
  onViewCourse,
  onEditCourse,
  onDeleteCourse,
}: TrainingListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof TrainingCourse>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "قائمة الدورات التدريبية",
  });

  // Sample data if no courses provided
  const sampleCourses: TrainingCourse[] = [
    {
      id: 1,
      title: "مهارات القيادة الإدارية",
      instructor: "د. أحمد محمد",
      department: "الإدارة",
      startDate: "2023-07-10",
      endDate: "2023-07-14",
      status: "قادم",
      enrolledCount: 15,
      maxCapacity: 20,
      location: "قاعة التدريب الرئيسية",
    },
    {
      id: 2,
      title: "أساسيات الموارد البشرية",
      instructor: "أ. سارة أحمد",
      department: "الموارد البشرية",
      startDate: "2023-06-20",
      endDate: "2023-06-22",
      status: "جاري",
      enrolledCount: 12,
      maxCapacity: 15,
      location: "قاعة التدريب الثانية",
    },
    {
      id: 3,
      title: "إدارة المشاريع الاحترافية",
      instructor: "م. محمد علي",
      department: "المشاريع",
      startDate: "2023-06-05",
      endDate: "2023-06-09",
      status: "مكتمل",
      enrolledCount: 18,
      maxCapacity: 20,
      location: "قاعة المؤتمرات",
    },
    {
      id: 4,
      title: "مهارات التواصل الفعال",
      instructor: "د. فاطمة خالد",
      department: "التطوير",
      startDate: "2023-07-25",
      endDate: "2023-07-26",
      status: "قادم",
      enrolledCount: 8,
      maxCapacity: 25,
      location: "قاعة المؤتمرات",
    },
  ];

  const displayCourses = courses.length > 0 ? courses : sampleCourses;

  // Filter courses based on search term
  const filteredCourses = displayCourses.filter(
    (course) =>
      course.title.includes(searchTerm) ||
      course.instructor.includes(searchTerm) ||
      course.department.includes(searchTerm),
  );

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle sort direction
  const toggleSort = (field: keyof TrainingCourse) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render course status badge
  const renderCourseStatusBadge = (status: string) => {
    switch (status) {
      case "قادم":
        return <Badge className="bg-blue-500">قادم</Badge>;
      case "جاري":
        return <Badge className="bg-green-500">جاري</Badge>;
      case "مكتمل":
        return <Badge className="bg-gray-500">مكتمل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          الدورات التدريبية
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search" className="sr-only">
            بحث
          </Label>
          <div className="relative">
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="search"
              placeholder="بحث عن دورة تدريبية..."
              className="pr-10 text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir="rtl"
            />
          </div>
        </div>

        <div className="overflow-x-auto" ref={printRef}>
          <div className="print-header text-center mb-4 hidden print-only-content">
            <h1 className="text-2xl font-bold">قائمة الدورات التدريبية</h1>
            <p className="text-sm text-gray-500">
              تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("title")}
                  >
                    عنوان الدورة
                    {sortField === "title" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("instructor")}
                  >
                    المدرب
                    {sortField === "instructor" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("startDate")}
                  >
                    تاريخ البداية
                    {sortField === "startDate" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("status")}
                  >
                    الحالة
                    {sortField === "status" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("enrolledCount")}
                  >
                    المشاركين
                    {sortField === "enrolledCount" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right print-hidden">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {sortedCourses.map((course) => (
                <tr key={course.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{course.title}</td>
                  <td className="p-3">{course.instructor}</td>
                  <td className="p-3">
                    {new Date(course.startDate).toLocaleDateString("ar-SA")}
                  </td>
                  <td className="p-3">
                    {renderCourseStatusBadge(course.status)}
                  </td>
                  <td className="p-3">
                    {course.enrolledCount}/{course.maxCapacity}
                  </td>
                  <td className="p-3 print-hidden">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewCourse && onViewCourse(course.id)}
                      >
                        عرض التفاصيل
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditCourse && onEditCourse(course.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onDeleteCourse && onDeleteCourse(course.id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    لا توجد دورات تدريبية متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingList;
