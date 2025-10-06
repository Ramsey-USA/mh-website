interface ConstructionIntel {
  projectTypes: Record<string, string>
  materialSpecs: Record<string, string>
  locationIntel: Record<string, string>
  veteranProtocols: Record<string, string>
  timelineStrategies: Record<string, string>
}

export class MilitaryConstructionAI {
  private constructionIntel: ConstructionIntel

  constructor() {
    this.constructionIntel = {
      projectTypes: {
        residential:
          '**RESIDENTIAL FORTIFICATION** - Standard housing operations with tactical precision',
        commercial:
          '**COMMERCIAL OUTPOST** - Business facility construction with strategic positioning',
        renovation:
          '**STRUCTURE ENHANCEMENT MISSION** - Upgrading existing tactical installations',
        addition:
          '**FACILITY EXPANSION OPERATION** - Extending operational capacity',
        deck: '**ELEVATED PLATFORM CONSTRUCTION** - Tactical observation and recreation deck',
        kitchen:
          '**COMMAND CENTER UPGRADE** - Central operations and nutrition facility',
        bathroom:
          '**SANITATION FACILITY ENHANCEMENT** - Essential personnel welfare upgrade',
      },

      materialSpecs: {
        standard:
          '**STANDARD ISSUE MATERIALS** 🏗️\n• Field-grade lumber and basic fixtures\n• Reliable performance for standard operations\n• Cost-effective tactical solution',
        enhanced:
          '**ENHANCED GRADE ARSENAL** 🛡️\n• Superior tactical equipment and materials\n• Improved durability and performance\n• Recommended for extended deployments',
        premium:
          '**PREMIUM MILITARY SPEC** ⭐\n• Top-tier operational supplies\n• Maximum performance and longevity\n• Elite command center standards',
        elite:
          '**ELITE COMMAND MATERIALS** 💎\n• Maximum performance specifications\n• Highest quality operational equipment\n• Built for commanding officer standards',
      },

      locationIntel: {
        seattle:
          '**SEATTLE FORWARD OPERATING BASE** - Urban operations with rain-weather protocols',
        tacoma:
          '**TACOMA TACTICAL ZONE** - Industrial sector with strategic port access',
        bellevue:
          '**BELLEVUE COMMAND CENTER** - High-value target area with premium requirements',
        everett:
          '**EVERETT AEROSPACE SECTOR** - Advanced technology zone operations',
        spokane:
          '**SPOKANE EASTERN FRONT** - Continental operations with extreme weather prep',
        vancouver:
          '**VANCOUVER NORTHERN OUTPOST** - International border tactical position',
        olympia:
          '**OLYMPIA CAPITAL COMMAND** - State operations headquarters sector',
        bellingham:
          '**BELLINGHAM NORTHERN PATROL** - Border region tactical operations',
      },

      veteranProtocols: {
        army: '**HOOAH, SOLDIER!** 🇺🇸 Army strong - we build with the same precision you served with',
        navy: '**ANCHORS AWEIGH!** ⚓ Navy precision meets construction excellence',
        marines:
          '**SEMPER FI!** 🦅 Marine Corps standards - built tough, built right',
        airforce:
          '**AIM HIGH!** ✈️ Air Force precision engineering in every project',
        coastguard:
          '**SEMPER PARATUS!** 🚢 Coast Guard ready - always prepared for any challenge',
        general:
          '**THANK YOU FOR YOUR SERVICE!** 🎖️ Veteran recognition protocol active',
      },

      timelineStrategies: {
        urgent:
          '**RAPID DEPLOYMENT MISSION** ⚡\n• Emergency response protocols\n• Accelerated tactical timeline\n• Priority resource allocation',
        standard:
          '**STANDARD OPERATIONS TEMPO** 📅\n• Regular mission timeline\n• Balanced resource deployment\n• Quality assurance protocols',
        extended:
          '**STRATEGIC CAMPAIGN TIMELINE** 🎯\n• Extended operation planning\n• Comprehensive resource strategy\n• Maximum quality standards',
        complex:
          '**MAJOR INSTALLATION PROJECT** 🏛️\n• Large-scale operational planning\n• Multi-phase deployment strategy\n• Full command oversight',
      },
    }
  }

  generateResponse(userInput: string, context?: any): string {
    const input = userInput.toLowerCase()

    // Page-specific intelligence briefings
    if (
      this.matchesKeywords(input, [
        'page',
        'help',
        'where',
        'navigation',
        'guide',
      ]) &&
      context?.currentPage
    ) {
      return this.getPageSpecificGuidance(context.currentPage, input)
    }

    // Estimate and cost intelligence with context integration
    if (this.matchesKeywords(input, ['estimate', 'cost', 'price', 'budget'])) {
      return this.getCostIntelligence(input, context)
    } // Material intelligence
    if (this.matchesKeywords(input, ['material', 'supplies', 'equipment'])) {
      return this.getMaterialIntelligence(input)
    }

    // Location intelligence
    if (
      this.matchesKeywords(input, [
        'location',
        'area',
        'where',
        'seattle',
        'tacoma',
        'bellevue',
      ])
    ) {
      return this.getLocationIntelligence(input)
    }

    // Timeline intelligence
    if (
      this.matchesKeywords(input, [
        'timeline',
        'schedule',
        'when',
        'time',
        'duration',
      ])
    ) {
      return this.getTimelineIntelligence(input)
    }

    // Veteran protocols
    if (
      this.matchesKeywords(input, [
        'veteran',
        'military',
        'service',
        'army',
        'navy',
        'marines',
      ])
    ) {
      return this.getVeteranProtocols(input)
    }

    // Veteran-specific advisory system
    if (
      this.matchesKeywords(input, [
        'accessibility',
        'disability',
        'ada',
        'wheelchair',
        'mobility',
      ])
    ) {
      return this.getVeteranAccessibilityAdvice(input)
    }

    // Energy efficiency for veterans
    if (
      this.matchesKeywords(input, [
        'energy',
        'efficiency',
        'saving',
        'utility',
        'green',
      ])
    ) {
      return this.getVeteranEnergyAdvice(input)
    }

    // Security enhancements for veterans
    if (
      this.matchesKeywords(input, [
        'security',
        'safety',
        'protection',
        'surveillance',
      ])
    ) {
      return this.getVeteranSecurityAdvice(input)
    }

    // Project type intelligence
    if (
      this.matchesKeywords(input, [
        'project',
        'build',
        'construction',
        'renovation',
        'addition',
      ])
    ) {
      return this.getProjectIntelligence(input)
    }

    // Estimator integration and guidance
    if (
      this.matchesKeywords(input, [
        'estimator',
        'calculator',
        'form',
        'step',
        'next',
      ])
    ) {
      return this.getEstimatorGuidance(input, context)
    }

    // Help and general guidance
    if (this.matchesKeywords(input, ['help', 'what', 'how', 'guide'])) {
      return this.getOperationalGuidance()
    }

    return this.getDefaultResponse()
  }

  private matchesKeywords(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword))
  }

  private getCostIntelligence(input: string, context?: any): string {
    return `**COST RECONNAISSANCE MISSION** 💰

**TACTICAL ASSESSMENT INITIATED** 🎯

To provide precise **financial intelligence**, I need your operational parameters:

**MISSION BRIEFING REQUIRED:**
• **Primary Objective** (project type)
• **Area of Operations** (location)
• **Operational Scale** (size/scope)
• **Mission Timeline** (when needed)
• **Resource Requirements** (materials/features)

**VETERAN STATUS CHECK:** 🎖️
Confirm veteran status for **12% combat discount** activation.

**INTEL ADVANTAGE:** Our **AI estimation algorithms** factor in:
• **Location-specific cost intelligence**
• **Seasonal procurement strategies**
• **Material supply chain analysis**
• **Timeline optimization protocols**

**ORDERS:** Provide mission details and I'll deploy **immediate cost reconnaissance**!`
  }

  private getMaterialIntelligence(input: string): string {
    return `**MATERIAL SUPPLY INTELLIGENCE** 📦

**SUPPLY CHAIN ANALYSIS COMPLETE** 📊

**TACTICAL MATERIAL GRADES:**

${Object.entries(this.constructionIntel.materialSpecs)
  .map(([key, value]) => value)
  .join('\n\n')}

**STRATEGIC ADVANTAGES:**
• **Pacific Northwest supply chain optimization**
• **Weather-resistant material protocols**
• **Veteran-preferred supplier network**
• **Quality assurance inspections**

**DEPLOYMENT RECOMMENDATION:** Enhanced Grade provides optimal **cost-to-performance ratio** for most tactical operations.

**WHAT MATERIALS ARE YOU REQUISITIONING FOR YOUR MISSION?**`
  }

  private getLocationIntelligence(input: string): string {
    const detectedLocation = Object.keys(
      this.constructionIntel.locationIntel
    ).find(loc => input.includes(loc))

    if (detectedLocation) {
      return `**LOCATION INTELLIGENCE REPORT** 📍

**TARGET ZONE:** ${this.constructionIntel.locationIntel[detectedLocation]}

**TACTICAL ASSESSMENT:**
• **Local permit protocols** analyzed
• **Supply chain routes** optimized
• **Weather pattern intelligence** integrated
• **Contractor network** deployment ready

**OPERATIONAL FACTORS:**
• **Material cost adjustments** calculated
• **Transportation logistics** optimized
• **Local building code compliance** verified
• **Veteran contractor network** activated

**MISSION STATUS:** Ready to deploy tactical construction operations in your AO!`
    }

    return `**AREA OF OPERATIONS INTELLIGENCE** 🗺️

**PACIFIC NORTHWEST COMMAND ZONES:**

${Object.entries(this.constructionIntel.locationIntel)
  .map(([key, value]) => `• ${value}`)
  .join('\n')}

**TACTICAL ADVANTAGE:** Each zone has specialized **operational protocols** and **cost factors**.

**INTEL REQUEST:** What's your target operational area, soldier?`
  }

  private getTimelineIntelligence(input: string): string {
    return `**MISSION TIMELINE ANALYSIS** ⏱️

**OPERATIONAL TEMPO OPTIONS:**

${Object.entries(this.constructionIntel.timelineStrategies)
  .map(([key, value]) => value)
  .join('\n\n')}

**TACTICAL CONSIDERATIONS:**
• **Weather windows** for optimal operations
• **Permit acquisition timelines**
• **Material procurement schedules**
• **Contractor deployment availability**

**STRATEGIC PLANNING:** Timeline directly impacts **resource allocation** and **cost factors**.

**MISSION TIMELINE REQUEST:** What's your operational deadline?`
  }

  private getVeteranProtocols(input: string): string {
    const serviceDetected = Object.keys(
      this.constructionIntel.veteranProtocols
    ).find(service => input.includes(service))

    const greeting = serviceDetected
      ? this.constructionIntel.veteranProtocols[serviceDetected]
      : this.constructionIntel.veteranProtocols.general

    return `${greeting}

**VETERAN TACTICAL ADVANTAGE PACKAGE** 🎖️

**ACTIVE PROTOCOLS:**
• **12% Combat Veteran Discount** - Automatic activation
• **Priority Mission Status** - Expedited scheduling
• **Veteran Contractor Network** - Fellow service members
• **Military Precision Standards** - Built to exceed expectations
• **Battle Buddy Support** - Personal project liaison

**SPECIAL OPERATIONS:**
• **Accessibility compliance** for wounded warriors
• **Energy efficiency** for cost savings
• **Smart home integration** for modern veterans
• **Security enhancements** for peace of mind

**YOUR SERVICE MATTERS** - We build with the same honor you served with!

**How can we execute your construction mission today?**`
  }

  private getProjectIntelligence(input: string): string {
    const projectType = Object.keys(this.constructionIntel.projectTypes).find(
      type => input.includes(type)
    )

    if (projectType) {
      return `**PROJECT INTELLIGENCE BRIEFING** 📋

**MISSION TYPE:** ${this.constructionIntel.projectTypes[projectType]}

**TACTICAL EXECUTION PLAN:**
• **Reconnaissance Phase** - Site assessment and planning
• **Resource Acquisition** - Materials and permit coordination
• **Deployment Phase** - Tactical construction operations
• **Quality Assurance** - Military precision inspections
• **Mission Complete** - Final briefing and handover

**OPERATIONAL ADVANTAGES:**
• **Veteran-led project management**
• **Military-grade quality standards**
• **Precise timeline execution**
• **Strategic cost optimization**

**READY TO INITIATE MISSION PLANNING?**`
    }

    return `**CONSTRUCTION MISSION TYPES** 🏗️

**AVAILABLE OPERATIONS:**

${Object.entries(this.constructionIntel.projectTypes)
  .map(([key, value]) => `• ${value}`)
  .join('\n')}

**TACTICAL QUESTION:** What type of construction mission are you planning?`
  }

  private getEstimatorGuidance(input: string, context?: any): string {
    if (context) {
      const { projectType, location, size, materials, isVeteran } = context

      return `**ESTIMATOR TACTICAL GUIDANCE** 🎯

**CURRENT MISSION STATUS ANALYSIS:**

${
  projectType
    ? `✅ **Mission Type:** ${
        this.constructionIntel.projectTypes[projectType] ||
        projectType.toUpperCase()
      }`
    : '⚠️ **Mission Type:** AWAITING ORDERS - Select your construction objective'
}

${
  location
    ? `✅ **Area of Operations:** ${
        this.constructionIntel.locationIntel[location.toLowerCase()] ||
        location.toUpperCase()
      }`
    : '⚠️ **Location Intel:** REQUIRED - Specify your operational zone'
}

${
  size
    ? `✅ **Mission Scale:** ${size} square feet - Tactical scope confirmed`
    : '⚠️ **Mission Scale:** PENDING - Define operational parameters'
}

${
  materials && materials.length > 0
    ? `✅ **Supply Chain:** ${materials.length} material(s) requisitioned`
    : '⚠️ **Materials:** SUPPLY REQUEST NEEDED - Select tactical equipment'
}

${
  isVeteran
    ? '🎖️ **VETERAN STATUS CONFIRMED** - 12% combat discount activated'
    : '🇺🇸 **Veteran Status:** Check if applicable for combat discount'
}

**NEXT TACTICAL OBJECTIVES:**
• Complete all mission parameters for precise intelligence
• Deploy **real-time pricing algorithms** for cost reconnaissance  
• Execute **veteran discount protocols** if applicable
• Generate **tactical cost assessment** with 95% accuracy

**ORDERS:** Continue with mission briefing to receive full tactical estimate!`
    }

    return `**ESTIMATOR COMMAND CENTER** 📋

**TACTICAL ESTIMATION SYSTEM READY** 🎯

Our **AI estimation algorithms** provide:

• **Real-time pricing intelligence** with location factors
• **Material database integration** with quality specifications
• **Seasonal cost adjustments** for optimal timing
• **Veteran discount protocols** automatically applied
• **Pacific Northwest specialization** for precise local intel

**MISSION EXECUTION STEPS:**
1. **Project Type Selection** - Define your construction objective
2. **Location Intelligence** - Specify area of operations  
3. **Scale Assessment** - Input tactical parameters (size, scope)
4. **Material Requisition** - Select quality grade and specifications
5. **Timeline Planning** - Define operational schedule
6. **Intelligence Report** - Receive precise cost reconnaissance

**STANDING BY FOR MISSION PARAMETERS** 🎖️

**What construction objective requires immediate tactical assessment?**`
  }

  private getOperationalGuidance(): string {
    return `**OPERATIONAL COMMAND CENTER** 🎯

**AVAILABLE TACTICAL OPERATIONS:**

🏗️ **PROJECT INTELLIGENCE** - Mission type analysis and planning
💰 **COST RECONNAISSANCE** - Financial intelligence and estimates  
📦 **SUPPLY CHAIN INTEL** - Material recommendations and specs
📍 **LOCATION ANALYSIS** - Area of operations assessment
⏱️ **TIMELINE STRATEGY** - Mission scheduling and planning
🎖️ **VETERAN PROTOCOLS** - Special service member operations

**DEPLOYMENT COMMAND:**
1. **State your mission objective**
2. **Provide operational parameters**
3. **Receive tactical intelligence**
4. **Execute with precision**

**REMEMBER:** The more **intel** you provide, the better I can **strategize** your mission success!

**WHAT CONSTRUCTION OBJECTIVE REQUIRES IMMEDIATE ATTENTION?**`
  }

  private getVeteranAccessibilityAdvice(input: string): string {
    return `**VETERAN ACCESSIBILITY OPERATIONS** ♿

**WOUNDED WARRIOR CONSTRUCTION PROTOCOLS** 🎖️

**TACTICAL ACCESSIBILITY ENHANCEMENTS:**

🏠 **RESIDENTIAL FORTIFICATIONS:**
• **Zero-step entries** - Tactical ingress/egress solutions
• **Widened doorways** - Wheelchair deployment corridors (36" minimum)
• **Bathroom modifications** - ADA-compliant tactical facilities
• **Ramp installations** - Strategic access routes with proper grades
• **Lever-style hardware** - Easy-operation tactical controls

🔧 **SPECIALIZED EQUIPMENT:**
• **Roll-in showers** - Barrier-free sanitation facilities
• **Grab bar installations** - Strategic support positioning
• **Lower counter heights** - Accessible command surfaces
• **Voice-activated systems** - Smart home tactical integration

💰 **FUNDING INTELLIGENCE:**
• **VA Specially Adapted Housing (SAH) Grant** - Up to $109,986
• **Special Housing Adaptation (SHA) Grant** - Up to $21,647  
• **Temporary Residence Adaptation (TRA)** - Available for temporary housing

**TACTICAL ADVANTAGE:** We coordinate with **VA representatives** and **accessibility specialists** for seamless operations.

**ORDERS:** Specify your accessibility mission requirements for detailed tactical planning!`
  }

  private getVeteranEnergyAdvice(input: string): string {
    return `**VETERAN ENERGY EFFICIENCY OPERATIONS** ⚡

**TACTICAL COST-SAVINGS MISSION** 💡

**ENERGY WARFARE STRATEGIES:**

🏠 **THERMAL FORTIFICATION:**
• **High-performance insulation** - R-49 attic, R-21 walls minimum
• **Energy-efficient windows** - Double/triple-pane tactical glazing
• **Air sealing protocols** - Eliminate energy infiltration points
• **Smart thermostats** - Tactical climate control systems

⚡ **POWER GENERATION OPERATIONS:**
• **Solar panel installations** - Energy independence missions
• **Battery backup systems** - Grid-down operational readiness
• **LED lighting conversion** - 75% reduction in power consumption
• **Energy Star appliances** - Maximum operational efficiency

💰 **VETERAN ENERGY BENEFITS:**
• **Federal Solar Tax Credit** - 30% of installation costs
• **State energy rebates** - Additional tactical savings
• **Utility company incentives** - Local energy warfare support
• **VA Energy Efficient Mortgage** - Financing for green upgrades

📊 **OPERATIONAL SAVINGS:**
• **Average 30-50% utility cost reduction**
• **Increased property value** by $15,000-$25,000
• **Long-term mission sustainability**

**TACTICAL INTELLIGENCE:** Energy-efficient upgrades provide **immediate cost relief** and **long-term strategic advantage**.

**What energy efficiency mission requires tactical deployment?**`
  }

  private getVeteranSecurityAdvice(input: string): string {
    return `**VETERAN SECURITY OPERATIONS** 🛡️

**TACTICAL PERIMETER DEFENSE PLANNING** 🔒

**HOME SECURITY FORTIFICATION:**

🏠 **PERIMETER DEFENSE:**
• **Security camera systems** - 360-degree tactical surveillance
• **Motion-activated lighting** - Automatic threat illumination
• **Reinforced entry points** - Steel doors with deadbolt systems
• **Window security film** - Anti-intrusion tactical glazing
• **Smart doorbell systems** - Real-time visitor intelligence

🔧 **ADVANCED TACTICAL SYSTEMS:**
• **Alarm system integration** - Multi-zone security protocols
• **Safe room construction** - Secure tactical retreat spaces
• **Garage security upgrades** - Vehicle protection operations
• **Landscape defensive positioning** - Strategic vegetation placement

📱 **SMART HOME SECURITY:**
• **Mobile app control** - Remote tactical command
• **Automated security routines** - Scheduled defensive protocols
• **Integration with emergency services** - Rapid response connectivity
• **Veteran-friendly monitoring** - PTSD-aware security solutions

💰 **VETERAN SECURITY BENEFITS:**
• **Home security tax deductions** - Business use qualifications
• **Insurance premium reductions** - Up to 20% tactical savings
• **Veteran installer networks** - Brother/sister contractor preference
• **Bulk pricing advantages** - Group procurement opportunities

**PSYCHOLOGICAL OPERATIONS:**
• **Peace of mind enhancement** - Reduced hypervigilance stress
• **Sleep quality improvement** - Secure environment protocols
• **Family protection assurance** - Tactical home defense

**ORDERS:** Specify your security mission requirements for comprehensive tactical assessment!`
  }

  private getDefaultResponse(): string {
    return `**MESSAGE RECEIVED AND ACKNOWLEDGED** 📡

**PROCESSING TACTICAL INTELLIGENCE...**

Your construction mission parameters are being analyzed through our **military-grade assessment systems**.

**REQUEST ADDITIONAL INTEL:** To provide precise **tactical guidance**, please clarify your construction objectives with more operational details.

**STRATEGIC ADVANTAGE:** The more mission parameters you provide, the better I can deploy appropriate **tactical solutions**!

    **STANDING BY FOR FURTHER ORDERS** 🎖️`
  }

  private getPageSpecificGuidance(currentPage: string, input: string): string {
    if (currentPage?.includes('/estimator')) {
      return `**ESTIMATOR PAGE TACTICAL BRIEFING** 🎯

**CURRENT OPERATIONAL ZONE:** AI Construction Estimator Command Center

**MISSION OBJECTIVES AVAILABLE:**
• **Real-time cost reconnaissance** - Get instant intelligent estimates
• **Material supply intelligence** - Advanced database with quality specs
• **Location-based pricing** - Pacific Northwest tactical adjustments
• **Veteran discount protocols** - 12% combat discount activation
• **Timeline strategic planning** - Optimal deployment scheduling

**TACTICAL ADVANTAGE:** You're in the **primary estimation facility**! Use the form above to input mission parameters and receive precise intelligence.

**ORDERS:** Specify your construction objective or ask about estimation procedures!`
    }

    if (currentPage === '/') {
      return `**HOME BASE INTELLIGENCE BRIEFING** 🏠

**CURRENT OPERATIONAL ZONE:** MH Construction Command Headquarters

**AVAILABLE TACTICAL OPERATIONS:**
• **🎯 AI Estimator** - Navigate to /estimator for instant cost intelligence
• **📋 Services Intelligence** - Review our tactical capabilities
• **🏗️ Project Gallery** - Inspect completed military-grade operations
• **👥 Team Roster** - Meet your veteran construction officers
• **📞 Mission Planning** - Book tactical consultation

**STRATEGIC ASSETS:**
• **Veteran-owned excellence** with military precision
• **30+ years Pacific Northwest operations**
• **Advanced AI estimation technology**
• **Military-grade quality standards**

**READY TO DEPLOY TO SPECIFIC OPERATIONAL ZONE?**`
    }

    if (currentPage?.includes('/services')) {
      return `**SERVICES TACTICAL CAPABILITIES** 🔧

**CURRENT OPERATIONAL ZONE:** Service Capabilities Command Center

**AVAILABLE MILITARY-GRADE OPERATIONS:**
• **Residential Fortifications** - Housing construction with tactical precision
• **Commercial Outposts** - Business facility tactical deployment
• **Renovation Missions** - Structure enhancement operations
• **Addition Campaigns** - Facility expansion protocols
• **Specialized Operations** - Custom tactical solutions

**DEPLOYMENT READINESS:**
• **Veteran-led project management**
• **Military precision standards**
• **Advanced equipment and techniques**
• **Strategic timeline execution**

**MISSION PLANNING:** Ready to discuss specific operational requirements!`
    }

    if (currentPage?.includes('/projects')) {
      return `**PROJECT GALLERY INTELLIGENCE** 📸

**CURRENT OPERATIONAL ZONE:** Completed Missions Archive

**TACTICAL REVIEW AVAILABLE:**
• **Residential operations** - Successful housing missions
• **Commercial deployments** - Business facility completions
• **Renovation campaigns** - Enhancement operation results
• **Before/after intelligence** - Tactical transformation documentation

**OPERATIONAL STANDARDS:**
• **Military-grade quality** demonstrated
• **Veteran precision** in execution
• **Client satisfaction** mission accomplished
• **Timeline adherence** tactical excellence

**TACTICAL QUESTION:** What type of completed operation interests you most?`
    }

    if (currentPage?.includes('/about')) {
      return `**ABOUT US INTELLIGENCE DOSSIER** 📋

**CURRENT OPERATIONAL ZONE:** Company Intelligence Archives

**COMMAND STRUCTURE:**
• **Veteran-owned and operated** construction battalion
• **30+ years Pacific Northwest** operational experience
• **Military precision standards** in all deployments
• **Advanced AI technology** integration

**CORE VALUES:**
• **Honor** - Veteran integrity in every operation
• **Excellence** - Military-grade quality standards
• **Innovation** - Advanced tactical construction methods
• **Service** - Commitment to mission success

**READY TO LEARN MORE** about our tactical capabilities or team roster?`
    }

    if (currentPage?.includes('/contact')) {
      return `**CONTACT OPERATIONS CENTER** 📞

**CURRENT OPERATIONAL ZONE:** Communication Command Hub

**AVAILABLE COMMUNICATION CHANNELS:**
• **Direct tactical consultation** - Phone/email engagement
• **Mission planning sessions** - In-person strategic briefings
• **Emergency operations** - Rapid response protocols
• **Estimate requests** - AI or human intelligence options

**DEPLOYMENT PROTOCOLS:**
• **Response time:** 24-hour maximum
• **Service area:** Pacific Northwest operational theater
• **Consultation:** Free tactical assessment available
• **Follow-up:** Mission status updates provided

**STANDING BY** for your communication preferences and mission requirements!`
    }

    return `**NAVIGATION INTELLIGENCE** 🗺️

**CURRENT POSITION:** ${currentPage || 'Unknown operational zone'}

**AVAILABLE TACTICAL ZONES:**
• **🏠 Home Base** - Main command center
• **🎯 AI Estimator** - Cost intelligence facility
• **🔧 Services** - Capability assessment center
• **🏗️ Projects** - Completed missions gallery
• **👥 About** - Company intelligence dossier
• **📞 Contact** - Communication command hub

**ORDERS:** Specify which operational zone requires immediate deployment!`
  }
}

export const militaryConstructionAI = new MilitaryConstructionAI()
