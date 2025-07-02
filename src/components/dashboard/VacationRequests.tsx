import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Check, X } from "lucide-react";

interface VacationRequest {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  startDate: string;
  endDate: string;
  type: "annual" | "sick" | "emergency" | "other";
  status: "pending" | "approved" | "rejected";
}

const mockVacationRequests: VacationRequest[] = [
  {
    id: "1",
    employeeName: "سارة أحمد",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee2",
    department: "المالية",
    startDate: "20/05/2023",
    endDate: "25/05/2023",
    type: "annual",
    status: "pending",
  },
  {
    id: "2",
    employeeName: "محمد علي",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee3",
    department: "المبيعات",
    startDate: "18/05/2023",
    endDate: "19/05/2023",
    type: "emergency",
    status: "pending",
  },
  {
    id: "3",
    employeeName: "فاطمة محمد",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee4",
    department: "الموارد البشرية",
    startDate: "01/06/2023",
    endDate: "15/06/2023",
    type: "annual",
    status: "pending",
  },
];

const vacationTypeText = {
  annual: "سنوية",
  sick: "مرضية",
  emergency: "طارئة",
  other: "أخرى",
};

const vacationTypeColors = {
  annual: "bg-blue-100 text-blue-700",
  sick: "bg-amber-100 text-amber-700",
  emergency: "bg-red-100 text-red-700",
  other: "bg-gray-100 text-gray-700",
};

interface VacationRequestsProps {
  className?: string;
}

const VacationRequests = ({ className }: VacationRequestsProps) => {
  return (
    <Card className={`border shadow-sm bg-white ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">طلبات الإجازات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockVacationRequests.map((request) => (
            <div
              key={request.id}
              className="p-3 border rounded-lg flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={request.employeeAvatar}
                      alt={request.employeeName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{request.employeeName}</h4>
                    <p className="text-xs text-gray-500">
                      {request.department}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${vacationTypeColors[request.type]}`}
                >
                  {vacationTypeText[request.type]}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-500" />
                <span>
                  {request.startDate} - {request.endDate}
                </span>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <X size={14} />
                  <span>رفض</span>
                </Button>
                <Button
                  size="sm"
                  className="gap-1 bg-green-600 hover:bg-green-700"
                >
                  <Check size={14} />
                  <span>موافقة</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VacationRequests;
