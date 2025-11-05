"use client";

import { type FC } from "react";
import ReactMarkdown from "react-markdown";
import { ContentItem } from "@/lib/content/contentCache";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface ServiceRendererProps {
  content: ContentItem;
  className?: string;
}

export const ServiceRenderer: FC<ServiceRendererProps> = ({
  content,
  className = "",
}) => {
  // Parse services from markdown content
  const parseServices = (markdownContent: string) => {
    const services: Array<{
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      benefits: string[];
    }> = [];

    const lines = markdownContent.split("\n");
    let currentService: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      benefits: string[];
    } | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Look for service sections (### format)
      if (line.startsWith("### ") && line.includes("**")) {
        if (currentService) {
          services.push(currentService);
        }

        const titleMatch = line.match(/### \d+\. \*\*(.+?)\*\*/);
        const title = titleMatch
          ? titleMatch[1]
          : line.replace(/### \d+\. \*\*|\*\*/g, "");

        currentService = {
          title,
          subtitle: "",
          description: "",
          features: [],
          benefits: [],
        };
      }

      // Look for subtitles (#### format)
      else if (line.startsWith("#### ") && currentService) {
        currentService.subtitle = line.replace(/#### /, "");
      }

      // Look for description paragraphs
      else if (
        line &&
        !line.startsWith("#") &&
        !line.startsWith("-") &&
        !line.startsWith("*") &&
        currentService &&
        !currentService.description
      ) {
        currentService.description = line;
      }

      // Look for feature lists
      else if (line.startsWith("- **") && currentService) {
        const feature = line.replace(/- \*\*(.+?)\*\*.*/, "$1");
        currentService.features.push(feature);
      }
    }

    if (currentService) {
      services.push(currentService);
    }

    return services;
  };

  const services = parseServices(content.content);

  return (
    <div className={`services-content ${className}`}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {content.title}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Expert Construction Management in the Pacific Northwest
        </p>
        <p className="text-lg text-neutral-500 dark:text-neutral-500 mt-2">
          <strong>Tri-Cities Headquarters:</strong> Pasco, WA |{" "}
          <strong>Service Area:</strong> Washington, Oregon, Idaho
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => (
          <Card
            key={index}
            className="h-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MaterialIcon
                    icon={getServiceIcon(service.title)}
                    size="lg"
                    className="text-primary"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-primary mb-2">
                    {service.title}
                  </CardTitle>
                  {service.subtitle && (
                    <p className="text-sm font-semibold text-secondary mb-3">
                      {service.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                {service.description}
              </p>

              {service.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Key Services:
                  </h4>
                  <ul className="space-y-1">
                    {service.features
                      .slice(0, 5)
                      .map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-primary flex-shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-primary/5 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">
          Ready to Start Your Project?
        </h3>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          Call (509) 308-6489 today to take the first step toward your new
          building construction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+15093086489"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <MaterialIcon icon="phone" size="sm" />
            Call (509) 308-6489
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors"
          >
            <MaterialIcon icon="email" size="sm" />
            Contact Us Online
          </a>
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate icons for different service types
function getServiceIcon(serviceTitle: string): string {
  const title = serviceTitle.toLowerCase();

  if (title.includes("construction") || title.includes("management")) {
    return "engineering";
  } else if (title.includes("planning") || title.includes("master")) {
    return "architecture";
  } else if (title.includes("procurement") || title.includes("vendor")) {
    return "inventory";
  } else if (title.includes("budget") || title.includes("feasibility")) {
    return "fact_check";
  } else {
    return "construction";
  }
}
