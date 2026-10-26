export interface SystemCapabilities {
  reduced: boolean;
  can3D: boolean;
  canCursor: boolean;
  canPin: boolean;
}

export function detectCapabilities(): SystemCapabilities {
  if (typeof window === "undefined") {
    return { can3D: false, canCursor: false, canPin: false, reduced: true };
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const saveData = nav.connection?.saveData === true;
  const lowMemory = (nav.deviceMemory ?? 8) < 4;
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;

  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webgl = false;
  }

  return {
    reduced,
    can3D: webgl && !reduced && !narrow && !saveData && !lowMemory && !lowCores,
    canCursor: finePointer && !reduced,
    canPin: !reduced && !narrow,
  };
}
