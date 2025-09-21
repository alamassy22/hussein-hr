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

const DriverAuthorizationsList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthorization, setSelectedAuthorization] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample driver authorizations data
  const driverAuthorizations = [
    {
      id: 1,
      driverName: "أحمد محمد",
      driverID: "1234567890",
      vehiclePlateNumber: "أ ب ج 1234",
      vehicleModel: "تويوتا كامري",
      startDate: "2023-07-15",
      endDate: "2023-07-20",
      purpose: "مهمة عمل في مدينة الرياض",
      department: "المبيعات",
      status: "معلق",
    },
    {
      id: 2,
      driverName: "محمد علي",
      driverID: "0987654321",
      vehiclePlateNumber: "د هـ و 5678",
      vehicleModel: "هيونداي سوناتا",
      startDate: "2023-07-18",
      endDate: "2023-07-25",
      purpose: "زيارة عملاء في المنطقة الشرقية",
      department: "المبيعات",
      status: "موافق",
    },
    {
      id: 3,
      driverName: "خالد أحمد",
      driverID: "5678901234",
      vehiclePlateNumber: "ز ح ط 9012",
      vehicleModel: "نيسان التيما",
      startDate: "2023-07-10",
      endDate: "2023-07-12",
      purpose: "نقل معدات بين الفروع",
      department: "الخدمات اللوجستية",
      status: "مكتمل",
    },
    {
      id: 4,
      driverName: "سعيد محمود",
      driverID: "3456789012",
      vehiclePlateNumber: "ي ك ل 3456",
      vehicleModel: "فورد إكسبلورر",
      startDate: "2023-07-16",
      endDate: "2023-07-18",
      purpose: "حضور اجتماع في فرع جدة",
      department: "الإدارة",
      status: "مرفوض",
    },
    {
      id: 5,
      driverName: "عمر خالد",
      driverID: "9012345678",
      vehiclePlateNumber: "م ن س 7890",
      vehicleModel: "كيا سبورتاج",
      startDate: "2023-07-20",
      endDate: "2023-07-22",
      purpose: "توصيل مستندات هامة",
      department: "الموارد البشرية",
      status: "معلق",
    },
  ];

  // Filter driver authorizations based on active tab and search term
  const filteredAuthorizations = driverAuthorizations.filter((auth) => {
    const matchesSearch =
      auth.driverName.includes(searchTerm) ||
      auth.vehiclePlateNumber.includes(searchTerm) ||
      auth.vehicleModel.includes(searchTerm) ||
      auth.purpose.includes(searchTerm);

    if (!matchesSearch) return false;

    if (activeTab === "all") return true;
    if (activeTab === "pending") return auth.status === "معلق";
    if (activeTab === "approved") return auth.status === "موافق";
    if (activeTab === "rejected") return auth.status === "مرفوض";
    if (activeTab === "completed") return auth.status === "مكتمل";
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

  const handleViewAuthorization = (auth) => {
    setSelectedAuthorization(auth);
    setIsDialogOpen(true);
  };

  const handleApproveAuthorization = () => {
    // Logic to approve authorization would go here
    setIsDialogOpen(false);
  };

  const handleRejectAuthorization = () => {
    // Logic to reject authorization would go here
    setIsDialogOpen(false);
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>تفويضات السائقين</CardTitle>
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
            <TabsTrigger value="all">جميع التفويضات</TabsTrigger>
            <TabsTrigger value="pending">معلق</TabsTrigger>
            <TabsTrigger value="approved">موافق</TabsTrigger>
            <TabsTrigger value="rejected">مرفوض</TabsTrigger>
            <TabsTrigger value="completed">مكتمل</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم السائق</TableHead>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">تاريخ البداية</TableHead>
                  <TableHead className="text-right">تاريخ النهاية</TableHead>
                  <TableHead className="text-right">الغرض</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthorizations.map((auth) => (
                  <TableRow key={auth.id}>
                    <TableCell className="font-medium">
                      {auth.driverName}
                    </TableCell>
                    <TableCell>{auth.vehiclePlateNumber}</TableCell>
                    <TableCell>{auth.vehicleModel}</TableCell>
                    <TableCell>
                      {new Date(auth.startDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      {new Date(auth.endDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={auth.purpose}
                    >
                      {auth.purpose}
                    </TableCell>
                    <TableCell>{renderStatusBadge(auth.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAuthorization(auth)}
                        >
                          عرض
                        </Button>
                        {auth.status === "معلق" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleViewAuthorization(auth)}
                            >
                              موافقة
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleViewAuthorization(auth)}
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
                  <TableHead className="text-right">اسم السائق</TableHead>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">تاريخ البداية</TableHead>
                  <TableHead className="text-right">تاريخ النهاية</TableHead>
                  <TableHead className="text-right">الغرض</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthorizations.map((auth) => (
                  <TableRow key={auth.id}>
                    <TableCell className="font-medium">
                      {auth.driverName}
                    </TableCell>
                    <TableCell>{auth.vehiclePlateNumber}</TableCell>
                    <TableCell>{auth.vehicleModel}</TableCell>
                    <TableCell>
                      {new Date(auth.startDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      {new Date(auth.endDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={auth.purpose}
                    >
                      {auth.purpose}
                    </TableCell>
                    <TableCell>{renderStatusBadge(auth.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAuthorization(auth)}
                        >
                          عرض
                        </Button>
                        {auth.status === "معلق" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleViewAuthorization(auth)}
                            >
                              موافقة
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleViewAuthorization(auth)}
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
                  <TableHead className="text-right">اسم السائق</TableHead>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">تاريخ البداية</TableHead>
                  <TableHead className="text-right">تاريخ النهاية</TableHead>
                  <TableHead className="text-right">الغرض</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthorizations.map((auth) => (
                  <TableRow key={auth.id}>
                    <TableCell className="font-medium">
                      {auth.driverName}
                    </TableCell>
                    <TableCell>{auth.vehiclePlateNumber}</TableCell>
                    <TableCell>{auth.vehicleModel}</TableCell>
                    <TableCell>
                      {new Date(auth.startDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      {new Date(auth.endDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={auth.purpose}
                    >
                      {auth.purpose}
                    </TableCell>
                    <TableCell>{renderStatusBadge(auth.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAuthorization(auth)}
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
                  <TableHead className="text-right">اسم السائق</TableHead>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">تاريخ البداية</TableHead>
                  <TableHead className="text-right">تاريخ النهاية</TableHead>
                  <TableHead className="text-right">الغرض</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthorizations.map((auth) => (
                  <TableRow key={auth.id}>
                    <TableCell className="font-medium">
                      {auth.driverName}
                    </TableCell>
                    <TableCell>{auth.vehiclePlateNumber}</TableCell>
                    <TableCell>{auth.vehicleModel}</TableCell>
                    <TableCell>
                      {new Date(auth.startDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      {new Date(auth.endDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={auth.purpose}
                    >
                      {auth.purpose}
                    </TableCell>
                    <TableCell>{renderStatusBadge(auth.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAuthorization(auth)}
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
                  <TableHead className="text-right">اسم السائق</TableHead>
                  <TableHead className="text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل</TableHead>
                  <TableHead className="text-right">تاريخ البداية</TableHead>
                  <TableHead className="text-right">تاريخ النهاية</TableHead>
                  <TableHead className="text-right">الغرض</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthorizations.map((auth) => (
                  <TableRow key={auth.id}>
                    <TableCell className="font-medium">
                      {auth.driverName}
                    </TableCell>
                    <TableCell>{auth.vehiclePlateNumber}</TableCell>
                    <TableCell>{auth.vehicleModel}</TableCell>
                    <TableCell>
                      {new Date(auth.startDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      {new Date(auth.endDate).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={auth.purpose}
                    >
                      {auth.purpose}
                    </TableCell>
                    <TableCell>{renderStatusBadge(auth.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAuthorization(auth)}
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

      {/* Dialog for viewing authorization details and approving/rejecting */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          {selectedAuthorization && (
            <>
              <DialogHeader>
                <DialogTitle>تفاصيل تفويض السائق</DialogTitle>
                <DialogDescription>
                  عرض تفاصيل تفويض السائق واتخاذ الإجراء المناسب
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    اسم السائق:
                  </span>
                  <span className="col-span-3">
                    {selectedAuthorization.driverName}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    رقم الهوية:
                  </span>
                  <span className="col-span-3">
                    {selectedAuthorization.driverID}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    رقم اللوحة:
                  </span>
                  <span className="col-span-3">
                    {selectedAuthorization.vehiclePlateNumber}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الموديل:
                  </span>
                  <span className="col-span-3">
                    {selectedAuthorization.vehicleModel}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    تاريخ البداية:
                  </span>
                  <span className="col-span-3">
                    {new Date(
                      selectedAuthorization.startDate,
                    ).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    تاريخ النهاية:
                  </span>
                  <span className="col-span-3">
                    {new Date(selectedAuthorization.endDate).toLocaleDateString(
                      "ar-SA",
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الغرض:
                  </span>
                  <span className="col-span-3">
                    {selectedAuthorization.purpose}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    القسم:
                  </span>
                  <span className="col-span-3">
                    {selectedAuthorization.department}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الحالة:
                  </span>
                  <span className="col-span-3">
                    {renderStatusBadge(selectedAuthorization.status)}
                  </span>
                </div>
              </div>
              <DialogFooter>
                {selectedAuthorization.status === "معلق" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      إغلاق
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleRejectAuthorization}
                    >
                      رفض
                    </Button>
                    <Button onClick={handleApproveAuthorization}>موافقة</Button>
                  </div>
                )}
                {selectedAuthorization.status !== "معلق" && (
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

export default DriverAuthorizationsList;
