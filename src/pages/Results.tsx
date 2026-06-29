import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, XCircle, RotateCcw, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { passed = false } = location.state || {};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {passed ? (
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        ) : (
          <div className="absolute inset-0 bg-gradient-radial from-destructive/10 via-transparent to-transparent" />
        )}
      </div>

      <div className="glass-panel rounded-2xl p-8 max-w-lg w-full text-center relative z-10">
        {/* Status Icon */}
        <div className={cn(
          "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
          passed 
            ? "bg-primary/20 glow-blue" 
            : "bg-destructive/20"
        )}>
          {passed ? (
            <Trophy className="w-12 h-12 text-primary animate-pulse-glow" />
          ) : (
            <XCircle className="w-12 h-12 text-destructive" />
          )}
        </div>

        {/* Title */}
        <h1 className={cn(
          "text-4xl font-bold mb-4",
          passed ? "text-gradient-tactical" : "text-destructive"
        )}>
          {passed ? "כל הכבוד!" : "לא הצלחת לעבור הפעם"}
        </h1>

        {/* Educational Message */}
        <div className="text-right space-y-4 mb-8">
          {passed ? (
            <>
              <p className="text-foreground leading-relaxed">
                הצלחת לאתר מידע רלוונטי מתוך רעש דיגיטלי ולהוציא מודיעין איכותי מהרשתות החברתיות.
              </p>
              <p className="text-white leading-relaxed">
                היכולת של האויב לסנן לפי מיקום, זמן ומילות קוד מצביעה על דיוק גבוה ועבודת איסוף מסודרת.
              </p>
              <div className="glass-panel rounded-xl p-4 mt-4 border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div className="text-right">
                    <p className="text-foreground font-medium mb-2">שים לב:</p>
                    <p className="text-white text-sm leading-relaxed">
                      ברשתות חברתיות אין "סתם תמונה". כל פוסט, סטורי או סרטון עשוי לחשוף פרטים מבצעיים: מיקום, שגרה, יחידות, ציוד, דרגות ודפוסי פעילות.
                    </p>
                    <p className="text-primary font-bold mt-3">
                      תזכור: כל תמונה היא מידע לאויב.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-foreground leading-relaxed">
                המידע היה שם, וניתן היה למצוא מידע מהרשת החברתית.
              </p>
              <div className="glass-panel rounded-xl p-4 mt-4 border-l-4 border-destructive">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div className="text-right">
                    <p className="text-foreground font-medium mb-2">ברשתות חברתיות אין "סתם תוכן":</p>
                    <p className="text-white text-sm leading-relaxed">
                      כל פוסט, סטורי או סרטון יכול לחשוף מיקום, זמן, יחידה, דרגה ודפוסי פעילות.
                    </p>
                    <p className="text-destructive font-bold mt-3">
                      זכור: כל תמונה היא מידע לאויב - והשאלה היא מי יזהה אותה ראשון ובדיוק גבוה יותר.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="tacticalOutline" 
            className="flex-1"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 ml-2" />
            דף הבית
          </Button>
          <Button 
            variant="tactical" 
            className="flex-1"
            onClick={() => navigate("/game")}
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            שחק שוב
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
