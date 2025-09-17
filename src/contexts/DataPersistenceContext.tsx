import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface DataPersistenceContextType {
  saveData: (key: string, data: any) => Promise<void>;
  loadData: (key: string) => Promise<any>;
  clearData: (key: string) => Promise<void>;
  loading: boolean;
}

const DataPersistenceContext = createContext<
  DataPersistenceContextType | undefined
>(undefined);

export function DataPersistenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const saveData = async (key: string, data: any) => {
    if (!user) {
      // Save to localStorage if no user (fallback)
      try {
        localStorage.setItem(`hrms_${key}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return;
    }

    setLoading(true);
    try {
      // Save to localStorage with user-specific key
      const userKey = `hrms_${user.id}_${key}`;
      localStorage.setItem(userKey, JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
        user_id: user.id,
        organization_id: user.organization_id
      }));
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (key: string) => {
    if (!user) {
      // Load from localStorage if no user (fallback)
      try {
        const stored = localStorage.getItem(`hrms_${key}`);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error("Error loading from localStorage:", error);
        return null;
      }
    }

    setLoading(true);
    try {
      // Load from localStorage with user-specific key
      const userKey = `hrms_${user.id}_${key}`;
      const stored = localStorage.getItem(userKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.data || null;
      }
      return null;
    } catch (error) {
      console.error("Error loading data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearData = async (key: string) => {
    if (!user) {
      // Clear from localStorage if no user (fallback)
      try {
        localStorage.removeItem(`hrms_${key}`);
      } catch (error) {
        console.error("Error clearing from localStorage:", error);
      }
      return;
    }

    setLoading(true);
    try {
      // Clear from localStorage with user-specific key
      const userKey = `hrms_${user.id}_${key}`;
      localStorage.removeItem(userKey);
    } catch (error) {
      console.error("Error clearing data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataPersistenceContext.Provider
      value={{
        saveData,
        loadData,
        clearData,
        loading,
      }}
    >
      {children}
    </DataPersistenceContext.Provider>
  );
}

export function useDataPersistence() {
  const context = useContext(DataPersistenceContext);
  if (context === undefined) {
    throw new Error(
      "useDataPersistence must be used within a DataPersistenceProvider",
    );
  }
  return context;
}
