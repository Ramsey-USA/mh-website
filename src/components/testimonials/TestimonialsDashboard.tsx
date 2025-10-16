"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  ClientTestimonial,
  TestimonialStatus,
  mockTestimonials,
  getReviewStats,
} from "@/lib/types/testimonials";
import { formatDate } from "@/lib/utils/dateUtils";

type SortOption = "newest" | "oldest" | "rating" | "status";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  featured: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusIcons = {
  pending: "info",
  approved: "check",
  rejected: "close",
  featured: "emoji_events",
};

export default function TestimonialsDashboard() {
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TestimonialStatus | "all">(
    "all",
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Get review statistics
  const reviewStats = getReviewStats(mockTestimonials);

  // Status statistics
  const statusStats = {
    pending: mockTestimonials.filter((t) => t.status === "pending").length,
    approved: mockTestimonials.filter((t) => t.status === "approved").length,
    rejected: mockTestimonials.filter((t) => t.status === "rejected").length,
    featured: mockTestimonials.filter((t) => t.status === "featured").length,
  };

  // Filter and sort testimonials
  const filteredTestimonials = useMemo(() => {
    const filtered = mockTestimonials.filter((testimonial) => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        if (
          !testimonial.clientName.toLowerCase().includes(search) &&
          !testimonial.projectTitle.toLowerCase().includes(search) &&
          !testimonial.testimonialText.toLowerCase().includes(search) &&
          !testimonial.clientLocation.toLowerCase().includes(search) &&
          !testimonial.tags.some((tag) => tag.toLowerCase().includes(search))
        ) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== "all" && testimonial.status !== statusFilter) {
        return false;
      }

      return true;
    });

    // Sort testimonials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.submissionDate).getTime() -
            new Date(a.submissionDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.submissionDate).getTime() -
            new Date(b.submissionDate).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "status":
          const statusOrder = {
            pending: 0,
            featured: 1,
            approved: 2,
            rejected: 3,
          };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedTestimonials.length === filteredTestimonials.length) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(filteredTestimonials.map((t) => t.id));
    }
  };

  const handleSelectTestimonial = (id: string) => {
    setSelectedTestimonials((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (
    action: "approve" | "reject" | "feature" | "delete",
  ) => {
    // In a real app, this would make API calls
    console.log(
      `Bulk ${action} action for testimonials:`,
      selectedTestimonials,
    );
    setSelectedTestimonials([]);
  };

  const handleStatusChange = (
    testimonialId: string,
    newStatus: TestimonialStatus,
  ) => {
    // In a real app, this would make an API call
    console.log(`Changing testimonial ${testimonialId} status to ${newStatus}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto px-4 py-6 max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-gray-900 text-3xl">
                Testimonials Dashboard
              </h1>
              <p className="mt-1 text-gray-600">
                Manage client testimonials and reviews
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Statistics Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Total Reviews</p>
                <p className="font-bold text-gray-900 text-3xl">
                  {reviewStats.totalReviews}
                </p>
              </div>
              <MaterialIcon icon="chat" className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-4 text-green-600 text-sm">
              <MaterialIcon icon="trending_up" className="mr-1 w-4 h-4" />
              <span>+{reviewStats.recentReviews} this month</span>
            </div>
          </div>

          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 text-3xl">
                    {reviewStats.averageRating}
                  </p>
                  <MaterialIcon
                    icon="star"
                    className="fill-yellow-400 w-6 h-6 text-yellow-400"
                  />
                </div>
              </div>
              <MaterialIcon
                icon="emoji_events"
                className="w-8 h-8 text-yellow-500"
              />
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              Based on {reviewStats.totalReviews} reviews
            </div>
          </div>

          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Pending Review</p>
                <p className="font-bold text-yellow-600 text-3xl">
                  {statusStats.pending}
                </p>
              </div>
              <MaterialIcon icon="info" className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-yellow-600 text-sm">Need approval</div>
          </div>

          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Featured</p>
                <p className="font-bold text-blue-600 text-3xl">
                  {statusStats.featured}
                </p>
              </div>
              <MaterialIcon
                icon="emoji_events"
                className="w-8 h-8 text-blue-500"
              />
            </div>
            <div className="mt-4 text-blue-600 text-sm">
              Highlighted reviews
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow-sm mb-6 p-6 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">
              Filter & Search
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <MaterialIcon icon="filter_alt" className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? (
                <MaterialIcon icon="expand_less" className="w-4 h-4" />
              ) : (
                <MaterialIcon icon="expand_more" className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <MaterialIcon
              icon="search"
              className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform"
            />
            <input
              type="text"
              placeholder="Search testimonials by client, project, content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-3 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {showFilters && (
            <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
              {/* Status Filter */}
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as TestimonialStatus | "all")
                  }
                  className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="featured">Featured</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="status">By Status</option>
                </select>
              </div>

              {/* View Mode */}
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  View Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Grid
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setSortBy("newest");
                  }}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg w-full font-medium text-gray-700 text-sm transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedTestimonials.length > 0 && (
          <div className="bg-blue-50 mb-6 p-4 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="font-medium text-blue-900 text-sm">
                  {selectedTestimonials.length} testimonial
                  {selectedTestimonials.length > 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkAction("approve")}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction("feature")}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm transition-colors"
                >
                  Feature
                </button>
                <button
                  onClick={() => handleBulkAction("reject")}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredTestimonials.length} of {mockTestimonials.length}{" "}
            testimonials
          </p>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <input
                type="checkbox"
                checked={
                  selectedTestimonials.length === filteredTestimonials.length &&
                  filteredTestimonials.length > 0
                }
                onChange={handleSelectAll}
                className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
              />
              Select All
            </label>
          </div>
        </div>

        {/* Testimonials List/Grid */}
        {viewMode === "list" ? (
          <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={
                          selectedTestimonials.length ===
                            filteredTestimonials.length &&
                          filteredTestimonials.length > 0
                        }
                        onChange={handleSelectAll}
                        className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                      />
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                      Client & Project
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTestimonials.map((testimonial) => (
                    <TestimonialRow
                      key={testimonial.id}
                      testimonial={testimonial}
                      selected={selectedTestimonials.includes(testimonial.id)}
                      onSelect={() => handleSelectTestimonial(testimonial.id)}
                      onStatusChange={(status) =>
                        handleStatusChange(testimonial.id, status)
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                selected={selectedTestimonials.includes(testimonial.id)}
                onSelect={() => handleSelectTestimonial(testimonial.id)}
                onStatusChange={(status) =>
                  handleStatusChange(testimonial.id, status)
                }
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <div className="py-12 text-center">
            <MaterialIcon
              icon="chat"
              className="mx-auto mb-4 w-16 h-16 text-gray-300"
            />
            <h3 className="mb-2 font-semibold text-gray-900 text-lg">
              No testimonials found
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters or search terms."
                : "No testimonials have been submitted yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TestimonialRow({
  testimonial,
  selected,
  onSelect,
  onStatusChange,
}: {
  testimonial: ClientTestimonial;
  selected: boolean;
  onSelect: () => void;
  onStatusChange: (status: TestimonialStatus) => void;
}) {
  const statusIconName = statusIcons[testimonial.status];

  return (
    <tr className={`hover:bg-gray-50 ${selected ? "bg-blue-50" : ""}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-start gap-3">
          {testimonial.images?.client && (
            <div className="relative flex-shrink-0 rounded-full w-10 h-10 overflow-hidden">
              <Image
                src={testimonial.images.client}
                alt={testimonial.clientName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900">
              {testimonial.clientName}
            </div>
            <div className="text-gray-600 text-sm truncate">
              {testimonial.projectTitle}
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
              <MaterialIcon icon="location_on" className="w-3 h-3" />
              <span>{testimonial.clientLocation}</span>
              <span>•</span>
              <span className="capitalize">{testimonial.projectType}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <MaterialIcon
              key={i}
              icon="star"
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-gray-600 text-sm">
            ({testimonial.rating})
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[testimonial.status]}`}
        >
          <MaterialIcon icon={statusIconName} className="w-3 h-3" />
          <span className="capitalize">{testimonial.status}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">
        <div className="flex items-center gap-1">
          <MaterialIcon icon="event" className="w-3 h-3" />
          <span>{formatDate(testimonial.submissionDate)}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            className="p-1 text-blue-600 hover:text-blue-700"
            title="View Details"
          >
            <MaterialIcon icon="visibility" className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-gray-600 hover:text-gray-700"
            title="Edit"
          >
            <MaterialIcon icon="edit" className="w-4 h-4" />
          </button>
          <select
            value={testimonial.status}
            onChange={(e) =>
              onStatusChange(e.target.value as TestimonialStatus)
            }
            className="px-2 py-1 border border-gray-300 focus:border-transparent rounded focus:ring-1 focus:ring-blue-500 text-xs"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="featured">Featured</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </td>
    </tr>
  );
}

function TestimonialCard({
  testimonial,
  selected,
  onSelect,
  onStatusChange,
}: {
  testimonial: ClientTestimonial;
  selected: boolean;
  onSelect: () => void;
  onStatusChange: (status: TestimonialStatus) => void;
}) {
  const statusIconName = statusIcons[testimonial.status];

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-6 ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
          />
          {testimonial.images?.client && (
            <div className="relative rounded-full w-10 h-10 overflow-hidden">
              <Image
                src={testimonial.images.client}
                alt={testimonial.clientName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">
              {testimonial.clientName}
            </div>
            <div className="text-gray-600 text-sm">
              {testimonial.clientLocation}
            </div>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[testimonial.status]}`}
        >
          <MaterialIcon icon={statusIconName} className="w-3 h-3" />
          <span className="capitalize">{testimonial.status}</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="mb-4">
        <h3 className="mb-2 font-semibold text-gray-900">
          {testimonial.projectTitle}
        </h3>
        <div className="flex items-center gap-4 mb-2 text-gray-600 text-sm">
          <span className="capitalize">{testimonial.projectType}</span>
          <span>•</span>
          <span>{formatDate(testimonial.completionDate)}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <MaterialIcon
              key={i}
              icon="star"
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-gray-600 text-sm">
            ({testimonial.rating})
          </span>
        </div>
      </div>

      {/* Testimonial Text */}
      <blockquote className="mb-4 text-gray-700 text-sm italic line-clamp-3">
        &quot;{testimonial.testimonialText}&quot;
      </blockquote>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            className="p-1 text-blue-600 hover:text-blue-700"
            title="View Details"
          >
            <MaterialIcon icon="visibility" className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-gray-600 hover:text-gray-700"
            title="Edit"
          >
            <MaterialIcon icon="edit" className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-red-600 hover:text-red-700"
            title="Delete"
          >
            <MaterialIcon icon="delete" className="w-4 h-4" />
          </button>
        </div>
        <select
          value={testimonial.status}
          onChange={(e) => onStatusChange(e.target.value as TestimonialStatus)}
          className="px-2 py-1 border border-gray-300 focus:border-transparent rounded focus:ring-1 focus:ring-blue-500 text-xs"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="featured">Featured</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}
