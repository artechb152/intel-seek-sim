import { Search, MessageCircle, PlusSquare, ThumbsUp, Share2, Home, Camera } from 'lucide-react';
import { StatusBar } from '../StatusBar';
import { getFeedAvatar } from '@/constants/images';

import image1 from '../../../assets/Feed/Facebook/image1.png';
import image2 from '../../../assets/Feed/Facebook/image2.png';
import image3 from '../../../assets/Feed/Facebook/image3.png';

import storyImage1 from '../../../assets/Feed/Facebook/storyImage1.png';
import storyImage2 from '../../../assets/Feed/Facebook/storyImage2.png';
import storyImage3 from '../../../assets/Feed/Facebook/storyImage3.png';

import profileImage1 from '../../../assets/Feed/Facebook/profileImage1.png';
import profileImage2 from '../../../assets/Feed/Facebook/profileImage2.png';
import profileImage3 from '../../../assets/Feed/Facebook/profileImage3.png';
// הייבוא החדש לתמונת פרופיל הרביעית
import profileImage4 from '../../../assets/Feed/Facebook/profileImage4.png';

const posts = [
  { id: 1, user: 'נהוראי כהן', time: 'שעתיים', content: 'כומתה חומה יום שחור', likes: 234, comments: 45, postImage: image1, avatar: profileImage1 },
  { id: 2, user: 'איתן ברגיג', time: '5 שעות', content: 'כמה עוף!', likes: 567, comments: 89, postImage: image2, avatar: profileImage2 },
  { id: 3, user: 'יואב ארנון', time: 'אתמול', content: 'התגעגעתי לעבוד עם האחים ב8200', likes: 123, comments: 23, postImage: image3, avatar: profileImage3 },
];

const stories = [
  // הרקע של "צור סטורי" הוא עכשיו התמונה הרביעית
  { id: 0, name: 'צור סטורי', image: profileImage4, avatar: null, isCreate: true },
  { id: 1, name: 'נהוראי', image: storyImage1, avatar: profileImage1, isCreate: false },
  { id: 2, name: 'איתן', image: storyImage2, avatar: profileImage2, isCreate: false },
  { id: 3, name: 'יואב', image: storyImage3, avatar: profileImage3, isCreate: false },
];

export const FacebookFeed = () => {
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
        {stories.map((story) => (
          <div key={story.id} className="w-16 h-24 rounded-xl flex items-end justify-center pb-1 relative overflow-hidden bg-gray-200">
            {/* רקע הסטורי */}
            <img src={story.image} alt={story.name} className="absolute inset-0 w-full h-full object-cover" />

            {/* גרדיאנט כהה למטה כדי שהטקסט יהיה קריא */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

            <span className="text-white text-[9px] font-medium text-center relative z-10">{story.name}</span>

            {story.isCreate ? (
              // כפתור פלוס על גבי התמונה
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 z-10">
                <PlusSquare className="w-4 h-4 text-blue-600" />
              </div>
            ) : (
              <div className="absolute top-1 left-1 w-6 h-6 rounded-full border-2 border-blue-500 overflow-hidden z-10">
                <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Posts - Auto Scrolling */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-fast">
          {[...posts, ...posts, ...posts].map((post, i) => (
            <div key={i} className="bg-white mb-2 p-3">
              <div className="flex items-center gap-2 mb-2">
                <img src={post.avatar || getFeedAvatar('facebook', post.user)} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
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

              {/* Post Image */}
              <div className="w-full aspect-video bg-gray-200 rounded-lg mb-2 overflow-hidden">
                <img src={post.postImage} alt={`Post by ${post.user}`} className="w-full h-full object-cover" loading="lazy" />
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
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
        <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
          <img src={profileImage4} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
