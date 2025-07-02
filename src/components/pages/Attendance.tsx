import React from "react";
import MainLayout from "../layout/MainLayout";
import AttendanceChart from "../attendance/AttendanceChart";
import AttendanceCheckInOut from "../attendance/AttendanceCheckInOut";
import { useAuth } from "@/contexts/AuthContext";

const Attendance = () => {
  const { user } = useAuth();
  const isEmployee = user?.role === "employee";

  return (
    <MainLayout title="إدارة الحضور" subtitle="متابعة حضور وانصراف الموظفين">
      <div className="grid grid-cols-1 gap-6">
        {isEmployee ? <AttendanceCheckInOut /> : <AttendanceChart />}
      </div>
    </MainLayout>
  );
};

export default Attendance;
