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
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react";

const MaintenanceSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample maintenance schedule data
  const maintenanceSchedules = [
    {
      id: 1,
      vehiclePlateNumber: "أ ب ج 1234",
      vehicleModel: "تويوتا كامري",
      maintenanceType: "تغيير زيت",
      lastMaintenanceDate: "2023-05-15",
      nextMaintenanceDate: "2023-08-15",
      status: "مجدول",
      mileage: 15000,
      nextMileage: 20000,
    },
    {
      id: 2,
      vehiclePlateNumber: "د هـ و 5678",
      vehicleModel: "هيونداي سوناتا",
      maintenanceType: "صيانة دورية",
      lastMaintenanceDate: "2023-04-20",
      nextMaintenanceDate: "2023-07-20",
      status: "متأخر",
      mileage: 25000,
      nextMileage: 30000,
    },
    {
      id: 3,
      vehiclePlateNumber: "ز ح ط 9012",
      vehicleModel: "نيسان التيما",
      maintenanceType: "فحص فني",
      lastMaintenanceDate: "2023-06-01",
      nextMaintenanceDate: "2023-09-01",
      status: "مجدول",
      mileage: 18000,
      nextMileage: 23000,
    },
    {
      id: 4,
      vehiclePlateNumber: "ي ك ل 3456",
      vehicleModel: "فورد إكسبلورر",
      maintenanceType: "تغيير زيت",
      lastMaintenanceDate: "2023-05-25",
      nextMaintenanceDate: "2023-08-25",
      status: "قريب",
      mileage: 22000,
      nextMileage: 27000,
    },
    {
      id: 5,
      vehiclePlateNumber: "م ن س 7890",
      vehicleModel: "كيا سبورتاج",
      maintenanceType: "صيانة دورية",
      lastMaintenanceDate: "2023-06-10",
      nextMaintenanceDate: "2023-09-10",
      status: "مجدول",
      mileage: 30000,
      nextMileage: 35000,
    },
  ];

  // Filter maintenance schedules based on search term
  const filteredSchedules = maintenanceSchedules.filter((schedule) => {
    return (
      schedule.vehiclePlateNumber.includes(searchTerm) ||
      schedule.vehicleModel.includes(searchTerm) ||
      schedule.maintenanceType.includes(searchTerm)
    );
  });

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "مجدول":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Calendar className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "قريب":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "متأخر":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="mr-1 h-3 w-3" /> {status}
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

  // Check if maintenance date is approaching (within 7 days)
  const isMaintenanceApproaching = (maintenanceDate) => {
    const today = new Date();
    const nextDate = new Date(maintenanceDate);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  // Check if maintenance is overdue
  const isMaintenanceOverdue = (maintenanceDate) => {
    const today = new Date();
    const nextDate = new Date(maintenanceDate);
    return nextDate < today;
  };

  // Render maintenance date with warning if needed
  const renderMaintenanceDate = (maintenanceDate) => {
    if (isMaintenanceOverdue(maintenanceDate)) {
      return (
        <div className="flex items-center text-red-500">
          <AlertTriangle className="mr-1 h-4 w-4" />
          {new Date(maintenanceDate).toLocaleDateString("ar-SA")} (متأخر)
        </div>
      );
    } else if (isMaintenanceApproaching(maintenanceDate)) {
      return (
        <div className="flex items-center text-yellow-500">
          <Clock className="mr-1 h-4 w-4" />
          {new Date(maintenanceDate).toLocaleDateString("ar-SA")} (قريب)
        </div>
      );
    } else {
      return new Date(maintenanceDate).toLocaleDateString("ar-SA");
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>جدول الصيانة</CardTitle>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">رقم اللوحة</TableHead>
              <TableHead className="text-right">الموديل</TableHead>
              <TableHead className="text-right">نوع الصيانة</TableHead>
              <TableHead className="text-right">آخر صيانة</TableHead>
              <TableHead className="text-right">الصيانة القادمة</TableHead>
              <TableHead className="text-right">العداد الحالي</TableHead>
              <TableHead className="text-right">العداد القادم</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">
                  {schedule.vehiclePlateNumber}
                </TableCell>
                <TableCell>{schedule.vehicleModel}</TableCell>
                <TableCell>{schedule.maintenanceType}</TableCell>
                <TableCell>
                  {new Date(schedule.lastMaintenanceDate).toLocaleDateString(
                    "ar-SA",
                  )}
                </TableCell>
                <TableCell>
                  {renderMaintenanceDate(schedule.nextMaintenanceDate)}
                </TableCell>
                <TableCell>{schedule.mileage} كم</TableCell>
                <TableCell>{schedule.nextMileage} كم</TableCell>
                <TableCell>{renderStatusBadge(schedule.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      تحديث
                    </Button>
                    <Button variant="ghost" size="sm">
                      إكمال
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedule;
