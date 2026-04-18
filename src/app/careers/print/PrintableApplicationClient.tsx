"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { COMPANY_INFO } from "@/lib/constants/company";
import { useLocale } from "@/hooks/useLocale";
import { LOCALE_COOKIE_NAME, type SupportedLocale } from "@/lib/i18n/locale";

// ─── Translations ─────────────────────────────────────────────────────────────

type Language = "en" | "es";

const translations = {
  en: {
    title: "Employment Application",
    subtitle: "MH Construction, Inc.",
    tagline: "Veteran-Owned General Contractor",
    brandSlogan: "Building projects for the Client, NOT the Dollar",
    roiMessage: "THE ROI IS THE RELATIONSHIP",
    instructions: "Instructions",
    instructionsList: [
      "Please print clearly in black or blue ink.",
      "Complete all sections that apply to you.",
      "Bring this completed form to our office or email a scanned copy.",
      "A resume may be attached but is not required.",
    ],
    officeAddress: "Office Address",
    officeHours: "Office Hours: Monday–Friday, 7:00 AM – 4:00 PM",
    orEmail: "Or email to:",
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Street Address",
    city: "City",
    state: "State",
    zip: "ZIP Code",
    positionInfo: "Position Information",
    positionApplying: "Position Applying For",
    positions: [
      "Construction Laborer",
      "Skilled Tradesperson",
      "Equipment Operator",
      "Project Manager",
      "Site Supervisor",
      "Estimator",
      "Administrative Assistant",
      "Safety Coordinator",
      "Other: _______________",
    ],
    yearsExperience: "Years of Experience in Construction",
    availability: "Availability to Start",
    availabilityOptions: [
      "Immediately",
      "Within 2 weeks",
      "Within 1 month",
      "Within 3 months",
      "Other: _______________",
    ],
    veteranStatus: "Veteran Status",
    veteranOptions: [
      "Veteran",
      "Active Duty",
      "Not a Veteran",
      "Prefer not to say",
    ],
    referralSource: "How did you hear about MH Construction?",
    workHistory: "Work History",
    workHistoryInstructions:
      "List your most recent employment first. Attach additional pages if needed.",
    employer: "Employer",
    jobTitle: "Job Title",
    dates: "Dates (From – To)",
    duties: "Primary Duties",
    reasonLeaving: "Reason for Leaving",
    skills: "Skills & Certifications",
    skillsInstructions:
      "Check all that apply or list any relevant certifications:",
    skillsList: [
      "OSHA 10",
      "OSHA 30",
      "First Aid / CPR",
      "Forklift Certified",
      "CDL License",
      "Flagger Certification",
      "Confined Space Entry",
      "Fall Protection",
      "Welding Certification",
      "Electrical License",
      "Plumbing License",
      "HVAC Certification",
    ],
    otherCertifications: "Other Certifications / Skills:",
    additionalInfo: "Additional Information",
    additionalInfoPrompt:
      "Is there anything else you would like us to know about your qualifications?",
    authorization: "Authorization & Signature",
    authorizationText:
      "I certify that the information provided in this application is true and complete to the best of my knowledge. I understand that false or misleading information may result in disqualification from consideration or termination of employment.",
    signature: "Signature",
    date: "Date",
    printedName: "Printed Name",
    equalOpportunity: "Equal Opportunity Employer",
    equalOpportunityText:
      "MH Construction is an equal opportunity employer. We do not discriminate based on race, color, religion, sex, national origin, age, disability, veteran status, or any other protected characteristic.",
    veteranPriority:
      "Service recognizes service. Veterans receive priority consideration—we value military experience and discipline. Thank you for your service.",
    careerPromise:
      "Join a team where your word matters as much as ours. Build your career on a foundation of trust.",
    printButton: "Print Application",
    backToCareers: "Back to Careers",
    switchLanguage: "Español",
    officeUseOnly: "Office Use Only",
    dateReceived: "Date Received",
    receivedBy: "Received By",
    position: "Position",
    notes: "Notes",
  },
  es: {
    title: "Solicitud de Empleo",
    subtitle: "MH Construction, Inc.",
    tagline: "Contratista General de Propiedad de Veteranos",
    brandSlogan: "Construyendo proyectos para el cliente, NO por el dinero",
    roiMessage: "EL RETORNO ES LA RELACIÓN",
    instructions: "Instrucciones",
    instructionsList: [
      "Por favor escriba claramente con tinta negra o azul.",
      "Complete todas las secciones que le apliquen.",
      "Traiga este formulario completado a nuestra oficina o envíe una copia escaneada por correo electrónico.",
      "Se puede adjuntar un currículum, pero no es obligatorio.",
    ],
    officeAddress: "Dirección de la Oficina",
    officeHours: "Horario de Oficina: Lunes–Viernes, 7:00 AM – 4:00 PM",
    orEmail: "O envíe a:",
    personalInfo: "Información Personal",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Número de Teléfono",
    address: "Dirección",
    city: "Ciudad",
    state: "Estado",
    zip: "Código Postal",
    positionInfo: "Información del Puesto",
    positionApplying: "Puesto al que Aplica",
    positions: [
      "Obrero de Construcción",
      "Trabajador Especializado",
      "Operador de Equipo",
      "Gerente de Proyecto",
      "Supervisor de Obra",
      "Estimador",
      "Asistente Administrativo",
      "Coordinador de Seguridad",
      "Otro: _______________",
    ],
    yearsExperience: "Años de Experiencia en Construcción",
    availability: "Disponibilidad para Comenzar",
    availabilityOptions: [
      "Inmediatamente",
      "Dentro de 2 semanas",
      "Dentro de 1 mes",
      "Dentro de 3 meses",
      "Otro: _______________",
    ],
    veteranStatus: "Estado de Veterano",
    veteranOptions: [
      "Veterano",
      "Servicio Activo",
      "No es Veterano",
      "Prefiero no decir",
    ],
    referralSource: "¿Cómo se enteró de MH Construction?",
    workHistory: "Historial Laboral",
    workHistoryInstructions:
      "Liste su empleo más reciente primero. Adjunte páginas adicionales si es necesario.",
    employer: "Empleador",
    jobTitle: "Título del Puesto",
    dates: "Fechas (Desde – Hasta)",
    duties: "Deberes Principales",
    reasonLeaving: "Razón de Salida",
    skills: "Habilidades y Certificaciones",
    skillsInstructions:
      "Marque todo lo que aplique o liste certificaciones relevantes:",
    skillsList: [
      "OSHA 10",
      "OSHA 30",
      "Primeros Auxilios / RCP",
      "Certificado de Montacargas",
      "Licencia CDL",
      "Certificación de Señalero",
      "Entrada a Espacios Confinados",
      "Protección contra Caídas",
      "Certificación de Soldadura",
      "Licencia Eléctrica",
      "Licencia de Plomería",
      "Certificación HVAC",
    ],
    otherCertifications: "Otras Certificaciones / Habilidades:",
    additionalInfo: "Información Adicional",
    additionalInfoPrompt:
      "¿Hay algo más que le gustaría que supiéramos sobre sus calificaciones?",
    authorization: "Autorización y Firma",
    authorizationText:
      "Certifico que la información proporcionada en esta solicitud es verdadera y completa a mi mejor conocimiento. Entiendo que la información falsa o engañosa puede resultar en la descalificación de consideración o terminación de empleo.",
    signature: "Firma",
    date: "Fecha",
    printedName: "Nombre en Letra de Molde",
    equalOpportunity: "Empleador de Igualdad de Oportunidades",
    equalOpportunityText:
      "MH Construction es un empleador de igualdad de oportunidades. No discriminamos por raza, color, religión, sexo, origen nacional, edad, discapacidad, estado de veterano, o cualquier otra característica protegida.",
    veteranPriority:
      "El servicio reconoce al servicio. Los veteranos reciben consideración prioritaria—valoramos la experiencia y disciplina militar. Gracias por su servicio.",
    careerPromise:
      "Únase a un equipo donde su palabra importa tanto como la nuestra. Construya su carrera sobre una base de confianza.",
    printButton: "Imprimir Solicitud",
    backToCareers: "Volver a Carreras",
    switchLanguage: "English",
    officeUseOnly: "Solo para Uso de Oficina",
    dateReceived: "Fecha de Recepción",
    receivedBy: "Recibido Por",
    position: "Puesto",
    notes: "Notas",
  },
};

// ─── Components ───────────────────────────────────────────────────────────────

function FormField({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 mb-1.5 print:text-gray-700 uppercase tracking-wide">
        {label}
      </label>
      <div className="h-10 border-b-2 border-gray-300 dark:border-gray-600 hover:border-brand-primary dark:hover:border-brand-secondary transition-colors print:border-gray-400" />
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-base font-black uppercase tracking-wider text-brand-primary dark:text-brand-secondary border-b-2 border-brand-primary dark:border-brand-secondary pb-2 mb-5 mt-10 first:mt-0 print:text-gray-800 print:border-gray-800">
      <span className="flex-shrink-0 w-1 h-6 bg-brand-primary dark:bg-brand-secondary rounded-full print:hidden" />
      {children}
    </h2>
  );
}

function CheckboxOption({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 group">
      <div className="w-4 h-4 border-2 border-gray-400 dark:border-gray-500 rounded group-hover:border-brand-primary dark:group-hover:border-brand-secondary transition-colors print:border-gray-500" />
      <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
        {label}
      </span>
    </div>
  );
}

function WorkHistoryBlock({ t }: { t: (typeof translations)["en"] }) {
  return (
    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 bg-gray-50/50 dark:bg-gray-800/50 print:border-gray-300 print:break-inside-avoid print:bg-white shadow-sm">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label={t.employer} />
        <FormField label={t.jobTitle} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label={t.dates} />
        <FormField label={t.reasonLeaving} />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 mb-1.5 uppercase tracking-wide">
          {t.duties}
        </label>
        <div className="h-20 border-2 border-gray-300 dark:border-gray-600 rounded-lg print:border-gray-400" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PrintableApplicationClient() {
  const locale = useLocale();
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  const switchLanguage = () => {
    const next = (lang === "en" ? "es" : "en") as SupportedLocale;
    document.cookie = `${LOCALE_COOKIE_NAME}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
    setLang(next);
    window.dispatchEvent(new Event("localechange"));
  };

  const t = translations[lang];

  return (
    <>
      {/* Spacer for fixed navigation header */}
      <div className="print:hidden h-[90px] xs:h-[100px] sm:h-[120px] md:h-[150px] lg:h-[180px]" />

      {/* Print toolbar — hidden when printing */}
      <div className="print:hidden sticky top-[90px] xs:top-[100px] sm:top-[120px] md:top-[150px] lg:top-[180px] z-10 bg-white dark:bg-gray-900 border-b-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-secondary font-medium transition-colors"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            {t.backToCareers}
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={switchLanguage}
              className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:border-brand-primary dark:hover:border-brand-secondary bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-secondary text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
            >
              <MaterialIcon icon="translate" size="sm" />
              {t.switchLanguage}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <MaterialIcon icon="print" size="sm" />
              {t.printButton}
            </button>
          </div>
        </div>
      </div>

      {/* Printable document */}
      <div className="max-w-4xl mx-auto px-6 py-8 print:p-6 print:max-w-none print:text-[11px]">
        {/* Header / Letterhead */}
        <div className="flex items-start justify-between mb-4 pb-4 border-b-2 border-gray-800 print:border-gray-900">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/icon-96x96.png"
              alt="MH Construction"
              width={64}
              height={64}
              className="rounded-lg print:w-12 print:h-12"
            />
            <div>
              <p className="font-black text-xl text-gray-900 leading-none print:text-lg">
                {t.subtitle}
              </p>
              <p className="text-sm text-gray-500 mt-1 print:text-xs">
                {t.tagline}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-black text-brand-primary print:text-xl print:text-gray-900">
              {t.title}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {COMPANY_INFO.phone.display} • {COMPANY_INFO.email.main}
            </p>
          </div>
        </div>

        {/* Brand Messaging Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-brand-primary/10 via-brand-primary/5 to-brand-secondary/10 border-2 border-brand-primary/25 rounded-xl text-center print:bg-gray-50 print:border-gray-300 shadow-sm">
          <p className="text-base font-black text-brand-primary print:text-gray-800">
            &ldquo;{t.brandSlogan}&rdquo;
          </p>
          <p className="text-sm text-brand-secondary-text mt-2 font-bold tracking-wide print:text-gray-600">
            {t.roiMessage}
          </p>
        </div>

        {/* Instructions Box */}
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6 print:bg-white print:border-gray-300 print:break-inside-avoid shadow-sm">
          <div className="flex gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 bg-brand-primary/15 dark:bg-brand-primary/25 rounded-lg print:hidden">
                  <MaterialIcon
                    icon="info"
                    size="sm"
                    className="text-brand-primary"
                  />
                </span>
                {t.instructions}
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2 print:text-xs">
                {t.instructionsList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-brand-primary/15 text-brand-primary font-bold text-xs rounded-full mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l border-gray-200 pl-4 print:border-gray-300">
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                {t.officeAddress}
              </h4>
              <p className="text-sm text-gray-600 print:text-xs">
                {COMPANY_INFO.address.street}
                <br />
                {COMPANY_INFO.address.cityStateZip}
              </p>
              <p className="text-xs text-gray-500 mt-2">{t.officeHours}</p>
              <p className="text-xs text-gray-500 mt-1">
                {t.orEmail}{" "}
                <span className="font-medium">{COMPANY_INFO.email.main}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <SectionHeader>{t.personalInfo}</SectionHeader>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 print:gap-y-3">
          <FormField label={t.firstName} />
          <FormField label={t.lastName} />
          <FormField label={t.email} />
          <FormField label={t.phone} />
          <FormField label={t.address} wide />
          <FormField label={t.city} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t.state} />
            <FormField label={t.zip} />
          </div>
        </div>

        {/* Position Information */}
        <SectionHeader>{t.positionInfo}</SectionHeader>
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            {t.positionApplying}
          </label>
          <div className="grid grid-cols-3 gap-2 print:grid-cols-3">
            {t.positions.map((pos) => (
              <CheckboxOption key={pos} label={pos} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4 print:gap-y-3">
          <FormField label={t.yearsExperience} />
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              {t.availability}
            </label>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {t.availabilityOptions.map((opt) => (
                <CheckboxOption key={opt} label={opt} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 print:gap-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              {t.veteranStatus}
            </label>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {t.veteranOptions.map((opt) => (
                <CheckboxOption key={opt} label={opt} />
              ))}
            </div>
          </div>
          <FormField label={t.referralSource} />
        </div>

        {/* Work History */}
        <SectionHeader>{t.workHistory}</SectionHeader>
        <p className="text-sm text-gray-600 mb-4 print:text-xs">
          {t.workHistoryInstructions}
        </p>
        <WorkHistoryBlock t={t} />
        <WorkHistoryBlock t={t} />

        {/* Skills & Certifications */}
        <SectionHeader>{t.skills}</SectionHeader>
        <p className="text-sm text-gray-600 mb-3 print:text-xs">
          {t.skillsInstructions}
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4 print:grid-cols-4">
          {t.skillsList.map((skill) => (
            <CheckboxOption key={skill} label={skill} />
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t.otherCertifications}
          </label>
          <div className="h-12 border-2 border-gray-300 rounded print:border-gray-400" />
        </div>

        {/* Additional Information */}
        <SectionHeader>{t.additionalInfo}</SectionHeader>
        <p className="text-sm text-gray-600 mb-2 print:text-xs">
          {t.additionalInfoPrompt}
        </p>
        <div className="h-24 border-2 border-gray-300 rounded print:border-gray-400" />

        {/* Authorization & Signature */}
        <SectionHeader>{t.authorization}</SectionHeader>
        <p className="text-sm text-gray-700 mb-6 print:text-xs leading-relaxed">
          {t.authorizationText}
        </p>
        <div className="grid grid-cols-3 gap-6 print:gap-4">
          <div className="col-span-2">
            <FormField label={t.signature} />
          </div>
          <FormField label={t.date} />
        </div>
        <div className="mt-4">
          <FormField label={t.printedName} />
        </div>

        {/* Equal Opportunity Statement */}
        <div className="mt-8 pt-4 border-t border-gray-200 print:mt-6 print:pt-3 print:border-gray-300">
          <p className="text-xs text-gray-500 text-center mb-2">
            <strong>{t.equalOpportunity}</strong>
          </p>
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {t.equalOpportunityText}
          </p>
          <p className="text-xs text-brand-primary text-center mt-3 font-semibold print:text-gray-700">
            {t.veteranPriority}
          </p>
          <p className="text-xs text-brand-secondary-text text-center mt-1 italic print:text-gray-600">
            {t.careerPromise}
          </p>
        </div>

        {/* Office Use Only Section */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-300 print:mt-6 print:break-before-avoid">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
            {t.officeUseOnly}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <FormField label={t.dateReceived} />
            <FormField label={t.receivedBy} />
            <FormField label={t.position} />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              {t.notes}
            </label>
            <div className="h-16 border-2 border-gray-200 border-dashed rounded" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400 print:mt-4">
          <p>
            {COMPANY_INFO.name} • {COMPANY_INFO.phone.display} •{" "}
            {COMPANY_INFO.address.full}
          </p>
          <p className="mt-1">www.mhc-gc.com</p>
        </div>
      </div>
    </>
  );
}
