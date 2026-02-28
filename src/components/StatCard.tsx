import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  bg: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, bg }) => {
  return (
    <div className="col-span-1 bg-white/70 backdrop-blur-xl border border-white/80 p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center lg:items-start text-center lg:text-left group relative overflow-hidden">
      
      {/* Decorative gradient blob inside card */}
      <div className={`absolute -right-12 -bottom-12 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-current ${color}`}></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full w-full">
        <div className={`${bg} ${color} w-14 h-14 flex items-center justify-center rounded-[1.25rem] mb-8 group-hover:rotate-[15deg] group-hover:scale-110 shadow-sm transition-all duration-500 self-center lg:self-start`}>
            {icon}
        </div>
        <div className="mt-auto">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-none">{value}</p>
        </div>
      </div>
    </div>
  );
};
