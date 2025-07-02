import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  BarChart3,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Printer,
  X,
} from "lucide-react";

const PlanningAndExecution = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Sample projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "تطوير نظام إدارة الموارد البشرية",
      manager: "أحمد محمد",
      startDate: "2023-05-01",
      endDate: "2023-08-30",
      status: "قيد التنفيذ",
      progress: 45,
      priority: "عالية",
    },
    {
      id: 2,
      name: "تحديث سياسات الشركة",
      manager: "سارة أحمد",
      startDate: "2023-06-15",
      endDate: "2023-07-30",
      status: "قيد التنفيذ",
      progress: 30,
      priority: "متوسطة",
    },
    {
      id: 3,
      name: "تدريب الموظفين الجدد",
      manager: "محمد علي",
      startDate: "2023-04-10",
      endDate: "2023-06-10",
      status: "مكتمل",
      progress: 100,
      priority: "عالية",
    },
    {
      id: 4,
      name: "تطوير خطة التوظيف السنوية",
      manager: "فاطمة خالد",
      startDate: "2023-07-01",
      endDate: "2023-08-15",
      status: "قادم",
      progress: 0,
      priority: "متوسطة",
    },
  ]);

  // Sample goals data
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "زيادة معدل الاحتفاظ بالموظفين",
      description: "زيادة معدل الاحتفاظ بالموظفين بنسبة 15% خلال العام الحالي",
      category: "الموارد البشرية",
      targetDate: "2023-12-31",
      status: "قيد التنفيذ",
      progress: 40,
    },
    {
      id: 2,
      title: "تحسين عملية التوظيف",
      description: "تقليل وقت التوظيف من 45 يوم إلى 30 يوم",
      category: "التوظيف",
      targetDate: "2023-09-30",
      status: "قيد التنفيذ",
      progress: 60,
    },
    {
      id: 3,
      title: "تطوير برنامج تدريبي شامل",
      description: "إطلاق برنامج تدريبي شامل لجميع الأقسام",
      category: "التدريب",
      targetDate: "2023-10-15",
      status: "متأخر",
      progress: 25,
    },
    {
      id: 4,
      title: "تحسين رضا الموظفين",
      description: "زيادة نسبة رضا الموظفين إلى 85%",
      category: "الموارد البشرية",
      targetDate: "2023-11-30",
      status: "قيد التنفيذ",
      progress: 50,
    },
  ]);

  // Sample KPIs data
  const [kpis, setKpis] = useState([
    {
      id: 1,
      name: "معدل دوران الموظفين",
      category: "الموارد البشرية",
      target: "أقل من 10%",
      current: "12%",
      status: "متأخر",
      trend: "تحسن",
    },
    {
      id: 2,
      name: "متوسط وقت التوظيف",
      category: "التوظيف",
      target: "30 يوم",
      current: "35 يوم",
      status: "قيد التنفيذ",
      trend: "تحسن",
    },
    {
      id: 3,
      name: "نسبة رضا الموظفين",
      category: "الموارد البشرية",
      target: "85%",
      current: "78%",
      status: "قيد التنفيذ",
      trend: "ثابت",
    },
    {
      id: 4,
      name: "ساعات التدريب لكل موظف",
      category: "التدريب",
      target: "40 ساعة",
      current: "25 ساعة",
      status: "متأخر",
      trend: "تحسن",
    },
  ]);

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.name.includes(searchTerm) ||
      project.manager.includes(searchTerm) ||
      project.status.includes(searchTerm) ||
      project.priority.includes(searchTerm),
  );

  // Filter goals based on search term
  const filteredGoals = goals.filter(
    (goal) =>
      goal.title.includes(searchTerm) ||
      goal.description.includes(searchTerm) ||
      goal.category.includes(searchTerm) ||
      goal.status.includes(searchTerm),
  );

  // Filter KPIs based on search term
  const filteredKpis = kpis.filter(
    (kpi) =>
      kpi.name.includes(searchTerm) ||
      kpi.category.includes(searchTerm) ||
      kpi.status.includes(searchTerm) ||
      kpi.trend.includes(searchTerm),
  );

  // Render status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case "قيد التنفيذ":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "مكتمل":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "متأخر":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "قادم":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Calendar className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Render priority badge
  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case "عالية":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            {priority}
          </Badge>
        );
      case "متوسطة":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-500"
          >
            {priority}
          </Badge>
        );
      case "منخفضة":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            {priority}
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Render trend badge
  const renderTrendBadge = (trend) => {
    switch (trend) {
      case "تحسن":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            {trend} ↑
          </Badge>
        );
      case "تراجع":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            {trend} ↓
          </Badge>
        );
      case "ثابت":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            {trend} →
          </Badge>
        );
      default:
        return <Badge variant="outline">{trend}</Badge>;
    }
  };

  // Render progress bar
  const renderProgressBar = (progress) => {
    let bgColor = "bg-blue-500";
    if (progress < 25) bgColor = "bg-red-500";
    else if (progress < 50) bgColor = "bg-orange-500";
    else if (progress < 75) bgColor = "bg-yellow-500";
    else if (progress >= 75) bgColor = "bg-green-500";

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${bgColor} h-2.5 rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
        <span className="text-xs text-gray-500 mt-1">{progress}%</span>
      </div>
    );
  };

  return (
    <MainLayout
      title="التخطيط والتنفيذ"
      subtitle="إدارة المشاريع والأهداف ومؤشرات الأداء"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <Tabs
              defaultValue="projects"
              className="w-full"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="projects">المشاريع</TabsTrigger>
                  <TabsTrigger value="goals">الأهداف</TabsTrigger>
                  <TabsTrigger value="kpis">مؤشرات الأداء</TabsTrigger>
                  <TabsTrigger value="reports">التقارير</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث..."
                      className="pr-9 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  {activeTab !== "reports" && (
                    <Dialog
                      open={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          {activeTab === "projects"
                            ? "إضافة مشروع"
                            : activeTab === "goals"
                              ? "إضافة هدف"
                              : "إضافة مؤشر"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>
                            {activeTab === "projects"
                              ? "إضافة مشروع جديد"
                              : activeTab === "goals"
                                ? "إضافة هدف جديد"
                                : "إضافة مؤشر أداء جديد"}
                          </DialogTitle>
                        </DialogHeader>
                        {/* Form content would go here */}
                        <div className="p-4 text-center text-gray-500">
                          نموذج إضافة{" "}
                          {activeTab === "projects"
                            ? "مشروع جديد"
                            : activeTab === "goals"
                              ? "هدف جديد"
                              : "مؤشر أداء جديد"}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              <TabsContent value="projects" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اسم المشروع</TableHead>
                      <TableHead className="text-right">مدير المشروع</TableHead>
                      <TableHead className="text-right">
                        تاريخ البداية
                      </TableHead>
                      <TableHead className="text-right">
                        تاريخ النهاية
                      </TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">التقدم</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          {project.name}
                        </TableCell>
                        <TableCell>{project.manager}</TableCell>
                        <TableCell>
                          {new Date(project.startDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(project.endDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(project.status)}
                        </TableCell>
                        <TableCell>
                          {renderProgressBar(project.progress)}
                        </TableCell>
                        <TableCell>
                          {renderPriorityBadge(project.priority)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setViewItem(project);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4 ml-1" /> طباعة
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="goals" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الهدف</TableHead>
                      <TableHead className="text-right">الوصف</TableHead>
                      <TableHead className="text-right">الفئة</TableHead>
                      <TableHead className="text-right">
                        تاريخ الاستحقاق
                      </TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">التقدم</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGoals.map((goal) => (
                      <TableRow key={goal.id}>
                        <TableCell className="font-medium">
                          {goal.title}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {goal.description}
                        </TableCell>
                        <TableCell>{goal.category}</TableCell>
                        <TableCell>
                          {new Date(goal.targetDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{renderStatusBadge(goal.status)}</TableCell>
                        <TableCell>
                          {renderProgressBar(goal.progress)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setViewItem(goal);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4 ml-1" /> طباعة
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="kpis" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">المؤشر</TableHead>
                      <TableHead className="text-right">الفئة</TableHead>
                      <TableHead className="text-right">المستهدف</TableHead>
                      <TableHead className="text-right">
                        القيمة الحالية
                      </TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الاتجاه</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKpis.map((kpi) => (
                      <TableRow key={kpi.id}>
                        <TableCell className="font-medium">
                          {kpi.name}
                        </TableCell>
                        <TableCell>{kpi.category}</TableCell>
                        <TableCell>{kpi.target}</TableCell>
                        <TableCell>{kpi.current}</TableCell>
                        <TableCell>{renderStatusBadge(kpi.status)}</TableCell>
                        <TableCell>{renderTrendBadge(kpi.trend)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setViewItem(kpi);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4 ml-1" /> طباعة
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-medium mb-2">
                      تقرير حالة المشاريع
                    </h3>
                    <p className="text-gray-500 mb-4">
                      عرض تقرير مفصل عن حالة المشاريع الحالية
                    </p>
                    <Button variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" /> عرض التقرير
                    </Button>
                  </Card>

                  <Card className="p-6 text-center">
                    <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-medium mb-2">
                      تقرير الأهداف السنوية
                    </h3>
                    <p className="text-gray-500 mb-4">
                      عرض تقرير مفصل عن الأهداف السنوية وحالتها
                    </p>
                    <Button variant="outline">
                      <Target className="mr-2 h-4 w-4" /> عرض التقرير
                    </Button>
                  </Card>

                  <Card className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-medium mb-2">
                      تقرير مؤشرات الأداء
                    </h3>
                    <p className="text-gray-500 mb-4">
                      عرض تقرير مفصل عن مؤشرات الأداء الرئيسية
                    </p>
                    <Button variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" /> عرض التقرير
                    </Button>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "projects" && viewItem
                ? "تفاصيل المشروع"
                : activeTab === "goals" && viewItem
                  ? "تفاصيل الهدف"
                  : activeTab === "kpis" && viewItem
                    ? "تفاصيل مؤشر الأداء"
                    : ""}
            </DialogTitle>
            <DialogDescription>عرض التفاصيل الكاملة</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {viewItem && activeTab === "projects" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">اسم المشروع:</h4>
                  <p className="col-span-3">{viewItem.name}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">مدير المشروع:</h4>
                  <p className="col-span-3">{viewItem.manager}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">تاريخ البداية:</h4>
                  <p className="col-span-3">
                    {new Date(viewItem.startDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">تاريخ النهاية:</h4>
                  <p className="col-span-3">
                    {new Date(viewItem.endDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الحالة:</h4>
                  <div className="col-span-3">
                    {renderStatusBadge(viewItem.status)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">التقدم:</h4>
                  <div className="col-span-3">
                    {renderProgressBar(viewItem.progress)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الأولوية:</h4>
                  <div className="col-span-3">
                    {renderPriorityBadge(viewItem.priority)}
                  </div>
                </div>
              </>
            )}

            {viewItem && activeTab === "goals" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">عنوان الهدف:</h4>
                  <p className="col-span-3">{viewItem.title}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الوصف:</h4>
                  <p className="col-span-3">{viewItem.description}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الفئة:</h4>
                  <p className="col-span-3">{viewItem.category}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">تاريخ الاستحقاق:</h4>
                  <p className="col-span-3">
                    {new Date(viewItem.targetDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الحالة:</h4>
                  <div className="col-span-3">
                    {renderStatusBadge(viewItem.status)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">التقدم:</h4>
                  <div className="col-span-3">
                    {renderProgressBar(viewItem.progress)}
                  </div>
                </div>
              </>
            )}

            {viewItem && activeTab === "kpis" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">اسم المؤشر:</h4>
                  <p className="col-span-3">{viewItem.name}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الفئة:</h4>
                  <p className="col-span-3">{viewItem.category}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">المستهدف:</h4>
                  <p className="col-span-3">{viewItem.target}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">القيمة الحالية:</h4>
                  <p className="col-span-3">{viewItem.current}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الحالة:</h4>
                  <div className="col-span-3">
                    {renderStatusBadge(viewItem.status)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h4 className="font-medium col-span-1">الاتجاه:</h4>
                  <div className="col-span-3">
                    {renderTrendBadge(viewItem.trend)}
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              <X className="h-4 w-4 ml-1" /> إغلاق
            </Button>
            <Button>
              <Printer className="h-4 w-4 ml-1" /> طباعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default PlanningAndExecution;
