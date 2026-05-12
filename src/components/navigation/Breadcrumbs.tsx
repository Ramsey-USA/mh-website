import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return <Breadcrumb items={items} className={className} />;
}
