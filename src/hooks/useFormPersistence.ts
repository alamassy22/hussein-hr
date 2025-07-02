import { useState, useEffect } from "react";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";

/**
 * Hook for persisting form data automatically
 * @param formKey Unique key for the form data
 * @param initialData Initial form data
 * @param autoSave Whether to save automatically on change
 * @returns Form data and handlers
 */
export function useFormPersistence<T>(
  formKey: string,
  initialData: T,
  autoSave = true,
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const { saveData, loadData } = useDataPersistence();

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await loadData(formKey);
        if (savedData) {
          setFormData(savedData);
        }
      } catch (error) {
        console.error("Error loading saved form data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [formKey, loadData]);

  // Update form data and save if autoSave is enabled
  const updateFormData = async (newData: Partial<T>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);

    if (autoSave) {
      await saveData(formKey, updatedData);
    }

    return updatedData;
  };

  // Save form data manually
  const saveFormData = async () => {
    await saveData(formKey, formData);
  };

  return {
    formData,
    updateFormData,
    saveFormData,
    isLoading,
  };
}
