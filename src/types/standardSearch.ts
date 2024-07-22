export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ViewportCorners {
  northEast: Coordinates;
  northWest: Coordinates;
  southWest: Coordinates;
  southEast: Coordinates;
}

// map component props interface
export interface MapComponentProps {
  setViewportCorners: (corners: ViewportCorners) => void;
  hotelData:HotelData[]
}

//property card
export interface HotelData {
  imageUrl: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  price: number;
  currency: string;
  dates: string;
  lat?: number | undefined;
  lng?: number | undefined;
}
