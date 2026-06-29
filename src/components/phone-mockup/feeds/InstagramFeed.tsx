import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare } from 'lucide-react';
import { StatusBar } from '../StatusBar';

// ייבוא תמונות פוסטים
import image01 from '../../../assets/Feed/Instagram/image1.png';
import image02 from '../../../assets/Feed/Instagram/image2.png';
import image03 from '../../../assets/Feed/Instagram/image3.png';
import image04 from '../../../assets/Feed/Instagram/image4.png';

// ייבוא תמונות פרופיל
import profilePic1 from '../../../assets/Feed/Instagram/profilePic1.png';
import profilePic2 from '../../../assets/Feed/Instagram/profilePic2.png';
import profilePic3 from '../../../assets/Feed/Instagram/profilePic3.png';
import profilePic4 from '../../../assets/Feed/Instagram/profilePic4.png';
import profilePic5 from '../../../assets/Feed/Instagram/profilePic5.png';

// מערך פוסטים
const posts = [
  {
    id: 1,
    user: 'SapirKugan',
    location: 'באר שבע',
    likes: '686',
    profilePic: profilePic2,
    postImage: image01,
    caption: 'מתייאשת מהעבודה',
  },
  {
    id: 2,
    user: 'DanielK',
    location: 'נהריה',
    likes: '340',
    profilePic: profilePic1,
    postImage: image02,
    caption: 'נוב 31 עייפיםםם',
  },
  {
    id: 3,
    user: 'YuvalHabshon',
    location: 'באר שבע',
    likes: '127',
    profilePic: profilePic5,
    postImage: image03,
    caption: 'נמות ולא נגלחצ!',
  },
  {
    id: 4,
    user: 'OferHadid',
    location: 'ירושלים',
    likes: '121',
    profilePic: profilePic4,
    postImage: image04,
    caption: 'עם חנן האח',
  },
];

// מערך סטוריז
const stories = [
  { name: 'Your Story', hasNew: false, profilePic: profilePic1 },
  { name: 'Zohar', hasNew: true, live: true, profilePic: profilePic2 },
  { name: 'KarinaK', hasNew: true, profilePic: profilePic3 },
  { name: 'BenLavi', hasNew: true, profilePic: profilePic4 },
  { name: 'CohenEliashiv', hasNew: true, profilePic: profilePic5 },
];

export const InstagramFeed = () => {
  return (
    <div className="h-full flex flex-col bg-white text-black overflow-hidden relative">
      <StatusBar />

      {/* הגדרת האנימציה ישירות בקומפוננטה ללא צורך בהגדרות טיילווינד */}
      <style>
        {`
          @keyframes infiniteScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-infinite-scroll {
            animation: infiniteScroll 50s linear infinite;
          }
          .animate-infinite-scroll:hover, 
          .animate-infinite-scroll:active {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Instagram Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white z-10">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="text-xl font-light tracking-wide" style={{ fontFamily: 'Assistant, sans-serif' }}>
          Instagram
        </span>
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5" />
          <Send className="w-5 h-5 -rotate-45" />
        </div>
      </div>

      {/* Stories - Fixed */}
      <div className="flex-shrink-0 flex gap-3 px-3 py-3 overflow-x-auto border-b border-gray-100 bg-white z-10">
        {stories.map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className={`w-14 h-14 rounded-full p-0.5 ${story.hasNew ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600' : 'bg-gray-200'}`}>
              <div className="w-full h-full rounded-full bg-white p-0.5 relative">
                <img src={story.profilePic} alt={story.name} className="w-full h-full rounded-full object-cover" />
                {story.live && <span className="text-[8px] bg-pink-500 text-white px-1 rounded absolute -bottom-1 left-1/2 transform -translate-x-1/2 shadow-sm">LIVE</span>}
              </div>
            </div>
            <span className="text-[10px] text-gray-600 truncate w-14 text-center">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Posts - Infinite Auto Scrolling */}
      <div className="flex-1 overflow-hidden relative bg-white">
        <div className="absolute top-0 left-0 w-full animate-infinite-scroll flex flex-col">
          {/* הכפלת המערך פעמיים יוצרת לולאה חלקה ואינסופית */}
          {[...posts, ...posts].map((post, i) => (
            <div key={`${post.id}-${i}`} className="px-0 pb-4 border-b border-gray-100">
              {/* Post Header */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <img src={post.profilePic} alt={post.user} className="w-8 h-8 rounded-full object-cover" />
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
                <span className="text-lg font-bold">•••</span>
              </div>

              {/* Post Image */}
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <img src={post.postImage} alt={`Post by ${post.user}`} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">1/4</span>
              </div>

              {/* Post Actions & Content */}
              <div className="px-3 py-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6 -rotate-45" />
                  </div>
                  <Bookmark className="w-6 h-6" />
                </div>

                <div className="text-sm mb-1">
                  <span className="font-semibold">Liked by AlonZutar and {post.likes} others</span>
                </div>

                {/* Caption */}
                <p className="text-sm mb-1">
                  <span className="font-semibold mr-1">{post.user}</span>
                  {post.caption}
                </p>

                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav - Fixed */}
      <div className="flex-shrink-0 flex items-center justify-around py-2 border-t border-gray-100 bg-white z-10 relative">
        <Home className="w-6 h-6" />
        <Search className="w-6 h-6" />
        <PlusSquare className="w-6 h-6" />
        <Heart className="w-6 h-6" />
        <img src={profilePic1} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
      </div>
    </div>
  );
};
