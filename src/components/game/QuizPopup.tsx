import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { quizSteps } from "@/constants/quiz";
import { mockPosts } from "@/constants/posts";
import { getBaseStructureImage } from "@/constants/images";
import { getPlatformColor, getPlatformIcon } from "@/lib/platform-helpers";
import type { Post } from "@/types";

interface QuizPopupProps {
  open: boolean;
  onClose: () => void;
  correctCount: number;
  wrongCount: number;
  totalSelected: number;
}

interface PostMiniCardProps {
  post: Post;
}

const PostMiniCard = ({ post }: PostMiniCardProps) => (
  <div className="relative rounded-lg overflow-hidden bg-secondary aspect-square">
    <img
      src={post.image}
      alt={`פוסט של ${post.user}`}
      className="w-full h-full object-cover"
    />
    <div
      className={cn(
        "absolute top-1 right-1 px-1.5 py-0.5 rounded text-white text-[8px] font-medium flex items-center gap-0.5",
        getPlatformColor(post.platform)
      )}
    >
      {getPlatformIcon(post.platform)}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
      <p className="text-[9px] text-foreground line-clamp-2">{post.content}</p>
    </div>
  </div>
);

interface ImageAnswerCardProps {
  imageIndex: number;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  showCorrectAnswer: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ImageAnswerCard = ({
  imageIndex,
  isSelected,
  isCorrect,
  showFeedback,
  showCorrectAnswer,
  onClick,
  disabled,
}: ImageAnswerCardProps) => {
  const showResult = showFeedback && isSelected;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative rounded-xl overflow-hidden border-4 transition-all duration-200 aspect-square",
        showResult && isCorrect
          ? "border-accent ring-2 ring-accent/50"
          : showResult && !isCorrect
          ? "border-destructive ring-2 ring-destructive/50"
          : showCorrectAnswer
          ? "border-accent ring-2 ring-accent/50"
          : isSelected
          ? "border-primary"
          : "border-border hover:border-primary/50"
      )}
    >
      <img
        src={getBaseStructureImage(imageIndex)}
        alt={`מבנה בסיס ${imageIndex + 1}`}
        className="w-full h-full object-cover"
      />
      {/* Overlay indicator */}
      {(showResult || showCorrectAnswer) && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            showResult && isCorrect
              ? "bg-accent/30"
              : showResult && !isCorrect
              ? "bg-destructive/30"
              : "bg-accent/20"
          )}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              showResult && isCorrect
                ? "bg-accent text-accent-foreground"
                : showResult && !isCorrect
                ? "bg-destructive text-destructive-foreground"
                : "bg-accent text-accent-foreground"
            )}
          >
            {(showResult && isCorrect) || showCorrectAnswer ? (
              <Check className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </div>
        </div>
      )}
      {/* Label */}
      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-sm font-medium">
        תמונה {imageIndex + 1}
      </div>
    </button>
  );
};

export const QuizPopup = ({
  open,
  onClose,
  correctCount,
  wrongCount,
  totalSelected,
}: QuizPopupProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stepResults, setStepResults] = useState<boolean[]>([]);

  const currentQuestion = quizSteps[currentStep];
  const isLastStep = currentStep === quizSteps.length - 1;
  const isImageQuestion = currentQuestion.isImageQuestion;

  const relatedPosts = currentQuestion.relatedPostIds
    .map((id) => mockPosts.find((p) => p.id === id))
    .filter((p): p is Post => p !== undefined);

  const handleSelectAnswer = (answerId: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerId);
    setShowFeedback(true);

    const isCorrect = currentQuestion.answers.find((a) => a.id === answerId)?.isCorrect ?? false;
    setStepResults((prev) => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (isLastStep) {
      const quizScore = stepResults.filter(Boolean).length;
      navigate("/results", {
        state: {
          passed: quizScore >= 3,
          correct: correctCount,
          wrong: wrongCount,
          total: totalSelected,
          quizScore,
          quizTotal: quizSteps.length,
        },
      });
    } else {
      setCurrentStep((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setStepResults([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "transition-all duration-300",
          showFeedback ? "max-w-3xl" : "max-w-lg"
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>שאלון סיכום</span>
            <div className="flex items-center gap-2">
              {quizSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    idx === currentStep
                      ? "bg-primary scale-125"
                      : idx < currentStep
                      ? stepResults[idx]
                        ? "bg-accent"
                        : "bg-destructive"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4" dir="rtl">
          {/* Step indicator */}
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              שלב {currentStep + 1} מתוך {quizSteps.length}
            </span>
          </div>

          {/* Question */}
          <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground text-center">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Answers - Image or Text */}
          {isImageQuestion ? (
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.answers.map((answer) => {
                const isSelected = selectedAnswer === answer.id;
                const isCorrect = answer.isCorrect;
                const showCorrectAnswer = showFeedback && isCorrect && !isSelected;

                return (
                  <ImageAnswerCard
                    key={answer.id}
                    imageIndex={answer.imageIndex ?? 0}
                    isSelected={isSelected}
                    isCorrect={isCorrect}
                    showFeedback={showFeedback}
                    showCorrectAnswer={showCorrectAnswer}
                    onClick={() => handleSelectAnswer(answer.id)}
                    disabled={showFeedback}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {currentQuestion.answers.map((answer) => {
                const isSelected = selectedAnswer === answer.id;
                const isCorrect = answer.isCorrect;
                const showResult = showFeedback && isSelected;
                const showCorrectAnswer = showFeedback && isCorrect && !isSelected;

                return (
                  <button
                    key={answer.id}
                    onClick={() => handleSelectAnswer(answer.id)}
                    disabled={showFeedback}
                    className={cn(
                      "w-full text-right p-3 rounded-lg border transition-all duration-200 flex items-center gap-3",
                      showResult && isCorrect
                        ? "border-accent bg-accent/20 text-foreground"
                        : showResult && !isCorrect
                        ? "border-destructive bg-destructive/20 text-foreground"
                        : showCorrectAnswer
                        ? "border-accent bg-accent/10 text-foreground"
                        : isSelected
                        ? "border-primary bg-primary/20 text-foreground"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    {/* Status indicator */}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all",
                        showResult && isCorrect
                          ? "bg-accent text-accent-foreground"
                          : showResult && !isCorrect
                          ? "bg-destructive text-destructive-foreground"
                          : showCorrectAnswer
                          ? "bg-accent text-accent-foreground"
                          : "border-2 border-muted-foreground/50"
                      )}
                    >
                      {showResult && isCorrect && <Check className="w-4 h-4" />}
                      {showResult && !isCorrect && <X className="w-4 h-4" />}
                      {showCorrectAnswer && <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-sm">{answer.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback Section - Related Posts */}
          {showFeedback && (
            <div className="space-y-3 pt-4 border-t border-border animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h4 className="text-sm font-medium text-muted-foreground text-center">
                הפוסטים מהם היה ניתן להבין
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {relatedPosts.map((post) => (
                  <PostMiniCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {showFeedback && (
            <div className="flex justify-center pt-2">
              <Button variant="tactical" onClick={handleNext} className="gap-2">
                {isLastStep ? (
                  <>
                    סיים שאלון
                    <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    לשאלה הבאה
                    <ChevronLeft className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
