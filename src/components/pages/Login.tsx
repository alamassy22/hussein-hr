import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { signIn, getCurrentUser } from "@/lib/supabase";
import OrganizationSelect from "../auth/OrganizationSelect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsOrganization, setNeedsOrganization] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          if (user.organization_id) {
            navigate("/dashboard");
          } else {
            setNeedsOrganization(true);
            setUserId(user.id);
          }
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn(email, password);

      if (!result || !result.user) {
        setError("حدث خطأ أثناء تسجيل الدخول");
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          setError("حدث خطأ أثناء جلب بيانات المستخدم");
          return;
        }

        // Super admin can bypass organization requirement
        if (currentUser.role === "super_admin") {
          navigate("/dashboard");
          return;
        }

        if (!currentUser.organization_id) {
          setNeedsOrganization(true);
          setUserId(currentUser.id);
          return;
        }

        navigate("/dashboard");
      } catch (err: any) {
        console.error("Error getting current user:", err);
        setError("حدث خطأ أثناء جلب بيانات المستخدم");
        setLoading(false);
        return;
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "اسم المستخدم أو كلمة المرور غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  // If user needs to create an organization (skip for super_admin)
  if (needsOrganization) {
    const checkIfSuperAdmin = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.role === "super_admin") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking if super admin:", error);
      }
    };
    checkIfSuperAdmin();
    return <OrganizationSelect userId={userId} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary-700">
            نظام إدارة الموارد البشرية
          </CardTitle>
          <CardDescription className="text-gray-500">
            الرجاء تسجيل الدخول للمتابعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4" dir="rtl">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
                className="text-right"
                dir="rtl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="text-right"
                dir="rtl"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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

export default Login;
