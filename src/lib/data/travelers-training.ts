export interface TravelersVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "safety" | "compliance" | "new-employee" | "equipment";
  duration?: string;
}

export const travelersVideos: TravelersVideo[] = [
  {
    id: "travelers-placeholder-1",
    title: "Travelers Training Library Coming Soon",
    description:
      "New Travelers training links will be added here as soon as the approved source list is delivered.",
    url: "#",
    category: "safety",
  },
];
