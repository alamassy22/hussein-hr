import React from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "../layout/Sidebar";
import StatisticsCards from "./StatisticsCards";
import EmployeesList from "../employees/EmployeesList";
import AttendanceChart from "../attendance/AttendanceChart";
import VacationRequests from "./VacationRequests";
import ExpiredIDsWidget from "./ExpiredIDsWidget";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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

          <StatisticsCards className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <AttendanceChart />
            </div>
            <div>
              <ExpiredIDsWidget />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <EmployeesList />
            </div>
            <div>
              <VacationRequests />
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
