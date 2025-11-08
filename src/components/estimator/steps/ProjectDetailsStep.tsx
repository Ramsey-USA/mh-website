/**
 * Step 2: Project Details & Features
 * Second step of the estimator form - collects detailed project specifications
 */

import { Input } from "../../ui";
import { type ProjectData, type EstimatorFormProps } from "../types";
import {
  MATERIAL_OPTIONS,
  FEATURE_OPTIONS,
  ENHANCED_FEATURES,
} from "../constants";

interface ProjectDetailsStepProps extends EstimatorFormProps {
  projectData: ProjectData;
  onDataChange: (field: keyof ProjectData, value: unknown) => void;
  onArrayToggle: (field: keyof ProjectData, value: string) => void;
}

export function ProjectDetailsStep({
  projectData,
  onDataChange,
  onArrayToggle,
  validationStatus,
}: ProjectDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-3 font-medium text-gray-700 text-sm">
          Material Quality Level
        </label>
        <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
          {MATERIAL_OPTIONS.map((material) => {
            const materialInfo =
              ENHANCED_FEATURES.materialDatabase[
                material as keyof typeof ENHANCED_FEATURES.materialDatabase
              ];
            const isSelected = projectData.materials.includes(material);
            return (
              <button
                key={material}
                onClick={() => onDataChange("materials", [material])}
                className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-brand-primary bg-brand-primary text-white shadow-lg"
                    : "border-gray-300 hover:border-brand-primary hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-center font-semibold">
                  {material}
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      isSelected ? "bg-white/20" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {materialInfo?.multiplier === 1.4 && "+40%"}
                    {materialInfo?.multiplier === 1.2 && "+20%"}
                    {materialInfo?.multiplier === 1.0 && "Base"}
                    {materialInfo?.multiplier === 0.8 && "-20%"}
                  </span>
                </div>
                <div
                  className={`text-sm mt-1 ${
                    isSelected ? "opacity-90" : "opacity-75"
                  }`}
                >
                  {materialInfo?.description}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    isSelected ? "opacity-80" : "opacity-60"
                  }`}
                >
                  Examples: {materialInfo?.examples}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block mb-3 font-medium text-gray-700 text-sm">
          Special Features (select all that apply)
        </label>
        <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
          {FEATURE_OPTIONS.map((feature) => (
            <button
              key={feature}
              onClick={() => onArrayToggle("features", feature)}
              className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                projectData.features.includes(feature)
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-gray-300 hover:border-brand-primary"
              }`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Desired Timeline"
        placeholder="e.g., Start in 3 months"
        value={projectData.timeline}
        onChange={(e) => onDataChange("timeline", e.target.value)}
        helperText="When would you like to start construction?"
      />

      {/* Validation Messages */}
      {validationStatus.issues.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm">
            Please complete the following:
            <ul className="mt-2 list-disc list-inside">
              {validationStatus.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
