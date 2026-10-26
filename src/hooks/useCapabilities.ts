"use client";

import { useEffect, useState } from "react";
import { detectCapabilities, type SystemCapabilities } from "@/lib/capabilities";

const defaultCapabilities: SystemCapabilities = {
  reduced: false,
  can3D: false,
  canCursor: false,
  canPin: false,
};

export function useCapabilities(): SystemCapabilities {
  const [capabilities, setCapabilities] =
    useState<SystemCapabilities>(defaultCapabilities);

  useEffect(() => {
    const update = () => {
      setCapabilities(detectCapabilities());
    };

    update();

    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaPointer = window.matchMedia("(pointer: fine)");
    const mediaWidth = window.matchMedia("(max-width: 767px)");

    mediaReduced.addEventListener("change", update);
    mediaPointer.addEventListener("change", update);
    mediaWidth.addEventListener("change", update);

    return () => {
      mediaReduced.removeEventListener("change", update);
      mediaPointer.removeEventListener("change", update);
      mediaWidth.removeEventListener("change", update);
    };
  }, []);

  return capabilities;
}
