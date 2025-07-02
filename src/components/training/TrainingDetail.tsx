import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Printer,
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  User,
  FileText,
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
  description?: string;
  objectives?: string[];
  duration?: string;
}

interface TrainingDetailProps {
  course?: TrainingCourse;
  onBack?: () => void;
  onEdit?: () => void;
}

const TrainingDetail = ({ course, onBack, onEdit }: TrainingDetailProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `تفاصيل دورة ${course?.title || "التدريب"}`,
  });

  // Default course data if none provided
  const defaultCourse: TrainingCourse = {
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
    description:
      "دورة تدريبية شاملة تهدف إلى تطوير مهارات القيادة والإدارة لدى المشاركين وتزويدهم بالأدوات والتقنيات الحديثة في مجال القيادة الإدارية الفعالة.",
    objectives: [
      "تطوير مهارات القيادة الشخصية",
      "فهم أساليب الإدارة الحديثة",
      "تعلم تقنيات التواصل الفعال",
      "إدارة الفرق والمشاريع",
      "اتخاذ القرارات الاستراتيجية",
    ],
    duration: "5 أيام (40 ساعة تدريبية)",
  };

  const displayCourse = course || defaultCourse;

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
    <div className="bg-white">
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowRight className="ml-2 h-4 w-4" />
                العودة
              </Button>
            )}
            <CardTitle className="text-xl font-bold">
              تفاصيل الدورة التدريبية
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="ml-2 h-4 w-4" />
              طباعة
            </Button>
            {onEdit && (
              <Button size="sm" onClick={onEdit}>
                تعديل
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div ref={printRef} className="space-y-6">
            <div className="print-header text-center mb-6 hidden print-only-content">
              <h1 className="text-2xl font-bold">تفاصيل الدورة التدريبية</h1>
              <p className="text-sm text-gray-500">
                تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>

            {/* Course Header */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {displayCourse.title}
                </h2>
                {renderCourseStatusBadge(displayCourse.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">المدرب</p>
                    <p className="font-medium">{displayCourse.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">تاريخ البداية</p>
                    <p className="font-medium">
                      {new Date(displayCourse.startDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">تاريخ النهاية</p>
                    <p className="font-medium">
                      {new Date(displayCourse.endDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">المشاركين</p>
                    <p className="font-medium">
                      {displayCourse.enrolledCount}/{displayCourse.maxCapacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">معلومات عامة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 min-w-[100px]">
                        القسم:
                      </span>
                      <span className="font-medium">
                        {displayCourse.department}
                      </span>
                    </div>

                    {displayCourse.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500 min-w-[100px]">
                          المكان:
                        </span>
                        <span className="font-medium">
                          {displayCourse.location}
                        </span>
                      </div>
                    )}

                    {displayCourse.duration && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 min-w-[100px]">
                          المدة:
                        </span>
                        <span className="font-medium">
                          {displayCourse.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {displayCourse.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">وصف الدورة</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {displayCourse.description}
                    </p>
                  </div>
                )}
              </div>

              {displayCourse.objectives &&
                displayCourse.objectives.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">أهداف الدورة</h3>
                    <ul className="space-y-2">
                      {displayCourse.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <Separator />

            {/* Progress Bar */}
            <div>
              <h3 className="text-lg font-semibold mb-3">حالة التسجيل</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>المشاركين المسجلين</span>
                  <span>
                    {displayCourse.enrolledCount} من {displayCourse.maxCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(displayCourse.enrolledCount / displayCourse.maxCapacity) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  متاح {displayCourse.maxCapacity - displayCourse.enrolledCount}{" "}
                  مقعد إضافي
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingDetail;
