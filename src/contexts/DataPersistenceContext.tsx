import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
    if (!user) return;

    setLoading(true);
    try {
      // Check if data already exists
      const { data: existingData } = await supabase
        .from("user_data")
        .select()
        .eq("user_id", user.id)
        .eq("data_key", key)
        .single();

      if (existingData) {
        // Update existing data
        await supabase
          .from("user_data")
          .update({ data_value: data, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("data_key", key);
      } else {
        // Insert new data
        await supabase.from("user_data").insert({
          user_id: user.id,
          organization_id: user.organization_id,
          data_key: key,
          data_value: data,
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (key: string) => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data } = await supabase
        .from("user_data")
        .select("data_value")
        .eq("user_id", user.id)
        .eq("data_key", key)
        .single();

      return data?.data_value || null;
    } catch (error) {
      console.error("Error loading data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearData = async (key: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await supabase
        .from("user_data")
        .delete()
        .eq("user_id", user.id)
        .eq("data_key", key);
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
