import React, { useState } from "react";
import { useCitySearch } from "../hooks/useCitySearch";

interface Props {
  onSelect: (lat: number, lon: number) => void;
}

const CitySearch: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const { results, searchCity, loading } = useCitySearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchCity(value);
  };

  return (
    <div className="mb-4 position-relative">

      <input
        type="text"
        className="form-control"
        placeholder="Buscar ciudad..."
        value={query}
        onChange={handleChange}
      />

      {loading && <p className="mt-2">Buscando...</p>}

      {results.length > 0 && (
        <ul className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 10 }}>
          {results.map((city) => (
            <li
              key={city.id}
              className="list-group-item list-group-item-action"
              onClick={() => {
                onSelect(city.latitude, city.longitude);
                setQuery(`${city.name}, ${city.country}`);
              }}
              style={{ cursor: "pointer" }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
