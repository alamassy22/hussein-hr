import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
  FileText,
  AlertTriangle,
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Printer,
  Download,
} from "lucide-react";

interface Letter {
  id: string;
  type: "warning" | "dismissal" | "agreement";
  title: string;
  employeeName: string;
  date: string;
  status: "active" | "archived";
}

const mockLetters: Letter[] = [
  {
    id: "1",
    type: "warning",
    title: "إنذار أول - التأخير المتكرر",
    employeeName: "أحمد محمد علي",
    date: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    type: "dismissal",
    title: "خطاب فصل - مخالفة جسيمة",
    employeeName: "سارة أحمد محمود",
    date: "2024-01-10",
    status: "active",
  },
  {
    id: "3",
    type: "agreement",
    title: "عهدة جهاز كمبيوتر محمول",
    employeeName: "محمد عبدالله حسن",
    date: "2024-01-20",
    status: "active",
  },
];

function LettersAndNotices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "warning" as "warning" | "dismissal" | "agreement",
    title: "",
    employeeName: "",
    content: "",
    reason: "",
  });

  const filteredLetters = mockLetters.filter((letter) => {
    const matchesSearch =
      letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || letter.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "dismissal":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "agreement":
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "warning":
        return "خطاب إنذار";
      case "dismissal":
        return "خطاب فصل";
      case "agreement":
        return "عهدة";
      default:
        return type;
    }
  };

  const handleEdit = (letter: Letter) => {
    setSelectedLetter(letter);
    setFormData({
      type: letter.type,
      title: letter.title,
      employeeName: letter.employeeName,
      content: "",
      reason: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleView = (letter: Letter) => {
    setSelectedLetter(letter);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (letter: Letter) => {
    setSelectedLetter(letter);
    setIsDeleteDialogOpen(true);
  };

  const handlePrint = (letter: Letter) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>طباعة ${getTypeName(letter.type)}</title>
            <style>
              body { font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 40px; }
              .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .content { line-height: 1.8; font-size: 16px; }
              .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${getTypeName(letter.type)}</h1>
              <p>التاريخ: ${letter.date}</p>
            </div>
            <div class="content">
              <h2>${letter.title}</h2>
              <p><strong>اسم الموظف:</strong> ${letter.employeeName}</p>
              <p><strong>التاريخ:</strong> ${letter.date}</p>
              <p><strong>الحالة:</strong> ${letter.status === "active" ? "نشط" : "مؤرشف"}</p>
              <div style="margin-top: 30px;">
                <p>محتوى الخطاب يتم إدراجه هنا...</p>
              </div>
            </div>
            <div class="footer">
              <p>التوقيع: ___________________</p>
              <p>التاريخ: ___________________</p>
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
      type: "warning",
      title: "",
      employeeName: "",
      content: "",
      reason: "",
    });
  };

  const confirmDelete = () => {
    // Here you would typically delete from your backend
    console.log("Deleting:", selectedLetter);
    setIsDeleteDialogOpen(false);
    setSelectedLetter(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              الخطابات والإشعارات والعهد
            </h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة خطاب جديد</DialogTitle>
                  <DialogDescription>
                    قم بملء البيانات المطلوبة لإنشاء خطاب جديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">نوع الخطاب</label>
                    <Select
                      value={formData.type}
                      onValueChange={(
                        value: "warning" | "dismissal" | "agreement",
                      ) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warning">خطاب إنذار</SelectItem>
                        <SelectItem value="dismissal">خطاب فصل</SelectItem>
                        <SelectItem value="agreement">عهدة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right font-medium">العنوان</label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="col-span-3"
                      placeholder="عنوان الخطاب"
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
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label className="text-right font-medium pt-2">
                      المحتوى
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="col-span-3 min-h-[100px] p-2 border rounded-md"
                      placeholder="محتوى الخطاب"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label className="text-right font-medium pt-2">السبب</label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      className="col-span-3 min-h-[80px] p-2 border rounded-md"
                      placeholder="سبب إصدار الخطاب"
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
                <CardTitle>إدارة الخطابات والعهد</CardTitle>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث في الخطابات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">الكل</TabsTrigger>
                  <TabsTrigger value="warning">خطابات الإنذار</TabsTrigger>
                  <TabsTrigger value="dismissal">خطابات الفصل</TabsTrigger>
                  <TabsTrigger value="agreement">العهد</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <div className="space-y-4">
                    {filteredLetters.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        لا توجد خطابات مطابقة للبحث
                      </div>
                    ) : (
                      filteredLetters.map((letter) => (
                        <Card
                          key={letter.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 space-x-reverse">
                                {getTypeIcon(letter.type)}
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {letter.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    الموظف: {letter.employeeName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    التاريخ: {letter.date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Badge
                                  variant={
                                    letter.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {letter.status === "active" ? "نشط" : "مؤرشف"}
                                </Badge>
                                <Badge variant="outline">
                                  {getTypeName(letter.type)}
                                </Badge>
                                <div className="flex space-x-1 space-x-reverse">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleView(letter)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(letter)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handlePrint(letter)}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    <Printer className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleDelete(letter)}
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* View Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedLetter?.title}</DialogTitle>
                <DialogDescription>
                  تفاصيل {getTypeName(selectedLetter?.type || "warning")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>اسم الموظف:</strong> {selectedLetter?.employeeName}
                  </div>
                  <div>
                    <strong>التاريخ:</strong> {selectedLetter?.date}
                  </div>
                  <div>
                    <strong>النوع:</strong>{" "}
                    {getTypeName(selectedLetter?.type || "warning")}
                  </div>
                  <div>
                    <strong>الحالة:</strong>{" "}
                    {selectedLetter?.status === "active" ? "نشط" : "مؤرشف"}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <strong>محتوى الخطاب:</strong>
                  <div className="mt-2 p-4 bg-gray-50 rounded-md min-h-[200px]">
                    محتوى الخطاب يظهر هنا...
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => selectedLetter && handlePrint(selectedLetter)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>تعديل الخطاب</DialogTitle>
                <DialogDescription>
                  تعديل بيانات {getTypeName(selectedLetter?.type || "warning")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">نوع الخطاب</label>
                  <Select
                    value={formData.type}
                    onValueChange={(
                      value: "warning" | "dismissal" | "agreement",
                    ) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warning">خطاب إنذار</SelectItem>
                      <SelectItem value="dismissal">خطاب فصل</SelectItem>
                      <SelectItem value="agreement">عهدة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right font-medium">العنوان</label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
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
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right font-medium pt-2">المحتوى</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="col-span-3 min-h-[100px] p-2 border rounded-md"
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
                  هل أنت متأكد من حذف هذا الخطاب؟ لا يمكن التراجع عن هذا
                  الإجراء.
                  <br />
                  <strong>{selectedLetter?.title}</strong>
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

export default LettersAndNotices;
