import { useState, useMemo } from 'react';
import { Property, PropertyFilters } from '@shared/types';
import { mockProperties } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilters as PropertyFiltersComponent } from '@/components/PropertyFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Headset, Building2, MapPin, TrendingUp, Star, Award } from 'lucide-react';

export default function Index() {
  const [properties] = useState<Property[]>(mockProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [0, 5000000],
    bedrooms: undefined,
    bathrooms: undefined,
    propertyType: undefined,
    location: undefined,
    hasVRTour: undefined
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = `${property.title} ${property.description} ${property.location.address} ${property.location.city} ${property.location.state} ${property.features.propertyType}`.toLowerCase();
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Price range filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms && property.features.bedrooms < filters.bedrooms) {
        return false;
      }

      // Bathrooms filter
      if (filters.bathrooms && property.features.bathrooms < filters.bathrooms) {
        return false;
      }

      // Property type filter
      if (filters.propertyType && property.features.propertyType !== filters.propertyType) {
        return false;
      }

      // VR Tour filter
      if (filters.hasVRTour && !property.vrTour.available) {
        return false;
      }

      return true;
    });
  }, [properties, searchQuery, filters]);

  const featuredProperties = filteredProperties.filter(p => p.featured);
  const vrTourCount = properties.filter(p => p.vrTour.available).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-luxury-900 via-primary to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Building2 className="w-8 h-8" />
              <h1 className="text-4xl md:text-6xl font-bold">VR Estate</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-luxury-100">
              Experience Properties Like Never Before
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-luxury-200">
              Step into your dream home with immersive VR tours. Browse premium real estate with cutting-edge virtual reality technology.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-300">{properties.length}</div>
                <div className="text-sm text-luxury-200">Premium Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">{vrTourCount}</div>
                <div className="text-sm text-luxury-200">VR Tours Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-300">24/7</div>
                <div className="text-sm text-luxury-200">Virtual Viewing</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                <Headset className="w-5 h-5 mr-2" />
                Start VR Tour
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
                Browse Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VR Estate</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Revolutionary real estate experience combining traditional property viewing with immersive virtual reality technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headset className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Immersive VR Tours</h3>
              <p className="text-gray-600">Walk through properties from anywhere in the world with 360° virtual reality experiences.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-luxury-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-luxury-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Properties</h3>
              <p className="text-gray-600">Curated selection of luxury homes, condos, and commercial properties in prime locations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Agents</h3>
              <p className="text-gray-600">Work with experienced real estate professionals who understand luxury market dynamics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Property</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of premium real estate with advanced filtering and immersive VR tours.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <PropertyFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={setSearchQuery}
            />
          </div>

          {/* Featured Properties */}
          {featuredProperties.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-luxury-600" />
                <h3 className="text-2xl font-bold text-gray-900">Featured Properties</h3>
                <Badge className="bg-luxury-500 text-white">Premium</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}

          {/* All Properties */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                All Properties ({filteredProperties.length})
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Headset className="w-4 h-4" />
                <span>{filteredProperties.filter(p => p.vrTour.available).length} with VR Tours</span>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters.</p>
                <Button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 5000000],
                      bedrooms: undefined,
                      bathrooms: undefined,
                      propertyType: undefined,
                      location: undefined,
                      hasVRTour: undefined
                    });
                    setSearchQuery('');
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Schedule a private VR tour or speak with one of our expert real estate agents today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
              Schedule VR Tour
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3">
              Contact Agent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
