// Mapa: weathercode de Open-Meteo → icono de WeatherAPI
export const weatherIconMap: Record<number, string> = {
  0: "113", // Soleado
  1: "116", // Mayormente soleado
  2: "119", // Parcialmente nublado
  3: "122", // Nublado

  45: "143", // Neblina
  48: "248", // Neblina densa

  51: "263", // Llovizna ligera
  53: "266", // Llovizna
  55: "281", // Llovizna fuerte

  61: "296", // Lluvia ligera
  63: "299", // Lluvia
  65: "302", // Lluvia intensa

  66: "305", // Lluvia congelada ligera
  67: "308", // Lluvia congelada fuerte

  71: "311", // Nieve ligera
  73: "314", // Nieve
  75: "317", // Nieve intensa

  77: "320", // Cristales de hielo

  80: "353", // Chaparrón ligero
  81: "356", // Chaparrón
  82: "359", // Chaparrón fuerte

  85: "368", // Nevada ligera en ráfagas
  86: "371", // Nevada fuerte en ráfagas

  95: "389", // Tormenta
  96: "392", // Tormenta con granizo leve
  99: "395", // Tormenta con granizo fuerte
};

// Función: devuelve la URL del icono
export const getWeatherIconUrl = (weatherCode: number): string => {
  const icon = weatherIconMap[weatherCode] ?? "113"; // fallback a soleado
  return `https://cdn.weatherapi.com/weather/128x128/day/${icon}.png`;
};
