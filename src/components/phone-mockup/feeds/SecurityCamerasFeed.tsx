import { Camera, MapPin } from 'lucide-react';
import { StatusBar } from '../StatusBar';

import image1 from '../../../assets/Feed/SecurityCameras/image 1.png';
import image2 from '../../../assets/Feed/SecurityCameras/image 2.png';
import image3 from '../../../assets/Feed/SecurityCameras/image 3.png';
import image4 from '../../../assets/Feed/SecurityCameras/image 4.png';

const cameras = [
  { id: 1, name: 'מצלמה 1 - כניסה ראשית', location: 'גלילות', status: 'LIVE', image: image1 },
  { id: 2, name: 'מצלמה 2 - חניון', location: 'גלילות', status: 'LIVE', image: image2 },
  { id: 3, name: 'מצלמה 3 - גדר מזרחית', location: 'גלילות', status: 'REC', image: image3 },
  { id: 4, name: 'מצלמה 4 - מגדל שמירה', location: 'גלילות', status: 'LIVE', image: image4 },
];

export const SecurityCamerasFeed = () => {
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
            <div className="absolute inset-0">
              <img src={cam.image} alt={cam.name} className="w-full h-full object-cover" />
              {/* Scan Lines Effect */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                }}
              ></div>
            </div>

            {/* Camera Info Overlay */}
            <div className="absolute top-1 left-1 right-1 flex items-center justify-between">
              <span className="text-[8px] bg-black/60 px-1 rounded">{cam.name}</span>
              <span className={`text-[8px] px-1 rounded ${cam.status === 'LIVE' ? 'bg-red-600' : 'bg-orange-600'}`}>{cam.status}</span>
            </div>

            {/* Timestamp */}
            <div className="absolute bottom-1 left-1 bg-black/40 px-1 rounded">
              <span className="text-[8px] text-green-400 font-mono">14:32:45</span>
            </div>

            {/* Location */}
            <div className="absolute bottom-1 right-1 flex items-center gap-0.5 bg-black/40 px-1 rounded">
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
