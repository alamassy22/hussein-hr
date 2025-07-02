import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2, Save, Upload, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompanyData {
  name: string;
  commercialRecord: string;
  taxNumber: string;
  phone: string;
  address: string;
  email: string;
  website: string;
  logo: string | null;
}

const defaultCompanyData: CompanyData = {
  name: "",
  commercialRecord: "",
  taxNumber: "",
  phone: "",
  address: "",
  email: "",
  website: "",
  logo: null,
};

const CompanySettingsForm = () => {
  const [companyData, setCompanyData] =
    useState<CompanyData>(defaultCompanyData);
  const [isSaving, setIsSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("الرجاء اختيار ملف صورة صالح");
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الملف كبير جدًا. الحد الأقصى هو 2 ميجابايت");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoPreview(result);
      setCompanyData((prev) => ({
        ...prev,
        logo: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveData = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saving company data:", companyData);
      setIsSaving(false);
      // Here you would typically make an API call to save the data
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          بيانات الشركة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="mb-6">
            <Label htmlFor="logo">شعار الشركة</Label>
            <div className="mt-2 flex items-center gap-4">
              <div
                className="relative h-24 w-24 overflow-hidden rounded-md border border-input bg-background flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                onClick={handleLogoClick}
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="شعار الشركة"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleLogoClick}
                >
                  <Upload className="h-4 w-4" />
                  رفع شعار الشركة
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  يفضل استخدام صورة بحجم 512×512 بكسل بصيغة PNG أو JPG
                </p>
                <input
                  type="file"
                  id="logo"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الشركة</Label>
              <Input
                id="name"
                placeholder="أدخل اسم الشركة"
                value={companyData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commercialRecord">السجل التجاري</Label>
              <Input
                id="commercialRecord"
                placeholder="أدخل رقم السجل التجاري"
                value={companyData.commercialRecord}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="taxNumber">الرقم الضريبي</Label>
              <Input
                id="taxNumber"
                placeholder="أدخل الرقم الضريبي"
                value={companyData.taxNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                placeholder="أدخل رقم الهاتف"
                value={companyData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">العنوان</Label>
            <Input
              id="address"
              placeholder="أدخل عنوان الشركة"
              value={companyData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              value={companyData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">الموقع الإلكتروني</Label>
            <Input
              id="website"
              placeholder="أدخل الموقع الإلكتروني"
              value={companyData.website}
              onChange={handleInputChange}
            />
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={handleSaveData}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              {isSaving ? "جاري الحفظ..." : "حفظ البيانات"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySettingsForm;
