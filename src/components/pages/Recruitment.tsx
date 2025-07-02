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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter, Printer, Eye, PenSquare } from "lucide-react";

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample job postings data
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "مدير موارد بشرية",
      department: "الموارد البشرية",
      location: "الرياض",
      type: "دوام كامل",
      status: "مفتوح",
      postedDate: "2023-06-01",
      applicantsCount: 12,
    },
    {
      id: 2,
      title: "محاسب",
      department: "المالية",
      location: "جدة",
      type: "دوام كامل",
      status: "مفتوح",
      postedDate: "2023-06-05",
      applicantsCount: 8,
    },
    {
      id: 3,
      title: "مطور برمجيات",
      department: "تقنية المعلومات",
      location: "الرياض",
      type: "دوام كامل",
      status: "مغلق",
      postedDate: "2023-05-15",
      applicantsCount: 25,
    },
    {
      id: 4,
      title: "مساعد إداري",
      department: "الإدارة",
      location: "الدمام",
      type: "دوام جزئي",
      status: "مفتوح",
      postedDate: "2023-06-10",
      applicantsCount: 5,
    },
  ]);

  // Sample applicants data
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      position: "مدير موارد بشرية",
      email: "ahmed@example.com",
      phone: "0501234567",
      status: "قيد المراجعة",
      appliedDate: "2023-06-05",
    },
    {
      id: 2,
      name: "سارة أحمد",
      position: "محاسب",
      email: "sara@example.com",
      phone: "0567891234",
      status: "تمت المقابلة",
      appliedDate: "2023-06-07",
    },
    {
      id: 3,
      name: "محمد علي",
      position: "مطور برمجيات",
      email: "mohammed@example.com",
      phone: "0512345678",
      status: "مرفوض",
      appliedDate: "2023-05-20",
    },
    {
      id: 4,
      name: "فاطمة خالد",
      position: "مساعد إداري",
      email: "fatima@example.com",
      phone: "0523456789",
      status: "مقبول",
      appliedDate: "2023-06-12",
    },
  ]);

  // Filter job postings based on search term
  const filteredJobs = jobPostings.filter(
    (job) =>
      job.title.includes(searchTerm) ||
      job.department.includes(searchTerm) ||
      job.location.includes(searchTerm),
  );

  // Filter applicants based on search term
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.includes(searchTerm) ||
      applicant.position.includes(searchTerm) ||
      applicant.email.includes(searchTerm) ||
      applicant.status.includes(searchTerm),
  );

  // Render status badge for job postings
  const renderJobStatusBadge = (status) => {
    switch (status) {
      case "مفتوح":
        return <Badge className="bg-green-500">مفتوح</Badge>;
      case "مغلق":
        return <Badge className="bg-red-500">مغلق</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Render status badge for applicants
  const renderApplicantStatusBadge = (status) => {
    switch (status) {
      case "قيد المراجعة":
        return <Badge className="bg-yellow-500">قيد المراجعة</Badge>;
      case "تمت المقابلة":
        return <Badge className="bg-blue-500">تمت المقابلة</Badge>;
      case "مقبول":
        return <Badge className="bg-green-500">مقبول</Badge>;
      case "مرفوض":
        return <Badge className="bg-red-500">مرفوض</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle adding a new job
  const handleAddJob = () => {
    // Implementation would go here
    setIsAddDialogOpen(false);
  };

  // Handle adding a new applicant
  const handleAddApplicant = () => {
    // Implementation would go here
    setIsAddDialogOpen(false);
  };

  // Handle editing a job
  const handleEditJob = () => {
    // Implementation would go here
    setIsEditDialogOpen(false);
  };

  // Handle editing an applicant
  const handleEditApplicant = () => {
    // Implementation would go here
    setIsEditDialogOpen(false);
  };

  // Handle printing
  const handlePrint = () => {
    // Implementation would go here
    setIsPrintDialogOpen(false);
  };

  return (
    <MainLayout title="التوظيف" subtitle="إدارة عمليات التوظيف والمرشحين">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Tabs
                defaultValue="jobs"
                className="w-full"
                onValueChange={setActiveTab}
                value={activeTab}
              >
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="jobs">الوظائف الشاغرة</TabsTrigger>
                    <TabsTrigger value="applicants">المتقدمين</TabsTrigger>
                    <TabsTrigger value="interviews">المقابلات</TabsTrigger>
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
                      size="icon"
                      onClick={() => setIsPrintDialogOpen(true)}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          {activeTab === "jobs"
                            ? "إضافة وظيفة"
                            : activeTab === "applicants"
                              ? "إضافة متقدم"
                              : "جدولة مقابلة"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>
                            {activeTab === "jobs"
                              ? "إضافة وظيفة جديدة"
                              : activeTab === "applicants"
                                ? "إضافة متقدم جديد"
                                : "جدولة مقابلة جديدة"}
                          </DialogTitle>
                        </DialogHeader>
                        {activeTab === "jobs" ? (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="title" className="text-right">
                                عنوان الوظيفة
                              </Label>
                              <Input id="title" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="department"
                                className="text-right"
                              >
                                القسم
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="اختر القسم" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hr">
                                    الموارد البشرية
                                  </SelectItem>
                                  <SelectItem value="it">
                                    تقنية المعلومات
                                  </SelectItem>
                                  <SelectItem value="finance">
                                    المالية
                                  </SelectItem>
                                  <SelectItem value="admin">الإدارة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="location" className="text-right">
                                الموقع
                              </Label>
                              <Input id="location" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="type" className="text-right">
                                نوع الدوام
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="اختر نوع الدوام" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full">
                                    دوام كامل
                                  </SelectItem>
                                  <SelectItem value="part">
                                    دوام جزئي
                                  </SelectItem>
                                  <SelectItem value="remote">عن بعد</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="description"
                                className="text-right"
                              >
                                الوصف الوظيفي
                              </Label>
                              <Textarea
                                id="description"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        ) : activeTab === "applicants" ? (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                الاسم
                              </Label>
                              <Input id="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="position" className="text-right">
                                الوظيفة
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="اختر الوظيفة" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hr-manager">
                                    مدير موارد بشرية
                                  </SelectItem>
                                  <SelectItem value="accountant">
                                    محاسب
                                  </SelectItem>
                                  <SelectItem value="developer">
                                    مطور برمجيات
                                  </SelectItem>
                                  <SelectItem value="admin-assistant">
                                    مساعد إداري
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                البريد الإلكتروني
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">
                                رقم الهاتف
                              </Label>
                              <Input id="phone" className="col-span-3" />
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="applicant" className="text-right">
                                المتقدم
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="اختر المتقدم" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ahmed">
                                    أحمد محمد
                                  </SelectItem>
                                  <SelectItem value="sara">
                                    سارة أحمد
                                  </SelectItem>
                                  <SelectItem value="mohammed">
                                    محمد علي
                                  </SelectItem>
                                  <SelectItem value="fatima">
                                    فاطمة خالد
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="date" className="text-right">
                                تاريخ المقابلة
                              </Label>
                              <Input
                                id="date"
                                type="date"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="time" className="text-right">
                                وقت المقابلة
                              </Label>
                              <Input
                                id="time"
                                type="time"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="interviewer"
                                className="text-right"
                              >
                                المقابل
                              </Label>
                              <Input id="interviewer" className="col-span-3" />
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => {
                              if (activeTab === "jobs") {
                                handleAddJob();
                              } else if (activeTab === "applicants") {
                                handleAddApplicant();
                              } else {
                                setIsAddDialogOpen(false);
                              }
                            }}
                          >
                            حفظ
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <TabsContent value="jobs" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">
                          عنوان الوظيفة
                        </TableHead>
                        <TableHead className="text-right">القسم</TableHead>
                        <TableHead className="text-right">الموقع</TableHead>
                        <TableHead className="text-right">نوع الدوام</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">
                          تاريخ النشر
                        </TableHead>
                        <TableHead className="text-right">
                          عدد المتقدمين
                        </TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">
                            {job.title}
                          </TableCell>
                          <TableCell>{job.department}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.type}</TableCell>
                          <TableCell>
                            {renderJobStatusBadge(job.status)}
                          </TableCell>
                          <TableCell>
                            {new Date(job.postedDate).toLocaleDateString(
                              "ar-SA",
                            )}
                          </TableCell>
                          <TableCell>{job.applicantsCount}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedItem(job);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedItem(job);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <PenSquare className="h-4 w-4 ml-1" />
                                تعديل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="applicants" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">الاسم</TableHead>
                        <TableHead className="text-right">الوظيفة</TableHead>
                        <TableHead className="text-right">
                          البريد الإلكتروني
                        </TableHead>
                        <TableHead className="text-right">رقم الهاتف</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">
                          تاريخ التقديم
                        </TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell className="font-medium">
                            {applicant.name}
                          </TableCell>
                          <TableCell>{applicant.position}</TableCell>
                          <TableCell>{applicant.email}</TableCell>
                          <TableCell>{applicant.phone}</TableCell>
                          <TableCell>
                            {renderApplicantStatusBadge(applicant.status)}
                          </TableCell>
                          <TableCell>
                            {new Date(applicant.appliedDate).toLocaleDateString(
                              "ar-SA",
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedItem(applicant);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedItem(applicant);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <PenSquare className="h-4 w-4 ml-1" />
                                تعديل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="interviews" className="mt-6">
                  <div className="p-4 text-center text-gray-500">
                    لا توجد مقابلات مجدولة حاليًا
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "jobs" ? "تفاصيل الوظيفة" : "تفاصيل المتقدم"}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              {activeTab === "jobs" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">
                      عنوان الوظيفة:
                    </div>
                    <div className="col-span-3">{selectedItem.title}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">القسم:</div>
                    <div className="col-span-3">{selectedItem.department}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">الموقع:</div>
                    <div className="col-span-3">{selectedItem.location}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">نوع الدوام:</div>
                    <div className="col-span-3">{selectedItem.type}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">الحالة:</div>
                    <div className="col-span-3">
                      {renderJobStatusBadge(selectedItem.status)}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">تاريخ النشر:</div>
                    <div className="col-span-3">
                      {new Date(selectedItem.postedDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">
                      عدد المتقدمين:
                    </div>
                    <div className="col-span-3">
                      {selectedItem.applicantsCount}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">الاسم:</div>
                    <div className="col-span-3">{selectedItem.name}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">الوظيفة:</div>
                    <div className="col-span-3">{selectedItem.position}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">
                      البريد الإلكتروني:
                    </div>
                    <div className="col-span-3">{selectedItem.email}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">رقم الهاتف:</div>
                    <div className="col-span-3">{selectedItem.phone}</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">الحالة:</div>
                    <div className="col-span-3">
                      {renderApplicantStatusBadge(selectedItem.status)}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-semibold text-right">
                      تاريخ التقديم:
                    </div>
                    <div className="col-span-3">
                      {new Date(selectedItem.appliedDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>إغلاق</Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                setIsEditDialogOpen(true);
              }}
            >
              <PenSquare className="h-4 w-4 ml-1" />
              تعديل
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsPrintDialogOpen(true)}
            >
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "jobs" ? "تعديل الوظيفة" : "تعديل بيانات المتقدم"}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              {activeTab === "jobs" ? (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-title" className="text-right">
                      عنوان الوظيفة
                    </Label>
                    <Input
                      id="edit-title"
                      className="col-span-3"
                      defaultValue={selectedItem.title}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-department" className="text-right">
                      القسم
                    </Label>
                    <Select defaultValue={selectedItem.department}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={selectedItem.department} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الموارد البشرية">
                          الموارد البشرية
                        </SelectItem>
                        <SelectItem value="المالية">المالية</SelectItem>
                        <SelectItem value="تقنية المعلومات">
                          تقنية المعلومات
                        </SelectItem>
                        <SelectItem value="الإدارة">الإدارة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-location" className="text-right">
                      الموقع
                    </Label>
                    <Input
                      id="edit-location"
                      className="col-span-3"
                      defaultValue={selectedItem.location}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-type" className="text-right">
                      نوع الدوام
                    </Label>
                    <Select defaultValue={selectedItem.type}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={selectedItem.type} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="دوام كامل">دوام كامل</SelectItem>
                        <SelectItem value="دوام جزئي">دوام جزئي</SelectItem>
                        <SelectItem value="عن بعد">عن بعد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right">
                      الحالة
                    </Label>
                    <Select defaultValue={selectedItem.status}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={selectedItem.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مفتوح">مفتوح</SelectItem>
                        <SelectItem value="مغلق">مغلق</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      الاسم
                    </Label>
                    <Input
                      id="edit-name"
                      className="col-span-3"
                      defaultValue={selectedItem.name}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-position" className="text-right">
                      الوظيفة
                    </Label>
                    <Input
                      id="edit-position"
                      className="col-span-3"
                      defaultValue={selectedItem.position}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      className="col-span-3"
                      defaultValue={selectedItem.email}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-phone" className="text-right">
                      رقم الهاتف
                    </Label>
                    <Input
                      id="edit-phone"
                      className="col-span-3"
                      defaultValue={selectedItem.phone}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right">
                      الحالة
                    </Label>
                    <Select defaultValue={selectedItem.status}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={selectedItem.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="قيد المراجعة">
                          قيد المراجعة
                        </SelectItem>
                        <SelectItem value="تمت المقابلة">
                          تمت المقابلة
                        </SelectItem>
                        <SelectItem value="مقبول">مقبول</SelectItem>
                        <SelectItem value="مرفوض">مرفوض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (activeTab === "jobs") {
                  handleEditJob();
                } else {
                  handleEditApplicant();
                }
              }}
            >
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Print Dialog */}
      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              طباعة {activeTab === "jobs" ? "الوظائف" : "المتقدمين"}
            </DialogTitle>
            <DialogDescription>اختر خيارات الطباعة المناسبة</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="print-all" className="ml-2">
                طباعة الكل
              </Label>
              <Input id="print-all" type="checkbox" className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="print-selected" className="ml-2">
                طباعة المحدد فقط
              </Label>
              <Input id="print-selected" type="checkbox" className="w-4 h-4" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="print-format" className="text-right">
                تنسيق الطباعة
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر التنسيق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPrintDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Recruitment;
