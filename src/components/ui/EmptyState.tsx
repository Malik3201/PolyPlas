import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "Nothing here yet",
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-4",
        className
      )}
    >
      <div className="w-20 h-20 rounded-3xl bg-cream-200 flex items-center justify-center mb-6">
        {icon || <PackageSearch size={32} className="text-brand-300" />}
      </div>
      <h3 className="font-display text-2xl text-ink mb-2">{title}</h3>
      {description && (
        <p className="text-ink-muted text-sm max-w-sm leading-relaxed mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
