/**
 * Step 1: Project Basics
 * First step of the estimator form - collects basic project information
 */

import { Input } from "../../ui";
import { type ProjectData, type EstimatorFormProps } from "../types";
import { PROJECT_TYPES, LOCATIONS } from "../constants";

interface ProjectBasicsStepProps extends EstimatorFormProps {
  projectData: ProjectData;
  onDataChange: (field: keyof ProjectData, value: unknown) => void;
}

export function ProjectBasicsStep({
  projectData,
  onDataChange,
  validationStatus,
}: ProjectBasicsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-3 font-medium text-gray-700 text-sm">
          What type of project are you planning?
        </label>
        <div className="gap-3 grid grid-cols-2 md:grid-cols-4">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onDataChange("projectType", type)}
              className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                projectData.projectType === type
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-gray-300 hover:border-brand-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300 text-sm">
          Project Location
        </label>
        <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
          {LOCATIONS.map((location) => (
            <button
              key={location}
              onClick={() => onDataChange("location", location)}
              className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                projectData.location === location
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-gray-300 hover:border-brand-primary"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
          Project Size (square feet) *
        </label>
        <div className="relative">
          <Input
            type="number"
            min="100"
            max="50000"
            placeholder="e.g., 2000"
            value={projectData.size}
            onChange={(e) => onDataChange("size", e.target.value)}
            className={`${
              projectData.size &&
              (parseInt(projectData.size) < 100 ||
                parseInt(projectData.size) > 50000)
                ? "border-red-300 focus:border-red-500"
                : ""
            }`}
          />
          {projectData.size && parseInt(projectData.size) > 0 && (
            <div className="top-1/2 right-3 absolute text-gray-500 text-sm -translate-y-1/2">
              {parseInt(projectData.size).toLocaleString()} sq ft
            </div>
          )}
        </div>
        <div className="mt-1 text-gray-600 text-xs">
          Typical ranges: Custom homes (2,000-5,000 sq ft) • Additions
          (200-1,000 sq ft) • Remodels (100-500 sq ft)
        </div>
        {projectData.size && parseInt(projectData.size) < 100 && (
          <div className="mt-1 text-red-600 text-xs">
            [WARNING] Minimum project size is 100 sq ft
          </div>
        )}
        {projectData.size && parseInt(projectData.size) > 50000 && (
          <div className="mt-1 text-red-600 text-xs">
            [WARNING] For projects over 50,000 sq ft, please contact us directly
          </div>
        )}
      </div>

      <Input
        label="Desired Budget Range"
        placeholder="e.g., $50,000 - $100,000"
        value={projectData.budget}
        onChange={(e) => onDataChange("budget", e.target.value)}
        helperText="Optional: Help us provide more relevant estimates"
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="veteran"
          checked={projectData.isVeteran}
          onChange={(e) => onDataChange("isVeteran", e.target.checked)}
          className="mr-3"
        />
        <label
          htmlFor="veteran"
          className="text-gray-700 dark:text-gray-300 text-sm"
        >
          I am a veteran or military family member (Partnership discount
          applies)
        </label>
      </div>

      {/* Validation Messages */}
      {validationStatus.issues.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm">
            Please complete the following:
            <ul className="mt-2 list-disc list-inside">
              {validationStatus.issues.map((issue, _index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
