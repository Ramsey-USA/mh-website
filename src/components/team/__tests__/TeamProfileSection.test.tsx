import "@testing-library/jest-dom";
import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TeamProfileSection } from "../TeamProfileSection";
import type { VintageTeamMember } from "@/lib/data/vintage-team";

class MockMutationObserver {
  static lastInstance: MockMutationObserver | null = null;

  private callback: MutationCallback;

  observe = jest.fn();
  disconnect = jest.fn();

  constructor(callback: MutationCallback) {
    this.callback = callback;
    MockMutationObserver.lastInstance = this;
  }

  trigger() {
    this.callback([] as MutationRecord[], this as unknown as MutationObserver);
  }
}

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => {
    const { fill, priority, ...imgProps } = props;
    return <img alt={alt} src={src} {...imgProps} />;
  },
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon, ariaLabel, className }: any) => (
    <span aria-label={ariaLabel} className={className}>
      {icon}
    </span>
  ),
}));

jest.mock("../SkillsRadarChart", () => ({
  SkillsRadarChart: ({
    data,
    isDark,
  }: {
    data: Array<{ subject: string }>;
    isDark?: boolean;
  }) => (
    <div>
      <span>Chart theme: {isDark ? "dark" : "light"}</span>
      <span>Chart points: {data.length}</span>
    </div>
  ),
}));

const baseMember: VintageTeamMember = {
  name: "Alex Builder",
  role: "Founder & Project Executive",
  department: "Leadership",
  cardNumber: 7,
  position: "Executive",
  nickname: "Bulldog",
  yearsWithCompany: 12,
  hometown: "Pasco, WA",
  education: "Bachelor of Science in Construction Management",
  skills: {
    leadership: 96,
    technical: 91,
    communication: 89,
    safety: 92,
    problemSolving: 87,
    teamwork: 90,
    organization: 88,
    innovation: 86,
    passion: 84,
    continuingEducation: 82,
  },
  currentYearStats: {
    projectsCompleted: 9,
    clientSatisfaction: 99,
    safetyRecord: "PERFECT",
    teamCollaborations: 14,
  },
  careerStats: {
    totalProjects: 640,
    yearsExperience: 24,
    specialtyAreas: 5,
    mentorships: 11,
  },
  awards: "Builder of the Year",
  bio: "A seasoned builder focused on long-term partnerships.",
  careerHighlights: ["Led 100+ civic projects", "Scaled regional operations"],
  funFact: "Collects antique tools.",
  certifications: "Six Sigma Black Belt",
  hobbies: "Fishing and restoring trucks",
  specialInterests: "Veteran mentorship",
  specialties: ["Preconstruction", "Public Works"],
  avatar: "/images/team/alex.webp",
  veteranStatus: "Army Veteran",
  active: true,
  slug: "alex-builder",
  email: "alex@mhc-gc.com",
};

describe("TeamProfileSection", () => {
  beforeEach(() => {
    Object.defineProperty(window, "MutationObserver", {
      writable: true,
      configurable: true,
      value: MockMutationObserver,
    });
    document.documentElement.className = "";
    MockMutationObserver.lastInstance = null;
  });

  it("renders key profile details, badges, rankings, and personal insights", async () => {
    const user = userEvent.setup();

    render(<TeamProfileSection member={baseMember} index={1} />);

    expect(screen.getByText("Alex Builder")).toBeInTheDocument();
    expect(screen.getByText(/Founder & Project Executive/)).toBeInTheDocument();
    expect(screen.getByText("Army Veteran")).toBeInTheDocument();
    expect(screen.getByText("Bachelor's Degree")).toBeInTheDocument();
    expect(screen.getByText("Company Founder")).toBeInTheDocument();
    expect(screen.getByText("Perfect Safety")).toBeInTheDocument();
    expect(screen.getByText("Leadership Excellence")).toBeInTheDocument();
    expect(screen.getByText("Technical Master")).toBeInTheDocument();
    expect(screen.getByText("Partnership Leadership")).toBeInTheDocument();
    expect(screen.getByText("Technical Excellence")).toBeInTheDocument();
    expect(screen.getByText("Safety Excellence")).toBeInTheDocument();
    expect(screen.getByText(/Years at MH:/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact team member/i }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:alex@mhc-gc.com"),
    );

    await user.click(
      screen.getByRole("button", { name: /personal insights/i }),
    );

    expect(screen.getByText(/Collects antique tools/)).toBeInTheDocument();
    expect(
      screen.getByText(/Fishing and restoring trucks/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Veteran mentorship/)).toBeInTheDocument();
    expect(screen.getByText("Chart theme: light")).toBeInTheDocument();
    expect(screen.getByText("Chart points: 10")).toBeInTheDocument();

    expect(document.getElementById(baseMember.slug)).toBeInTheDocument();
    expect(
      screen.getByText("Alex Builder").closest("div[id='alex-builder']"),
    ).toBeInTheDocument();
  });

  it("updates chart theme for dark mode and falls back to an icon avatar on image error", () => {
    render(<TeamProfileSection member={baseMember} index={0} />);

    expect(screen.getByAltText("Alex Builder")).toBeInTheDocument();

    act(() => {
      document.documentElement.classList.add("dark");
      MockMutationObserver.lastInstance?.trigger();
    });

    expect(screen.getByText("Chart theme: dark")).toBeInTheDocument();

    fireEvent.error(screen.getByAltText("Alex Builder"));

    expect(screen.queryByAltText("Alex Builder")).not.toBeInTheDocument();
    expect(screen.getAllByText("engineering").length).toBeGreaterThan(0);
  });

  it("renders Navy Veteran badge for navy veteran status", () => {
    const navyMember: VintageTeamMember = {
      ...baseMember,
      name: "Sam Sailor",
      slug: "sam-sailor",
      veteranStatus: "Navy Veteran",
      education: "", // suppress education badges for clarity
      role: "Safety Officer",
    };

    render(<TeamProfileSection member={navyMember} index={0} />);

    expect(screen.getByText("Navy Veteran")).toBeInTheDocument();
  });

  it("renders Master's Degree badge when education contains 'master'", () => {
    const { veteranStatus: _, ...baseWithoutVeteran } = baseMember;
    const masterMember: VintageTeamMember = {
      ...baseWithoutVeteran,
      name: "Pat Scholar",
      slug: "pat-scholar",
      education: "Master of Science in Construction Engineering",
    };

    render(<TeamProfileSection member={masterMember} index={0} />);

    expect(screen.getByText("Master's Degree")).toBeInTheDocument();
  });

  it("renders College Graduate badge for AAS / technology education", () => {
    const { veteranStatus: _, ...baseWithoutVeteran } = baseMember;
    const aasMember: VintageTeamMember = {
      ...baseWithoutVeteran,
      name: "Terry Tech",
      slug: "terry-tech",
      education: "AAS in Construction Technology",
    };

    render(<TeamProfileSection member={aasMember} index={0} />);

    expect(screen.getByText("College Graduate")).toBeInTheDocument();
  });

  it("renders fallback icon avatar when member has no avatar set", () => {
    const { avatar: _, ...baseWithoutAvatar } = baseMember;
    const noAvatarMember: VintageTeamMember = {
      ...baseWithoutAvatar,
      name: "Jordan Nophoto",
      slug: "jordan-nophoto",
      role: "Estimator",
    };

    render(<TeamProfileSection member={noAvatarMember} index={0} />);

    // The TeamAvatar renders a MaterialIcon instead of an image
    // getRoleIcon("Estimator") returns "calculate"
    expect(screen.getByText("calculate")).toBeInTheDocument();
    expect(screen.queryByAltText("Jordan Nophoto")).not.toBeInTheDocument();
  });

  it("renders role icons for Superintendent, Safety, CEO, Admin, Vice, and default roles", () => {
    const roles: Array<{ role: string; icon: string }> = [
      { role: "Superintendent", icon: "construction" },
      { role: "Safety Manager", icon: "security" },
      { role: "CEO & Owner", icon: "business" },
      { role: "Admin Coordinator", icon: "admin_panel_settings" },
      // "Vice President" contains "president" so getRoleIcon returns "business"
      { role: "Vice President", icon: "business" },
      { role: "Laborer", icon: "person" },
    ];

    roles.forEach(({ role, icon }) => {
      const { avatar: _a, veteranStatus: _v, ...baseStripped } = baseMember;
      const m: VintageTeamMember = {
        ...baseStripped,
        name: `${role} Person`,
        slug: role.toLowerCase().replace(/\s/g, "-"),
        role,
        education: "",
      };
      const { unmount } = render(<TeamProfileSection member={m} index={0} />);
      expect(screen.getAllByText(icon).length).toBeGreaterThan(0);
      unmount();
    });
  });
});
