import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isWithinInterval, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import {
  CalendarIcon,
  Printer,
  Download,
  UserCheck,
  UserMinus,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttendanceReportProps {
  className?: string;
}

const AttendanceReport = ({ className }: AttendanceReportProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [department, setDepartment] = useState<string>("all");

  // Mock data for the report
  const attendanceData = [
    {
      date: "2023-05-01",
      department: "تقنية المعلومات",
      present: 18,
      absent: 2,
      late: 3,
      total: 23,
      percentage: 78,
    },
    {
      date: "2023-05-02",
      department: "تقنية المعلومات",
      present: 20,
      absent: 1,
      late: 2,
      total: 23,
      percentage: 87,
    },
    {
      date: "2023-05-03",
      department: "تقنية المعلومات",
      present: 21,
      absent: 0,
      late: 2,
      total: 23,
      percentage: 91,
    },
    {
      date: "2023-05-01",
      department: "المالية",
      present: 12,
      absent: 1,
      late: 2,
      total: 15,
      percentage: 80,
    },
    {
      date: "2023-05-02",
      department: "المالية",
      present: 13,
      absent: 1,
      late: 1,
      total: 15,
      percentage: 87,
    },
    {
      date: "2023-05-03",
      department: "المالية",
      present: 14,
      absent: 0,
      late: 1,
      total: 15,
      percentage: 93,
    },
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير الحضور</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .date { text-align: center; margin-bottom: 20px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .summary { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .summary-card { padding: 15px; border: 1px solid #ddd; border-radius: 5px; width: 30%; }
            .summary-title { font-size: 14px; color: #666; margin-bottom: 5px; }
            .summary-value { font-size: 18px; font-weight: bold; }
            .green { color: #16a34a; }
            .red { color: #dc2626; }
            .amber { color: #d97706; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>تقرير الحضور</h1>
            <div class="date">الفترة: ${startDate && endDate ? `${format(startDate, "yyyy-MM-dd", { locale: ar })} إلى ${format(endDate, "yyyy-MM-dd", { locale: ar })}` : ""}</div>
          </div>
          
          <div class="summary">
            <div class="summary-card">
              <div class="summary-title">الحضور</div>
              <div class="summary-value green">${attendanceData
                .filter(
                  (item) =>
                    department === "all" || item.department === department,
                )
                .reduce((sum, item) => sum + item.present, 0)}</div>
            </div>
            <div class="summary-card">
              <div class="summary-title">الغياب</div>
              <div class="summary-value red">${attendanceData
                .filter(
                  (item) =>
                    department === "all" || item.department === department,
                )
                .reduce((sum, item) => sum + item.absent, 0)}</div>
            </div>
            <div class="summary-card">
              <div class="summary-title">التأخير</div>
              <div class="summary-value amber">${attendanceData
                .filter(
                  (item) =>
                    department === "all" || item.department === department,
                )
                .reduce((sum, item) => sum + item.late, 0)}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>القسم</th>
                <th>الحضور</th>
                <th>الغياب</th>
                <th>التأخير</th>
                <th>الإجمالي</th>
                <th>نسبة الحضور</th>
              </tr>
            </thead>
            <tbody>
              ${attendanceData
                .filter((item) => {
                  const itemDate = parseISO(item.date);
                  const dateInRange =
                    startDate && endDate
                      ? isWithinInterval(itemDate, {
                          start: startDate,
                          end: endDate,
                        })
                      : true;
                  return (
                    (department === "all" || item.department === department) &&
                    dateInRange
                  );
                })
                .map(
                  (item) => `
                  <tr>
                    <td>${item.date}</td>
                    <td>${item.department}</td>
                    <td class="green">${item.present}</td>
                    <td class="red">${item.absent}</td>
                    <td class="amber">${item.late}</td>
                    <td>${item.total}</td>
                    <td>${item.percentage}%</td>
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="footer">
            <p>تم إنشاء هذا التقرير بواسطة نظام إدارة الموارد البشرية - ${new Date().toLocaleDateString("ar-SA")}</p>
          </div>
        </body>
      </html>
    `;

    // Write to the new window and print
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      // printWindow.close();
    }, 500);
  };

  return (
    <Card
      className={`border shadow-sm bg-white ${className} print:shadow-none print:border-0`}
    >
      <CardHeader className="pb-2 print:hidden">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">تقرير الحضور</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">القسم</label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأقسام</SelectItem>
                <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                <SelectItem value="المالية">المالية</SelectItem>
                <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">من تاريخ</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-right"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "yyyy-MM-dd", { locale: ar })
                  ) : (
                    <span>اختر تاريخ البداية</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">إلى تاريخ</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-right"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "yyyy-MM-dd", { locale: ar })
                  ) : (
                    <span>اختر تاريخ النهاية</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-green-500" />
                  <span className="font-medium">الحضور</span>
                </div>
                <span className="text-xl font-bold">
                  {attendanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
                    .reduce((sum, item) => sum + item.present, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserMinus className="h-5 w-5 text-red-500" />
                  <span className="font-medium">الغياب</span>
                </div>
                <span className="text-xl font-bold">
                  {attendanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
                    .reduce((sum, item) => sum + item.absent, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">التأخير</span>
                </div>
                <span className="text-xl font-bold">
                  {attendanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
                    .reduce((sum, item) => sum + item.late, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">القسم</TableHead>
              <TableHead className="text-right">الحضور</TableHead>
              <TableHead className="text-right">الغياب</TableHead>
              <TableHead className="text-right">التأخير</TableHead>
              <TableHead className="text-right">الإجمالي</TableHead>
              <TableHead className="text-right">نسبة الحضور</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData
              .filter((item) => {
                const itemDate = parseISO(item.date);
                const dateInRange =
                  startDate && endDate
                    ? isWithinInterval(itemDate, {
                        start: startDate,
                        end: endDate,
                      })
                    : true;
                return (
                  (department === "all" || item.department === department) &&
                  dateInRange
                );
              })
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell className="text-green-600">
                    {item.present}
                  </TableCell>
                  <TableCell className="text-red-600">{item.absent}</TableCell>
                  <TableCell className="text-amber-600">{item.late}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell className={getStatusColor(item.percentage)}>
                    {item.percentage}%
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AttendanceReport;
