import { WeatherData, ForecastItem, PollutionData } from "@/types/weather";

export const createMockData = (cityName: string): { weather: WeatherData; forecast: ForecastItem[]; pollution: PollutionData } => ({
    weather: {
        name: cityName || "New York",
        sys: { country: "US", sunrise: 1715424000, sunset: 1715468400 },
        coord: { lat: 40.7128, lon: -74.0060 },
        main: { temp: 24, feels_like: 26, humidity: 45, pressure: 1013 },
        weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
        wind: { speed: 5.1 },
        dt: Date.now() / 1000
    },
    forecast: Array.from({ length: 8 }).map((_, i) => ({
        dt: (Date.now() / 1000) + (i * 10800),
        main: { temp: 24 - (i * 0.5) },
        weather: [{ main: i % 4 === 0 ? "Rain" : "Clouds" }]
    })),
    pollution: {
        main: { aqi: 1 },
        components: { pm2_5: 8.5, co: 320.5 }
    }
});
