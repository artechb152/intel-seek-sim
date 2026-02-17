import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Search, Filter, RotateCcw, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { keywordSuggestions } from '@/constants/locations';

const CustomTimePicker = ({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');

    if (!val) {
      onChange('');
      return;
    }

    let h = '';
    let m = '';

    if (val.length === 1) {
      h = val;
    } else if (val.length === 2) {
      if (parseInt(val, 10) > 23) {
        h = '0' + val[0];
        m = val[1];
      } else {
        h = val;
      }
    } else if (val.length === 3) {
      if (parseInt(val.substring(0, 2), 10) > 23) {
        h = '0' + val[0];
        m = val.substring(1, 3);
      } else {
        h = val.substring(0, 2);
        m = val[2];
      }
    } else if (val.length >= 4) {
      val = val.substring(0, 4);
      h = val.substring(0, 2);
      m = val.substring(2, 4);
    }

    if (h && parseInt(h, 10) > 23) h = '23';
    if (m && parseInt(m, 10) > 59) m = '59';

    let formatted = h;
    if (m) formatted += ':' + m;

    onChange(formatted);
  };

  const setHour = (h: string) => {
    const [_, m = '00'] = (value || '').split(':');
    onChange(`${h}:${m}`);
  };

  const setMin = (m: string) => {
    const [h = '00'] = (value || '').split(':');
    onChange(`${h}:${m}`);
    setIsOpen(false);
  };

  const [currentH = '', currentM = ''] = (value || '').split(':');
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="relative" ref={ref}>
      <Input type="text" placeholder={placeholder} value={value} onChange={handleInputChange} onFocus={() => setIsOpen(true)} className="bg-secondary/50 text-center text-sm cursor-text" />
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 h-48 bg-background border border-primary/30 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.5)] flex z-50 overflow-hidden divide-x divide-border/50">
          <div className="flex-1 overflow-y-auto scrollbar-tactical">
            <div className="sticky top-0 bg-secondary/90 text-[10px] text-center py-1 font-bold text-muted-foreground backdrop-blur-sm">דקות</div>
            {minutes.map((m) => (
              <div key={m} onClick={() => setMin(m)} className={cn('py-1.5 text-center text-sm cursor-pointer hover:bg-primary/20 transition-colors', currentM === m && 'bg-primary/40 text-primary font-bold')}>
                {m}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-tactical">
            <div className="sticky top-0 bg-secondary/90 text-[10px] text-center py-1 font-bold text-muted-foreground backdrop-blur-sm">שעות</div>
            {hours.map((h) => (
              <div key={h} onClick={() => setHour(h)} className={cn('py-1.5 text-center text-sm cursor-pointer hover:bg-primary/20 transition-colors', currentH === h && 'bg-primary/40 text-primary font-bold')}>
                {h}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface FiltersSidebarProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onFromTimeChange: (time: string) => void;
  onToTimeChange: (time: string) => void;
  searchKeywords: string;
  onSearchKeywordsChange: (keywords: string) => void;
  showSavedOnly: boolean;
  savedCount: number;
  onShowSavedOnlyChange: (show: boolean) => void;
  onReset: () => void;
  onApply: () => void;
  isFiltering: boolean;
  resultsCount: number;
}

export const FiltersSidebar = ({ selectedLocation, onLocationChange, fromDate, toDate, fromTime, toTime, onFromDateChange, onToDateChange, onFromTimeChange, onToTimeChange, searchKeywords, onSearchKeywordsChange, showSavedOnly, savedCount, onShowSavedOnlyChange, onReset, onApply, isFiltering, resultsCount }: FiltersSidebarProps) => {
  return (
    <aside className="w-80 glass-panel rounded-xl p-4 space-y-6 overflow-y-auto scrollbar-tactical">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          פילטרים
        </h2>
        <button onClick={onReset} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="איפוס פילטרים">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <button onClick={() => onShowSavedOnlyChange(!showSavedOnly)} className={cn('w-full flex items-center gap-2 p-3 rounded-lg border transition-all', showSavedOnly ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-secondary/50 border-border text-muted-foreground hover:border-primary/30')}>
        <Bookmark className={cn('w-4 h-4', showSavedOnly && 'fill-current')} />
        <span className="font-medium">שמורים ({savedCount})</span>
      </button>

      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          מיקום
        </label>
        <div className="aspect-[4/3] bg-secondary rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-40 bg-primary/20 rounded-full rotate-12 border border-primary/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <Input placeholder="הזן עיר או אזור..." value={selectedLocation} onChange={(e) => onLocationChange(e.target.value)} className="bg-background/80 text-xs" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            תאריך ושעה
          </label>
          <button onClick={onReset} className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="איפוס כל הפילטרים">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-muted-foreground">מתאריך</span>
            <Input type="date" className="bg-secondary/50 [color-scheme:dark]" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">עד תאריך</span>
            <Input type="date" className="bg-secondary/50 [color-scheme:dark]" value={toDate} onChange={(e) => onToDateChange(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-muted-foreground">משעה</span>
            <CustomTimePicker value={fromTime} onChange={onFromTimeChange} placeholder="00:00" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">עד שעה</span>
            <CustomTimePicker value={toTime} onChange={onToTimeChange} placeholder="00:00" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          מילות קוד
        </label>
        <Input placeholder="כומתה, יחידה, דרגה..." value={searchKeywords} onChange={(e) => onSearchKeywordsChange(e.target.value)} className="bg-secondary/50" />
        <div className="flex flex-wrap gap-1">
          {keywordSuggestions.map((kw) => (
            <Badge key={kw} className={cn('cursor-pointer transition-colors', searchKeywords === kw ? 'bg-primary/40 text-primary-foreground' : 'bg-primary/20 text-primary hover:bg-primary/30')} onClick={() => onSearchKeywordsChange(searchKeywords === kw ? '' : kw)}>
              {kw}
            </Badge>
          ))}
        </div>
      </div>

      <Button variant="tacticalOutline" className="w-full" onClick={onApply} disabled={isFiltering}>
        {isFiltering ? (
          <>
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            מחפש...
          </>
        ) : (
          'החל פילטרים'
        )}
      </Button>

      <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
        <p className="text-xs text-primary text-center">✓ {resultsCount} תוצאות</p>
      </div>
    </aside>
  );
};
