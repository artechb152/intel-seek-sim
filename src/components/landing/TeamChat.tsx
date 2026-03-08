import { Search, Send, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

import image1 from '../../../src/assets/Chat/image1.png';
import image2 from '../../../src/assets/Chat/image2.png';
import image3 from '../../../src/assets/Chat/image3.png';
import image4 from '../../../src/assets/Chat/image4.png';
import image5 from '../../../src/assets/Chat/image5.png';
import image6 from '../../../src/assets/Chat/image6.png';

interface ChatPreview {
  id: string;
  sender: string;
  senderHebrew: string;
  message: string;
  time: string;
  unread?: number;
  avatar: string;
}

interface ChatDetailMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isMe?: boolean;
}

// 1. שינינו את השם של המערך הראשוני
const initialChatPreviews: ChatPreview[] = [
  { id: '1', sender: 'فريق الجمع', senderHebrew: 'צוות איסוף', message: 'بدوق פوستים מהאיזור בשעות האחרונות', time: '14:26', unread: 2, avatar: image1 },
  { id: '2', sender: 'قائد الوحدة', senderHebrew: 'מפקד יחידה', message: 'חפש פוסטים שמזכירים את הזמן הזה', time: '14:12', unread: 2, avatar: image2 },
  { id: '3', sender: 'محلل كبير', senderHebrew: 'אנליסט בכיר', message: 'סנן לפי מילים אלו בפוסטים', time: '13:36', unread: 2, avatar: image3 },
  { id: '4', sender: 'فريق الجمع', senderHebrew: 'צוות איסוף', message: 'מחפש עכשיו', time: '12:10', avatar: image4 },
  { id: '5', sender: 'قائد الوحدة', senderHebrew: 'מפקד יחידה', message: 'המשך לסנות ולזהות דפוסים נוספים', time: '15:05', unread: 3, avatar: image5 },
  { id: '6', sender: 'محلل كبير', senderHebrew: 'אנליסט בכיר', message: 'הבנתי, מתחיל לסנן', time: '13:05', avatar: image6 },
];

const chatDetails: Record<string, ChatDetailMessage[]> = {
  '1': [
    { id: '1a', sender: 'فريق الجمع', message: 'שלום, יש לנו עדכון חדש מהשטח', time: '14:20', isMe: false },
    { id: '1b', sender: 'אני', message: 'מה המצב?', time: '14:22', isMe: true },
    { id: '1c', sender: 'فريق الجمع', message: 'מצאנו אינדיקציה לכומתה אדומה באזור גלילות', time: '14:25', isMe: false },
    { id: '1d', sender: 'فريق الجمع', message: 'בדוק פוסטים מהאזור בשעות האחרונות', time: '14:26', isMe: false },
  ],
  '2': [
    { id: '2a', sender: 'قائد الوحدة', message: 'משימה חדשה הועברה אליך', time: '14:00', isMe: false },
    { id: '2b', sender: 'אני', message: 'קיבלתי, מה הפרטים?', time: '14:05', isMe: true },
    { id: '2c', sender: 'قائد الوحدة', message: 'שים לב לתאריך 14:30 - יש אירוע מתוכנן', time: '14:10', isMe: false },
    { id: '2d', sender: 'قائد الوحدة', message: 'חפש פוסטים שמזכירים את הזמן הזה', time: '14:12', isMe: false },
  ],
  '3': [
    { id: '3a', sender: 'محلل كبير', message: 'עדכון לגבי מילות מפתח', time: '13:30', isMe: false },
    { id: '3b', sender: 'אני', message: 'איזה מילות מפתח?', time: '13:32', isMe: true },
    { id: '3c', sender: 'محلل كبير', message: 'מילת הקוד: דרגה/יחידה', time: '13:35', isMe: false },
    { id: '3d', sender: 'محلل كبير', message: 'סנן לפי מילים אלו בפוסטים', time: '13:36', isMe: false },
  ],
  '4': [
    { id: '4a', sender: 'فريق الجمع', message: 'יש לנו מידע חדש', time: '12:00', isMe: false },
    { id: '4b', sender: 'فريق الجمع', message: 'בדוק פוסטים מאזור הצפון', time: '12:05', isMe: false },
    { id: '4c', sender: 'אני', message: 'מחפש עכשיו', time: '12:10', isMe: true },
  ],
  '5': [
    { id: '5a', sender: 'قائد الوحدة', message: 'עדכון חשוב', time: '15:00', isMe: false },
    { id: '5b', sender: 'قائد الوحدة', message: 'נמצאה התאמה בין הפוסטים', time: '15:02', isMe: false },
    { id: '5c', sender: 'قائد الوحدة', message: 'המשך לסנן ולזהות דפוסים נוספים', time: '15:05', isMe: false },
  ],
  '6': [
    { id: '6a', sender: 'محلل كبير', message: 'עדכון חדש לחיפוש', time: '13:00', isMe: false },
    { id: '6b', sender: 'محلل كبير', message: 'חפש לפי כומתה ירוקה', time: '13:02', isMe: false },
    { id: '6c', sender: 'אני', message: 'הבנתי, מתחיל לסנן', time: '13:05', isMe: true },
  ],
};

export const TeamChat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  // 2. הוספנו סטייט לניהול רשימת הצ'אטים
  const [chats, setChats] = useState<ChatPreview[]>(initialChatPreviews);

  const handleChatClick = (chatId: string) => {
    setSelectedChat(chatId);

    // 3. עדכון הסטייט: מסמנים את הצ'אט הספציפי ככזה שנקרא (מאפסים את unread)
    setChats((prevChats) => prevChats.map((chat) => (chat.id === chatId ? { ...chat, unread: undefined } : chat)));
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  // 4. שימוש בסטייט `chats` במקום במערך הקבוע
  const selectedChatPreview = chats.find((c) => c.id === selectedChat);
  const selectedMessages = selectedChat ? chatDetails[selectedChat] : [];

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        {selectedChat ? (
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1 rounded-lg hover:bg-secondary/50 transition-colors">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <Avatar className="w-8 h-8 bg-secondary">
              <AvatarImage src={selectedChatPreview?.avatar} alt={selectedChatPreview?.sender} className="object-cover" />
              <AvatarFallback className="bg-secondary text-muted-foreground text-xs">{selectedChatPreview?.sender.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="font-bold text-foreground">{selectedChatPreview?.sender}</span>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-foreground mb-3">צ'אט צוות</h2>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="חיפוש..." className="pr-10 bg-secondary/50 border-border/50 focus:border-primary" />
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-tactical p-2 space-y-1">
        {selectedChat ? (
          // Chat Detail View
          <div className="flex flex-col gap-3 p-2">
            {selectedMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary/70 text-foreground rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.message}</p>
                  <span className="text-[10px] opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Chat List View - עכשיו ממפים את `chats` מהסטייט
          chats.map((msg) => (
            <div key={msg.id} onClick={() => handleChatClick(msg.id)} className="p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 bg-secondary">
                  <AvatarImage src={msg.avatar} alt={msg.sender} className="object-cover" />
                  <AvatarFallback className="bg-secondary text-muted-foreground text-sm">{msg.sender.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">{msg.time} <span className="mr-1">{msg.senderHebrew}</span></span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </div>
                {/* שינינו ל-undefined בפונקציה, לכן התנאי הזה לא יתרנדר אם אין הודעות חדשות */}
                {msg.unread && msg.unread > 0 && <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">{msg.unread}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 flex-shrink-0 bg-background/50">
        <div className="flex items-center gap-2">
          <Input placeholder="הקלד הודעה..." className="bg-secondary/50 border-border/50 focus:border-primary" />
          <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
