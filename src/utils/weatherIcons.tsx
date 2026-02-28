import { Sun, CloudRain, CloudSun, CloudLightning, Cloud, Snowflake } from "lucide-react";
import React from "react";

export const getWeatherIcon = (main: string, additionalClasses: string = "w-12 h-12") => {
  const props = { className: `${additionalClasses} transition-transform duration-500` };
  switch (main) {
    case 'Clear': return <Sun {...props} className={`${additionalClasses} text-amber-400 drop-shadow-md`} />;
    case 'Rain': 
    case 'Drizzle':
        return <CloudRain {...props} className={`${additionalClasses} text-blue-400 drop-shadow-md`} />;
    case 'Clouds': return <CloudSun {...props} className={`${additionalClasses} text-slate-200 drop-shadow-md`} />;
    case 'Thunderstorm': return <CloudLightning {...props} className={`${additionalClasses} text-purple-400 drop-shadow-md`} />;
    case 'Snow': return <Snowflake {...props} className={`${additionalClasses} text-teal-200 drop-shadow-md`} />;
    default: return <Cloud {...props} className={`${additionalClasses} text-slate-300 drop-shadow-md`} />;
  }
};
