import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { quizAnswers, REQUIRED_ANSWERS, PASSING_SCORE } from "@/constants/quiz";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correct = 0, wrong = 0, total = 0 } = location.state || {};

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleSelectAnswer = (answerId: number) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(answerId)) {
        return prev.filter((id) => id !== answerId);
      }
      if (prev.length >= REQUIRED_ANSWERS) {
        return prev;
      }
      return [...prev, answerId];
    });
  };

  const handleSubmit = () => {
    const correctAnswers = selectedAnswers.filter(
      (id) => quizAnswers.find((a) => a.id === id)?.isCorrect
    ).length;
    const passed = correctAnswers >= PASSING_SCORE;
    navigate("/results", {
      state: {
        passed,
        correct,
        wrong,
        total,
        quizScore: correctAnswers,
        quizTotal: REQUIRED_ANSWERS,
      },
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
          <p className="text-muted-foreground">בחר {REQUIRED_ANSWERS} טענות נכונות מתוך הרשימה</p>
        </div>

        {/* Selection Counter */}
        <div className="mb-6 flex justify-center">
          <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
            <span className="text-primary font-medium">
              נבחרו: {selectedAnswers.length}/{REQUIRED_ANSWERS}
            </span>
          </div>
        </div>

        {/* Answers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
          {quizAnswers.map((answer) => {
            const isSelected = selectedAnswers.includes(answer.id);
            const isDisabled = !isSelected && selectedAnswers.length >= REQUIRED_ANSWERS;

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
                {/* Radio Button Indicator */}
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/50"
                  )}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
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
            disabled={selectedAnswers.length !== REQUIRED_ANSWERS}
            size="sm"
            className="flex-1 animate-pulse-glow"
          >
            סיים שאלון
          </Button>
        </div>

        {selectedAnswers.length !== REQUIRED_ANSWERS && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            יש לבחור בדיוק {REQUIRED_ANSWERS} תשובות
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
