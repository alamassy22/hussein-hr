import React from "react";
import { Bell, Calendar, Search, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  date?: string;
  notifications?: number;
}

const DashboardHeader = ({
  userName = "محمد أحمد",
  userRole = "مدير الموارد البشرية",
  date = "الأحد، 15 مايو 2023",
  notifications = 3,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  // الحصول على بيانات المستخدم من localStorage إذا كانت متوفرة
  const [currentUserName, setCurrentUserName] = React.useState(userName);
  const [currentUserRole, setCurrentUserRole] = React.useState(userRole);

  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserName(user.fullName || user.username || userName);
      setCurrentUserRole(user.role || userRole);
    }
  }, [userName, userRole]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNotificationClick = (id: number) => {
    // Handle notification click
    console.log(`Notification ${id} clicked`);
  };
  return (
    <header className="bg-white w-full p-4 shadow-sm border-b flex items-center justify-between rtl">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            className="w-64 pr-10 rounded-lg bg-gray-50 placeholder:text-right"
            placeholder="بحث..."
            dir="rtl"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={18} />
          <span className="text-sm">{date}</span>
        </div>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rtl">
              {notifications > 0 ? (
                <>
                  <div className="p-2 font-medium border-b">
                    الإشعارات ({notifications})
                  </div>
                  <DropdownMenuItem onClick={() => handleNotificationClick(1)}>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">طلب إجازة جديد</span>
                      <span className="text-xs text-gray-500">
                        قام أحمد محمد بتقديم طلب إجازة
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNotificationClick(2)}>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">تذكير: هوية منتهية</span>
                      <span className="text-xs text-gray-500">
                        هناك 3 هويات ستنتهي قريباً
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNotificationClick(3)}>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">طلب صيانة</span>
                      <span className="text-xs text-gray-500">
                        تم الموافقة على طلب الصيانة #12345
                      </span>
                    </div>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  لا توجد إشعارات جديدة
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          title="تسجيل الخروج"
        >
          <LogOut size={20} className="text-gray-600" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="font-medium text-gray-900">{currentUserName}</h3>
            <p className="text-xs text-gray-500">{currentUserRole}</p>
          </div>
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt={userName}
            />
            <AvatarFallback className="bg-primary-100">
              <User className="text-primary-700" size={20} />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
