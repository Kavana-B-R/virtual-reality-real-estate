import { Property } from '@shared/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, MapPin, BedDouble, Bath, Square, Calendar, Phone, Mail, Headset } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const handleVRTour = () => {
    navigate(`/property/${property.id}/vr-tour`);
  };

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <Badge className="bg-luxury-500 text-white">Featured</Badge>
          )}
          {property.vrTour.available && (
            <Badge className="bg-emerald-500 text-white flex items-center gap-1">
              <Headset className="w-3 h-3" />
              VR Tour
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900 font-semibold">
            {formatPrice(property.price)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.location.address}, {property.location.city}, {property.location.state}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{property.features.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{property.features.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{formatSquareFeet(property.features.squareFeet)} sqft</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <img
            src={property.agent.photo}
            alt={property.agent.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">{property.agent.name}</p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {property.agent.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {property.vrTour.available && (
            <Button
              size="sm"
              onClick={handleVRTour}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Headset className="w-4 h-4 mr-2" />
              VR Tour
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
