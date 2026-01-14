import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare, ThumbsUp, Share2, Play, Music, Radio, MapPin, Camera, Volume2 } from "lucide-react";

interface PhoneMockupProps {
  platform: string;
}

const StatusBar = () => (
  <div className="flex-shrink-0 flex items-center justify-between px-4 py-1 text-xs">
    <span className="font-semibold">9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
      </div>
      <span>5G</span>
      <div className="w-6 h-3 border border-current rounded-sm relative">
        <div className="absolute inset-0.5 bg-current rounded-sm" style={{ width: "80%" }}></div>
      </div>
    </div>
  </div>
);

const InstagramFeed = () => {
  const posts = [
    { id: 1, user: "joshua_l", location: "Tokyo, Japan", likes: "44,686" },
    { id: 2, user: "sarah_m", location: "Tel Aviv", likes: "12,340" },
    { id: 3, user: "david_k", location: "Haifa", likes: "8,921" },
    { id: 4, user: "amit_r", location: "Jerusalem", likes: "5,432" },
  ];

  const stories = [
    { name: "Your Story", hasNew: false },
    { name: "karennne", hasNew: true, live: true },
    { name: "zackjohn", hasNew: true },
    { name: "kieron_d", hasNew: true },
    { name: "craig_l", hasNew: true },
  ];

  return (
    <div className="h-full flex flex-col bg-white text-black overflow-hidden">
      <StatusBar />

      {/* Instagram Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="text-xl font-light tracking-wide" style={{ fontFamily: 'serif' }}>Instagram</span>
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5" />
          <Send className="w-5 h-5 -rotate-45" />
        </div>
      </div>

      {/* Stories - Fixed */}
      <div className="flex-shrink-0 flex gap-3 px-3 py-3 overflow-x-auto border-b border-gray-100">
        {stories.map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className={`w-14 h-14 rounded-full p-0.5 ${story.hasNew ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600' : 'bg-gray-200'}`}>
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center relative">
                  {story.live && (
                    <span className="text-[8px] bg-pink-500 text-white px-1 rounded absolute -bottom-1">LIVE</span>
                  )}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-600 truncate w-14 text-center">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Posts - Auto Scrolling - Faster */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-fast">
          <div className="space-y-0">
            {[...posts, ...posts, ...posts].map((post, i) => (
              <div key={i} className="px-0">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">{post.user}</span>
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">✓</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500">{post.location}</span>
                    </div>
                  </div>
                  <span className="text-lg">•••</span>
                </div>
                
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">1/3</span>
                </div>

                <div className="px-3 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <Heart className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6" />
                      <Send className="w-6 h-6 -rotate-45" />
                    </div>
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Liked by craig_love and {post.likes} others</span>
                  </div>
                  <p className="text-sm mt-1">
                    <span className="font-semibold">{post.user}</span> Amazing day! 📸
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav - Fixed */}
      <div className="flex-shrink-0 flex items-center justify-around py-2 border-t border-gray-100 bg-white">
        <Home className="w-6 h-6" />
        <Search className="w-6 h-6" />
        <PlusSquare className="w-6 h-6" />
        <Heart className="w-6 h-6" />
        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

const FacebookFeed = () => {
  const posts = [
    { id: 1, user: "יוסי כהן", time: "שעתיים", content: "יום מדהים בחוף! ☀️", likes: 234, comments: 45 },
    { id: 2, user: "מיכל לוי", time: "5 שעות", content: "סיום קורס מוצלח 🎓", likes: 567, comments: 89 },
    { id: 3, user: "דני אברהם", time: "אתמול", content: "טיול בצפון עם המשפחה", likes: 123, comments: 23 },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-100 text-black overflow-hidden">
      <StatusBar />
      
      {/* Facebook Header */}
      <div className="flex-shrink-0 bg-white px-4 py-2 flex items-center justify-between border-b border-gray-200">
        <span className="text-2xl font-bold text-blue-600">facebook</span>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-600" />
          <MessageCircle className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Stories */}
      <div className="flex-shrink-0 bg-white p-2 flex gap-2 border-b border-gray-200">
        {["צור סטורי", "יוסי", "מיכל", "דני"].map((name, i) => (
          <div key={i} className="w-16 h-24 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-end justify-center pb-1 relative overflow-hidden">
            <span className="text-white text-[9px] font-medium text-center">{name}</span>
            {i === 0 && <PlusSquare className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
          </div>
        ))}
      </div>

      {/* Posts - Auto Scrolling */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-fast">
          {[...posts, ...posts, ...posts].map((post, i) => (
            <div key={i} className="bg-white mb-2 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                  <span className="font-semibold text-sm">{post.user}</span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span>{post.time}</span>
                    <span>•</span>
                    <span>🌍</span>
                  </div>
                </div>
              </div>
              <p className="text-sm mb-2">{post.content}</p>
              <div className="w-full aspect-video bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
                <span>👍❤️ {post.likes}</span>
                <span>{post.comments} תגובות</span>
              </div>
              <div className="flex items-center justify-around pt-2 border-t border-gray-200">
                <div className="flex items-center gap-1 text-gray-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">לייק</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">תגובה</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs">שתף</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 flex items-center justify-around py-2 bg-white border-t border-gray-200">
        <Home className="w-6 h-6 text-blue-600" />
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

const TikTokFeed = () => {
  const videos = [
    { user: "@dance_master", desc: "ריקוד חדש 🔥 #dance #viral", likes: "234K", comments: "5.6K", shares: "12K" },
    { user: "@cooking_il", desc: "מתכון קל לפסטה 🍝", likes: "89K", comments: "2.3K", shares: "8K" },
    { user: "@travel_now", desc: "הנוף המטורף הזה! 🏔️", likes: "567K", comments: "15K", shares: "45K" },
  ];

  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden relative">
      {/* Video Feed - Full Screen */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-tiktok">
          {[...videos, ...videos, ...videos].map((video, i) => (
            <div key={i} className="h-full w-full relative flex-shrink-0" style={{ height: '100%' }}>
              {/* Video Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black flex items-center justify-center">
                <Play className="w-16 h-16 text-white/30" />
              </div>
              
              {/* Right Side Actions */}
              <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                <div className="flex flex-col items-center">
                  <Heart className="w-7 h-7" fill="white" />
                  <span className="text-[10px]">{video.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-[10px]">{video.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Share2 className="w-7 h-7" />
                  <span className="text-[10px]">{video.shares}</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white animate-spin" style={{ animationDuration: '3s' }}>
                  <Music className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-2 left-2 right-14">
                <span className="font-bold text-sm">{video.user}</span>
                <p className="text-xs mt-1">{video.desc}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px]">
                  <Music className="w-3 h-3" />
                  <span className="animate-marquee">Original Sound - {video.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-6 py-3 bg-gradient-to-b from-black/50 to-transparent z-10">
        <StatusBar />
      </div>
      <div className="absolute top-8 left-0 right-0 flex items-center justify-center gap-6">
        <span className="text-gray-400 text-sm">עוקבים</span>
        <span className="text-white text-sm font-bold border-b-2 border-white pb-1">עבורך</span>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-2 bg-black">
        <div className="flex flex-col items-center">
          <Home className="w-6 h-6" />
          <span className="text-[9px]">בית</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <Search className="w-6 h-6" />
          <span className="text-[9px]">חיפוש</span>
        </div>
        <div className="w-10 h-7 bg-white rounded flex items-center justify-center">
          <PlusSquare className="w-5 h-5 text-black" />
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <MessageCircle className="w-6 h-6" />
          <span className="text-[9px]">הודעות</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 rounded-full bg-gray-600"></div>
          <span className="text-[9px]">פרופיל</span>
        </div>
      </div>
    </div>
  );
};

const TwitterFeed = () => {
  const tweets = [
    { user: "אלון מאסק", handle: "@elonmusk", content: "Let that sink in! 🚀", time: "2h", likes: "1.2M", retweets: "234K" },
    { user: "חדשות 12", handle: "@news12", content: "עדכון מהשטח: פיתוח טכנולוגי חדש בישראל 🇮🇱", time: "5h", likes: "5.6K", retweets: "890" },
    { user: "ספורט 5", handle: "@sport5", content: "⚽ תוצאות המשחקים של הערב", time: "1h", likes: "3.4K", retweets: "567" },
  ];

  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden">
      <StatusBar />
      
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
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
                <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0"></div>
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

const SecurityCamerasFeed = () => {
  const cameras = [
    { id: 1, name: "מצלמה 1 - כניסה ראשית", location: "גלילות", status: "LIVE" },
    { id: 2, name: "מצלמה 2 - חניון", location: "גלילות", status: "LIVE" },
    { id: 3, name: "מצלמה 3 - גדר מזרחית", location: "גלילות", status: "REC" },
    { id: 4, name: "מצלמה 4 - מגדל שמירה", location: "גלילות", status: "LIVE" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden">
      <StatusBar />
      
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-800 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-red-500" />
          <span className="text-sm font-bold">מערכת מצלמות</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-red-400">RECORDING</span>
        </div>
      </div>

      {/* 4 Camera Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 p-1">
        {cameras.map((cam) => (
          <div key={cam.id} className="relative bg-gray-800 rounded overflow-hidden">
            {/* Camera View */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
              <div className="w-8 h-8 rounded border border-gray-600 flex items-center justify-center">
                <Camera className="w-4 h-4 text-gray-500" />
              </div>
              {/* Scan Lines Effect */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
              }}></div>
            </div>
            
            {/* Camera Info Overlay */}
            <div className="absolute top-1 left-1 right-1 flex items-center justify-between">
              <span className="text-[8px] bg-black/60 px-1 rounded">{cam.name}</span>
              <span className={`text-[8px] px-1 rounded ${cam.status === 'LIVE' ? 'bg-red-600' : 'bg-orange-600'}`}>
                {cam.status}
              </span>
            </div>
            
            {/* Timestamp */}
            <div className="absolute bottom-1 left-1">
              <span className="text-[8px] text-green-400 font-mono">14:32:45</span>
            </div>
            
            {/* Location */}
            <div className="absolute bottom-1 right-1 flex items-center gap-0.5">
              <MapPin className="w-2 h-2 text-blue-400" />
              <span className="text-[8px] text-blue-400">{cam.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 bg-gray-800 px-2 py-2 flex items-center justify-around">
        <button className="text-[10px] bg-gray-700 px-3 py-1 rounded">⏮ הקודם</button>
        <button className="text-[10px] bg-red-600 px-4 py-1 rounded flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          הקלט
        </button>
        <button className="text-[10px] bg-gray-700 px-3 py-1 rounded">הבא ⏭</button>
      </div>
    </div>
  );
};

const RadioListeningFeed = () => {
  const frequencies = [
    { freq: "142.500", name: "תדר אלפא", status: "active", signal: 85 },
    { freq: "156.800", name: "תדר בטא", status: "listening", signal: 62 },
    { freq: "121.500", name: "תדר חירום", status: "standby", signal: 45 },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-950 text-green-400 overflow-hidden font-mono">
      <StatusBar />
      
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-900 px-3 py-2 flex items-center justify-between border-b border-green-900">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="text-sm font-bold">מערכת האזנה</span>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          <span className="text-[10px]">ACTIVE</span>
        </div>
      </div>

      {/* Frequency Display */}
      <div className="flex-shrink-0 bg-black p-3 border-b border-green-900">
        <div className="text-center">
          <span className="text-3xl font-bold text-green-400">142.500</span>
          <span className="text-sm ml-2">MHz</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <MapPin className="w-3 h-3" />
          <span className="text-xs">32.0853°N, 34.7818°E</span>
        </div>
      </div>

      {/* Signal Visualization */}
      <div className="flex-shrink-0 h-20 bg-black p-2 border-b border-green-900">
        <div className="h-full flex items-end justify-center gap-0.5">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 bg-green-500 rounded-t animate-pulse"
              style={{ 
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '0.5s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Frequency List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {frequencies.map((freq, i) => (
          <div 
            key={i} 
            className={`p-2 rounded border ${freq.status === 'active' ? 'border-green-500 bg-green-950' : 'border-green-900 bg-gray-900'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold">{freq.freq}</span>
                <span className="text-xs ml-2 text-green-600">{freq.name}</span>
              </div>
              <div className={`text-[10px] px-2 py-0.5 rounded ${
                freq.status === 'active' ? 'bg-green-600 text-black' : 
                freq.status === 'listening' ? 'bg-yellow-600 text-black' : 'bg-gray-700'
              }`}>
                {freq.status === 'active' ? 'פעיל' : freq.status === 'listening' ? 'מאזין' : 'המתנה'}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px]">עוצמה:</span>
              <div className="flex-1 h-1 bg-gray-800 rounded overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded" 
                  style={{ width: `${freq.signal}%` }}
                ></div>
              </div>
              <span className="text-[10px]">{freq.signal}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 bg-gray-900 px-2 py-2 grid grid-cols-4 gap-1">
        <button className="text-[9px] bg-gray-800 py-2 rounded border border-green-900">סריקה</button>
        <button className="text-[9px] bg-gray-800 py-2 rounded border border-green-900">הקלטה</button>
        <button className="text-[9px] bg-gray-800 py-2 rounded border border-green-900">סימון</button>
        <button className="text-[9px] bg-green-700 py-2 rounded text-black font-bold">נעילה</button>
      </div>
    </div>
  );
};

const SnapchatFeed = () => {
  const stories = [
    { user: "יוסי", time: "5 דקות", type: "snap" },
    { user: "מיכל", time: "12 דקות", type: "snap" },
    { user: "דני", time: "23 דקות", type: "story" },
    { user: "שרה", time: "1 שעה", type: "story" },
  ];

  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden">
      <StatusBar />
      
      {/* Header */}
      <div className="flex-shrink-0 bg-black px-4 py-3 flex items-center justify-between">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-sm">👤</span>
        </div>
        <span className="text-xl font-bold text-yellow-400">Snapchat</span>
        <Search className="w-6 h-6 text-gray-400" />
      </div>

      {/* Stories Section */}
      <div className="flex-1 overflow-y-auto">
        {/* Friends */}
        <div className="px-4 py-2">
          <span className="text-gray-400 text-xs font-bold">חברים</span>
        </div>
        
        {stories.map((story, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              story.type === 'snap' ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-purple-500 to-blue-500'
            }`}>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
            </div>
            <div className="flex-1">
              <span className="font-semibold">{story.user}</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                {story.type === 'snap' ? (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                    <span>סנאפ חדש</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>סטורי</span>
                  </>
                )}
                <span>• {story.time}</span>
              </div>
            </div>
            <Camera className="w-5 h-5 text-gray-500" />
          </div>
        ))}

        {/* Discover */}
        <div className="px-4 py-2 mt-4">
          <span className="text-gray-400 text-xs font-bold">גילויים</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 px-4">
          {["חדשות", "ספורט", "בידור", "טרנדים"].map((cat, i) => (
            <div key={i} className="aspect-[4/5] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-end p-2">
              <span className="text-xs font-bold">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 flex items-center justify-around py-3 bg-black border-t border-gray-800">
        <MapPin className="w-6 h-6 text-gray-500" />
        <MessageCircle className="w-6 h-6 text-gray-500" />
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center -mt-4 border-4 border-black">
          <Camera className="w-6 h-6 text-black" />
        </div>
        <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <div className="w-6 h-6 rounded bg-gray-600"></div>
      </div>
    </div>
  );
};

export const PhoneMockup = ({ platform }: PhoneMockupProps) => {
  const renderPlatform = () => {
    switch (platform) {
      case "instagram":
        return <InstagramFeed />;
      case "facebook":
        return <FacebookFeed />;
      case "tiktok":
        return <TikTokFeed />;
      case "twitter":
        return <TwitterFeed />;
      case "snapchat":
        return <SnapchatFeed />;
      case "cameras":
        return <SecurityCamerasFeed />;
      case "listening":
        return <RadioListeningFeed />;
      default:
        return (
          <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
            <p className="text-gray-400 text-center px-4">
              בחר רשת חברתית מהתפריט
            </p>
          </div>
        );
    }
  };

  return (
    <div className="phone-frame w-[280px] h-[560px] mx-auto">
      {/* Notch */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>
      </div>
      
      {/* Screen */}
      <div className="phone-screen w-full h-full">
        {renderPlatform()}
      </div>
    </div>
  );
};
