import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { GameHeaderProps } from '@/types/game';

export const GameHeader = ({ selectedCount, totalCount, timeRemaining, formattedTime, onSubmit }: GameHeaderProps) => {
  return (
    <header className="glass-panel rounded-xl p-4 mb-4 flex items-center justify-center flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-normal text-white">נבחרו:</span>
            <Badge variant="outline" className="font-mono text-lg font-bold border-0 bg-transparent px-0">
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

        <div className="h-8 w-px bg-border" />

        <Button variant="tactical" onClick={onSubmit} className="bg-none bg-blue-500 shadow-none hover:shadow-none hover:scale-100 hover:bg-blue-600">
          מעבר לשאלון
        </Button>
      </div>
    </header>
  );
};
