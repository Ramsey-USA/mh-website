// Export all dashboard components for easy imports
import dynamic from "next/dynamic";

export { DashboardSidebar } from "./DashboardSidebar";
export { DashboardStats } from "./DashboardStats";
export { RecentConsultations } from "./RecentConsultations";
export { ProjectsOverview } from "./ProjectsOverview";
export { TeamSchedule } from "./TeamSchedule";

// Heavy components loaded dynamically
export const AdminDashboard = dynamic(() => import("./AdminDashboard"), {
  ssr: false,
});

export const ContentManagement = dynamic(
  () => import("./ContentManagementSimple"),
  {
    ssr: false,
  },
);
