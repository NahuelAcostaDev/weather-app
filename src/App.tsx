import { useState, useEffect, useRef, useMemo } from 'react';
import { useWeather } from './hooks/useWeather';
import HourlyForecast from './components/hourlyForecast';
import DailyForecast from './components/dailyForecast';
import Favorites from './components/favorites';
import { type FavoriteCity, loadFavorites, saveFavorites } from './utils/localStorage';
import CityAutocomplete from './components/cityAutocomplete';
import { getWeatherIconUrl } from './utils/weathericons';
import { useTheme } from './context/themeContext';
import { getBackgroundForWeather } from './utils/weatherBackgrounds';
import './styles/weatherBackgrounds.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: -34.9011,
    lon: -56.1645
  });

  const [cityName, setCityName] = useState("");
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [currentCityLabel, setCurrentCityLabel] = useState("Montevideo, Uruguay");
  const { data, loading, error } = useWeather(coords.lat, coords.lon);
  const nowCardRef = useRef<HTMLDivElement | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => { setFavorites(loadFavorites()); }, []);
  useEffect(() => { saveFavorites(favorites); }, [favorites]);

  useEffect(() => {
    if (!data?.current_weather || !nowCardRef.current) return;
    const code = data.current_weather.weathercode;
    const backgroundStyle = getBackgroundForWeather(code);
    nowCardRef.current.style.setProperty('--now-card-bg', backgroundStyle);
  }, [data]);

  useEffect(() => {
    setTransitionKey(prev => prev + 1);
  }, [coords.lat, coords.lon]);

  const handleCitySelect = (lat: number, lon: number, label?: string) => {
    setCoords({ lat, lon });
    if (label) {
      setCurrentCityLabel(label);
    }
  };

  const addFavorite = () => {
    if (!cityName.trim()) return;

    const newCity: FavoriteCity = {
      name: cityName,
      lat: coords.lat,
      lon: coords.lon
    };

    if (favorites.some(f => f.name.toLowerCase() === newCity.name.toLowerCase())) {
      alert("Esa ciudad ya está en favoritos.");
      return;
    }

    setFavorites(prev => [...prev, newCity]);
    setCityName("");
  };

  const deleteFavorite = (name: string) => {
    setFavorites(prev => prev.filter(f => f.name !== name));
  };

  const selectFavorite = (city: FavoriteCity) => {
    setCoords({ lat: city.lat, lon: city.lon });
    setCurrentCityLabel(city.name);
  };

  const getLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation no soportada');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setCurrentCityLabel("Ubicación actual");
      },
      () => alert('Permiso denegado o error')
    );
  };

  const formattedCurrentTime = useMemo(() => {
    if (!data?.current_weather?.time) return "";
    try {
      const date = new Date(data.current_weather.time);
      const formatter = new Intl.DateTimeFormat("es-UY", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
      return formatter.format(date);
    } catch {
      return data.current_weather.time;
    }
  }, [data?.current_weather?.time]);

  const currentTimeDisplay = formattedCurrentTime
    ? `${formattedCurrentTime}${data?.timezone_abbreviation ? ` (${data.timezone_abbreviation})` : ""}`
    : "";

  return (
    <div className="app-wrapper">
      <div className="app-content">
        <header className="glass-panel glass-toolbar d-flex justify-content-between align-items-center mb-3">
          <h1 className="fw-bold">Weather App</h1>

          <div className="d-flex gap-2">
            <button onClick={getLocation} className="btn btn-primary">
              Ubicación
            </button>

            <button onClick={toggleTheme} className="btn btn-secondary">
              {theme === "light" ? "🌙 Modo Oscuro" : "🌞 Modo Claro"}
            </button>
          </div>
        </header>

        <div className="current-city-chip glass-panel subtle-chip mb-4">
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
          <span>{currentCityLabel}</span>
        </div>

        <CityAutocomplete onSelect={handleCitySelect} />

        <div className="input-group mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la ciudad"
            value={cityName}
            onChange={e => setCityName(e.target.value)}
          />
          <button className="btn btn-success" onClick={addFavorite}>
            Guardar ⭐
          </button>
        </div>

        {loading && <p className="status-pill">Cargando...</p>}
        {error && <p className="status-pill error">{error}</p>}

        <div key={transitionKey} className="weather-panels fade-in">
          {data?.current_weather && (
            <div className="mt-4 p-4 glass-panel now-card text-white" ref={nowCardRef}>
              <h2 className="mb-2 d-flex align-items-center gap-2">
                Ahora
                <img
                  src={getWeatherIconUrl(data.current_weather.weathercode)}
                  alt="icono clima"
                  style={{ width: "48px" }}
                />
              </h2>

              <div className="now-card__meta">
                <span className="now-card__city">{currentCityLabel}</span>
                {currentTimeDisplay && (
                  <span className="now-card__time"></span>
                )}
              </div>

              <div className="now-card__stat-grid">
                <div className="now-card__stat-chip">
                  <span>Temperatura</span>
                  <strong>{data.current_weather.temperature} °C</strong>
                </div>
                <div className="now-card__stat-chip">
                  <span>Viento</span>
                  <strong>{data.current_weather.windspeed} m/s</strong>
                </div>
                <div className="now-card__stat-chip">
                  <span>Última lectura</span>
                  <strong>{currentTimeDisplay || data.current_weather.time}</strong>
                </div>
              </div>
            </div>
          )}

          {data?.hourly && <HourlyForecast hourly={data.hourly} />}
          {data?.daily && <DailyForecast daily={data.daily} />}

          <Favorites
            favorites={favorites}
            onSelect={selectFavorite}
            onDelete={deleteFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
