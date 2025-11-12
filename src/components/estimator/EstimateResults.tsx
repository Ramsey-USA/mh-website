"use client";

import { Button, Card, CardHeader, CardTitle, CardContent } from "../ui";
import { CostBreakdownChart } from "./CostBreakdownChart";

interface EstimateData {
  totalCost: number;
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    overhead: number;
    contingency: number;
  };
  timeline: string;
  accuracy: number;
  confidenceScore: number;
  confidenceLevel: "low" | "medium" | "high" | "very-high";
  dataQualityFactors: {
    hasSize: boolean;
    hasMaterials: boolean;
    hasFeatures: boolean;
    hasComplexity: boolean;
    hasTimeline: boolean;
    completenessPercentage: number;
  };
  costPerSqFt: number;
  estimateRange: {
    low: number;
    expected: number;
    high: number;
  };
  veteranDiscount?: number;
}

interface ProjectData {
  projectType: string;
  location: string;
  size: string;
  timeline: string;
  budget: string;
  complexity: string;
  materials: string[];
  features: string[];
  isVeteran: boolean;
}

interface EstimateResultsProps {
  estimate: EstimateData;
  projectData: ProjectData;
  onStartOver: () => void;
}

export function EstimateResults({
  estimate,
  projectData,
  onStartOver,
}: EstimateResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalBeforeDiscount = Object.values(estimate.breakdown).reduce(
    (sum, amount) => sum + amount,
    0,
  );

  return (
    <div className="space-y-8 mx-auto max-w-6xl">
      {/* Success Header */}
      <div className="text-center">
        <div className="flex justify-center items-center bg-green-500 mx-auto mb-4 rounded-full w-16 h-16">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="mb-2 font-tactic-bold text-brand-primary text-3xl">
          Your Estimate is Ready!
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Based on current market conditions and typical project parameters,
          here&apos;s your preliminary construction estimate. Please note this
          is for planning purposes only.
        </p>

        {/* Confidence Score Display */}
        <div className="mt-4 mx-auto max-w-md">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Confidence Score:
              </span>
              <span
                className={`font-bold text-lg ${
                  estimate.confidenceLevel === "very-high"
                    ? "text-green-600 dark:text-green-400"
                    : estimate.confidenceLevel === "high"
                      ? "text-blue-600 dark:text-blue-400"
                      : estimate.confidenceLevel === "medium"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-orange-600 dark:text-orange-400"
                }`}
              >
                {estimate.confidenceScore}% (
                {estimate.confidenceLevel.replace("-", " ").toUpperCase()})
              </span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-full h-2">
              <div
                className={`h-2 rounded-full ${
                  estimate.confidenceLevel === "very-high"
                    ? "bg-green-500 dark:bg-green-400"
                    : estimate.confidenceLevel === "high"
                      ? "bg-blue-500 dark:bg-blue-400"
                      : estimate.confidenceLevel === "medium"
                        ? "bg-yellow-500 dark:bg-yellow-400"
                        : "bg-orange-500 dark:bg-orange-400"
                }`}
                style={{ width: `${estimate.confidenceScore}%` }}
              />
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Data completeness:{" "}
              {estimate.dataQualityFactors.completenessPercentage}%
              {estimate.confidenceLevel === "low" &&
                " - Consider providing more details for a more accurate estimate"}
              {estimate.confidenceLevel === "medium" &&
                " - Good foundation, additional details will improve accuracy"}
              {estimate.confidenceLevel === "high" &&
                " - Well-detailed estimate with good accuracy"}
              {estimate.confidenceLevel === "very-high" &&
                " - Comprehensive data provided for highly accurate estimate"}
            </p>
          </div>
        </div>
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
        {/* Main Estimate Card */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Project Estimate
              </CardTitle>
              <div className="text-gray-200">
                {projectData.projectType} • {projectData.size} sq ft
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estimate.veteranDiscount && (
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(totalBeforeDiscount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-yellow-300 text-lg">
                      <span>Veteran Discount (10%):</span>
                      <span>-{formatCurrency(estimate.veteranDiscount)}</span>
                    </div>
                    <hr className="my-2 border-white/30" />
                  </div>
                )}

                <div className="flex justify-between items-center font-tactic-bold text-4xl">
                  <span>Total Cost:</span>
                  <span>{formatCurrency(estimate.totalCost)}</span>
                </div>

                <div className="text-gray-200">
                  <div className="flex justify-between">
                    <span>Cost per sq ft:</span>
                    <span>{formatCurrency(estimate.costPerSqFt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimate Range:</span>
                    <span>
                      {formatCurrency(estimate.estimateRange.low)} -{" "}
                      {formatCurrency(estimate.estimateRange.high)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Timeline:</span>
                    <span>{estimate.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimate Type:</span>
                    <span>Preliminary</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown with Visual Chart */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Visual Cost Breakdown</CardTitle>
              <p className="text-gray-600 text-sm">
                Interactive breakdown of your project costs - hover over
                segments for details
              </p>
            </CardHeader>
            <CardContent>
              <CostBreakdownChart
                breakdown={estimate.breakdown}
                totalCost={totalBeforeDiscount}
              />
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.projectType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.location}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.size} sq ft
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Materials:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.materials[0]}
                  </span>
                </div>
                {projectData.features.length > 0 && (
                  <div>
                    <span className="text-gray-600">Features:</span>
                    <div className="mt-1 ml-2">
                      {projectData.features.map((feature, _index) => (
                        <div
                          key={_index}
                          className="inline-block bg-gray-100 mr-1 mb-1 px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="default" className="w-full">
                  Schedule Free Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  Download PDF Report
                </Button>
                <Button variant="outline" className="w-full">
                  Share Estimate
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onStartOver}
                >
                  Start New Estimate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estimate Transparency */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">
                About This Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 text-sm">
                This AI-generated estimate is based on current market data and
                typical project parameters. Actual costs may vary based on site
                conditions, material selections, permits, and other
                project-specific factors. This estimate serves as a helpful
                starting point for budget planning.
              </p>
            </CardContent>
          </Card>

          {/* Military Support */}
          {projectData.isVeteran && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  [MILITARY_TECH] Thank You for Your Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-blue-700 text-sm">
                  As a veteran-owned company, we&apos;re honored to serve those
                  who served. Your 10% discount has been applied.
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Learn About Our Veteran Services
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Timeline Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                phase: "Planning & Permits",
                duration: "2-4 weeks",
                description: "Design finalization, permit acquisition",
              },
              {
                phase: "Site Preparation",
                duration: "1-2 weeks",
                description: "Excavation, utilities, foundation",
              },
              {
                phase: "Construction",
                duration: "80% of timeline",
                description: "Main construction work",
              },
              {
                phase: "Finishing & Inspection",
                duration: "2-3 weeks",
                description: "Final details, inspections, walkthrough",
              },
            ].map((phase, _index) => (
              <div
                key={_index}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center"
              >
                <div className="flex justify-center items-center bg-brand-primary mx-auto mb-2 rounded-full w-8 h-8 font-bold text-white text-sm">
                  {_index + 1}
                </div>
                <h4 className="mb-1 font-semibold text-brand-primary dark:text-brand-primary-light">
                  {phase.phase}
                </h4>
                <div className="mb-2 text-gray-600 dark:text-gray-400 text-sm">
                  {phase.duration}
                </div>
                <div className="text-gray-500 dark:text-gray-500 text-xs">
                  {phase.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Disclaimer */}
      <div className="mx-auto max-w-4xl text-gray-500 text-xs text-center">
        <p className="mb-2 font-semibold">
          Important: This is a Preliminary Estimate
        </p>
        <p>
          This AI-generated estimate is provided for initial budget planning
          purposes only and should not be considered a formal quote or
          guarantee. Actual construction costs can vary significantly based on
          site conditions, material selections, labor availability, permit
          requirements, and market fluctuations. Final pricing will be
          determined through a detailed on-site consultation and formal bidding
          process. This estimate is valid for 30 days and is subject to change
          without notice.
        </p>
      </div>
    </div>
  );
}
