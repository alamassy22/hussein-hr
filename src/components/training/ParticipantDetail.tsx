import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Printer,
  ArrowRight,
  Mail,
  Building,
  User,
  Calendar,
  Award,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface Participant {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  attendanceRate?: number;
  avatar?: string;
  phone?: string;
  joinDate?: string;
  completedCourses?: number;
  currentCourses?: string[];
}

interface ParticipantDetailProps {
  participant?: Participant;
  onBack?: () => void;
}

const ParticipantDetail = ({ participant, onBack }: ParticipantDetailProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `تفاصيل المشارك ${participant?.name || "المشارك"}`,
  });

  // Default participant data if none provided
  const defaultParticipant: Participant = {
    id: "P001",
    name: "محمد أحمد",
    email: "mohammed@example.com",
    department: "تقنية المعلومات",
    position: "مطور برمجيات",
    attendanceRate: 95,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P001",
    phone: "+966 50 123 4567",
    joinDate: "2023-01-15",
    completedCourses: 8,
    currentCourses: ["مهارات القيادة الإدارية", "أساسيات الموارد البشرية"],
  };

  const displayParticipant = participant || defaultParticipant;

  // Get attendance rate color
  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceBgColor = (rate: number) => {
    if (rate >= 90) return "bg-green-500";
    if (rate >= 75) return "bg-yellow-500";
    return "bg-red-500";
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
            <CardTitle className="text-xl font-bold">تفاصيل المشارك</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={printRef} className="space-y-6">
            <div className="print-header text-center mb-6 hidden print-only-content">
              <h1 className="text-2xl font-bold">تفاصيل المشارك</h1>
              <p className="text-sm text-gray-500">
                تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>

            {/* Participant Header */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={displayParticipant.avatar} />
                  <AvatarFallback className="text-lg">
                    {displayParticipant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {displayParticipant.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    {displayParticipant.position}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">
                        {displayParticipant.department}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">
                        {displayParticipant.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-primary">
                      {displayParticipant.attendanceRate || 0}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">نسبة الحضور</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${getAttendanceBgColor(displayParticipant.attendanceRate || 0)}`}
                      style={{
                        width: `${displayParticipant.attendanceRate || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participant Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    المعلومات الشخصية
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500 min-w-[100px]">
                        الاسم:
                      </span>
                      <span className="font-medium">
                        {displayParticipant.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500 min-w-[100px]">
                        البريد:
                      </span>
                      <span className="font-medium">
                        {displayParticipant.email}
                      </span>
                    </div>

                    {displayParticipant.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 min-w-[100px]">
                          الهاتف:
                        </span>
                        <span className="font-medium">
                          {displayParticipant.phone}
                        </span>
                      </div>
                    )}

                    {displayParticipant.joinDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500 min-w-[100px]">
                          تاريخ الانضمام:
                        </span>
                        <span className="font-medium">
                          {new Date(
                            displayParticipant.joinDate,
                          ).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    المعلومات الوظيفية
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500 min-w-[100px]">
                        القسم:
                      </span>
                      <span className="font-medium">
                        {displayParticipant.department}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 min-w-[100px]">
                        المسمى:
                      </span>
                      <span className="font-medium">
                        {displayParticipant.position}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    إحصائيات التدريب
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            الدورات المكتملة
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {displayParticipant.completedCourses || 0}
                          </p>
                        </div>
                        <Award className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">نسبة الحضور</p>
                          <p
                            className={`text-2xl font-bold ${getAttendanceColor(displayParticipant.attendanceRate || 0)}`}
                          >
                            {displayParticipant.attendanceRate || 0}%
                          </p>
                        </div>
                        <div className="w-12 bg-gray-200 rounded-full h-12 flex items-center justify-center">
                          <div
                            className={`w-8 h-8 rounded-full ${getAttendanceBgColor(displayParticipant.attendanceRate || 0)}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {displayParticipant.currentCourses &&
                  displayParticipant.currentCourses.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        الدورات الحالية
                      </h3>
                      <div className="space-y-2">
                        {displayParticipant.currentCourses.map(
                          (course, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                            >
                              <Badge variant="outline" className="text-xs">
                                جاري
                              </Badge>
                              <span className="text-sm">{course}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <Separator />

            {/* Performance Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-3">ملخص الأداء</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {displayParticipant.completedCourses || 0}
                    </p>
                    <p className="text-sm text-gray-600">دورات مكتملة</p>
                  </div>
                  <div>
                    <p
                      className={`text-2xl font-bold ${getAttendanceColor(displayParticipant.attendanceRate || 0)}`}
                    >
                      {displayParticipant.attendanceRate || 0}%
                    </p>
                    <p className="text-sm text-gray-600">نسبة الحضور</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {displayParticipant.currentCourses?.length || 0}
                    </p>
                    <p className="text-sm text-gray-600">دورات جارية</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantDetail;
