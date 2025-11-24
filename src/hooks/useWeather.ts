import { useEffect, useState } from "react";

export function useWeather(lat: number, lon: number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto&hourly=temperature_2m,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode`
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Error al cargar datos");
      }

      setLoading(false);
    };

    fetchWeather();
  }, [lat, lon]);

  return { data, loading, error };
}
