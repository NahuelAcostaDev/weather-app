export const weatherBackgrounds: Record<number, string> = {
  // Cielo despejado
  0: "linear-gradient(135deg, #fef9d7 0%, #fcd34d 40%, #f97316 100%)",

  // Ligeramente nublado
  1: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
  2: "linear-gradient(135deg, #b6c2d9 0%, #eef1f5 100%)",

  // Nublado
  3: "linear-gradient(135deg, #94a3b8 0%, #475569 100%)",

  // Neblina
  45: "linear-gradient(135deg, #cfd9df 0%, #a1aab5 100%)",
  48: "linear-gradient(135deg, #b0bec5 0%, #90a4ae 100%)",

  // Llovizna
  51: "linear-gradient(135deg, #a7b8d8 0%, #8193c5 100%)",
  53: "linear-gradient(135deg, #7c8fac 0%, #4c5d7a 100%)",
  55: "linear-gradient(135deg, #5d6b82 0%, #2f3e51 100%)",

  // Lluvia
  61: "linear-gradient(135deg, #94bbe9 0%, #6f86d6 100%)",
  63: "linear-gradient(135deg, #5a7bd6 0%, #354a9f 100%)",
  65: "linear-gradient(135deg, #2b3384 0%, #1c1f4a 100%)",

  // Lluvia congelada
  66: "linear-gradient(135deg, #9ed0ff 0%, #5f9fd3 100%)",
  67: "linear-gradient(135deg, #5fa8d3 0%, #2f6690 100%)",

  // Nieve
  71: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
  73: "linear-gradient(135deg, #cfd9df 0%, #a6c0fe 100%)",
  75: "linear-gradient(135deg, #b1bfd8 0%, #6782b4 100%)",

  77: "linear-gradient(135deg, #d8e3e7 0%, #b3c5d7 100%)",

  // Chaparrones
  80: "linear-gradient(135deg, #8da2fb 0%, #6680ff 100%)",
  81: "linear-gradient(135deg, #5f72bd 0%, #1b2845 100%)",
  82: "linear-gradient(135deg, #414d68 0%, #141a2a 100%)",

  // Nevada por ráfagas
  85: "linear-gradient(135deg, #d9e4f5 0%, #f8f9d2 100%)",
  86: "linear-gradient(135deg, #d7d2cc 0%, #304352 100%)",

  // Tormentas
  95: "linear-gradient(135deg, #4e4376 0%, #2b5876 100%)",
  96: "linear-gradient(135deg, #3a1c71 0%, #1a2a6c 100%)",
  99: "linear-gradient(135deg, #000428 0%, #004e92 100%)"
};

export const getBackgroundForWeather = (code: number): string => {
  return weatherBackgrounds[code] ?? "linear-gradient(135deg, #4f46e5, #0ea5e9)";
};