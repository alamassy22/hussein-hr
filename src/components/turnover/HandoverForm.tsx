import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrintWrapper from "@/components/ui/print-wrapper";
import { Printer } from "lucide-react";

interface HandoverFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  employeeData?: any;
  onBack?: () => void;
}

const HandoverForm = ({
  onSubmit,
  onCancel,
  employeeData,
  onBack,
}: HandoverFormProps = {}) => {
  const [selectedEmployee, setSelectedEmployee] = useState(
    employeeData?.name || "أحمد محمد",
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    employeeData?.id || "EMP001",
  );
  const [selectedEmployeeDepartment, setSelectedEmployeeDepartment] = useState(
    employeeData?.department || "قسم الموارد البشرية",
  );
  const [selectedEmployeePosition, setSelectedEmployeePosition] = useState(
    employeeData?.position || "موظف",
  );

  const [items, setItems] = useState([
    { id: 1, name: "جهاز حاسوب", status: "تم التسليم", notes: "" },
    { id: 2, name: "بطاقة الدخول", status: "تم التسليم", notes: "" },
    { id: 3, name: "مفاتيح المكتب", status: "لم يتم التسليم", notes: "" },
    { id: 4, name: "هاتف العمل", status: "تم التسليم", notes: "" },
    { id: 5, name: "سيارة الشركة", status: "غير مطلوب", notes: "" },
  ]);

  const [responsibilities, setResponsibilities] = useState([
    { id: 1, name: "تسليم المشاريع الحالية", completed: true, notes: "" },
    {
      id: 2,
      name: "تدريب البديل",
      completed: false,
      notes: "لم يتم تعيين بديل بعد",
    },
    { id: 3, name: "تسليم الوثائق السرية", completed: true, notes: "" },
    { id: 4, name: "إغلاق الحسابات", completed: false, notes: "" },
  ]);

  const [additionalNotes, setAdditionalNotes] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // قائمة الموظفين المتاحين
  const availableEmployees = [
    {
      id: "EMP001",
      name: "أحمد محمد",
      department: "قسم الموارد البشرية",
      position: "موظف",
    },
    {
      id: "EMP002",
      name: "فاطمة علي",
      department: "قسم المحاسبة",
      position: "محاسب",
    },
    {
      id: "EMP003",
      name: "محمد حسن",
      department: "قسم التسويق",
      position: "مسوق",
    },
    {
      id: "EMP004",
      name: "سارة أحمد",
      department: "قسم تقنية المعلومات",
      position: "مطور",
    },
    {
      id: "EMP005",
      name: "عبدالله خالد",
      department: "قسم المبيعات",
      position: "مندوب مبيعات",
    },
  ];

  const handleEmployeeChange = (employeeId: string) => {
    const employee = availableEmployees.find((emp) => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee.name);
      setSelectedEmployeeId(employee.id);
      setSelectedEmployeeDepartment(employee.department);
      setSelectedEmployeePosition(employee.position);
    }
  };

  const handleItemStatusChange = (id: number, status: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  const handleItemNotesChange = (id: number, notes: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, notes } : item)));
  };

  const handleResponsibilityChange = (id: number, completed: boolean) => {
    setResponsibilities(
      responsibilities.map((resp) =>
        resp.id === id ? { ...resp, completed } : resp,
      ),
    );
  };

  const handleResponsibilityNotesChange = (id: number, notes: string) => {
    setResponsibilities(
      responsibilities.map((resp) =>
        resp.id === id ? { ...resp, notes } : resp,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        employeeId: selectedEmployeeId,
        employeeName: selectedEmployee,
        items,
        responsibilities,
        additionalNotes,
        date: new Date().toISOString(),
      });
    }
    // Trigger print after submission
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("يرجى السماح بالنوافذ المنبثقة لتمكين الطباعة");
      return;
    }

    // Get the current date
    const currentDate = new Date().toLocaleDateString("ar-SA");

    // Create the print content
    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>نموذج التسليم والتسلم</title>
        <style>
          @page {
            margin: 20mm;
            size: A4;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Arial', 'Tahoma', sans-serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
            background: #fff;
            direction: rtl;
            text-align: right;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #000;
            padding-bottom: 15px;
          }
          
          .header h1 {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .date {
            text-align: left;
            margin-bottom: 20px;
            font-size: 11pt;
          }
          
          .employee-info {
            border: 2px solid #000;
            padding: 15px;
            margin: 20px 0;
            background: #f9f9f9;
          }
          
          .employee-info h3 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
            background: #000;
            color: #fff;
            padding: 8px;
            margin: -15px -15px 15px -15px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .info-item {
            border-bottom: 1px dotted #666;
            padding-bottom: 5px;
          }
          
          .info-label {
            font-weight: bold;
            font-size: 10pt;
            color: #666;
            margin-bottom: 3px;
          }
          
          .info-value {
            font-size: 12pt;
            font-weight: bold;
          }
          
          .section {
            margin: 30px 0;
          }
          
          .section h3 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 15px;
            background: #000;
            color: #fff;
            padding: 8px 15px;
            text-align: center;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          
          th, td {
            border: 1px solid #000;
            padding: 10px 8px;
            text-align: right;
            vertical-align: top;
          }
          
          th {
            background: #f0f0f0;
            font-weight: bold;
            font-size: 11pt;
          }
          
          td {
            font-size: 10pt;
          }
          
          .status-delivered {
            color: #008000;
            font-weight: bold;
          }
          
          .status-not-delivered {
            color: #ff0000;
            font-weight: bold;
          }
          
          .status-not-required {
            color: #666;
          }
          
          .completed {
            color: #008000;
            font-weight: bold;
          }
          
          .not-completed {
            color: #ff0000;
            font-weight: bold;
          }
          
          .additional-notes {
            border: 2px solid #000;
            padding: 15px;
            margin: 20px 0;
            min-height: 100px;
            background: #f9f9f9;
          }
          
          .additional-notes h4 {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 12pt;
          }
          
          .signatures {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
          }
          
          .signature-box {
            text-align: center;
            border-top: 2px solid #000;
            padding-top: 10px;
          }
          
          .signature-label {
            font-weight: bold;
            font-size: 11pt;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>نموذج التسليم والتسلم</h1>
        </div>
        
        <div class="date">
          التاريخ: ${currentDate}
        </div>
        
        <div class="employee-info">
          <h3>بيانات الموظف</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">الاسم:</div>
              <div class="info-value">${selectedEmployee}</div>
            </div>
            <div class="info-item">
              <div class="info-label">الرقم الوظيفي:</div>
              <div class="info-value">${selectedEmployeeId}</div>
            </div>
            <div class="info-item">
              <div class="info-label">القسم:</div>
              <div class="info-value">${selectedEmployeeDepartment}</div>
            </div>
            <div class="info-item">
              <div class="info-label">المسمى الوظيفي:</div>
              <div class="info-value">${selectedEmployeePosition}</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h3>العهد والممتلكات</h3>
          <table>
            <thead>
              <tr>
                <th style="width: 40%">البند</th>
                <th style="width: 20%">الحالة</th>
                <th style="width: 40%">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td class="${
                    item.status === "تم التسليم"
                      ? "status-delivered"
                      : item.status === "لم يتم التسليم"
                        ? "status-not-delivered"
                        : "status-not-required"
                  }">${item.status}</td>
                  <td>${item.notes || "-"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h3>المسؤوليات والمهام</h3>
          <table>
            <thead>
              <tr>
                <th style="width: 40%">المسؤولية</th>
                <th style="width: 20%">الحالة</th>
                <th style="width: 40%">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${responsibilities
                .map(
                  (resp) => `
                <tr>
                  <td>${resp.name}</td>
                  <td class="${resp.completed ? "completed" : "not-completed"}">
                    ${resp.completed ? "مكتملة" : "غير مكتملة"}
                  </td>
                  <td>${resp.notes || "-"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div class="additional-notes">
          <h4>ملاحظات إضافية:</h4>
          <p>${additionalNotes || "لا توجد ملاحظات إضافية"}</p>
        </div>
        
        <div class="signatures">
          <div class="signature-box">
            <div class="signature-label">توقيع المسلم</div>
            <div style="height: 40px;"></div>
            <div>التاريخ: ___________</div>
          </div>
          <div class="signature-box">
            <div class="signature-label">توقيع المستلم</div>
            <div style="height: 40px;"></div>
            <div>التاريخ: ___________</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Write content to the new window
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  };

  return (
    <PrintWrapper title="نموذج التسليم والتسلم">
      <div className="bg-white print:bg-white">
        <Card className="border shadow-sm bg-white print:border-0 print:shadow-none">
          <CardHeader className="print:pb-2">
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              نموذج التسليم والتسلم
              <div className="flex gap-2 no-print">
                {onBack && (
                  <Button variant="outline" size="sm" onClick={onBack}>
                    العودة
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="print:p-0">
            {/* Employee Selection - Only show on screen */}
            <div className="mb-6 no-print">
              <Label htmlFor="employee-select">اختيار الموظف</Label>
              <Select
                value={selectedEmployeeId}
                onValueChange={handleEmployeeChange}
              >
                <SelectTrigger id="employee-select">
                  <SelectValue placeholder="اختر الموظف" />
                </SelectTrigger>
                <SelectContent>
                  {availableEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div
              ref={printRef}
              id="handover-print-content"
              className="print-content"
            >
              {/* Employee info - always show with selected data */}
              <div
                className="employee-info mb-6 p-4 bg-gray-50 rounded-md"
                style={{
                  border: "2px solid #000",
                  padding: "15px",
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <h3
                  className="font-semibold mb-2"
                  style={{
                    color: "#000",
                    fontSize: "14pt",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  بيانات الموظف
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="text-sm text-gray-500"
                      style={{ color: "#666", fontSize: "10pt" }}
                    >
                      الاسم
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedEmployee}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm text-gray-500"
                      style={{ color: "#666", fontSize: "10pt" }}
                    >
                      الرقم الوظيفي
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedEmployeeId}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm text-gray-500"
                      style={{ color: "#666", fontSize: "10pt" }}
                    >
                      القسم
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedEmployeeDepartment}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm text-gray-500"
                      style={{ color: "#666", fontSize: "10pt" }}
                    >
                      المسمى الوظيفي
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedEmployeePosition}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* العهد والممتلكات */}
                <div>
                  <h3 className="font-semibold mb-3">العهد والممتلكات</h3>

                  {/* Interactive version for screen */}
                  <div className="space-y-4 no-print">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4"
                      >
                        <div>
                          <Label>البند</Label>
                          <p className="mt-1">{item.name}</p>
                        </div>
                        <div>
                          <Label htmlFor={`item-status-${item.id}`}>
                            الحالة
                          </Label>
                          <Select
                            value={item.status}
                            onValueChange={(value) =>
                              handleItemStatusChange(item.id, value)
                            }
                          >
                            <SelectTrigger id={`item-status-${item.id}`}>
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="تم التسليم">
                                تم التسليم
                              </SelectItem>
                              <SelectItem value="لم يتم التسليم">
                                لم يتم التسليم
                              </SelectItem>
                              <SelectItem value="غير مطلوب">
                                غير مطلوب
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`item-notes-${item.id}`}>
                            ملاحظات
                          </Label>
                          <Input
                            id={`item-notes-${item.id}`}
                            value={item.notes}
                            onChange={(e) =>
                              handleItemNotesChange(item.id, e.target.value)
                            }
                            placeholder="أي ملاحظات إضافية"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Print version as table */}
                  <div className="print-only" style={{ display: "none" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "2px solid #000",
                        color: "#000",
                        backgroundColor: "#fff",
                        margin: "15px 0",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              textAlign: "right",
                              color: "#000",
                              backgroundColor: "#f0f0f0",
                              fontWeight: "bold",
                            }}
                          >
                            البند
                          </th>
                          <th
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              textAlign: "right",
                              color: "#000",
                              backgroundColor: "#f0f0f0",
                              fontWeight: "bold",
                            }}
                          >
                            الحالة
                          </th>
                          <th
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              textAlign: "right",
                              color: "#000",
                              backgroundColor: "#f0f0f0",
                              fontWeight: "bold",
                            }}
                          >
                            ملاحظات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                color: "#000",
                                backgroundColor: "#fff",
                              }}
                            >
                              {item.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                color: "#000",
                                backgroundColor: "#fff",
                              }}
                            >
                              {item.status}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                color: "#000",
                                backgroundColor: "#fff",
                              }}
                            >
                              {item.notes || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* المسؤوليات */}
                <div>
                  <h3 className="font-semibold mb-3">المسؤوليات والمهام</h3>

                  {/* Interactive version for screen */}
                  <div className="space-y-4 no-print">
                    {responsibilities.map((resp) => (
                      <div
                        key={resp.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={`resp-${resp.id}`}
                            checked={resp.completed}
                            onCheckedChange={(checked) =>
                              handleResponsibilityChange(
                                resp.id,
                                checked as boolean,
                              )
                            }
                          />
                          <Label htmlFor={`resp-${resp.id}`} className="mr-2">
                            {resp.name}
                          </Label>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`resp-notes-${resp.id}`}>
                            ملاحظات
                          </Label>
                          <Input
                            id={`resp-notes-${resp.id}`}
                            value={resp.notes}
                            onChange={(e) =>
                              handleResponsibilityNotesChange(
                                resp.id,
                                e.target.value,
                              )
                            }
                            placeholder="أي ملاحظات إضافية"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Print version as table */}
                  <div className="print-only" style={{ display: "none" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "2px solid #000",
                        color: "#000",
                        backgroundColor: "#fff",
                        margin: "15px 0",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              textAlign: "right",
                              color: "#000",
                              backgroundColor: "#f0f0f0",
                              fontWeight: "bold",
                            }}
                          >
                            المسؤولية
                          </th>
                          <th
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              textAlign: "right",
                              color: "#000",
                              backgroundColor: "#f0f0f0",
                              fontWeight: "bold",
                            }}
                          >
                            الحالة
                          </th>
                          <th
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              textAlign: "right",
                              color: "#000",
                              backgroundColor: "#f0f0f0",
                              fontWeight: "bold",
                            }}
                          >
                            ملاحظات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {responsibilities.map((resp) => (
                          <tr key={resp.id}>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                color: "#000",
                                backgroundColor: "#fff",
                              }}
                            >
                              {resp.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                color: "#000",
                                backgroundColor: "#fff",
                              }}
                            >
                              {resp.completed ? "مكتملة" : "غير مكتملة"}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                color: "#000",
                                backgroundColor: "#fff",
                              }}
                            >
                              {resp.notes || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ملاحظات إضافية */}
                <div className="space-y-2">
                  <Label htmlFor="additional-notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="additional-notes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="أي ملاحظات إضافية حول عملية التسليم والتسلم"
                    rows={4}
                    className="no-print"
                  />
                  {/* Print version of additional notes */}
                  <div
                    className="additional-notes print-only"
                    style={{
                      display: "none",
                      border: "2px solid #000",
                      padding: "15px",
                      margin: "20px 0",
                      minHeight: "80px",
                      backgroundColor: "#fff",
                      color: "#000",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "#000",
                        fontSize: "12pt",
                      }}
                    >
                      ملاحظات إضافية:
                    </p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        lineHeight: "1.4",
                      }}
                    >
                      {additionalNotes || "لا توجد ملاحظات إضافية"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 no-print">
                  <Button variant="outline" type="button" onClick={onCancel}>
                    إلغاء
                  </Button>
                  <Button type="submit">تأكيد التسليم</Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </PrintWrapper>
  );
};

export default HandoverForm;