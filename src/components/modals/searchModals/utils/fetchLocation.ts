import {LocationValue} from "@/types/searchbar"

export async function fetchLocationSuggestions(searchTerm:string) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    const data = await response.json();
    return data.map((item:LocationValue )=> ({
      name: item.name,
      display_name:item.display_name,
      lat: item.lat,
      lon: item.lon
    }));
  }