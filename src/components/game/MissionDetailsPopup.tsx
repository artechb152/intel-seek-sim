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
              <p className="text-foreground text-base leading-relaxed font-medium">
                איספו מידע ובצעו ניתוח של בסיס ירקון לפי
              </p>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2 text-right">
              {[
                'מבנה הבסיס',
                'רמת הכוננות',
                'כמות החיילים',
                'התנהלות השמירות',
                'נוכחות בכירים בבסיס',
              ].map((item, i) => (
                <div
                  key={item}
                  className={`p-3 rounded-lg border-2 border-white bg-white/10 text-center ${
                    i < 3 ? 'col-span-2' : 'col-span-3'
                  }`}
                >
                  <p className="font-bold text-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-lg border-2 border-destructive bg-destructive/10 text-center">
              <p className="font-bold text-foreground">
                כדי לא ללכת לאיבוד בתוך כמות הפוסטים הרחבה מומלץ לעבוד כל פעם על
                משימה אחת
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white font-medium">
              <Clock className="w-4 h-4 text-primary" />
              <span>זמן: 15 דקות</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-white font-medium leading-relaxed">
              השתמשו בפילטרים לסינון לפי מיקום, תאריך ומילות מפתח. בחרו את
              הפוסטים הרלוונטיים למשימה ולחץ על "סיים בדיקה" בסיום.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
