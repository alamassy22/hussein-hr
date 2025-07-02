import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Organization {
  id: string;
  name: string;
  created_at: string;
  is_active: boolean;
  user_count?: number;
}

interface OrganizationListProps {
  organizations: Organization[];
  loading: boolean;
  onSelectOrganization: (org: Organization) => void;
  onRefresh: () => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  loading,
  onSelectOrganization,
  onRefresh,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">لا توجد مؤسسات مسجلة</p>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          المؤسسات المسجلة ({organizations.length})
        </h3>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">اسم المؤسسة</TableHead>
              <TableHead className="text-right">تاريخ التسجيل</TableHead>
              <TableHead className="text-right">عدد المستخدمين</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-right">
                  {org.name}
                </TableCell>
                <TableCell className="text-right">
                  {format(new Date(org.created_at), "dd MMMM yyyy", {
                    locale: ar,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {org.user_count || 0}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={org.is_active ? "default" : "secondary"}
                    className={
                      org.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {org.is_active ? "نشطة" : "معطلة"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => onSelectOrganization(org)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Eye size={16} />
                    عرض التفاصيل
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrganizationList;
