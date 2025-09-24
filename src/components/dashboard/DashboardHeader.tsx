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
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  date?: string;
  notifications?: number;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "leave" | "maintenance" | "expired_id" | "task" | "general";
  targetRoute?: string;
  targetId?: string;
  timestamp: string;
  isRead: boolean;
}

const DashboardHeader = ({
  userName = "محمد أحمد",
  userRole = "مدير الموارد البشرية",
  date = "الأحد، 15 مايو 2023",
  notifications = 3,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // الحصول على بيانات المستخدم من localStorage إذا كانت متوفرة
  const [currentUserName, setCurrentUserName] = React.useState(userName);
  const [currentUserRole, setCurrentUserRole] = React.useState(userRole);
  const [realNotifications, setRealNotifications] = React.useState<Notification[]>([]);

  // Load notifications from localStorage
  React.useEffect(() => {
    const loadNotifications = () => {
      try {
        const savedNotifications = localStorage.getItem('hrms_notifications');
        if (savedNotifications) {
          setRealNotifications(JSON.parse(savedNotifications));
        } else {
          // Create sample notifications based on user role
          const sampleNotifications: Notification[] = [];
          
          if (user?.role === "super_admin" || user?.role === "org_admin") {
            sampleNotifications.push(
              {
                id: 1,
                title: "طلب إجازة جديد",
                message: "قام أحمد محمد بتقديم طلب إجازة سنوية",
                type: "leave",
                targetRoute: "/leaves",
                targetId: "1",
                timestamp: new Date().toISOString(),
                isRead: false,
              },
              {
                id: 2,
                title: "تذكير: هويات منتهية",
                message: "هناك 3 هويات ستنتهي خلال 30 يوم",
                type: "expired_id",
                targetRoute: "/reports",
                targetId: "expired-ids",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                isRead: false,
              },
              {
                id: 3,
                title: "طلب صيانة جديد",
                message: "تم تقديم طلب صيانة لمكيف الهواء في الطابق الثاني",
                type: "maintenance",
                targetRoute: "/maintenance",
                targetId: "1",
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                isRead: false,
              }
            );
          } else {
            sampleNotifications.push(
              {
                id: 1,
                title: "مهمة جديدة",
                message: "تم تعيين مهمة جديدة لك: مراجعة التقارير الشهرية",
                type: "task",
                targetRoute: "/tasks",
                targetId: "1",
                timestamp: new Date().toISOString(),
                isRead: false,
              },
              {
                id: 2,
                title: "تذكير: انتهاء الهوية",
                message: "هويتك الشخصية ستنتهي خلال 15 يوم",
                type: "expired_id",
                targetRoute: "/dashboard",
                targetId: "",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                isRead: false,
              }
            );
          }
          
          setRealNotifications(sampleNotifications);
          localStorage.setItem('hrms_notifications', JSON.stringify(sampleNotifications));
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
        setRealNotifications([]);
      }
    };

    loadNotifications();
  }, [user?.role]);

  // Save notifications to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('hrms_notifications', JSON.stringify(realNotifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }, [realNotifications]);

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

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    const updatedNotifications = realNotifications.map(notif =>
      notif.id === notification.id ? { ...notif, isRead: true } : notif
    );
    setRealNotifications(updatedNotifications);

    // Navigate to the target route
    if (notification.targetRoute) {
      if (notification.type === "expired_id" && notification.targetRoute === "/reports") {
        // Navigate to reports page and switch to expired IDs tab
        navigate("/reports");
        // Use setTimeout to ensure the page loads before trying to switch tabs
        setTimeout(() => {
          const expiredIdsTab = document.querySelector('[value="expired-ids"]');
          if (expiredIdsTab) {
            (expiredIdsTab as HTMLElement).click();
          }
        }, 100);
      } else if (notification.targetId) {
        // Navigate with state to highlight specific item
        navigate(notification.targetRoute, { 
          state: { 
            highlightId: notification.targetId,
            notificationType: notification.type 
          } 
        });
      } else {
        navigate(notification.targetRoute);
      }
    }
  };

  const unreadNotifications = realNotifications.filter(notif => !notif.isRead);
  const notificationCount = unreadNotifications.length;

  const formatNotificationTime = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "الآن";
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `منذ ${diffInDays} يوم`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "leave":
        return "📅";
      case "maintenance":
        return "🔧";
      case "expired_id":
        return "⚠️";
      case "task":
        return "📋";
      default:
        return "📢";
    }
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
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rtl max-h-96 overflow-y-auto">
              {realNotifications.length > 0 ? (
                <>
                  <div className="p-2 font-medium border-b">
                    الإشعارات ({notificationCount} غير مقروءة)
                  </div>
                  {realNotifications.slice(0, 10).map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`cursor-pointer hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <span className="text-lg mt-1">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium text-sm ${!notification.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                              {notification.title}
                            </span>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatNotificationTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {realNotifications.length > 10 && (
                    <div className="p-2 text-center border-t">
                      <Button variant="ghost" size="sm" className="text-xs">
                        عرض جميع الإشعارات
                      </Button>
                    </div>
                  )}
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
