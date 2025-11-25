import React, { useState } from "react";

interface Props {
  onSelect: (lat: number, lon: number, label?: string) => void;
}

const CityAutocomplete: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchCities = async (text: string) => {
    setQuery(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=5&language=es`
      );
      const json = await res.json();
      setResults(json.results || []);
    } catch (err) {
      console.error("Error al buscar ciudades", err);
    }

    setLoading(false);
  };

  const handleSelect = (city: any) => {
    const labelParts = [city.name, city.admin1, city.country].filter(Boolean);
    const label = labelParts.join(", ");
    onSelect(city.latitude, city.longitude, label || city.name);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="position-relative mt-4">
      <input
        type="text"
        className="form-control glass-input"
        placeholder="Buscar ciudad..."
        value={query}
        onChange={(e) => searchCities(e.target.value)}
      />

      {loading && <div className="status-pill subtle mt-2">Buscando...</div>}

      {results.length > 0 && (
        <ul
          className="autocomplete-results glass-panel"
          style={{ zIndex: 1000 }}
        >
          {results.map((city) => (
            <li
              key={city.id}
              className="autocomplete-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(city)}
            >
              {city.name}
              {city.admin1 ? `, ${city.admin1}` : ""} — {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
