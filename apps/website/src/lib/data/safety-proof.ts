import { FORM_MANUAL_ICONS } from "@/lib/constants/navigation-icons";

export interface SafetyProofTranslations {
  credentials: {
    items: {
      oshaVpp: { title: string; body: string; tag: string };
      agcWa: { title: string; body: string; tag: string };
      osha30: { title: string; body: string; tag: string };
      deanGold: { title: string; body: string; tag: string };
      program: { title: string; body: string; tag: string };
    };
  };
  badges: {
    items: {
      oshaVpp: { title: string; subtitle: string };
      agcWa: { title: string; subtitle: string };
      osha30: { title: string; subtitle: string };
      wisha: { title: string; subtitle: string };
      emr: { title: string; subtitle: string };
      csea: { title: string; subtitle: string };
      deanGold: { title: string; subtitle: string };
    };
  };
  program: {
    commitments: {
      safeHome: { title: string; body: string };
      accountability: { title: string; body: string };
      discipline: { title: string; body: string };
      speakUp: { title: string; body: string };
    };
  };
  performance: {
    stats: {
      emr: { label: string; sub: string };
      agcWa: { label: string; sub: string };
      years: { label: string; sub: string };
      sections: { label: string };
    };
  };
  evidence: {
    habits: {
      toolbox: string;
      jha: string;
      incident: string;
      equipment: string;
      review: string;
      peer: string;
    };
  };
  compliance: {
    items: {
      osha: { title: string; body: string };
      wisha: { title: string; body: string };
      epa: { title: string; body: string };
      payroll: { title: string; body: string };
    };
  };
}

export function getSafetyProofContent(
  mishProgramLabel: string,
  tx?: SafetyProofTranslations,
) {
  return {
    credentials: [
      {
        icon: FORM_MANUAL_ICONS.access,
        title:
          tx?.credentials.items.oshaVpp.title ?? "OSHA VPP Star Designation",
        body:
          tx?.credentials.items.oshaVpp.body ??
          "The highest level of workplace safety achievement in OSHA\u2019s Voluntary Protection Program \u2014 earned through demonstrated excellence in hazard prevention, management leadership, and worker involvement.",
        tag: tx?.credentials.items.oshaVpp.tag ?? "Elite Federal Recognition",
      },
      {
        icon: "workspace_premium",
        title: tx?.credentials.items.agcWa.title ?? "AGC-WA Top EMR Award",
        body:
          tx?.credentials.items.agcWa.body ??
          "Multiple consecutive AGC-WA Top EMR Awards from the Associated General Contractors of Washington. This peer-recognized honor reflects sustained, verifiable safety performance across all job sites.",
        tag: tx?.credentials.items.agcWa.tag ?? "Industry-Recognized",
      },
      {
        icon: "school",
        title:
          tx?.credentials.items.osha30.title ?? "OSHA 30-Hour Certified Team",
        body:
          tx?.credentials.items.osha30.body ??
          "Our leadership and field supervisors hold OSHA 30-Hour Construction certification \u2014 above the basic 10-hour standard. Comprehensive training in hazard recognition, fall protection, electrical safety, and more.",
        tag: tx?.credentials.items.osha30.tag ?? "Team Certified",
      },
      {
        icon: "workspace_premium",
        title: tx?.credentials.items.deanGold.title ?? "Dean Gold Standard",
        body:
          tx?.credentials.items.deanGold.body ??
          "Our MISH authoring uses the Dean Gold Standard execution model: Policy defines required outcomes, Procedure defines ownership and trigger cadence, and Task defines measurable field actions with auditable evidence.",
        tag:
          tx?.credentials.items.deanGold.tag ?? "Policy -> Procedure -> Task",
      },
      {
        icon: FORM_MANUAL_ICONS.source,
        title:
          tx?.credentials.items.program.title ??
          "59-Section MISH Safety & Health Program (Safety Manual)",
        body:
          tx?.credentials.items.program.body ??
          "MH Construction maintains a comprehensive written safety program (Revision 3.0, effective July 1, 2026) covering all OSHA-required topics. Aligned with 29 CFR 1926, AGC CSEA, WISHA, Oregon OSHA, and Idaho requirements.",
        tag: tx?.credentials.items.program.tag ?? "Rev 3.0 \u00b7 July 2026",
      },
    ],
    badges: [
      {
        icon: FORM_MANUAL_ICONS.access,
        title: tx?.badges.items.oshaVpp.title ?? "OSHA VPP Star",
        subtitle:
          tx?.badges.items.oshaVpp.subtitle ?? "Voluntary Protection Program",
        color: "bg-brand-primary",
      },
      {
        icon: "workspace_premium",
        title: tx?.badges.items.agcWa.title ?? "AGC-WA Top EMR",
        subtitle:
          tx?.badges.items.agcWa.subtitle ?? "Multiple Consecutive Years",
        color: "bg-brand-secondary",
      },
      {
        icon: "school",
        title: tx?.badges.items.osha30.title ?? "OSHA 30-Hour",
        subtitle: tx?.badges.items.osha30.subtitle ?? "Team Certified",
        color: "bg-brand-primary-dark",
      },
      {
        icon: "gpp_good",
        title: tx?.badges.items.wisha.title ?? "WISHA Compliant",
        subtitle: tx?.badges.items.wisha.subtitle ?? "Washington L&I",
        color: "bg-slate-700",
      },
      {
        icon: "shield",
        title: tx?.badges.items.emr.title ?? "0.64 EMR Rating",
        subtitle: tx?.badges.items.emr.subtitle ?? "40% Below Industry Avg",
        color: "bg-brand-primary",
      },
      {
        icon: FORM_MANUAL_ICONS.checklist,
        title: tx?.badges.items.csea.title ?? "AGC CSEA Aligned",
        subtitle: tx?.badges.items.csea.subtitle ?? "Prequalification Ready",
        color: "bg-brand-secondary",
      },
      {
        icon: "verified",
        title: tx?.badges.items.deanGold.title ?? "Dean Gold Standard",
        subtitle:
          tx?.badges.items.deanGold.subtitle ?? "Policy -> Procedure -> Task",
        color: "bg-brand-primary-dark",
      },
    ],
    commitments: [
      {
        icon: "shield",
        title:
          tx?.program.commitments.safeHome.title ??
          "Every Worker Goes Home Safe",
        body:
          tx?.program.commitments.safeHome.body ??
          "No project, deadline, or dollar amount is worth a preventable injury. Every decision on every job site is made with that standard first.",
      },
      {
        icon: "groups",
        title:
          tx?.program.commitments.accountability.title ??
          "Personal Accountability",
        body:
          tx?.program.commitments.accountability.body ??
          "Safety isn\u2019t enforced top-down. Every team member \u2014 superintendent to laborer \u2014 owns their environment and looks out for the person next to them.",
      },
      {
        icon: "military_tech",
        title:
          tx?.program.commitments.discipline.title ??
          "Service-Earned Discipline",
        body:
          tx?.program.commitments.discipline.body ??
          "Our veteran-owned leadership emphasizes a simple truth: consistent habits, not sporadic rules, are what keep people safe. That discipline lives on every job site.",
      },
      {
        icon: "visibility",
        title: tx?.program.commitments.speakUp.title ?? "Speak Up, Every Time",
        body:
          tx?.program.commitments.speakUp.body ??
          "A culture where unsafe conditions are reported \u2014 not ignored \u2014 is a culture that improves. We have zero tolerance for silence on safety concerns.",
      },
    ],
    habits: [
      {
        icon: "checklist",
        label:
          tx?.evidence.habits.toolbox ??
          "Daily toolbox talks before every shift",
      },
      {
        icon: "search",
        label:
          tx?.evidence.habits.jha ?? "Job Hazard Analysis on every new scope",
      },
      {
        icon: "healing",
        label:
          tx?.evidence.habits.incident ??
          "Incident reporting \u2014 every event, every time",
      },
      {
        icon: "build",
        label:
          tx?.evidence.habits.equipment ??
          "Equipment inspections before every use",
      },
      {
        icon: "record_voice_over",
        label:
          tx?.evidence.habits.review ?? "Weekly superintendent safety reviews",
      },
      {
        icon: "emoji_events",
        label: tx?.evidence.habits.peer ?? "Peer recognition for safe behavior",
      },
    ],
    stats: [
      {
        value: "0.64",
        label: tx?.performance.stats.emr.label ?? "EMR Rating",
        sub:
          tx?.performance.stats.emr.sub ?? "40% below industry average of 1.0",
        icon: "trending_down",
      },
      {
        value: "AGC-WA",
        label: tx?.performance.stats.agcWa.label ?? "Top EMR Award",
        sub: tx?.performance.stats.agcWa.sub ?? "Multiple consecutive years",
        icon: "workspace_premium",
      },
      {
        value: "15+",
        label: tx?.performance.stats.years.label ?? "Years",
        sub:
          tx?.performance.stats.years.sub ??
          "Building a safety-first culture since 2010",
        icon: "history",
      },
      {
        value: "50",
        label: tx?.performance.stats.sections.label ?? "Program Sections",
        sub: mishProgramLabel,
        icon: FORM_MANUAL_ICONS.source,
      },
    ],
    compliance: [
      {
        icon: "gpp_good",
        title: tx?.compliance.items.osha.title ?? "OSHA 29 CFR 1926",
        body:
          tx?.compliance.items.osha.body ??
          "Full compliance with federal construction safety standards \u2014 fall protection, scaffolding, excavation, electrical, personal protective equipment, and all applicable subparts.",
      },
      {
        icon: "account_balance",
        title: tx?.compliance.items.wisha.title ?? "Washington L&I (WISHA)",
        body:
          tx?.compliance.items.wisha.body ??
          "Complete alignment with Washington Industrial Safety & Health Act requirements. Regular L&I audits, certified payroll processes, and prevailing wage compliance on all public sector projects.",
      },
      {
        icon: "eco",
        title: tx?.compliance.items.epa.title ?? "EPA & Environmental",
        body:
          tx?.compliance.items.epa.body ??
          "Adherence to EPA regulations governing construction site stormwater, hazardous materials handling, and environmental protection requirements in Washington, Oregon, and Idaho.",
      },
      {
        icon: "payments",
        title:
          tx?.compliance.items.payroll.title ??
          "Prevailing Wage & Certified Payroll",
        body:
          tx?.compliance.items.payroll.body ??
          "Systematic certified payroll processes and prevailing wage compliance protect public projects from violations, fines, and work stoppages \u2014 documented and auditable at every phase.",
      },
    ],
  };
}
