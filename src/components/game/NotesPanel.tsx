import { FileText, Bold, Italic, Underline, List, Trash2 } from 'lucide-react';

export const NotesPanel = () => {
  const execCommand = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="w-72 flex-shrink-0 glass-panel rounded-xl p-3 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3 text-foreground">
        <FileText className="w-4 h-4" />
        <h3 className="text-sm font-semibold">הערות</h3>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-2 pb-2 border-b border-foreground/10">
        <button
          onClick={() => execCommand('bold')}
          className="w-7 h-7 rounded flex items-center justify-center hover:bg-foreground/10 text-foreground/70 transition-colors"
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => execCommand('italic')}
          className="w-7 h-7 rounded flex items-center justify-center hover:bg-foreground/10 text-foreground/70 transition-colors"
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => execCommand('underline')}
          className="w-7 h-7 rounded flex items-center justify-center hover:bg-foreground/10 text-foreground/70 transition-colors"
          title="Underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => execCommand('insertUnorderedList')}
          className="w-7 h-7 rounded flex items-center justify-center hover:bg-foreground/10 text-foreground/70 transition-colors"
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <div className="flex-1" />
        <button
          onClick={() => {
            const editor = document.getElementById('notes-editor');
            if (editor) editor.innerHTML = '';
          }}
          className="w-7 h-7 rounded flex items-center justify-center hover:bg-red-500/20 text-foreground/50 hover:text-red-400 transition-colors"
          title="Clear Notes"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editable Area */}
      <div
        id="notes-editor"
        contentEditable
        className="flex-1 overflow-y-auto scrollbar-tactical bg-background/30 rounded-lg p-3 text-foreground text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary/30 min-h-0"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        data-placeholder="כתבו את ההערות שלכם פה..."
        suppressContentEditableWarning
      />

      <style>{`
        #notes-editor:empty::before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
