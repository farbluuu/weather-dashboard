import React from "react";
import { MapPin, Sunrise, Sunset } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { getWeatherIcon } from "@/utils/weatherIcons";
import { motion } from "framer-motion";

interface HeroWeatherCardProps {
  weather: WeatherData | null;
}

export const HeroWeatherCard: React.FC<HeroWeatherCardProps> = ({ weather }) => {
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now() / 1000);
  }, []);

  const isNight = weather && now ? (now > weather.sys.sunset || now < weather.sys.sunrise) : false;
  const condition = weather?.weather[0].main || "Clear";
  
  let bgGradient = "from-sky-400 to-indigo-500 shadow-indigo-500/20";
  if (isNight) {
    bgGradient = "from-slate-800 to-indigo-950 shadow-indigo-900/40";
  } else if (condition === "Rain" || condition === "Thunderstorm" || condition === "Drizzle") {
    bgGradient = "from-slate-600 to-slate-800 shadow-slate-700/30";
  } else if (condition === "Clouds") {
    bgGradient = "from-blue-400 to-slate-500 shadow-blue-500/20";
  } else {
    bgGradient = "from-blue-500 to-sky-400 shadow-blue-500/30";
  }

  return (
    <div className={`col-span-1 md:col-span-12 lg:col-span-8 bg-gradient-to-br ${bgGradient} p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group text-white hover:scale-[1.01] transition-transform duration-500`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[80px] -mr-20 -mt-20 mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[80px] -ml-20 -mb-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between h-full gap-8">
        <div className="flex flex-col justify-between order-2 md:order-1 flex-1">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-lg">
              <MapPin size={12} className="text-white" />
              <span>{weather?.sys.country || 'Location'}</span>
              <span className="w-1 h-1 rounded-full bg-white/50 mx-1"></span>
              <span className="text-white/90 animate-pulse flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>Live</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-3 drop-shadow-md leading-none">
              {weather?.name || '---'}
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-bold tracking-wide">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="p-5 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-all duration-300 hover:shadow-xl group/sun">
              <div className="p-3 bg-amber-400/20 rounded-[1.25rem] group-hover/sun:rotate-12 transition-transform duration-500">
                <Sunrise size={22} className="text-amber-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-0.5 mt-1">Sunrise</p>
                <p className="text-base md:text-lg font-bold truncate tracking-tight">
                  {weather ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12: false}) : '--:--'}
                </p>
              </div>
            </div>
            <div className="p-5 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-all duration-300 hover:shadow-xl group/moon">
              <div className="p-3 bg-indigo-400/20 rounded-[1.25rem] group-hover/moon:rotate-12 transition-transform duration-500">
                <Sunset size={22} className="text-indigo-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-0.5 mt-1">Sunset</p>
                <p className="text-base md:text-lg font-bold truncate tracking-tight">
                  {weather ? new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12: false}) : '--:--'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center order-1 md:order-2 flex-1 md:flex-none">
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-[2] mix-blend-overlay"></div>
            {weather && getWeatherIcon(weather.weather[0].main, "w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative z-10")}
          </motion.div>
          
          <div className="text-center md:text-right mt-6">
            <div className="flex items-start justify-center md:justify-end">
              <span className="text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none font-black tracking-tighter drop-shadow-xl text-white">
                {Math.round(weather?.main.temp || 0)}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white/50 mt-6 lg:mt-10 ml-2">°</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white/90 capitalize -mt-2">
              {weather?.weather[0].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
