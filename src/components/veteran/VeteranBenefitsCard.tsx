"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { VeteranBenefit } from "@/lib/recommendations/SmartRecommendationEngine";

interface VeteranBenefitsCardProps {
  benefits: VeteranBenefit[];
  projectTitle: string;
  className?: string;
}

export default function VeteranBenefitsCard({
  benefits,
  projectTitle,
  className = "",
}: VeteranBenefitsCardProps) {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

  if (!benefits.length) return null;

  const totalValue = benefits.reduce((sum, benefit) => {
    const value =
      typeof benefit.value === "string"
        ? parseInt(benefit.value.replace(/\D/g, "")) || 0
        : benefit.value;
    return sum + value;
  }, 0);

  const getIconForType = (type: string) => {
    switch (type) {
      case "grant":
        return (
          <MaterialIcon
            icon="attach_money"
            className="w-4 h-4 text-green-600"
          />
        );
      case "loan":
        return (
          <MaterialIcon icon="schedule" className="w-4 h-4 text-blue-600" />
        );
      case "tax-credit":
        return (
          <MaterialIcon
            icon="description"
            className="w-4 h-4 text-purple-600"
          />
        );
      default:
        return (
          <MaterialIcon icon="security" className="w-4 h-4 text-slate-600" />
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "grant":
        return "bg-green-50 border-green-200 text-green-800";
      case "loan":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "tax-credit":
        return "bg-purple-50 border-purple-200 text-purple-800";
      default:
        return "bg-slate-50 border-slate-200 text-slate-800";
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MaterialIcon icon="security" className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">
            Veteran Benefits Available
          </h3>
        </div>
        {totalValue > 0 && (
          <div className="text-right">
            <div className="text-blue-600 text-sm">Potential Value</div>
            <div className="font-bold text-blue-900 text-lg">
              ${totalValue.toLocaleString()}+
            </div>
          </div>
        )}
      </div>

      <p className="mb-4 text-blue-800 text-sm">
        Special benefits are available for this {projectTitle} project through
        veteran programs.
      </p>

      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div
            key={`${benefit.type}-${index}`}
            className="bg-white border border-blue-100 rounded-md overflow-hidden"
          >
            <div
              className="hover:bg-blue-50 p-4 transition-colors cursor-pointer"
              onClick={() =>
                setExpandedBenefit(
                  expandedBenefit === `${benefit.type}-${index}`
                    ? null
                    : `${benefit.type}-${index}`,
                )
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {getIconForType(benefit.type)}
                  <div>
                    <h4 className="font-medium text-slate-900 capitalize">
                      {benefit.type.replace("-", " ")} Benefit
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded border ${getTypeColor(benefit.type)}`}
                      >
                        {benefit.type.replace("-", " ").toUpperCase()}
                      </span>
                      {benefit.value && (
                        <span className="font-semibold text-green-600 text-sm">
                          {typeof benefit.value === "string"
                            ? benefit.value
                            : `$${benefit.value.toLocaleString()}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      expandedBenefit === `${benefit.type}-${index}`
                        ? "rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {expandedBenefit === `${benefit.type}-${index}` && (
              <div className="bg-blue-25 px-4 pb-4 border-t border-blue-100">
                <div className="space-y-3 mt-3">
                  <p className="text-slate-700 text-sm">
                    {benefit.description}
                  </p>

                  {benefit.eligibility && benefit.eligibility.length > 0 && (
                    <div>
                      <h5 className="mb-2 font-medium text-slate-900 text-sm">
                        Eligibility:
                      </h5>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        {benefit.eligibility?.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2">
                            <span className="mt-1 text-blue-500">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-100 mt-4 p-3 rounded-md">
        <p className="text-blue-800 text-xs">
          <strong>Note:</strong> Benefit eligibility varies by location, project
          type, and individual circumstances. Contact our veteran specialist for
          personalized guidance on available programs.
        </p>
      </div>
    </div>
  );
}
