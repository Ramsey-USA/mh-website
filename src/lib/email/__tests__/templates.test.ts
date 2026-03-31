/**
 * @jest-environment node
 */

import {
  generateConsultationAcknowledgment,
  generateContactAcknowledgment,
  generateJobApplicationAcknowledgment,
  generateNewsletterAcknowledgment,
} from "../templates";

describe("email templates", () => {
  it("generates job application acknowledgment content with applicant details", () => {
    const result = generateJobApplicationAcknowledgment({
      firstName: "Jane",
      lastName: "Doe",
      position: "Project Manager",
      email: "jane@example.com",
    });

    expect(result.subject).toContain("Project Manager Position");
    expect(result.html).toContain("Dear Jane Doe");
    expect(result.text).toContain("3-5 business days");
  });

  it("generates consultation acknowledgment with scheduled appointment details when present", () => {
    const result = generateConsultationAcknowledgment({
      name: "John Smith",
      projectType: "Commercial Build",
      email: "john@example.com",
      selectedDate: "2026-03-27",
      selectedTime: "10:30 AM",
    });

    expect(result.subject).toContain("Commercial Build");
    expect(result.html).toContain("Your Consultation is Scheduled");
    expect(result.text).toContain("YOUR CONSULTATION IS SCHEDULED");
    expect(result.text).toContain("10:30 AM");
  });

  it("omits appointment block when consultation date/time are missing", () => {
    const result = generateConsultationAcknowledgment({
      name: "John Smith",
      projectType: "Commercial Build",
      email: "john@example.com",
    });

    expect(result.html).not.toContain("Your Consultation is Scheduled");
    expect(result.text).not.toContain("YOUR CONSULTATION IS SCHEDULED");
  });

  it("generates contact acknowledgment with company contact details", () => {
    const result = generateContactAcknowledgment({
      name: "Alex",
      email: "alex@example.com",
      type: "contact",
    });

    expect(result.subject).toContain("We'll Be in Touch Soon");
    expect(result.html).toContain("Thank You for Reaching Out");
    expect(result.text).toContain("(509) 308-6489");
    expect(result.text).toContain("office@mhc-gc.com");
  });

  it("defaults newsletter greeting to Friend when no name is provided", () => {
    const result = generateNewsletterAcknowledgment({
      email: "subscriber@example.com",
    });

    expect(result.subject).toContain("Welcome to MH Construction Newsletter");
    expect(result.html).toContain("Dear Friend");
    expect(result.text).toContain("Dear Friend");
    expect(result.text).toContain("unsubscribe");
  });

  it("uses provided newsletter name when available", () => {
    const result = generateNewsletterAcknowledgment({
      email: "subscriber@example.com",
      name: "Jordan",
    });

    expect(result.html).toContain("Dear Jordan");
    expect(result.text).toContain("Dear Jordan");
    expect(result.html).toContain("https://www.mhc-gc.com/contact");
  });
});
