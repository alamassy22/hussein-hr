import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon, Printer, Download, Save } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

interface EmployeeReportProps {
  className?: string;
}

const EmployeeReport = ({ className }: EmployeeReportProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [employee, setEmployee] = useState<string>("all");
  const [department, setDepartment] = useState<string>("all");
  const [isPrinting, setIsPrinting] = useState(false);

  // Mock data for the report
  const employeeData = [
    {
      id: "1",
      name: "أحمد محمد",
      position: "مطور برمجيات",
      department: "تقنية المعلومات",
      attendance: { present: 22, absent: 2, late: 4, total: 28 },
      workHours: 176,
      performance: 85,
    },
    {
      id: "2",
      name: "سارة أحمد",
      position: "مصمم واجهات",
      department: "تقنية المعلومات",
      attendance: { present: 26, absent: 0, late: 2, total: 28 },
      workHours: 208,
      performance: 92,
    },
    {
      id: "3",
      name: "محمد علي",
      position: "محاسب",
      department: "المالية",
      attendance: { present: 20, absent: 5, late: 3, total: 28 },
      workHours: 160,
      performance: 78,
    },
  ];

  // Filter data based on selected filters
  const filteredData = employeeData.filter((emp) => {
    const matchesEmployee = employee === "all" || emp.id === employee;
    const matchesDepartment =
      department === "all" || emp.department === department;
    return matchesEmployee && matchesDepartment;
  });

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-amber-500";
    return "bg-red-500";
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير الموظفين</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .date { text-align: center; margin-bottom: 20px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .performance-good { color: #16a34a; }
            .performance-medium { color: #d97706; }
            .performance-poor { color: #dc2626; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>تقرير الموظفين</h1>
            <div class="date">
              ${
                startDate && endDate
                  ? `الفترة: ${format(startDate, "PPP", { locale: ar })} - ${format(
                      endDate,
                      "PPP",
                      { locale: ar },
                    )}`
                  : ""
              }
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>الموظف</th>
                <th>المنصب</th>
                <th>القسم</th>
                <th>الحضور</th>
                <th>الغياب</th>
                <th>التأخير</th>
                <th>ساعات العمل</th>
                <th>الأداء</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map((employee) => {
                  let performanceClass = "";
                  if (employee.performance >= 90)
                    performanceClass = "performance-good";
                  else if (employee.performance >= 75)
                    performanceClass = "performance-medium";
                  else performanceClass = "performance-poor";

                  return `
                  <tr>
                    <td><strong>${employee.name}</strong></td>
                    <td>${employee.position}</td>
                    <td>${employee.department}</td>
                    <td>${employee.attendance.present} / ${employee.attendance.total}</td>
                    <td>${employee.attendance.absent}</td>
                    <td>${employee.attendance.late}</td>
                    <td>${employee.workHours} ساعة</td>
                    <td class="${performanceClass}">${employee.performance}%</td>
                  </tr>
                `;
                })
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

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download report");
  };

  const handleSave = () => {
    // Implement save functionality
    console.log("Save report");
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-right">
            تقرير الموظفين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6 justify-end">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={"w-[200px] justify-between text-right"}
                  >
                    {startDate ? (
                      format(startDate, "PPP", { locale: ar })
                    ) : (
                      <span>اختر تاريخ البداية</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    locale={ar}
                  />
                </PopoverContent>
              </Popover>
              <span className="text-gray-500">من</span>
            </div>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={"w-[200px] justify-between text-right"}
                  >
                    {endDate ? (
                      format(endDate, "PPP", { locale: ar })
                    ) : (
                      <span>اختر تاريخ النهاية</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    locale={ar}
                  />
                </PopoverContent>
              </Popover>
              <span className="text-gray-500">إلى</span>
            </div>

            <div className="flex items-center gap-2">
              <Select value={employee} onValueChange={setEmployee}>
                <SelectTrigger className="w-[200px] text-right">
                  <SelectValue placeholder="اختر الموظف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الموظفين</SelectItem>
                  <SelectItem value="1">أحمد محمد</SelectItem>
                  <SelectItem value="2">سارة أحمد</SelectItem>
                  <SelectItem value="3">محمد علي</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-500">الموظف</span>
            </div>

            <div className="flex items-center gap-2">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[200px] text-right">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  <SelectItem value="تقنية المعلومات">
                    تقنية المعلومات
                  </SelectItem>
                  <SelectItem value="المالية">المالية</SelectItem>
                  <SelectItem value="الموارد البشرية">
                    الموارد البشرية
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-500">القسم</span>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                <span>طباعة</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                <span>تنزيل</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
                <span>حفظ</span>
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              {startDate && endDate
                ? `الفترة: ${format(startDate, "PPP", { locale: ar })} - ${format(
                    endDate,
                    "PPP",
                    { locale: ar },
                  )}`
                : ""}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الموظف</TableHead>
                  <TableHead className="text-right">المنصب</TableHead>
                  <TableHead className="text-right">القسم</TableHead>
                  <TableHead className="text-right">الحضور</TableHead>
                  <TableHead className="text-right">الغياب</TableHead>
                  <TableHead className="text-right">التأخير</TableHead>
                  <TableHead className="text-right">ساعات العمل</TableHead>
                  <TableHead className="text-right">الأداء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium text-right">
                      {employee.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.position}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.department}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.attendance.present} /{" "}
                      {employee.attendance.total}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.attendance.absent}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.attendance.late}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.workHours} ساعة
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={employee.performance}
                          className={`h-2 w-16 ${getProgressColor(
                            employee.performance,
                          )}`}
                        />
                        <span
                          className={`${getPerformanceColor(
                            employee.performance,
                          )} text-right`}
                        >
                          {employee.performance}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeReport;
