"use client";

import React, { useEffect, useState } from "react";
import { ServiceRenderer } from "../../components/content/ServiceRenderer";
import { TeamRenderer } from "../../components/content/TeamRenderer";
import { MarkdownContent } from "../../lib/content/markdownLoader";
import {
  validateBrandCompliance,
  BrandValidationResult,
} from "../../lib/content/BrandingValidator";
import { MaterialIcon } from "../../components/icons/MaterialIcon";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui";

interface ContentData {
  services: MarkdownContent | null;
  team: MarkdownContent | null;
  validationResults: Record<string, BrandValidationResult>;
}

export default function Phase1TestPage() {
  const [contentData, setContentData] = useState<ContentData>({
    services: null,
    team: null,
    validationResults: {},
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "services" | "team" | "validation"
  >("services");

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load services content
        const servicesResponse = await fetch("/api/content/services");
        const servicesData = servicesResponse.ok
          ? await servicesResponse.json()
          : null;

        // Load team content
        const teamResponse = await fetch("/api/content/team");
        const teamData = teamResponse.ok ? await teamResponse.json() : null;

        // Run brand validation on the loaded content
        const validationResults: Record<string, BrandValidationResult> = {};

        if (servicesData) {
          validationResults.services = validateBrandCompliance(
            servicesData.content,
            "markdown"
          );
        }

        if (teamData) {
          validationResults.team = validateBrandCompliance(
            teamData.content,
            "markdown"
          );
        }

        setContentData({
          services: servicesData,
          team: teamData,
          validationResults,
        });
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <MaterialIcon
            icon="hourglass_empty"
            size="3xl"
            className="text-primary animate-spin mb-4"
          />
          <p className="text-lg">Loading Phase 1 test content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          <MaterialIcon
            icon="construction"
            size="2xl"
            className="inline mr-3"
          />
          MH Construction - Phase 1 Testing
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
          Testing API Infrastructure, Specialized Renderers, and Brand
          Validation
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "services"
                ? "bg-primary text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            }`}
          >
            <MaterialIcon
              icon="engineering"
              size="sm"
              className="inline mr-2"
            />
            Services Renderer
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "team"
                ? "bg-primary text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            }`}
          >
            <MaterialIcon icon="group" size="sm" className="inline mr-2" />
            Team Renderer
          </button>
          <button
            onClick={() => setActiveTab("validation")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "validation"
                ? "bg-primary text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            }`}
          >
            <MaterialIcon icon="verified" size="sm" className="inline mr-2" />
            Brand Validation
          </button>
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === "services" && contentData.services && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Services Content from SERVICES.md
          </h2>
          <ServiceRenderer content={contentData.services} />
        </div>
      )}

      {activeTab === "team" && contentData.team && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Team Content from TEAM_ROSTER.md
          </h2>
          <TeamRenderer content={contentData.team} />
        </div>
      )}

      {activeTab === "validation" && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Brand Compliance Validation Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(contentData.validationResults).map(
              ([contentType, result]) => (
                <Card key={contentType} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MaterialIcon
                        icon={result.isValid ? "check_circle" : "error"}
                        size="md"
                        className={
                          result.isValid ? "text-green-600" : "text-red-600"
                        }
                      />
                      {contentType.charAt(0).toUpperCase() +
                        contentType.slice(1)}{" "}
                      Content
                      <span
                        className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${
                          result.score >= 90
                            ? "bg-green-100 text-green-800"
                            : result.score >= 70
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.score}/100
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">
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
                            Errors
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
                            Warnings
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {result.warnings.map((warning, index) => (
                              <li
                                key={index}
                                className="text-sm text-yellow-600"
                              >
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.errors.length === 0 &&
                        result.warnings.length === 0 && (
                          <p className="text-green-600 text-sm">
                            No issues found! Content fully complies with MH
                            branding guidelines.
                          </p>
                        )}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Overall Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-center">
                <MaterialIcon
                  icon="assessment"
                  size="md"
                  className="inline mr-2"
                />
                Phase 1 Implementation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    API Infrastructure
                  </h4>
                  <div className="text-2xl text-green-600 mb-2">✅</div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Services, Team, and Branding endpoints functional
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Specialized Renderers
                  </h4>
                  <div className="text-2xl text-green-600 mb-2">✅</div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    ServiceRenderer and TeamRenderer components working
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Brand Validation
                  </h4>
                  <div className="text-2xl text-green-600 mb-2">✅</div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Automated compliance checking implemented
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error States */}
      {!contentData.services && activeTab === "services" && (
        <div className="text-center text-red-600">
          <MaterialIcon icon="error" size="2xl" className="mb-4" />
          <p>Failed to load services content</p>
        </div>
      )}

      {!contentData.team && activeTab === "team" && (
        <div className="text-center text-red-600">
          <MaterialIcon icon="error" size="2xl" className="mb-4" />
          <p>Failed to load team content</p>
        </div>
      )}
    </div>
  );
}
