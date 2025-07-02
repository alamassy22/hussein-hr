import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskDetail from "./TaskDetail";

const TaskStoryboard = () => {
  const [viewMode, setViewMode] = useState<"form" | "detail">("form");

  const sampleTask = {
    id: 1,
    title: "مراجعة طلبات التوظيف",
    description: "مراجعة طلبات التوظيف الجديدة وتحديد المرشحين للمقابلات",
    assignedTo: "أحمد محمد",
    priority: "عالية",
    status: "قيد التنفيذ",
    dueDate: "2023-06-15",
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => setViewMode("form")}
          className={`px-4 py-2 rounded ${viewMode === "form" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          نموذج المهمة
        </button>
        <button
          onClick={() => setViewMode("detail")}
          className={`px-4 py-2 rounded ${viewMode === "detail" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          تفاصيل المهمة
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {viewMode === "form" ? (
          <TaskForm
            initialData={sampleTask}
            isEditing={true}
            onSubmit={(data) => console.log(data)}
            onCancel={() => console.log("Cancelled")}
          />
        ) : (
          <TaskDetail
            task={sampleTask}
            onEdit={() => setViewMode("form")}
            onClose={() => console.log("Closed")}
            onPrint={() => console.log("Print requested")}
          />
        )}
      </div>
    </div>
  );
};

export default TaskStoryboard;
