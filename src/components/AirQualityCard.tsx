import React from "react";
import { Wind as AirIcon, Info } from "lucide-react";
import { PollutionData } from "@/types/weather";

interface AirQualityCardProps {
  pollution: PollutionData | null;
}

export const getAQIInfo = (aqi: number | undefined) => {
  const levels: Record<number, { text: string; gradient: string; textCol: string; width: string }> = {
    1: { text: 'Excellent', gradient: 'from-emerald-400 to-emerald-500', textCol: 'text-emerald-500', width: '20%' },
    2: { text: 'Good', gradient: 'from-green-400 to-green-500', textCol: 'text-green-500', width: '40%' },
    3: { text: 'Moderate', gradient: 'from-yellow-400 to-amber-500', textCol: 'text-amber-500', width: '60%' },
    4: { text: 'Poor', gradient: 'from-orange-400 to-orange-500', textCol: 'text-orange-500', width: '80%' },
    5: { text: 'Hazardous', gradient: 'from-red-500 to-rose-600', textCol: 'text-red-500', width: '100%' },
  };
  return aqi && levels[aqi] ? levels[aqi] : { text: 'Unknown', gradient: 'from-slate-300 to-slate-400', textCol: 'text-slate-400', width: '0%' };
};

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ pollution }) => {
  const aqiInfo = getAQIInfo(pollution?.main.aqi);

  return (
    <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-white/70 backdrop-blur-2xl border border-white/80 p-6 md:p-8 lg:p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] flex flex-col group hover:shadow-[0_16px_60px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden">
      
      {/* Decorative inner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-[100px] -mr-20 -mt-20"></div>

      <div className="relative z-10 flex items-center justify-between mb-8">
        <h3 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
          <div className="p-2.5 bg-blue-50 text-blue-500 rounded-[1rem] shadow-sm">
             <AirIcon size={20} />
          </div>
          Air Quality
        </h3>
        
        <div className="relative group/info">
          <div className="p-2.5 rounded-full transition-colors hover:bg-slate-100 text-slate-300 group-hover/info:text-blue-500 cursor-help">
            <Info size={20} />
          </div>
          
          {/* Hover Tooltip Panel */}
          <div className="absolute right-0 top-full mt-2 w-64 lg:w-80 z-50 bg-white/95 backdrop-blur-md rounded-[1.5rem] p-5 text-sm text-slate-600 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-2 opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible translate-y-2 group-hover/info:translate-y-0 transition-all duration-300 origin-top-right pointer-events-none group-hover/info:pointer-events-auto">
            <h4 className="font-bold text-slate-800 text-base mb-1 border-b border-slate-100 pb-2">What is AQI?</h4>
            <p><strong>1:</strong> Ideal for most people.</p>
            <p><strong>2:</strong> Generally acceptable.</p>
            <p><strong>3:</strong> Sensitive groups may be affected.</p>
            <p><strong>4:</strong> Everyone may begin to experience effects.</p>
            <p><strong>5:</strong> Health warnings of emergency conditions.</p>
          </div>
        </div>
      </div>

      <div className="relative flex-grow flex flex-col justify-center gap-6">

        <div className="relative pt-2">
          <div className="flex justify-between items-end mb-4">
            <span className={`text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-br ${aqiInfo.gradient} bg-clip-text text-transparent`}>
              {aqiInfo.text}
            </span>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Index</span>
              <span className="text-2xl font-black text-slate-800 tracking-tighter leading-none">{pollution?.main.aqi || '-'}</span>
            </div>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner flex border border-slate-200/50 p-0.5">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${aqiInfo.gradient} transition-all duration-1000 ease-out relative`}
              style={{ width: aqiInfo.width }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-[1.5rem] border border-white shadow-sm hover:shadow-md transition-shadow group/stat">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 group-hover/stat:scale-150 transition-transform"></span> PM 2.5
            </p>
            <p className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">
              {pollution?.components.pm2_5.toFixed(1) ?? '--'} <span className="text-xs text-slate-400 font-bold ml-1">µg/m³</span>
            </p>
          </div>
          <div className="p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-[1.5rem] border border-white shadow-sm hover:shadow-md transition-shadow group/stat">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover/stat:scale-150 transition-transform"></span> CO
            </p>
            <p className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">
              {pollution ? (pollution.components.co / 1000).toFixed(1) : '--'} <span className="text-xs text-slate-400 font-bold ml-1">mg/m³</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
