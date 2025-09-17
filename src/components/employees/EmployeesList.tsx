import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Printer,
  Pencil,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmployeeForm, { EmployeeFormData } from "./EmployeeForm";
import EmployeeDetails from "./EmployeeDetails";

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: "active" | "vacation" | "sick" | "absent";
  avatar: string;
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "أحمد محمد",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "15/03/2022",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee1",
  },
  {
    id: "2",
    name: "سارة أحمد",
    position: "محاسب",
    department: "المالية",
    joinDate: "10/05/2021",
    status: "vacation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee2",
  },
  {
    id: "3",
    name: "محمد علي",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "22/01/2023",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee3",
  },
  {
    id: "4",
    name: "فاطمة محمد",
    position: "مسؤول موارد بشرية",
    department: "الموارد البشرية",
    joinDate: "03/08/2022",
    status: "sick",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee4",
  },
  {
    id: "5",
    name: "خالد عبدالله",
    position: "مصمم جرافيك",
    department: "التسويق",
    joinDate: "17/11/2021",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee5",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-700",
  vacation: "bg-blue-100 text-blue-700",
  sick: "bg-amber-100 text-amber-700",
  absent: "bg-red-100 text-red-700",
};

const statusText = {
  active: "يعمل",
  vacation: "إجازة",
  sick: "مرضي",
  absent: "غائب",
};

interface EmployeesListProps {
  className?: string;
}

const EmployeesList = ({ className }: EmployeesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const printFrameRef = useRef<HTMLIFrameElement>(null);

  // Load employees from localStorage on component mount
  React.useEffect(() => {
    const savedEmployees = localStorage.getItem('hrms_employees');
    if (savedEmployees) {
      try {
        setEmployees(JSON.parse(savedEmployees));
      } catch (error) {
        console.error('Error loading employees:', error);
        setEmployees(initialEmployees);
      }
    } else {
      setEmployees(initialEmployees);
    }
  }, []);

  // Save employees to localStorage whenever employees change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_employees', JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving employees:', error);
    }
  }, [employees]);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.includes(searchTerm) ||
      employee.position.includes(searchTerm) ||
      employee.department.includes(searchTerm),
  );

  const handleAddEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...data,
      id: `${employees.length + 1}`,
      avatar:
        data.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=employee${employees.length + 1}`,
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleEditEmployee = (data: EmployeeFormData) => {
    if (!selectedEmployee) return;

    const updatedEmployees = employees.map((emp) =>
      emp.id === selectedEmployee.id ? { ...emp, ...data } : emp,
    );

    setEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsDialogOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handlePrintEmployee = (employee: Employee) => {
    if (!printFrameRef.current) return;

    const printContent = `
      <html dir="rtl">
        <head>
          <title>بيانات الموظف - ${employee.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .title { font-size: 18px; color: #666; }
            .employee-card { border: 1px solid #ddd; border-radius: 10px; padding: 20px; max-width: 600px; margin: 0 auto; }
            .employee-header { display: flex; align-items: center; margin-bottom: 20px; }
            .avatar { width: 100px; height: 100px; border-radius: 50%; margin-left: 20px; }
            .employee-name { font-size: 22px; font-weight: bold; margin: 0; }
            .employee-position { font-size: 16px; color: #666; margin: 5px 0; }
            .employee-status { display: inline-block; padding: 5px 10px; border-radius: 20px; font-size: 14px; }
            .status-active { background-color: #d1fae5; color: #047857; }
            .status-vacation { background-color: #dbeafe; color: #1d4ed8; }
            .status-sick { background-color: #fef3c7; color: #b45309; }
            .status-absent { background-color: #fee2e2; color: #b91c1c; }
            .details-section { margin-top: 20px; }
            .detail-row { display: flex; margin-bottom: 15px; }
            .detail-label { width: 150px; font-weight: bold; color: #666; }
            .detail-value { flex: 1; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">نظام إدارة الموارد البشرية</div>
            <div class="title">بيانات الموظف</div>
          </div>
          
          <div class="employee-card">
            <div class="employee-header">
              <img src="${employee.avatar}" alt="${employee.name}" class="avatar">
              <div>
                <h1 class="employee-name">${employee.name}</h1>
                <p class="employee-position">${employee.position}</p>
                <span class="employee-status status-${employee.status}">${statusText[employee.status]}</span>
              </div>
            </div>
            
            <div class="details-section">
              <div class="detail-row">
                <div class="detail-label">الرقم الوظيفي:</div>
                <div class="detail-value">${employee.id}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">المنصب:</div>
                <div class="detail-value">${employee.position}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">القسم:</div>
                <div class="detail-value">${employee.department}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">تاريخ التعيين:</div>
                <div class="detail-value">${employee.joinDate}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">الحالة:</div>
                <div class="detail-value">${statusText[employee.status]}</div>
              </div>
            </div>
          </div>
          
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

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              قائمة الموظفين
            </CardTitle>
            <Button
              size="sm"
              className="gap-1"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={16} />
              <span>إضافة موظف</span>
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
                placeholder="بحث عن موظف..."
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
              onClick={() => {
                if (printFrameRef.current) {
                  const printContent = `
                  <html dir="rtl">
                    <head>
                      <title>قائمة الموظفين</title>
                      <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                        th { background-color: #f2f2f2; }
                        .status { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
                        .status-active { background-color: #d1fae5; color: #047857; }
                        .status-vacation { background-color: #dbeafe; color: #1d4ed8; }
                        .status-sick { background-color: #fef3c7; color: #b45309; }
                        .status-absent { background-color: #fee2e2; color: #b91c1c; }
                      </style>
                    </head>
                    <body>
                      <h1>قائمة الموظفين</h1>
                      <table>
                        <thead>
                          <tr>
                            <th>الرقم</th>
                            <th>الاسم</th>
                            <th>المنصب</th>
                            <th>القسم</th>
                            <th>تاريخ التعيين</th>
                            <th>الحالة</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${filteredEmployees
                            .map(
                              (emp, index) => `
                            <tr>
                              <td>${index + 1}</td>
                              <td>${emp.name}</td>
                              <td>${emp.position}</td>
                              <td>${emp.department}</td>
                              <td>${emp.joinDate}</td>
                              <td><span class="status status-${emp.status}">${statusText[emp.status]}</span></td>
                            </tr>
                          `,
                            )
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
                  const iframeDoc =
                    iframe.contentDocument || iframe.contentWindow?.document;

                  if (iframeDoc) {
                    iframeDoc.open();
                    iframeDoc.write(printContent);
                    iframeDoc.close();

                    setTimeout(() => {
                      iframe.contentWindow?.focus();
                      iframe.contentWindow?.print();
                    }, 500);
                  }
                }
              }}
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
                  <th className="py-3 px-2 text-right font-medium">الاسم</th>
                  <th className="py-3 px-2 text-right font-medium">المنصب</th>
                  <th className="py-3 px-2 text-right font-medium">القسم</th>
                  <th className="py-3 px-2 text-right font-medium">
                    تاريخ التعيين
                  </th>
                  <th className="py-3 px-2 text-right font-medium">الحالة</th>
                  <th className="py-3 px-2 text-right font-medium">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm">{employee.position}</td>
                    <td className="py-3 px-2 text-sm">{employee.department}</td>
                    <td className="py-3 px-2 text-sm">{employee.joinDate}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColors[employee.status]}`}
                      >
                        {statusText[employee.status]}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetails(employee)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(employee)}
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
                              onClick={() => handlePrintEmployee(employee)}
                            >
                              <Printer className="ml-2 h-4 w-4" />
                              <span>طباعة البيانات</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteEmployee(employee.id)}
                            >
                              <Trash2 className="ml-2 h-4 w-4 text-red-500" />
                              <span className="text-red-500">حذف الموظف</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EmployeeForm
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddEmployee}
        isEditing={false}
      />

      <EmployeeForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditEmployee}
        initialData={selectedEmployee || undefined}
        isEditing={true}
      />

      <EmployeeDetails
        employee={selectedEmployee}
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        onEdit={handleEditClick}
        onPrint={handlePrintEmployee}
      />

      <iframe
        ref={printFrameRef}
        style={{ display: "none" }}
        title="Print Frame"
      />
    </>
  );
};

export default EmployeesList;
