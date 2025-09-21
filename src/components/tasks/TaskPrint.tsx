import React from "react";
import { forwardRef } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface TaskPrintProps {
  task: any;
}

const TaskPrint = forwardRef<HTMLDivElement, TaskPrintProps>(
  ({ task }, ref) => {
    // Status badge renderer
    const renderStatus = (status: string) => {
      switch (status) {
        case "قيد التنفيذ":
          return (
            <div className="flex items-center text-blue-600">
              <Clock className="ml-1 h-3 w-3" /> {status}
            </div>
          );
        case "مكتملة":
          return (
            <div className="flex items-center text-green-600">
              <CheckCircle className="ml-1 h-3 w-3" /> {status}
            </div>
          );
        case "متأخرة":
          return (
            <div className="flex items-center text-red-600">
              <AlertCircle className="ml-1 h-3 w-3" /> {status}
            </div>
          );
        default:
          return <div>{status}</div>;
      }
    };

    // Priority renderer
    const renderPriority = (priority: string) => {
      switch (priority) {
        case "عالية":
          return <div className="text-red-600">{priority}</div>;
        case "متوسطة":
          return <div className="text-orange-600">{priority}</div>;
        case "منخفضة":
          return <div className="text-green-600">{priority}</div>;
        default:
          return <div>{priority}</div>;
      }
    };

    return (
      <div ref={ref} className="p-8 bg-white" dir="rtl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">تفاصيل المهمة</h1>
          <p className="text-gray-500">
            تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>

        <div className="border-t border-b py-4 mb-6">
          <h2 className="text-xl font-bold mb-2">{task.title}</h2>
          <div className="flex justify-between items-center">
            <div>{renderStatus(task.status)}</div>
            <div>رقم المهمة: {task.id}</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="font-semibold mb-1">وصف المهمة:</h3>
            <p className="text-gray-700 border p-2 rounded">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">المسؤول:</h3>
              <p className="text-gray-700">{task.assignedTo}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">الأولوية:</h3>
              <div>{renderPriority(task.priority)}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">تاريخ الاستحقاق:</h3>
            <p className="text-gray-700">
              {new Date(task.dueDate).toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-500 text-center text-sm">
            نظام إدارة الموارد البشرية - قسم المهام
          </p>
        </div>
      </div>
    );
  },
);

TaskPrint.displayName = "TaskPrint";

export default TaskPrint;
