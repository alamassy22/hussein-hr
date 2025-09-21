import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { saveToDatabase, loadFromDatabase } from "@/lib/supabase";

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
    setLoading(true);
    try {
      const result = await saveToDatabase(`hrms_${key}`, data, user?.id);
      if (!result.success) {
        console.error("Error saving data:", result.error);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (key: string) => {
    setLoading(true);
    try {
      const result = await loadFromDatabase(`hrms_${key}`, user?.id);
      if (result.success) {
        return result.data;
      } else {
        console.error("Error loading data:", result.error);
        return null;
      }
    } catch (error) {
      console.error("Error loading data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearData = async (key: string) => {
    setLoading(true);
    try {
      // For clearing, we'll use the database if available, otherwise localStorage
      if (supabase && user?.id) {
        const { error } = await supabase
          .from('user_data')
          .delete()
          .eq('user_id', user.id)
          .eq('data_key', `hrms_${key}`);
        
        if (error) throw error;
      } else {
        // Fallback to localStorage
        const storageKey = user?.id ? `${user.id}_hrms_${key}` : `hrms_${key}`;
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.error("Error clearing data:", error);
      // Fallback to localStorage on error
      const storageKey = user?.id ? `${user.id}_hrms_${key}` : `hrms_${key}`;
      localStorage.removeItem(storageKey);
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
