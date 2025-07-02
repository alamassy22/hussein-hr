import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ExpiredIDsWidgetProps {
  className?: string;
}

const ExpiredIDsWidget = ({ className }: ExpiredIDsWidgetProps) => {
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

  return (
    <Card className={`border shadow-sm bg-white ${className}`}>
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
  );
};

export default ExpiredIDsWidget;
