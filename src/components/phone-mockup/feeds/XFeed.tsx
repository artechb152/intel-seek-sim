import { Heart, MessageCircle, Share2, Home, Search } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { getFeedAvatar } from "@/constants/images";

const tweets = [
  { id: 1, user: "אלון מאסק", handle: "@elonmusk", content: "Let that sink in! 🚀", time: "2h", likes: "1.2M", retweets: "234K" },
  { id: 2, user: "חדשות 12", handle: "@news12", content: "עדכון מהשטח: פיתוח טכנולוגי חדש בישראל 🇮🇱", time: "5h", likes: "5.6K", retweets: "890" },
  { id: 3, user: "ספורט 5", handle: "@sport5", content: "⚽ תוצאות המשחקים של הערב", time: "1h", likes: "3.4K", retweets: "567" },
];

export const XFeed = () => {
  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden">
      <StatusBar />
      
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
          <img 
            src={getFeedAvatar("x", "user")}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
          <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
        </svg>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex border-b border-gray-800">
        <div className="flex-1 text-center py-3 border-b-2 border-blue-500">
          <span className="text-sm font-bold">עבורך</span>
        </div>
        <div className="flex-1 text-center py-3 text-gray-500">
          <span className="text-sm">עוקבים</span>
        </div>
      </div>

      {/* Tweets */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-fast">
          {[...tweets, ...tweets, ...tweets].map((tweet, i) => (
            <div key={i} className="p-4 border-b border-gray-800">
              <div className="flex gap-3">
                <img 
                  src={getFeedAvatar("x", tweet.handle)}
                  alt={tweet.user}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-bold text-sm">{tweet.user}</span>
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </svg>
                    <span className="text-gray-500 text-sm">{tweet.handle}</span>
                    <span className="text-gray-500 text-sm">· {tweet.time}</span>
                  </div>
                  <p className="text-sm mt-1">{tweet.content}</p>
                  <div className="flex items-center justify-between mt-3 text-gray-500 max-w-[250px]">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">245</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>
                      <span className="text-xs">{tweet.retweets}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{tweet.likes}</span>
                    </div>
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 flex items-center justify-around py-3 border-t border-gray-800 bg-black">
        <Home className="w-6 h-6" />
        <Search className="w-6 h-6 text-gray-500" />
        <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M18.265 3.314c-3.45-3.45-9.07-3.45-12.52 0-3.45 3.45-3.45 9.07 0 12.52l6.26 6.26 6.26-6.26c3.45-3.45 3.45-9.07 0-12.52zm-1.06 11.46l-5.2 5.2-5.2-5.2c-2.87-2.87-2.87-7.53 0-10.4 2.87-2.87 7.53-2.87 10.4 0 2.87 2.87 2.87 7.53 0 10.4z"/></svg>
        <MessageCircle className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};
