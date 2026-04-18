import { allHubDocuments } from "@/lib/data/documents";
import { travelersVideos } from "@/lib/data/travelers-training";
import { HubClient } from "./HubClient";

export default function HubPage() {
  return (
    <HubClient
      allHubDocuments={allHubDocuments}
      travelersVideos={travelersVideos}
    />
  );
}
