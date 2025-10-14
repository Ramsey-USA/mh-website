"use client";

import React from "react";
import { MarkdownContent } from "@/lib/content/markdownLoader";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/DynamicAnimations";

interface CoreValue {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
}

interface ValueRendererProps {
  content: MarkdownContent;
  className?: string;
}

export const ValueRenderer: React.FC<ValueRendererProps> = ({
  content,
  className = "",
}) => {
  // Parse core values from markdown content
  const parseCoreValues = (markdownContent: string): CoreValue[] => {
    const values: CoreValue[] = [];
    const lines = markdownContent.split("\n");
    let currentValue: Partial<CoreValue> | null = null;
    let inPracticesSection = false;

    const iconMap: Record<string, string> = {
      "Honesty & Transparency": "visibility",
      Integrity: "verified_user",
      "Precision & Experience": "precision_manufacturing",
      "Client-First Ethics": "handshake",
      "Professionalism & Control": "settings",
      "Partnership Trust": "shield",
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Look for main value sections (## 🔍 1. format)
      if (line.match(/^## [🔍⚖️🎯🤝🎛️🛡️] \d+\. /)) {
        if (currentValue && currentValue.title) {
          values.push(currentValue as CoreValue);
        }

        const titleMatch = line.match(/^## [🔍⚖️🎯🤝🎛️🛡️] \d+\. (.+)/);
        const title = titleMatch ? titleMatch[1].trim() : "";

        currentValue = {
          title,
          iconName: iconMap[title] || "construction",
          subtitle: "",
          description: "",
          practices: [],
        };
        inPracticesSection = false;
      }

      // Look for subtitles (### format)
      else if (
        line.startsWith("### ") &&
        currentValue &&
        !currentValue.subtitle
      ) {
        currentValue.subtitle = line.replace("### ", "");
      }

      // Look for "What This Means" or main description sections
      else if (line.startsWith("### What") && currentValue) {
        // Next non-empty lines will be description
        let j = i + 1;
        const descriptionLines = [];
        while (
          j < lines.length &&
          !lines[j].trim().startsWith("#") &&
          !lines[j].trim().startsWith("###")
        ) {
          const descLine = lines[j].trim();
          if (
            descLine &&
            !descLine.startsWith("-") &&
            !descLine.startsWith("*")
          ) {
            descriptionLines.push(descLine);
          }
          j++;
          if (descriptionLines.length >= 2) break; // Get first meaningful paragraph
        }
        currentValue.description = descriptionLines.join(" ");
      }

      // Look for practices sections
      else if (line.includes("in Practice") && currentValue) {
        inPracticesSection = true;
      }

      // Collect practices
      else if (inPracticesSection && line.startsWith("- ") && currentValue) {
        const practice = line.replace("- ", "").trim();
        if (practice && currentValue.practices) {
          currentValue.practices.push(practice);
        }
      }

      // Stop collecting practices when we hit a new section
      else if (line.startsWith("---") || line.startsWith("##")) {
        inPracticesSection = false;
      }
    }

    if (currentValue && currentValue.title) {
      values.push(currentValue as CoreValue);
    }

    return values;
  };

  const coreValues = parseCoreValues(content.content);

  return (
    <div className={`values-content ${className}`}>
      {/* Values Grid */}
      <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreValues.map((value, index) => (
          <HoverScale key={index}>
            <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg">
                    <MaterialIcon
                      icon={value.iconName}
                      className="text-brand-primary text-3xl"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {value.title}
                    </CardTitle>
                    <p className="text-sm font-semibold text-brand-secondary">
                      {value.subtitle}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {value.description}
                </p>

                {value.practices.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
                      In Practice
                    </h4>
                    <ul className="space-y-2">
                      {value.practices
                        .slice(0, 4)
                        .map((practice, practiceIndex) => (
                          <li
                            key={practiceIndex}
                            className="flex items-start gap-2"
                          >
                            <MaterialIcon
                              icon="check_circle"
                              className="flex-shrink-0 mt-0.5 text-brand-accent text-sm"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {practice}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </HoverScale>
        ))}
      </StaggeredFadeIn>

      {/* Trust Foundation Section */}
      <FadeInWhenVisible>
        <div className="mt-16 text-center bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-8">
          <MaterialIcon
            icon="shield"
            className="mb-4 text-brand-primary text-6xl"
          />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trust-Centered Philosophy
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            "Trust as our ultimate goal and measurable company foundation"
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            MH Construction operates on a comprehensive 6-principle system that
            evolved from our original values to reflect our growth as a
            construction industry leader. Each value builds toward our ultimate
            goal: <strong className="text-brand-primary">Trust</strong> - the
            culmination of all other values working together.
          </p>
        </div>
      </FadeInWhenVisible>
    </div>
  );
};
