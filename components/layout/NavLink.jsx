"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function NavLink({ href, label, className }) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex h-full items-center px-1 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-200",
        isActive
          ? "text-[var(--color-guinda)]"
          : "text-[var(--color-text)] hover:text-[var(--color-guinda)]",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative">
        {label}
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-[var(--color-dorado)]"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </Link>
  );
}

export default NavLink;
