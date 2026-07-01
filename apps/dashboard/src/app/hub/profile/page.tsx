import type { Metadata } from "next";
import { TeamProfileForm } from "@/components/hub/TeamProfileForm";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export const metadata: Metadata = {
  title: "My Team Profile | MH Construction Hub",
  description:
    "Update your professional bio and profile information for the MH Construction team page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HubProfilePage() {
  return (
    <div className="min-h-screen bg-brand-primary-darker">
      {/* Page header */}
      <div className="bg-linear-to-r from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-secondary/45 bg-brand-primary-darker/35 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
            <MaterialIcon
              icon="edit_note"
              size="sm"
              className="text-brand-secondary"
            />
            Team Profile Questionnaire
          </p>
          <h1 className="text-2xl font-black text-white sm:text-3xl">
            Update Your Team Page Profile
          </h1>
          <p className="mt-2 text-sm text-brand-secondary-light/85">
            Fill out the fields below to update the bio, skills, and
            professional details shown on the public MH Construction team page.
            Submissions are reviewed by Matt before going live.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <TeamProfileForm />
      </div>
    </div>
  );
}
