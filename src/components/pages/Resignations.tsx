import React, { useState, useRef } from "react";
import MainLayout from "../layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResignationForm from "../resignations/ResignationForm";
import ResignationsList from "../resignations/ResignationsList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { ScrollArea } from "@/components/ui/scroll-area";

const Resignations = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [approvalReason, setApprovalReason] = useState("");
  const [selectedResignation, setSelectedResignation] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const resignationRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>(
    {},
  );

  // Sample resignation data
  const initialResignations = [
    {
      id: "1",
      employeeName: "أحمد محمد",
      lastWorkingDate: "2023-07-30",
      noticePeriod: "30",
      reason: "فرصة عمل جديدة",
      status: "قيد المراجعة",
      submissionDate: "2023-06-30",
    },
    {
      id: "2",
      employeeName: "سارة أحمد",
      lastWorkingDate: "2023-08-15",
      noticePeriod: "45",
      reason: "ظروف شخصية",
      status: "موافق",
      submissionDate: "2023-06-25",
    },
    {
      id: "3",
      employeeName: "محمد علي",
      lastWorkingDate: "2023-09-01",
      noticePeriod: "30",
      reason: "فرصة دراسية",
      status: "قيد المراجعة",
      submissionDate: "2023-07-01",
    },
    {
      id: "4",
      employeeName: "فاطمة خالد",
      lastWorkingDate: "2023-08-30",
      noticePeriod: "60",
      reason: "ظروف عائلية",
      status: "مرفوض",
      submissionDate: "2023-06-20",
    },
    {
      id: "5",
      employeeName: "عبدالله محمد",
      lastWorkingDate: "2023-10-15",
      noticePeriod: "45",
      reason: "فرصة عمل خارج البلاد",
      status: "قيد المراجعة",
      submissionDate: "2023-07-15",
    },
    {
      id: "6",
      employeeName: "نورة سعيد",
      lastWorkingDate: "2023-09-15",
      noticePeriod: "30",
      reason: "ظروف صحية",
      status: "موافق",
      submissionDate: "2023-07-10",
    },
  ];

  const [resignations, setResignations] = useState<any[]>([]);

  // Load resignations from localStorage on component mount
  React.useEffect(() => {
    const savedResignations = localStorage.getItem('hrms_resignations');
    if (savedResignations) {
      try {
        setResignations(JSON.parse(savedResignations));
      } catch (error) {
        console.error('Error loading resignations:', error);
        setResignations(initialResignations);
      }
    } else {
      setResignations(initialResignations);
    }
  }, []);

  // Save resignations to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_resignations', JSON.stringify(resignations));
    } catch (error) {
      console.error('Error saving resignations:', error);
    }
  }, [resignations]);

  const handleAddResignation = () => {
    setSelectedResignation(null);
    setIsAddDialogOpen(true);
  };

  const handleEditResignation = (resignation: any) => {
    setSelectedResignation(resignation);
    setIsEditDialogOpen(true);
  };

  const handleViewResignation = (resignation: any) => {
    setSelectedResignation(resignation);
    setIsViewDialogOpen(true);
  };

  const handleApproveResignation = (resignation: any) => {
    setSelectedResignation(resignation);
    setIsApproveDialogOpen(true);
  };

  const handleRejectResignation = (resignation: any) => {
    setSelectedResignation(resignation);
    setIsRejectDialogOpen(true);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `استقالة - ${selectedResignation?.employeeName || "تفاصيل الاستقالة"}`,
  });

  const handleSaveResignation = (resignationData: any) => {
    if (selectedResignation) {
      // Update existing resignation
      const updatedResignations = resignations.map((resignation) =>
        resignation.id === selectedResignation.id
          ? resignationData
          : resignation,
      );
      setResignations(updatedResignations);
    } else {
      // Add new resignation
      setResignations([...resignations, resignationData]);
    }
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setActiveTab("list");
  };

  const handleApproveConfirm = () => {
    if (selectedResignation) {
      const updatedResignation = {
        ...selectedResignation,
        status: "موافق",
        approvalReason: approvalReason,
        approvalDate: new Date().toISOString().split("T")[0],
      };

      const updatedResignations = resignations.map((resignation) =>
        resignation.id === selectedResignation.id
          ? updatedResignation
          : resignation,
      );

      setResignations(updatedResignations);
      setIsApproveDialogOpen(false);
      setApprovalReason("");
    }
  };

  const handleRejectConfirm = () => {
    if (selectedResignation) {
      const updatedResignation = {
        ...selectedResignation,
        status: "مرفوض",
        approvalReason: approvalReason,
        approvalDate: new Date().toISOString().split("T")[0],
      };

      const updatedResignations = resignations.map((resignation) =>
        resignation.id === selectedResignation.id
          ? updatedResignation
          : resignation,
      );

      setResignations(updatedResignations);
      setIsRejectDialogOpen(false);
      setApprovalReason("");
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "موافق":
        return <Badge className="bg-green-500">موافق</Badge>;
      case "مرفوض":
        return <Badge className="bg-red-500">مرفوض</Badge>;
      case "قيد المراجعة":
        return <Badge className="bg-yellow-500">قيد المراجعة</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const scrollToResignation = (id: string) => {
    if (resignationRefs.current[id]) {
      resignationRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <MainLayout
      title="إدارة الاستقالات"
      subtitle="متابعة وإدارة طلبات الاستقالة"
    >
      <Tabs
        defaultValue="list"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="list">طلبات الاستقالة</TabsTrigger>
            <TabsTrigger value="new">تقديم طلب استقالة</TabsTrigger>
          </TabsList>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddResignation}>طلب استقالة جديد</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
              <ScrollArea className="max-h-[80vh] pr-4">
                <ResignationForm
                  onSubmit={handleSaveResignation}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>قائمة طلبات الاستقالة</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-350px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>تاريخ آخر يوم عمل</TableHead>
                      <TableHead>فترة الإشعار</TableHead>
                      <TableHead>تاريخ التقديم</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resignations.map((resignation) => (
                      <TableRow
                        key={resignation.id}
                        ref={(el) =>
                          (resignationRefs.current[resignation.id] = el)
                        }
                        className={
                          selectedResignation?.id === resignation.id
                            ? "bg-primary/5"
                            : ""
                        }
                      >
                        <TableCell>{resignation.employeeName}</TableCell>
                        <TableCell>
                          {resignation.lastWorkingDate
                            ? format(
                                new Date(resignation.lastWorkingDate),
                                "dd/MM/yyyy",
                                { locale: ar },
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>{resignation.noticePeriod} يوم</TableCell>
                        <TableCell>
                          {resignation.submissionDate
                            ? format(
                                new Date(resignation.submissionDate),
                                "dd/MM/yyyy",
                                { locale: ar },
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(resignation.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                handleViewResignation(resignation);
                                scrollToResignation(resignation.id);
                              }}
                            >
                              عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                handleEditResignation(resignation);
                                scrollToResignation(resignation.id);
                              }}
                            >
                              تعديل
                            </Button>
                            {resignation.status === "قيد المراجعة" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
                                  onClick={() => {
                                    handleApproveResignation(resignation);
                                    scrollToResignation(resignation.id);
                                  }}
                                >
                                  موافقة
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                                  onClick={() => {
                                    handleRejectResignation(resignation);
                                    scrollToResignation(resignation.id);
                                  }}
                                >
                                  رفض
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <ResignationForm
            onSubmit={handleSaveResignation}
            onCancel={() => setActiveTab("list")}
          />
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
          <ScrollArea className="max-h-[80vh] pr-4">
            {selectedResignation && (
              <ResignationForm
                initialData={selectedResignation}
                isEditing={true}
                onSubmit={handleSaveResignation}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب الاستقالة</DialogTitle>
          </DialogHeader>
          {selectedResignation && (
            <div>
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
              </div>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div
                  ref={printRef}
                  className="p-4 bg-white"
                  id="payroll-report-content"
                >
                  <div className="print-only-content">
                    <h2 className="text-xl font-bold mb-4">
                      تفاصيل طلب الاستقالة
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-semibold">اسم الموظف:</p>
                        <p>{selectedResignation.employeeName}</p>
                      </div>
                      <div>
                        <p className="font-semibold">تاريخ التقديم:</p>
                        <p>
                          {selectedResignation.submissionDate
                            ? format(
                                new Date(selectedResignation.submissionDate),
                                "dd/MM/yyyy",
                                { locale: ar },
                              )
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">تاريخ آخر يوم عمل:</p>
                        <p>
                          {selectedResignation.lastWorkingDate
                            ? format(
                                new Date(selectedResignation.lastWorkingDate),
                                "dd/MM/yyyy",
                                { locale: ar },
                              )
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">فترة الإشعار:</p>
                        <p>{selectedResignation.noticePeriod} يوم</p>
                      </div>
                      <div>
                        <p className="font-semibold">الحالة:</p>
                        <p>{renderStatusBadge(selectedResignation.status)}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold">سبب الاستقالة:</p>
                      <p className="p-2 bg-gray-50 rounded">
                        {selectedResignation.reason || "-"}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold">خطة تسليم المهام:</p>
                      <p className="p-2 bg-gray-50 rounded">
                        {selectedResignation.handover || "-"}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold">
                        معلومات الاتصال بعد الاستقالة:
                      </p>
                      <p className="p-2 bg-gray-50 rounded">
                        {selectedResignation.contactInfo || "-"}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold">ملاحظات إضافية:</p>
                      <p className="p-2 bg-gray-50 rounded">
                        {selectedResignation.additionalNotes || "-"}
                      </p>
                    </div>
                    {selectedResignation.status !== "قيد المراجعة" &&
                      selectedResignation.approvalReason && (
                        <div
                          className={`p-4 rounded-md ${selectedResignation.status === "موافق" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                        >
                          <h3 className="font-semibold mb-2">
                            {selectedResignation.status === "موافق"
                              ? "تمت الموافقة على الطلب"
                              : "تم رفض الطلب"}
                          </h3>
                          <p className="text-sm">
                            {selectedResignation.approvalReason}
                          </p>
                          <p className="text-xs mt-2 text-gray-500">
                            تاريخ{" "}
                            {selectedResignation.status === "موافق"
                              ? "الموافقة"
                              : "الرفض"}
                            :{" "}
                            {selectedResignation.approvalDate
                              ? format(
                                  new Date(selectedResignation.approvalDate),
                                  "dd/MM/yyyy",
                                  { locale: ar },
                                )
                              : ""}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter className="mt-6">
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  إغلاق
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <AlertDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>الموافقة على طلب الاستقالة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من الموافقة على طلب الاستقالة المقدم من{" "}
              {selectedResignation?.employeeName}؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="approvalReason">سبب الموافقة (سيظهر للموظف)</Label>
            <Textarea
              id="approvalReason"
              placeholder="اكتب سبب الموافقة هنا..."
              value={approvalReason}
              onChange={(e) => setApprovalReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setApprovalReason("")}>
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApproveConfirm}
              className="bg-green-600 hover:bg-green-700"
            >
              موافقة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>رفض طلب الاستقالة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من رفض طلب الاستقالة المقدم من{" "}
              {selectedResignation?.employeeName}؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="rejectionReason">سبب الرفض (سيظهر للموظف)</Label>
            <Textarea
              id="rejectionReason"
              placeholder="اكتب سبب الرفض هنا..."
              value={approvalReason}
              onChange={(e) => setApprovalReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setApprovalReason("")}>
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              رفض
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Resignations;
