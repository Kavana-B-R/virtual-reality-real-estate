export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize?: number;
    yearBuilt: number;
    propertyType: 'house' | 'condo' | 'townhouse' | 'apartment';
  };
  images: string[];
  vrTour: {
    available: boolean;
    scenes: VRScene[];
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  status: 'for-sale' | 'pending' | 'sold';
  listedDate: string;
  featured: boolean;
}

export interface VRScene {
  id: string;
  name: string;
  image360: string;
  hotspots: VRHotspot[];
  description?: string;
}

export interface VRHotspot {
  id: string;
  position: { x: number; y: number; z: number };
  type: 'navigation' | 'info';
  targetSceneId?: string; // For navigation hotspots
  title: string;
  description?: string;
  icon?: string;
}

export interface PropertyFilters {
  priceRange: [number, number];
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  location?: string;
  hasVRTour?: boolean;
}
