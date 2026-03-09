import { ChevronLeft, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { GameHeaderProps } from '@/types/game';

export const GameHeader = ({ selectedCount, totalCount, timeRemaining, formattedTime, onBack, onShowMission, onSubmit }: GameHeaderProps) => {
  return (
    <header className="glass-panel rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-4">
      <Button variant="ghost" onClick={onBack} className="gap-2 hover:text-primary hover:bg-primary/10">
        <ChevronLeft className="w-4 h-4" />
        חזור
      </Button>

      <div className="flex items-center gap-4 flex-wrap">
        <button onClick={onShowMission} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all cursor-pointer">
          <Target className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">פרטי המשימה </span>
        </button>

        <div className="h-8 w-px bg-border hidden sm:block" />

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">נבחרו:</span>
            <Badge variant="outline" className="font-mono">
              {selectedCount}/100
            </Badge>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div
          className={cn('flex items-center gap-2 font-mono text-lg font-bold', timeRemaining <= 180 ? 'text-destructive' : 'text-foreground', timeRemaining <= 60 && 'animate-pulse')}
        >
          <Clock className="w-5 h-5" />
          <span>{formattedTime}</span>
        </div>
      </div>

      <Button variant="tactical" onClick={onSubmit} className="animate-pulse-glow">
        מעבר לשאלון
      </Button>
    </header>
  );
};
