import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Clock,
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "default" | "blue" | "green" | "yellow" | "red";
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  color = "default",
}: StatCardProps) => {
  const colorClasses = {
    default: "bg-white",
    blue: "bg-blue-50",
    green: "bg-green-50",
    yellow: "bg-amber-50",
    red: "bg-red-50",
  };

  const iconColorClasses = {
    default: "text-gray-500 bg-gray-100",
    blue: "text-blue-500 bg-blue-100",
    green: "text-green-500 bg-green-100",
    yellow: "text-amber-500 bg-amber-100",
    red: "text-red-500 bg-red-100",
  };

  const trendIcon =
    trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : trend === "down" ? (
      <TrendingDown className="h-4 w-4 text-red-500" />
    ) : null;

  return (
    <Card className={`${colorClasses[color]} border shadow-sm`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
            {trend && trendValue && (
              <div className="flex items-center gap-1 mt-2">
                {trendIcon}
                <span
                  className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconColorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatisticsCardsProps {
  className?: string;
}

const StatisticsCards = ({ className }: StatisticsCardsProps) => {
  // Mock data for dashboard
  const stats = [
    {
      title: "إجمالي الموظفين",
      value: 248,
      icon: <Users className="h-6 w-6" />,
      trend: "up" as const,
      trendValue: "+12% من الشهر الماضي",
      color: "blue" as const,
    },
    {
      title: "الحضور اليوم",
      value: "92%",
      icon: <Clock className="h-6 w-6" />,
      description: "228 من 248 موظف",
      color: "green" as const,
    },
    {
      title: "الإجازات النشطة",
      value: 15,
      icon: <Calendar className="h-6 w-6" />,
      color: "yellow" as const,
    },
    {
      title: "هويات منتهية",
      value: 8,
      icon: <AlertTriangle className="h-6 w-6" />,
      trend: "down" as const,
      trendValue: "-3 من الشهر الماضي",
      color: "red" as const,
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatisticsCards;
