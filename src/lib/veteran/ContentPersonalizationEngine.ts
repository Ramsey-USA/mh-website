/**
 * Dynamic Content Personalization Engine - Phase 6.5
 * Personalized messaging, recommendations, and content based on veteran profiles
 */

import {
  VeteranProfile,
  ServiceBranch,
  VeteranPriority,
  CommunicationStyle,
  RespectLevel,
} from './VeteranProfileEngine'

export interface PersonalizedContent {
  greeting: string
  messaging: PersonalizedMessaging
  recommendations: PersonalizedRecommendation[]
  pricing: PersonalizedPricing
  testimonials: PersonalizedTestimonial[]
  forms: PersonalizedFormData
  communication: PersonalizedCommunication
}

export interface PersonalizedMessaging {
  heroMessage: string
  valueProposition: string
  servicePromise: string
  urgencyMessage?: string
  respectMessage: string
  branchSpecificMessage?: string
}

export interface PersonalizedRecommendation {
  projectType: string
  title: string
  description: string
  benefits: string[]
  estimatedCost: string
  timeline: string
  priority: number
  veteranSpecific: boolean
  accessibilityFocused: boolean
}

export interface PersonalizedPricing {
  baseDiscount: number
  additionalDiscounts: VeteranDiscount[]
  totalSavings: string
  specialOffers: string[]
  financingOptions: FinancingOption[]
}

export interface VeteranDiscount {
  type: 'combat' | 'disabled' | 'branch' | 'era' | 'family'
  percentage: number
  description: string
  requirements?: string[]
}

export interface FinancingOption {
  type: 'va_loan' | 'military_discount' | 'disabled_veteran' | 'standard'
  title: string
  description: string
  benefits: string[]
  eligibility: string[]
}

export interface PersonalizedTestimonial {
  name: string
  branch: ServiceBranch
  location: string
  project: string
  quote: string
  image?: string
  verified: boolean
  relevanceScore: number
}

export interface PersonalizedFormData {
  preFilledFields: Record<string, string>
  priorityFields: string[]
  veteranSpecificFields: string[]
  accessibilityOptions: string[]
}

export interface PersonalizedCommunication {
  tone: 'formal' | 'military' | 'casual' | 'respectful'
  terminology: 'military' | 'civilian' | 'mixed'
  responseTime: string
  preferredMethod: string
  specialInstructions: string[]
}

/**
 * Dynamic Content Personalization Engine
 */
export class ContentPersonalizationEngine {
  private static instance: ContentPersonalizationEngine

  // Testimonial database (in production, this would come from a database)
  private testimonials: PersonalizedTestimonial[] = [
    {
      name: 'MSgt John Rodriguez (Ret.)',
      branch: 'Air Force',
      location: 'San Antonio, TX',
      project: 'Kitchen Remodel',
      quote:
        'MH Construction understood our military precision standards. They delivered on time, on budget, and exceeded our expectations. The accessibility features they added for my service-connected injuries were perfectly executed.',
      verified: true,
      relevanceScore: 0,
    },
    {
      name: 'Capt. Sarah Mitchell (Army)',
      branch: 'Army',
      location: 'Austin, TX',
      project: 'Home Addition',
      quote:
        "As an active duty soldier, I needed a contractor who could work around my deployment schedule. MH Construction's military background made all the difference. They coordinated everything perfectly.",
      verified: true,
      relevanceScore: 0,
    },
    {
      name: 'Petty Officer Mike Chen (Navy)',
      branch: 'Navy',
      location: 'Houston, TX',
      project: 'Bathroom Renovation',
      quote:
        'The team at MH Construction speaks our language. They understood my needs as a disabled veteran and created a fully accessible bathroom that maintains the aesthetic I wanted. Outstanding work!',
      verified: true,
      relevanceScore: 0,
    },
    {
      name: 'Gunnery Sgt. Maria Lopez (USMC)',
      branch: 'Marines',
      location: 'Dallas, TX',
      project: 'Custom Home',
      quote:
        'Semper Fi excellence! MH Construction built our dream home with the same attention to detail and commitment to quality that we expect in the Corps. Highly recommend to fellow Marines.',
      verified: true,
      relevanceScore: 0,
    },
    {
      name: 'Coast Guard Vet Tom Williams',
      branch: 'Coast Guard',
      location: 'Galveston, TX',
      project: 'Commercial Renovation',
      quote:
        'MH Construction helped convert our space into a veteran-owned business location. Their understanding of veteran needs and professional execution made the process seamless.',
      verified: true,
      relevanceScore: 0,
    },
  ]

  public static getInstance(): ContentPersonalizationEngine {
    if (!ContentPersonalizationEngine.instance) {
      ContentPersonalizationEngine.instance = new ContentPersonalizationEngine()
    }
    return ContentPersonalizationEngine.instance
  }

  /**
   * Generate comprehensive personalized content for a veteran profile
   */
  public generatePersonalizedContent(
    profile: VeteranProfile
  ): PersonalizedContent {
    return {
      greeting: this.generatePersonalizedGreeting(profile),
      messaging: this.generatePersonalizedMessaging(profile),
      recommendations: this.generatePersonalizedRecommendations(profile),
      pricing: this.generatePersonalizedPricing(profile),
      testimonials: this.generatePersonalizedTestimonials(profile),
      forms: this.generatePersonalizedFormData(profile),
      communication: this.generatePersonalizedCommunication(profile),
    }
  }

  /**
   * Generate personalized greeting based on branch and rank
   */
  private generatePersonalizedGreeting(profile: VeteranProfile): string {
    if (!profile.isVeteran) {
      if (profile.familyStatus === 'Military Family') {
        return "Welcome, Military Family! We're honored to serve those who serve."
      }
      return 'Welcome to MH Construction!'
    }

    const branchGreetings: Record<ServiceBranch, string> = {
      Army: 'HOOAH! Welcome, Soldier!',
      Navy: 'Anchors Aweigh! Welcome, Sailor!',
      Marines: 'Semper Fi! Welcome, Marine!',
      'Air Force': 'Aim High! Welcome, Airman!',
      'Coast Guard': 'Semper Paratus! Welcome, Coastie!',
      'Space Force': 'Semper Supra! Welcome, Guardian!',
      Unknown: 'Welcome, Veteran!',
    }

    const baseGreeting = branchGreetings[profile.serviceBranch]

    // Add respect level modifier
    if (profile.respectLevel === 'High Honors') {
      return `🎖️ ${baseGreeting} Thank you for your extraordinary service and sacrifice.`
    } else if (profile.respectLevel === 'Combat Valor') {
      return `🎖️ ${baseGreeting} Thank you for your combat service and valor.`
    } else if (profile.combatVeteran) {
      return `🎖️ ${baseGreeting} Thank you for your service in harm's way.`
    }

    return `🇺🇸 ${baseGreeting} Thank you for your service!`
  }

  /**
   * Generate personalized messaging based on veteran profile
   */
  private generatePersonalizedMessaging(
    profile: VeteranProfile
  ): PersonalizedMessaging {
    const base = {
      heroMessage: 'Military Precision Meets Construction Excellence',
      valueProposition: 'Veteran-owned construction with military standards',
      servicePromise:
        'We deliver with the same commitment and precision you brought to your service',
      respectMessage: 'Your service matters. Your project matters. We get it.',
    }

    if (!profile.isVeteran) {
      return {
        ...base,
        heroMessage: 'Quality Construction You Can Trust',
        valueProposition: 'Professional construction services with integrity',
        servicePromise:
          'We deliver quality work with transparent communication',
        respectMessage: 'Your project is our priority.',
      }
    }

    // Branch-specific messaging
    const branchMessages: Record<
      ServiceBranch,
      { heroMessage: string; branchSpecificMessage: string }
    > = {
      Army: {
        heroMessage: 'Army Strong Construction Solutions',
        branchSpecificMessage:
          'Built with the same determination and excellence that defines the Army way.',
      },
      Navy: {
        heroMessage: 'Navigate Your Construction Needs with Precision',
        branchSpecificMessage:
          'Engineered with the precision and reliability of Naval tradition.',
      },
      Marines: {
        heroMessage: 'Semper Fi Construction - Always Faithful to Quality',
        branchSpecificMessage:
          'Built with Marine Corps standards - no compromise, no shortcuts.',
      },
      'Air Force': {
        heroMessage: 'Soaring Above Construction Standards',
        branchSpecificMessage:
          'Precision engineering and attention to detail that reflects Air Force excellence.',
      },
      'Coast Guard': {
        heroMessage: 'Ready When You Need Us - Semper Paratus Construction',
        branchSpecificMessage:
          'Always ready, always prepared, always reliable - just like the Coast Guard.',
      },
      'Space Force': {
        heroMessage: 'Innovation Meets Construction - Semper Supra',
        branchSpecificMessage:
          'Forward-thinking construction solutions with cutting-edge technology.',
      },
      Unknown: {
        heroMessage: 'Military Precision Meets Construction Excellence',
        branchSpecificMessage:
          'Built with military standards and attention to detail.',
      },
    }

    const branchSpecific = branchMessages[profile.serviceBranch]

    let messaging: PersonalizedMessaging = { ...base, ...branchSpecific }

    // Priority-based urgency messaging
    if (profile.priorityLevel === 'IMMEDIATE') {
      messaging.urgencyMessage =
        '🚨 IMMEDIATE PRIORITY STATUS: Expedited response within 4 hours guaranteed'
    } else if (profile.priorityLevel === 'HIGH') {
      messaging.urgencyMessage =
        '⚡ HIGH PRIORITY STATUS: Priority scheduling and 24-hour response'
    }

    // Disability-focused messaging
    if (profile.disabledVeteran) {
      messaging.servicePromise =
        'We honor your sacrifice with accessible, adaptive construction solutions designed for your specific needs'
      messaging.respectMessage =
        'Your service-connected needs are our mission. Every detail matters.'
    }

    // Combat veteran messaging
    if (profile.combatVeteran) {
      messaging.valueProposition =
        'Combat veteran to combat veteran - we understand what service means'
      messaging.respectMessage =
        'From one warrior to another - your sacrifice is honored in everything we build.'
    }

    return messaging
  }

  /**
   * Generate personalized project recommendations
   */
  private generatePersonalizedRecommendations(
    profile: VeteranProfile
  ): PersonalizedRecommendation[] {
    const recommendations: PersonalizedRecommendation[] = []

    // Accessibility-focused recommendations for disabled veterans
    if (profile.disabledVeteran) {
      recommendations.push({
        projectType: 'Accessibility Retrofit',
        title: 'Adaptive Home Modifications',
        description:
          'Comprehensive accessibility upgrades designed for your specific needs',
        benefits: [
          'ADA compliant modifications',
          'VA grant coordination',
          'Specialized veteran contractor',
          'Insurance navigation assistance',
        ],
        estimatedCost: '$15,000 - $45,000',
        timeline: 'Priority: 2-4 weeks',
        priority: 1,
        veteranSpecific: true,
        accessibilityFocused: true,
      })

      if (profile.adaptiveNeeds.some(need => need.type === 'mobility')) {
        recommendations.push({
          projectType: 'Mobility Enhancement',
          title: 'Wheelchair Accessible Bathroom',
          description: 'Full bathroom renovation with mobility-first design',
          benefits: [
            'Roll-in shower design',
            'Accessible fixtures',
            'Grab bar installation',
            'Non-slip surfaces',
          ],
          estimatedCost: '$12,000 - $25,000',
          timeline: 'Priority: 3-4 weeks',
          priority: 2,
          veteranSpecific: true,
          accessibilityFocused: true,
        })
      }
    }

    // Combat veteran specific recommendations
    if (profile.combatVeteran) {
      recommendations.push({
        projectType: 'Security Enhancement',
        title: 'Veteran Security Package',
        description: 'Comprehensive home security upgrades for peace of mind',
        benefits: [
          'Advanced security systems',
          'Reinforced entry points',
          'Smart home integration',
          'Emergency response features',
        ],
        estimatedCost: '$8,000 - $20,000',
        timeline: '2-3 weeks',
        priority: profile.disabledVeteran ? 3 : 1,
        veteranSpecific: true,
        accessibilityFocused: false,
      })
    }

    // Branch-specific recommendations
    const branchRecommendations = this.getBranchSpecificRecommendations(
      profile.serviceBranch
    )
    recommendations.push(...branchRecommendations)

    // Energy efficiency for all veterans
    recommendations.push({
      projectType: 'Energy Efficiency',
      title: 'Veteran Energy Savings Package',
      description: 'Reduce monthly costs with energy-efficient upgrades',
      benefits: [
        'Lower utility bills',
        'Tax credit eligible',
        'Veteran pricing',
        'Smart home features',
      ],
      estimatedCost: '$5,000 - $15,000',
      timeline: '1-2 weeks',
      priority: 4,
      veteranSpecific: true,
      accessibilityFocused: false,
    })

    // Sort by priority
    return recommendations.sort((a, b) => a.priority - b.priority)
  }

  /**
   * Get branch-specific recommendations
   */
  private getBranchSpecificRecommendations(
    branch: ServiceBranch
  ): PersonalizedRecommendation[] {
    const branchRecs: Record<ServiceBranch, PersonalizedRecommendation[]> = {
      Army: [
        {
          projectType: 'Tactical Storage',
          title: 'Military Gear Organization System',
          description:
            'Custom storage solutions for military equipment and memorabilia',
          benefits: [
            'Secure storage',
            'Climate controlled',
            'Display options',
            'Quick access',
          ],
          estimatedCost: '$3,000 - $8,000',
          timeline: '1-2 weeks',
          priority: 5,
          veteranSpecific: true,
          accessibilityFocused: false,
        },
      ],
      Navy: [
        {
          projectType: 'Marine-Grade Features',
          title: 'Weather-Resistant Outdoor Spaces',
          description:
            'Durable outdoor construction built to withstand any conditions',
          benefits: [
            'Marine-grade materials',
            'Weather resistant',
            'Low maintenance',
            'Ship-shape quality',
          ],
          estimatedCost: '$8,000 - $20,000',
          timeline: '2-3 weeks',
          priority: 5,
          veteranSpecific: true,
          accessibilityFocused: false,
        },
      ],
      Marines: [
        {
          projectType: 'Fortress-Style Security',
          title: 'Marine Corps Standard Security',
          description: 'Military-grade security and fortification upgrades',
          benefits: [
            'Marine-level security',
            'Tactical advantages',
            'Perimeter protection',
            'Always ready',
          ],
          estimatedCost: '$10,000 - $25,000',
          timeline: '2-4 weeks',
          priority: 5,
          veteranSpecific: true,
          accessibilityFocused: false,
        },
      ],
      'Air Force': [
        {
          projectType: 'Smart Technology',
          title: 'Advanced Smart Home Integration',
          description: 'Cutting-edge technology integration for modern living',
          benefits: [
            'Advanced automation',
            'Energy efficiency',
            'Remote monitoring',
            'Future-ready',
          ],
          estimatedCost: '$7,000 - $18,000',
          timeline: '2-3 weeks',
          priority: 5,
          veteranSpecific: true,
          accessibilityFocused: false,
        },
      ],
      'Coast Guard': [
        {
          projectType: 'Emergency Preparedness',
          title: 'Always Ready Home Systems',
          description: 'Emergency preparedness and backup systems installation',
          benefits: [
            'Backup power',
            'Emergency supplies',
            'Communication systems',
            'Always prepared',
          ],
          estimatedCost: '$6,000 - $15,000',
          timeline: '1-2 weeks',
          priority: 5,
          veteranSpecific: true,
          accessibilityFocused: false,
        },
      ],
      'Space Force': [
        {
          projectType: 'Innovation Hub',
          title: 'Future-Forward Home Office',
          description:
            'High-tech workspace designed for innovation and productivity',
          benefits: [
            'Advanced technology',
            'Ergonomic design',
            'Future-ready',
            'Innovation focused',
          ],
          estimatedCost: '$8,000 - $22,000',
          timeline: '2-3 weeks',
          priority: 5,
          veteranSpecific: true,
          accessibilityFocused: false,
        },
      ],
      Unknown: [],
    }

    return branchRecs[branch]
  }

  /**
   * Generate personalized pricing with veteran discounts
   */
  private generatePersonalizedPricing(
    profile: VeteranProfile
  ): PersonalizedPricing {
    const discounts: VeteranDiscount[] = []
    let baseDiscount = 0

    if (!profile.isVeteran) {
      return {
        baseDiscount: 0,
        additionalDiscounts: [],
        totalSavings: 'Standard pricing applies',
        specialOffers: [],
        financingOptions: [
          {
            type: 'standard',
            title: 'Standard Financing',
            description: 'Competitive rates and flexible terms',
            benefits: ['Competitive rates', 'Flexible terms', 'Quick approval'],
            eligibility: ['Good credit', 'Stable income', 'Property ownership'],
          },
        ],
      }
    }

    // Base veteran discount
    baseDiscount = 8
    discounts.push({
      type: 'branch',
      percentage: 8,
      description: `${profile.serviceBranch} Veteran Appreciation Discount`,
      requirements: ['Veteran status verification', 'Military ID or DD-214'],
    })

    // Combat veteran additional discount
    if (profile.combatVeteran) {
      discounts.push({
        type: 'combat',
        percentage: 4,
        description: 'Combat Veteran Honor Discount',
        requirements: ['Combat deployment verification'],
      })
      baseDiscount += 4
    }

    // Disabled veteran additional discount
    if (profile.disabledVeteran) {
      discounts.push({
        type: 'disabled',
        percentage: 3,
        description: 'Disabled Veteran Service Discount',
        requirements: ['VA disability rating verification'],
      })
      baseDiscount += 3
    }

    // Service era bonus
    if (
      profile.serviceEra === 'GWOT (2001-Present)' ||
      profile.serviceEra === 'Post-9/11'
    ) {
      discounts.push({
        type: 'era',
        percentage: 2,
        description: 'Post-9/11 Veteran Recognition Discount',
        requirements: ['Post-9/11 service verification'],
      })
      baseDiscount += 2
    }

    // Family discount
    if (profile.familyStatus === 'Military Family' && !profile.isVeteran) {
      discounts.push({
        type: 'family',
        percentage: 5,
        description: 'Military Family Appreciation Discount',
        requirements: ['Military family member verification'],
      })
      baseDiscount = 5
    }

    // Cap total discount
    baseDiscount = Math.min(baseDiscount, 15)

    const financingOptions: FinancingOption[] = [
      {
        type: 'va_loan',
        title: 'VA Home Improvement Loan',
        description: 'Special financing options for veterans',
        benefits: [
          'No down payment options',
          'Competitive rates',
          'Veteran-friendly terms',
        ],
        eligibility: [
          'VA loan eligibility',
          'Certificate of eligibility',
          'Creditworthiness',
        ],
      },
    ]

    if (profile.disabledVeteran) {
      financingOptions.push({
        type: 'disabled_veteran',
        title: 'Disabled Veteran Financing',
        description: 'Specialized financing for disabled veterans',
        benefits: ['Reduced rates', 'Flexible terms', 'Accessibility focused'],
        eligibility: ['VA disability rating', 'Service-connected disability'],
      })
    }

    const specialOffers: string[] = []

    if (profile.priorityLevel === 'IMMEDIATE') {
      specialOffers.push('FREE accessibility consultation included')
      specialOffers.push('Priority project scheduling')
    }

    if (profile.combatVeteran) {
      specialOffers.push('FREE security assessment included')
    }

    specialOffers.push('FREE initial consultation and estimate')
    specialOffers.push('Veteran project specialist assigned')

    return {
      baseDiscount,
      additionalDiscounts: discounts,
      totalSavings: `Up to ${baseDiscount}% off total project cost`,
      specialOffers,
      financingOptions,
    }
  }

  /**
   * Generate personalized testimonials based on relevance
   */
  private generatePersonalizedTestimonials(
    profile: VeteranProfile
  ): PersonalizedTestimonial[] {
    // Calculate relevance scores for each testimonial
    const scoredTestimonials = this.testimonials.map(testimonial => {
      let relevanceScore = 0

      // Same branch bonus
      if (testimonial.branch === profile.serviceBranch) {
        relevanceScore += 30
      }

      // Disability relevance
      if (
        profile.disabledVeteran &&
        testimonial.quote.toLowerCase().includes('disab')
      ) {
        relevanceScore += 25
      }

      // Combat veteran relevance
      if (
        profile.combatVeteran &&
        testimonial.quote.toLowerCase().includes('combat')
      ) {
        relevanceScore += 20
      }

      // Project type relevance (could be enhanced with actual project matching)
      if (
        profile.constructionPriorities.includes('Accessibility Compliance') &&
        testimonial.quote.toLowerCase().includes('accessibility')
      ) {
        relevanceScore += 20
      }

      // Geographic relevance (Texas-based)
      if (testimonial.location.includes('TX')) {
        relevanceScore += 10
      }

      return { ...testimonial, relevanceScore }
    })

    // Sort by relevance and return top 3
    return scoredTestimonials
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3)
  }

  /**
   * Generate personalized form pre-fill data
   */
  private generatePersonalizedFormData(
    profile: VeteranProfile
  ): PersonalizedFormData {
    const preFilledFields: Record<string, string> = {}
    const priorityFields: string[] = []
    const veteranSpecificFields: string[] = []
    const accessibilityOptions: string[] = []

    if (profile.isVeteran) {
      preFilledFields['veteranStatus'] = 'true'
      preFilledFields['serviceBranch'] = profile.serviceBranch
      preFilledFields['serviceEra'] = profile.serviceEra

      veteranSpecificFields.push(
        'veteranStatus',
        'serviceBranch',
        'combatVeteran',
        'disabilityRating'
      )

      if (profile.combatVeteran) {
        preFilledFields['combatVeteran'] = 'true'
        veteranSpecificFields.push('deploymentHistory', 'combatTheaters')
      }

      if (profile.disabledVeteran) {
        preFilledFields['disabledVeteran'] = 'true'
        if (profile.disabilityRating) {
          preFilledFields['disabilityRating'] =
            profile.disabilityRating.toString()
        }
        priorityFields.push('accessibilityRequirements', 'adaptiveNeeds')
      }
    }

    // Communication preferences
    preFilledFields['preferredContactMethod'] = profile.preferredContactMethod
    preFilledFields['communicationStyle'] = profile.communicationStyle

    // Project preferences
    if (profile.budgetRange) {
      preFilledFields['budgetRange'] = profile.budgetRange
    }
    preFilledFields['timeline'] = profile.preferredTimeline

    // Accessibility options for disabled veterans
    if (profile.disabledVeteran) {
      profile.accessibilityRequirements.forEach(req => {
        accessibilityOptions.push(req)
      })
    }

    return {
      preFilledFields,
      priorityFields,
      veteranSpecificFields,
      accessibilityOptions,
    }
  }

  /**
   * Generate personalized communication preferences
   */
  private generatePersonalizedCommunication(
    profile: VeteranProfile
  ): PersonalizedCommunication {
    let tone: PersonalizedCommunication['tone'] = 'casual'
    let terminology: PersonalizedCommunication['terminology'] = 'civilian'
    let responseTime = '48 hours'
    let preferredMethod = 'Phone Call'
    const specialInstructions: string[] = []

    if (profile.isVeteran) {
      // Determine tone based on rank and style
      if (
        profile.rankCategory === 'Officer' ||
        profile.communicationStyle === 'Professional Formal'
      ) {
        tone = 'formal'
      } else if (
        profile.militaryTerminology ||
        profile.communicationStyle === 'Military Direct'
      ) {
        tone = 'military'
      } else if (profile.communicationStyle === 'Respectful Detailed') {
        tone = 'respectful'
      }

      // Military terminology preference
      if (profile.militaryTerminology || profile.rankCategory === 'Officer') {
        terminology = 'military'
      } else {
        terminology = 'mixed'
      }

      // Priority response times
      if (profile.priorityLevel === 'IMMEDIATE') {
        responseTime = '4 hours'
        specialInstructions.push(
          'IMMEDIATE PRIORITY - Expedited response required'
        )
        specialInstructions.push(
          'Disabled/Combat Veteran - Handle with special care'
        )
      } else if (profile.priorityLevel === 'HIGH') {
        responseTime = '24 hours'
        specialInstructions.push('HIGH PRIORITY - Veteran priority scheduling')
      }

      // Communication method
      preferredMethod = profile.preferredContactMethod

      // Special instructions based on profile
      if (profile.disabledVeteran) {
        specialInstructions.push('Accessibility needs assessment required')
        specialInstructions.push('VA benefits coordination available')
      }

      if (profile.combatVeteran) {
        specialInstructions.push(
          'Combat veteran - respectful acknowledgment of service'
        )
        specialInstructions.push(
          'PTSD awareness - flexible scheduling if needed'
        )
      }

      // Branch-specific instructions
      const branchInstructions: Record<ServiceBranch, string> = {
        Army: 'Use "Hooah" acknowledgment when appropriate',
        Navy: 'Naval terminology and precision expected',
        Marines: 'Direct communication style - Semper Fi attitude',
        'Air Force': 'Professional and detail-oriented approach',
        'Coast Guard': 'Reliable and ready response style',
        'Space Force': 'Innovation-focused and future-forward messaging',
        Unknown: 'Standard professional military respect',
      }

      const branchInstruction = branchInstructions[profile.serviceBranch]
      if (branchInstruction && profile.serviceBranch !== 'Unknown') {
        specialInstructions.push(branchInstruction)
      }
    }

    return {
      tone,
      terminology,
      responseTime,
      preferredMethod,
      specialInstructions,
    }
  }

  /**
   * Get personalized content for a specific context (homepage, estimator, etc.)
   */
  public getContextualizedContent(
    profile: VeteranProfile,
    context: 'homepage' | 'estimator' | 'contact' | 'projects' | 'about'
  ): Partial<PersonalizedContent> {
    const fullContent = this.generatePersonalizedContent(profile)

    switch (context) {
      case 'homepage':
        return {
          greeting: fullContent.greeting,
          messaging: fullContent.messaging,
          testimonials: fullContent.testimonials.slice(0, 1),
          pricing: fullContent.pricing,
        }

      case 'estimator':
        return {
          recommendations: fullContent.recommendations,
          forms: fullContent.forms,
          pricing: fullContent.pricing,
        }

      case 'contact':
        return {
          greeting: fullContent.greeting,
          forms: fullContent.forms,
          communication: fullContent.communication,
        }

      case 'projects':
        return {
          recommendations: fullContent.recommendations,
          testimonials: fullContent.testimonials,
        }

      case 'about':
        return {
          messaging: fullContent.messaging,
          testimonials: fullContent.testimonials,
        }

      default:
        return fullContent
    }
  }
}
