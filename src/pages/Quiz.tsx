import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

const answers: Answer[] = [
  { id: 1, text: "פרסום תמונה עם כומתה צבאית חושף את היחידה והתפקיד", isCorrect: true },
  { id: 2, text: "תמונה עם תגית מיקום מאפשרת לזהות את המיקום המדויק, הזמן ודפוס הפעילות", isCorrect: true },
  { id: 3, text: "שיתוף שגרה יומית מאפשר לאויב לחזות תנועות ולתכנן פעולות", isCorrect: true },
  { id: 4, text: "סטורי שנעלם אחרי 24 שעות בטוח לפרסום כי הוא נמחק", isCorrect: false },
  { id: 5, text: "ניתן לזהות יחידה מתוך תמונה לפי סמלים, רקע, ציוד ואנשים", isCorrect: true },
  { id: 6, text: "צילום מחוץ לבסיס לא מהווה סיכון ביטחוני", isCorrect: false },
  { id: 7, text: "תגובות וחברים ברשת יכולים לחשוף קשרים, יחידות ומידע על אחרים", isCorrect: true },
  { id: 8, text: "פרופיל פרטי מספיק כדי להגן על מידע רגיש", isCorrect: false },
  { id: 9, text: "אין בעיה לפרסם תמונות מטווחים אם לא רואים נשק", isCorrect: false },
  { id: 10, text: "מותר לפרסם תמונות מאירוע יחידתי לאחר אישור מג\"ד", isCorrect: false },
];

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correct = 0, wrong = 0, total = 0 } = location.state || {};
  
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleSelectAnswer = (answerId: number) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answerId)) {
        return prev.filter(id => id !== answerId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, answerId];
    });
  };

  const handleSubmit = () => {
    const correctAnswers = selectedAnswers.filter(id => 
      answers.find(a => a.id === id)?.isCorrect
    ).length;
    const passed = correctAnswers >= 4;
    navigate("/results", { 
      state: { 
        passed, 
        correct, 
        wrong, 
        total,
        quizScore: correctAnswers,
        quizTotal: 5 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="glass-panel rounded-2xl p-6 max-w-3xl w-full relative z-10" dir="rtl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">שאלה סופית</h2>
          <p className="text-muted-foreground">בחר 5 טענות נכונות מתוך הרשימה</p>
        </div>

        {/* Selection Counter */}
        <div className="mb-6 flex justify-center">
          <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
            <span className="text-primary font-medium">נבחרו: {selectedAnswers.length}/5</span>
          </div>
        </div>

        {/* Answers - Grid Layout for Static View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
          {answers.map((answer) => {
            const isSelected = selectedAnswers.includes(answer.id);
            const isDisabled = !isSelected && selectedAnswers.length >= 5;
            
            return (
              <button
                key={answer.id}
                onClick={() => handleSelectAnswer(answer.id)}
                disabled={isDisabled}
                className={cn(
                  "w-full text-right p-3 rounded-lg border transition-all duration-200 flex items-center gap-2",
                  isSelected
                    ? "border-primary bg-primary/20 text-foreground"
                    : isDisabled
                      ? "border-border bg-secondary/30 text-muted-foreground/50 cursor-not-allowed"
                      : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary"
                )}
              >
                {/* Radio Button Style Indicator */}
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                  isSelected 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground/50"
                )}>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm">{answer.text}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="tacticalOutline"
            onClick={() => navigate("/game")}
            size="sm"
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            חזור
          </Button>
          
          <Button
            variant="tactical"
            onClick={handleSubmit}
            disabled={selectedAnswers.length !== 5}
            size="sm"
            className="flex-1 animate-pulse-glow"
          >
            סיים שאלון
          </Button>
        </div>

        {selectedAnswers.length !== 5 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            יש לבחור בדיוק 5 תשובות
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
