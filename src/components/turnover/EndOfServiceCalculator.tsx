import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Printer } from "lucide-react";
import PrintWrapper from "@/components/ui/print-wrapper";

interface EndOfServiceCalculatorProps {
  employeeData?: any;
  onBack?: () => void;
}

// Employee data with salary and leave information
const availableEmployees = [
  {
    id: "1",
    name: "أحمد محمد",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "2022-03-15",
    salary: 12000,
    leaveBalance: {
      annual: 21,
      sick: 30,
      emergency: 7,
    },
  },
  {
    id: "2",
    name: "سارة أحمد",
    position: "محاسب",
    department: "المالية",
    joinDate: "2021-05-10",
    salary: 9000,
    leaveBalance: {
      annual: 18,
      sick: 25,
      emergency: 5,
    },
  },
  {
    id: "3",
    name: "محمد علي",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "2023-01-22",
    salary: 15000,
    leaveBalance: {
      annual: 25,
      sick: 30,
      emergency: 8,
    },
  },
  {
    id: "4",
    name: "فاطمة محمد",
    position: "مسؤول موارد بشرية",
    department: "الموارد البشرية",
    joinDate: "2022-08-03",
    salary: 10000,
    leaveBalance: {
      annual: 20,
      sick: 28,
      emergency: 6,
    },
  },
  {
    id: "5",
    name: "خالد عبدالله",
    position: "مصمم جرافيك",
    department: "التسويق",
    joinDate: "2021-11-17",
    salary: 8500,
    leaveBalance: {
      annual: 22,
      sick: 30,
      emergency: 7,
    },
  },
];

const EndOfServiceCalculator = ({
  employeeData,
  onBack,
}: EndOfServiceCalculatorProps = {}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [currentEmployeeData, setCurrentEmployeeData] = useState(
    employeeData || null,
  );
  const [salary, setSalary] = useState(employeeData?.salary || 10000);
  const [serviceYears, setServiceYears] = useState(0);
  const [serviceMonths, setServiceMonths] = useState(0);
  const [serviceDays, setServiceDays] = useState(0);
  const [resignationType, setResignationType] = useState("استقالة");
  const [totalBenefit, setTotalBenefit] = useState(0);
  const [breakdown, setBreakdown] = useState<
    { description: string; amount: number }[]
  >([]);

  // Handle employee selection
  const handleEmployeeSelect = (employeeId: string) => {
    const selectedEmployee = availableEmployees.find(
      (emp) => emp.id === employeeId,
    );
    if (selectedEmployee) {
      setSelectedEmployeeId(employeeId);
      setCurrentEmployeeData(selectedEmployee);
      setSalary(selectedEmployee.salary);
    }
  };

  useEffect(() => {
    const dataToUse = currentEmployeeData || employeeData;
    if (dataToUse?.joinDate) {
      const joinDate = new Date(dataToUse.joinDate);
      const today = new Date();

      // Calculate difference in years, months, and days
      let years = today.getFullYear() - joinDate.getFullYear();
      let months = today.getMonth() - joinDate.getMonth();
      let days = today.getDate() - joinDate.getDate();

      if (days < 0) {
        months--;
        // Add days of the previous month
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setServiceYears(years);
      setServiceMonths(months);
      setServiceDays(days);
    }
  }, [currentEmployeeData, employeeData]);

  useEffect(() => {
    calculateBenefit();
  }, [salary, serviceYears, serviceMonths, serviceDays, resignationType]);

  const calculateBenefit = () => {
    // Convert service period to total years (including fractional years)
    const totalServiceYears =
      serviceYears + serviceMonths / 12 + serviceDays / 365;

    let benefit = 0;
    const newBreakdown: { description: string; amount: number }[] = [];

    // Basic calculation based on Saudi labor law
    if (totalServiceYears < 5) {
      // Half month salary for each year of the first five years
      benefit = (salary / 2) * totalServiceYears;
      newBreakdown.push({
        description: `نصف شهر عن كل سنة من السنوات الخمس الأولى (${totalServiceYears.toFixed(2)} سنة)`,
        amount: benefit,
      });
    } else {
      // Half month salary for the first five years
      const firstFiveYearsBenefit = (salary / 2) * 5;
      newBreakdown.push({
        description: "نصف شهر عن كل سنة من السنوات الخمس الأولى (5 سنوات)",
        amount: firstFiveYearsBenefit,
      });

      // Full month salary for each additional year
      const remainingYears = totalServiceYears - 5;
      const remainingBenefit = salary * remainingYears;
      newBreakdown.push({
        description: `شهر كامل عن كل سنة متبقية (${remainingYears.toFixed(2)} سنة)`,
        amount: remainingBenefit,
      });

      benefit = firstFiveYearsBenefit + remainingBenefit;
    }

    // Adjust based on resignation type
    if (resignationType === "استقالة") {
      if (totalServiceYears < 2) {
        // No benefit for resignation before 2 years
        benefit = 0;
        newBreakdown.length = 0;
        newBreakdown.push({
          description: "لا يستحق مكافأة نهاية الخدمة (الاستقالة قبل سنتين)",
          amount: 0,
        });
      } else if (totalServiceYears >= 2 && totalServiceYears < 5) {
        // One-third of the benefit if service is between 2 and 5 years
        const reduction = benefit * (2 / 3);
        newBreakdown.push({
          description: "تخفيض بنسبة الثلثين (الاستقالة بين سنتين وخمس سنوات)",
          amount: -reduction,
        });
        benefit = benefit / 3;
      } else if (totalServiceYears >= 5 && totalServiceYears < 10) {
        // Two-thirds of the benefit if service is between 5 and 10 years
        const reduction = benefit * (1 / 3);
        newBreakdown.push({
          description: "تخفيض بنسبة الثلث (الاستقالة بين خمس وعشر سنوات)",
          amount: -reduction,
        });
        benefit = benefit * (2 / 3);
      }
      // Full benefit if service is 10 years or more
    }

    // Add vacation balance compensation
    const dataToUse = currentEmployeeData || employeeData;
    const vacationDays = dataToUse?.leaveBalance?.annual || 21;
    const dailySalary = salary / 30;
    const vacationCompensation = vacationDays * dailySalary;

    newBreakdown.push({
      description: `تعويض رصيد الإجازات (${vacationDays} يوم)`,
      amount: vacationCompensation,
    });

    benefit += vacationCompensation;

    setTotalBenefit(benefit);
    setBreakdown(newBreakdown);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ar-SA", {
      style: "currency",
      currency: "SAR",
    });
  };

  const handlePrint = () => {
    const dataToUse = currentEmployeeData || employeeData;
    const employeeName = dataToUse?.name || "_________________";
    const employeeId = dataToUse?.id || "_________________";
    const position = dataToUse?.position || "_________________";
    const department = dataToUse?.department || "_________________";
    const joinDate = dataToUse?.joinDate
      ? new Date(dataToUse.joinDate).toLocaleDateString("ar-SA")
      : "_________________";

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("يرجى السماح بفتح النوافذ المنبثقة لتمكين الطباعة");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>حساب مستحقات نهاية الخدمة</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
            background: white;
            direction: rtl;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
          }
          
          .header h1 {
            font-size: 24px;
            color: #1e40af;
            margin-bottom: 10px;
            font-weight: bold;
          }
          
          .header .company-info {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 15px;
            padding: 8px 12px;
            background-color: #eff6ff;
            border-right: 4px solid #2563eb;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 11px;
          }
          
          th, td {
            border: 1px solid #d1d5db;
            padding: 8px 12px;
            text-align: right;
            vertical-align: top;
          }
          
          th {
            background-color: #f3f4f6;
            font-weight: bold;
            color: #374151;
          }
          
          .highlight-row {
            background-color: #fef3c7;
            font-weight: bold;
          }
          
          .total-row {
            background-color: #dbeafe;
            font-weight: bold;
            font-size: 13px;
          }
          
          .signatures {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
          }
          
          .signature-box {
            width: 45%;
            text-align: center;
            border: 1px solid #d1d5db;
            padding: 20px;
            background-color: #f9fafb;
          }
          
          .signature-title {
            font-weight: bold;
            margin-bottom: 40px;
            color: #374151;
          }
          
          .signature-line {
            border-top: 1px solid #6b7280;
            margin-top: 40px;
            padding-top: 5px;
            font-size: 10px;
            color: #6b7280;
          }
          
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding: 10px;
            background: white;
          }
          
          .print-date {
            text-align: left;
            font-size: 10px;
            color: #6b7280;
            margin-bottom: 20px;
          }
          
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .signatures {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-date">
          تاريخ الطباعة: ${new Date().toLocaleDateString("ar-SA")} - ${new Date().toLocaleTimeString("ar-SA")}
        </div>
        
        <div class="header">
          <h1>حساب مستحقات نهاية الخدمة</h1>
          <div class="company-info">نظام إدارة الموارد البشرية</div>
        </div>
        
        <div class="section">
          <div class="section-title">بيانات الموظف</div>
          <table>
            <tr>
              <th style="width: 25%;">الاسم</th>
              <td style="width: 25%;">${employeeName}</td>
              <th style="width: 25%;">الرقم الوظيفي</th>
              <td style="width: 25%;">${employeeId}</td>
            </tr>
            <tr>
              <th>المنصب</th>
              <td>${position}</td>
              <th>القسم</th>
              <td>${department}</td>
            </tr>
            <tr>
              <th>تاريخ التعيين</th>
              <td>${joinDate}</td>
              <th>مدة الخدمة</th>
              <td>${serviceYears} سنة و ${serviceMonths} شهر و ${serviceDays} يوم</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">ملخص الحساب</div>
          <table>
            <tr>
              <th style="width: 50%;">الراتب الشهري الأساسي</th>
              <td style="width: 50%; font-weight: bold;">${formatCurrency(salary)}</td>
            </tr>
            <tr>
              <th>نوع إنهاء الخدمة</th>
              <td style="font-weight: bold;">${resignationType}</td>
            </tr>
            <tr>
              <th>إجمالي مدة الخدمة</th>
              <td style="font-weight: bold;">${serviceYears} سنة و ${serviceMonths} شهر و ${serviceDays} يوم</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">تفاصيل المستحقات</div>
          <table>
            <thead>
              <tr>
                <th style="width: 70%;">البيان</th>
                <th style="width: 30%;">المبلغ</th>
              </tr>
            </thead>
            <tbody>
              ${breakdown
                .map(
                  (item) => `
                <tr ${item.amount < 0 ? 'class="highlight-row"' : ""}>
                  <td>${item.description}</td>
                  <td style="text-align: left; font-weight: bold;">${formatCurrency(item.amount)}</td>
                </tr>
              `,
                )
                .join("")}
              <tr class="total-row">
                <td style="font-size: 14px;">إجمالي المستحقات</td>
                <td style="text-align: left; font-size: 14px;">${formatCurrency(totalBenefit)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="signatures">
          <div class="signature-box">
            <div class="signature-title">توقيع الموظف</div>
            <div class="signature-line">التوقيع والتاريخ</div>
          </div>
          <div class="signature-box">
            <div class="signature-title">توقيع مسؤول الموارد البشرية</div>
            <div class="signature-line">التوقيع والتاريخ</div>
          </div>
        </div>
        
        <div class="footer">
          تم إنشاء هذا التقرير بواسطة نظام إدارة الموارد البشرية - جميع الحقوق محفوظة
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
          
          window.onafterprint = function() {
            window.close();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <PrintWrapper title="حساب مستحقات نهاية الخدمة">
      <div className="bg-white min-h-screen print:min-h-0">
        {/* Print Header is now handled by PrintWrapper */}

        <Card
          className="border shadow-sm bg-white print:border-0 print:shadow-none print-content"
          id="print-content"
        >
          <CardHeader className="no-print print:hidden">
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              حساب مستحقات نهاية الخدمة
              <div className="flex gap-2">
                {onBack && (
                  <Button variant="outline" size="sm" onClick={onBack}>
                    العودة
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="print:p-0">
            {/* Employee Selection */}
            <div className="mb-6 no-print">
              <div className="space-y-2">
                <Label htmlFor="employeeSelect">اختيار الموظف</Label>
                <Select
                  value={selectedEmployeeId}
                  onValueChange={handleEmployeeSelect}
                >
                  <SelectTrigger id="employeeSelect">
                    <SelectValue placeholder="اختر الموظف المراد حساب مستحقاته" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEmployees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(currentEmployeeData || employeeData) && (
              <div className="mb-6 p-4 bg-gray-50 print:bg-white rounded-md">
                <h3 className="font-semibold mb-4 print:text-black">
                  بيانات الموظف
                </h3>
                <table className="print-table w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className="w-1/4 bg-gray-100 font-semibold p-2 border">
                        الاسم
                      </th>
                      <td className="p-2 border">
                        {(currentEmployeeData || employeeData)?.name}
                      </td>
                      <th className="w-1/4 bg-gray-100 font-semibold p-2 border">
                        الرقم الوظيفي
                      </th>
                      <td className="p-2 border">
                        {(currentEmployeeData || employeeData)?.id}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        المنصب
                      </th>
                      <td className="p-2 border">
                        {(currentEmployeeData || employeeData)?.position}
                      </td>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        القسم
                      </th>
                      <td className="p-2 border">
                        {(currentEmployeeData || employeeData)?.department}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        تاريخ التعيين
                      </th>
                      <td className="p-2 border">
                        {new Date(
                          (currentEmployeeData || employeeData)?.joinDate,
                        ).toLocaleDateString("ar-SA")}
                      </td>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        مدة الخدمة
                      </th>
                      <td className="p-2 border">
                        {serviceYears} سنة و {serviceMonths} شهر و {serviceDays}{" "}
                        يوم
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Print-only employee data when no employee is selected */}
            {!(currentEmployeeData || employeeData) && (
              <div className="print-only mb-6">
                <h3 className="font-semibold mb-4 print:text-black">
                  بيانات الموظف
                </h3>
                <table className="print-table w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className="w-1/4 bg-gray-100 font-semibold p-2 border">
                        الاسم
                      </th>
                      <td className="p-2 border">_________________</td>
                      <th className="w-1/4 bg-gray-100 font-semibold p-2 border">
                        الرقم الوظيفي
                      </th>
                      <td className="p-2 border">_________________</td>
                    </tr>
                    <tr>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        تاريخ التعيين
                      </th>
                      <td className="p-2 border">_________________</td>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        مدة الخدمة
                      </th>
                      <td className="p-2 border">
                        {serviceYears} سنة و {serviceMonths} شهر و {serviceDays}{" "}
                        يوم
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
                <div className="space-y-2">
                  <Label htmlFor="salary">الراتب الشهري الأساسي</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resignationType">نوع إنهاء الخدمة</Label>
                  <Select
                    value={resignationType}
                    onValueChange={setResignationType}
                  >
                    <SelectTrigger id="resignationType">
                      <SelectValue placeholder="اختر نوع إنهاء الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="استقالة">استقالة</SelectItem>
                      <SelectItem value="إنهاء خدمة">
                        إنهاء خدمة من قبل الشركة
                      </SelectItem>
                      <SelectItem value="تقاعد">تقاعد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
                <div className="space-y-2">
                  <Label htmlFor="serviceYears">سنوات الخدمة</Label>
                  <Input
                    id="serviceYears"
                    type="number"
                    value={serviceYears}
                    onChange={(e) => setServiceYears(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceMonths">أشهر الخدمة</Label>
                  <Input
                    id="serviceMonths"
                    type="number"
                    min="0"
                    max="11"
                    value={serviceMonths}
                    onChange={(e) => setServiceMonths(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDays">أيام الخدمة</Label>
                  <Input
                    id="serviceDays"
                    type="number"
                    min="0"
                    max="30"
                    value={serviceDays}
                    onChange={(e) => setServiceDays(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Print-only calculation summary */}
              <div className="print-only mb-6">
                <h3 className="font-semibold mb-4 print:text-black">
                  ملخص الحساب
                </h3>
                <table className="print-table w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className="w-1/3 bg-gray-100 font-semibold p-2 border">
                        الراتب الشهري الأساسي
                      </th>
                      <td className="p-2 border font-bold">
                        {formatCurrency(salary)}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        نوع إنهاء الخدمة
                      </th>
                      <td className="p-2 border font-bold">
                        {resignationType}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-gray-100 font-semibold p-2 border">
                        مدة الخدمة
                      </th>
                      <td className="p-2 border font-bold">
                        {serviceYears} سنة و {serviceMonths} شهر و {serviceDays}{" "}
                        يوم
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 bg-gray-50 print:bg-white rounded-md">
                <h3 className="font-semibold mb-4 print:text-black">
                  تفاصيل المستحقات
                </h3>
                <table className="print-table w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 font-semibold p-2 border text-right">
                        البيان
                      </th>
                      <th className="bg-gray-100 font-semibold p-2 border text-right w-1/4">
                        المبلغ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 border">{item.description}</td>
                        <td className="p-2 border font-medium text-right">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2">
                      <td className="p-2 border font-bold text-lg bg-gray-100">
                        إجمالي المستحقات
                      </td>
                      <td className="p-2 border font-bold text-lg text-right bg-gray-100">
                        {formatCurrency(totalBenefit)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Footer is now handled by PrintWrapper */}
      </div>

      {/* Global print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .print-content {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          .print-content table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 12px !important;
          }
          .print-content th,
          .print-content td {
            border: 1px solid #000 !important;
            padding: 8px !important;
            text-align: right !important;
          }
          .print-content th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .hidden {
            display: none !important;
          }
        }
        .print-only {
          display: none;
        }
      `}</style>

      {/* Enhanced print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .print-content {
            display: block !important;
            visibility: visible !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .print-content * {
            visibility: visible !important;
            color: black !important;
            background: transparent !important;
          }
          .print-content table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 11px !important;
            margin: 10px 0 !important;
          }
          .print-content th,
          .print-content td {
            border: 1px solid #000 !important;
            padding: 6px 8px !important;
            text-align: right !important;
            vertical-align: top !important;
            background: white !important;
          }
          .print-content th {
            background-color: #f0f0f0 !important;
            font-weight: bold !important;
          }
          .print-content h1,
          .print-content h2,
          .print-content h3 {
            color: black !important;
            margin: 10px 0 !important;
          }
          .no-print {
            display: none !important;
            visibility: hidden !important;
          }
          .print-only {
            display: block !important;
            visibility: visible !important;
          }
          .hidden {
            display: none !important;
          }
          /* Force visibility for print tables */
          .print-table {
            display: table !important;
            visibility: visible !important;
          }
          .print-table tbody {
            display: table-row-group !important;
          }
          .print-table tr {
            display: table-row !important;
          }
          .print-table th,
          .print-table td {
            display: table-cell !important;
          }
        }
        .print-only {
          display: none;
        }
        /* Ensure content is visible during print preparation */
        .printing {
          display: block !important;
          visibility: visible !important;
        }
      `}</style>
    </PrintWrapper>
  );
};

export default EndOfServiceCalculator;
