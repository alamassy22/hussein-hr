import React, { ReactNode } from "react";

interface PrintWrapperProps {
  children: ReactNode;
  title?: string;
}

const PrintWrapper = ({ children, title = "تقرير" }: PrintWrapperProps) => {
  return (
    <div className="print:p-0 print:m-0 print:bg-white">
      {/* This content will only show when printing */}
      <div className="hidden print:block print:mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500">
            تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>

      {/* This is the actual content */}
      <div className="print:bg-white print:shadow-none">{children}</div>

      {/* This content will only show when printing */}
      <div className="hidden print:block print:mt-6">
        <div className="text-center text-sm text-gray-500">
          <p>تم إنشاء هذا التقرير بواسطة نظام إدارة الموارد البشرية</p>
        </div>
      </div>

      {/* Global print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .print-content {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          .print-content table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 12px !important;
          }
          .print-content th,
          .print-content td {
            border: 1px solid #000 !important;
            padding: 8px !important;
            text-align: right !important;
          }
          .print-content th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .hidden {
            display: none !important;
          }
        }
        .print-only {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PrintWrapper;
