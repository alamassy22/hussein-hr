import React from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeReport from "../reports/EmployeeReport";
import AttendanceReport from "../reports/AttendanceReport";
import LeavesReport from "../reports/LeavesReport";
import PayrollReport from "../reports/PayrollReport";
import PerformanceEvaluation from "../performance/PerformanceEvaluation";
import TurnoverCalculator from "../turnover/TurnoverCalculator";
import ExpiredIDsReport from "../reports/ExpiredIDsReport";

const Reports = () => {
  return (
    <MainLayout title="التقارير" subtitle="عرض وطباعة التقارير المختلفة">
      <Card>
        <CardHeader className="pb-0">
          <Tabs defaultValue="employees">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">التقارير</CardTitle>
              <TabsList>
                <TabsTrigger value="employees">الموظفين</TabsTrigger>
                <TabsTrigger value="attendance">الحضور</TabsTrigger>
                <TabsTrigger value="leaves">الإجازات</TabsTrigger>
                <TabsTrigger value="payroll">المرتبات</TabsTrigger>
                <TabsTrigger value="expired-ids">الهويات المنتهية</TabsTrigger>
                <TabsTrigger value="performance">تقييم الأداء</TabsTrigger>
                <TabsTrigger value="turnover">دوران الموظفين</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="employees">
              <CardContent className="pt-6">
                <EmployeeReport />
              </CardContent>
            </TabsContent>
            <TabsContent value="attendance">
              <CardContent className="pt-6">
                <AttendanceReport />
              </CardContent>
            </TabsContent>
            <TabsContent value="leaves">
              <CardContent className="pt-6">
                <LeavesReport />
              </CardContent>
            </TabsContent>
            <TabsContent value="payroll">
              <CardContent className="pt-6">
                <PayrollReport />
              </CardContent>
            </TabsContent>
            <TabsContent value="expired-ids">
              <CardContent className="pt-6">
                <ExpiredIDsReport />
              </CardContent>
            </TabsContent>
            <TabsContent value="performance">
              <CardContent className="pt-6">
                <PerformanceEvaluation />
              </CardContent>
            </TabsContent>
            <TabsContent value="turnover">
              <CardContent className="pt-6">
                <TurnoverCalculator />
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </MainLayout>
  );
};

export default Reports;
