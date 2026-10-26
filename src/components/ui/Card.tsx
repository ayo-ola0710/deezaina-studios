import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Card({
  children,
  className,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "card-neo p-6 sm:p-8 bg-[var(--K3)] border-2 border-[var(--W15)] transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
