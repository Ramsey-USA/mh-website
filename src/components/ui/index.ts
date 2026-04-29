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
export { ThemeToggle } from "./layout/ThemeToggle";

// Modal Components
export { AdminSignInModal } from "./modals/AdminSignInModal";
export { Modal } from "./modals/Modal";
export { JobApplicationModal } from "./modals/JobApplicationModal";

// Media Components
export { OptimizedImage } from "./media/OptimizedImage";

// Interactive Components
export { AnimatedCounter } from "./AnimatedCounter";
export { IconContainer } from "./IconContainer";
export { GlowEffect } from "./GlowEffect";

// Content Components
export { ContentCard, type ContentCardProps } from "./ContentCard";
export { Timeline, type TimelineStep, type TimelineProps } from "./Timeline";
export {
  AlternatingShowcase,
  type AlternatingShowcaseItem,
} from "./AlternatingShowcase";

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
