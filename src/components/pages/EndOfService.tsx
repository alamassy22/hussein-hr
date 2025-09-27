import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserX, FileText, Calculator } from "lucide-react";
import HandoverForm from "../turnover/HandoverForm";
import EndOfServiceCalculator from "../turnover/EndOfServiceCalculator";

const EndOfService = () => {
  const [activeTab, setActiveTab] = useState("handover");
  const [showHandoverForm, setShowHandoverForm] = useState(false);
  const [showEndOfServiceCalculator, setShowEndOfServiceCalculator] = useState(false);

  // Mock employee data - in a real app, this would come from an API or context
  const employeeData = {
    name: "أحمد محمد",
    id: "EMP001",
    department: "تقنية المعلومات",
    position: "مطور برمجيات",
    joinDate: "2022-01-15",
    salary: 12000,
  };

  const handleHandoverSubmit = (data) => {
    console.log("Handover form submitted:", data);
    setShowHandoverForm(false);
    // Here you would send the data to your API
  };

  return (
    <MainLayout
      title="إنهاء الخدمة"
      subtitle="إدارة عمليات إنهاء الخدمة والتسليم والتسلم"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="handover" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            نموذج التسليم والتسلم
          </TabsTrigger>
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            حساب مستحقات نهاية الخدمة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="handover" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {!showHandoverForm ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">نموذج التسليم والتسلم</CardTitle>
                  <p className="text-gray-500 mt-2">
                    إنشاء نموذج تسليم وتسلم العهد والمسؤوليات عند إنهاء الخدمة
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    onClick={() => setShowHandoverForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FileText className="ml-2 h-4 w-4" />
                    إنشاء نموذج التسليم والتسلم
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <HandoverForm
                employeeData={employeeData}
                onSubmit={handleHandoverSubmit}
                onCancel={() => setShowHandoverForm(false)}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {!showEndOfServiceCalculator ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">حساب مستحقات نهاية الخدمة</CardTitle>
                  <p className="text-gray-500 mt-2">
                    حساب المستحقات المالية للموظف عند إنهاء الخدمة وفقاً لقانون العمل
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    onClick={() => setShowEndOfServiceCalculator(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Calculator className="ml-2 h-4 w-4" />
                    حساب مستحقات نهاية الخدمة
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <EndOfServiceCalculator 
                employeeData={employeeData}
                onBack={() => setShowEndOfServiceCalculator(false)}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default EndOfService;