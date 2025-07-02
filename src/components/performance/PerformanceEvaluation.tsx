import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Save, Edit, Printer, Download, Plus } from "lucide-react";

interface PerformanceEvaluationProps {
  className?: string;
}

const PerformanceEvaluation = ({ className }: PerformanceEvaluationProps) => {
  const [department, setDepartment] = useState<string>("all");
  const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Mock data for the performance evaluations
  const performanceData = [
    {
      id: "1",
      employee: "أحمد محمد",
      position: "مطور برمجيات",
      department: "تقنية المعلومات",
      evaluationDate: "2023-05-15",
      evaluator: "محمد خالد",
      scores: {
        productivity: 85,
        quality: 90,
        teamwork: 80,
        communication: 75,
        initiative: 85,
      },
      overallScore: 83,
      strengths: "مهارات تقنية ممتازة، قدرة على حل المشكلات المعقدة",
      improvements: "يحتاج إلى تحسين مهارات التواصل والعمل الجماعي",
    },
    {
      id: "2",
      employee: "سارة أحمد",
      position: "مصمم واجهات",
      department: "تقنية المعلومات",
      evaluationDate: "2023-05-16",
      evaluator: "محمد خالد",
      scores: {
        productivity: 90,
        quality: 95,
        teamwork: 85,
        communication: 90,
        initiative: 80,
      },
      overallScore: 88,
      strengths: "إبداع في التصميم، اهتمام بالتفاصيل، تعاون ممتاز مع الفريق",
      improvements: "تحتاج إلى تطوير مهارات إدارة الوقت",
    },
    {
      id: "3",
      employee: "محمد علي",
      position: "محاسب",
      department: "المالية",
      evaluationDate: "2023-05-17",
      evaluator: "أحمد إبراهيم",
      scores: {
        productivity: 80,
        quality: 85,
        teamwork: 75,
        communication: 70,
        initiative: 65,
      },
      overallScore: 75,
      strengths: "دقة في العمل، التزام بالمواعيد النهائية",
      improvements: "يحتاج إلى تحسين المبادرة والابتكار في العمل",
    },
  ];

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-amber-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-amber-500";
    if (score >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleEditEvaluation = (employee: any) => {
    setSelectedEmployee(employee);
    setOpenEvaluationDialog(true);
  };

  const handleAddEvaluation = () => {
    setSelectedEmployee(null);
    setOpenEvaluationDialog(true);
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>تقرير تقييم الأداء</title>
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
            .performance-good { color: #16a34a; }
            .performance-medium { color: #d97706; }
            .performance-poor { color: #dc2626; }
            .progress-container { width: 100px; height: 10px; background-color: #e5e7eb; border-radius: 5px; }
            .progress-bar { height: 10px; border-radius: 5px; }
            .progress-good { background-color: #22c55e; }
            .progress-medium { background-color: #f59e0b; }
            .progress-poor { background-color: #ef4444; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>تقرير تقييم الأداء</h1>
            <div class="date">تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}</div>
          </div>
          
          <div class="summary">
            <div class="summary-card">
              <div class="summary-title">متوسط التقييم العام</div>
              <div class="summary-value">
                ${Math.round(
                  performanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
                    .reduce((sum, item) => sum + item.overallScore, 0) /
                    performanceData.filter(
                      (item) =>
                        department === "all" || item.department === department,
                    ).length,
                )}%
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-title">أعلى تقييم</div>
              <div class="summary-value performance-good">
                ${Math.max(
                  ...performanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
                    .map((item) => item.overallScore),
                )}%
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-title">أدنى تقييم</div>
              <div class="summary-value performance-medium">
                ${Math.min(
                  ...performanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
                    .map((item) => item.overallScore),
                )}%
              </div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>الموظف</th>
                <th>القسم</th>
                <th>تاريخ التقييم</th>
                <th>المُقيّم</th>
                <th>الإنتاجية</th>
                <th>الجودة</th>
                <th>العمل الجماعي</th>
                <th>التقييم العام</th>
              </tr>
            </thead>
            <tbody>
              ${performanceData
                .filter(
                  (item) =>
                    department === "all" || item.department === department,
                )
                .map((item) => {
                  const getClass = (score) => {
                    if (score >= 90) return "performance-good";
                    if (score >= 75) return "performance-medium";
                    return "performance-poor";
                  };

                  const getProgressClass = (score) => {
                    if (score >= 90) return "progress-good";
                    if (score >= 75) return "progress-medium";
                    return "progress-poor";
                  };

                  return `
                    <tr>
                      <td>
                        <div><strong>${item.employee}</strong></div>
                        <div style="font-size: 12px; color: #666;">${item.position}</div>
                      </td>
                      <td>${item.department}</td>
                      <td>${item.evaluationDate}</td>
                      <td>${item.evaluator}</td>
                      <td>
                        <div class="${getClass(item.scores.productivity)}">${item.scores.productivity}%</div>
                        <div class="progress-container">
                          <div class="progress-bar ${getProgressClass(item.scores.productivity)}" style="width: ${item.scores.productivity}%"></div>
                        </div>
                      </td>
                      <td>
                        <div class="${getClass(item.scores.quality)}">${item.scores.quality}%</div>
                        <div class="progress-container">
                          <div class="progress-bar ${getProgressClass(item.scores.quality)}" style="width: ${item.scores.quality}%"></div>
                        </div>
                      </td>
                      <td>
                        <div class="${getClass(item.scores.teamwork)}">${item.scores.teamwork}%</div>
                        <div class="progress-container">
                          <div class="progress-bar ${getProgressClass(item.scores.teamwork)}" style="width: ${item.scores.teamwork}%"></div>
                        </div>
                      </td>
                      <td>
                        <div class="${getClass(item.overallScore)}">${item.overallScore}%</div>
                        <div class="progress-container">
                          <div class="progress-bar ${getProgressClass(item.overallScore)}" style="width: ${item.overallScore}%"></div>
                        </div>
                      </td>
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

  return (
    <>
      <Card
        className={`border shadow-sm bg-white ${className} print:shadow-none print:border-0`}
      >
        <CardHeader className="pb-2">
          <Tabs defaultValue="evaluations">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                تقييم الأداء
              </CardTitle>
              <div className="flex items-center gap-4">
                <TabsList>
                  <TabsTrigger value="evaluations">التقييمات</TabsTrigger>
                  <TabsTrigger value="reports">التقارير</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 ml-2" />
                    طباعة
                  </Button>
                  <Button size="sm" onClick={handleAddEvaluation}>
                    <Plus className="h-4 w-4 ml-2" />
                    تقييم جديد
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">القسم</label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-[200px]">
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
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">الموظف</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الموظفين</SelectItem>
                    <SelectItem value="1">أحمد محمد</SelectItem>
                    <SelectItem value="2">سارة أحمد</SelectItem>
                    <SelectItem value="3">محمد علي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">الفترة</label>
                <Select defaultValue="current">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفترة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">الفترة الحالية</SelectItem>
                    <SelectItem value="previous">الفترة السابقة</SelectItem>
                    <SelectItem value="all">جميع الفترات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="evaluations" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الموظف</TableHead>
                    <TableHead className="text-right">القسم</TableHead>
                    <TableHead className="text-right">تاريخ التقييم</TableHead>
                    <TableHead className="text-right">المُقيّم</TableHead>
                    <TableHead className="text-right">الإنتاجية</TableHead>
                    <TableHead className="text-right">الجودة</TableHead>
                    <TableHead className="text-right">العمل الجماعي</TableHead>
                    <TableHead className="text-right">التقييم العام</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData
                    .filter(
                      (item) =>
                        department === "all" || item.department === department,
                    )
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
                        <TableCell>{item.evaluationDate}</TableCell>
                        <TableCell>{item.evaluator}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span
                              className={getPerformanceColor(
                                item.scores.productivity,
                              )}
                            >
                              {item.scores.productivity}%
                            </span>
                            <Progress
                              value={item.scores.productivity}
                              className="h-2"
                              indicatorClassName={getProgressColor(
                                item.scores.productivity,
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span
                              className={getPerformanceColor(
                                item.scores.quality,
                              )}
                            >
                              {item.scores.quality}%
                            </span>
                            <Progress
                              value={item.scores.quality}
                              className="h-2"
                              indicatorClassName={getProgressColor(
                                item.scores.quality,
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span
                              className={getPerformanceColor(
                                item.scores.teamwork,
                              )}
                            >
                              {item.scores.teamwork}%
                            </span>
                            <Progress
                              value={item.scores.teamwork}
                              className="h-2"
                              indicatorClassName={getProgressColor(
                                item.scores.teamwork,
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span
                              className={getPerformanceColor(item.overallScore)}
                            >
                              {item.overallScore}%
                            </span>
                            <Progress
                              value={item.overallScore}
                              className="h-2"
                              indicatorClassName={getProgressColor(
                                item.overallScore,
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditEvaluation(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="reports" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        متوسط التقييم العام
                      </span>
                      <span className="text-2xl font-bold">
                        {Math.round(
                          performanceData
                            .filter(
                              (item) =>
                                department === "all" ||
                                item.department === department,
                            )
                            .reduce((sum, item) => sum + item.overallScore, 0) /
                            performanceData.filter(
                              (item) =>
                                department === "all" ||
                                item.department === department,
                            ).length,
                        )}
                        %
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">أعلى تقييم</span>
                      <span className="text-2xl font-bold text-green-600">
                        {Math.max(
                          ...performanceData
                            .filter(
                              (item) =>
                                department === "all" ||
                                item.department === department,
                            )
                            .map((item) => item.overallScore),
                        )}
                        %
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">أدنى تقييم</span>
                      <span className="text-2xl font-bold text-amber-600">
                        {Math.min(
                          ...performanceData
                            .filter(
                              (item) =>
                                department === "all" ||
                                item.department === department,
                            )
                            .map((item) => item.overallScore),
                        )}
                        %
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">
                  الرسوم البيانية لتقييمات الأداء ستظهر هنا
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <Dialog
        open={openEvaluationDialog}
        onOpenChange={setOpenEvaluationDialog}
      >
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">
              {selectedEmployee ? "تعديل تقييم الأداء" : "تقييم أداء جديد"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="employee">الموظف</Label>
                <Select defaultValue={selectedEmployee?.id || ""}>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">أحمد محمد</SelectItem>
                    <SelectItem value="2">سارة أحمد</SelectItem>
                    <SelectItem value="3">محمد علي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="evaluationDate">تاريخ التقييم</Label>
                <Input
                  id="evaluationDate"
                  type="date"
                  defaultValue={
                    selectedEmployee?.evaluationDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                الإنتاجية ({selectedEmployee?.scores?.productivity || 75}%)
              </Label>
              <Slider
                defaultValue={[selectedEmployee?.scores?.productivity || 75]}
                max={100}
                step={1}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>الجودة ({selectedEmployee?.scores?.quality || 75}%)</Label>
              <Slider
                defaultValue={[selectedEmployee?.scores?.quality || 75]}
                max={100}
                step={1}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                العمل الجماعي ({selectedEmployee?.scores?.teamwork || 75}%)
              </Label>
              <Slider
                defaultValue={[selectedEmployee?.scores?.teamwork || 75]}
                max={100}
                step={1}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                التواصل ({selectedEmployee?.scores?.communication || 75}%)
              </Label>
              <Slider
                defaultValue={[selectedEmployee?.scores?.communication || 75]}
                max={100}
                step={1}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                المبادرة ({selectedEmployee?.scores?.initiative || 75}%)
              </Label>
              <Slider
                defaultValue={[selectedEmployee?.scores?.initiative || 75]}
                max={100}
                step={1}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="strengths">نقاط القوة</Label>
              <Textarea
                id="strengths"
                defaultValue={selectedEmployee?.strengths || ""}
                placeholder="أدخل نقاط القوة للموظف"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="improvements">مجالات التحسين</Label>
              <Textarea
                id="improvements"
                defaultValue={selectedEmployee?.improvements || ""}
                placeholder="أدخل مجالات التحسين للموظف"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between mt-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setOpenEvaluationDialog(false)}
              >
                إلغاء
              </Button>
              <Button>
                <Save className="h-4 w-4 ml-2" />
                حفظ التقييم
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PerformanceEvaluation;
