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
  Plus,
  Printer,
  Eye,
  Edit,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VehicleForm from "../vehicles/VehicleForm";

const Vehicles = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Sample vehicles data as initial state
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plateNumber: "أ ب ج 1234",
      model: "تويوتا كامري",
      year: 2020,
      department: "المبيعات",
      status: "متاح",
      assignedTo: "",
      insuranceExpiry: "2023-12-15",
      licenseExpiry: "2023-11-20",
      condition: "ممتازة",
      color: "أبيض",
      fuelType: "بنزين",
    },
    {
      id: 2,
      plateNumber: "د هـ و 5678",
      model: "هيونداي سوناتا",
      year: 2021,
      department: "الإدارة",
      status: "قيد الاستخدام",
      assignedTo: "أحمد محمد",
      insuranceExpiry: "2023-10-05",
      licenseExpiry: "2023-09-15",
      condition: "جيدة",
      color: "أسود",
      fuelType: "بنزين",
    },
    {
      id: 3,
      plateNumber: "ز ح ط 9012",
      model: "نيسان التيما",
      year: 2019,
      department: "الموارد البشرية",
      status: "في الصيانة",
      assignedTo: "",
      insuranceExpiry: "2024-02-20",
      licenseExpiry: "2024-01-10",
      condition: "تحتاج صيانة",
      color: "رمادي",
      fuelType: "بنزين",
    },
    {
      id: 4,
      plateNumber: "ي ك ل 3456",
      model: "فورد إكسبلورر",
      year: 2022,
      department: "الخدمات اللوجستية",
      status: "متاح",
      assignedTo: "",
      insuranceExpiry: "2023-11-30",
      licenseExpiry: "2023-12-05",
      condition: "ممتازة",
      color: "أزرق",
      fuelType: "ديزل",
    },
    {
      id: 5,
      plateNumber: "م ن س 7890",
      model: "كيا سبورتاج",
      year: 2020,
      department: "المبيعات",
      status: "قيد الاستخدام",
      assignedTo: "محمد علي",
      insuranceExpiry: "2024-01-15",
      licenseExpiry: "2024-02-25",
      condition: "جيدة",
      color: "أحمر",
      fuelType: "بنزين",
    },
  ]);

  // Filter vehicles based on active tab and search term
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.plateNumber.includes(searchTerm) ||
      vehicle.model.includes(searchTerm) ||
      vehicle.department.includes(searchTerm) ||
      (vehicle.assignedTo && vehicle.assignedTo.includes(searchTerm));

    if (!matchesSearch) return false;

    if (activeTab === "all") return true;
    if (activeTab === "available") return vehicle.status === "متاح";
    if (activeTab === "inUse") return vehicle.status === "قيد الاستخدام";
    if (activeTab === "maintenance") return vehicle.status === "في الصيانة";
    return true;
  });

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "متاح":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "قيد الاستخدام":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "في الصيانة":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <AlertTriangle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Check if date is about to expire (within 30 days)
  const isDateExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // Check if date is expired
  const isDateExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  // Render expiry date with warning if needed
  const renderExpiryDate = (expiryDate) => {
    if (isDateExpired(expiryDate)) {
      return (
        <div className="flex items-center text-red-500">
          <AlertTriangle className="mr-1 h-4 w-4" />
          {new Date(expiryDate).toLocaleDateString("ar-SA")} (منتهية)
        </div>
      );
    } else if (isDateExpiringSoon(expiryDate)) {
      return (
        <div className="flex items-center text-yellow-500">
          <AlertTriangle className="mr-1 h-4 w-4" />
          {new Date(expiryDate).toLocaleDateString("ar-SA")} (تنتهي قريبًا)
        </div>
      );
    } else {
      return new Date(expiryDate).toLocaleDateString("ar-SA");
    }
  };

  // Render condition badge
  const renderConditionBadge = (condition) => {
    switch (condition) {
      case "ممتازة":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">{condition}</Badge>
        );
      case "جيدة":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">{condition}</Badge>
        );
      case "تحتاج صيانة":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            {condition}
          </Badge>
        );
      default:
        return <Badge>{condition}</Badge>;
    }
  };

  // Handle view vehicle details
  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsViewDialogOpen(true);
  };

  // Handle edit vehicle
  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  // Handle print vehicle details
  const handlePrintVehicle = (vehicle) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate the print content
    const printContent = `
      <html dir="rtl">
        <head>
          <title>بيانات السيارة - ${vehicle.plateNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            .info-row { margin-bottom: 10px; display: flex; }
            .info-label { font-weight: bold; width: 150px; }
            .info-value { flex: 1; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { text-align: center; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>بيانات السيارة</h1>
            <div class="logo">نظام إدارة الموارد البشرية</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">رقم اللوحة:</div>
            <div class="info-value">${vehicle.plateNumber}</div>
          </div>
          <div class="info-row">
            <div class="info-label">الموديل:</div>
            <div class="info-value">${vehicle.model}</div>
          </div>
          <div class="info-row">
            <div class="info-label">سنة الصنع:</div>
            <div class="info-value">${vehicle.year}</div>
          </div>
          <div class="info-row">
            <div class="info-label">اللون:</div>
            <div class="info-value">${vehicle.color || "-"}</div>
          </div>
          <div class="info-row">
            <div class="info-label">القسم:</div>
            <div class="info-value">${vehicle.department}</div>
          </div>
          <div class="info-row">
            <div class="info-label">الحالة:</div>
            <div class="info-value">${vehicle.status}</div>
          </div>
          <div class="info-row">
            <div class="info-label">الحالة الفنية:</div>
            <div class="info-value">${vehicle.condition || "-"}</div>
          </div>
          <div class="info-row">
            <div class="info-label">مستخدم السيارة:</div>
            <div class="info-value">${vehicle.assignedTo || "-"}</div>
          </div>
          <div class="info-row">
            <div class="info-label">نوع الوقود:</div>
            <div class="info-value">${vehicle.fuelType || "-"}</div>
          </div>
          <div class="info-row">
            <div class="info-label">تاريخ انتهاء التأمين:</div>
            <div class="info-value">${new Date(vehicle.insuranceExpiry).toLocaleDateString("ar-SA")}</div>
          </div>
          <div class="info-row">
            <div class="info-label">تاريخ انتهاء رخصة السير:</div>
            <div class="info-value">${vehicle.licenseExpiry ? new Date(vehicle.licenseExpiry).toLocaleDateString("ar-SA") : "-"}</div>
          </div>
          
          <div style="margin-top: 50px; text-align: center;">
            <p>تاريخ الطباعة: ${new Date().toLocaleDateString("ar-SA")}</p>
          </div>
        </body>
      </html>
    `;

    // Write to the new window and print
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  return (
    <div className="container mx-auto p-6 bg-background" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة السيارات</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> إضافة سيارة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة سيارة جديدة</DialogTitle>
              <DialogDescription>
                يرجى تعبئة البيانات التالية لإضافة سيارة جديدة
              </DialogDescription>
            </DialogHeader>
            <VehicleForm
              onSubmit={(data) => {
                // Add new vehicle with a new ID
                const newVehicle = {
                  ...data,
                  id:
                    vehicles.length > 0
                      ? Math.max(...vehicles.map((v) => v.id)) + 1
                      : 1,
                };
                setVehicles([...vehicles, newVehicle]);
                setIsDialogOpen(false);
              }}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>السيارات</CardTitle>
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
              value={activeTab}
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">جميع السيارات</TabsTrigger>
                <TabsTrigger value="available">متاحة</TabsTrigger>
                <TabsTrigger value="inUse">قيد الاستخدام</TabsTrigger>
                <TabsTrigger value="maintenance">في الصيانة</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم اللوحة</TableHead>
                      <TableHead className="text-right">الموديل</TableHead>
                      <TableHead className="text-right">سنة الصنع</TableHead>
                      <TableHead className="text-right">القسم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المستخدم</TableHead>
                      <TableHead className="text-right">
                        انتهاء التأمين
                      </TableHead>
                      <TableHead className="text-right">
                        انتهاء رخصة السير
                      </TableHead>
                      <TableHead className="text-right">
                        الحالة الفنية
                      </TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">
                          {vehicle.plateNumber}
                        </TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.department}</TableCell>
                        <TableCell>
                          {renderStatusBadge(vehicle.status)}
                        </TableCell>
                        <TableCell>{vehicle.assignedTo}</TableCell>
                        <TableCell>
                          {renderExpiryDate(vehicle.insuranceExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.licenseExpiry &&
                            renderExpiryDate(vehicle.licenseExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.condition &&
                            renderConditionBadge(vehicle.condition)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewVehicle(vehicle)}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditVehicle(vehicle)}
                            >
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrintVehicle(vehicle)}
                            >
                              <Printer className="h-4 w-4 ml-1" /> طباعة
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="available" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم اللوحة</TableHead>
                      <TableHead className="text-right">الموديل</TableHead>
                      <TableHead className="text-right">سنة الصنع</TableHead>
                      <TableHead className="text-right">القسم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المستخدم</TableHead>
                      <TableHead className="text-right">
                        انتهاء التأمين
                      </TableHead>
                      <TableHead className="text-right">
                        انتهاء رخصة السير
                      </TableHead>
                      <TableHead className="text-right">
                        الحالة الفنية
                      </TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">
                          {vehicle.plateNumber}
                        </TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.department}</TableCell>
                        <TableCell>
                          {renderStatusBadge(vehicle.status)}
                        </TableCell>
                        <TableCell>{vehicle.assignedTo}</TableCell>
                        <TableCell>
                          {renderExpiryDate(vehicle.insuranceExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.licenseExpiry &&
                            renderExpiryDate(vehicle.licenseExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.condition &&
                            renderConditionBadge(vehicle.condition)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewVehicle(vehicle)}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditVehicle(vehicle)}
                            >
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrintVehicle(vehicle)}
                            >
                              <Printer className="h-4 w-4 ml-1" /> طباعة
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="inUse" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم اللوحة</TableHead>
                      <TableHead className="text-right">الموديل</TableHead>
                      <TableHead className="text-right">سنة الصنع</TableHead>
                      <TableHead className="text-right">القسم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المستخدم</TableHead>
                      <TableHead className="text-right">
                        انتهاء التأمين
                      </TableHead>
                      <TableHead className="text-right">
                        انتهاء رخصة السير
                      </TableHead>
                      <TableHead className="text-right">
                        الحالة الفنية
                      </TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">
                          {vehicle.plateNumber}
                        </TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.department}</TableCell>
                        <TableCell>
                          {renderStatusBadge(vehicle.status)}
                        </TableCell>
                        <TableCell>{vehicle.assignedTo}</TableCell>
                        <TableCell>
                          {renderExpiryDate(vehicle.insuranceExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.licenseExpiry &&
                            renderExpiryDate(vehicle.licenseExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.condition &&
                            renderConditionBadge(vehicle.condition)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewVehicle(vehicle)}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditVehicle(vehicle)}
                            >
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrintVehicle(vehicle)}
                            >
                              <Printer className="h-4 w-4 ml-1" /> طباعة
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="maintenance" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم اللوحة</TableHead>
                      <TableHead className="text-right">الموديل</TableHead>
                      <TableHead className="text-right">سنة الصنع</TableHead>
                      <TableHead className="text-right">القسم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المستخدم</TableHead>
                      <TableHead className="text-right">
                        انتهاء التأمين
                      </TableHead>
                      <TableHead className="text-right">
                        انتهاء رخصة السير
                      </TableHead>
                      <TableHead className="text-right">
                        الحالة الفنية
                      </TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">
                          {vehicle.plateNumber}
                        </TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.department}</TableCell>
                        <TableCell>
                          {renderStatusBadge(vehicle.status)}
                        </TableCell>
                        <TableCell>{vehicle.assignedTo}</TableCell>
                        <TableCell>
                          {renderExpiryDate(vehicle.insuranceExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.licenseExpiry &&
                            renderExpiryDate(vehicle.licenseExpiry)}
                        </TableCell>
                        <TableCell>
                          {vehicle.condition &&
                            renderConditionBadge(vehicle.condition)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewVehicle(vehicle)}
                            >
                              <Eye className="h-4 w-4 ml-1" /> عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditVehicle(vehicle)}
                            >
                              <Edit className="h-4 w-4 ml-1" /> تعديل
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrintVehicle(vehicle)}
                            >
                              <Printer className="h-4 w-4 ml-1" /> طباعة
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
        </Card>
      </div>

      {/* View Vehicle Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedVehicle && (
            <>
              <DialogHeader>
                <DialogTitle>بيانات السيارة</DialogTitle>
                <DialogDescription>
                  عرض تفاصيل السيارة {selectedVehicle.plateNumber}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    رقم اللوحة:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.plateNumber}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الموديل:
                  </span>
                  <span className="col-span-3">{selectedVehicle.model}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    سنة الصنع:
                  </span>
                  <span className="col-span-3">{selectedVehicle.year}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    اللون:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.color || "-"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    القسم:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.department}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الحالة:
                  </span>
                  <span className="col-span-3">
                    {renderStatusBadge(selectedVehicle.status)}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    الحالة الفنية:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.condition
                      ? renderConditionBadge(selectedVehicle.condition)
                      : "-"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    مستخدم السيارة:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.assignedTo || "-"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    نوع الوقود:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.fuelType || "-"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    تاريخ انتهاء التأمين:
                  </span>
                  <span className="col-span-3">
                    {renderExpiryDate(selectedVehicle.insuranceExpiry)}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold text-right col-span-1">
                    تاريخ انتهاء رخصة السير:
                  </span>
                  <span className="col-span-3">
                    {selectedVehicle.licenseExpiry
                      ? renderExpiryDate(selectedVehicle.licenseExpiry)
                      : "-"}
                  </span>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  إغلاق
                </Button>
                <Button onClick={() => handlePrintVehicle(selectedVehicle)}>
                  <Printer className="ml-2 h-4 w-4" /> طباعة
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedVehicle && (
            <>
              <DialogHeader>
                <DialogTitle>تعديل بيانات السيارة</DialogTitle>
                <DialogDescription>
                  تعديل بيانات السيارة {selectedVehicle.plateNumber}
                </DialogDescription>
              </DialogHeader>
              <VehicleForm
                initialData={selectedVehicle}
                isEditing={true}
                onSubmit={(data) => {
                  // Update the vehicle data
                  const updatedVehicles = vehicles.map((vehicle) =>
                    vehicle.id === selectedVehicle.id
                      ? { ...data, id: vehicle.id }
                      : vehicle,
                  );
                  setVehicles(updatedVehicles);
                  setSelectedVehicle(null);
                  setIsEditDialogOpen(false);
                }}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vehicles;
