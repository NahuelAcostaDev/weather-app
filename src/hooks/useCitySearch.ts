import { useState } from "react";

export function useCitySearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchCity = async (query: string) => {
    if (query.length < 2) return setResults([]); // evitar spam

    setLoading(true);

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=es`
      );
      const data = await res.json();

      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    }

    setLoading(false);
  };

  return { results, searchCity, loading };
}
