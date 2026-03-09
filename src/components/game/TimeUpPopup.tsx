import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface TimeUpPopupProps {
  open: boolean;
  onStartQuiz: () => void;
}

export const TimeUpPopup = ({ open, onStartQuiz }: TimeUpPopupProps) => {
  const getNotesContent = () => {
    const editor = document.getElementById('notes-editor');
    return editor?.innerHTML || '';
  };

  const notesHtml = open ? getNotesContent() : '';
  const hasNotes = notesHtml.replace(/<[^>]*>/g, '').trim().length > 0;

  return (
    <Dialog open={open}>
      <DialogContent
        className="glass-panel border-primary/30 sm:max-w-xl [&>button.absolute]:hidden"
        dir="rtl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center border-2 border-destructive shadow-[0_0_25px_rgba(239,68,68,0.4)]">
              <Clock className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            נגמר הזמן
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center text-foreground leading-relaxed">
            <p>מקווים שהצלחתם לאסוף כמה שיותר מידע.</p>
            <p className="mt-1">
              לרשותכם פתקית ההערות שרשמתם במהלך המשימה – מומלץ לעבור עליה לפני
              המעבר לשאלון.
            </p>
          </div>

          {hasNotes && (
            <div className="p-4 rounded-lg bg-secondary/50 border border-border max-h-48 overflow-y-auto scrollbar-tactical">
              <div
                className="text-sm text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: notesHtml }}
              />
            </div>
          )}
        </div>

        <Button
          variant="tactical"
          onClick={onStartQuiz}
          className="w-full mt-4 animate-pulse-glow"
        >
          מעבר לשאלון
        </Button>
      </DialogContent>
    </Dialog>
  );
};
