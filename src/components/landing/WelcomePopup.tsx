import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
}

export const WelcomePopup = ({ open, onClose }: WelcomePopupProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hideWelcomePopup", "true");
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-panel border-primary/30 sm:max-w-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            <span className="text-gradient-tactical">ברוך הבא</span>
            <br />
            <span className="text-foreground">לסימולטור איסוף מודיעין</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2 text-right">
          <p className="text-foreground leading-relaxed">
            האויב אוסף עליכם מידע ממגוון רחב של רשתות ומקורות גלויים וסמויים, במטרה לבנות תמונה מלאה עליכם ועל הארגון: מי אתם, מה התפקיד שלכם, עם מי אתם עובדים, היכן אתם נמצאים, ומהם דפוסי הפעילות שלכם.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            איסוף המידע מתבצע לעיתים בלי שתשימו לב — דרך פרטים קטנים שמופיעים ברשתות חברתיות, אתרי אינטרנט, קבצים ציבוריים, תמונות, תגובות, מיקומים, ושיתופים שונים.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            במסך הבא תוכלו לעבור בין מקורות המידע השונים ולראות כיצד כל מקור "מספר סיפור" עליכם. עברו על המקורות כדי להבין עד כמה קל לצבור פרטים משמעותיים גם בלי גישה מיוחדת.
          </p>

          <p className="text-foreground font-medium leading-relaxed">
            לאחר שתסיימו להכיר את המקורות ולהתנסות בהם, תוכלו להתחיל בסימולציה.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id="dontShow"
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
          />
          <label htmlFor="dontShow" className="text-sm text-muted-foreground cursor-pointer">
            אל תציג שוב
          </label>
        </div>

        <Button
          onClick={handleClose}
          variant="tactical"
          size="xl"
          className="w-full mt-4"
        >
          הבנתי, בואו נתחיל!
        </Button>
      </DialogContent>
    </Dialog>
  );
};
