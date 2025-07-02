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
import { CalendarIcon, Printer, Download } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface LeavesReportProps {
  className?: string;
}

const LeavesReport = ({ className }: LeavesReportProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [leaveType, setLeaveType] = useState<string>("all");

  // Mock data for the report
  const leavesData = [
    {
      id: "1",
      employee: "أحمد محمد",
      position: "مطور برمجيات",
      department: "تقنية المعلومات",
      type: "سنوية",
      startDate: "2023-05-01",
      endDate: "2023-05-10",
      days: 10,
      status: "approved",
    },
    {
      id: "2",
      employee: "سارة أحمد",
      position: "مصمم واجهات",
      department: "تقنية المعلومات",
      type: "مرضية",
      startDate: "2023-05-15",
      endDate: "2023-05-17",
      days: 3,
      status: "approved",
    },
    {
      id: "3",
      employee: "محمد علي",
      position: "محاسب",
      department: "المالية",
      type: "طارئة",
      startDate: "2023-05-20",
      endDate: "2023-05-21",
      days: 2,
      status: "pending",
    },
    {
      id: "4",
      employee: "فاطمة حسن",
      position: "مدير موارد بشرية",
      department: "الموارد البشرية",
      type: "سنوية",
      startDate: "2023-05-25",
      endDate: "2023-06-05",
      days: 12,
      status: "approved",
    },
  ];

  const statusText = {
    approved: "موافق",
    pending: "قيد الانتظار",
    rejected: "مرفوض",
  };

  const statusColors = {
    approved: "bg-green-100 text-green-700 hover:bg-green-100",
    pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    rejected: "bg-red-100 text-red-700 hover:bg-red-100",
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير الإجازات</title>
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
            .status { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
            .status-approved { background-color: #dcfce7; color: #166534; }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-rejected { background-color: #fee2e2; color: #b91c1c; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>تقرير الإجازات</h1>
            <div class="date">الفترة: ${date ? format(date, "MMMM yyyy", { locale: ar }) : ""}</div>
          </div>
          
          <div class="summary">
            <div class="summary-card">
              <div class="summary-title">إجمالي الإجازات</div>
              <div class="summary-value">${
                leavesData.filter(
                  (item) => leaveType === "all" || item.type === leaveType,
                ).length
              }</div>
            </div>
            <div class="summary-card">
              <div class="summary-title">إجمالي الأيام</div>
              <div class="summary-value">${leavesData
                .filter(
                  (item) => leaveType === "all" || item.type === leaveType,
                )
                .reduce((sum, item) => sum + item.days, 0)}</div>
            </div>
            <div class="summary-card">
              <div class="summary-title">الإجازات المعتمدة</div>
              <div class="summary-value">${
                leavesData.filter(
                  (item) =>
                    (leaveType === "all" || item.type === leaveType) &&
                    item.status === "approved",
                ).length
              }</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>الموظف</th>
                <th>القسم</th>
                <th>نوع الإجازة</th>
                <th>تاريخ البداية</th>
                <th>تاريخ النهاية</th>
                <th>عدد الأيام</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${leavesData
                .filter(
                  (item) => leaveType === "all" || item.type === leaveType,
                )
                .map(
                  (item) => `
                  <tr>
                    <td>
                      <div>${item.employee}</div>
                      <div style="font-size: 12px; color: #666;">${item.position}</div>
                    </td>
                    <td>${item.department}</td>
                    <td>${item.type}</td>
                    <td>${item.startDate}</td>
                    <td>${item.endDate}</td>
                    <td>${item.days} يوم</td>
                    <td><span class="status status-${item.status}">${statusText[item.status as keyof typeof statusText]}</span></td>
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
          <CardTitle className="text-lg font-semibold">
            تقرير الإجازات
          </CardTitle>
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
            <label className="text-sm font-medium">نوع الإجازة</label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر نوع الإجازة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الإجازات</SelectItem>
                <SelectItem value="سنوية">سنوية</SelectItem>
                <SelectItem value="مرضية">مرضية</SelectItem>
                <SelectItem value="طارئة">طارئة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">الفترة</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-right"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {date ? (
                    format(date, "MMMM yyyy", { locale: ar })
                  ) : (
                    <span>اختر الشهر</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">القسم</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأقسام</SelectItem>
                <SelectItem value="it">تقنية المعلومات</SelectItem>
                <SelectItem value="finance">المالية</SelectItem>
                <SelectItem value="hr">الموارد البشرية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">إجمالي الإجازات</span>
                <span className="text-2xl font-bold">
                  {
                    leavesData.filter(
                      (item) => leaveType === "all" || item.type === leaveType,
                    ).length
                  }
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">إجمالي الأيام</span>
                <span className="text-2xl font-bold">
                  {leavesData
                    .filter(
                      (item) => leaveType === "all" || item.type === leaveType,
                    )
                    .reduce((sum, item) => sum + item.days, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">الإجازات المعتمدة</span>
                <span className="text-2xl font-bold">
                  {
                    leavesData.filter(
                      (item) =>
                        (leaveType === "all" || item.type === leaveType) &&
                        item.status === "approved",
                    ).length
                  }
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الموظف</TableHead>
              <TableHead className="text-right">القسم</TableHead>
              <TableHead className="text-right">نوع الإجازة</TableHead>
              <TableHead className="text-right">تاريخ البداية</TableHead>
              <TableHead className="text-right">تاريخ النهاية</TableHead>
              <TableHead className="text-right">عدد الأيام</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leavesData
              .filter((item) => leaveType === "all" || item.type === leaveType)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{item.employee}</div>
                      <div className="text-sm text-gray-500">
                        {item.position}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.endDate}</TableCell>
                  <TableCell>{item.days} يوم</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        statusColors[item.status as keyof typeof statusColors]
                      }
                    >
                      {statusText[item.status as keyof typeof statusText]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeavesReport;
