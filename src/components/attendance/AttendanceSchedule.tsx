import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil, Printer } from "lucide-react";

interface ScheduleItem {
  id: string;
  employeeName: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  location: string;
  workDays: number;
}

interface AttendanceScheduleProps {
  schedules?: ScheduleItem[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onPrint?: (id: string) => void;
}

const AttendanceSchedule = ({
  schedules = [
    {
      id: "1",
      employeeName: "أحمد محمد",
      employeeId: "EMP001",
      startTime: "08:00",
      endTime: "16:00",
      location: "المقر الرئيسي",
      workDays: 22,
    },
    {
      id: "2",
      employeeName: "سارة أحمد",
      employeeId: "EMP002",
      startTime: "09:00",
      endTime: "17:00",
      location: "الفرع الشمالي",
      workDays: 22,
    },
    {
      id: "3",
      employeeName: "محمد علي",
      employeeId: "EMP003",
      startTime: "07:30",
      endTime: "15:30",
      location: "الفرع الغربي",
      workDays: 22,
    },
  ],
  onView = () => {},
  onEdit = () => {},
  onPrint = () => {},
}: AttendanceScheduleProps) => {
  return (
    <Card className="border shadow-sm bg-white w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          جدول مواعيد الدوام
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>رقم الموظف</TableHead>
                <TableHead>بداية الدوام</TableHead>
                <TableHead>نهاية الدوام</TableHead>
                <TableHead>موقع الدوام</TableHead>
                <TableHead>عدد أيام العمل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.employeeName}</TableCell>
                  <TableCell>{schedule.employeeId}</TableCell>
                  <TableCell>{schedule.startTime}</TableCell>
                  <TableCell>{schedule.endTime}</TableCell>
                  <TableCell>{schedule.location}</TableCell>
                  <TableCell>{schedule.workDays}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(schedule.id)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(schedule.id)}
                      >
                        <Pencil className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPrint(schedule.id)}
                      >
                        <Printer className="h-4 w-4 ml-1" />
                        طباعة
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSchedule;
