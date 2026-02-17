import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ChevronLeft, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { quizSteps } from '@/constants/quiz';
import { mockPosts } from '@/constants/posts';
import { getBaseStructureImage } from '@/constants/images';
import { getPlatformColor, getPlatformIcon } from '@/lib/platform-helpers';
import type { Post } from '@/types';

interface QuizPopupProps {
  open: boolean;
  onClose: () => void;
  correctCount: number;
  wrongCount: number;
  totalSelected: number;
}

interface PostMiniCardProps {
  post: Post;
  onClick: () => void;
}

const PostMiniCard = ({ post, onClick }: PostMiniCardProps) => (
  <button onClick={onClick} className="relative rounded-lg overflow-hidden bg-secondary aspect-square cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
    <img
      src={post.image}
      // alt={`פוסט של ${post.user}`}
      className="w-full h-full object-cover"
    />
    <div className={cn('absolute top-1 right-1 px-1.5 py-0.5 rounded text-white text-[8px] font-medium flex items-center gap-0.5', getPlatformColor(post.platform))}>{getPlatformIcon(post.platform)}</div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
      <p className="text-[9px] text-foreground line-clamp-2">{post.content}</p>
    </div>
  </button>
);

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
}

const PostDetailModal = ({ post, onClose }: PostDetailModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-[60]" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {/* <span>@{post.user}</span> */}
            <Badge className={getPlatformColor(post.platform)}>{post.platform}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4" dir="rtl">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={post.image}
              // alt={`פוסט של ${post.user}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.timestamp}</span>
            </div>

            <p className="text-foreground text-sm">{post.content}</p>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{post.location}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw, i) => (
                <Badge key={i} variant="outline" className="text-primary border-primary/50">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ImageAnswerCardProps {
  image?: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  showCorrectAnswer: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ImageAnswerCard = ({ image, index, isSelected, isCorrect, showFeedback, showCorrectAnswer, onClick, disabled }: ImageAnswerCardProps) => {
  const showResult = showFeedback && isSelected;

  return (
    <button onClick={onClick} disabled={disabled} className={cn('relative rounded-xl overflow-hidden border-4 transition-all duration-200 aspect-[3/4]', showResult && isCorrect ? 'border-emerald-500 ring-2 ring-emerald-500/50' : showResult && !isCorrect ? 'border-red-500 ring-2 ring-red-500/50' : showCorrectAnswer ? 'border-emerald-500 ring-2 ring-emerald-500/50' : isSelected ? 'border-primary' : 'border-border hover:border-primary/50')}>
      <img src={image} alt={`מבנה בסיס ${index + 1}`} className="w-full h-full object-cover" />
      {/* Overlay indicator */}
      {(showResult || showCorrectAnswer) && (
        <div className={cn('absolute inset-0 flex items-center justify-center', showResult && isCorrect ? 'bg-emerald-500/30' : showResult && !isCorrect ? 'bg-red-500/30' : 'bg-emerald-500/20')}>
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', showResult && isCorrect ? 'bg-emerald-500 text-white' : showResult && !isCorrect ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white')}>{(showResult && isCorrect) || showCorrectAnswer ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}</div>
        </div>
      )}
      {/* Label */}
      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-sm font-medium">תמונה {index + 1}</div>
    </button>
  );
};

export const QuizPopup = ({ open, onClose, correctCount, wrongCount, totalSelected }: QuizPopupProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stepResults, setStepResults] = useState<boolean[]>([]);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const currentQuestion = quizSteps[currentStep];
  const isLastStep = currentStep === quizSteps.length - 1;
  const isImageQuestion = currentQuestion.isImageQuestion;

  const relatedPosts = currentQuestion.relatedPostIds.map((id) => mockPosts.find((p) => p.id === id)).filter((p): p is Post => p !== undefined);

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
      navigate('/results', {
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
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className={cn('transition-all duration-300', isImageQuestion ? 'max-w-3xl' : showFeedback ? 'max-w-xl' : 'max-w-lg')} onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>שאלון סיכום</span>
              <div className="flex items-center gap-2">
                {quizSteps.map((_, idx) => (
                  <div key={idx} className={cn('w-2.5 h-2.5 rounded-full transition-all', idx === currentStep ? 'bg-primary scale-125' : idx < currentStep ? (stepResults[idx] ? 'bg-emerald-500' : 'bg-red-500') : 'bg-muted')} />
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
              <h3 className="text-lg font-semibold text-foreground text-center">{currentQuestion.question}</h3>
            </div>

            {/* Answers - Image or Text */}
            {isImageQuestion ? (
              <div className="grid grid-cols-4 gap-4">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswer === answer.id;
                  const isCorrect = answer.isCorrect;
                  const showCorrectAnswer = showFeedback && isCorrect && !isSelected;

                  return <ImageAnswerCard key={answer.id} image={answer.image} index={index} isSelected={isSelected} isCorrect={isCorrect} showFeedback={showFeedback} showCorrectAnswer={showCorrectAnswer} onClick={() => handleSelectAnswer(answer.id)} disabled={showFeedback} />;
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
                    <button key={answer.id} onClick={() => handleSelectAnswer(answer.id)} disabled={showFeedback} className={cn('w-full text-right p-3 rounded-lg border transition-all duration-200 flex items-center gap-3', showResult && isCorrect ? 'border-emerald-500 bg-emerald-500/20 text-foreground' : showResult && !isCorrect ? 'border-red-500 bg-red-500/20 text-foreground' : showCorrectAnswer ? 'border-emerald-500 bg-emerald-500/10 text-foreground' : isSelected ? 'border-primary bg-primary/20 text-foreground' : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary')}>
                      {/* Status indicator */}
                      <div className={cn('w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all', showResult && isCorrect ? 'bg-emerald-500 text-white' : showResult && !isCorrect ? 'bg-red-500 text-white' : showCorrectAnswer ? 'bg-emerald-500 text-white' : 'border-2 border-muted-foreground/50')}>
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
                <h4 className="text-sm font-medium text-muted-foreground text-center">הפוסטים מהם היה ניתן להבין</h4>
                <div className="grid grid-cols-4 gap-2">
                  {relatedPosts.map((post) => (
                    <PostMiniCard key={post.id} post={post} onClick={() => setViewingPost(post)} />
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

      {/* Nested post detail modal */}
      <PostDetailModal post={viewingPost} onClose={() => setViewingPost(null)} />
    </>
  );
};
