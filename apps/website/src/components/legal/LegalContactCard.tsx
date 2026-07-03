import { COMPANY_INFO } from "@/lib/constants/company";

interface LegalContactCardProps {
  showAddress?: boolean;
  phoneLabel?: string;
  emailLabel?: string;
}

export function LegalContactCard({
  showAddress = true,
  phoneLabel = "Phone",
  emailLabel = "Email",
}: LegalContactCardProps) {
  return (
    <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
      <p className="text-gray-700 dark:text-gray-300">
        <strong>MH Construction, Inc.</strong>
        <br />
        {showAddress && (
          <>
            {COMPANY_INFO.address.street}
            <br />
            {COMPANY_INFO.address.cityStateZip}
            <br />
          </>
        )}
        {phoneLabel}:{" "}
        <a
          href={`tel:${COMPANY_INFO.phone.tel}`}
          className="text-brand-primary hover:underline"
        >
          {COMPANY_INFO.phone.display}
        </a>
        <br />
        {emailLabel}:{" "}
        <a
          href={`mailto:${COMPANY_INFO.email.main}`}
          className="text-brand-primary hover:underline"
        >
          {COMPANY_INFO.email.main}
        </a>
      </p>
    </div>
  );
}
