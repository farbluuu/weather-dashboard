export interface WeatherData {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    coord: { lat: number; lon: number };
    main: { temp: number; feels_like: number; humidity: number; pressure: number };
    weather: Array<{ main: string; description: string; icon: string }>;
    wind: { speed: number };
    dt: number;
}

export interface ForecastItem {
    dt: number;
    main: { temp: number };
    weather: Array<{ main: string }>;
}

export interface PollutionData {
    main: { aqi: number };
    components: { pm2_5: number; co: number };
}
