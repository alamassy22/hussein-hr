import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Clock,
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserMinus,
} from "lucide-react";
import DashboardHeader from "./dashboard/DashboardHeader";
import Sidebar from "./layout/Sidebar";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "default" | "blue" | "green" | "yellow" | "red";
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  color = "default",
}: StatCardProps) => {
  const colorClasses = {
    default: "bg-white",
    blue: "bg-blue-50",
    green: "bg-green-50",
    yellow: "bg-amber-50",
    red: "bg-red-50",
  };

  const iconColorClasses = {
    default: "text-gray-500 bg-gray-100",
    blue: "text-blue-500 bg-blue-100",
    green: "text-green-500 bg-green-100",
    yellow: "text-amber-500 bg-amber-100",
    red: "text-red-500 bg-red-100",
  };

  const trendIcon =
    trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : trend === "down" ? (
      <TrendingDown className="h-4 w-4 text-red-500" />
    ) : null;

  return (
    <Card className={`${colorClasses[color]} border shadow-sm`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
            {trend && trendValue && (
              <div className="flex items-center gap-1 mt-2">
                {trendIcon}
                <span
                  className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconColorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EmployeeCardProps {
  name: string;
  position: string;
  department: string;
  idExpiry?: string;
  avatar?: string;
  status?: "active" | "vacation" | "sick" | "absent";
}

const EmployeeCard = ({
  name = "أحمد محمد",
  position = "مطور برمجيات",
  department = "تقنية المعلومات",
  idExpiry = "15/06/2023",
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=employee1",
  status = "active",
}: EmployeeCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    vacation: "bg-blue-100 text-blue-700",
    sick: "bg-amber-100 text-amber-700",
    absent: "bg-red-100 text-red-700",
  };

  const statusText = {
    active: "يعمل",
    vacation: "إجازة",
    sick: "مرضي",
    absent: "غائب",
  };

  return (
    <Card className="border shadow-sm bg-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{position}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{department}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
              >
                {statusText[status]}
              </span>
            </div>
          </div>
        </div>
        {idExpiry && (
          <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <span className="text-xs text-gray-500">انتهاء الهوية</span>
            <span className="text-xs font-medium text-red-500">{idExpiry}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Home = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: "إجمالي الموظفين",
      value: 248,
      icon: <Users className="h-6 w-6" />,
      trend: "up" as const,
      trendValue: "+12% من الشهر الماضي",
      color: "blue" as const,
    },
    {
      title: "الحضور اليوم",
      value: "92%",
      icon: <Clock className="h-6 w-6" />,
      description: "228 من 248 موظف",
      color: "green" as const,
    },
    {
      title: "الإجازات النشطة",
      value: 15,
      icon: <Calendar className="h-6 w-6" />,
      color: "yellow" as const,
    },
    {
      title: "هويات منتهية",
      value: 8,
      icon: <AlertTriangle className="h-6 w-6" />,
      trend: "down" as const,
      trendValue: "-3 من الشهر الماضي",
      color: "red" as const,
    },
  ];

  const employeesWithExpiringIds = [
    {
      name: "سارة أحمد",
      position: "محاسب",
      department: "المالية",
      idExpiry: "05/06/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee2",
      status: "active" as const,
    },
    {
      name: "محمد علي",
      position: "مدير مبيعات",
      department: "المبيعات",
      idExpiry: "12/06/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee3",
      status: "active" as const,
    },
    {
      name: "فاطمة محمد",
      position: "مسؤول موارد بشرية",
      department: "الموارد البشرية",
      idExpiry: "18/06/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee4",
      status: "vacation" as const,
    },
  ];

  const attendanceSummary = {
    present: 228,
    absent: 12,
    late: 8,
    total: 248,
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              لوحة التحكم الرئيسية
            </h1>
            <p className="text-gray-500">
              مرحباً بك في نظام إدارة الموارد البشرية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 border shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  ملخص الحضور اليومي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-green-500" />
                      <span>الحاضرون</span>
                    </div>
                    <span className="font-medium">
                      {attendanceSummary.present} موظف
                    </span>
                  </div>
                  <Progress
                    value={
                      (attendanceSummary.present / attendanceSummary.total) *
                      100
                    }
                    className="h-2 bg-gray-100"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserMinus className="h-5 w-5 text-red-500" />
                      <span>الغائبون</span>
                    </div>
                    <span className="font-medium">
                      {attendanceSummary.absent} موظف
                    </span>
                  </div>
                  <Progress
                    value={
                      (attendanceSummary.absent / attendanceSummary.total) * 100
                    }
                    className="h-2 bg-gray-100"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-500" />
                      <span>المتأخرون</span>
                    </div>
                    <span className="font-medium">
                      {attendanceSummary.late} موظفين
                    </span>
                  </div>
                  <Progress
                    value={
                      (attendanceSummary.late / attendanceSummary.total) * 100
                    }
                    className="h-2 bg-gray-100"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  الهويات المنتهية قريباً
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeesWithExpiringIds.map((employee, index) => (
                    <EmployeeCard key={index} {...employee} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Card className="border shadow-sm bg-white">
              <CardHeader className="pb-0">
                <Tabs defaultValue="daily">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      تقارير الأداء
                    </CardTitle>
                    <TabsList>
                      <TabsTrigger value="daily">يومي</TabsTrigger>
                      <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
                      <TabsTrigger value="monthly">شهري</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="daily">
                    <CardContent className="pt-6">
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">
                          بيانات الأداء اليومي ستظهر هنا
                        </p>
                      </div>
                    </CardContent>
                  </TabsContent>
                  <TabsContent value="weekly">
                    <CardContent className="pt-6">
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">
                          بيانات الأداء الأسبوعي ستظهر هنا
                        </p>
                      </div>
                    </CardContent>
                  </TabsContent>
                  <TabsContent value="monthly">
                    <CardContent className="pt-6">
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">
                          بيانات الأداء الشهري ستظهر هنا
                        </p>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
