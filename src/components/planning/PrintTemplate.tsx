import React, { forwardRef } from "react";
import PrintWrapper from "@/components/ui/print-wrapper";
import { Badge } from "@/components/ui/badge";

interface PrintTemplateProps {
  data: any;
  type: "project" | "goal" | "kpi";
  renderStatusBadge?: (status: string) => React.ReactNode;
  renderPriorityBadge?: (priority: string) => React.ReactNode;
  renderTrendBadge?: (trend: string) => React.ReactNode;
  renderProgressBar?: (progress: number) => React.ReactNode;
}

const PrintTemplate = forwardRef<HTMLDivElement, PrintTemplateProps>(
  (
    {
      data,
      type,
      renderStatusBadge,
      renderPriorityBadge,
      renderTrendBadge,
      renderProgressBar,
    },
    ref,
  ) => {
    const getTitle = () => {
      switch (type) {
        case "project":
          return `تفاصيل المشروع: ${data.name}`;
        case "goal":
          return `تفاصيل الهدف: ${data.title}`;
        case "kpi":
          return `تفاصيل مؤشر الأداء: ${data.name}`;
        default:
          return "تقرير";
      }
    };

    return (
      <div ref={ref} className="print-content">
        <PrintWrapper title={getTitle()}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">{getTitle()}</h2>
              <p className="text-gray-500">
                تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>

            <div className="space-y-4">
              {type === "project" && (
                <>
                  <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div>
                      <h3 className="font-semibold mb-2">معلومات المشروع</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">اسم المشروع:</span>
                          <span>{data.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">مدير المشروع:</span>
                          <span>{data.manager}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الأولوية:</span>
                          <span>{data.priority}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">الجدول الزمني</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">تاريخ البداية:</span>
                          <span>
                            {new Date(data.startDate).toLocaleDateString(
                              "ar-SA",
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">تاريخ النهاية:</span>
                          <span>
                            {new Date(data.endDate).toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الحالة:</span>
                          <span>{data.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">التقدم</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`bg-blue-500 h-2.5 rounded-full`}
                        style={{ width: `${data.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-1">{data.progress}%</div>
                  </div>
                </>
              )}

              {type === "goal" && (
                <>
                  <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div>
                      <h3 className="font-semibold mb-2">معلومات الهدف</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">عنوان الهدف:</span>
                          <span>{data.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الفئة:</span>
                          <span>{data.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الحالة:</span>
                          <span>{data.status}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">التفاصيل</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">تاريخ الاستحقاق:</span>
                          <span>
                            {new Date(data.targetDate).toLocaleDateString(
                              "ar-SA",
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">نسبة الإنجاز:</span>
                          <span>{data.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">الوصف</h3>
                    <p className="text-gray-700">{data.description}</p>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">التقدم</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`bg-blue-500 h-2.5 rounded-full`}
                        style={{ width: `${data.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-1">{data.progress}%</div>
                  </div>
                </>
              )}

              {type === "kpi" && (
                <>
                  <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div>
                      <h3 className="font-semibold mb-2">معلومات المؤشر</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">اسم المؤشر:</span>
                          <span>{data.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الفئة:</span>
                          <span>{data.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الحالة:</span>
                          <span>{data.status}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">القيم</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">المستهدف:</span>
                          <span>{data.target}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">القيمة الحالية:</span>
                          <span>{data.current}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الاتجاه:</span>
                          <span>{data.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <h3 className="font-semibold mb-2">مقارنة القيم</h3>
                    <div className="inline-block p-4 border rounded-lg">
                      <div className="flex items-center justify-center gap-8">
                        <div>
                          <div className="text-sm text-gray-500">المستهدف</div>
                          <div className="text-xl font-bold">{data.target}</div>
                        </div>
                        <div className="text-2xl font-bold">vs</div>
                        <div>
                          <div className="text-sm text-gray-500">الحالي</div>
                          <div className="text-xl font-bold">
                            {data.current}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>تم إنشاء هذا التقرير بواسطة نظام إدارة الموارد البشرية</p>
              <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
            </div>
          </div>
        </PrintWrapper>
      </div>
    );
  },
);

PrintTemplate.displayName = "PrintTemplate";

export default PrintTemplate;
