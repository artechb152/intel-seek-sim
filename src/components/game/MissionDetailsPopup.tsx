import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Target, Clock, AlertTriangle } from 'lucide-react';

interface MissionDetailsPopupProps {
  open: boolean;
  onClose: () => void;
}

export const MissionDetailsPopup = ({
  open,
  onClose,
}: MissionDetailsPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="border-2 border-primary bg-background sm:max-w-xl shadow-[0_0_30px_rgba(59,130,246,0.4)]"
        dir="rtl"
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center border-2 border-primary shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold text-center text-primary">
            פרטי המשימה
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/40">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-foreground text-base leading-relaxed">
                <p className="font-medium">איספו מידע ובצעו ניתוח של בסיס ירקון לפי</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>מבנה הבסיס</li>
                  <li>התנהלות השמירות</li>
                  <li>כמות החיילים</li>
                  <li>רמת הכוננות</li>
                  <li>נוכחות בכירים בבסיס</li>
                </ul>
                <p className="font-bold mt-3">כדי לא ללכת לאיבוד בתוך כמות הפוסטים הרחבה מומלץ לעבור כל פעם לפני משימה</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>זמן: 15 דקות</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              השתמש בפילטרים לסינון לפי מיקום, תאריך ומילות מפתח. בחר את הפוסטים
              הרלוונטיים למשימה ולחץ על "סיים בדיקה" בסיום.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
