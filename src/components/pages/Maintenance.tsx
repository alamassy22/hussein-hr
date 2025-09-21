import React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, PenTool as Tool, AlertTriangle, CheckCircle, Clock, Printer, Download } from "lucide-react";
import MaintenanceRequestForm from "@/components/maintenance/MaintenanceRequestForm";
import MaintenanceRequestView from "@/components/maintenance/MaintenanceRequestView";
import { useReactToPrint } from "react-to-print";
import "@/components/reports/print-styles.css";

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // Sample maintenance requests data
  const initialMaintenanceRequests = [
    {
      id: 1,
      title: "صيانة مكيف الهواء",
      location: "الطابق الثاني - قسم المحاسبة",
      requestedBy: "أحمد محمد",
      priority: "عالية",
      status: "قيد التنفيذ",
      requestDate: "2023-06-10",
      description: "مكيف الهواء لا يعمل بشكل صحيح ودرجة الحرارة مرتفعة جدًا",
      type: "تكييف",
    },
    {
      id: 2,
      title: "إصلاح تسرب المياه",
      location: "الطابق الأول - دورة المياه",
      requestedBy: "سارة أحمد",
      priority: "عالية",
      status: "مكتملة",
      requestDate: "2023-06-08",
      description: "هناك تسرب مياه من الصنبور في دورة المياه",
      type: "سباكة",
    },
    {
      id: 3,
      title: "إصلاح مصباح معطل",
      location: "الطابق الثالث - قاعة الاجتماعات",
      requestedBy: "محمد علي",
      priority: "منخفضة",
      status: "معلقة",
      requestDate: "2023-06-12",
      description: "المصباح الرئيسي في قاعة الاجتماعات لا يعمل",
      type: "كهرباء",
    },
    {
      id: 4,
      title: "صيانة باب المدخل",
      location: "المدخل الرئيسي",
      requestedBy: "فاطمة محمد",
      priority: "متوسطة",
      status: "قيد التنفيذ",
      requestDate: "2023-06-11",
      description: "باب المدخل الرئيسي لا يغلق بشكل صحيح",
      type: "نجارة",
    },
    {
      id: 5,
      title: "إصلاح جهاز العرض",
      location: "قاعة التدريب",
      requestedBy: "خالد أحمد",
      priority: "عالية",
      status: "مكتملة",
      requestDate: "2023-06-09",
      description: "جهاز العرض لا يعمل بشكل صحيح ويظهر الصورة بألوان غير صحيحة",
      type: "أجهزة إلكترونية",
    },
  ];

  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);

  // Load maintenance requests from localStorage on component mount
  React.useEffect(() => {
    const savedRequests = localStorage.getItem('hrms_maintenance_requests');
    if (savedRequests) {
      try {
        setMaintenanceRequests(JSON.parse(savedRequests));
      } catch (error) {
        console.error('Error loading maintenance requests:', error);
        setMaintenanceRequests(initialMaintenanceRequests);
      }
    } else {
      setMaintenanceRequests(initialMaintenanceRequests);
    }
  }, []);

  // Save maintenance requests to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_maintenance_requests', JSON.stringify(maintenanceRequests));
    } catch (error) {
      console.error('Error saving maintenance requests:', error);
    }
  }, [maintenanceRequests]);

  // Filter maintenance requests based on active tab and search query
  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "inProgress" && request.status === "قيد التنفيذ") ||
      (activeTab === "completed" && request.status === "مكتملة") ||
      (activeTab === "pending" && request.status === "معلقة");

    const matchesSearch =
      searchQuery === "" ||
      request.title.includes(searchQuery) ||
      request.location.includes(searchQuery) ||
      request.type.includes(searchQuery) ||
      request.requestedBy.includes(searchQuery);

    return matchesTab && matchesSearch;
  });

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "قيد التنفيذ":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "مكتملة":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "معلقة":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <AlertTriangle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Priority badge renderer
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

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setIsEditDialogOpen(true);
  };

  const handleSaveRequest = (data) => {
    // Here you would update the request in your database
    console.log("Saving request:", data);

    if (selectedRequest) {
      // Update existing request
      const updatedRequests = maintenanceRequests.map((request) =>
        request.id === selectedRequest.id ? data : request,
      );
      setMaintenanceRequests(updatedRequests);
    } else {
      // Add new request
      setMaintenanceRequests([...maintenanceRequests, data]);
    }

    setIsDialogOpen(false);
    setIsEditDialogOpen(false);
  };

  // Function to change request status
  const handleChangeStatus = (request, newStatus) => {
    const updatedRequest = {
      ...request,
      status: newStatus,
      ...(newStatus === "مكتملة" && {
        completionDate: new Date().toISOString().split("T")[0],
      }),
    };

    const updatedRequests = maintenanceRequests.map((req) =>
      req.id === request.id ? updatedRequest : req,
    );

    setMaintenanceRequests(updatedRequests);

    // If the selected request is being updated, update it as well
    if (selectedRequest && selectedRequest.id === request.id) {
      setSelectedRequest(updatedRequest);
    }
  };

  const handlePrintAll = () => {
    window.print();
  };

  const handlePrintRequest = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `طلب صيانة - ${selectedRequest?.title || "تفاصيل الطلب"}`,
    onBeforeGetContent: () => {
      // Make sure the print content is visible when printing
      if (printRef.current) {
        const element = printRef.current;
        element.style.display = "block";
      }
      return Promise.resolve();
    },
    onAfterPrint: () => {
      // Hide the print content after printing
      if (printRef.current) {
        const element = printRef.current;
        element.style.display = "none";
      }
    },
  });

  const handleExportAll = () => {
    // Here you would implement export functionality
    // For example, exporting to CSV or Excel
    console.log("Exporting all requests");
  };

  const renderActionButtons = (request) => (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleViewRequest(request)}
      >
        عرض
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleEditRequest(request)}
      >
        تعديل
      </Button>
      {request.status === "معلقة" && (
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600"
          onClick={() => handleChangeStatus(request, "قيد التنفيذ")}
        >
          بدء التنفيذ
        </Button>
      )}
      {request.status === "قيد التنفيذ" && (
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600"
          onClick={() => handleChangeStatus(request, "مكتملة")}
        >
          إكمال
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-background" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">التشغيل والصيانة</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrintAll}
            className="print:hidden"
          >
            <Printer className="mr-2 h-4 w-4" /> طباعة
          </Button>
          <Button
            variant="outline"
            onClick={handleExportAll}
            className="print:hidden"
          >
            <Download className="mr-2 h-4 w-4" /> تصدير
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setSelectedRequest(null);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> طلب صيانة جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <MaintenanceRequestForm
                onSubmit={handleSaveRequest}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>طلبات الصيانة</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث..."
                    className="pr-9 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
              value={activeTab}
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
                <TabsTrigger value="inProgress">قيد التنفيذ</TabsTrigger>
                <TabsTrigger value="completed">مكتملة</TabsTrigger>
                <TabsTrigger value="pending">معلقة</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">العنوان</TableHead>
                      <TableHead className="text-right">الموقع</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">مقدم الطلب</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">تاريخ الطلب</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.title}
                        </TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>
                          {renderPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(request.requestDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{renderActionButtons(request)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="inProgress" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">العنوان</TableHead>
                      <TableHead className="text-right">الموقع</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">مقدم الطلب</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">تاريخ الطلب</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.title}
                        </TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>
                          {renderPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(request.requestDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{renderActionButtons(request)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">العنوان</TableHead>
                      <TableHead className="text-right">الموقع</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">مقدم الطلب</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">تاريخ الطلب</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.title}
                        </TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>
                          {renderPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(request.requestDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{renderActionButtons(request)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">العنوان</TableHead>
                      <TableHead className="text-right">الموقع</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">مقدم الطلب</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">تاريخ الطلب</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.title}
                        </TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>
                          {renderPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(request.requestDate).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{renderActionButtons(request)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedRequest && (
            <>
              <MaintenanceRequestView
                request={selectedRequest}
                onClose={() => setIsViewDialogOpen(false)}
                onEdit={() => {
                  setIsViewDialogOpen(false);
                  handleEditRequest(selectedRequest);
                }}
              />
              <div style={{ display: "none" }}>
                <div
                  ref={printRef}
                  className="p-8 bg-white"
                  id="payroll-report-content"
                  dir="rtl"
                >
                  <div className="print-only-content">
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold">تفاصيل طلب الصيانة</h1>
                      <p className="text-gray-500">
                        تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
                      </p>
                    </div>

                    <div className="border-t border-b py-4 mb-6">
                      <h2 className="text-xl font-bold mb-2">
                        {selectedRequest.title}
                      </h2>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {renderStatusBadge(selectedRequest.status)}
                        </div>
                        <div>رقم الطلب: {selectedRequest.id}</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold mb-1">الوصف:</h3>
                        <p className="text-gray-700 border p-2 rounded">
                          {selectedRequest.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-1">الموقع:</h3>
                          <p className="text-gray-700">
                            {selectedRequest.location}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-1">النوع:</h3>
                          <p className="text-gray-700">
                            {selectedRequest.type}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-1">مقدم الطلب:</h3>
                          <p className="text-gray-700">
                            {selectedRequest.requestedBy}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-1">الأولوية:</h3>
                          <div>
                            {renderPriorityBadge(selectedRequest.priority)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-1">تاريخ الطلب:</h3>
                        <p className="text-gray-700">
                          {new Date(
                            selectedRequest.requestDate,
                          ).toLocaleDateString("ar-SA")}
                        </p>
                      </div>

                      {selectedRequest.completionDate && (
                        <div>
                          <h3 className="font-semibold mb-1">تاريخ الإكمال:</h3>
                          <p className="text-gray-700">
                            {new Date(
                              selectedRequest.completionDate,
                            ).toLocaleDateString("ar-SA")}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-gray-500 text-center text-sm">
                        نظام إدارة الموارد البشرية - قسم التشغيل والصيانة
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  إغلاق
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditRequest(selectedRequest);
                  }}
                >
                  تعديل
                </Button>
                <Button variant="outline" onClick={handlePrintRequest}>
                  <Printer className="mr-2 h-4 w-4" /> طباعة
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedRequest && (
            <MaintenanceRequestForm
              initialData={selectedRequest}
              isEditing={true}
              onSubmit={handleSaveRequest}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Maintenance;
