import type { Metadata } from "next";
import { ProfileReviewClient } from "@/components/hub/ProfileReviewClient";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export const metadata: Metadata = {
  title: "Review Team Profiles | MH Construction Hub",
  description: "Review and approve pending team profile submissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileReviewPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Page header */}
      <div className="bg-gradient-to-r from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="rate_review"
              size="sm"
              className="text-brand-secondary"
            />
            Profile Review Queue
          </p>
          <h1 className="text-2xl font-black text-white sm:text-3xl">
            Approve Team Profile Submissions
          </h1>
          <p className="mt-2 text-sm text-slate-200">
            Review profile updates submitted by team members. Approved profiles
            are reflected on the public team page within one hour.
          </p>
        </div>
      </div>

      {/* Review UI */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <ProfileReviewClient />
      </div>
    </div>
  );
}
