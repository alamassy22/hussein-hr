import React, { useState, useRef } from "react";
import MainLayout from "../layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveRequestForm from "../leaves/LeaveRequestForm";
import LeaveRequestsList from "../leaves/LeaveRequestsList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import AdvanceRequestForm from "../advances/AdvanceRequestForm";
import PrintWrapper from "@/components/ui/print-wrapper";

const Leaves = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // For advances tab
  const [activeAdvanceTab, setActiveAdvanceTab] = useState("list");
  const [isAddAdvanceDialogOpen, setIsAddAdvanceDialogOpen] = useState(false);
  const [isEditAdvanceDialogOpen, setIsEditAdvanceDialogOpen] = useState(false);
  const [isViewAdvanceDialogOpen, setIsViewAdvanceDialogOpen] = useState(false);
  const [selectedAdvanceRequest, setSelectedAdvanceRequest] =
    useState<any>(null);
  const printAdvanceRef = useRef<HTMLDivElement>(null);

  // Sample leave requests data
  const initialLeaveRequests = [
    {
      id: "1",
      employeeName: "أحمد محمد",
      leaveType: "annual",
      startDate: "2023-06-15",
      endDate: "2023-06-20",
      status: "موافق",
      submissionDate: "2023-06-01",
      reason: "إجازة سنوية",
    },
    {
      id: "2",
      employeeName: "سارة أحمد",
      leaveType: "sick",
      startDate: "2023-06-10",
      endDate: "2023-06-12",
      status: "قيد المراجعة",
      submissionDate: "2023-06-05",
      reason: "إجازة مرضية",
    },
  ];

  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);

  // Load leave requests from localStorage on component mount
  React.useEffect(() => {
    const savedRequests = localStorage.getItem('hrms_leave_requests');
    if (savedRequests) {
      try {
        setLeaveRequests(JSON.parse(savedRequests));
      } catch (error) {
        console.error('Error loading leave requests:', error);
        setLeaveRequests(initialLeaveRequests);
      }
    } else {
      setLeaveRequests(initialLeaveRequests);
    }
  }, []);

  // Save leave requests to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_leave_requests', JSON.stringify(leaveRequests));
    } catch (error) {
      console.error('Error saving leave requests:', error);
    }
  }, [leaveRequests]);

  const handleAddRequest = () => {
    setSelectedRequest(null);
    setIsAddDialogOpen(true);
  };

  const handleEditRequest = (request: any) => {
    setSelectedRequest(request);
    setIsEditDialogOpen(true);
  };

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  const handleSaveRequest = (requestData: any) => {
    if (selectedRequest) {
      // Update existing request
      const updatedRequests = leaveRequests.map((request) =>
        request.id === selectedRequest.id ? requestData : request,
      );
      setLeaveRequests(updatedRequests);
    } else {
      // Add new request
      setLeaveRequests([...leaveRequests, requestData]);
    }
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setActiveTab("list");
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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

  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [approvalData, setApprovalData] = useState({
    id: "",
    status: "موافق",
    reason: "",
  });

  return (
    <MainLayout title="إدارة الإجازات" subtitle="متابعة وإدارة طلبات الإجازات">
      <Tabs
        defaultValue="list"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="list">طلبات الإجازات</TabsTrigger>
            <TabsTrigger value="new">تقديم طلب إجازة</TabsTrigger>
          </TabsList>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddRequest}>طلب إجازة جديد</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <LeaveRequestForm
                onSubmit={handleSaveRequest}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>قائمة طلبات الإجازات</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الموظف</TableHead>
                    <TableHead>نوع الإجازة</TableHead>
                    <TableHead>تاريخ البداية</TableHead>
                    <TableHead>تاريخ النهاية</TableHead>
                    <TableHead>تاريخ التقديم</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.employeeName}</TableCell>
                      <TableCell>
                        {request.leaveType === "annual" && "سنوية"}
                        {request.leaveType === "sick" && "مرضية"}
                        {request.leaveType === "emergency" && "طارئة"}
                        {request.leaveType === "other" && "أخرى"}
                      </TableCell>
                      <TableCell>
                        {request.startDate
                          ? format(new Date(request.startDate), "dd/MM/yyyy", {
                              locale: ar,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {request.endDate
                          ? format(new Date(request.endDate), "dd/MM/yyyy", {
                              locale: ar,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {request.submissionDate
                          ? format(
                              new Date(request.submissionDate),
                              "dd/MM/yyyy",
                              { locale: ar },
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>{renderStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRequest(request)}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRequest(request)}
                          >
                            عرض
                          </Button>
                          {request.status === "قيد المراجعة" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary"
                              onClick={() => {
                                setApprovalData({
                                  id: request.id,
                                  status: "موافق",
                                  reason: "",
                                });
                                setIsApproveDialogOpen(true);
                              }}
                            >
                              موافقة/رفض
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <LeaveRequestForm
            onSubmit={handleSaveRequest}
            onCancel={() => setActiveTab("list")}
          />
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedRequest && (
            <LeaveRequestForm
              initialData={selectedRequest}
              isEditing={true}
              onSubmit={handleSaveRequest}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedRequest && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle>تفاصيل طلب الإجازة</DialogTitle>
              </DialogHeader>
              <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
              </div>
              <div
                ref={printRef}
                className="p-4 bg-white"
                id="payroll-report-content"
              >
                <div className="print-only-content">
                  <h2 className="text-xl font-bold mb-4">تفاصيل طلب الإجازة</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {selectedRequest.employeeName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedRequest.leaveType === "annual" &&
                            "إجازة سنوية"}
                          {selectedRequest.leaveType === "sick" &&
                            "إجازة مرضية"}
                          {selectedRequest.leaveType === "emergency" &&
                            "إجازة طارئة"}
                          {selectedRequest.leaveType === "other" &&
                            "إجازة أخرى"}
                        </p>
                      </div>
                      <div>{renderStatusBadge(selectedRequest.status)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">تاريخ البداية</p>
                        <p>
                          {format(
                            new Date(selectedRequest.startDate),
                            "dd/MM/yyyy",
                            { locale: ar },
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">تاريخ النهاية</p>
                        <p>
                          {format(
                            new Date(selectedRequest.endDate),
                            "dd/MM/yyyy",
                            { locale: ar },
                          )}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">سبب الإجازة</p>
                      <p className="bg-gray-50 p-3 rounded mt-1">
                        {selectedRequest.reason}
                      </p>
                    </div>

                    {selectedRequest.notes && (
                      <div>
                        <p className="font-medium">ملاحظات إضافية</p>
                        <p className="bg-gray-50 p-3 rounded mt-1">
                          {selectedRequest.notes}
                        </p>
                      </div>
                    )}

                    {selectedRequest.status === "مرفوض" &&
                      selectedRequest.rejectReason && (
                        <div>
                          <p className="font-medium">سبب الرفض</p>
                          <p className="bg-red-50 text-red-800 p-3 rounded mt-1">
                            {selectedRequest.rejectReason}
                          </p>
                        </div>
                      )}

                    <div>
                      <p className="font-medium">تاريخ تقديم الطلب</p>
                      <p>
                        {format(
                          new Date(selectedRequest.submissionDate),
                          "dd/MM/yyyy",
                          { locale: ar },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  إغلاق
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve/Reject Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>الموافقة أو رفض طلب الإجازة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>حالة الطلب</Label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="approve"
                    name="status"
                    className="ml-2"
                    checked={approvalData.status === "موافق"}
                    onChange={() =>
                      setApprovalData({ ...approvalData, status: "موافق" })
                    }
                  />
                  <Label htmlFor="approve" className="cursor-pointer">
                    موافقة
                  </Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="reject"
                    name="status"
                    className="ml-2"
                    checked={approvalData.status === "مرفوض"}
                    onChange={() =>
                      setApprovalData({ ...approvalData, status: "مرفوض" })
                    }
                  />
                  <Label htmlFor="reject" className="cursor-pointer">
                    رفض
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">
                سبب {approvalData.status === "موافق" ? "الموافقة" : "الرفض"}
              </Label>
              <Textarea
                id="reason"
                placeholder={`اكتب سبب ${approvalData.status === "موافق" ? "الموافقة" : "الرفض"} هنا`}
                value={approvalData.reason}
                onChange={(e) =>
                  setApprovalData({ ...approvalData, reason: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApproveDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                const updatedRequests = leaveRequests.map((req) =>
                  req.id === approvalData.id
                    ? {
                        ...req,
                        status: approvalData.status,
                        approvalReason: approvalData.reason,
                        approvalDate: new Date().toISOString().split("T")[0],
                      }
                    : req,
                );
                setLeaveRequests(updatedRequests);
                setIsApproveDialogOpen(false);
              }}
            >
              تأكيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Leaves;
