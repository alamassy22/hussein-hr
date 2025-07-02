import React from "react";
import MainLayout from "../layout/MainLayout";
import EmployeesList from "../employees/EmployeesList";

const Employees = () => {
  return (
    <MainLayout title="إدارة الموظفين" subtitle="عرض وإدارة بيانات الموظفين">
      <div className="bg-white rounded-lg shadow p-6">
        <EmployeesList />
      </div>
    </MainLayout>
  );
};

export default Employees;
