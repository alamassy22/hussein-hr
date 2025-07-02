import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Keyboard, X } from "lucide-react";

interface ArabicKeyboardProps {
  className?: string;
  onKeyPress?: (key: string) => void;
  onClose?: () => void;
}

const ArabicKeyboard = ({
  className,
  onKeyPress = () => {},
  onClose = () => {},
}: ArabicKeyboardProps) => {
  const [shift, setShift] = useState(false);

  const arabicLetters = [
    ["ذ", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠", "-", "="],
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
    ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
    ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
  ];

  const arabicLettersShift = [
    ["ّ", "!", "@", "#", "$", "%", "^", "&", "*", ")", "(", "_", "+"],
    ["َ", "ً", "ُ", "ٌ", "لإ", "إ", "'", "÷", "×", "؛", ">"],
    ["ِ", "ٍ", "]", "[", "لأ", "أ", "ـ", "،", "/", ":", '"'],
    ["~", "ْ", "}", "{", "لآ", "آ", "'", ",", ".", "؟"],
  ];

  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  const toggleShift = () => {
    setShift(!shift);
  };

  return (
    <Card className={`border shadow-sm bg-white ${className}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Keyboard size={18} />
          <span>لوحة المفاتيح العربية</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {(shift ? arabicLettersShift : arabicLetters).map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 justify-center">
              {rowIndex === 1 && (
                <Button
                  variant="outline"
                  className="text-xs h-8 px-2 min-w-[40px]"
                  onClick={() => handleKeyPress("\t")}
                >
                  Tab
                </Button>
              )}

              {row.map((key, keyIndex) => (
                <Button
                  key={keyIndex}
                  variant="outline"
                  className="h-8 min-w-[32px] px-2"
                  onClick={() => handleKeyPress(key)}
                >
                  {key}
                </Button>
              ))}

              {rowIndex === 0 && (
                <Button
                  variant="outline"
                  className="text-xs h-8 px-2 min-w-[60px]"
                  onClick={() => handleKeyPress("\b")}
                >
                  Backspace
                </Button>
              )}

              {rowIndex === 1 && (
                <Button
                  variant="outline"
                  className="text-xs h-8 px-2 min-w-[60px]"
                  onClick={() => handleKeyPress("\n")}
                >
                  Enter
                </Button>
              )}

              {rowIndex === 2 && (
                <Button
                  variant={shift ? "default" : "outline"}
                  className={`text-xs h-8 px-2 min-w-[60px] ${shift ? "bg-accent" : ""}`}
                  onClick={toggleShift}
                >
                  Shift
                </Button>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-1">
            <Button
              variant="outline"
              className="h-8 px-4 min-w-[200px]"
              onClick={() => handleKeyPress(" ")}
            >
              مسافة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArabicKeyboard;
