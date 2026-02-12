import { Search, MessageCircle, MapPin, Camera } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { getFeedAvatar, getFeedImage } from "@/constants/images";

const stories = [
  { user: "יוסי", time: "5 דקות", type: "snap" },
  { user: "מיכל", time: "12 דקות", type: "snap" },
  { user: "דני", time: "23 דקות", type: "story" },
  { user: "שרה", time: "1 שעה", type: "story" },
];

export const SnapchatFeed = () => {
  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden">
      <StatusBar />
      
      {/* Header */}
      <div className="flex-shrink-0 bg-black px-4 py-3 flex items-center justify-between">
        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
          <img 
            src={getFeedAvatar("snapchat", "me")}
            alt="Me"
            className="w-full h-full object-cover"
          />
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
              <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                <img 
                  src={getFeedAvatar("snapchat", story.user)}
                  alt={story.user}
                  className="w-full h-full object-cover"
                />
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
            <div key={i} className="aspect-[4/5] rounded-xl overflow-hidden relative">
              <img 
                src={getFeedImage("snapchat_discover", i + 1)}
                alt={cat}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <span className="absolute bottom-2 left-2 text-xs font-bold">{cat}</span>
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
