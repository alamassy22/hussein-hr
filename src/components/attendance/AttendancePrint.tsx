import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttendanceRecord {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  status: string;
  employeeName?: string;
  position?: string;
}

interface EmployeeSchedule {
  id: string;
  employeeName: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  location: string;
  records?: AttendanceRecord[];
  dateRange?: string;
}

interface AttendancePrintProps {
  data: EmployeeSchedule;
}

const AttendancePrint = ({
  data = {
    id: "1",
    employeeName: "أحمد محمد",
    employeeId: "EMP001",
    startTime: "08:00",
    endTime: "16:00",
    location: "المقر الرئيسي",
    records: [
      {
        date: "2023-05-01",
        checkInTime: "07:55",
        checkOutTime: "16:05",
        location: "المقر الرئيسي",
        status: "حاضر",
      },
      {
        date: "2023-05-02",
        checkInTime: "08:10",
        checkOutTime: "16:00",
        location: "المقر الرئيسي",
        status: "متأخر",
      },
      {
        date: "2023-05-03",
        checkInTime: "07:50",
        checkOutTime: "16:00",
        location: "المقر الرئيسي",
        status: "حاضر",
      },
    ],
  },
}: AttendancePrintProps) => {
  return (
    <div className="p-6 bg-white max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">تقرير الحضور والانصراف</h1>
        <p className="text-gray-500">
          تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
        </p>
        {data.dateRange && (
          <p className="text-gray-700 mt-2">الفترة: {data.dateRange}</p>
        )}
      </div>

      <Card className="mb-6 border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">بيانات الموظف</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">اسم الموظف</p>
              <p className="font-medium">{data.employeeName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">رقم الموظف</p>
              <p className="font-medium">{data.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">بداية الدوام</p>
              <p className="font-medium">{data.startTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">نهاية الدوام</p>
              <p className="font-medium">{data.endTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">موقع الدوام</p>
              <p className="font-medium">{data.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            سجل الحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>الموظف</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>وقت الحضور</TableHead>
                <TableHead>وقت الانصراف</TableHead>
                <TableHead>الموقع</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.records?.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    {record.employeeName || data.employeeName}
                  </TableCell>
                  <TableCell>{record.position || "-"}</TableCell>
                  <TableCell>{record.checkInTime}</TableCell>
                  <TableCell>{record.checkOutTime}</TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${record.status === "حاضر" ? "bg-green-100 text-green-800" : record.status === "متأخر" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">توقيع الموظف</p>
            <div className="mt-2 border-b border-dashed border-gray-300 w-40 h-10"></div>
          </div>
          <div>
            <p className="text-sm text-gray-500">توقيع المدير</p>
            <div className="mt-2 border-b border-dashed border-gray-300 w-40 h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePrint;
