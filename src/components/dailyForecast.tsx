import React from "react";
import { getWeatherIconUrl } from "../utils/weathericons";  

interface Props {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const DailyForecast: React.FC<Props> = ({ daily }) => {
  const days = daily.time.map((date, i) => ({
    date,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    code: daily.weathercode[i]
  }));

  return (
    <section className="mt-5">
      <h3 className="section-title">Próximos 7 días</h3>

      <div className="daily-grid">
        {days.map((d, i) => {
          const date = new Date(d.date);
          const dayName = dayNames[date.getDay()];
          const formatted = date.toLocaleDateString("es-UY", {
            day: "numeric",
            month: "short",
          });

          return (
            <div key={i} className="day-card glass-panel">
              <div>
                <p className="day-card__name">{dayName}</p>
                <p className="day-card__date">{formatted}</p>
              </div>

              <div className="day-card__temps">
                <p><strong>Max:</strong> {d.max}°C</p>
                <p><strong>Min:</strong> {d.min}°C</p>
              </div>

              <img 
                src={getWeatherIconUrl(d.code)}
                alt="icono clima"
                style={{ width: "48px" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
