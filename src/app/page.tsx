"use client";

import React, { useState, useEffect } from 'react';
import { Search, Droplets, Wind, Thermometer, CircleAlert } from 'lucide-react';
import { WeatherData, ForecastItem, PollutionData } from '@/types/weather';
import { createMockData } from '@/utils/mockData';
import { StatCard } from '@/components/StatCard';
import { HeroWeatherCard } from '@/components/HeroWeatherCard';
import { AirQualityCard } from '@/components/AirQualityCard';
import { ForecastCard } from '@/components/ForecastCard';

const Dashboard = () => {
  const [city, setCity] = useState('Bangkok');
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [pollution, setPollution] = useState<PollutionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      
      if (!apiKey || apiKey === "") {
        // Fallback to mock data if no API key is set
        setTimeout(() => {
          const mockData = createMockData(cityName);
          setWeather(mockData.weather);
          setForecast(mockData.forecast);
          setPollution(mockData.pollution);
          setLoading(false);
        }, 800);
        return;
      }

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!weatherRes.ok) throw new Error('City not found. Please try again.');
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list);

      const { lat, lon } = weatherData.coord;
      const pollutionRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const pollutionData = await pollutionRes.json();
      setPollution(pollutionData.list[0]);

    } catch (err: any) {
      setError(err.message);
    } finally {
      if (process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      fetchData(searchQuery);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-100">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-max">
        
        {/* Header / Search Area */}
        <div className="md:col-span-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-2">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">Weather Dashboard</h1>
                <p className="text-sm text-slate-400 font-medium">Real-time weather insights</p>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-full lg:w-96 group">
                <input 
                    type="text" 
                    placeholder="Search city (e.g. London)..." 
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-6 pr-14 text-slate-700 outline-none shadow-sm group-hover:shadow-md focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2.5 top-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-95">
                    <Search size={18} />
                </button>
            </form>
        </div>

        {/* Hero Section: Current Weather */}
        <HeroWeatherCard weather={weather} />

        {/* Air Quality Box */}
        <AirQualityCard pollution={pollution} />

        {/* Forecast Section */}
        <ForecastCard forecast={forecast} />

        {/* Stats Grid */}
        <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard icon={<Thermometer size={20} />} label="Feels Like" value={`${Math.round(weather?.main.feels_like || 0)}°C`} color="text-orange-500" bg="bg-orange-50" />
            <StatCard icon={<Droplets size={20} />} label="Humidity" value={`${weather?.main.humidity || 0}%`} color="text-blue-500" bg="bg-blue-50" />
            <StatCard icon={<Wind size={20} />} label="Wind Speed" value={`${weather?.wind.speed || 0} m/s`} color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard icon={<CircleAlert size={20} />} label="Pressure" value={`${weather?.main.pressure || 0} hPa`} color="text-indigo-500" bg="bg-indigo-50" />
        </div>

        {/* Footer Area */}
        <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between text-slate-300 py-6 px-4 gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]"></p>
            <div className="flex items-center gap-4 text-[10px] font-black tracking-widest">
                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> REACT FRAMEWORK</span>
                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> OPENWEATHER CORE</span>
            </div>
        </div>

      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-white/80 p-8 rounded-3xl shadow-2xl border border-white">
            <div className="relative">
                <div className="w-16 h-16 border-[5px] border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                </div>
            </div>
            <p className="text-xs font-black text-slate-800 uppercase tracking-[0.4em] animate-pulse mt-2">Updating Stats</p>
          </div>
        </div>
      )}

      {error && (
          <div className="fixed bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-max bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce z-50">
              <CircleAlert size={20} />
              <div className="text-sm font-bold">
                  <p>Request Error</p>
                  <p className="text-xs opacity-80">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="ml-auto md:ml-4 p-1 hover:bg-white/20 rounded-lg">Dismiss</button>
          </div>
      )}
    </div>
  );
};

export default Dashboard;
