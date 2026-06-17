import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpLeft } from "lucide-react";

type ModuleCardProps = {
  title: string;
  description: string;
  href: string;
  tone: string;
  icon: LucideIcon;
};

export function ModuleCard({ title, description, href, tone, icon: Icon }: ModuleCardProps) {
  return (
    <Link href={href} className={`module-card tone-${tone}`}>
      <span className="module-icon">
        <Icon size={22} />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <ArrowUpLeft size={18} />
    </Link>
  );
}
