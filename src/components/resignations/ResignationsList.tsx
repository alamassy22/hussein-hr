import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Check, X, FileText, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResignationRequest {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  submissionDate: string;
  lastWorkingDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  rejectReason?: string;
}

const mockResignationRequests: ResignationRequest[] = [
  {
    id: "1",
    employeeName: "أحمد محمود",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee5",
    department: "تكنولوجيا المعلومات",
    submissionDate: "10/05/2023",
    lastWorkingDate: "10/06/2023",
    reason: "عرض عمل أفضل في شركة أخرى",
    status: "pending",
  },
  {
    id: "2",
    employeeName: "ليلى عبدالله",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee6",
    department: "المبيعات",
    submissionDate: "05/05/2023",
    lastWorkingDate: "05/06/2023",
    reason: "ظروف عائلية تتطلب الانتقال لمدينة أخرى",
    status: "pending",
  },
  {
    id: "3",
    employeeName: "عمر خالد",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee7",
    department: "المالية",
    submissionDate: "01/05/2023",
    lastWorkingDate: "01/06/2023",
    reason: "متابعة الدراسات العليا",
    status: "pending",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const statusText = {
  pending: "قيد الانتظار",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
};

interface ResignationsListProps {
  className?: string;
}

const ResignationsList = ({ className }: ResignationsListProps) => {
  const [selectedRequest, setSelectedRequest] =
    useState<ResignationRequest | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined,
  );
  const [requests, setRequests] = useState<ResignationRequest[]>(
    mockResignationRequests,
  );
  const printRef = useRef<HTMLDivElement>(null);

  const filteredRequests = requests.filter((request) => {
    if (filterStatus && request.status !== filterStatus) return false;
    return true;
  });

  const handleApprove = (request: ResignationRequest) => {
    // In a real app, you would call an API to update the request status
    console.log(`Approving resignation request ${request.id}`);
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === request.id ? { ...req, status: "approved" as const } : req,
      ),
    );
  };

  const handleReject = (request: ResignationRequest) => {
    setSelectedRequest(request);
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (!selectedRequest) return;
    // In a real app, you would call an API to update the request status with the reason
    console.log(
      `Rejecting resignation request ${selectedRequest.id} with reason: ${rejectReason}`,
    );
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, status: "rejected" as const, rejectReason }
          : req,
      ),
    );
    setRejectDialogOpen(false);
    setRejectReason("");
    setSelectedRequest(null);
  };

  const viewDetails = (request: ResignationRequest) => {
    setSelectedRequest(request);
    setDetailsDialogOpen(true);
  };

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `
      <html dir="rtl">
        <head>
          <title>طباعة طلب الاستقالة</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-header h1 { margin-bottom: 5px; }
            .print-section { margin-bottom: 15px; }
            .print-section h2 { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; }
            table, th, td { border: 1px solid #ddd; }
            th, td { padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${printContents}
          </div>
        </body>
      </html>
    `;

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      <Card className={`border shadow-sm bg-white ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            طلبات الاستقالة
          </CardTitle>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>الكل</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="approved">تمت الموافقة</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                لا توجد طلبات استقالة مطابقة للفلتر
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-3 border rounded-lg flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={request.employeeAvatar}
                          alt={request.employeeName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{request.employeeName}</h4>
                        <p className="text-xs text-gray-500">
                          {request.department}
                        </p>
                      </div>
                    </div>
                    <Badge className={statusColors[request.status]}>
                      {statusText[request.status]}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-500" />
                    <span>
                      تاريخ التقديم: {request.submissionDate} | آخر يوم عمل:{" "}
                      {request.lastWorkingDate}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>سبب الاستقالة:</strong>{" "}
                    {request.reason.length > 100
                      ? `${request.reason.substring(0, 100)}...`
                      : request.reason}
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => viewDetails(request)}
                    >
                      <FileText size={14} />
                      <span>التفاصيل</span>
                    </Button>
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleReject(request)}
                        >
                          <X size={14} />
                          <span>رفض</span>
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(request)}
                        >
                          <Check size={14} />
                          <span>موافقة</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفض طلب الاستقالة</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">الرجاء توضيح سبب رفض طلب الاستقالة:</p>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="سبب الرفض"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              تأكيد الرفض
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب الاستقالة</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="py-4 space-y-4">
              <div ref={printRef}>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={selectedRequest.employeeAvatar}
                      alt={selectedRequest.employeeName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedRequest.employeeName}
                    </h3>
                    <p className="text-gray-500">
                      {selectedRequest.department}
                    </p>
                  </div>
                  <Badge
                    className={`ml-auto ${statusColors[selectedRequest.status]}`}
                  >
                    {statusText[selectedRequest.status]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div>
                    <p className="font-medium">تاريخ تقديم الطلب</p>
                    <p>{selectedRequest.submissionDate}</p>
                  </div>
                  <div>
                    <p className="font-medium">آخر يوم عمل</p>
                    <p>{selectedRequest.lastWorkingDate}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-medium">سبب الاستقالة</p>
                  <p className="bg-gray-50 p-3 rounded mt-1">
                    {selectedRequest.reason}
                  </p>
                </div>

                {selectedRequest.status === "rejected" &&
                  selectedRequest.rejectReason && (
                    <div className="mt-4">
                      <p className="font-medium">سبب الرفض</p>
                      <p className="bg-red-50 text-red-800 p-3 rounded mt-1">
                        {selectedRequest.rejectReason}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="gap-1" onClick={handlePrint}>
              <Printer size={14} />
              <span>طباعة</span>
            </Button>
            <Button onClick={() => setDetailsDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResignationsList;
