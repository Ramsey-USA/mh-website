/**
 * Veteran AI System
 * Specialized AI responses for veteran-related inquiries
 */

import type { VeteranProfile } from "@/lib/veteran/VeteranProfileEngine";
import { matchesKeywords } from "@/lib/utils/keywordMatcher";

export class VeteranAI {
  generateVeteranResponse(
    input: string,
    veteranProfile?: VeteranProfile,
    _context?: unknown,
  ): string {
    const inputLower = input.toLowerCase();

    // Accessibility guidance for veterans
    if (
      matchesKeywords(inputLower, [
        "accessibility",
        "disability",
        "ada",
        "wheelchair",
        "mobility",
      ])
    ) {
      return this.getVeteranAccessibilityAdvice(input, veteranProfile);
    }

    // Energy efficiency for veterans
    if (
      matchesKeywords(inputLower, [
        "energy",
        "efficiency",
        "saving",
        "utility",
        "green",
      ])
    ) {
      return this.getVeteranEnergyAdvice(input, veteranProfile);
    }

    // Security enhancements for veterans
    if (
      matchesKeywords(inputLower, [
        "security",
        "safety",
        "protection",
        "surveillance",
      ])
    ) {
      return this.getVeteranSecurityAdvice(input, veteranProfile);
    }

    // VA benefits and construction support
    if (
      matchesKeywords(inputLower, [
        "va",
        "benefits",
        "grant",
        "loan",
        "funding",
      ])
    ) {
      return this.getVABenefitsAdvice(input, veteranProfile);
    }

    // PTSD and comfort-focused construction
    if (
      matchesKeywords(inputLower, [
        "ptsd",
        "anxiety",
        "comfort",
        "peaceful",
        "quiet",
      ])
    ) {
      return this.getPTSDFocusedAdvice(input, veteranProfile);
    }

    return this.getGeneralVeteranGuidance(input, veteranProfile);
  }

  private getVeteranAccessibilityAdvice(
    _input: string,
    _veteranProfile?: VeteranProfile,
  ): string {
    return `**VETERAN ACCESSIBILITY PROTOCOL** [ACCESSIBLE]

[SHIELD] **SERVICE-CONNECTED CONSTRUCTION SUPPORT**

**Accessibility Enhancements Available:**
• **ADA-Compliant Modifications** - Full accessibility integration
• **Mobility-Focused Design** - Wheelchair and walker accessibility
• **Grab Bar Installation** - Strategic safety placement protocols
• **Ramp Construction** - Tactical entrance solutions
• **Doorway Widening** - Enhanced mobility access
• **Bathroom Modifications** - Roll-in shower and safety features
• **Kitchen Adaptations** - Counter height and reach optimization

[MILITARY_TECH] **VA BENEFIT COORDINATION**
• **Specially Adapted Housing (SAH)** grants up to $101,754
• **Special Housing Adaptation (SHA)** grants up to $20,387
• **Home Improvements and Structural Alterations (HISA)** program
• **VA Construction Loan** coordination available

**VETERAN PRIORITY PROTOCOL:**
• **Free Accessibility Assessment** - Comprehensive mobility evaluation
• **VA Paperwork Support** - Expert benefit application assistance  
• **Expedited Timeline** - Priority scheduling for service members
• **Service-Connected Discounts** - Additional savings for disabled veterans

[HANDSHAKE] **COMMITMENT TO SERVICE**
Our veteran-owned team understands the unique needs of service members. We've helped dozens of veterans create accessible, comfortable homes that honor their service and support their independence.

**Ready to discuss your accessibility mission?**`;
  }

  private getVeteranEnergyAdvice(
    _input: string,
    _veteranProfile?: VeteranProfile,
  ): string {
    return `**VETERAN ENERGY EFFICIENCY PROTOCOL** [ENERGY_SAVINGS_LEAF]

[MILITARY_TECH] **TACTICAL ENERGY OPTIMIZATION**

**Energy-Saving Mission Objectives:**
• **Solar Panel Installation** - Renewable energy tactical deployment
• **Energy-Efficient Windows** - Thermal regulation enhancement  
• **Insulation Upgrade** - Climate control optimization
• **HVAC System Enhancement** - Strategic comfort deployment
• **Smart Home Technology** - Energy efficiency protocols
• **LED Lighting Conversion** - Low-power illumination systems

[SHIELD] **VETERAN ENERGY BENEFITS**
• **Federal Tax Credits** - Up to 30% for renewable energy systems
• **Utility Rebate Coordination** - Maximize local energy incentives
• **VA Energy Efficient Mortgage** - Special financing for efficiency upgrades
• **Long-term Cost Savings** - Reduced utility operational costs

**TACTICAL ENERGY ANALYSIS:**
• **Current Energy Audit** - Identify efficiency improvement opportunities
• **Cost-Benefit Assessment** - ROI analysis for energy investments
• **Phased Implementation** - Strategic upgrade deployment timeline
• **Performance Monitoring** - Track energy savings achievements

[HANDSHAKE] **VETERAN COMMITMENT**
Energy independence aligns with military values of self-reliance and strategic resource management. Our veteran team understands the importance of reducing long-term operational costs.

**Ready to achieve energy independence?**`;
  }

  private getVeteranSecurityAdvice(
    _input: string,
    _veteranProfile?: VeteranProfile,
  ): string {
    return `**VETERAN SECURITY ENHANCEMENT PROTOCOL** [SHIELD]

[MILITARY_TECH] **TACTICAL SECURITY DEPLOYMENT**

**Security Enhancement Operations:**
• **Reinforced Entry Systems** - Military-grade door and lock upgrades
• **Security Camera Network** - Comprehensive surveillance deployment
• **Motion Detection Systems** - Perimeter monitoring protocols
• **Smart Security Integration** - Remote monitoring and control
• **Lighting Security** - Strategic illumination for threat deterrence
• **Safe Room Construction** - Secure space tactical planning
• **Alarm System Integration** - Professional monitoring coordination

[SHIELD] **VETERAN SECURITY CONSIDERATIONS**
• **PTSD-Aware Design** - Privacy and comfort prioritization
• **Multiple Exit Strategies** - Tactical egress planning
• **Noise Reduction** - Sound dampening for peace of mind
• **Privacy Landscaping** - Natural barrier tactical deployment

**SECURITY INTELLIGENCE BRIEFING:**
• **Threat Assessment** - Property vulnerability evaluation
• **Custom Security Plan** - Mission-specific protection strategy
• **Professional Installation** - Certified security system deployment
• **Training and Support** - System operation tactical briefing

[HANDSHAKE] **UNDERSTANDING VETERAN NEEDS**
Our veteran-owned team understands the importance of feeling secure in your home environment. We provide discrete, effective security solutions that enhance peace of mind without creating an institutional feel.

**Ready to secure your tactical advantage?**`;
  }

  private getVABenefitsAdvice(
    _input: string,
    _veteranProfile?: VeteranProfile,
  ): string {
    return `**VA BENEFITS INTELLIGENCE CENTER** [MILITARY_TECH]

[SHIELD] **VETERAN CONSTRUCTION BENEFIT COORDINATION**

**Available VA Construction Benefits:**
• **VA Construction Loan** - Up to $766,550 for new home construction
• **VA Renovation Loan** - Refinance with improvement funds included
• **Specially Adapted Housing (SAH)** - Up to $101,754 for accessibility
• **Special Housing Adaptation (SHA)** - Up to $20,387 for modifications
• **Home Improvements & Structural Alterations (HISA)** - Medical necessity modifications

[MILITARY_TECH] **EXPERT VA COORDINATION**
• **Benefit Application Support** - Expert paperwork assistance
• **VA Inspector Coordination** - Streamlined approval process
• **Construction Timeline Management** - VA requirement compliance
• **Documentation Support** - Comprehensive record management

**VETERAN FINANCING STRATEGIES:**
• **Zero Down Payment** - VA loan advantage for qualified veterans
• **No PMI Required** - Additional cost savings benefit
• **Competitive Interest Rates** - VA-backed loan advantages
• **Flexible Credit Requirements** - Veteran-friendly qualification standards

[CHECK_CIRCLE] **MH CONSTRUCTION VA EXPERTISE**
Our veteran-owned team has successfully coordinated over 150 VA-funded construction projects. We understand VA requirements, timelines, and inspection protocols.

**VA BENEFIT TACTICAL ADVANTAGE:**
We handle all VA coordination so you can focus on enjoying your new construction project. From initial application to final inspection, we're your construction allies in the VA system.

**Ready to activate your VA construction benefits?**`;
  }

  private getPTSDFocusedAdvice(
    _input: string,
    _veteranProfile?: VeteranProfile,
  ): string {
    return `**PTSD-AWARE CONSTRUCTION PROTOCOL** [HEALING]

[SHIELD] **THERAPEUTIC ENVIRONMENT DESIGN**

**PTSD-Focused Construction Elements:**
• **Sound Dampening** - Noise reduction for peaceful environment
• **Natural Light Optimization** - Circadian rhythm support
• **Open Floor Plans** - Reduced claustrophobia and improved sight lines
• **Calming Color Schemes** - Psychologically supportive environments
• **Private Retreat Spaces** - Dedicated decompression areas
• **Smooth Textures** - Sensory-friendly material selection
• **Temperature Control Zones** - Comfort regulation systems

[MILITARY_TECH] **VETERAN WELLNESS INTEGRATION**
• **Therapy Room Construction** - Dedicated mental health space
• **Exercise Area Design** - Physical fitness for mental wellness
• **Meditation/Prayer Space** - Spiritual wellness accommodation
• **Garden/Outdoor Therapy Areas** - Nature-based healing environment

**CONSTRUCTION APPROACH MODIFICATIONS:**
• **Predictable Scheduling** - No surprise construction activities
• **Noise Minimization** - Reduced construction impact
• **Clear Communication** - Daily progress briefings
• **Veteran Team Members** - Understanding construction crew
• **Flexible Timeline** - Accommodation for difficult days

[HANDSHAKE] **VETERAN-TO-VETERAN UNDERSTANDING**
Our veteran-owned team includes combat veterans who understand PTSD challenges. We create construction environments and finished spaces that support healing and recovery.

**CONFIDENTIAL CONSULTATION AVAILABLE**
All PTSD-related construction discussions are handled with complete confidentiality and veteran-to-veteran understanding.

**Ready to build your healing environment?**`;
  }

  private getGeneralVeteranGuidance(
    _input: string,
    _veteranProfile?: VeteranProfile,
  ): string {
    return `**VETERAN TACTICAL SUPPORT CENTER** [MILITARY_TECH]

[SHIELD] **VETERAN-OWNED CONSTRUCTION EXCELLENCE**

**Service Member Advantages:**
• **12% Veteran Discount** - Automatic service appreciation
• **Priority Scheduling** - Fast-track project timeline
• **Veteran Team Members** - Military precision and understanding
• **VA Benefit Coordination** - Expert financing assistance

**Military-Standard Construction:**
• **Attention to Detail** - Military precision in every project
• **Timeline Discipline** - On-schedule mission completion
• **Quality Standards** - No shortcuts, maximum durability
• **Clear Communication** - Regular progress briefings

[HANDSHAKE] **VETERAN-TO-VETERAN COMMITMENT**
"We Work With You" takes on special meaning for our veteran clients. We understand military culture, attention to detail, and the importance of following through on commitments.

**Special Veteran Services:**
• **Free Consultation** - No-cost tactical assessment
• **Flexible Payment Options** - Veteran-friendly financing
• **Emergency Response** - Priority support for urgent needs
• **Long-term Warranty** - Extended protection for service members

**Ready to experience veteran-owned construction excellence?**`;
  }
}
