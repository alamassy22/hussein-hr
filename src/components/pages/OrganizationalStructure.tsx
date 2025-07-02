import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PrintWrapper from "@/components/ui/print-wrapper";
import {
  Search,
  Plus,
  Filter,
  Users,
  Building2,
  Layers3,
  Eye,
  MapPin,
  User,
  Calendar,
  Phone,
  Mail,
  Edit,
  Printer,
} from "lucide-react";

const OrganizationalStructure = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [isViewDepartmentOpen, setIsViewDepartmentOpen] = useState(false);
  const [isViewPositionOpen, setIsViewPositionOpen] = useState(false);
  const [isViewBranchOpen, setIsViewBranchOpen] = useState(false);
  const [isOrgChartOpen, setIsOrgChartOpen] = useState(false);
  const [isEditDepartmentOpen, setIsEditDepartmentOpen] = useState(false);
  const [isEditPositionOpen, setIsEditPositionOpen] = useState(false);
  const [isEditBranchOpen, setIsEditBranchOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [printType, setPrintType] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  const [editingPosition, setEditingPosition] = useState<any>(null);
  const [editingBranch, setEditingBranch] = useState<any>(null);

  // Sample departments data
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "الموارد البشرية",
      manager: "أحمد محمد",
      employeesCount: 12,
      parentDepartment: "-",
      location: "المقر الرئيسي",
      description: "قسم مسؤول عن إدارة شؤون الموظفين والتوظيف والتدريب",
      establishedDate: "2020-01-15",
      budget: "500,000 ريال",
      phone: "+966-11-1234567",
      email: "hr@company.com",
    },
    {
      id: 2,
      name: "المالية",
      manager: "سارة أحمد",
      employeesCount: 8,
      parentDepartment: "-",
      location: "المقر الرئيسي",
      description: "قسم مسؤول عن الشؤون المالية والمحاسبة والميزانيات",
      establishedDate: "2020-01-15",
      budget: "300,000 ريال",
      phone: "+966-11-1234568",
      email: "finance@company.com",
    },
    {
      id: 3,
      name: "تقنية المعلومات",
      manager: "محمد علي",
      employeesCount: 15,
      parentDepartment: "-",
      location: "المقر الرئيسي",
      description: "قسم مسؤول عن تطوير وصيانة الأنظمة التقنية",
      establishedDate: "2020-02-01",
      budget: "800,000 ريال",
      phone: "+966-11-1234569",
      email: "it@company.com",
    },
    {
      id: 4,
      name: "التوظيف",
      manager: "فاطمة خالد",
      employeesCount: 5,
      parentDepartment: "الموارد البشرية",
      location: "المقر الرئيسي",
      description: "قسم فرعي مسؤول عن عمليات التوظيف والاستقطاب",
      establishedDate: "2020-03-01",
      budget: "200,000 ريال",
      phone: "+966-11-1234570",
      email: "recruitment@company.com",
    },
    {
      id: 5,
      name: "التطوير",
      manager: "خالد عبدالله",
      employeesCount: 8,
      parentDepartment: "تقنية المعلومات",
      location: "المقر الرئيسي",
      description: "قسم فرعي مسؤول عن تطوير البرمجيات والتطبيقات",
      establishedDate: "2020-04-01",
      budget: "400,000 ريال",
      phone: "+966-11-1234571",
      email: "development@company.com",
    },
  ]);

  // Sample positions data
  const [positions, setPositions] = useState([
    {
      id: 1,
      title: "مدير الموارد البشرية",
      department: "الموارد البشرية",
      level: "إدارة عليا",
      reportTo: "المدير التنفيذي",
      vacancies: 0,
      description: "مسؤول عن إدارة جميع شؤون الموظفين والسياسات الإدارية",
      requirements: "بكالوريوس إدارة أعمال، خبرة 5 سنوات",
      salary: "15,000 - 20,000 ريال",
      workHours: "8 ساعات يومياً",
      benefits: "تأمين طبي، بدل سكن، بدل مواصلات",
    },
    {
      id: 2,
      title: "أخصائي توظيف",
      department: "الموارد البشرية",
      level: "أخصائي",
      reportTo: "مدير الموارد البشرية",
      vacancies: 1,
      description: "مسؤول عن عمليات التوظيف والاستقطاب والمقابلات",
      requirements: "بكالوريوس موارد بشرية، خبرة 2-3 سنوات",
      salary: "8,000 - 12,000 ريال",
      workHours: "8 ساعات يومياً",
      benefits: "تأمين طبي، بدل مواصلات",
    },
    {
      id: 3,
      title: "مدير تقنية المعلومات",
      department: "تقنية المعلومات",
      level: "إدارة عليا",
      reportTo: "المدير التنفيذي",
      vacancies: 0,
      description: "مسؤول عن إدارة البنية التحتية التقنية والأنظمة",
      requirements: "بكالوريوس هندسة حاسوب، خبرة 7 سنوات",
      salary: "18,000 - 25,000 ريال",
      workHours: "8 ساعات يومياً",
      benefits: "تأمين طبي، بدل سكن، بدل مواصلات، بدل هاتف",
    },
    {
      id: 4,
      title: "مطور برمجيات",
      department: "تقنية المعلومات",
      level: "أخصائي",
      reportTo: "مدير تقنية المعلومات",
      vacancies: 2,
      description: "مسؤول عن تطوير وصيانة التطبيقات والأنظمة البرمجية",
      requirements: "بكالوريوس علوم حاسوب، خبرة 2-4 سنوات",
      salary: "10,000 - 15,000 ريال",
      workHours: "8 ساعات يومياً",
      benefits: "تأمين طبي، بدل مواصلات، بدل هاتف",
    },
    {
      id: 5,
      title: "محاسب",
      department: "المالية",
      level: "أخصائي",
      reportTo: "مدير المالية",
      vacancies: 1,
      description: "مسؤول عن المعاملات المالية والتقارير المحاسبية",
      requirements: "بكالوريوس محاسبة، خبرة 2-3 سنوات",
      salary: "7,000 - 10,000 ريال",
      workHours: "8 ساعات يومياً",
      benefits: "تأمين طبي، بدل مواصلات",
    },
  ]);

  // Sample branches data
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "المقر الرئيسي",
      location: "الرياض",
      manager: "محمد سعيد",
      employeesCount: 45,
      departments: 5,
      address: "شارع الملك فهد، حي العليا، الرياض 12345",
      phone: "+966-11-1234567",
      email: "riyadh@company.com",
      establishedDate: "2020-01-01",
      area: "500 متر مربع",
      workingHours: "8:00 ص - 5:00 م",
    },
    {
      id: 2,
      name: "فرع الشرقية",
      location: "الدمام",
      manager: "خالد عبدالله",
      employeesCount: 20,
      departments: 3,
      address: "شارع الأمير محمد بن فهد، الدمام 31411",
      phone: "+966-13-1234567",
      email: "dammam@company.com",
      establishedDate: "2021-03-15",
      area: "300 متر مربع",
      workingHours: "8:00 ص - 5:00 م",
    },
    {
      id: 3,
      name: "فرع الغربية",
      location: "جدة",
      manager: "سارة محمد",
      employeesCount: 25,
      departments: 4,
      address: "شارع التحلية، حي الزهراء، جدة 21589",
      phone: "+966-12-1234567",
      email: "jeddah@company.com",
      establishedDate: "2021-06-01",
      area: "400 متر مربع",
      workingHours: "8:00 ص - 5:00 م",
    },
  ]);

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.includes(searchTerm) ||
      department.manager.includes(searchTerm) ||
      department.location.includes(searchTerm) ||
      department.parentDepartment.includes(searchTerm),
  );

  // Filter positions based on search term
  const filteredPositions = positions.filter(
    (position) =>
      position.title.includes(searchTerm) ||
      position.department.includes(searchTerm) ||
      position.level.includes(searchTerm) ||
      position.reportTo.includes(searchTerm),
  );

  // Filter branches based on search term
  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.includes(searchTerm) ||
      branch.location.includes(searchTerm) ||
      branch.manager.includes(searchTerm),
  );

  return (
    <MainLayout
      title="الهيكل التنظيمي"
      subtitle="إدارة الهيكل التنظيمي للمؤسسة"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Tabs
                defaultValue="departments"
                className="w-full"
                onValueChange={setActiveTab}
                value={activeTab}
              >
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="departments">الأقسام</TabsTrigger>
                    <TabsTrigger value="positions">المناصب</TabsTrigger>
                    <TabsTrigger value="branches">الفروع</TabsTrigger>
                    <TabsTrigger value="chart">المخطط التنظيمي</TabsTrigger>
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
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPrintType(activeTab);
                        setIsPrintDialogOpen(true);
                      }}
                    >
                      <Printer className="mr-2 h-4 w-4" />
                      طباعة
                    </Button>
                    {activeTab !== "chart" && (
                      <Dialog
                        open={isAddDialogOpen}
                        onOpenChange={setIsAddDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            {activeTab === "departments"
                              ? "إضافة قسم"
                              : activeTab === "positions"
                                ? "إضافة منصب"
                                : "إضافة فرع"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>
                              {activeTab === "departments"
                                ? "إضافة قسم جديد"
                                : activeTab === "positions"
                                  ? "إضافة منصب جديد"
                                  : "إضافة فرع جديد"}
                            </DialogTitle>
                          </DialogHeader>
                          {/* Form content would go here */}
                          <div className="p-4 text-center text-gray-500">
                            نموذج إضافة{" "}
                            {activeTab === "departments"
                              ? "قسم جديد"
                              : activeTab === "positions"
                                ? "منصب جديد"
                                : "فرع جديد"}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                <TabsContent value="departments" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">اسم القسم</TableHead>
                        <TableHead className="text-right">المدير</TableHead>
                        <TableHead className="text-right">
                          عدد الموظفين
                        </TableHead>
                        <TableHead className="text-right">
                          القسم الأعلى
                        </TableHead>
                        <TableHead className="text-right">الموقع</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDepartments.map((department) => (
                        <TableRow key={department.id}>
                          <TableCell className="font-medium">
                            {department.name}
                          </TableCell>
                          <TableCell>{department.manager}</TableCell>
                          <TableCell>{department.employeesCount}</TableCell>
                          <TableCell>{department.parentDepartment}</TableCell>
                          <TableCell>{department.location}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedDepartment(department);
                                  setIsViewDepartmentOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingDepartment(department);
                                  setIsEditDepartmentOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4 ml-1" />
                                تعديل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="positions" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">المنصب</TableHead>
                        <TableHead className="text-right">القسم</TableHead>
                        <TableHead className="text-right">المستوى</TableHead>
                        <TableHead className="text-right">يتبع لـ</TableHead>
                        <TableHead className="text-right">الشواغر</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPositions.map((position) => (
                        <TableRow key={position.id}>
                          <TableCell className="font-medium">
                            {position.title}
                          </TableCell>
                          <TableCell>{position.department}</TableCell>
                          <TableCell>{position.level}</TableCell>
                          <TableCell>{position.reportTo}</TableCell>
                          <TableCell>{position.vacancies}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPosition(position);
                                  setIsViewPositionOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingPosition(position);
                                  setIsEditPositionOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4 ml-1" />
                                تعديل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="branches" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">اسم الفرع</TableHead>
                        <TableHead className="text-right">الموقع</TableHead>
                        <TableHead className="text-right">المدير</TableHead>
                        <TableHead className="text-right">
                          عدد الموظفين
                        </TableHead>
                        <TableHead className="text-right">
                          عدد الأقسام
                        </TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBranches.map((branch) => (
                        <TableRow key={branch.id}>
                          <TableCell className="font-medium">
                            {branch.name}
                          </TableCell>
                          <TableCell>{branch.location}</TableCell>
                          <TableCell>{branch.manager}</TableCell>
                          <TableCell>{branch.employeesCount}</TableCell>
                          <TableCell>{branch.departments}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedBranch(branch);
                                  setIsViewBranchOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingBranch(branch);
                                  setIsEditBranchOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4 ml-1" />
                                تعديل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="chart" className="mt-6">
                  <div className="p-8 text-center border rounded-md">
                    <Layers3 className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-medium mb-2">
                      المخطط التنظيمي
                    </h3>
                    <p className="text-gray-500 mb-4">
                      عرض الهيكل التنظيمي للمؤسسة بشكل تخطيطي
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsOrgChartOpen(true)}
                      >
                        <Layers3 className="mr-2 h-4 w-4" /> عرض المخطط التنظيمي
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPrintType("chart");
                          setIsPrintDialogOpen(true);
                        }}
                      >
                        <Printer className="mr-2 h-4 w-4" /> طباعة المخطط
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardHeader>
        </Card>

        {/* Department View Dialog */}
        <Dialog
          open={isViewDepartmentOpen}
          onOpenChange={setIsViewDepartmentOpen}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-right">
                تفاصيل القسم: {selectedDepartment?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedDepartment && (
              <div className="space-y-6 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      المعلومات الأساسية
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          اسم القسم:
                        </span>
                        <span>{selectedDepartment.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          المدير:
                        </span>
                        <span>{selectedDepartment.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          عدد الموظفين:
                        </span>
                        <Badge variant="secondary">
                          {selectedDepartment.employeesCount}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          القسم الأعلى:
                        </span>
                        <span>{selectedDepartment.parentDepartment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الموقع:
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedDepartment.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      معلومات إضافية
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          تاريخ التأسيس:
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(
                            selectedDepartment.establishedDate,
                          ).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الميزانية:
                        </span>
                        <span>{selectedDepartment.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الهاتف:
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {selectedDepartment.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          البريد الإلكتروني:
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {selectedDepartment.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg border-b pb-2">الوصف</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedDepartment.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Position View Dialog */}
        <Dialog open={isViewPositionOpen} onOpenChange={setIsViewPositionOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-right">
                تفاصيل المنصب: {selectedPosition?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedPosition && (
              <div className="space-y-6 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      المعلومات الأساسية
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          المنصب:
                        </span>
                        <span>{selectedPosition.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          القسم:
                        </span>
                        <span>{selectedPosition.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          المستوى:
                        </span>
                        <Badge variant="outline">
                          {selectedPosition.level}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          يتبع لـ:
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {selectedPosition.reportTo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الشواغر:
                        </span>
                        <Badge
                          variant={
                            selectedPosition.vacancies > 0
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {selectedPosition.vacancies}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      التفاصيل المالية
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الراتب:
                        </span>
                        <span>{selectedPosition.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          ساعات العمل:
                        </span>
                        <span>{selectedPosition.workHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg border-b pb-2 mb-2">
                      الوصف الوظيفي
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedPosition.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg border-b pb-2 mb-2">
                      المتطلبات
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedPosition.requirements}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg border-b pb-2 mb-2">
                      المزايا
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedPosition.benefits}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Branch View Dialog */}
        <Dialog open={isViewBranchOpen} onOpenChange={setIsViewBranchOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-right">
                تفاصيل الفرع: {selectedBranch?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedBranch && (
              <div className="space-y-6 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      المعلومات الأساسية
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          اسم الفرع:
                        </span>
                        <span>{selectedBranch.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          المدير:
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {selectedBranch.manager}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الموقع:
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedBranch.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          عدد الموظفين:
                        </span>
                        <Badge variant="secondary">
                          {selectedBranch.employeesCount}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          عدد الأقسام:
                        </span>
                        <Badge variant="outline">
                          {selectedBranch.departments}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      معلومات الاتصال
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          الهاتف:
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {selectedBranch.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          البريد الإلكتروني:
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {selectedBranch.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          ساعات العمل:
                        </span>
                        <span>{selectedBranch.workingHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg border-b pb-2 mb-2">
                      العنوان الكامل
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedBranch.address}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-600">
                        تاريخ التأسيس:
                      </span>
                      <p className="flex items-center gap-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(
                          selectedBranch.establishedDate,
                        ).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        المساحة:
                      </span>
                      <p className="mt-1">{selectedBranch.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Organizational Chart Dialog */}
        <Dialog open={isOrgChartOpen} onOpenChange={setIsOrgChartOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-right">
                المخطط التنظيمي للمؤسسة
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-8">
                {/* CEO Level */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                    <div className="font-bold">المدير التنفيذي</div>
                    <div className="text-sm opacity-90">محمد الأحمد</div>
                  </div>
                </div>

                {/* Department Managers Level */}
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow mb-2">
                      <div className="font-semibold text-sm">
                        مدير الموارد البشرية
                      </div>
                      <div className="text-xs opacity-90">أحمد محمد</div>
                    </div>
                    <div className="w-px h-8 bg-gray-400 mx-auto"></div>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow mb-2">
                      <div className="font-semibold text-sm">
                        مدير تقنية المعلومات
                      </div>
                      <div className="text-xs opacity-90">محمد علي</div>
                    </div>
                    <div className="w-px h-8 bg-gray-400 mx-auto"></div>
                  </div>

                  <div className="text-center">
                    <div className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow mb-2">
                      <div className="font-semibold text-sm">مدير المالية</div>
                      <div className="text-xs opacity-90">سارة أحمد</div>
                    </div>
                    <div className="w-px h-8 bg-gray-400 mx-auto"></div>
                  </div>
                </div>

                {/* Sub-departments Level */}
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <div className="bg-green-400 text-white px-3 py-2 rounded shadow text-xs">
                      <div className="font-semibold">قسم التوظيف</div>
                      <div className="opacity-90">فاطمة خالد</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-400 text-white px-3 py-2 rounded shadow text-xs">
                      <div className="font-semibold">قسم التطوير</div>
                      <div className="opacity-90">خالد عبدالله</div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-8 p-4 bg-white rounded border">
                  <h4 className="font-semibold mb-3 text-center">
                    دليل الألوان
                  </h4>
                  <div className="flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span>الإدارة العليا</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span>الموارد البشرية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span>تقنية المعلومات</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-600 rounded"></div>
                      <span>المالية</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Department Dialog */}
        <Dialog
          open={isEditDepartmentOpen}
          onOpenChange={setIsEditDepartmentOpen}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-right">
                تعديل القسم: {editingDepartment?.name}
              </DialogTitle>
            </DialogHeader>
            {editingDepartment && (
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-name">اسم القسم</Label>
                    <Input
                      id="dept-name"
                      defaultValue={editingDepartment.name}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-manager">المدير</Label>
                    <Input
                      id="dept-manager"
                      defaultValue={editingDepartment.manager}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-parent">القسم الأعلى</Label>
                    <Select defaultValue={editingDepartment.parentDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم الأعلى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-">-</SelectItem>
                        <SelectItem value="الموارد البشرية">
                          الموارد البشرية
                        </SelectItem>
                        <SelectItem value="تقنية المعلومات">
                          تقنية المعلومات
                        </SelectItem>
                        <SelectItem value="المالية">المالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-location">الموقع</Label>
                    <Input
                      id="dept-location"
                      defaultValue={editingDepartment.location}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-phone">الهاتف</Label>
                    <Input
                      id="dept-phone"
                      defaultValue={editingDepartment.phone}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-email">البريد الإلكتروني</Label>
                    <Input
                      id="dept-email"
                      defaultValue={editingDepartment.email}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept-budget">الميزانية</Label>
                  <Input
                    id="dept-budget"
                    defaultValue={editingDepartment.budget}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept-description">الوصف</Label>
                  <Textarea
                    id="dept-description"
                    defaultValue={editingDepartment.description}
                    className="text-right"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDepartmentOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={() => {
                      // Here you would update the department data
                      setIsEditDepartmentOpen(false);
                    }}
                  >
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Position Dialog */}
        <Dialog open={isEditPositionOpen} onOpenChange={setIsEditPositionOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-right">
                تعديل المنصب: {editingPosition?.title}
              </DialogTitle>
            </DialogHeader>
            {editingPosition && (
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pos-title">المنصب</Label>
                    <Input
                      id="pos-title"
                      defaultValue={editingPosition.title}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pos-department">القسم</Label>
                    <Select defaultValue={editingPosition.department}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الموارد البشرية">
                          الموارد البشرية
                        </SelectItem>
                        <SelectItem value="تقنية المعلومات">
                          تقنية المعلومات
                        </SelectItem>
                        <SelectItem value="المالية">المالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pos-level">المستوى</Label>
                    <Select defaultValue={editingPosition.level}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="إدارة عليا">إدارة عليا</SelectItem>
                        <SelectItem value="إدارة وسطى">إدارة وسطى</SelectItem>
                        <SelectItem value="أخصائي">أخصائي</SelectItem>
                        <SelectItem value="موظف">موظف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pos-reportto">يتبع لـ</Label>
                    <Input
                      id="pos-reportto"
                      defaultValue={editingPosition.reportTo}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pos-salary">الراتب</Label>
                    <Input
                      id="pos-salary"
                      defaultValue={editingPosition.salary}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pos-vacancies">الشواغر</Label>
                    <Input
                      id="pos-vacancies"
                      type="number"
                      defaultValue={editingPosition.vacancies}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pos-description">الوصف الوظيفي</Label>
                  <Textarea
                    id="pos-description"
                    defaultValue={editingPosition.description}
                    className="text-right"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pos-requirements">المتطلبات</Label>
                  <Textarea
                    id="pos-requirements"
                    defaultValue={editingPosition.requirements}
                    className="text-right"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditPositionOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={() => {
                      // Here you would update the position data
                      setIsEditPositionOpen(false);
                    }}
                  >
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Branch Dialog */}
        <Dialog open={isEditBranchOpen} onOpenChange={setIsEditBranchOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-right">
                تعديل الفرع: {editingBranch?.name}
              </DialogTitle>
            </DialogHeader>
            {editingBranch && (
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch-name">اسم الفرع</Label>
                    <Input
                      id="branch-name"
                      defaultValue={editingBranch.name}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-location">الموقع</Label>
                    <Input
                      id="branch-location"
                      defaultValue={editingBranch.location}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch-manager">المدير</Label>
                    <Input
                      id="branch-manager"
                      defaultValue={editingBranch.manager}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-area">المساحة</Label>
                    <Input
                      id="branch-area"
                      defaultValue={editingBranch.area}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch-phone">الهاتف</Label>
                    <Input
                      id="branch-phone"
                      defaultValue={editingBranch.phone}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-email">البريد الإلكتروني</Label>
                    <Input
                      id="branch-email"
                      defaultValue={editingBranch.email}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-hours">ساعات العمل</Label>
                  <Input
                    id="branch-hours"
                    defaultValue={editingBranch.workingHours}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-address">العنوان الكامل</Label>
                  <Textarea
                    id="branch-address"
                    defaultValue={editingBranch.address}
                    className="text-right"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditBranchOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={() => {
                      // Here you would update the branch data
                      setIsEditBranchOpen(false);
                    }}
                  >
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Print Dialog */}
        <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
          <DialogContent className="sm:max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="no-print">
              <DialogTitle className="text-right">
                طباعة{" "}
                {printType === "departments"
                  ? "الأقسام"
                  : printType === "positions"
                    ? "المناصب"
                    : printType === "branches"
                      ? "الفروع"
                      : "المخطط التنظيمي"}
              </DialogTitle>
            </DialogHeader>
            <div className="print-content">
              <PrintWrapper
                title={`تقرير ${printType === "departments" ? "الأقسام" : printType === "positions" ? "المناصب" : printType === "branches" ? "الفروع" : "المخطط التنظيمي"}`}
              >
                {printType === "departments" && (
                  <div className="space-y-4 w-full">
                    <h2 className="text-xl font-bold text-center mb-6 print-only">
                      تقرير الأقسام
                    </h2>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              اسم القسم
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              المدير
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              عدد الموظفين
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              القسم الأعلى
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              الموقع
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDepartments.map((department) => (
                            <tr key={department.id}>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {department.name}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {department.manager}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {department.employeesCount}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {department.parentDepartment}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {department.location}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {printType === "positions" && (
                  <div className="space-y-4 w-full">
                    <h2 className="text-xl font-bold text-center mb-6 print-only">
                      تقرير المناصب
                    </h2>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              المنصب
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              القسم
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              المستوى
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              يتبع لـ
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              الشواغر
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPositions.map((position) => (
                            <tr key={position.id}>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {position.title}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {position.department}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {position.level}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {position.reportTo}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {position.vacancies}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {printType === "branches" && (
                  <div className="space-y-4 w-full">
                    <h2 className="text-xl font-bold text-center mb-6 print-only">
                      تقرير الفروع
                    </h2>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              اسم الفرع
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              الموقع
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              المدير
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              عدد الموظفين
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                              عدد الأقسام
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBranches.map((branch) => (
                            <tr key={branch.id}>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {branch.name}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {branch.location}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {branch.manager}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {branch.employeesCount}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-right">
                                {branch.departments}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {printType === "chart" && (
                  <div className="space-y-4 w-full">
                    <h2 className="text-xl font-bold text-center mb-6 print-only">
                      المخطط التنظيمي للمؤسسة
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-8 w-full">
                      {/* CEO Level */}
                      <div className="text-center mb-8">
                        <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                          <div className="font-bold">المدير التنفيذي</div>
                          <div className="text-sm opacity-90">محمد الأحمد</div>
                        </div>
                      </div>

                      {/* Department Managers Level */}
                      <div className="flex justify-center gap-8 mb-8 flex-wrap">
                        <div className="text-center">
                          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow mb-2">
                            <div className="font-semibold text-sm">
                              مدير الموارد البشرية
                            </div>
                            <div className="text-xs opacity-90">أحمد محمد</div>
                          </div>
                          <div className="w-px h-8 bg-gray-400 mx-auto"></div>
                        </div>

                        <div className="text-center">
                          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow mb-2">
                            <div className="font-semibold text-sm">
                              مدير تقنية المعلومات
                            </div>
                            <div className="text-xs opacity-90">محمد علي</div>
                          </div>
                          <div className="w-px h-8 bg-gray-400 mx-auto"></div>
                        </div>

                        <div className="text-center">
                          <div className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow mb-2">
                            <div className="font-semibold text-sm">
                              مدير المالية
                            </div>
                            <div className="text-xs opacity-90">سارة أحمد</div>
                          </div>
                          <div className="w-px h-8 bg-gray-400 mx-auto"></div>
                        </div>
                      </div>

                      {/* Sub-departments Level */}
                      <div className="flex justify-center gap-12 flex-wrap">
                        <div className="text-center">
                          <div className="bg-green-400 text-white px-3 py-2 rounded shadow text-xs">
                            <div className="font-semibold">قسم التوظيف</div>
                            <div className="opacity-90">فاطمة خالد</div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="bg-purple-400 text-white px-3 py-2 rounded shadow text-xs">
                            <div className="font-semibold">قسم التطوير</div>
                            <div className="opacity-90">خالد عبدالله</div>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-8 p-4 bg-white rounded border">
                        <h4 className="font-semibold mb-3 text-center">
                          دليل الألوان
                        </h4>
                        <div className="flex justify-center gap-6 text-sm flex-wrap">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-600 rounded"></div>
                            <span>الإدارة العليا</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-600 rounded"></div>
                            <span>الموارد البشرية</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-600 rounded"></div>
                            <span>تقنية المعلومات</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-600 rounded"></div>
                            <span>المالية</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </PrintWrapper>
            </div>
            <div className="flex justify-end gap-2 pt-4 no-print">
              <Button
                variant="outline"
                onClick={() => setIsPrintDialogOpen(false)}
              >
                إغلاق
              </Button>
              <Button
                onClick={() => {
                  // Add a small delay to ensure the dialog content is fully rendered
                  setTimeout(() => {
                    window.print();
                  }, 100);
                }}
              >
                <Printer className="mr-2 h-4 w-4" />
                طباعة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default OrganizationalStructure;
