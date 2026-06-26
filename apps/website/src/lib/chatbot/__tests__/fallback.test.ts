import { getChatFallbackResponse } from "../fallback";

describe("Chatbot Fallback", () => {
  it("returns the greeting branch for simple hellos", () => {
    const response = getChatFallbackResponse("Hello there");

    expect(response).toContain("What would you like to know?");
  });

  it("does not treat embedded 'hi' text as a greeting", () => {
    const response = getChatFallbackResponse("Tell me something random");

    expect(response).toContain("I can help with MH Construction services");
    expect(response).not.toContain("What would you like to know?");
  });

  it("returns company identity information for 'who are you'", () => {
    const response = getChatFallbackResponse("Who are you?");

    expect(response).toContain("veteran-owned commercial contractor");
    expect(response).toContain("Pasco, Washington");
  });

  it("returns a services answer for punctuation-heavy questions", () => {
    const response = getChatFallbackResponse("What do you do?");

    expect(response).toContain("commercial construction");
    expect(response).toContain("pre-construction planning");
  });

  it("returns trust information for pluralized ratings questions", () => {
    const response = getChatFallbackResponse(
      "What are your ratings and reviews?",
    );

    expect(response).toContain("BBB Accredited");
    expect(response).toContain("A+ rating");
  });

  it("returns trade partner guidance for trade keywords", () => {
    const response = getChatFallbackResponse("I need electrical work done");

    expect(response).toContain("Diamond Electric LLC");
    expect(response).toContain("Trade Partners");
  });

  it("returns drywall trade partner guidance for drywall keywords", () => {
    const response = getChatFallbackResponse(
      "Do you handle drywall finishing?",
    );

    expect(response).toContain("High Desert Drywall");
  });

  it("returns consultation guidance for an unmapped trade like roofing", () => {
    const response = getChatFallbackResponse("Do you do roofing work?");

    expect(response).toContain("project-specific procurement");
    expect(response).toContain("(509) 308-6489");
  });

  it("returns business hours when asked", () => {
    const response = getChatFallbackResponse("What are your business hours?");

    expect(response).toContain("Monday through Friday");
    expect(response).toContain("7:00 AM - 4:00 PM");
  });

  it("matches Spanish service questions with accented characters", () => {
    const response = getChatFallbackResponse("¿Qué servicios ofrecen?", "es");

    expect(response).toContain("MH Construction ofrece construcción comercial");
  });

  it("matches Spanish contact questions with accented characters", () => {
    const response = getChatFallbackResponse("Necesito su teléfono", "es");

    expect(response).toContain("office@mhc-gc.com");
    expect(response).toContain("(509) 308-6489");
  });

  it("matches Spanish business-hours questions", () => {
    const response = getChatFallbackResponse("¿Cuál es su horario?", "es");

    expect(response).toContain("lunes a viernes");
    expect(response).toContain("7:00 AM - 4:00 PM");
  });
});
