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
import "./print-styles.css";
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

interface PayrollReportProps {
  className?: string;
}

const PayrollReport = ({ className }: PayrollReportProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [department, setDepartment] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [isPrinting, setIsPrinting] = useState(false);

  // Mock data for the report
  const payrollData = [
    {
      id: "1",
      employee: "أحمد محمد",
      position: "مطور برمجيات",
      department: "تقنية المعلومات",
      basicSalary: 12000,
      allowances: 3000,
      deductions: 500,
      netSalary: 14500,
      paymentDate: "2023-05-28",
      status: "paid",
    },
    {
      id: "2",
      employee: "سارة أحمد",
      position: "مصمم واجهات",
      department: "تقنية المعلومات",
      basicSalary: 10000,
      allowances: 2500,
      deductions: 300,
      netSalary: 12200,
      paymentDate: "2023-05-28",
      status: "paid",
    },
    {
      id: "3",
      employee: "محمد علي",
      position: "محاسب",
      department: "المالية",
      basicSalary: 9000,
      allowances: 2000,
      deductions: 400,
      netSalary: 10600,
      paymentDate: "2023-05-28",
      status: "paid",
    },
    {
      id: "4",
      employee: "فاطمة حسن",
      position: "مدير موارد بشرية",
      department: "الموارد البشرية",
      basicSalary: 15000,
      allowances: 4000,
      deductions: 600,
      netSalary: 18400,
      paymentDate: "2023-05-28",
      status: "pending",
    },
  ];

  const statusText = {
    paid: "مدفوع",
    pending: "قيد الانتظار",
  };

  const statusColors = {
    paid: "text-green-600",
    pending: "text-amber-600",
  };

  // Filter data based on selected filters
  const filteredData = payrollData.filter((item) => {
    const matchesDepartment =
      department === "all" || item.department === department;
    const matchesStatus = status === "all" || item.status === status;
    return matchesDepartment && matchesStatus;
  });

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      try {
        const printContent = document.getElementById("payroll-report-content");
        if (printContent) {
          const printFrame = document.createElement("iframe");
          printFrame.style.position = "fixed";
          printFrame.style.right = "-9999px";
          document.body.appendChild(printFrame);

          const printDocument =
            printFrame.contentDocument || printFrame.contentWindow?.document;
          if (printDocument) {
            printDocument.open();
            printDocument.write(`
              <!DOCTYPE html>
              <html dir="rtl">
                <head>
                  <title>تقرير المرتبات</title>
                  <style>
                    @media print {
                      @page { size: A4; margin: 1.5cm; }
                      body { font-family: Arial, sans-serif; }
                      table { width: 100%; border-collapse: collapse; }
                      th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                      th { background-color: #f2f2f2; }
                      .company-info { margin-bottom: 20px; }
                      .report-title { text-align: center; margin-bottom: 20px; }
                      .report-date { text-align: left; font-size: 12px; margin-bottom: 20px; }
                      .summary { display: flex; justify-content: space-between; margin-bottom: 20px; }
                      .summary-item { padding: 10px; border: 1px solid #ddd; border-radius: 4px; width: 23%; }
                    }
                  </style>
                </head>
                <body>
                  <div class="company-info">
                    <h2>شركة نظام إدارة الموارد البشرية</h2>
                    <p>العنوان: المملكة العربية السعودية، الرياض</p>
                    <p>هاتف: 966-11-000000 | البريد الإلكتروني: info@hrms.sa</p>
                  </div>
                  <div class="report-title">
                    <h1>تقرير المرتبات</h1>
                    <p>الفترة: ${startDate ? format(startDate, "yyyy/MM/dd", { locale: ar }) : ""} - ${endDate ? format(endDate, "yyyy/MM/dd", { locale: ar }) : ""}</p>
                  </div>
                  <div class="report-date">
                    <p>تاريخ الطباعة: ${format(new Date(), "yyyy/MM/dd", { locale: ar })}</p>
                  </div>
                  <div class="summary">
                    <div class="summary-item">
                      <p>إجمالي المرتبات</p>
                      <p><strong>${filteredData.reduce((sum, item) => sum + item.netSalary, 0)} ريال</strong></p>
                    </div>
                    <div class="summary-item">
                      <p>إجمالي الرواتب الأساسية</p>
                      <p><strong>${filteredData.reduce((sum, item) => sum + item.basicSalary, 0)} ريال</strong></p>
                    </div>
                    <div class="summary-item">
                      <p>إجمالي البدلات</p>
                      <p><strong>${filteredData.reduce((sum, item) => sum + item.allowances, 0)} ريال</strong></p>
                    </div>
                    <div class="summary-item">
                      <p>إجمالي الخصومات</p>
                      <p><strong>${filteredData.reduce((sum, item) => sum + item.deductions, 0)} ريال</strong></p>
                    </div>
                  </div>
                  ${printContent.innerHTML}
                </body>
              </html>
            `);
            printDocument.close();

            const contentWindow = printFrame.contentWindow;
            if (contentWindow) {
              contentWindow.focus();
              contentWindow.print();
              setTimeout(() => {
                document.body.removeChild(printFrame);
                setIsPrinting(false);
              }, 500);
            }
          }
        } else {
          console.error("Print content element not found");
          setIsPrinting(false);
        }
      } catch (error) {
        console.error("Error during printing:", error);
        setIsPrinting(false);
      }
    }, 100);
  };

  const handleExport = () => {
    // Here you would implement export functionality
    // For example, exporting to CSV or Excel
    console.log("Exporting report");
    alert("تم تصدير التقرير بنجاح");
  };

  const handleSave = () => {
    // Here you would implement save functionality
    console.log("Saving report");
    alert("تم حفظ التقرير بنجاح");
  };

  return (
    <Card
      className={`border shadow-sm bg-white ${className} print:shadow-none ${isPrinting ? "print-only-content" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            تقرير المرتبات
          </CardTitle>
          <div className="flex gap-2 print:hidden">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6 print:hidden">
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
            <label className="text-sm font-medium">بداية الفترة</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-right"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "yyyy/MM/dd", { locale: ar })
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
            <label className="text-sm font-medium">نهاية الفترة</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-right"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "yyyy/MM/dd", { locale: ar })
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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">الحالة</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="paid">مدفوع</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">إجمالي المرتبات</span>
                <span className="text-2xl font-bold">
                  {filteredData.reduce((sum, item) => sum + item.netSalary, 0)}
                  <span className="text-sm font-normal mr-1">ريال</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  إجمالي الرواتب الأساسية
                </span>
                <span className="text-2xl font-bold">
                  {filteredData.reduce(
                    (sum, item) => sum + item.basicSalary,
                    0,
                  )}
                  <span className="text-sm font-normal mr-1">ريال</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">إجمالي البدلات</span>
                <span className="text-2xl font-bold">
                  {filteredData.reduce((sum, item) => sum + item.allowances, 0)}
                  <span className="text-sm font-normal mr-1">ريال</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">إجمالي الخصومات</span>
                <span className="text-2xl font-bold">
                  {filteredData.reduce((sum, item) => sum + item.deductions, 0)}
                  <span className="text-sm font-normal mr-1">ريال</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="payroll-report-content" className="print:mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">القسم</TableHead>
                <TableHead className="text-right">الراتب الأساسي</TableHead>
                <TableHead className="text-right">البدلات</TableHead>
                <TableHead className="text-right">الخصومات</TableHead>
                <TableHead className="text-right">صافي الراتب</TableHead>
                <TableHead className="text-right">تاريخ الدفع</TableHead>
                <TableHead className="text-right print:hidden">
                  الحالة
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
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
                  <TableCell>{item.basicSalary} ريال</TableCell>
                  <TableCell>{item.allowances} ريال</TableCell>
                  <TableCell>{item.deductions} ريال</TableCell>
                  <TableCell className="font-medium">
                    {item.netSalary} ريال
                  </TableCell>
                  <TableCell>{item.paymentDate}</TableCell>
                  <TableCell
                    className={`print:hidden ${statusColors[item.status as keyof typeof statusColors]}`}
                  >
                    {statusText[item.status as keyof typeof statusText]}
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

export default PayrollReport;
