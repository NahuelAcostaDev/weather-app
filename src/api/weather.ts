// src/api/weather.ts
export type CurrentWeather = {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  
  export type OpenMeteoResponse = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather?: CurrentWeather;
    hourly?: {
      time: string[];
      temperature_2m?: number[];
      relativehumidity_2m?: number[];
    };
    daily?: any;
  };
  
  export async function fetchWeatherByCoords(lat: number, lon: number): Promise<OpenMeteoResponse> {
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      hourly: 'temperature_2m,relativehumidity_2m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
      current_weather: 'true',
      timezone: 'auto'
    });
    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    const data: OpenMeteoResponse = await res.json();
    return data;
  }
  