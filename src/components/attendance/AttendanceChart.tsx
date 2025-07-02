import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCheck,
  UserMinus,
  Clock,
  ChevronDown,
  ChevronUp,
  Info,
  Calendar as CalendarIcon,
  Printer,
  MapPin,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useReactToPrint } from "react-to-print";
import AttendancePrint from "./AttendancePrint";

interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  total: number;
  date: string;
  presentEmployees?: EmployeeAttendance[];
  absentEmployees?: EmployeeAttendance[];
  lateEmployees?: EmployeeAttendance[];
}

interface EmployeeAttendance {
  id: string;
  name: string;
  position: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: "present" | "absent" | "late";
  location?: string;
  checkInLocation?: string;
  checkOutLocation?: string;
}

interface AttendanceChartProps {
  className?: string;
  data?: AttendanceSummary;
}

const AttendanceChart = ({
  className,
  data: initialData = {
    present: 228,
    absent: 12,
    late: 8,
    total: 248,
    date: "15 مايو 2023",
    presentEmployees: [
      {
        id: "1",
        name: "أحمد محمد",
        position: "مطور برمجيات",
        checkInTime: "08:05",
        checkOutTime: "16:00",
        status: "present",
        location: "المقر الرئيسي",
        checkInLocation: "24.7136, 46.6753",
        checkOutLocation: "24.7136, 46.6753",
      },
      {
        id: "2",
        name: "سارة أحمد",
        position: "محاسب",
        checkInTime: "08:00",
        checkOutTime: "16:05",
        status: "present",
        location: "المقر الرئيسي",
        checkInLocation: "24.7140, 46.6748",
        checkOutLocation: "24.7140, 46.6748",
      },
      {
        id: "3",
        name: "محمد علي",
        position: "مدير مبيعات",
        checkInTime: "07:55",
        checkOutTime: "16:00",
        status: "present",
        location: "المقر الرئيسي",
        checkInLocation: "24.7135, 46.6750",
        checkOutLocation: "24.7135, 46.6750",
      },
      {
        id: "4",
        name: "فاطمة محمد",
        position: "مسؤول موارد بشرية",
        checkInTime: "08:02",
        checkOutTime: "16:00",
        status: "present",
        location: "المقر الرئيسي",
        checkInLocation: "24.7138, 46.6755",
        checkOutLocation: "24.7138, 46.6755",
      },
      {
        id: "5",
        name: "خالد عبدالله",
        position: "مصمم جرافيك",
        checkInTime: "08:00",
        checkOutTime: "16:00",
        status: "present",
        location: "المقر الرئيسي",
        checkInLocation: "24.7132, 46.6751",
        checkOutLocation: "24.7132, 46.6751",
      },
    ],
    absentEmployees: [
      { id: "6", name: "عمر حسن", position: "محلل نظم", status: "absent" },
      { id: "7", name: "نورة سعيد", position: "مساعد إداري", status: "absent" },
    ],
    lateEmployees: [
      {
        id: "8",
        name: "عبدالرحمن خالد",
        position: "مهندس شبكات",
        checkInTime: "09:15",
        checkOutTime: "16:00",
        status: "late",
        location: "فرع الرياض",
        checkInLocation: "24.7741, 46.7384",
        checkOutLocation: "24.7741, 46.7384",
      },
      {
        id: "9",
        name: "ليلى عبدالله",
        position: "مسؤول علاقات عامة",
        checkInTime: "08:45",
        checkOutTime: "16:00",
        status: "late",
        location: "فرع جدة",
        checkInLocation: "21.5433, 39.1728",
        checkOutLocation: "21.5433, 39.1728",
      },
    ],
  },
}: AttendanceChartProps) => {
  const [data, setData] = useState(initialData);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("present");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `تقرير الحضور - ${data.date}`,
  });

  const openLocationInMap = (location: string) => {
    if (location) {
      window.open(`https://maps.google.com/?q=${location}`, "_blank");
    }
  };

  // تحويل البيانات إلى تنسيق CSV
  const convertToCSV = (data: any[], headers: string[]) => {
    // إضافة رأس الجدول
    let csvContent = headers.join(",") + "\n";

    // إضافة البيانات
    data.forEach((item) => {
      const row = headers.map((header) => {
        // استخراج القيمة من الكائن بناءً على اسم العمود
        const value = item[header] || "";
        // تنسيق القيمة للتوافق مع CSV (إضافة علامات اقتباس إذا كانت تحتوي على فواصل)
        return `"${value}"`;
      });
      csvContent += row.join(",") + "\n";
    });

    return csvContent;
  };

  // تصدير البيانات كملف CSV
  const exportAttendanceData = (
    type: "present" | "absent" | "late" | "all",
  ) => {
    let csvData = "";
    let fileName = "";

    if (type === "present" || type === "all") {
      const headers = [
        "name",
        "position",
        "checkInTime",
        "checkOutTime",
        "location",
      ];
      const headerLabels = [
        "الاسم",
        "المنصب",
        "وقت الحضور",
        "وقت الانصراف",
        "الموقع",
      ];

      // تحويل البيانات إلى تنسيق مناسب للتصدير
      const exportData =
        data.presentEmployees?.map((emp) => ({
          name: emp.name,
          position: emp.position,
          checkInTime: emp.checkInTime || "-",
          checkOutTime: emp.checkOutTime || "-",
          location: emp.location || "غير محدد",
        })) || [];

      if (type === "present") {
        csvData = convertToCSV(exportData, headers);
        fileName = `الحاضرون_${data.date}.csv`;
        downloadCSV(csvData, fileName);
      } else if (type === "all") {
        const allData = {
          present: exportData,
          headers: headerLabels,
        };
        return allData;
      }
    }

    if (type === "absent" || type === "all") {
      const headers = ["name", "position"];
      const headerLabels = ["الاسم", "المنصب"];

      const exportData =
        data.absentEmployees?.map((emp) => ({
          name: emp.name,
          position: emp.position,
        })) || [];

      if (type === "absent") {
        csvData = convertToCSV(exportData, headers);
        fileName = `الغائبون_${data.date}.csv`;
        downloadCSV(csvData, fileName);
      } else if (type === "all") {
        const allData = {
          absent: exportData,
          headers: headerLabels,
        };
        return allData;
      }
    }

    if (type === "late" || type === "all") {
      const headers = [
        "name",
        "position",
        "checkInTime",
        "checkOutTime",
        "location",
      ];
      const headerLabels = [
        "الاسم",
        "المنصب",
        "وقت الحضور",
        "وقت الانصراف",
        "الموقع",
      ];

      const exportData =
        data.lateEmployees?.map((emp) => ({
          name: emp.name,
          position: emp.position,
          checkInTime: emp.checkInTime || "-",
          checkOutTime: emp.checkOutTime || "-",
          location: emp.location || "غير محدد",
        })) || [];

      if (type === "late") {
        csvData = convertToCSV(exportData, headers);
        fileName = `المتأخرون_${data.date}.csv`;
        downloadCSV(csvData, fileName);
      } else if (type === "all") {
        const allData = {
          late: exportData,
          headers: headerLabels,
        };
        return allData;
      }
    }

    if (type === "all") {
      // تجميع كل البيانات في ملف واحد
      const presentData = exportAttendanceData("present") as any;
      const absentData = exportAttendanceData("absent") as any;
      const lateData = exportAttendanceData("late") as any;

      let allCSV = "تقرير الحضور والغياب - " + data.date + "\n\n";

      // إضافة بيانات الحاضرين
      allCSV += "الحاضرون:\n";
      allCSV += presentData.headers.join(",") + "\n";
      presentData.present.forEach((item: any) => {
        const row = Object.values(item)
          .map((val) => `"${val}"`)
          .join(",");
        allCSV += row + "\n";
      });

      // إضافة بيانات الغائبين
      allCSV += "\nالغائبون:\n";
      allCSV += absentData.headers.join(",") + "\n";
      absentData.absent.forEach((item: any) => {
        const row = Object.values(item)
          .map((val) => `"${val}"`)
          .join(",");
        allCSV += row + "\n";
      });

      // إضافة بيانات المتأخرين
      allCSV += "\nالمتأخرون:\n";
      allCSV += lateData.headers.join(",") + "\n";
      lateData.late.forEach((item: any) => {
        const row = Object.values(item)
          .map((val) => `"${val}"`)
          .join(",");
        allCSV += row + "\n";
      });

      fileName = `تقرير_الحضور_والغياب_${data.date}.csv`;
      downloadCSV(allCSV, fileName);
    }
  };

  // تنزيل ملف CSV
  const downloadCSV = (csvContent: string, fileName: string) => {
    // إضافة BOM للتعامل مع النص العربي بشكل صحيح
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={`border shadow-sm bg-white ${className}`}>
      <CardHeader className="pb-2">
        <Tabs defaultValue="daily">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">ملخص الحضور</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                طباعة
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsDetailsOpen(true)}
              >
                <Info className="h-4 w-4" />
                التفاصيل
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => exportAttendanceData("all")}
              >
                <Download className="h-4 w-4" />
                تصدير الكل
              </Button>
              <Popover
                open={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy", { locale: ar })}{" "}
                          - {format(dateRange.to, "dd/MM/yyyy", { locale: ar })}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: ar })
                      )
                    ) : (
                      "اختر الفترة"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={ar}
                  />
                </PopoverContent>
              </Popover>
              <TabsList>
                <TabsTrigger value="daily">يومي</TabsTrigger>
                <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
                <TabsTrigger value="monthly">شهري</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{data.date}</p>

          <TabsContent value="daily" className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-500" />
                <span>الحاضرون</span>
              </div>
              <span className="font-medium">{data.present} موظف</span>
            </div>
            <Progress
              value={(data.present / data.total) * 100}
              className="h-2 bg-gray-100"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserMinus className="h-5 w-5 text-red-500" />
                <span>الغائبون</span>
              </div>
              <span className="font-medium">{data.absent} موظف</span>
            </div>
            <Progress
              value={(data.absent / data.total) * 100}
              className="h-2 bg-gray-100"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span>المتأخرون</span>
              </div>
              <span className="font-medium">{data.late} موظفين</span>
            </div>
            <Progress
              value={(data.late / data.total) * 100}
              className="h-2 bg-gray-100"
            />
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-48 flex items-center justify-center bg-gray-50 rounded-md mt-4">
              <p className="text-gray-500">بيانات الحضور الأسبوعي ستظهر هنا</p>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-48 flex items-center justify-center bg-gray-50 rounded-md mt-4">
              <p className="text-gray-500">بيانات الحضور الشهري ستظهر هنا</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent></CardContent>

      {/* تفاصيل الحضور والغياب */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              تفاصيل الحضور والغياب - {data.date}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex border-b">
              <Button
                variant={activeTab === "present" ? "default" : "ghost"}
                className="flex items-center gap-1 rounded-none border-b-2 border-transparent transition-all"
                style={
                  activeTab === "present" ? { borderColor: "#22c55e" } : {}
                }
                onClick={() => setActiveTab("present")}
              >
                <UserCheck className="h-4 w-4" />
                الحاضرون ({data.presentEmployees?.length || 0})
              </Button>
              <Button
                variant={activeTab === "absent" ? "default" : "ghost"}
                className="flex items-center gap-1 rounded-none border-b-2 border-transparent transition-all"
                style={activeTab === "absent" ? { borderColor: "#ef4444" } : {}}
                onClick={() => setActiveTab("absent")}
              >
                <UserMinus className="h-4 w-4" />
                الغائبون ({data.absentEmployees?.length || 0})
              </Button>
              <Button
                variant={activeTab === "late" ? "default" : "ghost"}
                className="flex items-center gap-1 rounded-none border-b-2 border-transparent transition-all"
                style={activeTab === "late" ? { borderColor: "#f59e0b" } : {}}
                onClick={() => setActiveTab("late")}
              >
                <Clock className="h-4 w-4" />
                المتأخرون ({data.lateEmployees?.length || 0})
              </Button>
            </div>

            <div className="mt-4">
              {activeTab === "present" && (
                <div className="overflow-x-auto">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => exportAttendanceData("present")}
                    >
                      <Download className="h-4 w-4" />
                      تصدير قائمة الحاضرين
                    </Button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-right">
                        <th className="p-2 border">الاسم</th>
                        <th className="p-2 border">المنصب</th>
                        <th className="p-2 border">وقت الحضور</th>
                        <th className="p-2 border">إحداثيات الحضور</th>
                        <th className="p-2 border">وقت الانصراف</th>
                        <th className="p-2 border">إحداثيات الانصراف</th>
                        <th className="p-2 border">الموقع</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.presentEmployees?.map((employee) => (
                        <tr
                          key={employee.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-2 border">{employee.name}</td>
                          <td className="p-2 border">{employee.position}</td>
                          <td className="p-2 border">{employee.checkInTime}</td>
                          <td className="p-2 border">
                            {employee.checkInLocation ? (
                              <button
                                onClick={() =>
                                  openLocationInMap(employee.checkInLocation!)
                                }
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <MapPin className="h-3 w-3 ml-1" />
                                {employee.checkInLocation}
                              </button>
                            ) : (
                              "غير محدد"
                            )}
                          </td>
                          <td className="p-2 border">
                            {employee.checkOutTime}
                          </td>
                          <td className="p-2 border">
                            {employee.checkOutLocation ? (
                              <button
                                onClick={() =>
                                  openLocationInMap(employee.checkOutLocation!)
                                }
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <MapPin className="h-3 w-3 ml-1" />
                                {employee.checkOutLocation}
                              </button>
                            ) : (
                              "غير محدد"
                            )}
                          </td>
                          <td className="p-2 border">
                            {employee.location || "غير محدد"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "absent" && (
                <div className="overflow-x-auto">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => exportAttendanceData("absent")}
                    >
                      <Download className="h-4 w-4" />
                      تصدير قائمة الغائبين
                    </Button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-right">
                        <th className="p-2 border">الاسم</th>
                        <th className="p-2 border">المنصب</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.absentEmployees?.map((employee) => (
                        <tr
                          key={employee.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-2 border">{employee.name}</td>
                          <td className="p-2 border">{employee.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "late" && (
                <div className="overflow-x-auto">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => exportAttendanceData("late")}
                    >
                      <Download className="h-4 w-4" />
                      تصدير قائمة المتأخرين
                    </Button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-right">
                        <th className="p-2 border">الاسم</th>
                        <th className="p-2 border">المنصب</th>
                        <th className="p-2 border">وقت الحضور</th>
                        <th className="p-2 border">إحداثيات الحضور</th>
                        <th className="p-2 border">وقت الانصراف</th>
                        <th className="p-2 border">إحداثيات الانصراف</th>
                        <th className="p-2 border">الموقع</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.lateEmployees?.map((employee) => (
                        <tr
                          key={employee.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-2 border">{employee.name}</td>
                          <td className="p-2 border">{employee.position}</td>
                          <td className="p-2 border text-amber-600 font-medium">
                            {employee.checkInTime}
                          </td>
                          <td className="p-2 border">
                            {employee.checkInLocation ? (
                              <button
                                onClick={() =>
                                  openLocationInMap(employee.checkInLocation!)
                                }
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <MapPin className="h-3 w-3 ml-1" />
                                {employee.checkInLocation}
                              </button>
                            ) : (
                              "غير محدد"
                            )}
                          </td>
                          <td className="p-2 border">
                            {employee.checkOutTime}
                          </td>
                          <td className="p-2 border">
                            {employee.checkOutLocation ? (
                              <button
                                onClick={() =>
                                  openLocationInMap(employee.checkOutLocation!)
                                }
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <MapPin className="h-3 w-3 ml-1" />
                                {employee.checkOutLocation}
                              </button>
                            ) : (
                              "غير محدد"
                            )}
                          </td>
                          <td className="p-2 border">
                            {employee.location || "غير محدد"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* قسم الطباعة (مخفي) */}
      <div className="hidden">
        <div ref={printRef}>
          <AttendancePrint
            data={{
              id: "1",
              employeeName: "تقرير جماعي",
              employeeId: "",
              startTime: "",
              endTime: "",
              location: "",
              records: [
                ...(data.presentEmployees?.map((emp) => ({
                  date: data.date,
                  checkInTime: emp.checkInTime || "-",
                  checkOutTime: emp.checkOutTime || "-",
                  location: emp.location || "غير محدد",
                  status: "حاضر",
                  employeeName: emp.name,
                  position: emp.position,
                })) || []),
                ...(data.lateEmployees?.map((emp) => ({
                  date: data.date,
                  checkInTime: emp.checkInTime || "-",
                  checkOutTime: emp.checkOutTime || "-",
                  location: emp.location || "غير محدد",
                  status: "متأخر",
                  employeeName: emp.name,
                  position: emp.position,
                })) || []),
              ],
              dateRange:
                dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "yyyy-MM-dd")} إلى ${format(dateRange.to, "yyyy-MM-dd")}`
                  : undefined,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default AttendanceChart;
