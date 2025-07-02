import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Save, Printer, Download, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TurnoverCalculatorProps {
  className?: string;
}

const TurnoverCalculator = ({ className }: TurnoverCalculatorProps) => {
  const [employeeCount, setEmployeeCount] = useState(100);
  const [departedEmployees, setDepartedEmployees] = useState(15);
  const [avgSalary, setAvgSalary] = useState(10000);
  const [recruitmentCost, setRecruitmentCost] = useState(5000);
  const [trainingCost, setTrainingCost] = useState(3000);
  const [productivityLoss, setProductivityLoss] = useState(20);

  // Calculate turnover rate
  const turnoverRate = (departedEmployees / employeeCount) * 100;

  // Calculate cost per employee
  const costPerEmployee =
    recruitmentCost + trainingCost + (avgSalary * productivityLoss) / 100;

  // Calculate total cost
  const totalCost = costPerEmployee * departedEmployees;

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير تكلفة دوران الموظفين</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .date { text-align: center; margin-bottom: 20px; color: #666; }
            .results { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
            .result-card { padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: white; }
            .result-title { font-size: 14px; color: #666; margin-bottom: 10px; }
            .result-value { font-size: 24px; font-weight: bold; }
            .blue { color: #2563eb; }
            .amber { color: #d97706; }
            .red { color: #dc2626; }
            .green { color: #16a34a; }
            .recommendations { background-color: #eff6ff; padding: 20px; border-radius: 5px; margin-bottom: 30px; }
            .recommendations h2 { color: #1e40af; margin-bottom: 15px; font-size: 18px; }
            .recommendations ul { padding-right: 20px; }
            .recommendations li { margin-bottom: 8px; color: #1e40af; }
            .inputs { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            .inputs h2 { margin-bottom: 15px; font-size: 18px; }
            .input-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .input-item { margin-bottom: 10px; }
            .input-label { font-weight: bold; margin-bottom: 5px; }
            .input-value { color: #4b5563; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>تقرير تكلفة دوران الموظفين</h1>
            <div class="date">تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}</div>
          </div>
          
          <div class="inputs">
            <h2>بيانات الحساب</h2>
            <div class="input-grid">
              <div class="input-item">
                <div class="input-label">إجمالي عدد الموظفين</div>
                <div class="input-value">${employeeCount}</div>
              </div>
              <div class="input-item">
                <div class="input-label">عدد الموظفين المغادرين</div>
                <div class="input-value">${departedEmployees}</div>
              </div>
              <div class="input-item">
                <div class="input-label">متوسط الراتب الشهري</div>
                <div class="input-value">${avgSalary.toLocaleString()} ريال</div>
              </div>
              <div class="input-item">
                <div class="input-label">تكلفة التوظيف</div>
                <div class="input-value">${recruitmentCost.toLocaleString()} ريال</div>
              </div>
              <div class="input-item">
                <div class="input-label">تكلفة التدريب</div>
                <div class="input-value">${trainingCost.toLocaleString()} ريال</div>
              </div>
              <div class="input-item">
                <div class="input-label">نسبة فقدان الإنتاجية</div>
                <div class="input-value">${productivityLoss}%</div>
              </div>
            </div>
          </div>
          
          <div class="results">
            <div class="result-card">
              <div class="result-title">معدل دوران الموظفين</div>
              <div class="result-value blue">${turnoverRate.toFixed(1)}%</div>
            </div>
            <div class="result-card">
              <div class="result-title">تكلفة استبدال الموظف الواحد</div>
              <div class="result-value amber">${costPerEmployee.toLocaleString()} ريال</div>
            </div>
            <div class="result-card">
              <div class="result-title">إجمالي تكلفة دوران الموظفين</div>
              <div class="result-value red">${totalCost.toLocaleString()} ريال</div>
            </div>
            <div class="result-card">
              <div class="result-title">النسبة من إجمالي تكلفة الرواتب</div>
              <div class="result-value green">${((totalCost / (employeeCount * avgSalary)) * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div class="recommendations">
            <h2>توصيات لتقليل معدل دوران الموظفين:</h2>
            <ul>
              <li>تحسين بيئة العمل وزيادة رضا الموظفين</li>
              <li>تطوير برامج التدريب والتطوير المهني</li>
              <li>مراجعة سياسات الأجور والحوافز</li>
              <li>تحسين عملية اختيار وتوظيف الموظفين الجدد</li>
            </ul>
          </div>
          
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
      <CardHeader className="pb-2">
        <Tabs defaultValue="calculator">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              حاسبة تكلفة دوران الموظفين
            </CardTitle>
            <div className="flex items-center gap-4">
              <TabsList>
                <TabsTrigger value="calculator">الحاسبة</TabsTrigger>
                <TabsTrigger value="history">السجل</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 ml-2" />
                  حفظ
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="calculator" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="employeeCount"
                      className="text-base font-medium"
                    >
                      إجمالي عدد الموظفين
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>العدد الإجمالي للموظفين في الشركة أو القسم</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="departedEmployees"
                      className="text-base font-medium"
                    >
                      عدد الموظفين المغادرين
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>عدد الموظفين الذين غادروا خلال الفترة المحددة</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="departedEmployees"
                    type="number"
                    value={departedEmployees}
                    onChange={(e) =>
                      setDepartedEmployees(Number(e.target.value))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="avgSalary"
                      className="text-base font-medium"
                    >
                      متوسط الراتب الشهري
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>متوسط الراتب الشهري للموظفين</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="avgSalary"
                    type="number"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="recruitmentCost"
                      className="text-base font-medium"
                    >
                      تكلفة التوظيف
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            تكلفة توظيف موظف جديد (الإعلانات، المقابلات، إلخ)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="recruitmentCost"
                    type="number"
                    value={recruitmentCost}
                    onChange={(e) => setRecruitmentCost(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="trainingCost"
                      className="text-base font-medium"
                    >
                      تكلفة التدريب
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>تكلفة تدريب الموظف الجديد</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="trainingCost"
                    type="number"
                    value={trainingCost}
                    onChange={(e) => setTrainingCost(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="productivityLoss"
                      className="text-base font-medium"
                    >
                      نسبة فقدان الإنتاجية (%)
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            نسبة فقدان الإنتاجية أثناء فترة التعلم للموظف الجديد
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="productivityLoss"
                    type="number"
                    value={productivityLoss}
                    onChange={(e) =>
                      setProductivityLoss(Number(e.target.value))
                    }
                  />
                </div>

                <Button className="w-full">
                  <Calculator className="h-4 w-4 ml-2" />
                  حساب التكلفة
                </Button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-6">نتائج الحساب</h3>

                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">
                      معدل دوران الموظفين
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {turnoverRate.toFixed(1)}%
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">
                      تكلفة استبدال الموظف الواحد
                    </p>
                    <p className="text-2xl font-bold text-amber-600">
                      {costPerEmployee.toLocaleString()} ريال
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">
                      إجمالي تكلفة دوران الموظفين
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {totalCost.toLocaleString()} ريال
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">
                      النسبة من إجمالي تكلفة الرواتب
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {(
                        (totalCost / (employeeCount * avgSalary)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-700 mb-2">
                    توصيات لتقليل معدل دوران الموظفين:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>تحسين بيئة العمل وزيادة رضا الموظفين</li>
                    <li>تطوير برامج التدريب والتطوير المهني</li>
                    <li>مراجعة سياسات الأجور والحوافز</li>
                    <li>تحسين عملية اختيار وتوظيف الموظفين الجدد</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">
                سجل حسابات تكلفة دوران الموظفين السابقة سيظهر هنا
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default TurnoverCalculator;
