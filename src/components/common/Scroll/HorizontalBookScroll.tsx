import React from "react";
import { cn } from "@/utils/cn";

interface HorizontalBookScrollSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const HorizontalBookScrollSection: React.FC<HorizontalBookScrollSectionProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <section className={cn("w-full px-1 bg-beige1", className)}>
      <div className="flex items-center px-5 pt-4">
        <h2 className="text-title5">{title}</h2>
      </div>

      <div className="relative mt-3 px-5 pb-3">
        <div className="scrollbar-hidden overflow-x-auto">
          <div className="flex gap-5 pr-10">{children}</div>
        </div>

        <div
          className="
            pointer-events-none
            absolute right-5 top-0
            h-full w-12
            bg-gradient-to-l
            from-[var(--color-beige1)]
            to-transparent
          "
        />
      </div>
    </section>
  );
};

export default HorizontalBookScrollSection;
