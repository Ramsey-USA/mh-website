import { getDocumentById } from "@/lib/data/documents";
import { SafetyHubClient } from "./SafetyHubClient";

export default function SafetyHubPage() {
  const doc = getDocumentById("safety-manual")!;
  const sections = doc.sections ?? [];

  return <SafetyHubClient sections={sections} />;
}
