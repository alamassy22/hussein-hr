import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase, createOrganization } from "@/lib/supabase";

interface OrganizationSelectProps {
  userId: string;
}

const OrganizationSelect: React.FC<OrganizationSelectProps> = ({ userId }) => {
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  // Prevent layout shifts by ensuring component is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createOrganization(organizationName, userId);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating organization:", err);
      setError("حدث خطأ أثناء إنشاء المؤسسة. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  // Prevent screen shaking by showing loading state until ready
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700 mx-auto mb-4"></div>
              <p className="text-gray-500">جاري التحميل...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card
        className="w-full max-w-md bg-white shadow-lg"
        style={{ minHeight: "400px" }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary-700">
            إنشاء مؤسسة جديدة
          </CardTitle>
          <CardDescription className="text-gray-500">
            أنشئ مؤسستك الخاصة للبدء في استخدام النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreateOrganization}
            className="space-y-4"
            dir="rtl"
          >
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="organizationName" className="text-right block">
                اسم المؤسسة
              </Label>
              <Input
                id="organizationName"
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="أدخل اسم المؤسسة"
                className="text-right transition-all duration-200"
                dir="rtl"
                style={{ minHeight: "40px" }}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "جاري الإنشاء..." : "إنشاء المؤسسة"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} نظام إدارة الموارد البشرية
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationSelect;
