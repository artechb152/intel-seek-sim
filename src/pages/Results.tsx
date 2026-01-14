import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, XCircle, Target, Clock, TrendingUp, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { passed = false, correct = 0, wrong = 0, total = 0 } = location.state || {};
  
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

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

      <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center relative z-10">
        {/* Status Icon */}
        <div className={cn(
          "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
          passed 
            ? "bg-primary/20 glow-green" 
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
          "text-4xl font-bold mb-2",
          passed ? "text-gradient-tactical" : "text-destructive"
        )}>
          {passed ? "עברת!" : "נכשלת"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {passed 
            ? "כל הכבוד! הצלחת לזהות את הפוסטים הרלוונטיים"
            : "נסה שוב - תרגול עושה מאסטר"
          }
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">דיוק</span>
            </div>
            <span className="text-3xl font-bold text-foreground">{accuracy}%</span>
          </div>
          
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">זמן</span>
            </div>
            <span className="text-3xl font-bold text-foreground">3:24</span>
          </div>
          
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">נכון</span>
            </div>
            <span className="text-3xl font-bold text-primary">{correct}</span>
          </div>
          
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-sm text-muted-foreground">שגוי</span>
            </div>
            <span className="text-3xl font-bold text-destructive">{wrong}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">התקדמות</span>
            <span className="text-foreground font-medium">{correct}/10 נדרש</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                passed ? "bg-gradient-to-r from-primary to-emerald-400" : "bg-destructive"
              )}
              style={{ width: `${Math.min((correct / 10) * 100, 100)}%` }}
            />
          </div>
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
