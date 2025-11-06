import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

const services = [
  {
    icon: "explore",
    title: "Construction Management",
    description:
      "Full Construction Management (CM) services throughout the Tri-Cities. We minimize 'on-the-fly' decisions through meticulous planning.",
    cta: "Call (509) 308-6489",
  },
  {
    icon: "architecture",
    title: "Master Planning",
    description:
      "Comprehensive Pre-Construction & Master Planning services. Transform your vision into a practical, buildable reality.",
    cta: "Learn More",
  },
  {
    icon: "build",
    title: "Commercial Buildings",
    description:
      "Complete Commercial Construction Services for offices, retail, and industrial facilities across WA, OR, and ID.",
    cta: "Learn More",
  },
  {
    icon: "straighten",
    title: "Medical Facilities",
    description:
      "Specialized medical facility construction and clinic design. Precision planning for healthcare environments.",
    cta: "Learn More",
  },
  {
    icon: "construction",
    title: "Light Industrial",
    description:
      "Safe, durable, and highly functional industrial buildings. Warehouses to processing plants built to your specifications.",
    cta: "Learn More",
  },
  {
    icon: "gps_fixed",
    title: "Tenant Improvements",
    description:
      "Expert Commercial Tenant Improvement (TI) Services. Transform your commercial space into a functional, beautiful environment.",
    cta: "Learn More",
  },
];

/**
 * Services Showcase Section
 * Grid display of core construction services
 */
export function ServicesShowcase() {
  return (
    <section className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16 showcase-section">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
      <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
      <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <FadeInWhenVisible className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Showcase of
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Services
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
            Discover our comprehensive construction management and commercial
            services throughout the{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Tri-Cities area
            </span>{" "}
            (Pasco, Kennewick, Richland). Each service represents our commitment
            to{" "}
            <span className="text-brand-primary font-semibold">
              partnership excellence
            </span>{" "}
            and collaborative success.
          </p>
        </FadeInWhenVisible>

        {/* Service Cards Grid */}
        <FadeInWhenVisible className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon={service.icon}
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  {service.title}
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
                  <span className="mr-2">{service.cta}</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
