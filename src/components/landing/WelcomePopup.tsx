import { useState } from "react";
import { X, Target, Filter, CheckCircle } from "lucide-react";
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
      <DialogContent className="glass-panel border-primary/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            <span className="text-gradient-tactical">ברוך הבא</span>
            <br />
            <span className="text-foreground">לסימולטור איסוף מודיעין</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/20">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">השתמש בפילטרים</h4>
              <p className="text-sm text-muted-foreground">סנן לפי מיקום, תאריך ומילות קוד לדיוק מקסימלי</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/20">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">בחר פוסטים רלוונטיים</h4>
              <p className="text-sm text-muted-foreground">סמן רק את הפוסטים שתואמים למשימה</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-accent/20">
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">10 הצלחות = מעבר</h4>
              <p className="text-sm text-muted-foreground">הגע ל-10 בחירות נכונות מתוך 30 פוסטים</p>
            </div>
          </div>
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
