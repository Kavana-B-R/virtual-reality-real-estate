import { useParams, useNavigate } from "react-router-dom";
import { Property } from "@shared/types";
import { mockProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Headset,
  Car,
  Thermometer,
  Wifi,
  Shield,
  Camera,
  AlertCircle,
} from "lucide-react";

export default function PropertyDetail() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();

  const property = mockProperties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat("en-US").format(sqft);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.featured && (
                    <Badge className="bg-luxury-500 text-white">Featured</Badge>
                  )}
                  {property.vrTour.available && (
                    <Badge className="bg-emerald-500 text-white flex items-center gap-1">
                      <Headset className="w-3 h-3" />
                      VR Tour Available
                    </Badge>
                  )}
                </div>
              </div>

              {property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {property.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {property.location.address}, {property.location.city},{" "}
                        {property.location.state} {property.location.zipCode}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">
                      {formatPrice(property.price)}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {property.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{property.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BedDouble className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">
                      {property.features.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">
                      {property.features.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">
                      {formatSquareFeet(property.features.squareFeet)}
                    </div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">
                      {property.features.yearBuilt}
                    </div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Property Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium capitalize">
                        {property.features.propertyType}
                      </span>
                    </div>
                    {property.features.lotSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lot Size:</span>
                        <span className="font-medium">
                          {formatSquareFeet(property.features.lotSize)} sq ft
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed Date:</span>
                      <span className="font-medium">
                        {formatDate(property.listedDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">
                        {property.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Car className="w-5 h-5 text-gray-600" />
                    <span>Garage Parking</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Thermometer className="w-5 h-5 text-gray-600" />
                    <span>Central Air & Heat</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Wifi className="w-5 h-5 text-gray-600" />
                    <span>High-Speed Internet</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span>Security System</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* VR Tour CTA */}
            {property.vrTour.available && (
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Headset className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">
                      Virtual Reality Tour
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Experience this property in immersive VR with 360° views
                      and interactive hotspots.
                    </p>
                    <Button
                      onClick={() =>
                        navigate(`/property/${property.id}/vr-tour`)
                      }
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Headset className="w-4 h-4 mr-2" />
                      Start VR Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agent Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {property.agent.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Licensed Real Estate Agent
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `tel:${property.agent.phone}`)
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call {property.agent.phone}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `mailto:${property.agent.email}`)
                    }
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Tour */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule Tour</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Schedule an in-person tour or virtual consultation with our
                  expert agent.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule In-Person Tour
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Virtual Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
