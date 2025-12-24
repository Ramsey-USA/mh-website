"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "../ui";

interface MapLocation {
  lat: number;
  lng: number;
  title: string;
  description: string;
  type: "office" | "service-area" | "project";
}

interface InteractiveMapProps {
  showServiceAreas?: boolean;
  showProjects?: boolean;
  height?: string;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  showServiceAreas = true,
  showProjects = false,
  height = "400px",
  className = "",
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null,
  );
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, _setMapError] = useState(false);

  // MH Construction office location
  const officeLocation: MapLocation = {
    lat: 46.2396,
    lng: -119.1006,
    title: "MH Construction Headquarters",
    description: "3111 N. Capitol Ave., Pasco, WA 99301",
    type: "office",
  };

  // Service area locations
  const serviceAreas: MapLocation[] = [
    {
      lat: 46.2396,
      lng: -119.1006,
      title: "Pasco, WA",
      description: "Primary service area - Full construction services",
      type: "service-area",
    },
    {
      lat: 46.2112,
      lng: -119.1372,
      title: "Kennewick, WA",
      description: "Complete residential and commercial construction",
      type: "service-area",
    },
    {
      lat: 46.2784,
      lng: -119.2844,
      title: "Richland, WA",
      description: "Custom homes and renovation projects",
      type: "service-area",
    },
    {
      lat: 46.0646,
      lng: -118.343,
      title: "Walla Walla, WA",
      description: "Residential construction and remodeling",
      type: "service-area",
    },
    {
      lat: 46.6021,
      lng: -120.5059,
      title: "Yakima, WA",
      description: "Extended service area for larger projects",
      type: "service-area",
    },
    {
      lat: 47.6587,
      lng: -117.426,
      title: "Spokane, WA",
      description: "Extended service area for commercial projects",
      type: "service-area",
    },
  ];

  // Sample project locations (if enabled)
  const projectLocations: MapLocation[] = [
    {
      lat: 46.252,
      lng: -119.08,
      title: "Recent Custom Home",
      description: "Luxury 4-bedroom custom home completed 2024",
      type: "project",
    },
    {
      lat: 46.22,
      lng: -119.15,
      title: "Commercial Complex",
      description: "Modern office building - 15,000 sq ft",
      type: "project",
    },
  ];

  const allLocations = [
    { ...officeLocation, type: "office" as const },
    ...(showServiceAreas ? serviceAreas : []),
    ...(showProjects ? projectLocations : []),
  ];

  // Simulate map loading (replace with actual Google Maps implementation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetDirections = (location: MapLocation) => {
    const address = encodeURIComponent(
      location.type === "office"
        ? "3111 N Capitol Ave, Pasco, WA 99301"
        : `${location.title}, WA`,
    );
    window.open(`https://maps.google.com/maps?daddr=${address}`, "_blank");
  };

  const handleCallOffice = () => {
    // Track the phone call click
    if (typeof fetch !== "undefined") {
      fetch("/api/track-phone-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "interactive-map",
          phoneNumber: "(509) 308-6489",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silent fail - don't block the phone call
      });
    }

    window.location.href = "tel:+15093086489";
  };

  if (mapError) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <div className="mb-4 text-gray-400 text-4xl">[MAP]</div>
          <h3 className="mb-2 font-semibold text-xl">
            Map Temporarily Unavailable
          </h3>
          <p className="mb-4 text-gray-600">
            Our interactive map is currently unavailable. Please use the contact
            information below.
          </p>
          <div className="space-y-2">
            <Button
              variant="default"
              onClick={handleCallOffice}
              className="w-full sm:w-auto"
            >
              [PHONE] Call (509) 308-6489
            </Button>
            <Button
              variant="outline"
              onClick={() => handleGetDirections(officeLocation)}
              className="w-full sm:w-auto"
            >
              🧭 Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Our Location & Service Areas</span>
            <Button variant="outline" size="sm" onClick={handleCallOffice}>
              [PHONE] Call Us
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Map Container */}
          <div className="relative bg-gray-100 border-b" style={{ height }}>
            {!mapLoaded ? (
              // Loading state
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 border-b-2 border-brand-primary rounded-full w-8 h-8 animate-spin"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            ) : (
              // Interactive Map Placeholder (replace with actual Google Maps)
              <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                  <div className="mb-4 text-6xl">[MAP]</div>
                  <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                    Interactive Map
                  </h3>
                  <p className="mb-4 text-gray-600">
                    MH Construction - Serving the Pacific Northwest
                  </p>
                  <div className="gap-2 grid grid-cols-2 max-w-md">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleGetDirections(officeLocation)}
                    >
                      [LOCATION_ON] Office Directions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCallOffice}
                    >
                      [PHONE] Contact
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location List */}
          <div className="p-6">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {allLocations.map((location, _index) => (
                <div
                  key={_index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation === location
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-gray-200 hover:border-brand-primary/50"
                  }`}
                  onClick={() => setSelectedLocation(location)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    setSelectedLocation(location)
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${location.title} on map`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 text-2xl">
                      {location.type === "office"
                        ? "[APARTMENT]"
                        : location.type === "project"
                          ? "[CONSTRUCTION]"
                          : "[LOCATION_ON]"}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold text-gray-900">
                        {location.title}
                      </h4>
                      <p className="mb-2 text-gray-600 text-sm">
                        {location.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(location);
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
            <div className="bg-gray-50 dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-2xl">
                <h3 className="mb-2 font-semibold text-lg">
                  {selectedLocation.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {selectedLocation.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="default"
                    onClick={() => handleGetDirections(selectedLocation)}
                  >
                    🧭 Get Directions
                  </Button>
                  {selectedLocation.type === "office" && (
                    <Button variant="outline" onClick={handleCallOffice}>
                      [PHONE] Call Office
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedLocation(null)}
                  >
                    Close Details
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Contact Strip */}
          <div className="bg-brand-primary p-4 border-t text-white">
            <div className="flex sm:flex-row flex-col justify-between items-center">
              <div className="mb-2 sm:mb-0">
                <h4 className="font-semibold">Ready to Start Your Project?</h4>
                <p className="opacity-90 text-sm">
                  Free consultations available throughout our service areas
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCallOffice}
                  className="bg-white hover:bg-gray-100 text-brand-primary"
                >
                  [PHONE] (509) 308-6489
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-white border-white text-white hover:text-brand-primary"
                  onClick={() => (window.location.href = "/contact")}
                >
                  💬 Contact Form
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Service Area Overview Component
export const ServiceAreaOverview: React.FC = () => {
  const serviceAreas = [
    {
      city: "Pasco",
      state: "WA",
      description: "Headquarters location with full-service construction",
      services: ["Custom Homes", "Commercial", "Renovations", "Urgent Support"],
      responseTime: "24 hours",
    },
    {
      city: "Tri-Cities Area",
      state: "WA",
      description: "Kennewick, Richland, and surrounding communities",
      services: ["Residential", "Commercial", "Remodeling"],
      responseTime: "24-48 hours",
    },
    {
      city: "Walla Walla",
      state: "WA",
      description: "Wine country construction and renovations",
      services: ["Custom Homes", "Wineries", "Residential"],
      responseTime: "48 hours",
    },
    {
      city: "Extended Areas",
      state: "WA",
      description: "Yakima, Spokane, and major projects statewide",
      services: ["Large Commercial", "Multi-Family", "Industrial"],
      responseTime: "72 hours",
    },
  ];

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
      {serviceAreas.map((area, _index) => (
        <Card key={_index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>
                {area.city}, {area.state}
              </span>
              <span className="bg-green-100 px-2 py-1 rounded text-green-800 text-sm">
                {area.responseTime}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">{area.description}</p>
            <div>
              <h4 className="mb-2 font-semibold">Available Services:</h4>
              <div className="flex flex-wrap gap-2">
                {area.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-primary/10 px-2 py-1 rounded text-brand-primary text-sm"
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
  );
};
