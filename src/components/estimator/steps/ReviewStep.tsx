/**
 * Step 3: Review & Calculate
 * Final step of the estimator form - shows summary and handles calculation
 */

import { Button } from "../../ui";
import { type ProjectData, type ValidationStatus } from "../types";

interface ReviewStepProps {
  projectData: ProjectData;
  isCalculating: boolean;
  onCalculateEstimate: () => void;
  validationStatus: ValidationStatus;
}

export function ReviewStep({
  projectData,
  isCalculating,
  onCalculateEstimate,
  validationStatus,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-lg">Project Summary</h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <span className="text-gray-600">Project Type:</span>
            <span className="ml-2 font-semibold">
              {projectData.projectType}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Location:</span>
            <span className="ml-2 font-semibold">{projectData.location}</span>
          </div>
          <div>
            <span className="text-gray-600">Size:</span>
            <span className="ml-2 font-semibold">{projectData.size} sq ft</span>
          </div>
          <div>
            <span className="text-gray-600">Material Quality:</span>
            <span className="ml-2 font-semibold">
              {projectData.materials[0]}
            </span>
          </div>
          {projectData.features.length > 0 && (
            <div className="md:col-span-2">
              <span className="text-gray-600">Special Features:</span>
              <span className="ml-2 font-semibold">
                {projectData.features.join(", ")}
              </span>
            </div>
          )}
          {projectData.budget && (
            <div className="md:col-span-2">
              <span className="text-gray-600">Budget Range:</span>
              <span className="ml-2 font-semibold">{projectData.budget}</span>
            </div>
          )}
          {projectData.timeline && (
            <div className="md:col-span-2">
              <span className="text-gray-600">Timeline:</span>
              <span className="ml-2 font-semibold">{projectData.timeline}</span>
            </div>
          )}
          {projectData.isVeteran && (
            <div className="md:col-span-2">
              <span className="text-green-600">
                ✓ Veteran Discount Applied (10%)
              </span>
            </div>
          )}
        </div>
      </div>

      {isCalculating ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 border-b-2 border-brand-primary rounded-full w-12 h-12 animate-spin"></div>
          <p className="font-semibold text-lg">Analyzing Your Project...</p>
          <p className="text-gray-600">
            Our AI is generating a preliminary estimate based on your project
            details
          </p>
        </div>
      ) : (
        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={onCalculateEstimate}
          disabled={!validationStatus.canProceed}
        >
          Calculate My Estimate
        </Button>
      )}

      {/* Validation Messages */}
      {validationStatus.issues.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm">
            Please complete the following:
            <ul className="mt-2 list-disc list-inside">
              {validationStatus.issues.map((issue, _index) => (
                <li key={_index}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
