import React from "react";
import { getWeatherIconUrl } from "../utils/weathericons"; 

interface Props {
  hourly: {
    time: string[];
    temperature_2m: number[];
    windspeed_10m: number[];
    weathercode: number[];
  };
}

const HourlyForecast: React.FC<Props> = ({ hourly }) => {
  // Tomamos solo las próximas 24 horas
  const next24 = hourly.time.slice(0, 24).map((time, i) => ({
    time,
    temp: hourly.temperature_2m[i],
    wind: hourly.windspeed_10m[i],
    code: hourly.weathercode[i]
  }));

  return (
    <section className="mt-4">
      <h3 className="section-title">Próximas 24 horas</h3>

      <div className="hourly-track">
        {next24.map((h, i) => (
          <div key={i} className="hour-card glass-panel text-center">
            <p className="hour-card__title">{h.time.slice(11, 16)}h</p>

            <img 
              src={getWeatherIconUrl(h.code)}
              alt="icono clima"
              style={{ width: "48px" }}
            />

            <p className="hour-card__temp">Temp: {h.temp} °C</p>
            <p className="hour-card__wind">{h.wind} m/s</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyForecast;
