import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Printer, Download } from "lucide-react";

interface MaintenanceRequestViewProps {
  request: any;
  onClose?: () => void;
  onEdit?: () => void;
}

const MaintenanceRequestView = ({
  request,
  onClose,
  onEdit,
}: MaintenanceRequestViewProps) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "قيد التنفيذ":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
        );
      case "مكتملة":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
        );
      case "معلقة":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">{status}</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderPriorityBadge = (priority: string) => {
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

  return (
    <Card className="w-full print:shadow-none" dir="rtl">
      <CardHeader className="print:pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>تفاصيل طلب الصيانة</CardTitle>
          <div className="flex gap-2 print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> طباعة
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> تصدير
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                عنوان الطلب
              </h3>
              <p className="text-lg font-semibold">{request.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                الموقع
              </h3>
              <p className="text-lg">{request.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                نوع الصيانة
              </h3>
              <p className="text-lg">{request.type}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                الأولوية
              </h3>
              <div className="mt-1">
                {renderPriorityBadge(request.priority)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                مقدم الطلب
              </h3>
              <p className="text-lg">{request.requestedBy}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                تاريخ الطلب
              </h3>
              <p className="text-lg">
                {format(new Date(request.requestDate), "PPP", { locale: ar })}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                الحالة
              </h3>
              <div className="mt-1">{renderStatusBadge(request.status)}</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            وصف المشكلة
          </h3>
          <div className="p-4 bg-muted rounded-md">
            <p className="whitespace-pre-wrap">{request.description}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between print:hidden">
        <Button variant="outline" type="button" onClick={onClose}>
          إغلاق
        </Button>
        <Button type="button" onClick={onEdit}>
          تعديل
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceRequestView;
