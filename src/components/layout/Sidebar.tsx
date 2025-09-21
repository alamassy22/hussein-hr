import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  ClipboardCheck,
  CalendarDays,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Layers3,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  label,
  isActive = false,
  isCollapsed = false,
  onClick,
}: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start gap-3 text-right",
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50",
              isCollapsed ? "px-2" : "px-4",
            )}
            onClick={onClick}
          >
            {icon}
            {!isCollapsed && <span className="flex-1 text-right">{label}</span>}
          </Button>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="left" className="font-medium">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();
  const isEmployee = user?.role === "employee";

  // Extract the active route from the current path
  const currentPath = location.pathname.split("/")[1] || "dashboard";
  const [activeItem, setActiveItem] = useState(currentPath);

  // Update active item when location changes
  useEffect(() => {
    const path = location.pathname.split("/")[1] || "dashboard";
    setActiveItem(path);
  }, [location]);

  const handleNavigation = (route: string) => {
    setActiveItem(route);
    navigate(`/${route}`);
  };

  // Define all navigation items with permission checks
  const allNavItems = [
    {
      id: "dashboard",
      icon: <Home size={20} />,
      label: "الرئيسية",
      permission: null,
    },
    {
      id: "employees",
      icon: <Users size={20} />,
      label: "الموظفين",
      permission: null, // Always show for super admin
    },
    {
      id: "attendance",
      icon: <ClipboardCheck size={20} />,
      label: "الحضور",
      permission: null, // Always show for super admin
    },
    {
      id: "leaves",
      icon: <CalendarDays size={20} />,
      label: "الإجازات",
      permission: null, // Always show for super admin
    },
    {
      id: "resignations",
      icon: <FileText size={20} />,
      label: "الاستقالات",
      permission: null, // Always show for super admin
    },
    {
      id: "recruitment",
      icon: <Users size={20} />,
      label: "التوظيف",
      permission: null, // Always show for super admin
    },
    {
      id: "training",
      icon: <FileText size={20} />,
      label: "التدريب",
      permission: null, // Always show for super admin
    },
    {
      id: "organizational-structure",
      icon: <Layers3 size={20} />,
      label: "الهيكل التنظيمي",
      permission: null, // Always show for super admin
    },
    {
      id: "planning-and-execution",
      icon: <BarChart3 size={20} />,
      label: "التخطيط والتنفيذ",
      permission: null, // Always show for super admin
    },
    {
      id: "tasks",
      icon: <ClipboardCheck size={20} />,
      label: "إدارة المهام",
      permission: null, // Always show for super admin
    },
    {
      id: "maintenance",
      icon: <Settings size={20} />,
      label: "التشغيل والصيانة",
      permission: null, // Always show for super admin
    },
    {
      id: "vehicles",
      icon: <FileText size={20} />,
      label: "إدارة السيارات",
      permission: null, // Always show for super admin
    },
    {
      id: "letters-and-notices",
      icon: <FileText size={20} />,
      label: "الخطابات والإشعارات",
      permission: null,
    },
    {
      id: "custody",
      icon: <Shield size={20} />,
      label: "إدارة العهد",
      permission: null,
    },
    {
      id: "payroll",
      icon: <DollarSign size={20} />,
      label: "المرتبات",
      permission: null, // Always show for super admin
    },
    {
      id: "reports",
      icon: <BarChart3 size={20} />,
      label: "التقارير",
      permission: null, // Always show for super admin
    },
    {
      id: "super-admin",
      icon: <Settings size={20} />,
      label: "لوحة المسؤول العام",
      permission: null, // Will be filtered by role check
    },
  ];

  // Filter navigation items based on permissions
  const navItems = allNavItems.filter((item) => {
    // Special handling for super admin dashboard
    if (item.id === "super-admin") {
      return user?.role === "super_admin";
    }
    
    // For super admin, show all items
    if (user?.role === "super_admin") {
      return true;
    }
    
    // For other users, check permissions
    if (!item.permission) return true;
    return hasPermission(item.permission as any);
  });

  // Customize labels for employees
  const customizedNavItems = navItems.map((item) => {
    if (isEmployee) {
      switch (item.id) {
        case "dashboard":
          return { ...item, label: "البيانات الشخصية" };
        case "attendance":
          return { ...item, label: "الحضور والانصراف" };
        case "leaves":
          return { ...item, label: "الطلبات" };
        case "tasks":
          return { ...item, label: "المهام" };
        default:
          return item;
      }
    }
    return item;
  });

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-background border-l border-border",
        collapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out",
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-right w-full">
            نظام الموارد البشرية
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          aria-label={collapsed ? "توسيع" : "طي"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4 px-2">
        <nav className="flex flex-col gap-1">
          {customizedNavItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.id}
              isCollapsed={collapsed}
              onClick={() => handleNavigation(item.id)}
            />
          ))}
        </nav>
      </div>

      <div className="border-t p-2">
        <nav className="flex flex-col gap-1">
          <NavItem
            icon={<LogOut size={20} />}
            label="تسجيل الخروج"
            isCollapsed={collapsed}
            onClick={logout}
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
