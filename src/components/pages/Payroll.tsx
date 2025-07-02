import React from "react";
import MainLayout from "../layout/MainLayout";
import PayrollList from "../payroll/PayrollList";

const Payroll = () => {
  return (
    <MainLayout title="إدارة المرتبات" subtitle="متابعة وإدارة مرتبات الموظفين">
      <div className="grid grid-cols-1 gap-6">
        <PayrollList />
      </div>
    </MainLayout>
  );
};

export default Payroll;
