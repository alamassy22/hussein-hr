import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  Printer,
  Eye,
  Pencil,
  MoreHorizontal,
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PayrollForm, { PayrollData } from "./PayrollForm";
import PayrollDetails from "./PayrollDetails";
import PayrollReview from "./PayrollReview";

// Sample payroll data
const initialPayrolls: PayrollData[] = [
  {
    id: "1",
    title: "مسير رواتب شهر يناير 2024",
    month: "01",
    year: "2024",
    date: "2024-01-25",
    status: "paid",
    employees: [
      {
        id: "1-1",
        employeeId: "1",
        name: "أحمد محمد",
        position: "مطور برمجيات",
        baseSalary: 12000,
        deductions: 500,
        advances: 1000,
        netSalary: 10500,
      },
      {
        id: "1-2",
        employeeId: "2",
        name: "سارة أحمد",
        position: "محاسب",
        baseSalary: 9000,
        deductions: 300,
        advances: 0,
        netSalary: 8700,
      },
    ],
    totalAmount: 19200,
  },
  {
    id: "2",
    title: "مسير رواتب شهر فبراير 2024",
    month: "02",
    year: "2024",
    date: "2024-02-25",
    status: "approved",
    employees: [
      {
        id: "2-1",
        employeeId: "1",
        name: "أحمد محمد",
        position: "مطور برمجيات",
        baseSalary: 12000,
        deductions: 200,
        advances: 0,
        netSalary: 11800,
      },
      {
        id: "2-3",
        employeeId: "3",
        name: "محمد علي",
        position: "مدير مبيعات",
        baseSalary: 15000,
        deductions: 700,
        advances: 2000,
        netSalary: 12300,
      },
    ],
    totalAmount: 24100,
  },
  {
    id: "3",
    title: "مسير رواتب شهر مارس 2024",
    month: "03",
    year: "2024",
    date: "2024-03-25",
    status: "draft",
    employees: [
      {
        id: "3-4",
        employeeId: "4",
        name: "فاطمة محمد",
        position: "مسؤول موارد بشرية",
        baseSalary: 10000,
        deductions: 400,
        advances: 500,
        netSalary: 9100,
      },
      {
        id: "3-5",
        employeeId: "5",
        name: "خالد عبدالله",
        position: "مصمم جرافيك",
        baseSalary: 8500,
        deductions: 250,
        advances: 1500,
        netSalary: 6750,
      },
    ],
    totalAmount: 15850,
  },
];

const statusColors = {
  draft: "bg-amber-100 text-amber-700",
  approved: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
};

const statusText = {
  draft: "مسودة",
  approved: "معتمد",
  paid: "مدفوع",
};

const statusIcons = {
  draft: <Clock className="h-4 w-4 ml-1" />,
  approved: <CheckCircle className="h-4 w-4 ml-1" />,
  paid: <CreditCard className="h-4 w-4 ml-1" />,
};

interface PayrollListProps {
  className?: string;
}

const PayrollList = ({ className }: PayrollListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [payrolls, setPayrolls] = useState<PayrollData[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollData | null>(
    null,
  );
  const printFrameRef = useRef<HTMLIFrameElement>(null);

  // Load payrolls from localStorage on component mount
  React.useEffect(() => {
    const savedPayrolls = localStorage.getItem('hrms_payrolls');
    if (savedPayrolls) {
      try {
        setPayrolls(JSON.parse(savedPayrolls));
      } catch (error) {
        console.error('Error loading payrolls:', error);
        setPayrolls(initialPayrolls);
      }
    } else {
      setPayrolls(initialPayrolls);
    }
  }, []);

  // Save payrolls to localStorage whenever payrolls change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_payrolls', JSON.stringify(payrolls));
    } catch (error) {
      console.error('Error saving payrolls:', error);
    }
  }, [payrolls]);

  const filteredPayrolls = payrolls.filter(
    (payroll) =>
      payroll.title.includes(searchTerm) ||
      payroll.month.includes(searchTerm) ||
      payroll.year.includes(searchTerm),
  );

  const handleAddPayroll = (data: PayrollData) => {
    setPayrolls([...payrolls, data]);
  };

  const handleEditPayroll = (data: PayrollData) => {
    if (!selectedPayroll) return;

    const updatedPayrolls = payrolls.map((payroll) =>
      payroll.id === selectedPayroll.id ? { ...payroll, ...data } : payroll,
    );

    setPayrolls(updatedPayrolls);
  };

  const handleDeletePayroll = (id: string) => {
    const updatedPayrolls = payrolls.filter((payroll) => payroll.id !== id);
    setPayrolls(updatedPayrolls);
  };

  const handleViewDetails = (payroll: PayrollData) => {
    setSelectedPayroll(payroll);
    setIsDetailsDialogOpen(true);
  };

  const handleEditClick = (payroll: PayrollData) => {
    setSelectedPayroll(payroll);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStatus = (
    id: string,
    status: "draft" | "approved" | "paid",
  ) => {
    const updatedPayrolls = payrolls.map((payroll) =>
      payroll.id === id ? { ...payroll, status } : payroll,
    );

    setPayrolls(updatedPayrolls);
  };

  const handleReviewPayroll = (payroll: PayrollData) => {
    setSelectedPayroll(payroll);
    setIsReviewDialogOpen(true);
  };

  const handleApprovePayroll = (id: string, notes: string) => {
    const updatedPayrolls = payrolls.map((payroll) =>
      payroll.id === id
        ? { ...payroll, status: "approved", reviewNotes: notes }
        : payroll,
    );

    setPayrolls(updatedPayrolls);
  };

  const handleRejectPayroll = (id: string, notes: string) => {
    // في حالة الرفض، نبقي الحالة كمسودة ولكن نضيف ملاحظات المراجعة
    const updatedPayrolls = payrolls.map((payroll) =>
      payroll.id === id ? { ...payroll, reviewNotes: notes } : payroll,
    );

    setPayrolls(updatedPayrolls);
  };

  const handlePrintPayroll = (payroll: PayrollData) => {
    if (!printFrameRef.current) return;

    const getMonthName = (monthNum: string) => {
      const monthIndex = parseInt(monthNum) - 1;
      return new Date(0, monthIndex).toLocaleString("ar-SA", { month: "long" });
    };

    const printContent = `
      <html dir="rtl">
        <head>
          <title>مسير الرواتب - ${payroll.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .title { font-size: 22px; margin-bottom: 5px; }
            .subtitle { font-size: 16px; color: #666; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: right; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .total-row { font-weight: bold; background-color: #f9f9f9; }
            .status { display: inline-block; padding: 5px 10px; border-radius: 20px; font-size: 14px; }
            .status-draft { background-color: #fef3c7; color: #b45309; }
            .status-approved { background-color: #dbeafe; color: #1d4ed8; }
            .status-paid { background-color: #d1fae5; color: #047857; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            .summary { margin-bottom: 30px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
            .summary-title { font-weight: bold; margin-bottom: 10px; }
            .summary-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">نظام إدارة الموارد البشرية</div>
            <div class="title">${payroll.title}</div>
            <div class="subtitle">شهر ${getMonthName(payroll.month)} ${payroll.year}</div>
            <div>
              <span class="status status-${payroll.status}">${statusText[payroll.status]}</span>
            </div>
          </div>
          
          <div class="summary">
            <div class="summary-title">ملخص المسير</div>
            <div class="summary-item">
              <span>عدد الموظفين:</span>
              <span>${payroll.employees.length}</span>
            </div>
            <div class="summary-item">
              <span>إجمالي الرواتب الأساسية:</span>
              <span>${payroll.employees.reduce((sum, emp) => sum + emp.baseSalary, 0).toLocaleString()} ر.س</span>
            </div>
            <div class="summary-item">
              <span>إجمالي الخصومات:</span>
              <span>${payroll.employees.reduce((sum, emp) => sum + emp.deductions, 0).toLocaleString()} ر.س</span>
            </div>
            <div class="summary-item">
              <span>إجمالي السلف:</span>
              <span>${payroll.employees.reduce((sum, emp) => sum + emp.advances, 0).toLocaleString()} ر.س</span>
            </div>
            <div class="summary-item" style="font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ddd;">
              <span>صافي المبلغ المستحق:</span>
              <span>${payroll.totalAmount.toLocaleString()} ر.س</span>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>م</th>
                <th>اسم الموظف</th>
                <th>المنصب</th>
                <th>الراتب الأساسي</th>
                <th>الخصومات</th>
                <th>السلف</th>
                <th>صافي الراتب</th>
              </tr>
            </thead>
            <tbody>
              ${payroll.employees
                .map(
                  (emp, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${emp.name}</td>
                  <td>${emp.position}</td>
                  <td>${emp.baseSalary.toLocaleString()} ر.س</td>
                  <td>${emp.deductions.toLocaleString()} ر.س</td>
                  <td>${emp.advances.toLocaleString()} ر.س</td>
                  <td>${emp.netSalary.toLocaleString()} ر.س</td>
                </tr>
              `,
                )
                .join("")}
              <tr class="total-row">
                <td colspan="3">الإجمالي</td>
                <td>${payroll.employees.reduce((sum, emp) => sum + emp.baseSalary, 0).toLocaleString()} ر.س</td>
                <td>${payroll.employees.reduce((sum, emp) => sum + emp.deductions, 0).toLocaleString()} ر.س</td>
                <td>${payroll.employees.reduce((sum, emp) => sum + emp.advances, 0).toLocaleString()} ر.س</td>
                <td>${payroll.totalAmount.toLocaleString()} ر.س</td>
              </tr>
            </tbody>
          </table>
          
          <div class="footer">
            <p>تم إنشاء هذا التقرير بواسطة نظام إدارة الموارد البشرية - ${new Date().toLocaleDateString("ar-SA")}</p>
          </div>
        </body>
      </html>
    `;

    const iframe = printFrameRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(printContent);
      iframeDoc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 500);
    }
  };

  const handlePrintAllPayrolls = () => {
    if (!printFrameRef.current) return;

    const printContent = `
      <html dir="rtl">
        <head>
          <title>سجل مسيرات الرواتب</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .status { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
            .status-draft { background-color: #fef3c7; color: #b45309; }
            .status-approved { background-color: #dbeafe; color: #1d4ed8; }
            .status-paid { background-color: #d1fae5; color: #047857; }
          </style>
        </head>
        <body>
          <h1>سجل مسيرات الرواتب</h1>
          <table>
            <thead>
              <tr>
                <th>م</th>
                <th>العنوان</th>
                <th>الشهر</th>
                <th>السنة</th>
                <th>التاريخ</th>
                <th>عدد الموظفين</th>
                <th>إجمالي المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${filteredPayrolls
                .map((payroll, index) => {
                  const monthNames = [
                    "يناير",
                    "فبراير",
                    "مارس",
                    "أبريل",
                    "مايو",
                    "يونيو",
                    "يوليو",
                    "أغسطس",
                    "سبتمبر",
                    "أكتوبر",
                    "نوفمبر",
                    "ديسمبر",
                  ];
                  const monthIndex = parseInt(payroll.month) - 1;
                  const monthName = monthNames[monthIndex];

                  return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${payroll.title}</td>
                  <td>${monthName}</td>
                  <td>${payroll.year}</td>
                  <td>${new Date(payroll.date).toLocaleDateString("ar-SA")}</td>
                  <td>${payroll.employees.length}</td>
                  <td>${payroll.totalAmount.toLocaleString()} ر.س</td>
                  <td><span class="status status-${payroll.status}">${statusText[payroll.status]}</span></td>
                </tr>
              `;
                })
                .join("")}
            </tbody>
          </table>
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
            <p>تم إنشاء هذا التقرير بواسطة نظام إدارة الموارد البشرية - ${new Date().toLocaleDateString("ar-SA")}</p>
          </div>
        </body>
      </html>
    `;

    const iframe = printFrameRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(printContent);
      iframeDoc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 500);
    }
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              سجلات المرتبات
            </CardTitle>
            <Button
              size="sm"
              className="gap-1"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={16} />
              <span>إضافة مسير رواتب</span>
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                className="pr-10 rounded-lg bg-gray-50 placeholder:text-right"
                placeholder="بحث عن مسير رواتب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                dir="rtl"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrintAllPayrolls}
            >
              <Printer size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-xs text-gray-500">
                  <th className="py-3 px-2 text-right font-medium">العنوان</th>
                  <th className="py-3 px-2 text-right font-medium">
                    الشهر/السنة
                  </th>
                  <th className="py-3 px-2 text-right font-medium">التاريخ</th>
                  <th className="py-3 px-2 text-right font-medium">
                    عدد الموظفين
                  </th>
                  <th className="py-3 px-2 text-right font-medium">
                    إجمالي المبلغ
                  </th>
                  <th className="py-3 px-2 text-right font-medium">الحالة</th>
                  <th className="py-3 px-2 text-right font-medium">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayrolls.map((payroll) => {
                  const monthNames = [
                    "يناير",
                    "فبراير",
                    "مارس",
                    "أبريل",
                    "مايو",
                    "يونيو",
                    "يوليو",
                    "أغسطس",
                    "سبتمبر",
                    "أكتوبر",
                    "نوفمبر",
                    "ديسمبر",
                  ];
                  const monthIndex = parseInt(payroll.month) - 1;
                  const monthName = monthNames[monthIndex];

                  return (
                    <tr key={payroll.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-400" />
                          <span className="font-medium">{payroll.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-sm">
                        {monthName} {payroll.year}
                      </td>
                      <td className="py-3 px-2 text-sm">
                        {new Date(payroll.date).toLocaleDateString("ar-SA")}
                      </td>
                      <td className="py-3 px-2 text-sm">
                        {payroll.employees.length}
                      </td>
                      <td className="py-3 px-2 text-sm font-medium">
                        {payroll.totalAmount.toLocaleString()} ر.س
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex items-center w-fit ${statusColors[payroll.status]}`}
                        >
                          {statusIcons[payroll.status]}
                          {statusText[payroll.status]}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(payroll)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(payroll)}
                            disabled={payroll.status === "paid"}
                          >
                            <Pencil size={16} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handlePrintPayroll(payroll)}
                              >
                                <Printer className="ml-2 h-4 w-4" />
                                <span>طباعة المسير</span>
                              </DropdownMenuItem>

                              {payroll.status === "draft" && (
                                <DropdownMenuItem
                                  onClick={() => handleReviewPayroll(payroll)}
                                >
                                  <CheckCircle className="ml-2 h-4 w-4 text-blue-500" />
                                  <span className="text-blue-500">
                                    مراجعة واعتماد المسير
                                  </span>
                                </DropdownMenuItem>
                              )}

                              {payroll.status === "approved" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(payroll.id, "paid")
                                  }
                                >
                                  <CreditCard className="ml-2 h-4 w-4 text-green-500" />
                                  <span className="text-green-500">
                                    تأكيد الدفع
                                  </span>
                                </DropdownMenuItem>
                              )}

                              {payroll.status !== "paid" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeletePayroll(payroll.id)
                                  }
                                >
                                  <Trash2 className="ml-2 h-4 w-4 text-red-500" />
                                  <span className="text-red-500">
                                    حذف المسير
                                  </span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <PayrollForm
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddPayroll}
        isEditing={false}
      />

      <PayrollForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditPayroll}
        initialData={selectedPayroll || undefined}
        isEditing={true}
      />

      <PayrollDetails
        payroll={selectedPayroll}
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        onEdit={handleEditClick}
        onPrint={handlePrintPayroll}
      />

      <PayrollReview
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        payroll={selectedPayroll}
        onApprove={handleApprovePayroll}
        onReject={handleRejectPayroll}
        onPrint={handlePrintPayroll}
      />

      <iframe
        ref={printFrameRef}
        style={{ display: "none" }}
        title="Print Frame"
      />
    </>
  );
};

export default PayrollList;
