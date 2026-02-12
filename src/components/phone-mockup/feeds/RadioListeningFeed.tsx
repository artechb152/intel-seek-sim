import { Radio, Volume2, MapPin } from "lucide-react";
import { StatusBar } from "../StatusBar";

const frequencies = [
  { freq: "142.500", name: "תדר אלפא", status: "active", signal: 85 },
  { freq: "156.800", name: "תדר בטא", status: "listening", signal: 62 },
  { freq: "121.500", name: "תדר חירום", status: "standby", signal: 45 },
];

export const RadioListeningFeed = () => {
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
