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
        name: "AI Budget Planning Tool",
      },
    ],
  };
}

/**
 * Example: How to Get a Construction Estimate
 */
export const getEstimateHowTo = generateHowToSchema({
  name: "How to Get an Expert Consultation",
  description:
    "Schedule a free consultation with MH Construction to discuss your project and receive expert guidance",
  totalTime: "PT10M",
  steps: [
    {
      name: "Visit the Contact Page",
      text: "Navigate to the contact page on MH Construction's website",
      url: "https://www.mhc-gc.com/contact",
    },
    {
      name: "Fill Out the Contact Form",
      text: "Provide your name, contact information, and project details",
    },
    {
      name: "Submit Your Request",
      text: "Send the form to request a consultation with our expert team",
    },
    {
      name: "Await Response",
      text: "Our team will contact you within 24 hours to schedule your free consultation",
    },
    {
      name: "Meet for Consultation",
      text: "Discuss your project in person or virtually with our construction experts",
      url: "https://www.mhc-gc.com/contact",
    },
  ],
});
