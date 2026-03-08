import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import popUp3 from '../../assets/popUp3.png';

interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
}

const pages = [
  {
    content: (
      <div className="space-y-4 py-2 text-right">
        <p className="text-foreground leading-relaxed">
          האויב אוסף עליכם מידע ממגוון רחב של רשתות ומקורות גלויים וסמויים, במטרה לבנות תמונה מלאה עליכם ועל הארגון: מי אתם, מה התפקיד שלכם, עם מי אתם עובדים, היכן אתם נמצאים, ומהם דפוסי הפעילות שלכם.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          איסוף המידע מתבצע לעיתים בלי שתשימו לב — דרך פרטים קטנים שמופיעים ברשתות חברתיות, אתרי אינטרנט, קבצים ציבוריים, תמונות, תגובות, מיקומים, ושיתופים שונים.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="space-y-4 py-2 text-right">
        <p className="text-foreground leading-relaxed">
          במסך הבא תוכלו לעבור בין מקורות המידע השונים ולראות כיצד כל מקור "מספר סיפור" עליכם. עברו על המקורות כדי להבין עד כמה קל לצבור פרטים משמעותיים גם בלי גישה מיוחדת.
        </p>
        <p className="text-foreground font-medium leading-relaxed">
          לאחר שתסיימו להכיר את המקורות ולהתנסות בהם, תוכלו להתחיל בסימולציה.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="space-y-4 py-2 text-right">
        <p className="text-2xl font-bold text-foreground text-center">
          לדוגמה: פרטים שניתן להוציא מהתמונה
        </p>
        <img src={popUp3} alt="דוגמה לפרטים שניתן להוציא מתמונה" className="w-full rounded-lg border border-border/50" />
      </div>
    ),
  },
];

export const WelcomePopup = ({ open, onClose }: WelcomePopupProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
      onClose();
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
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

        {pages[currentPage].content}

        {/* Page indicators */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {pages.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentPage ? 'bg-primary w-4' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          variant="tactical"
          size="xl"
          className="w-full mt-4"
        >
          {currentPage < pages.length - 1 ? 'המשך' : 'הבנתי, בואו נתחיל!'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
