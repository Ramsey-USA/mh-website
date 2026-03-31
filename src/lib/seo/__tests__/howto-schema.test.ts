import { generateHowToSchema, getEstimateHowTo } from "@/lib/seo/howto-schema";
import type { HowToSchemaProps, HowToStep } from "@/lib/seo/howto-schema";

describe("generateHowToSchema", () => {
  const sampleSteps: HowToStep[] = [
    {
      name: "Step One",
      text: "Do the first thing",
      url: "https://www.mhc-gc.com/step1",
      image: "https://www.mhc-gc.com/images/step1.jpg",
    },
    {
      name: "Step Two",
      text: "Do the second thing",
    },
    {
      name: "Step Three",
      text: "Do the third thing",
    },
  ];

  const sampleHowTo: HowToSchemaProps = {
    name: "How to Plan a Construction Project",
    description:
      "A guide to planning your construction project with MH Construction",
    steps: sampleSteps,
    totalTime: "PT30M",
    estimatedCost: { currency: "USD", value: "500-5000" },
  };

  it("returns @context set to schema.org", () => {
    const schema = generateHowToSchema(sampleHowTo);
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("returns @type set to HowTo", () => {
    const schema = generateHowToSchema(sampleHowTo);
    expect(schema["@type"]).toBe("HowTo");
  });

  it("includes name", () => {
    const schema = generateHowToSchema(sampleHowTo);
    expect(schema.name).toBe("How to Plan a Construction Project");
  });

  it("includes description", () => {
    const schema = generateHowToSchema(sampleHowTo);
    expect(schema.description).toBe(
      "A guide to planning your construction project with MH Construction",
    );
  });

  it("includes totalTime", () => {
    const schema = generateHowToSchema(sampleHowTo);
    expect(schema.totalTime).toBe("PT30M");
  });

  it("totalTime is undefined when not provided", () => {
    const schema = generateHowToSchema({
      name: "Test",
      description: "Test desc",
      steps: sampleSteps,
    });
    expect(schema.totalTime).toBeUndefined();
  });

  it("includes estimatedCost when provided", () => {
    const schema = generateHowToSchema(sampleHowTo);
    expect(schema.estimatedCost).toEqual({
      currency: "USD",
      value: "500-5000",
    });
  });

  it("estimatedCost is undefined when not provided", () => {
    const schema = generateHowToSchema({
      name: "Test",
      description: "Test desc",
      steps: sampleSteps,
    });
    expect(schema.estimatedCost).toBeUndefined();
  });

  describe("step array", () => {
    it("step array has same length as input steps", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step).toHaveLength(sampleSteps.length);
    });

    it("each step has @type HowToStep", () => {
      const schema = generateHowToSchema(sampleHowTo);
      schema.step.forEach((step) => {
        expect(step["@type"]).toBe("HowToStep");
      });
    });

    it("step position starts at 1", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[0]!.position).toBe(1);
      expect(schema.step[1]!.position).toBe(2);
      expect(schema.step[2]!.position).toBe(3);
    });

    it("step name is mapped correctly", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[0]!.name).toBe("Step One");
      expect(schema.step[1]!.name).toBe("Step Two");
    });

    it("step text is mapped correctly", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[0]!.text).toBe("Do the first thing");
    });

    it("step image is included when provided", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[0]!.image).toBe(
        "https://www.mhc-gc.com/images/step1.jpg",
      );
    });

    it("step image is undefined when not provided", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[1]!.image).toBeUndefined();
    });

    it("step url is included when provided", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[0]!.url).toBe("https://www.mhc-gc.com/step1");
    });

    it("step url is undefined when not provided", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.step[1]!.url).toBeUndefined();
    });
  });

  describe("tool", () => {
    it("includes a tool array", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(Array.isArray(schema.tool)).toBe(true);
      expect(schema.tool.length).toBeGreaterThan(0);
    });

    it("tool has HowToTool type entry", () => {
      const schema = generateHowToSchema(sampleHowTo);
      expect(schema.tool[0]!["@type"]).toBe("HowToTool");
      expect(schema.tool[0]!.name).toBe("MH Construction Website");
    });
  });

  it("handles empty steps array", () => {
    const schema = generateHowToSchema({
      name: "Empty",
      description: "No steps",
      steps: [],
    });
    expect(schema.step).toHaveLength(0);
  });
});

describe("getEstimateHowTo", () => {
  it("is a valid HowTo schema object", () => {
    expect(getEstimateHowTo["@context"]).toBe("https://schema.org");
    expect(getEstimateHowTo["@type"]).toBe("HowTo");
  });

  it("has a name", () => {
    expect(typeof getEstimateHowTo.name).toBe("string");
    expect(getEstimateHowTo.name.length).toBeGreaterThan(0);
  });

  it("has a description", () => {
    expect(typeof getEstimateHowTo.description).toBe("string");
    expect(getEstimateHowTo.description.length).toBeGreaterThan(0);
  });

  it("has a totalTime", () => {
    expect(getEstimateHowTo.totalTime).toBeTruthy();
  });

  it("has steps array with at least one step", () => {
    expect(Array.isArray(getEstimateHowTo.step)).toBe(true);
    expect(getEstimateHowTo.step.length).toBeGreaterThan(0);
  });

  it("each step has position, name, and text", () => {
    getEstimateHowTo.step.forEach((step) => {
      expect(typeof step.position).toBe("number");
      expect(typeof step.name).toBe("string");
      expect(typeof step.text).toBe("string");
    });
  });

  it("first step has position 1", () => {
    expect(getEstimateHowTo.step[0]!.position).toBe(1);
  });
});
