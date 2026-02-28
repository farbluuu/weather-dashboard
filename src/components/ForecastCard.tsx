import React, { useState } from "react";
import { Clock, CalendarDays } from "lucide-react";
import { ForecastItem } from "@/types/weather";
import { getWeatherIcon } from "@/utils/weatherIcons";

interface ForecastCardProps {
  forecast: ForecastItem[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const [viewMode, setViewMode] = useState<'24h' | '5day'>('24h');

  let displayData: { item: ForecastItem, label: string, isNow: boolean }[] = [];
  
  if (viewMode === '24h') {
    displayData = forecast.slice(0, 8).map((item, idx) => ({
      item,
      label: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isNow: idx === 0
    }));
  } else {
    // 5-day view (group by day) OpenWeather Free tier provides 5 days at 3-hour intervals
    const dailyMap = new Map<string, ForecastItem>();
    
    forecast.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, item);
      } else {
        // Try to pick the midday forecast for a better average icon/temp
        const hour = new Date(item.dt * 1000).getHours();
        if (hour >= 11 && hour <= 15) {
          dailyMap.set(date, item);
        }
      }
    });

    displayData = Array.from(dailyMap.values()).slice(0, 5).map((item, idx) => {
      const dateObj = new Date(item.dt * 1000);
      const isToday = dateObj.toDateString() === new Date().toDateString();
      return {
        item,
        label: isToday ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        isNow: isToday
      };
    });
  }

  const toggleView = () => setViewMode(prev => prev === '24h' ? '5day' : '24h');

  return (
    <div className="col-span-1 md:col-span-12 bg-white/70 backdrop-blur-2xl border border-white/80 p-8 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_60px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 overflow-hidden">
        <h3 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
          <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-[1rem] shadow-sm">
            {viewMode === '24h' ? <Clock size={20} /> : <CalendarDays size={20} />}
          </div>
          <span className="tracking-tight">{viewMode === '24h' ? '24-Hour Forecast' : '5-Day Forecast'}</span>
        </h3>
          {/* <button 
            onClick={toggleView}
            className="text-[11px] font-black uppercase text-indigo-500 bg-indigo-50 px-5 py-2.5 rounded-full tracking-widest hover:bg-indigo-500 hover:text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
          >
            {viewMode === '24h' ? 'View 5 Days' : 'View 24 Hours'}
          </button> */}
      </div>

      <div className="relative z-10 flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x relative mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)">
        {displayData.map(({ item, label, isNow }, idx) => (
          <div key={idx} className={`flex flex-col items-center min-w-[130px] flex-1 p-6 lg:p-8 rounded-[2rem] border transition-all duration-300 group snap-center cursor-pointer relative overflow-hidden
            ${isNow 
              ? 'bg-gradient-to-br from-indigo-500 to-blue-600 border-transparent shadow-xl shadow-indigo-500/30 text-white transform -translate-y-2' 
              : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-indigo-100 hover:shadow-xl hover:-translate-y-2 text-slate-800'}`}>
            
            {isNow && <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl mix-blend-overlay"></div>}

            <p className={`text-[11px] font-black uppercase mb-6 tracking-widest ${isNow ? 'text-indigo-100' : 'text-slate-400'}`}>
              {viewMode === '24h' && isNow ? 'Now' : label}
            </p>
            <div className="mb-6 relative">
              <div className={`absolute inset-0 blur-xl rounded-full scale-150 transition-opacity duration-500 ${isNow ? 'bg-white/40 opacity-100' : 'bg-indigo-200 opacity-0 group-hover:opacity-60'}`}></div>
              {getWeatherIcon(item.weather[0].main, `w-14 h-14 relative z-10 group-hover:scale-125 transition-transform duration-500 origin-bottom ${isNow ? '' : 'drop-shadow-sm'}`)}
            </div>
            <p className="text-3xl font-black tracking-tighter">{Math.round(item.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};
