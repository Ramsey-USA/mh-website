"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { PortfolioService } from "@/lib/services/portfolioService";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";

// Category definitions
const categories = [
  { id: "all", label: "All Projects", icon: "grid_view" },
  { id: "residential", label: "Residential", icon: "home" },
  { id: "commercial", label: "Commercial", icon: "business" },
  { id: "industrial", label: "Industrial", icon: "factory" },
  { id: "renovation", label: "Renovations", icon: "construction" },
];

// Project stats
const projectStats = [
  { icon: "check_circle", value: "100+", label: "Partnership Projects" },
  { icon: "star", value: "98%", label: "Partnership Satisfaction" },
  { icon: "schedule", value: "30+", label: "Years Building Together" },
  { icon: "handshake", value: "70%", label: "Partnership Referrals" },
];

// Service capabilities
const capabilities = [
  {
    icon: "church",
    title: "Religious Facilities",
    description:
      "Partnering with congregations to create churches and community centers with thoughtful design that serves your mission",
  },
  {
    icon: "business",
    title: "Commercial Buildings",
    description:
      "Collaborating on office buildings, retail centers, and government facilities that strengthen community infrastructure",
  },
  {
    icon: "local_hospital",
    title: "Medical Facilities",
    description:
      "Working with healthcare providers to build medical centers and clinics with specialized compliance and community focus",
  },
  {
    icon: "wine_bar",
    title: "Wineries & Vineyards",
    description:
      "Partnering with vintners to create processing facilities and tasting rooms that celebrate Pacific Northwest heritage",
  },
  {
    icon: "factory",
    title: "Light Industrial",
    description:
      "Collaborating on warehouses and processing plants that support regional economic growth",
  },
  {
    icon: "store",
    title: "Tenant Improvements",
    description:
      "Working with businesses to transform commercial spaces that serve community needs",
  },
];

export default function ProjectsPage() {
  const { trackSearchPerformed, trackSearchFilterUsed, trackSearchClear } =
    useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize search from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    const categoryParam = urlParams.get("category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (categoryParam && categoryParam !== "all") {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Update URL when search changes
  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (searchQuery.trim()) {
      urlParams.set("search", searchQuery);
    }
    if (selectedCategory && selectedCategory !== "all") {
      urlParams.set("category", selectedCategory);
    }

    const newUrl = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [searchQuery, selectedCategory]);

  // Get projects based on selected category and search query
  const projects = useMemo(() => {
    let filteredProjects =
      PortfolioService.getProjectsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.subcategory &&
            project.subcategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          project.location.city
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.tags &&
            project.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
    }

    return filteredProjects;
  }, [selectedCategory, searchQuery]);

  // Track search analytics (after projects is defined)
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        trackSearchPerformed(searchQuery, "projects_page", projects.length);
      }, 1000); // Debounce tracking

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, projects.length, trackSearchPerformed]);

  // Track category filter usage
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      trackSearchFilterUsed("category", selectedCategory, searchQuery);
    }
  }, [selectedCategory, searchQuery, trackSearchFilterUsed]);

  // Clear search function with analytics
  const clearSearch = () => {
    trackSearchClear(searchQuery, selectedCategory !== "all");
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const stats = PortfolioService.getPortfolioStats();

  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* Hero Section - v4.0.2 Standards */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content - NO WRAPPER on critical content per v4.0.2 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Veteran Badge */}
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
              <MaterialIcon
                icon="military_tech"
                size="md"
                className="mr-2 sm:mr-3 text-brand-secondary"
              />
              <span className="font-bold text-brand-primary-light text-xs sm:text-sm uppercase tracking-wider">
                Veteran-Owned Excellence
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block mb-2 text-white/90 font-semibold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Partnership Success
              </span>
              <span className="block text-white font-black drop-shadow-lg">
                Stories
              </span>
            </h1>

            {/* Primary Tagline */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-brand-secondary font-bold leading-snug px-2">
              "Building for the Owner, NOT the Dollar"
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              Building Excellence Together Across the Pacific Northwest -
              Explore our comprehensive portfolio showcasing decades of
              collaborative partnerships throughout the Tri-Cities area.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 font-medium text-brand-secondary text-xs sm:text-sm md:text-base">
              <div className="flex items-center">
                <MaterialIcon
                  icon="workspace_premium"
                  size="sm"
                  className="mr-2"
                />
                <span>100+ Projects</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="star" size="sm" className="mr-2" />
                <span>98% Satisfaction</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="handshake" size="sm" className="mr-2" />
                <span>Partnership-Driven</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.projects}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Project Stats */}
      <section
        id="project-stats"
        className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            {/* Section Header - NO SECTION BADGES */}
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Proven Track
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Record
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Numbers that reflect our veteran-owned commitment to excellence
                and lasting partnerships
              </p>
            </div>

            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl">
              {projectStats.map((stat, index) => (
                <HoverScale key={index}>
                  <div className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 to-brand-secondary/5 dark:to-brand-secondary/10 hover:shadow-xl dark:hover:shadow-gray-600/50 p-6 border border-brand-primary/20 dark:border-brand-primary/30 rounded-xl text-center transition-all duration-300">
                    <MaterialIcon
                      icon={stat.icon}
                      size="3xl"
                      className="mb-4 text-brand-primary"
                    />
                    <div className="mb-2 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                      {stat.value}
                    </div>
                    <div className="font-medium text-gray-600 dark:text-gray-300 text-lg">
                      {stat.label}
                    </div>
                  </div>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Veteran-Owned Benefits */}
      <section
        id="veteran-owned"
        className="bg-gradient-to-r from-brand-primary/10 dark:from-brand-primary/20 to-brand-primary/5 dark:to-brand-primary/10 py-12"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="flex md:flex-row flex-col justify-center items-center gap-8 mx-auto max-w-4xl">
              <div className="flex items-center">
                <MaterialIcon
                  icon="military_tech"
                  size="3xl"
                  className="mr-4 text-brand-primary"
                />
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                    Veteran-Owned Excellence
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Veteran-owned since January 2025 with military precision
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MaterialIcon
                  icon="verified"
                  size="3xl"
                  className="mr-4 text-brand-secondary"
                />
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                    Certified & Trusted
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Licensed, bonded, and committed to quality
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Category Filter & Search */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 border-gray-200 border-y dark:border-gray-700">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-8 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h3 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight">
                  Find Your Perfect
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Partnership
                </span>
              </h3>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Discover how we've partnered with clients across different
                project types
              </p>
            </div>

            {/* Search Bar */}
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <MaterialIcon
                  icon="search"
                  size="md"
                  className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2 transform"
                />
                <input
                  type="text"
                  placeholder="Search projects by name, location, type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white dark:bg-gray-700 py-4 pr-4 pl-12 border border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-full text-gray-900 dark:text-white"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="top-1/2 right-4 absolute hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors -translate-y-1/2 transform"
                    aria-label="Clear search"
                  >
                    <MaterialIcon icon="close" size="sm" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={`
                    ${
                      selectedCategory === category.id
                        ? "bg-brand-primary hover:bg-brand-primary-dark text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                    }
                  `}
                >
                  <MaterialIcon
                    icon={category.icon}
                    className="mr-2"
                    size="md"
                  />
                  {category.label}
                </Button>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Projects Grid */}
      <section
        id="portfolio"
        className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  {selectedCategory === "all"
                    ? "Partnership Success"
                    : `${
                        categories.find((c) => c.id === selectedCategory)?.label
                      } Partnership`}
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Stories
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                {projects.length}{" "}
                {projects.length === 1 ? "collaboration" : "collaborations"}{" "}
                showcasing our commitment to working WITH partners
              </p>
            </div>
          </FadeInWhenVisible>

          {projects.length > 0 ? (
            <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:-translate-y-1"
                >
                  <div className="relative bg-gray-200 dark:bg-gray-700 h-64">
                    {project.images[0] ? (
                      <OptimizedImage
                        src={project.images[0].url}
                        alt={project.images[0].alt}
                        fill
                        className="object-cover"
                        priority={project.isFeatured}
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/20 dark:from-brand-primary/30 to-brand-secondary/20 dark:to-brand-secondary/30 w-full h-full">
                        <MaterialIcon
                          icon="image"
                          size="4xl"
                          className="text-brand-accent"
                        />
                      </div>
                    )}
                    {project.isFeatured && (
                      <div className="top-4 right-4 absolute">
                        <span className="inline-flex items-center bg-brand-secondary shadow-lg backdrop-blur-sm px-2 py-1 border-yellow-300 border-l-4 font-semibold text-white text-xs">
                          <MaterialIcon
                            icon="star"
                            size="sm"
                            className="mr-1"
                          />
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="bottom-4 left-4 absolute">
                      <span className="inline-flex items-center bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm px-2 py-1 border-brand-primary/20 border-l-4 font-semibold text-gray-900 dark:text-white text-xs">
                        <MaterialIcon
                          icon="location_on"
                          size="sm"
                          className="mr-1 text-brand-primary"
                        />
                        {project.location.city}, {project.location.state}
                      </span>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-gray-900 dark:text-white text-xl">
                        {project.title}
                      </CardTitle>
                      <span
                        className={`
                        inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold
                        ${
                          project.status === "completed"
                            ? "bg-brand-primary/5 dark:bg-brand-primary-dark/30 text-brand-primary dark:text-brand-primary-light"
                            : "bg-brand-secondary/10 dark:bg-brand-secondary/20 text-brand-secondary dark:text-brand-secondary-light"
                        }
                      `}
                      >
                        {project.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
                      {project.subcategory}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Community Impact Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 px-2 py-1 border-brand-secondary border-l-4 font-medium text-brand-secondary text-xs">
                        <MaterialIcon
                          icon="groups"
                          size="sm"
                          className="mr-1"
                        />
                        Community Partnership
                      </span>
                    </div>

                    {project.details && (
                      <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-400 text-sm">
                        {project.details.squareFootage && (
                          <div className="flex items-center">
                            <MaterialIcon
                              icon="square_foot"
                              size="sm"
                              className="mr-2 text-gray-400"
                            />
                            <span>
                              {project.details.squareFootage.toLocaleString()}{" "}
                              sq ft
                            </span>
                          </div>
                        )}
                        {project.details.duration && (
                          <div className="flex items-center">
                            <MaterialIcon
                              icon="schedule"
                              size="sm"
                              className="mr-2 text-gray-400"
                            />
                            <span>{project.details.duration}</span>
                          </div>
                        )}
                        {project.details.completionDate && (
                          <div className="flex items-center">
                            <MaterialIcon
                              icon="event"
                              size="sm"
                              className="mr-2 text-gray-400"
                            />
                            <span>
                              {project.details.completionDate.toLocaleDateString(
                                "en-US",
                                { year: "numeric", month: "long" },
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.clientTestimonial && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center mb-2">
                          {[...Array(project.clientTestimonial.rating)].map(
                            (_, i) => (
                              <MaterialIcon
                                key={i}
                                icon="star"
                                size="sm"
                                className="text-yellow-500"
                              />
                            ),
                          )}
                        </div>
                        <p className="text-gray-600 text-sm italic line-clamp-2">
                          "{project.clientTestimonial.quote}"
                        </p>
                        <p className="mt-2 text-gray-500 text-xs">
                          - {project.clientTestimonial.clientName}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          ) : (
            <div className="py-12 text-center">
              <MaterialIcon
                icon="search_off"
                size="4xl"
                className="mb-4 text-gray-400"
              />
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl">
                No partnerships found
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {searchQuery
                  ? `No projects match "${searchQuery}". Try adjusting your search or selecting a different category.`
                  : "Try selecting a different category"}
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-6">
                {searchQuery && (
                  <Button
                    onClick={clearSearch}
                    variant="outline"
                    size="lg"
                    className="transition-all duration-300 min-w-[240px]"
                  >
                    <MaterialIcon icon="clear" size="lg" className="mr-3" />
                    <span className="font-medium">Clear Search</span>
                  </Button>
                )}
                <Button
                  onClick={() => {
                    clearSearch();
                    setSelectedCategory("all");
                  }}
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 min-w-[240px]"
                >
                  <MaterialIcon icon="view_list" size="lg" className="mr-3" />
                  <span className="font-medium">View All Projects</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Capabilities Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Our Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Capabilities
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Veteran-owned collaborative expertise across multiple
                construction markets, working WITH you to strengthen Pacific
                Northwest communities
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
                <CardHeader className="flex-shrink-0">
                  <MaterialIcon
                    icon={capability.icon}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow items-start">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Why Choose MH Construction Section - Matching Services Page */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Why Partner With
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  MH Construction
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Your trusted partner for commercial construction excellence in
                the Pacific Northwest
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {[
              {
                iconName: "workspace_premium",
                title: "150+ Years Combined Experience",
                description:
                  "Deep expertise across all construction disciplines, refined through decades of successful partnership projects.",
              },
              {
                iconName: "military_tech",
                title: "Veteran-Owned Excellence",
                description:
                  "Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.",
              },
              {
                iconName: "handshake",
                title: "Community Partnership",
                description:
                  "We're community partners invested in Pacific Northwest success, not just contractors.",
              },
              {
                iconName: "verified",
                title: "Licensed & Insured",
                description:
                  "Fully licensed across WA, OR, and ID with comprehensive insurance coverage for your protection.",
              },
              {
                iconName: "high_quality",
                title: "Quality Assurance",
                description:
                  "Meticulous quality control at every project phase, ensuring work meets our high standards.",
              },
              {
                iconName: "engineering",
                title: "Urgent Construction Support",
                description:
                  "Expert construction consultation and rapid resource deployment for time-critical project needs.",
              },
            ].map((reason, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
                <CardHeader className="flex-shrink-0">
                  <MaterialIcon
                    icon={reason.iconName}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow items-start">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Testimonials
                  </span>
                </h2>

                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Hear how we work WITH our partners, not just for them
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-2">
                {projects
                  .filter((p) => p.clientTestimonial)
                  .slice(0, 4)
                  .map((project, index) => (
                    <Card
                      key={index}
                      className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-shadow"
                    >
                      <CardContent className="flex flex-col p-6 h-full">
                        <div className="flex flex-shrink-0 items-center mb-4">
                          {[...Array(project.clientTestimonial!.rating)].map(
                            (_, i) => (
                              <MaterialIcon
                                key={i}
                                icon="star"
                                size="md"
                                className="text-brand-secondary"
                              />
                            ),
                          )}
                        </div>
                        <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300 italic leading-relaxed">
                          "{project.clientTestimonial!.quote}"
                        </p>
                        <div className="flex-shrink-0 pt-4 border-gray-200 dark:border-gray-600 border-t">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {project.clientTestimonial!.clientName}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {project.title}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partnership Process Section - Matching Services Page */}
      <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Process
                  </span>
                </h2>

                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  From initial consultation to project completion, we work WITH
                  you every step of the way
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Initial Consultation",
                    description:
                      "Understanding your vision and requirements together",
                    icon: "chat",
                  },
                  {
                    step: 2,
                    title: "Site Assessment",
                    description:
                      "Collaborative evaluation of location and project feasibility",
                    icon: "explore",
                  },
                  {
                    step: 3,
                    title: "Master Planning",
                    description:
                      "Working together on detailed planning and timeline development",
                    icon: "event",
                  },
                  {
                    step: 4,
                    title: "Partnership Proposal",
                    description:
                      "Comprehensive project proposal with transparent pricing and collaboration framework",
                    icon: "description",
                  },
                  {
                    step: 5,
                    title: "Build Together",
                    description:
                      "Collaborative execution with regular communication and partnership approach",
                    icon: "handshake",
                  },
                ].map((process, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start min-h-[5rem]">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex justify-center items-center bg-brand-primary rounded-full w-12 h-12 font-bold text-white text-xl">
                            {process.step}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow pr-4">
                              <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl leading-tight">
                                {process.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {process.description}
                              </p>
                            </div>
                            <MaterialIcon
                              icon={process.icon}
                              size="lg"
                              className="flex-shrink-0 ml-4 text-brand-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-primary-dark dark:to-brand-primary py-20 lg:py-32 xl:py-40 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
              <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Ready to Build
                </span>
                <span className="block text-white font-black drop-shadow-lg">
                  Together?
                </span>
              </h2>

              <p className="mb-10 text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                Let's start our partnership and bring your vision to life with
                the same veteran-owned dedication and quality you see in our
                portfolio
              </p>

              {/* CTA Buttons - v4.0.2 Brand Standards */}
              <div className="flex sm:flex-row flex-col justify-center gap-6 mb-10">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="transition-all duration-300 border-2 border-white bg-white text-brand-primary hover:bg-brand-primary hover:text-white hover:border-white min-w-[280px]"
                  >
                    <MaterialIcon icon="phone" size="lg" className="mr-3" />
                    <span className="font-medium">Start Partnership</span>
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-primary hover:border-white min-w-[280px]"
                  >
                    <MaterialIcon icon="build" size="lg" className="mr-3" />
                    <span className="font-medium">View Services</span>
                  </Button>
                </Link>
              </div>
              <div className="space-y-2 text-brand-secondary">
                <p className="text-lg md:text-xl">
                  <MaterialIcon
                    icon="phone"
                    size="md"
                    className="inline mr-2"
                  />
                  (509) 308-6489
                </p>
                <p>
                  <MaterialIcon
                    icon="location_on"
                    size="md"
                    className="inline mr-2"
                  />
                  3111 N. Capital Ave., Pasco, WA 99301
                </p>
                <p>
                  <MaterialIcon
                    icon="email"
                    size="md"
                    className="inline mr-2"
                  />
                  office@mhc-gc.com
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
