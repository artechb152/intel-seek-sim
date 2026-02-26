import { MapPin, Calendar, Search, Filter, RotateCcw, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { locationOptions, keywordSuggestions } from '@/constants/locations';

interface FiltersSidebarProps {
  // Location
  selectedLocation: string;
  onLocationChange: (location: string) => void;

  // Date/Time
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onFromTimeChange: (time: string) => void;
  onToTimeChange: (time: string) => void;

  // Keywords
  searchKeywords: string;
  onSearchKeywordsChange: (keywords: string) => void;

  // Saved
  showSavedOnly: boolean;
  savedCount: number;
  onShowSavedOnlyChange: (show: boolean) => void;

  // Actions
  onReset: () => void;
  onApply: () => void;
  isFiltering: boolean;
  resultsCount: number;
}

export const FiltersSidebar = ({ selectedLocation, onLocationChange, fromDate, toDate, fromTime, toTime, onFromDateChange, onToDateChange, onFromTimeChange, onToTimeChange, searchKeywords, onSearchKeywordsChange, showSavedOnly, savedCount, onShowSavedOnlyChange, onReset, onApply, isFiltering, resultsCount }: FiltersSidebarProps) => {
  return (
    <aside className="w-80 glass-panel rounded-xl p-4 space-y-6 overflow-y-auto scrollbar-tactical">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          פילטרים
        </h2>
        <button onClick={onReset} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="איפוס פילטרים">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Saved Filter */}
      <button onClick={() => onShowSavedOnlyChange(!showSavedOnly)} className={cn('w-full flex items-center gap-2 p-3 rounded-lg border transition-all', showSavedOnly ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-secondary/50 border-border text-muted-foreground hover:border-primary/30')}>
        <Bookmark className={cn('w-4 h-4', showSavedOnly && 'fill-current')} />
        <span className="font-medium">שמורים ({savedCount})</span>
      </button>

      {/* Location Filter */}
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
        <div className="flex flex-wrap gap-2">
          {locationOptions.map((loc) => (
            <Badge key={loc.label} variant="outline" className={cn('cursor-pointer hover:bg-primary/20 hover:border-primary/50', (loc.value === '' ? selectedLocation === '' : selectedLocation.includes(loc.value)) && 'bg-primary/20 border-primary/50')} onClick={() => onLocationChange(selectedLocation === loc.value ? '' : loc.value)}>
              {loc.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Date/Time Filter */}
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
            <Input type="time" className="bg-secondary/50 [color-scheme:dark]" value={fromTime} onChange={(e) => onFromTimeChange(e.target.value)} />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">עד שעה</span>
            <Input type="time" className="bg-secondary/50 [color-scheme:dark]" value={toTime} onChange={(e) => onToTimeChange(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Keywords Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          האשטגים
        </label>
        <Input placeholder="כומתה, יחידה, דרגה..." value={searchKeywords} onChange={(e) => onSearchKeywordsChange(e.target.value)} className="bg-secondary/50" />
        <div className="flex flex-wrap gap-1">
          {keywordSuggestions.map((kw) => (
            <Badge key={kw} className={cn('cursor-pointer', searchKeywords.includes(kw) ? 'bg-primary/40 text-primary-foreground' : 'bg-primary/20 text-primary hover:bg-primary/30')} onClick={() => onSearchKeywordsChange(searchKeywords ? searchKeywords + ', ' + kw : kw)}>
              {kw}
            </Badge>
          ))}
        </div>
      </div>

      {/* Apply Button */}
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

      {/* Results Counter */}
      <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
        <p className="text-xs text-primary text-center">✓ {resultsCount} תוצאות</p>
      </div>
    </aside>
  );
};
