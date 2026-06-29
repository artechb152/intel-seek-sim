import { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Helpers - all values are stored in ISO so parent logic is unchanged */
/* ------------------------------------------------------------------ */

// ISO "yyyy-mm-dd" -> displayed "dd/mm/yyyy"
const formatDateForDisplay = (iso: string): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return '';
  return `${d}/${m}/${y}`;
};

const isoToDate = (iso: string): Date | undefined => {
  if (!iso) return undefined;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
};

const dateToIso = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

interface DateFieldProps {
  label: string;
  value: string; // ISO yyyy-mm-dd
  onChange: (iso: string) => void;
  fromDate?: Date;
  toDate?: Date;
  defaultMonth?: Date;
}

export const DateField = ({
  label,
  value,
  onChange,
  fromDate,
  toDate,
  defaultMonth,
}: DateFieldProps) => {
  const [open, setOpen] = useState(false);
  const selected = isoToDate(value);

  return (
    <div className="space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/50 px-3 text-sm transition-colors hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className={cn(!value && 'text-muted-foreground')}>
              {value ? formatDateForDisplay(value) : 'dd/mm/yyyy'}
            </span>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" dir="ltr">
          <Calendar
            mode="single"
            selected={selected}
            defaultMonth={selected ?? defaultMonth}
            fromDate={fromDate}
            toDate={toDate}
            onSelect={(date) => {
              onChange(date ? dateToIso(date) : '');
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Time field - native 24h, no locale-dependent am/pm                 */
/* ------------------------------------------------------------------ */

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0')
);

interface TimeFieldProps {
  label: string;
  value: string; // "HH:mm"
  onChange: (value: string) => void;
}

export const TimeField = ({ label, value, onChange }: TimeFieldProps) => {
  const [open, setOpen] = useState(false);
  const [h, m] = value ? value.split(':') : ['', ''];

  const setPart = (hour: string, minute: string) => {
    onChange(`${hour}:${minute}`);
  };

  return (
    <div className="space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/50 px-3 text-sm transition-colors hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className={cn(!value && 'text-muted-foreground')}>
              {value || '--:--'}
            </span>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" dir="ltr">
          <div className="flex h-48">
            <ScrollColumn
              values={HOURS}
              selected={h}
              onSelect={(hour) => setPart(hour, m || '00')}
            />
            <div className="w-px bg-border" />
            <ScrollColumn
              values={MINUTES}
              selected={m}
              onSelect={(minute) => setPart(h || '00', minute)}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface ScrollColumnProps {
  values: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const ScrollColumn = ({ values, selected, onSelect }: ScrollColumnProps) => (
  <div className="scrollbar-tactical w-14 overflow-y-auto py-1">
    {values.map((v) => (
      <button
        key={v}
        type="button"
        onClick={() => onSelect(v)}
        className={cn(
          'w-full px-3 py-1.5 text-center text-sm transition-colors hover:bg-primary/15',
          selected === v
            ? 'bg-primary/25 font-semibold text-primary'
            : 'text-foreground'
        )}
      >
        {v}
      </button>
    ))}
  </div>
);
