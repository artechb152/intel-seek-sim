import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  unread?: number;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "צוות איסוף",
    message: "מצא אינדיקציה לכומתה אדומה באזור...",
    time: "5 דק'",
    unread: 2,
  },
  {
    id: "2",
    sender: "מפקד יחידה",
    message: "שים לב לתאריך 14:30",
    time: "3:00PM",
    unread: 3,
  },
  {
    id: "3",
    sender: "אנליסט בכיר",
    message: "מילת הקוד: דרגה/יחידה",
    time: "1:35PM",
  },
  {
    id: "4",
    sender: "צוות איסוף",
    message: "בדוק פוסטים מאזור הצפון",
    time: "5 דק'",
    unread: 2,
  },
  {
    id: "5",
    sender: "מפקד יחידה",
    message: "נמצאה התאמה - המשך לסנן",
    time: "3:00PM",
    unread: 3,
  },
  {
    id: "6",
    sender: "אנליסט בכיר",
    message: "חפש לפי כומתה ירוקה",
    time: "1:35PM",
  },
];

export const TeamChat = () => {
  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-3">צ'אט צוות</h2>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש..."
            className="pr-10 bg-secondary/50 border-border/50 focus:border-primary"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-tactical p-2 space-y-1">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className="p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 bg-secondary">
                <AvatarFallback className="bg-secondary text-muted-foreground text-sm">
                  {msg.sender.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">{msg.sender}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
              </div>
              {msg.unread && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {msg.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Input
            placeholder="הקלד הודעה..."
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
          <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
