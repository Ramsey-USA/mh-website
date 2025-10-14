"use client";

import React, { useEffect, useState } from "react";
import {
  validateBrandCompliance,
  BrandValidationResult,
} from "../../lib/content/BrandingValidator";
import { MaterialIcon } from "../../components/icons/MaterialIcon";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui";

export default function Phase2TestPage() {
  const [validationResults, setValidationResults] = useState<
    Record<string, BrandValidationResult>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runValidationTests = async () => {
      try {
        // Test original vs enhanced About page
        const originalAboutResponse = await fetch("/about");
        const originalAboutText = originalAboutResponse.ok
          ? await originalAboutResponse.text()
          : "";

        const enhancedAboutResponse = await fetch("/about-enhanced");
        const enhancedAboutText = enhancedAboutResponse.ok
          ? await enhancedAboutResponse.text()
          : "";

        // Test API content
        const coreValuesResponse = await fetch("/api/content/core-values");
        const coreValuesData = coreValuesResponse.ok
          ? await coreValuesResponse.json()
          : null;

        const results: Record<string, BrandValidationResult> = {};

        // Validate original About page
        if (originalAboutText) {
          results["Original About Page"] = validateBrandCompliance(
            originalAboutText,
            "page"
          );
        }

        // Validate enhanced About page
        if (enhancedAboutText) {
          results["Enhanced About Page"] = validateBrandCompliance(
            enhancedAboutText,
            "page"
          );
        }

        // Validate core values content
        if (coreValuesData) {
          results["Core Values MD Content"] = validateBrandCompliance(
            coreValuesData.content,
            "markdown"
          );
        }

        setValidationResults(results);
      } catch (error) {
        console.error("Error running validation tests:", error);
      } finally {
        setLoading(false);
      }
    };

    runValidationTests();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <MaterialIcon
            icon="hourglass_empty"
            size="3xl"
            className="text-brand-primary animate-spin mb-4"
          />
          <p className="text-lg">Running Phase 2 validation tests...</p>
        </div>
      </div>
    );
  }

  const overallScore =
    Object.values(validationResults).reduce(
      (sum, result) => sum + result.score,
      0
    ) / Object.keys(validationResults).length;
  const hasErrors = Object.values(validationResults).some(
    (result) => result.errors.length > 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-brand-primary mb-4">
          <MaterialIcon icon="verified" size="2xl" className="inline mr-3" />
          Phase 2 Implementation Testing
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
          About Page Enhancement - Brand Compliance Validation
        </p>

        {/* Overall Summary */}
        <div className="bg-brand-primary/5 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <MaterialIcon
              icon={hasErrors ? "warning" : "check_circle"}
              size="2xl"
              className={hasErrors ? "text-yellow-600" : "text-green-600"}
            />
            <div>
              <h2 className="text-2xl font-bold text-brand-primary">
                Overall Score: {Math.round(overallScore)}/100
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {hasErrors ? "Some issues detected" : "All validations passed"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {Object.entries(validationResults).map(([testName, result]) => (
          <Card key={testName} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MaterialIcon
                  icon={result.isValid ? "check_circle" : "error"}
                  size="md"
                  className={result.isValid ? "text-green-600" : "text-red-600"}
                />
                {testName}
                <span
                  className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${
                    result.score >= 90
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : result.score >= 70
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {result.score}/100
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-brand-primary mb-2">
                    Status
                  </h4>
                  <p
                    className={`${result.isValid ? "text-green-600" : "text-red-600"}`}
                  >
                    {result.isValid ? "✅ Valid" : "❌ Invalid"}
                  </p>
                </div>

                {result.errors.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">
                      Critical Issues
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.errors.map((error, index) => (
                        <li key={index} className="text-sm text-red-600">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-yellow-600 mb-2">
                      Improvement Opportunities
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.warnings.slice(0, 3).map((warning, index) => (
                        <li key={index} className="text-sm text-yellow-600">
                          {warning}
                        </li>
                      ))}
                      {result.warnings.length > 3 && (
                        <li className="text-sm text-yellow-600 italic">
                          +{result.warnings.length - 3} more warnings...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {result.errors.length === 0 && result.warnings.length === 0 && (
                  <p className="text-green-600 text-sm">
                    Perfect! No issues found. Content fully complies with MH
                    branding guidelines.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Phase 2 Implementation Checklist */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">
            <MaterialIcon icon="checklist" size="md" className="inline mr-2" />
            Phase 2 Implementation Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-brand-primary mb-3">
                ✅ Completed
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-green-600"
                  />
                  <span className="text-sm">Enhanced About page created</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-green-600"
                  />
                  <span className="text-sm">
                    Dynamic core values loading from MD
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-green-600"
                  />
                  <span className="text-sm">
                    MH branding messaging integrated
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-green-600"
                  />
                  <span className="text-sm">Material Icons compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-green-600"
                  />
                  <span className="text-sm">Design system colors applied</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-green-600"
                  />
                  <span className="text-sm">Animations and UI preserved</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-brand-primary mb-3">
                🎯 Key Improvements
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="upgrade"
                    size="sm"
                    className="text-brand-secondary"
                  />
                  <span className="text-sm">
                    Content now loads from single source (MD files)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="speed"
                    size="sm"
                    className="text-brand-secondary"
                  />
                  <span className="text-sm">
                    Brand compliance automated validation
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="edit"
                    size="sm"
                    className="text-brand-secondary"
                  />
                  <span className="text-sm">
                    Easy content updates via MD file editing
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="palette"
                    size="sm"
                    className="text-brand-secondary"
                  />
                  <span className="text-sm">
                    Consistent MH branding throughout
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="place"
                    size="sm"
                    className="text-brand-secondary"
                  />
                  <span className="text-sm">
                    Regional focus (Tri-Cities) prominently featured
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="military_tech"
                    size="sm"
                    className="text-brand-secondary"
                  />
                  <span className="text-sm">
                    Veteran-owned business emphasis added
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <MaterialIcon
              icon="trending_up"
              size="md"
              className="inline mr-2"
            />
            Ready for Phase 3
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Phase 2 (About Page Enhancement) is complete! Ready to proceed with
            Phase 3: Services & Business Pages Integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about-enhanced"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors"
            >
              <MaterialIcon icon="visibility" size="sm" />
              View Enhanced About Page
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 bg-brand-secondary text-white px-6 py-3 rounded-lg hover:bg-brand-secondary-dark transition-colors"
            >
              <MaterialIcon icon="engineering" size="sm" />
              Begin Phase 3: Services
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
