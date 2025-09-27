import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import Home from "../home";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AttendanceSchedule from "../attendance/AttendanceSchedule";
import LeaveRequestForm from "../leaves/LeaveRequestForm";
import AdvanceRequestForm from "../advances/AdvanceRequestForm";
import HandoverForm from "../turnover/HandoverForm";
import EndOfServiceCalculator from "../turnover/EndOfServiceCalculator";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const isEmployee = user?.role === "employee";
  
  // If user is admin or org_admin, show the main dashboard
  if (user?.role === "super_admin" || user?.role === "org_admin" || user?.role === "manager") {
    return <Home />;
  }
  
  // For employees, show personal dashboard
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showAdvanceForm, setShowAdvanceForm] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Mock employee data - in a real app, this would come from an API or context
  const employeeData = {
    name: "أحمد محمد",
    id: "EMP001",
    department: "تقنية المعلومات",
    position: "مطور برمجيات",
    joinDate: "2022-01-15",
    salary: 12000,
    leaveBalance: {
      annual: 21,
      sick: 30,
      emergency: 7,
    },
    tasks: [
      {
        id: "1",
        title: "تطوير واجهة المستخدم",
        dueDate: "2023-06-30",
        priority: "عالي",
        status: "قيد التنفيذ",
      },
      {
        id: "2",
        title: "اختبار النظام",
        dueDate: "2023-07-05",
        priority: "متوسط",
        status: "قيد التنفيذ",
      },
      {
        id: "3",
        title: "كتابة التوثيق",
        dueDate: "2023-07-10",
        priority: "منخفض",
        status: "لم يبدأ",
      },
    ],
  };

  const handleLeaveRequest = (data) => {
    console.log("Leave request submitted:", data);
    setShowLeaveForm(false);
    // Here you would send the data to your API
  };

  const handleAdvanceRequest = (data) => {
    console.log("Advance request submitted:", data);
    setShowAdvanceForm(false);
    // Here you would send the data to your API
  };

  return (
    <MainLayout
      title={`مرحباً ${user?.full_name || employeeData.name}`}
      subtitle="صفحة الموظف الشخصية"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList
          className="grid grid-cols-3 mb-4"
        >
          <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
          <TabsTrigger value="tasks">المهام والجدول</TabsTrigger>
          <TabsTrigger value="requests">الطلبات</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          {/* Personal Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 border shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  البيانات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">الاسم</p>
                    <p className="font-medium">{employeeData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الرقم الوظيفي</p>
                    <p className="font-medium">{employeeData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">القسم</p>
                    <p className="font-medium">{employeeData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المسمى الوظيفي</p>
                    <p className="font-medium">{employeeData.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">تاريخ التعيين</p>
                    <p className="font-medium">
                      {new Date(employeeData.joinDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الراتب الأساسي</p>
                    <p className="font-medium">
                      {employeeData.salary.toLocaleString("ar-SA")} ريال
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Balance */}
            <Card className="border shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  رصيد الإجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجازة سنوية</span>
                    <span className="font-bold text-lg">
                      {employeeData.leaveBalance.annual} يوم
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>إجازة مرضية</span>
                    <span className="font-bold text-lg">
                      {employeeData.leaveBalance.sick} يوم
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>إجازة طارئة</span>
                    <span className="font-bold text-lg">
                      {employeeData.leaveBalance.emergency} يوم
                    </span>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => setShowLeaveForm(true)}
                  >
                    طلب إجازة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          {/* Work Schedule */}
          <div className="mb-8">
            <AttendanceSchedule />
          </div>

          {/* Tasks */}
          <Card className="border shadow-sm bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                المهام المسندة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">عنوان المهمة</th>
                      <th className="text-right py-3 px-4">تاريخ الاستحقاق</th>
                      <th className="text-right py-3 px-4">الأولوية</th>
                      <th className="text-right py-3 px-4">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.tasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{task.title}</td>
                        <td className="py-3 px-4">
                          {new Date(task.dueDate).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${task.priority === "عالي" ? "bg-red-100 text-red-800" : task.priority === "متوسط" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${task.status === "قيد التنفيذ" ? "bg-blue-100 text-blue-800" : task.status === "مكتمل" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          {/* Request Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={() => setShowLeaveForm(true)}>طلب إجازة</Button>
            <Button onClick={() => setShowAdvanceForm(true)}>طلب سلفة</Button>
          </div>

          {/* Leave Request Form */}
          {showLeaveForm && (
            <div className="mb-8">
              <LeaveRequestForm
                onSubmit={handleLeaveRequest}
                onCancel={() => setShowLeaveForm(false)}
              />
            </div>
          )}

          {/* Advance Request Form */}
          {showAdvanceForm && (
            <div className="mb-8">
              <AdvanceRequestForm
                onSubmit={handleAdvanceRequest}
                onCancel={() => setShowAdvanceForm(false)}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Dashboard;
