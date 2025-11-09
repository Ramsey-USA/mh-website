/**
 * HowTo Schema Generator
 * For construction guides, preparation checklists, etc.
 */

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration
  estimatedCost?: {
    currency: string;
    value: string;
  };
}

export function generateHowToSchema(howTo: HowToSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost,
    step: howTo.steps.map((step, _index) => ({
      "@type": "HowToStep",
      position: _index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
    tool: [
      {
        "@type": "HowToTool",
        name: "AI Estimator Tool",
      },
    ],
  };
}

/**
 * Example: How to Get a Construction Estimate
 */
export const getEstimateHowTo = generateHowToSchema({
  name: "How to Get an AI Construction Estimate",
  description:
    "Get an instant, accurate construction estimate using MH Construction's AI-powered estimator tool",
  totalTime: "PT5M",
  steps: [
    {
      name: "Visit the AI Estimator",
      text: "Navigate to the AI Estimator tool on MH Construction's website",
      url: "https://www.mhc-gc.com/estimator",
    },
    {
      name: "Select Your Project Type",
      text: "Choose from residential, commercial, or government construction projects",
    },
    {
      name: "Enter Project Details",
      text: "Provide information about square footage, materials, and special requirements",
    },
    {
      name: "Get Instant Estimate",
      text: "Receive an AI-powered cost estimate with detailed breakdown",
    },
    {
      name: "Schedule Consultation",
      text: "Book a free consultation to discuss your project with our expert team",
      url: "https://www.mhc-gc.com/booking",
    },
  ],
});
