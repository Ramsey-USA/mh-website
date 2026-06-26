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
        name: "MH Construction Website",
      },
    ],
  };
}
