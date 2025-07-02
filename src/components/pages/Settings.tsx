import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  User,
  Save,
  Settings2,
  MapPin,
  Layers,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import CompanySettingsForm from "../settings/CompanySettingsForm";
import UserForm from "../settings/UserForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings = () => {
  const [branches, setBranches] = useState([
    { id: 1, name: "الفرع الرئيسي", location: "الرياض", manager: "أحمد محمد" },
    { id: 2, name: "فرع الشرقية", location: "الدمام", manager: "خالد عبدالله" },
  ]);

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "الموارد البشرية",
      manager: "سارة أحمد",
      employeesCount: 12,
    },
    { id: 2, name: "المالية", manager: "محمد علي", employeesCount: 8 },
    { id: 3, name: "تقنية المعلومات", manager: "فهد سعود", employeesCount: 15 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: "admin", fullName: "مدير النظام", role: "admin" },
    { id: 2, username: "manager1", fullName: "أحمد محمد", role: "manager" },
    { id: 3, username: "user1", fullName: "محمد علي", role: "user" },
    {
      id: 4,
      username: "employee1",
      fullName: "خالد عبدالله",
      role: "employee",
    },
  ]);

  // تحميل المستخدمين المخزنين في localStorage عند تحميل الصفحة
  React.useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("systemUsers") || "[]");
    if (storedUsers.length > 0) {
      // دمج المستخدمين الافتراضيين مع المستخدمين المخزنين
      const defaultUsernames = users.map((u) => u.username);
      const newUsers = [...users];
      let maxId = users.length;

      storedUsers.forEach((storedUser) => {
        if (!defaultUsernames.includes(storedUser.username)) {
          maxId++;
          newUsers.push({
            id: maxId,
            username: storedUser.username,
            fullName: storedUser.fullName,
            role: storedUser.role,
          });
        }
      });

      setUsers(newUsers);
    }
  }, []);

  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    manager: "",
  });
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    manager: "",
    employeesCount: 0,
  });
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.location) {
      setBranches([...branches, { id: branches.length + 1, ...newBranch }]);
      setNewBranch({ name: "", location: "", manager: "" });
      setIsAddBranchOpen(false);
    }
  };

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.manager) {
      setDepartments([
        ...departments,
        { id: departments.length + 1, ...newDepartment },
      ]);
      setNewDepartment({ name: "", manager: "", employeesCount: 0 });
      setIsAddDepartmentOpen(false);
    }
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setNewBranch({
      name: branch.name,
      location: branch.location,
      manager: branch.manager,
    });
    setIsAddBranchOpen(true);
  };

  const handleEditDepartment = (dept) => {
    setEditingDepartment(dept);
    setNewDepartment({
      name: dept.name,
      manager: dept.manager,
      employeesCount: dept.employeesCount,
    });
    setIsAddDepartmentOpen(true);
  };

  const handleSaveEditBranch = () => {
    if (editingBranch && newBranch.name && newBranch.location) {
      setBranches(
        branches.map((branch) =>
          branch.id === editingBranch.id ? { ...branch, ...newBranch } : branch,
        ),
      );
      setNewBranch({ name: "", location: "", manager: "" });
      setEditingBranch(null);
      setIsAddBranchOpen(false);
    }
  };

  const handleSaveEditDepartment = () => {
    if (editingDepartment && newDepartment.name && newDepartment.manager) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDepartment.id
            ? { ...dept, ...newDepartment }
            : dept,
        ),
      );
      setNewDepartment({ name: "", manager: "", employeesCount: 0 });
      setEditingDepartment(null);
      setIsAddDepartmentOpen(false);
    }
  };

  const handleAddUser = (userData) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user,
        ),
      );
      setEditingUser(null);

      // تحديث بيانات المستخدم في localStorage
      const storedUsers = JSON.parse(
        localStorage.getItem("systemUsers") || "[]",
      );
      const userIndex = storedUsers.findIndex(
        (u) => u.username === editingUser.username,
      );

      if (userIndex !== -1) {
        storedUsers[userIndex] = {
          ...storedUsers[userIndex],
          username: userData.username,
          password: userData.password,
          role: userData.role,
          fullName: userData.fullName,
          permissions: userData.permissions,
        };
        localStorage.setItem("systemUsers", JSON.stringify(storedUsers));
      }
    } else {
      // إضافة المستخدم الجديد إلى قائمة المستخدمين
      const newUser = { id: users.length + 1, ...userData };
      setUsers([...users, newUser]);

      // حفظ بيانات المستخدم في localStorage للسماح بتسجيل الدخول
      const storedUsers = JSON.parse(
        localStorage.getItem("systemUsers") || "[]",
      );
      storedUsers.push({
        username: userData.username,
        password: userData.password,
        role: userData.role,
        fullName: userData.fullName,
        permissions: userData.permissions,
      });
      localStorage.setItem("systemUsers", JSON.stringify(storedUsers));
    }
    setIsAddUserOpen(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsAddUserOpen(true);
  };

  // تحديث بيانات المستخدم في localStorage عند تعديله
  React.useEffect(() => {
    if (editingUser) {
      const storedUsers = JSON.parse(
        localStorage.getItem("systemUsers") || "[]",
      );
      const userIndex = storedUsers.findIndex(
        (u) => u.username === editingUser.username,
      );

      if (userIndex !== -1) {
        // تحديث بيانات المستخدم في localStorage
        storedUsers[userIndex] = {
          ...storedUsers[userIndex],
          fullName: editingUser.fullName,
          role: editingUser.role,
        };
        localStorage.setItem("systemUsers", JSON.stringify(storedUsers));
      }
    }
  }, [editingUser]);

  const handleDeleteUser = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    if (!userToDelete) return;

    // حذف المستخدم من قائمة المستخدمين
    setUsers(users.filter((user) => user.id !== id));

    // حذف المستخدم من localStorage
    const storedUsers = JSON.parse(localStorage.getItem("systemUsers") || "[]");
    const updatedUsers = storedUsers.filter(
      (user) => user.username !== userToDelete.username,
    );
    localStorage.setItem("systemUsers", JSON.stringify(updatedUsers));
  };

  return (
    <MainLayout title="الإعدادات" subtitle="إدارة إعدادات النظام">
      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              بيانات الشركة
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              إعدادات المستخدمين
            </TabsTrigger>
            <TabsTrigger value="branches" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              إدارة الفروع
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="flex items-center gap-2"
            >
              <Layers className="h-4 w-4" />
              إدارة الأقسام
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <CompanySettingsForm />
          </TabsContent>

          <TabsContent value="user">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  إعدادات المستخدمين
                </CardTitle>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      إضافة مستخدم جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingUser ? "تعديل مستخدم" : "إضافة مستخدم جديد"}
                      </DialogTitle>
                    </DialogHeader>
                    <UserForm
                      onSubmit={handleAddUser}
                      onCancel={() => setIsAddUserOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger
                        value="users"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        المستخدمين
                      </TabsTrigger>
                      <TabsTrigger
                        value="general"
                        className="flex items-center gap-2"
                      >
                        <Settings2 className="h-4 w-4" />
                        إعدادات عامة
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="users">
                      <div className="space-y-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">
                                رقم المستخدم
                              </TableHead>
                              <TableHead>اسم المستخدم</TableHead>
                              <TableHead>الاسم الكامل</TableHead>
                              <TableHead>الدور الوظيفي</TableHead>
                              <TableHead className="text-left">
                                الإجراءات
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {users.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                  {user.id}
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>
                                  {user.role === "admin"
                                    ? "مدير النظام"
                                    : user.role === "manager"
                                      ? "مدير"
                                      : user.role === "employee"
                                        ? "موظف"
                                        : "مستخدم"}
                                </TableCell>
                                <TableCell className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditUser(user)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    <TabsContent value="general">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="defaultLanguage">
                            اللغة الافتراضية
                          </Label>
                          <select
                            id="defaultLanguage"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="ar">العربية</option>
                            <option value="en">الإنجليزية</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeZone">المنطقة الزمنية</Label>
                          <select
                            id="timeZone"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="asia/riyadh">
                              توقيت الرياض (GMT+3)
                            </option>
                            <option value="asia/dubai">
                              توقيت دبي (GMT+4)
                            </option>
                            <option value="africa/cairo">
                              توقيت القاهرة (GMT+2)
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2 mt-6">
                        <Label htmlFor="notificationSettings">
                          إعدادات الإشعارات
                        </Label>
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <input
                              type="checkbox"
                              id="emailNotifications"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label
                              htmlFor="emailNotifications"
                              className="text-sm font-normal"
                            >
                              تفعيل إشعارات البريد الإلكتروني
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <input
                              type="checkbox"
                              id="smsNotifications"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label
                              htmlFor="smsNotifications"
                              className="text-sm font-normal"
                            >
                              تفعيل إشعارات الرسائل النصية
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <input
                              type="checkbox"
                              id="systemNotifications"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label
                              htmlFor="systemNotifications"
                              className="text-sm font-normal"
                            >
                              تفعيل إشعارات النظام
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mt-6">
                        <Label htmlFor="securitySettings">إعدادات الأمان</Label>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="passwordExpiry"
                              className="text-sm font-normal"
                            >
                              مدة صلاحية كلمة المرور (بالأيام)
                            </Label>
                            <Input
                              id="passwordExpiry"
                              type="number"
                              min="30"
                              max="180"
                              defaultValue="90"
                            />
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <input
                              type="checkbox"
                              id="twoFactorAuth"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label
                              htmlFor="twoFactorAuth"
                              className="text-sm font-normal"
                            >
                              تفعيل المصادقة الثنائية
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="flex justify-end">
                        <Button className="flex items-center gap-2">
                          <Settings2 className="h-4 w-4" />
                          حفظ الإعدادات
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branches">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  إدارة الفروع
                </CardTitle>
                <Dialog
                  open={isAddBranchOpen}
                  onOpenChange={setIsAddBranchOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      إضافة فرع جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingBranch ? "تعديل فرع" : "إضافة فرع جديد"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="branchName">اسم الفرع</Label>
                        <Input
                          id="branchName"
                          placeholder="أدخل اسم الفرع"
                          value={newBranch.name}
                          onChange={(e) =>
                            setNewBranch({ ...newBranch, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchLocation">موقع الفرع</Label>
                        <Input
                          id="branchLocation"
                          placeholder="أدخل موقع الفرع"
                          value={newBranch.location}
                          onChange={(e) =>
                            setNewBranch({
                              ...newBranch,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchManager">مدير الفرع</Label>
                        <Input
                          id="branchManager"
                          placeholder="أدخل اسم مدير الفرع"
                          value={newBranch.manager}
                          onChange={(e) =>
                            setNewBranch({
                              ...newBranch,
                              manager: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={
                          editingBranch ? handleSaveEditBranch : handleAddBranch
                        }
                      >
                        {editingBranch ? "حفظ التعديلات" : "إضافة الفرع"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">رقم الفرع</TableHead>
                        <TableHead>اسم الفرع</TableHead>
                        <TableHead>الموقع</TableHead>
                        <TableHead>مدير الفرع</TableHead>
                        <TableHead className="text-left">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {branches.map((branch) => (
                        <TableRow key={branch.id}>
                          <TableCell className="font-medium">
                            {branch.id}
                          </TableCell>
                          <TableCell>{branch.name}</TableCell>
                          <TableCell>{branch.location}</TableCell>
                          <TableCell>{branch.manager}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditBranch(branch)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteBranch(branch.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  إدارة الأقسام
                </CardTitle>
                <Dialog
                  open={isAddDepartmentOpen}
                  onOpenChange={setIsAddDepartmentOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      إضافة قسم جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingDepartment ? "تعديل قسم" : "إضافة قسم جديد"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="departmentName">اسم القسم</Label>
                        <Input
                          id="departmentName"
                          placeholder="أدخل اسم القسم"
                          value={newDepartment.name}
                          onChange={(e) =>
                            setNewDepartment({
                              ...newDepartment,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="departmentManager">مدير القسم</Label>
                        <Input
                          id="departmentManager"
                          placeholder="أدخل اسم مدير القسم"
                          value={newDepartment.manager}
                          onChange={(e) =>
                            setNewDepartment({
                              ...newDepartment,
                              manager: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeesCount">عدد الموظفين</Label>
                        <Input
                          id="employeesCount"
                          type="number"
                          placeholder="أدخل عدد الموظفين"
                          value={newDepartment.employeesCount}
                          onChange={(e) =>
                            setNewDepartment({
                              ...newDepartment,
                              employeesCount: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={
                          editingDepartment
                            ? handleSaveEditDepartment
                            : handleAddDepartment
                        }
                      >
                        {editingDepartment ? "حفظ التعديلات" : "إضافة القسم"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">رقم القسم</TableHead>
                        <TableHead>اسم القسم</TableHead>
                        <TableHead>مدير القسم</TableHead>
                        <TableHead>عدد الموظفين</TableHead>
                        <TableHead className="text-left">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departments.map((dept) => (
                        <TableRow key={dept.id}>
                          <TableCell className="font-medium">
                            {dept.id}
                          </TableCell>
                          <TableCell>{dept.name}</TableCell>
                          <TableCell>{dept.manager}</TableCell>
                          <TableCell>{dept.employeesCount}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditDepartment(dept)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteDepartment(dept.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
