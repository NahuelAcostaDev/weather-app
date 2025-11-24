export interface FavoriteCity {
    name: string;
    lat: number;
    lon: number;
  }
  
  const STORAGE_KEY = "favoriteCities";
  
  // Cargar favoritos del localStorage
  export function loadFavorites(): FavoriteCity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error cargando favoritos:", error);
      return [];
    }
  }
  
  // Guardar favoritos en localStorage
  export function saveFavorites(favorites: FavoriteCity[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error guardando favoritos:", error);
    }
  }
  