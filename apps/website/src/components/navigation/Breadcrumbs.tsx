import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumb";

export type BreadcrumbsItem = BreadcrumbItem;

interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: Readonly<BreadcrumbsProps>) {
  return <Breadcrumb items={items} className={className ?? ""} />;
}
