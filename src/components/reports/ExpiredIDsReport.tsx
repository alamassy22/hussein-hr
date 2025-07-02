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

interface ExpiredIDsReportProps {
  className?: string;
}

const ExpiredIDsReport = ({ className }: ExpiredIDsReportProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [department, setDepartment] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  // Mock data for the report
  const employeesWithExpiringIds = [
    {
      id: "1",
      name: "سارة أحمد",
      position: "محاسب",
      department: "المالية",
      idExpiry: "05/06/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee2",
      status: "active" as const,
      expiryStatus: "expired",
    },
    {
      id: "2",
      name: "محمد علي",
      position: "مدير مبيعات",
      department: "المبيعات",
      idExpiry: "12/06/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee3",
      status: "active" as const,
      expiryStatus: "expired",
    },
    {
      id: "3",
      name: "فاطمة محمد",
      position: "مسؤول موارد بشرية",
      department: "الموارد البشرية",
      idExpiry: "18/06/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee4",
      status: "vacation" as const,
      expiryStatus: "expired",
    },
    {
      id: "4",
      name: "أحمد خالد",
      position: "مهندس برمجيات",
      department: "تقنية المعلومات",
      idExpiry: "10/08/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee5",
      status: "active" as const,
      expiryStatus: "soon",
    },
    {
      id: "5",
      name: "نورة سعيد",
      position: "مصمم واجهات",
      department: "تقنية المعلومات",
      idExpiry: "15/08/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee6",
      status: "active" as const,
      expiryStatus: "soon",
    },
    {
      id: "6",
      name: "خالد عبدالله",
      position: "محلل أعمال",
      department: "التخطيط",
      idExpiry: "20/08/2023",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee7",
      status: "active" as const,
      expiryStatus: "soon",
    },
  ];

  // Filter data based on selected filters
  const filteredData = employeesWithExpiringIds.filter((emp) => {
    const matchesDepartment =
      department === "all" || emp.department === department;
    const matchesStatus = status === "all" || emp.expiryStatus === status;
    return matchesDepartment && matchesStatus;
  });

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير الهويات المنتهية</title>
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
            .expired { color: #dc2626; }
            .soon { color: #d97706; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>تقرير الهويات المنتهية والتي قاربت على الانتهاء</h1>
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
          
          <div class="summary">
            <div class="summary-card">
              <div class="summary-title">إجمالي الهويات</div>
              <div class="summary-value">${filteredData.length}</div>
            </div>
            <div class="summary-card">
              <div class="summary-title">الهويات المنتهية</div>
              <div class="summary-value expired">${filteredData.filter((item) => item.expiryStatus === "expired").length}</div>
            </div>
            <div class="summary-card">
              <div class="summary-title">الهويات التي ستنتهي قريباً</div>
              <div class="summary-value soon">${filteredData.filter((item) => item.expiryStatus === "soon").length}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>الموظف</th>
                <th>المنصب</th>
                <th>القسم</th>
                <th>تاريخ انتهاء الهوية</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map((employee) => {
                  const statusClass =
                    employee.expiryStatus === "expired" ? "expired" : "soon";
                  const statusText =
                    employee.expiryStatus === "expired"
                      ? "منتهية"
                      : "ستنتهي قريباً";

                  return `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center;">
                        <div style="width: 30px; height: 30px; border-radius: 50%; overflow: hidden; margin-left: 10px;">
                          <img src="${employee.avatar}" alt="${employee.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div>
                          <div style="font-weight: bold;">${employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>${employee.position}</td>
                    <td>${employee.department}</td>
                    <td>${employee.idExpiry}</td>
                    <td class="${statusClass}">${statusText}</td>
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
            تقرير الهويات المنتهية والتي قاربت على الانتهاء
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
                  <SelectItem value="المبيعات">المبيعات</SelectItem>
                  <SelectItem value="الموارد البشرية">
                    الموارد البشرية
                  </SelectItem>
                  <SelectItem value="التخطيط">التخطيط</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-500">القسم</span>
            </div>

            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[200px] text-right">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الهويات</SelectItem>
                  <SelectItem value="expired">منتهية</SelectItem>
                  <SelectItem value="soon">ستنتهي قريباً</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-500">الحالة</span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">إجمالي الهويات</span>
                  <span className="text-2xl font-bold">
                    {filteredData.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    الهويات المنتهية
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {
                      filteredData.filter(
                        (item) => item.expiryStatus === "expired",
                      ).length
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    الهويات التي ستنتهي قريباً
                  </span>
                  <span className="text-2xl font-bold text-amber-600">
                    {
                      filteredData.filter(
                        (item) => item.expiryStatus === "soon",
                      ).length
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الموظف</TableHead>
                  <TableHead className="text-right">المنصب</TableHead>
                  <TableHead className="text-right">القسم</TableHead>
                  <TableHead className="text-right">
                    تاريخ انتهاء الهوية
                  </TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium text-right">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>{employee.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.position}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.department}
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.idExpiry}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${employee.expiryStatus === "expired" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                      >
                        {employee.expiryStatus === "expired"
                          ? "منتهية"
                          : "ستنتهي قريباً"}
                      </span>
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

export default ExpiredIDsReport;
