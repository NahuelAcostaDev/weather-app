import React from "react";
import type { FavoriteCity } from "../utils/localStorage.ts";

interface Props {
  favorites: FavoriteCity[];
  onSelect: (city: FavoriteCity) => void;
  onDelete: (name: string) => void;
}

const Favorites: React.FC<Props> = ({ favorites, onSelect, onDelete }) => {
  return (
    <div className="glass-panel favorites-panel mt-4">
      <h5 className="fw-bold">⭐ Ciudades favoritas</h5>

      {favorites.length === 0 && (
        <p className="favorites-empty">No hay ciudades guardadas.</p>
      )}

      <ul className="favorites-list">
        {favorites.map(city => (
          <li
            key={city.name}
            className="favorite-item"
          >
            <button
              type="button"
              className="favorite-name"
              onClick={() => onSelect(city)}
            >
              {city.name}
            </button>

            <button
              type="button"
              className="favorite-delete"
              onClick={() => onDelete(city.name)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
