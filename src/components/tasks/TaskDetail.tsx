import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Printer } from "lucide-react";

interface TaskDetailProps {
  task: any;
  onEdit?: () => void;
  onClose?: () => void;
  onPrint?: () => void;
}

const TaskDetail = ({ task, onEdit, onClose, onPrint }: TaskDetailProps) => {
  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "قيد التنفيذ":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="ml-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "مكتملة":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="ml-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "متأخرة":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertCircle className="ml-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Priority badge renderer
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
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{task.title}</span>
          {renderStatusBadge(task.status)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">وصف المهمة:</h3>
          <p className="text-gray-700">{task.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">المسؤول:</h3>
            <p className="text-gray-700">{task.assignedTo}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">الأولوية:</h3>
            <div>{renderPriorityBadge(task.priority)}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">تاريخ الاستحقاق:</h3>
          <p className="text-gray-700">
            {new Date(task.dueDate).toLocaleDateString("ar-SA")}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          إغلاق
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrint}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
          <Button onClick={onEdit}>تعديل</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskDetail;
