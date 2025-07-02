import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const MainLayout = ({
  children,
  title = "لوحة التحكم الرئيسية",
  subtitle = "مرحباً بك في نظام إدارة الموارد البشرية",
}: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
