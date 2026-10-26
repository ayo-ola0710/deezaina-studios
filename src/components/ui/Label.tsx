import { cn } from "@/lib/cn";

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        "font-body font-bold text-xs uppercase tracking-[0.3em] text-[var(--R)] inline-block select-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
