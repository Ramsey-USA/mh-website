import { FORM_MANUAL_ICONS } from "@/lib/constants/navigation-icons";

export function getSafetyProofContent(mishProgramLabel: string) {
  return {
    credentials: [
      {
        icon: FORM_MANUAL_ICONS.access,
        title: "OSHA VPP Star Designation",
        body: "The highest level of workplace safety achievement in OSHA's Voluntary Protection Program — earned through demonstrated excellence in hazard prevention, management leadership, and worker involvement.",
        tag: "Elite Federal Recognition",
      },
      {
        icon: "workspace_premium",
        title: "AGC-WA Top EMR Award",
        body: "Multiple consecutive AGC-WA Top EMR Awards from the Associated General Contractors of Washington. This peer-recognized honor reflects sustained, verifiable safety performance across all job sites.",
        tag: "Industry-Recognized",
      },
      {
        icon: "school",
        title: "OSHA 30-Hour Certified Team",
        body: "Our leadership and field supervisors hold OSHA 30-Hour Construction certification — above the basic 10-hour standard. Comprehensive training in hazard recognition, fall protection, electrical safety, and more.",
        tag: "Team Certified",
      },
      {
        icon: FORM_MANUAL_ICONS.source,
        title: "50-Section MISH Safety & Health Program (Safety Manual)",
        body: "MH Construction maintains a comprehensive written safety program (Revision 3.0, effective July 1, 2026) covering all OSHA-required topics. Aligned with 29 CFR 1926, AGC CSEA, WISHA, Oregon OSHA, and Idaho requirements.",
        tag: "Rev 3.0 · July 2026",
      },
    ] as const,
    badges: [
      {
        icon: FORM_MANUAL_ICONS.access,
        title: "OSHA VPP Star",
        subtitle: "Voluntary Protection Program",
        color: "bg-brand-primary",
      },
      {
        icon: "workspace_premium",
        title: "AGC-WA Top EMR",
        subtitle: "Multiple Consecutive Years",
        color: "bg-brand-secondary",
      },
      {
        icon: "school",
        title: "OSHA 30-Hour",
        subtitle: "Team Certified",
        color: "bg-brand-primary-dark",
      },
      {
        icon: "gpp_good",
        title: "WISHA Compliant",
        subtitle: "Washington L&I",
        color: "bg-slate-700",
      },
      {
        icon: "shield",
        title: "0.64 EMR Rating",
        subtitle: "40% Below Industry Avg",
        color: "bg-brand-primary",
      },
      {
        icon: FORM_MANUAL_ICONS.checklist,
        title: "AGC CSEA Aligned",
        subtitle: "Prequalification Ready",
        color: "bg-brand-secondary",
      },
    ] as const,
    commitments: [
      {
        icon: "shield",
        title: "Every Worker Goes Home Safe",
        body: "No project, deadline, or dollar amount is worth a preventable injury. Every decision on every job site is made with that standard first.",
      },
      {
        icon: "groups",
        title: "Personal Accountability",
        body: "Safety isn't enforced top-down. Every team member — superintendent to laborer — owns their environment and looks out for the person next to them.",
      },
      {
        icon: "military_tech",
        title: "Service-Earned Discipline",
        body: "Our veteran-owned leadership emphasizes a simple truth: consistent habits, not sporadic rules, are what keep people safe. That discipline lives on every job site.",
      },
      {
        icon: "visibility",
        title: "Speak Up, Every Time",
        body: "A culture where unsafe conditions are reported — not ignored — is a culture that improves. We have zero tolerance for silence on safety concerns.",
      },
    ] as const,
    habits: [
      { icon: "checklist", label: "Daily toolbox talks before every shift" },
      { icon: "search", label: "Job Hazard Analysis on every new scope" },
      {
        icon: "healing",
        label: "Incident reporting — every event, every time",
      },
      { icon: "build", label: "Equipment inspections before every use" },
      {
        icon: "record_voice_over",
        label: "Weekly superintendent safety reviews",
      },
      { icon: "emoji_events", label: "Peer recognition for safe behavior" },
    ] as const,
    stats: [
      {
        value: "0.64",
        label: "EMR Rating",
        sub: "40% below industry average of 1.0",
        icon: "trending_down",
      },
      {
        value: "AGC-WA",
        label: "Top EMR Award",
        sub: "Multiple consecutive years",
        icon: "workspace_premium",
      },
      {
        value: "15+",
        label: "Years",
        sub: "Building a safety-first culture since 2010",
        icon: "history",
      },
      {
        value: "50",
        label: "Program Sections",
        sub: mishProgramLabel,
        icon: FORM_MANUAL_ICONS.source,
      },
    ] as const,
    compliance: [
      {
        icon: "gpp_good",
        title: "OSHA 29 CFR 1926",
        body: "Full compliance with federal construction safety standards — fall protection, scaffolding, excavation, electrical, personal protective equipment, and all applicable subparts.",
      },
      {
        icon: "account_balance",
        title: "Washington L&I (WISHA)",
        body: "Complete alignment with Washington Industrial Safety & Health Act requirements. Regular L&I audits, certified payroll processes, and prevailing wage compliance on all public sector projects.",
      },
      {
        icon: "eco",
        title: "EPA & Environmental",
        body: "Adherence to EPA regulations governing construction site stormwater, hazardous materials handling, and environmental protection requirements in Washington, Oregon, and Idaho.",
      },
      {
        icon: "payments",
        title: "Prevailing Wage & Certified Payroll",
        body: "Systematic certified payroll processes and prevailing wage compliance protect public projects from violations, fines, and work stoppages — documented and auditable at every phase.",
      },
    ] as const,
  };
}
