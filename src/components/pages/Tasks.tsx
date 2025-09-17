import { useState, useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Printer,
} from "lucide-react";
import TaskForm from "@/components/tasks/TaskForm";
import TaskDetail from "@/components/tasks/TaskDetail";
import TaskPrint from "@/components/tasks/TaskPrint";
import { useReactToPrint } from "react-to-print";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef(null);
  const taskListPrintRef = useRef(null);

  // Sample tasks data
  const initialTasks = [
    {
      id: 1,
      title: "مراجعة طلبات التوظيف",
      description: "مراجعة طلبات التوظيف الجديدة وتحديد المرشحين للمقابلات",
      assignedTo: "أحمد محمد",
      priority: "عالية",
      status: "قيد التنفيذ",
      dueDate: "2023-06-15",
    },
    {
      id: 2,
      title: "تحديث سياسة الإجازات",
      description:
        "تحديث سياسة الإجازات وفقًا للتغييرات الجديدة في قانون العمل",
      assignedTo: "سارة أحمد",
      priority: "متوسطة",
      status: "مكتملة",
      dueDate: "2023-06-10",
    },
    {
      id: 3,
      title: "إعداد تقرير الأداء الشهري",
      description: "إعداد تقرير الأداء الشهري لقسم الموارد البشرية",
      assignedTo: "محمد علي",
      priority: "عالية",
      status: "متأخرة",
      dueDate: "2023-06-05",
    },
    {
      id: 4,
      title: "تنظيم ورشة عمل للموظفين الجدد",
      description: "تنظيم ورشة عمل تعريفية للموظفين الجدد حول سياسات الشركة",
      assignedTo: "فاطمة محمد",
      priority: "منخفضة",
      status: "قيد التنفيذ",
      dueDate: "2023-06-20",
    },
    {
      id: 5,
      title: "مراجعة عقود الموظفين",
      description: "مراجعة وتحديث عقود الموظفين وفقًا للتغييرات الجديدة",
      assignedTo: "خالد أحمد",
      priority: "متوسطة",
      status: "قيد التنفيذ",
      dueDate: "2023-06-18",
    },
  ];

  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on component mount
  React.useEffect(() => {
    const savedTasks = localStorage.getItem('hrms_tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks(initialTasks);
      }
    } else {
      setTasks(initialTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  // Filter tasks based on active tab and search term
  const filteredTasks = tasks.filter((task) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "inProgress" && task.status === "قيد التنفيذ") ||
      (activeTab === "completed" && task.status === "مكتملة") ||
      (activeTab === "overdue" && task.status === "متأخرة");

    const matchesSearch =
      searchTerm === "" ||
      task.title.includes(searchTerm) ||
      task.description.includes(searchTerm) ||
      task.assignedTo.includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  // Handle adding a new task
  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: tasks.length + 1,
      dueDate: taskData.dueDate.toISOString().split("T")[0],
    };
    setTasks([...tasks, newTask]);
    setIsAddDialogOpen(false);
  };

  // Handle updating a task
  const handleUpdateTask = (taskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id
        ? {
            ...task,
            ...taskData,
            dueDate: taskData.dueDate.toISOString().split("T")[0],
          }
        : task,
    );
    setTasks(updatedTasks);
    setIsEditDialogOpen(false);
  };

  // Handle viewing a task
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewDialogOpen(true);
  };

  // Handle editing a task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  // Handle printing a task
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `مهمة - ${selectedTask?.title || "تفاصيل المهمة"}`,
  });

  // Handle printing task list
  const handlePrintTaskList = useReactToPrint({
    content: () => taskListPrintRef.current,
    documentTitle: "قائمة المهام",
  });

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "قيد التنفيذ":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "مكتملة":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "متأخرة":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Priority badge renderer
  const renderPriorityBadge = (priority) => {
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
    <div className="container mx-auto p-6 bg-background" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المهام</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> مهمة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>المهام</CardTitle>
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrintTaskList}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">جميع المهام</TabsTrigger>
                <TabsTrigger value="inProgress">قيد التنفيذ</TabsTrigger>
                <TabsTrigger value="completed">مكتملة</TabsTrigger>
                <TabsTrigger value="overdue">متأخرة</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <TasksTable
                  tasks={filteredTasks}
                  renderStatusBadge={renderStatusBadge}
                  renderPriorityBadge={renderPriorityBadge}
                  onView={handleViewTask}
                  onEdit={handleEditTask}
                />
              </TabsContent>

              <TabsContent value="inProgress" className="mt-0">
                <TasksTable
                  tasks={filteredTasks}
                  renderStatusBadge={renderStatusBadge}
                  renderPriorityBadge={renderPriorityBadge}
                  onView={handleViewTask}
                  onEdit={handleEditTask}
                />
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <TasksTable
                  tasks={filteredTasks}
                  renderStatusBadge={renderStatusBadge}
                  renderPriorityBadge={renderPriorityBadge}
                  onView={handleViewTask}
                  onEdit={handleEditTask}
                />
              </TabsContent>

              <TabsContent value="overdue" className="mt-0">
                <TasksTable
                  tasks={filteredTasks}
                  renderStatusBadge={renderStatusBadge}
                  renderPriorityBadge={renderPriorityBadge}
                  onView={handleViewTask}
                  onEdit={handleEditTask}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>إضافة مهمة جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل المهمة الجديدة أدناه.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* View Task Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedTask && (
            <TaskDetail
              task={selectedTask}
              onEdit={() => {
                setIsViewDialogOpen(false);
                setIsEditDialogOpen(true);
              }}
              onClose={() => setIsViewDialogOpen(false)}
              onPrint={handlePrint}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تعديل المهمة</DialogTitle>
            <DialogDescription>
              قم بتعديل تفاصيل المهمة أدناه.
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <TaskForm
              initialData={selectedTask}
              isEditing={true}
              onSubmit={handleUpdateTask}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Hidden Print Components */}
      <div className="hidden">
        {selectedTask && <TaskPrint ref={printRef} task={selectedTask} />}
        <TaskListPrintForwarded
          ref={taskListPrintRef}
          tasks={filteredTasks}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

// TaskListPrint Component
const TaskListPrint = ({ tasks, activeTab }, ref) => {
  const getTabTitle = (tab) => {
    switch (tab) {
      case "all":
        return "جميع المهام";
      case "inProgress":
        return "المهام قيد التنفيذ";
      case "completed":
        return "المهام المكتملة";
      case "overdue":
        return "المهام المتأخرة";
      default:
        return "قائمة المهام";
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "قيد التنفيذ":
        return <span className="text-blue-600">{status}</span>;
      case "مكتملة":
        return <span className="text-green-600">{status}</span>;
      case "متأخرة":
        return <span className="text-red-600">{status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const renderPriority = (priority) => {
    switch (priority) {
      case "عالية":
        return <span className="text-red-600">{priority}</span>;
      case "متوسطة":
        return <span className="text-orange-600">{priority}</span>;
      case "منخفضة":
        return <span className="text-green-600">{priority}</span>;
      default:
        return <span>{priority}</span>;
    }
  };

  return (
    <div ref={ref} className="p-8 bg-white" dir="rtl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{getTabTitle(activeTab)}</h1>
        <p className="text-gray-500">
          تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
        </p>
        <p className="text-gray-500">عدد المهام: {tasks.length}</p>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 p-2 text-right">
              عنوان المهمة
            </th>
            <th className="border border-gray-300 p-2 text-right">المسؤول</th>
            <th className="border border-gray-300 p-2 text-right">الأولوية</th>
            <th className="border border-gray-300 p-2 text-right">الحالة</th>
            <th className="border border-gray-300 p-2 text-right">
              تاريخ الاستحقاق
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="border border-gray-300 p-4 text-center"
              >
                لا توجد مهام متطابقة مع معايير البحث
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td className="border border-gray-300 p-2 font-medium">
                  {task.title}
                </td>
                <td className="border border-gray-300 p-2">
                  {task.assignedTo}
                </td>
                <td className="border border-gray-300 p-2">
                  {renderPriority(task.priority)}
                </td>
                <td className="border border-gray-300 p-2">
                  {renderStatus(task.status)}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(task.dueDate).toLocaleDateString("ar-SA")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="border-t pt-4 mt-6">
        <p className="text-gray-500 text-center text-sm">
          نظام إدارة الموارد البشرية - قسم المهام
        </p>
      </div>
    </div>
  );
};

const TaskListPrintForwarded = forwardRef(TaskListPrint);

// TasksTable Component
const TasksTable = ({
  tasks,
  renderStatusBadge,
  renderPriorityBadge,
  onView,
  onEdit,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">عنوان المهمة</TableHead>
          <TableHead className="text-right">المسؤول</TableHead>
          <TableHead className="text-right">الأولوية</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
          <TableHead className="text-right">الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              لا توجد مهام متطابقة مع معايير البحث
            </TableCell>
          </TableRow>
        ) : (
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{renderPriorityBadge(task.priority)}</TableCell>
              <TableCell>{renderStatusBadge(task.status)}</TableCell>
              <TableCell>
                {new Date(task.dueDate).toLocaleDateString("ar-SA")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(task)}
                  >
                    عرض
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(task)}
                  >
                    تعديل
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default Tasks;
