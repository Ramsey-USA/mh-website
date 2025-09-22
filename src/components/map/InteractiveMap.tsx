'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '../ui'

interface MapLocation {
  lat: number
  lng: number
  title: string
  description: string
  type: 'office' | 'service-area' | 'project'
}

interface InteractiveMapProps {
  showServiceAreas?: boolean
  showProjects?: boolean
  height?: string
  className?: string
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  showServiceAreas = true,
  showProjects = false,
  height = '400px',
  className = ''
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  // MH Construction office location
  const officeLocation: MapLocation = {
    lat: 46.2396,
    lng: -119.1006,
    title: 'MH Construction Headquarters',
    description: '3111 N. Capital Ave., Pasco, WA 99301',
    type: 'office'
  }

  // Service area locations
  const serviceAreas: MapLocation[] = [
    {
      lat: 46.2396,
      lng: -119.1006,
      title: 'Pasco, WA',
      description: 'Primary service area - Full construction services',
      type: 'service-area'
    },
    {
      lat: 46.2112,
      lng: -119.1372,
      title: 'Kennewick, WA',
      description: 'Complete residential and commercial construction',
      type: 'service-area'
    },
    {
      lat: 46.2784,
      lng: -119.2844,
      title: 'Richland, WA',
      description: 'Custom homes and renovation projects',
      type: 'service-area'
    },
    {
      lat: 46.0646,
      lng: -118.3430,
      title: 'Walla Walla, WA',
      description: 'Residential construction and remodeling',
      type: 'service-area'
    },
    {
      lat: 46.6021,
      lng: -120.5059,
      title: 'Yakima, WA',
      description: 'Extended service area for larger projects',
      type: 'service-area'
    },
    {
      lat: 47.6587,
      lng: -117.4260,
      title: 'Spokane, WA',
      description: 'Extended service area for commercial projects',
      type: 'service-area'
    }
  ]

  // Sample project locations (if enabled)
  const projectLocations: MapLocation[] = [
    {
      lat: 46.2520,
      lng: -119.0800,
      title: 'Recent Custom Home',
      description: 'Luxury 4-bedroom custom home completed 2024',
      type: 'project'
    },
    {
      lat: 46.2200,
      lng: -119.1500,
      title: 'Commercial Complex',
      description: 'Modern office building - 15,000 sq ft',
      type: 'project'
    }
  ]

  const allLocations = [
    { ...officeLocation, type: 'office' as const },
    ...(showServiceAreas ? serviceAreas : []),
    ...(showProjects ? projectLocations : [])
  ]

  // Simulate map loading (replace with actual Google Maps implementation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGetDirections = (location: MapLocation) => {
    const address = encodeURIComponent(
      location.type === 'office' 
        ? '3111 N Capital Ave, Pasco, WA 99301'
        : `${location.title}, WA`
    )
    window.open(`https://maps.google.com/maps?daddr=${address}`, '_blank')
  }

  const handleCallOffice = () => {
    window.location.href = 'tel:+15093086489'
  }

  if (mapError) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <div className="text-gray-400 text-4xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold mb-2">Map Temporarily Unavailable</h3>
          <p className="text-gray-600 mb-4">
            Our interactive map is currently unavailable. Please use the contact information below.
          </p>
          <div className="space-y-2">
            <Button 
              variant="primary" 
              onClick={handleCallOffice}
              className="w-full sm:w-auto"
            >
              📞 Call (509) 308-6489
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleGetDirections(officeLocation)}
              className="w-full sm:w-auto"
            >
              🧭 Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Our Location & Service Areas</span>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleCallOffice}
            >
              📞 Call Us
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Map Container */}
          <div 
            className="relative bg-gray-100 border-b"
            style={{ height }}
          >
            {!mapLoaded ? (
              // Loading state
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            ) : (
              // Interactive Map Placeholder (replace with actual Google Maps)
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 mb-4">
                    MH Construction - Serving the Pacific Northwest
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-w-md">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleGetDirections(officeLocation)}
                    >
                      📍 Office Directions
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={handleCallOffice}
                    >
                      📞 Contact
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location List */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allLocations.map((location, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation === location
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-gray-200 hover:border-brand-primary/50'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">
                      {location.type === 'office' ? '🏢' : 
                       location.type === 'project' ? '🏗️' : '📍'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {location.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {location.description}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGetDirections(location)
                        }}
                        className="text-xs"
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Location Details */}
          {selectedLocation && (
            <div className="border-t bg-gray-50 p-6">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold mb-2">
                  {selectedLocation.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedLocation.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleGetDirections(selectedLocation)}
                  >
                    🧭 Get Directions
                  </Button>
                  {selectedLocation.type === 'office' && (
                    <Button
                      variant="secondary"
                      onClick={handleCallOffice}
                    >
                      📞 Call Office
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedLocation(null)}
                  >
                    Close Details
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Contact Strip */}
          <div className="border-t bg-brand-primary text-white p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-2 sm:mb-0">
                <h4 className="font-semibold">Ready to Start Your Project?</h4>
                <p className="text-sm opacity-90">
                  Free consultations available throughout our service areas
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleCallOffice}
                  className="bg-white text-brand-primary hover:bg-gray-100"
                >
                  📞 (509) 308-6489
                </Button>
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-brand-primary"
                  onClick={() => window.location.href = '/contact'}
                >
                  💬 Contact Form
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Service Area Overview Component
export const ServiceAreaOverview: React.FC = () => {
  const serviceAreas = [
    {
      city: 'Pasco',
      state: 'WA',
      description: 'Headquarters location with full-service construction',
      services: ['Custom Homes', 'Commercial', 'Renovations', 'Emergency'],
      responseTime: '24 hours'
    },
    {
      city: 'Tri-Cities Area',
      state: 'WA',
      description: 'Kennewick, Richland, and surrounding communities',
      services: ['Residential', 'Commercial', 'Remodeling'],
      responseTime: '24-48 hours'
    },
    {
      city: 'Walla Walla',
      state: 'WA',
      description: 'Wine country construction and renovations',
      services: ['Custom Homes', 'Wineries', 'Residential'],
      responseTime: '48 hours'
    },
    {
      city: 'Extended Areas',
      state: 'WA',
      description: 'Yakima, Spokane, and major projects statewide',
      services: ['Large Commercial', 'Multi-Family', 'Industrial'],
      responseTime: '72 hours'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {serviceAreas.map((area, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{area.city}, {area.state}</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                {area.responseTime}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{area.description}</p>
            <div>
              <h4 className="font-semibold mb-2">Available Services:</h4>
              <div className="flex flex-wrap gap-2">
                {area.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}