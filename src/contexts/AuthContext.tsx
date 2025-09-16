import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, signOut, UserType } from "@/lib/supabase";

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface UserPermissions {
  canViewEmployees: boolean;
  canEditEmployees: boolean;
  canDeleteEmployees: boolean;
  canViewAttendance: boolean;
  canManageAttendance: boolean;
  canCheckAttendance: boolean;
  canViewLeaves: boolean;
  canManageLeaves: boolean;
  canSubmitLeave: boolean;
  canViewPayroll: boolean;
  canManagePayroll: boolean;
  canSubmitAdvance: boolean;
  canSubmitResignation: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
  canViewTasks: boolean;
  canManageTasks: boolean;
  canViewMaintenance: boolean;
  canManageMaintenance: boolean;
  canViewVehicles: boolean;
  canManageVehicles: boolean;
  canViewRecruitment: boolean;
  canManageRecruitment: boolean;
  canViewTraining: boolean;
  canManageTraining: boolean;
}

interface AuthContextType {
  user: UserType | null;
  organization: {
    id: string;
    name: string;
    logo_url?: string;
  } | null;
  permissions: UserPermissions;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: keyof UserPermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define role-based permissions
const getPermissionsByRole = (role: string): UserPermissions => {
  switch (role) {
    case "employee":
      return {
        canViewEmployees: false,
        canEditEmployees: false,
        canDeleteEmployees: false,
        canViewAttendance: true, // Own attendance only
        canManageAttendance: false,
        canCheckAttendance: true,
        canViewLeaves: true, // Own leaves only
        canManageLeaves: false,
        canSubmitLeave: true,
        canViewPayroll: true, // Own payroll only
        canManagePayroll: false,
        canSubmitAdvance: true,
        canSubmitResignation: true,
        canViewReports: false,
        canManageSettings: false,
        canViewTasks: true, // Own tasks only
        canManageTasks: false,
        canViewMaintenance: false,
        canManageMaintenance: false,
        canViewVehicles: false,
        canManageVehicles: false,
        canViewRecruitment: false,
        canManageRecruitment: false,
        canViewTraining: true, // Own training only
        canManageTraining: false,
      };
    case "manager":
      return {
        canViewEmployees: true, // Direct reports only
        canEditEmployees: true, // Direct reports only
        canDeleteEmployees: false,
        canViewAttendance: true, // Team attendance
        canManageAttendance: true, // Team attendance
        canCheckAttendance: true,
        canViewLeaves: true, // Team leaves
        canManageLeaves: true, // Approve/reject team leaves
        canSubmitLeave: true,
        canViewPayroll: false,
        canManagePayroll: false,
        canSubmitAdvance: true,
        canSubmitResignation: true,
        canViewReports: true, // Team reports only
        canManageSettings: false,
        canViewTasks: true, // Team tasks
        canManageTasks: true, // Team tasks
        canViewMaintenance: true,
        canManageMaintenance: false,
        canViewVehicles: true,
        canManageVehicles: false,
        canViewRecruitment: true,
        canManageRecruitment: false,
        canViewTraining: true, // Team training
        canManageTraining: true, // Team training
      };
    case "org_admin":
    case "super_admin":
      return {
        canViewEmployees: true,
        canEditEmployees: true,
        canDeleteEmployees: true,
        canViewAttendance: true,
        canManageAttendance: true,
        canCheckAttendance: true,
        canViewLeaves: true,
        canManageLeaves: true,
        canSubmitLeave: true,
        canViewPayroll: true,
        canManagePayroll: true,
        canSubmitAdvance: true,
        canSubmitResignation: true,
        canViewReports: true,
        canManageSettings: true,
        canViewTasks: true,
        canManageTasks: true,
        canViewMaintenance: true,
        canManageMaintenance: true,
        canViewVehicles: true,
        canManageVehicles: true,
        canViewRecruitment: true,
        canManageRecruitment: true,
        canViewTraining: true,
        canManageTraining: true,
        canViewLetters: true,
        canManageLetters: true,
        canViewCustody: true,
        canManageCustody: true,
      };
    default:
      return {
        canViewEmployees: false,
        canEditEmployees: false,
        canDeleteEmployees: false,
        canViewAttendance: false,
        canManageAttendance: false,
        canCheckAttendance: false,
        canViewLeaves: false,
        canManageLeaves: false,
        canSubmitLeave: false,
        canViewPayroll: false,
        canManagePayroll: false,
        canSubmitAdvance: false,
        canSubmitResignation: false,
        canViewReports: false,
        canManageSettings: false,
        canViewTasks: false,
        canManageTasks: false,
        canViewMaintenance: false,
        canManageMaintenance: false,
        canViewVehicles: false,
        canManageVehicles: false,
        canViewRecruitment: false,
        canManageRecruitment: false,
        canViewTraining: false,
        canManageTraining: false,
        canViewLetters: false,
        canManageLetters: false,
        canViewCustody: false,
        canManageCustody: false,
      };
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [organization, setOrganization] = useState<{
    id: string;
    name: string;
    logo_url?: string;
  } | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>(
    getPermissionsByRole(""),
  );
  const [loading, setLoading] = useState(true);

  // Create a safe navigate function that works in all environments
  const safeNavigate = React.useCallback((path: string) => {
    if (typeof window !== "undefined") {
      // Use window.location.href for universal navigation that doesn't require Router context
      window.location.href = path;
    }
  }, []);

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser?.organization) {
        setOrganization({
          id: currentUser.organization.id,
          name: currentUser.organization.name,
          logo_url: currentUser.organization.logo_url,
        });
      } else {
        setOrganization(null);
      }

      // Set permissions based on user role
      if (currentUser?.role) {
        setPermissions(getPermissionsByRole(currentUser.role));
      } else {
        setPermissions(getPermissionsByRole(""));
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
      setOrganization(null);
      setPermissions(getPermissionsByRole(""));
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    };

    initAuth();
  }, []);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setOrganization(null);
      setPermissions(getPermissionsByRole(""));
      safeNavigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        organization,
        permissions,
        loading,
        logout,
        refreshUser,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
