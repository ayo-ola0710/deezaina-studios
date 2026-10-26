"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import Magnetic from "./Magnetic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "red" | "ghost";
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "red",
  href,
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = variant === "red" ? "btn-r" : "btn-ghost";
  const classes = cn(baseClasses, className);

  const content = href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <button className={classes} {...props}>
      {children}
    </button>
  );

  if (magnetic) {
    return <Magnetic>{content}</Magnetic>;
  }

  return content;
}
