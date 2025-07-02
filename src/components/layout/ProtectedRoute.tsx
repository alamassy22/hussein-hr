import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserPermissions } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: (keyof UserPermissions)[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
}) => {
  const location = useLocation();
  const { user, hasPermission, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        جاري التحميل...
      </div>
    );
  }

  // إذا لم يكن المستخدم مصادق، قم بتوجيهه إلى صفحة تسجيل الدخول
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // التحقق من الصلاحيات إذا كانت مطلوبة
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some((permission) =>
      hasPermission(permission),
    );

    // إذا كان المستخدم لا يملك الصلاحيات المطلوبة، قم بتوجيهه إلى لوحة التحكم
    if (!hasRequiredPermission) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  }

  // إذا كان المستخدم مصادق ويملك الصلاحيات المطلوبة، اعرض المحتوى
  return <>{children}</>;
};

export default ProtectedRoute;
