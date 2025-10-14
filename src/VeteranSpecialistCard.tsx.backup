'use client'

import { useState } from 'react'
import { MaterialIcon } from '../icons/MaterialIcon'
import VeteranBadge from './VeteranBadge'

interface VeteranSpecialistCardProps {
  className?: string
}

export default function VeteranSpecialistCard({
  className = '',
}: VeteranSpecialistCardProps) {
  const [isContactVisible, setIsContactVisible] = useState(false)

  // Mock veteran specialist data - in real app, this would come from CMS/API
  const specialist = {
    name: 'Sarah Mitchell',
    title: 'Veteran Construction Specialist',
    veteranStatus: {
      branch: 'Army' as const,
      combatVeteran: true,
      disabilityRating: 20,
      serviceEra: '2001-Present' as const,
      activeDuty: false,
      dischargeBBStatus: 'Honorable' as const,
    },
    experience: '15+ years in construction',
    specialties: [
      'VA Home Loan Projects',
      'Accessibility Modifications',
      'Energy Efficiency Grants',
      'Historic Renovation Tax Credits',
    ],
    location: 'Omaha, NE',
    phone: '(402) 555-0123',
    email: 'sarah.mitchell@mhconstructionllc.com',
    certifications: [
      'Certified Aging-in-Place Specialist',
      'VA Loan Specialist',
      'Energy Efficiency Expert',
    ],
  }

  return (
    <div
      className={`bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="flex justify-center items-center bg-emerald-100 rounded-full w-16 h-16">
            <MaterialIcon
              icon="security"
              size="lg"
              className="text-emerald-600"
            />
          </div>
          <div className="-right-1 -bottom-1 absolute">
            <VeteranBadge veteranStatus={specialist.veteranStatus} size="sm" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-emerald-900 text-lg">
            {specialist.name}
          </h3>
          <p className="font-medium text-emerald-700">{specialist.title}</p>
          <p className="text-emerald-600 text-sm">{specialist.experience}</p>
          <div className="flex items-center gap-1 mt-1 text-emerald-600 text-sm">
            <MaterialIcon icon="place" size="sm" />
            {specialist.location}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <MaterialIcon icon="star" size="md" className="text-amber-500" />
          <span className="font-medium text-slate-600 text-xs">Veteran</span>
          <span className="font-medium text-slate-600 text-xs">Specialist</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 font-semibold text-emerald-900">Specializes In:</h4>
        <div className="flex flex-wrap gap-2">
          {specialist.specialties.map((specialty, index) => (
            <span
              key={index}
              className="bg-emerald-100 px-2 py-1 border border-emerald-200 rounded-full text-emerald-800 text-xs"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 font-semibold text-emerald-900">Certifications:</h4>
        <ul className="space-y-1 text-emerald-700 text-sm">
          {specialist.certifications.map((cert, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 text-emerald-500">•</span>
              {cert}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setIsContactVisible(!isContactVisible)}
          className="flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md w-full font-medium text-white transition-colors"
        >
          <MaterialIcon icon="security" size="md" />
          {isContactVisible ? 'Hide Contact Info' : 'Get Veteran Support'}
        </button>

        {isContactVisible && (
          <div className="space-y-2 bg-white p-3 border border-emerald-200 rounded-md">
            <div className="flex items-center gap-2 text-sm">
              <MaterialIcon
                icon="phone"
                size="md"
                className="text-emerald-600"
              />
              <a
                href={`tel:${specialist.phone}`}
                className="text-emerald-700 hover:text-emerald-900 hover:underline"
              >
                {specialist.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MaterialIcon
                icon="email"
                size="md"
                className="text-emerald-600"
              />
              <a
                href={`mailto:${specialist.email}`}
                className="text-emerald-700 hover:text-emerald-900 hover:underline"
              >
                {specialist.email}
              </a>
            </div>
            <div className="pt-2 border-emerald-100 border-t">
              <p className="text-emerald-600 text-xs">
                <strong>Best Contact:</strong> Call or email to discuss your
                project and available veteran benefits. Sarah specializes in
                helping veterans navigate construction financing and benefit
                programs.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-emerald-100 mt-4 p-3 rounded-md">
        <p className="text-emerald-800 text-xs">
          <strong>Veteran to Veteran:</strong> As a fellow veteran, Sarah
          understands the unique challenges and opportunities that come with
          veteran benefits. She'll ensure you get the maximum value from
          available programs.
        </p>
      </div>
    </div>
  )
}
