import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Printer,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Participant {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  attendanceRate?: number;
  avatar?: string;
}

interface ParticipantsListProps {
  courseTitle?: string;
  participants?: Participant[];
  onViewParticipant?: (participantId: string) => void;
  onEditParticipant?: (participantId: string) => void;
  onDeleteParticipant?: (participantId: string) => void;
}

const ParticipantsList = ({
  courseTitle = "مهارات القيادة الإدارية",
  participants = [],
  onViewParticipant,
  onEditParticipant,
  onDeleteParticipant,
}: ParticipantsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Participant>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `المشاركين في دورة ${courseTitle}`,
  });

  // Sample data if no participants provided
  const sampleParticipants: Participant[] = [
    {
      id: "P001",
      name: "محمد أحمد",
      email: "mohammed@example.com",
      department: "تقنية المعلومات",
      position: "مطور برمجيات",
      attendanceRate: 95,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P001",
    },
    {
      id: "P002",
      name: "فاطمة علي",
      email: "fatima@example.com",
      department: "الموارد البشرية",
      position: "مدير موارد بشرية",
      attendanceRate: 100,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P002",
    },
    {
      id: "P003",
      name: "خالد عبدالله",
      email: "khalid@example.com",
      department: "المالية",
      position: "محاسب",
      attendanceRate: 85,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P003",
    },
    {
      id: "P004",
      name: "نورة محمد",
      email: "noura@example.com",
      department: "التسويق",
      position: "مدير تسويق",
      attendanceRate: 90,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P004",
    },
    {
      id: "P005",
      name: "عبدالرحمن سعيد",
      email: "abdulrahman@example.com",
      department: "المبيعات",
      position: "مندوب مبيعات",
      attendanceRate: 80,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P005",
    },
  ];

  const displayParticipants =
    participants.length > 0 ? participants : sampleParticipants;

  // Filter participants based on search term
  const filteredParticipants = displayParticipants.filter(
    (participant) =>
      participant.name.includes(searchTerm) ||
      participant.email.includes(searchTerm) ||
      participant.department.includes(searchTerm) ||
      participant.position.includes(searchTerm),
  );

  // Sort participants
  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle sort direction
  const toggleSort = (field: keyof Participant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          المشاركين في دورة {courseTitle}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search" className="sr-only">
            بحث
          </Label>
          <div className="relative">
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="search"
              placeholder="بحث عن مشارك..."
              className="pr-10 text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir="rtl"
            />
          </div>
        </div>

        <div className="overflow-x-auto" ref={printRef}>
          <div className="print-header text-center mb-4 hidden print-only-content">
            <h1 className="text-2xl font-bold">
              المشاركين في دورة {courseTitle}
            </h1>
            <p className="text-sm text-gray-500">
              تاريخ الطباعة: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-right">المشارك</th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("department")}
                  >
                    القسم
                    {sortField === "department" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("position")}
                  >
                    المسمى الوظيفي
                    {sortField === "position" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button
                    className="flex items-center justify-end w-full font-semibold"
                    onClick={() => toggleSort("attendanceRate")}
                  >
                    نسبة الحضور
                    {sortField === "attendanceRate" && (
                      <span className="mr-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </th>
                <th className="p-3 text-right print-hidden">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {sortedParticipants.map((participant) => (
                <tr key={participant.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-500">
                          {participant.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{participant.department}</td>
                  <td className="p-3">{participant.position}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${participant.attendanceRate && participant.attendanceRate >= 90 ? "bg-green-500" : participant.attendanceRate && participant.attendanceRate >= 75 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{
                            width: `${participant.attendanceRate || 0}%`,
                          }}
                        ></div>
                      </div>
                      <span>{participant.attendanceRate || 0}%</span>
                    </div>
                  </td>
                  <td className="p-3 print-hidden">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onViewParticipant && onViewParticipant(participant.id)
                        }
                      >
                        عرض التفاصيل
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onEditParticipant && onEditParticipant(participant.id)
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onDeleteParticipant &&
                          onDeleteParticipant(participant.id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedParticipants.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    لا يوجد مشاركين في هذه الدورة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantsList;
