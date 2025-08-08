import { useState } from 'react';
import { PropertyFilters as FilterType } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Search, Filter, X } from 'lucide-react';

interface PropertyFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onSearch: (query: string) => void;
}

export function PropertyFilters({ filters, onFiltersChange, onSearch }: PropertyFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const handleBedroomsChange = (value: string) => {
    onFiltersChange({
      ...filters,
      bedrooms: value === 'any' ? undefined : parseInt(value)
    });
  };

  const handleBathroomsChange = (value: string) => {
    onFiltersChange({
      ...filters,
      bathrooms: value === 'any' ? undefined : parseInt(value)
    });
  };

  const handlePropertyTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      propertyType: value === 'any' ? undefined : value
    });
  };

  const handleVRTourToggle = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      hasVRTour: checked ? true : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 5000000],
      bedrooms: undefined,
      bathrooms: undefined,
      propertyType: undefined,
      location: undefined,
      hasVRTour: undefined
    });
    setSearchQuery('');
    onSearch('');
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by location, property type, or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch(searchQuery)}
          className="pl-10 pr-4 py-3"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              onSearch('');
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        {(filters.bedrooms || filters.bathrooms || filters.propertyType || filters.hasVRTour) && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            Clear all
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Price Range</Label>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={5000000}
                  min={0}
                  step={50000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bedrooms</Label>
                <Select
                  value={filters.bedrooms?.toString() || 'any'}
                  onValueChange={handleBedroomsChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Bathrooms</Label>
                <Select
                  value={filters.bathrooms?.toString() || 'any'}
                  onValueChange={handleBathroomsChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Property Type</Label>
              <Select
                value={filters.propertyType || 'any'}
                onValueChange={handlePropertyTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* VR Tour Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">VR Tour Available</Label>
              <Switch
                checked={filters.hasVRTour || false}
                onCheckedChange={handleVRTourToggle}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
