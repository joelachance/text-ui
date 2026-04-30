"use client";

import { useState, type ComponentProps, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

export type CtxLogoProps = ComponentProps<"div"> & {
  text?: string;
  fontClassName?: string;
};

export function CtxLogo({
  text = "ctx",
  className,
  fontClassName,
  "aria-label": ariaLabel = "CTX logo",
  role = "img",
  onPointerMove,
  onPointerLeave,
  ...props
}: CtxLogoProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    setOffset({ x: -nx, y: -ny });
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
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
      aria-label={ariaLabel}
      data-slot="ctx-logo"
      role={role}
      className={cn("relative", className)}
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
