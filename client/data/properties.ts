import { Property } from "@shared/types";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Penthouse",
    description:
      "Stunning penthouse with panoramic city views, premium finishes, and private rooftop terrace. Located in the heart of downtown with walking distance to dining and entertainment.",
    price: 2850000,
    location: {
      address: "123 Metropolitan Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      coordinates: { lat: 40.7505, lng: -73.9934 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 2400,
      yearBuilt: 2020,
      propertyType: "condo",
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449247613801-ab06418e2861?w=800&h=600&fit=crop",
    ],
    vrTour: {
      available: true,
      scenes: [
        {
          id: "living-room",
          name: "Living Room",
          image360:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2048&h=1024&fit=crop",
          hotspots: [
            {
              id: "to-kitchen",
              position: { x: 0.8, y: 0, z: -0.5 },
              type: "navigation",
              targetSceneId: "kitchen",
              title: "Kitchen",
              description: "Go to the kitchen",
            },
            {
              id: "city-view",
              position: { x: -0.8, y: 0.2, z: 0.5 },
              type: "info",
              title: "City View",
              description: "Panoramic views of the downtown skyline",
            },
          ],
        },
        {
          id: "kitchen",
          name: "Kitchen",
          image360:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2048&h=1024&fit=crop",
          hotspots: [
            {
              id: "to-living",
              position: { x: -0.8, y: 0, z: 0.5 },
              type: "navigation",
              targetSceneId: "living-room",
              title: "Living Room",
              description: "Return to living room",
            },
          ],
        },
      ],
    },
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@realestate.com",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    },
    status: "for-sale",
    listedDate: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Charming Victorian Home",
    description:
      "Beautifully restored Victorian home with original hardwood floors, ornate moldings, and modern amenities. Perfect blend of historic charm and contemporary comfort.",
    price: 895000,
    location: {
      address: "456 Heritage Lane",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2800,
      lotSize: 5000,
      yearBuilt: 1895,
      propertyType: "house",
    },
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    vrTour: {
      available: true,
      scenes: [
        {
          id: "entrance",
          name: "Grand Entrance",
          image360:
            "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?w=2048&h=1024&fit=crop",
          hotspots: [
            {
              id: "to-parlor",
              position: { x: 0.6, y: 0, z: -0.8 },
              type: "navigation",
              targetSceneId: "parlor",
              title: "Parlor",
              description: "Enter the formal parlor",
            },
          ],
        },
        {
          id: "parlor",
          name: "Formal Parlor",
          image360:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2048&h=1024&fit=crop",
          hotspots: [
            {
              id: "fireplace",
              position: { x: 0, y: 0.1, z: -1 },
              type: "info",
              title: "Original Fireplace",
              description:
                "Restored 1895 marble fireplace with intricate carvings",
            },
          ],
        },
      ],
    },
    agent: {
      name: "Michael Chen",
      phone: "(555) 987-6543",
      email: "michael@sf-realty.com",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    status: "for-sale",
    listedDate: "2024-01-20",
    featured: false,
  },
  {
    id: "3",
    title: "Luxury Beachfront Condo",
    description:
      "Wake up to ocean views every day in this stunning beachfront condominium. Floor-to-ceiling windows, private balcony, and resort-style amenities.",
    price: 1650000,
    location: {
      address: "789 Ocean Drive",
      city: "Miami Beach",
      state: "FL",
      zipCode: "33139",
      coordinates: { lat: 25.7617, lng: -80.1918 },
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1800,
      yearBuilt: 2018,
      propertyType: "condo",
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    vrTour: {
      available: false,
      scenes: [],
    },
    agent: {
      name: "Isabella Rodriguez",
      phone: "(555) 456-7890",
      email: "isabella@miami-luxury.com",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    status: "for-sale",
    listedDate: "2024-01-25",
    featured: true,
  },
  {
    id: "4",
    title: "Modern Suburban Townhouse",
    description:
      "Contemporary 3-story townhouse in family-friendly neighborhood. Open concept living, private garage, and small backyard perfect for entertaining.",
    price: 575000,
    location: {
      address: "321 Maple Street",
      city: "Austin",
      state: "TX",
      zipCode: "78704",
      coordinates: { lat: 30.2672, lng: -97.7431 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1950,
      lotSize: 2500,
      yearBuilt: 2019,
      propertyType: "townhouse",
    },
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop",
    ],
    vrTour: {
      available: true,
      scenes: [
        {
          id: "main-floor",
          name: "Main Floor",
          image360:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2048&h=1024&fit=crop",
          hotspots: [
            {
              id: "upstairs",
              position: { x: 0.5, y: 0.3, z: 0.5 },
              type: "navigation",
              targetSceneId: "master-bedroom",
              title: "Upstairs",
              description: "Go to master bedroom",
            },
          ],
        },
        {
          id: "master-bedroom",
          name: "Master Bedroom",
          image360:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2048&h=1024&fit=crop",
          hotspots: [],
        },
      ],
    },
    agent: {
      name: "David Thompson",
      phone: "(555) 234-5678",
      email: "david@austin-homes.com",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    status: "for-sale",
    listedDate: "2024-02-01",
    featured: false,
  },
];
