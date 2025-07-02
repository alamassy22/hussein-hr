import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, UserCheck, LogOut, ExternalLink } from "lucide-react";

interface AttendanceCheckInOutProps {
  employeeId?: string;
  employeeName?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  formatted: string;
}

const AttendanceCheckInOut = ({
  employeeId = "EMP001",
  employeeName = "أحمد محمد",
}: AttendanceCheckInOutProps) => {
  const [checkInLocation, setCheckInLocation] = useState<LocationData | null>(
    null,
  );
  const [checkOutLocation, setCheckOutLocation] = useState<LocationData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("ar-SA");
  };

  const getCurrentLocation = (forCheckIn = true) => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locationData: LocationData = {
            latitude: lat,
            longitude: lng,
            formatted: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          };

          if (forCheckIn) {
            setCheckInLocation(locationData);
          } else {
            setCheckOutLocation(locationData);
          }

          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          const errorLocation: LocationData = {
            latitude: 0,
            longitude: 0,
            formatted: "تعذر تحديد الموقع",
          };

          if (forCheckIn) {
            setCheckInLocation(errorLocation);
          } else {
            setCheckOutLocation(errorLocation);
          }

          setIsLoading(false);
        },
      );
    } else {
      const unsupportedLocation: LocationData = {
        latitude: 0,
        longitude: 0,
        formatted: "الموقع غير مدعوم في المتصفح",
      };

      if (forCheckIn) {
        setCheckInLocation(unsupportedLocation);
      } else {
        setCheckOutLocation(unsupportedLocation);
      }

      setIsLoading(false);
    }
  };

  const openLocationInMap = (location: LocationData) => {
    if (location.latitude === 0 && location.longitude === 0) {
      return; // Don't open map for error locations
    }
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, "_blank");
  };

  const handleCheckIn = () => {
    getCurrentLocation(true);
    const time = getCurrentTime();
    setCheckInTime(time);
    setLastAction(`تم تسجيل الحضور في ${time}`);
    // هنا يمكن إضافة الكود لحفظ بيانات الحضور في قاعدة البيانات

    // يمكن هنا حساب التأخير بناءً على وقت بدء الدوام المحدد في الجدول
    // وتحديث بيانات الحضور للموظف لاستخدامها في حساب المرتب
  };

  const handleCheckOut = () => {
    getCurrentLocation(false);
    const time = getCurrentTime();
    setCheckOutTime(time);
    setLastAction(`تم تسجيل الانصراف في ${time}`);
    // هنا يمكن إضافة الكود لحفظ بيانات الانصراف في قاعدة البيانات

    // يمكن هنا حساب ساعات العمل الفعلية بناءً على وقت الحضور والانصراف
    // وتحديث بيانات الحضور للموظف لاستخدامها في حساب المرتب
  };

  const renderLocationDisplay = (
    title: string,
    location: LocationData | null,
    time: string | null,
  ) => {
    if (!location) return null;

    return (
      <div className="space-y-2 border p-3 rounded-md bg-gray-50">
        <Label className="flex items-center gap-2 font-semibold">
          <MapPin className="h-4 w-4" />
          {title} {time && `(${time})`}
        </Label>
        <div className="flex items-center gap-2">
          <Input value={location.formatted} readOnly className="flex-1" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => openLocationInMap(location)}
            disabled={location.latitude === 0 && location.longitude === 0}
            title="فتح الموقع في الخريطة"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="border shadow-sm bg-white w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          تسجيل الحضور والانصراف
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">رقم الموظف</Label>
              <Input id="employeeId" value={employeeId} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeName">اسم الموظف</Label>
              <Input id="employeeName" value={employeeName} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderLocationDisplay(
              "موقع تسجيل الحضور",
              checkInLocation,
              checkInTime,
            )}
            {renderLocationDisplay(
              "موقع تسجيل الانصراف",
              checkOutLocation,
              checkOutTime,
            )}
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Button
              onClick={handleCheckIn}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              <UserCheck className="h-5 w-5" />
              تسجيل الحضور
            </Button>
            <Button
              onClick={handleCheckOut}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
              disabled={isLoading}
            >
              <LogOut className="h-5 w-5" />
              تسجيل الانصراف
            </Button>
          </div>

          {lastAction && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <p className="text-sm">{lastAction}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCheckInOut;
