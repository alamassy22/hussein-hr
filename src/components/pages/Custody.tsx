import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  Printer,
  Download,
} from "lucide-react";

interface CustodyItem {
  id: string;
  itemName: string;
  itemCode: string;
  employeeName: string;
  employeeId: string;
  assignedDate: string;
  returnDate?: string;
  status: "assigned" | "returned" | "overdue";
  condition: "excellent" | "good" | "fair" | "poor";
  notes?: string;
}

const mockCustodyItems: CustodyItem[] = [
  {
    id: "1",
    itemName: "جهاز كمبيوتر محمول Dell",
    itemCode: "LAP-001",
    employeeName: "أحمد محمد علي",
    employeeId: "EMP-001",
    assignedDate: "2024-01-15",
    status: "assigned",
    condition: "excellent",
    notes: "جهاز جديد للعمل من المنزل",
  },
  {
    id: "2",
    itemName: "هاتف محمول iPhone",
    itemCode: "PHN-002",
    employeeName: "سارة أحمد محمود",
    employeeId: "EMP-002",
    assignedDate: "2024-01-10",
    returnDate: "2024-01-25",
    status: "returned",
    condition: "good",
  },
  {
    id: "3",
    itemName: "مفاتيح المكتب",
    itemCode: "KEY-003",
    employeeName: "محمد عبدالله حسن",
    employeeId: "EMP-003",
    assignedDate: "2023-12-01",
    status: "overdue",
    condition: "good",
    notes: "مطلوب إرجاع المفاتيح",
  },
];

function Custody() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<CustodyItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    employeeName: "",
    employeeId: "",
    condition: "excellent" as "excellent" | "good" | "fair" | "poor",
    notes: "",
  });

  const filteredItems = mockCustodyItems.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return <Badge className="bg-blue-100 text-blue-800">مُسلم</Badge>;
      case "returned":
        return <Badge className="bg-green-100 text-green-800">مُستلم</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">متأخر</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">ممتاز</Badge>;
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">جيد</Badge>;
      case "fair":
        return <Badge className="bg-yellow-100 text-yellow-800">مقبول</Badge>;
      case "poor":
        return <Badge className="bg-red-100 text-red-800">ضعيف</Badge>;
      default:
        return <Badge variant="secondary">{condition}</Badge>;
    }
  };

  const handleEdit = (item: CustodyItem) => {
    setSelectedItem(item);
    setFormData({
      itemName: item.itemName,
      itemCode: item.itemCode,
      employeeName: item.employeeName,
      employeeId: item.employeeId,
      condition: item.condition,
      notes: item.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleView = (item: CustodyItem) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (item: CustodyItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handlePrint = (item: CustodyItem) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>طباعة عهدة - ${item.itemName}</title>
            <style>
              body { font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 40px; }
              .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .content { line-height: 1.8; font-size: 16px; }
              .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; }
              .signature-section { display: flex; justify-content: space-between; margin-top: 60px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>سند عهدة</h1>
              <p>التاريخ: ${item.assignedDate}</p>
            </div>
            <div class="content">
              <h2>بيانات العهدة</h2>
              <p><strong>اسم الصنف:</strong> ${item.itemName}</p>
              <p><strong>كود الصنف:</strong> ${item.itemCode}</p>
              <p><strong>اسم الموظف:</strong> ${item.employeeName}</p>
              <p><strong>رقم الموظف:</strong> ${item.employeeId}</p>
              <p><strong>تاريخ التسليم:</strong> ${item.assignedDate}</p>
              <p><strong>حالة الصنف:</strong> ${item.condition === "excellent" ? "ممتاز" : item.condition === "good" ? "جيد" : item.condition === "fair" ? "مقبول" : "ضعيف"}</p>
              ${item.notes ? `<p><strong>ملاحظات:</strong> ${item.notes}</p>` : ""}
              ${item.returnDate ? `<p><strong>تاريخ الاستلام:</strong> ${item.returnDate}</p>` : ""}
            </div>
            <div class="signature-section">
              <div>
                <p>توقيع المسلم</p>
                <p>___________________</p>
              </div>
              <div>
                <p>توقيع المستلم</p>
                <p>___________________</p>
              </div>
            </div>
            <div class="footer">
              <p style="text-align: center;">هذا السند يعتبر إقرار بتسلم العهدة المذكورة أعلاه</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving:", formData);
    setIsEditDialogOpen(false);
    setIsAddDialogOpen(false);
    setFormData({
      itemName: "",
      itemCode: "",
      employeeName: "",
      employeeId: "",
      condition: "excellent",
      notes: "",
    });
  };

  const confirmDelete = () => {
    // Here you would typically delete from your backend
    console.log("Deleting:", selectedItem);
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">إدارة العهد</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة عهدة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة عهدة جديدة</DialogTitle>
                  <DialogDescription>
                    قم بملء البيانات المطلوبة لإنشاء عهدة جديدة
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">اسم الصنف</label>
                    <Input
                      value={formData.itemName}
                      onChange={(e) =>
                        setFormData({ ...formData, itemName: e.target.value })
                      }
                      className="col-span-3"
                      placeholder="اسم الصنف"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">كود الصنف</label>
                    <Input
                      value={formData.itemCode}
                      onChange={(e) =>
                        setFormData({ ...formData, itemCode: e.target.value })
                      }
                      className="col-span-3"
                      placeholder="كود الصنف"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">اسم الموظف</label>
                    <Input
                      value={formData.employeeName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employeeName: e.target.value,
                        })
                      }
                      className="col-span-3"
                      placeholder="اسم الموظف"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">رقم الموظف</label>
                    <Input
                      value={formData.employeeId}
                      onChange={(e) =>
                        setFormData({ ...formData, employeeId: e.target.value })
                      }
                      className="col-span-3"
                      placeholder="رقم الموظف"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">حالة الصنف</label>
                    <Select
                      value={formData.condition}
                      onValueChange={(
                        value: "excellent" | "good" | "fair" | "poor",
                      ) => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">ممتاز</SelectItem>
                        <SelectItem value="good">جيد</SelectItem>
                        <SelectItem value="fair">مقبول</SelectItem>
                        <SelectItem value="poor">ضعيف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label className="text-right font-medium pt-2">
                      ملاحظات
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="col-span-3 min-h-[80px] p-2 border rounded-md"
                      placeholder="ملاحظات إضافية"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    حفظ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  قائمة العهد
                </CardTitle>
                <div className="flex gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في العهد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="assigned">مُسلم</option>
                    <option value="returned">مُستلم</option>
                    <option value="overdue">متأخر</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد عهد مطابقة للبحث
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <Shield className="h-8 w-8 text-blue-500" />
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {item.itemName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                الكود: {item.itemCode}
                              </p>
                              <p className="text-sm text-gray-600">
                                الموظف: {item.employeeName} ({item.employeeId})
                              </p>
                              <p className="text-sm text-gray-500">
                                تاريخ التسليم: {item.assignedDate}
                              </p>
                              {item.returnDate && (
                                <p className="text-sm text-gray-500">
                                  تاريخ الاستلام: {item.returnDate}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-sm text-gray-600 mt-1">
                                  ملاحظات: {item.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex space-x-2 space-x-reverse">
                              {getStatusBadge(item.status)}
                              {getConditionBadge(item.condition)}
                            </div>
                            <div className="flex space-x-1 space-x-reverse">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleView(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePrint(item)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDelete(item)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* View Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedItem?.itemName}</DialogTitle>
                <DialogDescription>تفاصيل العهدة</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>اسم الصنف:</strong> {selectedItem?.itemName}
                  </div>
                  <div>
                    <strong>كود الصنف:</strong> {selectedItem?.itemCode}
                  </div>
                  <div>
                    <strong>اسم الموظف:</strong> {selectedItem?.employeeName}
                  </div>
                  <div>
                    <strong>رقم الموظف:</strong> {selectedItem?.employeeId}
                  </div>
                  <div>
                    <strong>تاريخ التسليم:</strong> {selectedItem?.assignedDate}
                  </div>
                  <div>
                    <strong>تاريخ الاستلام:</strong>{" "}
                    {selectedItem?.returnDate || "لم يتم الاستلام"}
                  </div>
                  <div>
                    <strong>الحالة:</strong>{" "}
                    {selectedItem && getStatusBadge(selectedItem.status)}
                  </div>
                  <div>
                    <strong>حالة الصنف:</strong>{" "}
                    {selectedItem && getConditionBadge(selectedItem.condition)}
                  </div>
                </div>
                {selectedItem?.notes && (
                  <div className="border-t pt-4">
                    <strong>ملاحظات:</strong>
                    <div className="mt-2 p-4 bg-gray-50 rounded-md">
                      {selectedItem.notes}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  onClick={() => selectedItem && handlePrint(selectedItem)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة سند العهدة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>تعديل العهدة</DialogTitle>
                <DialogDescription>تعديل بيانات العهدة</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">اسم الصنف</label>
                  <Input
                    value={formData.itemName}
                    onChange={(e) =>
                      setFormData({ ...formData, itemName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">كود الصنف</label>
                  <Input
                    value={formData.itemCode}
                    onChange={(e) =>
                      setFormData({ ...formData, itemCode: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">اسم الموظف</label>
                  <Input
                    value={formData.employeeName}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">رقم الموظف</label>
                  <Input
                    value={formData.employeeId}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeId: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">حالة الصنف</label>
                  <Select
                    value={formData.condition}
                    onValueChange={(
                      value: "excellent" | "good" | "fair" | "poor",
                    ) => setFormData({ ...formData, condition: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">ممتاز</SelectItem>
                      <SelectItem value="good">جيد</SelectItem>
                      <SelectItem value="fair">مقبول</SelectItem>
                      <SelectItem value="poor">ضعيف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right font-medium pt-2">ملاحظات</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="col-span-3 min-h-[80px] p-2 border rounded-md"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                <AlertDialogDescription>
                  هل أنت متأكد من حذف هذه العهدة؟ لا يمكن التراجع عن هذا
                  الإجراء.
                  <br />
                  <strong>
                    {selectedItem?.itemName} - {selectedItem?.employeeName}
                  </strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Custody;
