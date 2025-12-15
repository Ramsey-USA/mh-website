import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Image from "next/image";

const coreValues = [
  {
    value: "Honesty",
    icon: "verified",
    tagline: "Clear Communication Every Time",
    description:
      "Full transparency—truthful assessments, open communication, honest intel. Upfront discussion of challenges and obstacles. Real-time updates on timeline or budget changes. Honest assessment when a project isn't the right fit. Complete cost breakdown before starting. Straight talk, no jargon.",
    image: "/images/values/honesty.jpg",
    iconBg: "bg-brand-secondary",
    stats: "100% Transparent Pricing",
  },
  {
    value: "Integrity",
    icon: "shield",
    tagline: "Doing What's Right",
    description:
      "Strong ethics—doing what's right even when no one's watching. Using specified materials and methods without substitutions. Comprehensive warranties—we stand behind our work. Making decisions that benefit clients, not just our bottom line. Following through on commitments even when circumstances change. No shortcuts, period.",
    image: "/images/values/integrity.jpg",
    iconBg: "bg-primary-700",
    stats: "Unwavering Ethics",
  },
  {
    value: "Professionalism",
    icon: "business_center",
    tagline: "Excellence in Action",
    description:
      "On time, prepared, and ready—zero excuses. Arriving on time and prepared. Clear communication in all interactions. Proper site management and organization. Treating your property with respect. Maintaining industry credentials and continuous improvement.",
    image: "/images/values/professionalism.jpg",
    iconBg: "bg-brand-primary",
    stats: "Expert Service Standards",
  },
  {
    value: "Thoroughness",
    icon: "task_alt",
    tagline: "No Detail Left Behind",
    description:
      "Meticulous planning and execution—complete documentation, zero surprises. Detailed site analysis and planning. Precision measurements and calculations. Systematic quality checkpoints at every phase. Complete documentation with photo records. Comprehensive final review with detailed punch lists.",
    image: "/images/values/thoroughness.jpg",
    iconBg: "bg-primary-600",
    stats: "Zero Details Missed",
  },
];

/**
 * Core Values Section
 * Displays the four foundational principles with alternating image/text layouts
 */
export function CoreValuesSection() {
  return (
    <section
      id="core-values"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Unique Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Section Header with Side Accents */}
        <SectionHeader
          icon="shield"
          iconVariant="primary"
          subtitle="Veteran-Owned Values"
          title="Built on Honesty & Integrity"
          description="Four foundational values guide every project and partnership—focused on building for the client, NOT the dollar."
        />

        {/* Stacked Value Cards with Alternating Layout */}
        <div className="space-y-12 lg:space-y-16">
          {coreValues.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.value}
                className="scroll-reveal group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:grid lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
                  {/* Image Side */}
                  <div
                    className={`relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] overflow-hidden ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.value} - ${item.tagline}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Overlay gradient for better icon visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"></div>

                    {/* Icon Badge on Image */}
                    <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-xl rounded-2xl"></div>
                        <div
                          className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${item.iconBg} rounded-2xl flex items-center justify-center shadow-xl`}
                        >
                          <MaterialIcon
                            icon={item.icon}
                            size="xl"
                            className="text-white"
                            interactive
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="space-y-4 lg:space-y-5">
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl lg:text-3xl leading-tight tracking-tight mb-2">
                          {item.value}
                        </h3>
                        <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-base sm:text-lg lg:text-xl">
                          {item.tagline}
                        </p>
                      </div>

                      <p className="font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-base leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex-shrink-0">
                          <MaterialIcon
                            icon="analytics"
                            size="md"
                            className="text-brand-primary dark:text-brand-primary-light"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Key Metric
                          </p>
                          <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-gray-100">
                            {item.stats}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
