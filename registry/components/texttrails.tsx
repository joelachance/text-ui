"use client";

/**
 * Layered stroke text that follows pointer movement. Content is the `text` string only
 * (not arbitrary children) so layers stay plain text. Depends on `cn` from registry `utils`.
 */
import * as React from "react";

import { cn } from "@/lib/utils";

export type TextTrailsProps = React.ComponentProps<"div"> & {
  text?: string;
  fontClassName?: string;
};

export function TextTrails({
  text = "text",
  className,
  fontClassName,
  "aria-label": ariaLabel,
  role = "img",
  onPointerMove,
  onPointerLeave,
  ...props
}: TextTrailsProps) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    setOffset({ x: -nx, y: -ny });
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);

    if (event.defaultPrevented) {
      return;
    }

    setOffset({ x: 0, y: 0 });
  };

  const layerClassName = cn(
    "text-foreground pointer-events-none absolute inset-0 text-[180px] leading-none font-medium transition-transform duration-300 ease-out",
    fontClassName,
  );

  const baseClassName = cn(
    "text-foreground relative text-[180px] leading-none font-medium",
    fontClassName,
  );

  return (
    <div
      aria-label={ariaLabel ?? text}
      data-slot="texttrails"
      role={role}
      className={cn("relative select-none", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <p
        aria-hidden
        className={layerClassName}
        style={{
          WebkitTextStroke: "2px currentColor",
          WebkitTextFillColor: "transparent",
          transform: `translate(${offset.x * 32}px, ${offset.y * 32}px)`,
        }}
      >
        {text}
      </p>
      <p
        aria-hidden
        className={layerClassName}
        style={{
          WebkitTextStroke: "2px currentColor",
          WebkitTextFillColor: "transparent",
          transform: `translate(${offset.x * 16}px, ${offset.y * 16}px)`,
        }}
      >
        {text}
      </p>
      <p aria-hidden className={baseClassName}>
        {text}
      </p>
    </div>
  );
}
