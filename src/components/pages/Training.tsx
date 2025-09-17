import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Users,
  Edit,
  Trash2,
} from "lucide-react";
import TrainingList from "../training/TrainingList";
import ParticipantsList from "../training/ParticipantsList";
import TrainingDetail from "../training/TrainingDetail";
import ParticipantDetail from "../training/ParticipantDetail";
import TrainingForm from "../training/TrainingForm";
import EnrollmentForm from "../training/EnrollmentForm";

const Training = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showParticipantDetail, setShowParticipantDetail] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  // Sample training courses data
  const initialTrainingCourses = [
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
      description:
        "دورة أساسية في مجال الموارد البشرية تغطي المفاهيم الأساسية والممارسات الحديثة في إدارة الموارد البشرية.",
      objectives: [
        "فهم أساسيات إدارة الموارد البشرية",
        "تعلم عمليات التوظيف والاختيار",
        "إدارة الأداء والتطوير",
        "قوانين العمل والامتثال",
      ],
      duration: "3 أيام (24 ساعة تدريبية)",
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
      description:
        "دورة متقدمة في إدارة المشاريع تغطي أحدث المنهجيات والأدوات المستخدمة في إدارة المشاريع الاحترافية.",
      objectives: [
        "تطبيق منهجيات إدارة المشاريع",
        "استخدام أدوات التخطيط والمتابعة",
        "إدارة المخاطر والجودة",
        "قيادة فرق المشاريع",
      ],
      duration: "5 أيام (40 ساعة تدريبية)",
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
      description:
        "دورة تركز على تطوير مهارات التواصل الشخصي والمهني لتحسين فعالية التفاعل في بيئة العمل.",
      objectives: [
        "تطوير مهارات الاستماع الفعال",
        "تحسين مهارات العرض والتقديم",
        "إدارة الصراعات والتفاوض",
        "التواصل الرقمي الفعال",
      ],
      duration: "يومان (16 ساعة تدريبية)",
    },
  ];

  const [trainingCourses, setTrainingCourses] = useState([]);

  // Load training courses from localStorage on component mount
  React.useEffect(() => {
    const savedCourses = localStorage.getItem('hrms_training_courses');
    if (savedCourses) {
      try {
        setTrainingCourses(JSON.parse(savedCourses));
      } catch (error) {
        console.error('Error loading training courses:', error);
        setTrainingCourses(initialTrainingCourses);
      }
    } else {
      setTrainingCourses(initialTrainingCourses);
    }
  }, []);

  // Save training courses to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_training_courses', JSON.stringify(trainingCourses));
    } catch (error) {
      console.error('Error saving training courses:', error);
    }
  }, [trainingCourses]);

  // Sample enrolled employees data
  const initialEnrollments = [
    {
      id: 1,
      employeeName: "خالد محمد",
      employeeId: "EMP001",
      courseName: "مهارات القيادة الإدارية",
      department: "المبيعات",
      enrollmentDate: "2023-06-01",
      status: "مؤكد",
    },
    {
      id: 2,
      employeeName: "نورة أحمد",
      employeeId: "EMP015",
      courseName: "أساسيات الموارد البشرية",
      department: "الموارد البشرية",
      enrollmentDate: "2023-06-05",
      status: "مؤكد",
    },
    {
      id: 3,
      employeeName: "عبدالله سعيد",
      employeeId: "EMP023",
      courseName: "إدارة المشاريع الاحترافية",
      department: "المشاريع",
      enrollmentDate: "2023-05-20",
      status: "مكتمل",
    },
    {
      id: 4,
      employeeName: "سارة محمد",
      employeeId: "EMP008",
      courseName: "مهارات التواصل الفعال",
      department: "خدمة العملاء",
      enrollmentDate: "2023-06-15",
      status: "قيد الانتظار",
    },
  ];

  const [enrollments, setEnrollments] = useState([]);

  // Load enrollments from localStorage on component mount
  React.useEffect(() => {
    const savedEnrollments = localStorage.getItem('hrms_enrollments');
    if (savedEnrollments) {
      try {
        setEnrollments(JSON.parse(savedEnrollments));
      } catch (error) {
        console.error('Error loading enrollments:', error);
        setEnrollments(initialEnrollments);
      }
    } else {
      setEnrollments(initialEnrollments);
    }
  }, []);

  // Save enrollments to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_enrollments', JSON.stringify(enrollments));
    } catch (error) {
      console.error('Error saving enrollments:', error);
    }
  }, [enrollments]);

  const handleViewCourse = (courseId: number) => {
    // In a real app, you would fetch the course details by ID
    const course = trainingCourses.find((c) => c.id === courseId);
    setSelectedCourse(course);
    setShowDetail(true);
    setShowParticipants(false);
    setShowParticipantDetail(false);
  };

  const handleEditCourse = (courseId: number) => {
    // In a real app, you would open an edit form with the course data
    const course = trainingCourses.find((c) => c.id === courseId);
    console.log("تعديل الدورة:", course);
    // You can implement edit logic here
    alert(`تعديل الدورة: ${course?.title}`);
  };

  const handleDeleteCourse = (courseId: number) => {
    // In a real app, you would show a confirmation dialog
    const course = trainingCourses.find((c) => c.id === courseId);
    if (confirm(`هل أنت متأكد من حذف الدورة: ${course?.title}؟`)) {
      setTrainingCourses((prev) => prev.filter((c) => c.id !== courseId));
      console.log("تم حذف الدورة:", course);
    }
  };

  const handleEditParticipant = (participantId: string) => {
    // In a real app, you would open an edit form with the participant data
    console.log("تعديل المشارك:", participantId);
    alert(`تعديل المشارك: ${participantId}`);
  };

  const handleDeleteParticipant = (participantId: string) => {
    // In a real app, you would show a confirmation dialog
    if (confirm(`هل أنت متأكد من حذف المشارك: ${participantId}؟`)) {
      console.log("تم حذف المشارك:", participantId);
      alert(`تم حذف المشارك: ${participantId}`);
    }
  };

  const handleViewParticipantDetails = (participantId: string) => {
    // Sample participant data - in a real app, you would fetch by ID
    const sampleParticipants = [
      {
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
      },
      {
        id: "P002",
        name: "فاطمة علي",
        email: "fatima@example.com",
        department: "الموارد البشرية",
        position: "مدير موارد بشرية",
        attendanceRate: 100,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P002",
        phone: "+966 50 234 5678",
        joinDate: "2022-08-20",
        completedCourses: 12,
        currentCourses: ["إدارة المشاريع الاحترافية"],
      },
      {
        id: "P003",
        name: "خالد عبدالله",
        email: "khalid@example.com",
        department: "المالية",
        position: "محاسب",
        attendanceRate: 85,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P003",
        phone: "+966 50 345 6789",
        joinDate: "2023-03-10",
        completedCourses: 5,
        currentCourses: ["مهارات التواصل الفعال"],
      },
      {
        id: "P004",
        name: "نورة محمد",
        email: "noura@example.com",
        department: "التسويق",
        position: "مدير تسويق",
        attendanceRate: 90,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P004",
        phone: "+966 50 456 7890",
        joinDate: "2022-11-15",
        completedCourses: 10,
        currentCourses: ["مهارات القيادة الإدارية"],
      },
      {
        id: "P005",
        name: "عبدالرحمن سعيد",
        email: "abdulrahman@example.com",
        department: "المبيعات",
        position: "مندوب مبيعات",
        attendanceRate: 80,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P005",
        phone: "+966 50 567 8901",
        joinDate: "2023-05-20",
        completedCourses: 3,
        currentCourses: ["أساسيات الموارد البشرية"],
      },
    ];

    const participant =
      sampleParticipants.find((p) => p.id === participantId) ||
      sampleParticipants[0];
    setSelectedParticipant(participant);
    setShowParticipantDetail(true);
    setShowDetail(false);
  };

  // Filter courses based on search term
  const filteredCourses = trainingCourses.filter(
    (course) =>
      course.title.includes(searchTerm) ||
      course.instructor.includes(searchTerm) ||
      course.department.includes(searchTerm) ||
      course.status.includes(searchTerm),
  );

  // Filter enrollments based on search term
  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.employeeName.includes(searchTerm) ||
      enrollment.employeeId.includes(searchTerm) ||
      enrollment.courseName.includes(searchTerm) ||
      enrollment.department.includes(searchTerm) ||
      enrollment.status.includes(searchTerm),
  );

  // Render course status badge
  const renderCourseStatusBadge = (status) => {
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

  // Render enrollment status badge
  const renderEnrollmentStatusBadge = (status) => {
    switch (status) {
      case "مؤكد":
        return <Badge className="bg-green-500">مؤكد</Badge>;
      case "قيد الانتظار":
        return <Badge className="bg-yellow-500">قيد الانتظار</Badge>;
      case "مكتمل":
        return <Badge className="bg-gray-500">مكتمل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setShowParticipantDetail(false);
    setSelectedCourse(null);
    setSelectedParticipant(null);
  };

  // Show course detail view
  if (showDetail && selectedCourse) {
    return (
      <MainLayout title="التدريب" subtitle="تفاصيل الدورة التدريبية">
        <TrainingDetail course={selectedCourse} onBack={handleBackToList} />
      </MainLayout>
    );
  }

  // Show participant detail view
  if (showParticipantDetail && selectedParticipant) {
    return (
      <MainLayout title="التدريب" subtitle="تفاصيل المشارك">
        <ParticipantDetail
          participant={selectedParticipant}
          onBack={handleBackToList}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="التدريب" subtitle="إدارة برامج التدريب والتطوير">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Tabs
                defaultValue="courses"
                className="w-full"
                onValueChange={setActiveTab}
                value={activeTab}
              >
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="courses">الدورات التدريبية</TabsTrigger>
                    <TabsTrigger value="enrollments">المشاركين</TabsTrigger>
                    <TabsTrigger value="calendar">التقويم</TabsTrigger>
                  </TabsList>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث..."
                        className="pr-9 w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          {activeTab === "courses"
                            ? "إضافة دورة"
                            : "تسجيل موظف"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>
                            {activeTab === "courses"
                              ? "إضافة دورة تدريبية جديدة"
                              : "تسجيل موظف في دورة"}
                          </DialogTitle>
                        </DialogHeader>
                        {activeTab === "courses" ? (
                          <TrainingForm
                            onSubmit={(data) => {
                              console.log("إضافة دورة جديدة:", data);
                              setTrainingCourses((prev) => [
                                ...prev,
                                {
                                  id: prev.length + 1,
                                  ...data,
                                  enrolledCount: 0,
                                  status: "قادم",
                                  objectives: [],
                                  duration: "حسب المدة المحددة",
                                },
                              ]);
                              setIsAddDialogOpen(false);
                              alert("تم إضافة الدورة بنجاح!");
                            }}
                            onCancel={() => setIsAddDialogOpen(false)}
                          />
                        ) : (
                          <EnrollmentForm
                            onSubmit={(data) => {
                              console.log("تسجيل موظف في دورة:", data);
                              setEnrollments((prev) => [
                                ...prev,
                                {
                                  id: prev.length + 1,
                                  employeeName: data.employeeName,
                                  employeeId: data.employeeId,
                                  courseName: data.courseName,
                                  department: data.department,
                                  enrollmentDate: data.enrollmentDate,
                                  status: data.status,
                                },
                              ]);
                              setIsAddDialogOpen(false);
                              alert("تم تسجيل الموظف في الدورة بنجاح!");
                            }}
                            onCancel={() => setIsAddDialogOpen(false)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <TabsContent value="courses" className="mt-6">
                  <TrainingList
                    courses={filteredCourses}
                    onViewCourse={handleViewCourse}
                    onEditCourse={handleEditCourse}
                    onDeleteCourse={handleDeleteCourse}
                  />
                </TabsContent>

                <TabsContent value="enrollments" className="mt-6">
                  <ParticipantsList
                    onViewParticipant={handleViewParticipantDetails}
                    onEditParticipant={handleEditParticipant}
                    onDeleteParticipant={handleDeleteParticipant}
                  />
                </TabsContent>

                <TabsContent value="calendar" className="mt-6">
                  <div className="p-8 text-center border rounded-md">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-medium mb-2">تقويم التدريب</h3>
                    <p className="text-gray-500 mb-4">
                      عرض جدول الدورات التدريبية في تقويم شهري
                    </p>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" /> عرض التقويم
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Training;
