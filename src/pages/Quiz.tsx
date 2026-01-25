import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "מה הסיכון העיקרי בפרסום תמונה עם כומתה צבאית?",
    options: [
      "אין סיכון, זו רק כומתה",
      "חשיפת היחידה והתפקיד",
      "בעיה רק אם יש שם מלא",
      "מותר לפרסם אחרי שחרור"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: "איזה מידע ניתן לחלץ מתמונה עם תגית מיקום?",
    options: [
      "רק שם העיר",
      "המיקום המדויק, הזמן ודפוס הפעילות",
      "שום דבר מיוחד",
      "רק אם יש GPS פעיל"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    question: "מדוע שיתוף שגרה יומית מסוכן?",
    options: [
      "זה לא מסוכן",
      "מאפשר לאויב לחזות תנועות ולתכנן פעולות",
      "רק אם משתפים את השעה המדויקת",
      "מסוכן רק בזמן מלחמה"
    ],
    correctIndex: 1
  },
  {
    id: 4,
    question: "מה הבעיה בפרסום תמונה מאירוע יחידתי?",
    options: [
      "אין בעיה אם אין פרצופים",
      "חשיפת מספר חיילים, ציוד ומיקום",
      "בעיה רק אם יש לוגו",
      "מותר אחרי אישור מג\"ד"
    ],
    correctIndex: 1
  },
  {
    id: 5,
    question: "איך ניתן לזהות יחידה מתוך תמונה?",
    options: [
      "רק לפי כומתה",
      "סמלים, רקע, ציוד, אנשים וטקסט",
      "רק אם כתוב במפורש",
      "אי אפשר לזהות מתמונה"
    ],
    correctIndex: 1
  },
  {
    id: 6,
    question: "מה הסכנה בצילום מחוץ לבסיס?",
    options: [
      "אין סכנה - זה מחוץ לבסיס",
      "חשיפת דפוסי כניסה/יציאה ושגרה",
      "מותר לצלם בכניסה",
      "סכנה רק אם רואים שלט"
    ],
    correctIndex: 1
  },
  {
    id: 7,
    question: "למה לא לפרסם תמונות מטווחים?",
    options: [
      "זה מותר אם אין נשק",
      "חשיפת סוג הנשק, היחידה והמיקום",
      "אין בעיה בתמונות טווח",
      "רק בעיה אם יש כדורים"
    ],
    correctIndex: 1
  },
  {
    id: 8,
    question: "מה ניתן ללמוד מתגובות וחברים ברשת?",
    options: [
      "שום דבר חשוב",
      "קשרים, יחידות, ומידע על אחרים",
      "רק אם מתייגים",
      "לא ניתן ללמוד מתגובות"
    ],
    correctIndex: 1
  },
  {
    id: 9,
    question: "מדוע סטורי \"נעלם\" אחרי 24 שעות אינו בטוח?",
    options: [
      "כי הוא באמת נעלם",
      "כי ניתן לצלם מסך ולשמור",
      "בטוח לפרסם בסטורי",
      "רק אם יש יותר מ-100 צפיות"
    ],
    correctIndex: 1
  },
  {
    id: 10,
    question: "מה הדרך הטובה ביותר להגן על עצמך?",
    options: [
      "לא לפרסם כלום",
      "מודעות, שיקול דעת והבנת ההשפעה",
      "להסתיר רק מידע צבאי",
      "להשתמש בפרופיל פרטי"
    ],
    correctIndex: 1
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correct = 0, wrong = 0, total = 0 } = location.state || {};
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctIndex).length;
    const passed = correctAnswers >= 7;
    navigate("/results", { 
      state: { 
        passed, 
        correct, 
        wrong, 
        total,
        quizScore: correctAnswers,
        quizTotal: questions.length 
      } 
    });
  };

  const currentQ = questions[currentQuestion];
  const allAnswered = answers.every(a => a !== -1);
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="glass-panel rounded-2xl p-8 max-w-2xl w-full relative z-10" dir="rtl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">שאלה {currentQuestion + 1} מתוך {questions.length}</span>
            <span className="text-sm text-primary font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={cn(
                  "w-full text-right p-4 rounded-xl border transition-all duration-200",
                  answers[currentQuestion] === index
                    ? "border-primary bg-primary/20 text-foreground"
                    : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary"
                )}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Question Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={cn(
                "w-8 h-8 rounded-full text-xs font-medium transition-all",
                currentQuestion === index
                  ? "bg-primary text-primary-foreground"
                  : answers[index] !== -1
                    ? "bg-primary/30 text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="tacticalOutline"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            <ChevronRight className="w-4 h-4 ml-2" />
            הקודם
          </Button>
          
          {currentQuestion === questions.length - 1 ? (
            <Button
              variant="tactical"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex-1 animate-pulse-glow"
            >
              סיים שאלון
            </Button>
          ) : (
            <Button
              variant="tactical"
              onClick={handleNext}
              className="flex-1"
            >
              הבא
              <ChevronLeft className="w-4 h-4 mr-2" />
            </Button>
          )}
        </div>

        {!allAnswered && currentQuestion === questions.length - 1 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            יש לענות על כל השאלות לפני סיום
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
