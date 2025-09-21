import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const MaintenanceRequestsList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample maintenance requests data
  const maintenanceRequests = [
    {
      id: 1,
      vehiclePlateNumber: "أ ب ج 1234",
      vehicleModel: "تويوتا كامري",
      maintenanceType: "تغيير زيت",
      description: "تغيير زيت المحرك والفلتر",
      requestDate: "2023-07-15",
      scheduledDate: "2023-07-20",
      status: "معلق",
      requestedBy: "أحمد محمد",
      cost: "",
      notes: "",
    },
    {
      id: 2,
      vehiclePlateNumber: "د هـ و 5678",
      vehicleModel: "هيونداي سوناتا",
      maintenanceType: "صيانة دورية",
      description: "فحص شامل للسيارة وتغيير الزيت والفلاتر",
      requestDate: "2023-07-10",
      scheduledDate: "2023-07-18",
      status: "موافق",
      requestedBy: "محمد علي",
      cost: "500",
      notes: "تمت الموافقة على الصيانة الدورية",
    },
    {
      id: 3,
      vehiclePlateNumber: "ز ح ط 9012",
      vehicleModel: "نيسان التيما",
      maintenanceType: "إصلاح عطل",
      description: "إصلاح مشكلة في نظام التكييف",
      requestDate: "2023-07-05",
      scheduledDate: "2023-07-12",
      status: "مكتمل",
      requestedBy: "خالد أحمد",
      cost: "800",
      notes: "تم إصلاح المشكلة بنجاح",
    },
    {
      id: 4,
      vehiclePlateNumber: "ي ك ل 3456",
      vehicleModel: "فورد إكسبلورر",
      maintenanceType: "فحص فني",
      description: "فحص فني شامل للسيارة",
      requestDate: "2023-07-08",
      scheduledDate: "2023-07-16",
      status: "مرفوض",
      requestedBy: "سعيد محمود",
      cost: "",
      notes: "تم رفض الطلب لعدم وجود ضرورة للفحص حاليًا",
    },
    {
      id: 5,
      vehiclePlateNumber: "م ن س 7890",
      vehicleModel: "كيا سبورتاج",
      maintenanceType: "تغيير زيت",
      description: "تغيير زيت المحرك والفلتر",
      requestDate: "2023-07-12",
      scheduledDate: "2023-07-19",
      status: "معلق",
      requestedBy: "عمر خالد",
      cost: "",
      notes: "",
    },
  ];

  // Filter maintenance requests based on active tab and search term
  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesSearch =
      request.vehiclePlateNumber.includes(searchTerm) ||
      request.vehicleModel.includes(searchTerm) ||
      request.maintenanceType.includes(searchTerm) ||
      request.requestedBy.includes(searchTerm);

    if (!matchesSearch) return false;

    if (activeTab === "all") return true;
    if (activeTab === "pending") return request.status === "معلق";
    if (activeTab === "approved") return request.status === "موافق";
    if (activeTab === "rejected") return request.status === "مرفوض";
    if (activeTab === "completed") return request.status === "مكتمل";
    return true;
  });

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "معلق":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "موافق":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <ThumbsUp className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "مرفوض":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <ThumbsDown className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "مكتمل":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleApproveRequest = () => {
    // Logic to approve request would go here
    setIsDialogOpen(false);
  };

  const handleRejectRequest = () => {
    // Logic to reject request would go here
    setIsDialogOpen(false);
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>طلبات الصيانة</CardTitle>
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
            <TabsTrigger value="pending">معلق</TabsTrigger>
            <TabsTrigger value="approved">موافق</TabsTrigger>
            <TabsTrigger value="rejected">مرفوض</TabsTrigger>
            <TabsTrigger value="completed">مكتمل</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">نوع الصيانة</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">تاريخ الصيانة</TableHead>
                  <TableHead className="text-right">مقدم الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.vehiclePlateNumber}
                    </TableCell>
                    <TableCell>{request.vehicleModel}</TableCell>
                    <TableCell>{request.maintenanceType}</TableCell>
                    <TableCell>
                      {new Date(request.requestDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(request.scheduledDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{renderStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          عرض
                        </Button>
                        {request.status === "معلق" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleViewRequest(request)}
                            >
                              موافقة
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleViewRequest(request)}
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
          </TabsContent>

          {/* Duplicate the table for each tab with the same structure */}
          <TabsContent value="pending" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">نوع الصيانة</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">تاريخ الصيانة</TableHead>
                  <TableHead className="text-right">مقدم الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.vehiclePlateNumber}
                    </TableCell>
                    <TableCell>{request.vehicleModel}</TableCell>
                    <TableCell>{request.maintenanceType}</TableCell>
                    <TableCell>
                      {new Date(request.requestDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(request.scheduledDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{renderStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          عرض
                        </Button>
                        {request.status === "معلق" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleViewRequest(request)}
                            >
                              موافقة
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleViewRequest(request)}
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
          </TabsContent>

          {/* Similar tables for approved, rejected, and completed tabs */}
          <TabsContent value="approved" className="mt-0">
            <Table>
              {/* Same structure as above */}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">نوع الصيانة</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">تاريخ الصيانة</TableHead>
                  <TableHead className="text-right">مقدم الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.vehiclePlateNumber}
                    </TableCell>
                    <TableCell>{request.vehicleModel}</TableCell>
                    <TableCell>{request.maintenanceType}</TableCell>
                    <TableCell>
                      {new Date(request.requestDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(request.scheduledDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{renderStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          عرض
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="rejected" className="mt-0">
            <Table>
              {/* Same structure as above */}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">نوع الصيانة</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">تاريخ الصيانة</TableHead>
                  <TableHead className="text-right">مقدم الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.vehiclePlateNumber}
                    </TableCell>
                    <TableCell>{request.vehicleModel}</TableCell>
                    <TableCell>{request.maintenanceType}</TableCell>
                    <TableCell>
                      {new Date(request.requestDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(request.scheduledDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{renderStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          عرض
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <Table>
              {/* Same structure as above */}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">نوع الصيانة</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">تاريخ الصيانة</TableHead>
                  <TableHead className="text-right">مقدم الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.vehiclePlateNumber}
                    </TableCell>
                    <TableCell>{request.vehicleModel}</TableCell>
                    <TableCell>{request.maintenanceType}</TableCell>
                    <TableCell>
                      {new Date(request.requestDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(request.scheduledDate).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{renderStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          عرض
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Dialog for viewing request details and approving/rejecting */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>تفاصيل طلب الصيانة</DialogTitle>
                <DialogDescription>
                  عرض تفاصيل طلب الصيانة واتخاذ الإجراء المناسب
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    رقم اللوحة:
                  </span>
                  <span className="col-span-3">
                    {selectedRequest.vehiclePlateNumber}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الموديل:
                  </span>
                  <span className="col-span-3">
                    {selectedRequest.vehicleModel}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    نوع الصيانة:
                  </span>
                  <span className="col-span-3">
                    {selectedRequest.maintenanceType}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الوصف:
                  </span>
                  <span className="col-span-3">
                    {selectedRequest.description}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    تاريخ الطلب:
                  </span>
                  <span className="col-span-3">
                    {new Date(selectedRequest.requestDate).toLocaleDateString(
                      "ar-SA",
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    تاريخ الصيانة:
                  </span>
                  <span className="col-span-3">
                    {new Date(selectedRequest.scheduledDate).toLocaleDateString(
                      "ar-SA",
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    مقدم الطلب:
                  </span>
                  <span className="col-span-3">
                    {selectedRequest.requestedBy}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الحالة:
                  </span>
                  <span className="col-span-3">
                    {renderStatusBadge(selectedRequest.status)}
                  </span>
                </div>
                {selectedRequest.cost && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold text-right col-span-1">
                      التكلفة:
                    </span>
                    <span className="col-span-3">
                      {selectedRequest.cost} ريال
                    </span>
                  </div>
                )}
                {selectedRequest.notes && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold text-right col-span-1">
                      ملاحظات:
                    </span>
                    <span className="col-span-3">{selectedRequest.notes}</span>
                  </div>
                )}
              </div>
              <DialogFooter>
                {selectedRequest.status === "معلق" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      إغلاق
                    </Button>
                    <Button variant="destructive" onClick={handleRejectRequest}>
                      رفض
                    </Button>
                    <Button onClick={handleApproveRequest}>موافقة</Button>
                  </div>
                )}
                {selectedRequest.status !== "معلق" && (
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    إغلاق
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MaintenanceRequestsList;
