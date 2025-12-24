// Export all UI components for easy imports

// Base Components (shadcn/ui style)
export { Button } from "./base/button";
export { Badge } from "./base/badge";
export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./base/card";
export { Alert, AlertDescription, AlertTitle } from "./base/alert";
export { Progress } from "./base/progress";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./base/tabs";

// Form Components
export { Input, Textarea } from "./forms/Input";

// Layout Components
export { PageHero } from "./layout/PageHero";
export { LazyWrapper } from "./layout/LazyWrapper";
export { ThemeToggle } from "./layout/ThemeToggle";
export { LoadingPlaceholder } from "./layout/loading-placeholder";

// Modal Components
export { Modal } from "./modals/Modal";
export { QuickBookingModal } from "./modals/QuickBookingModal";
export { JobApplicationModal } from "./modals/JobApplicationModal";

// Media Components
export { OptimizedImage } from "./media/OptimizedImage";

// Interactive Components
export { AnimatedCounter } from "./AnimatedCounter";

// Loading Components
export {
  Skeleton,
  CardSkeleton,
  TeamMemberSkeleton,
  FormFieldSkeleton,
  TableRowSkeleton,
  ListItemSkeleton,
  PageHeaderSkeleton,
  HeroSkeleton,
  GridSkeleton,
} from "./Skeleton";
