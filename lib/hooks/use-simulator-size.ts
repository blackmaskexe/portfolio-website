"use client";

import { useEffect, useState } from "react";

interface SimulatorSize {
  width: number;
  height: number;
  phoneWidth: number;
  phoneHeight: number;
}

export function useSimulatorSize() {
  const [simulatorSize, setSimulatorSize] = useState<SimulatorSize>({
    width: 320,
    height: 632,
    phoneWidth: 320,
    phoneHeight: 632,
  });

  useEffect(() => {
    const calculateSize = () => {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Account for menu bar height (24px) and some padding
      const availableHeight = viewportHeight - 24 - 40; // 40px for padding
      const availableWidth = viewportWidth - 40; // 40px for padding

      // iPhone 16 Pro aspect ratio: 19.5:9
      const phoneAspectRatio = 19.5 / 9;

      // Title bar height
      const titleBarHeight = 56;

      // Gap between title bar and phone
      const gap = 8; // pt-2 = 8px

      // Calculate phone dimensions based on available space
      let phoneWidth: number;
      let phoneHeight: number;

      // Try fitting by height first
      const maxPhoneHeight = availableHeight - titleBarHeight - gap;
      phoneWidth = maxPhoneHeight / phoneAspectRatio;
      phoneHeight = maxPhoneHeight;

      // If it's too wide, fit by width instead
      if (phoneWidth > availableWidth) {
        phoneWidth = availableWidth;
        phoneHeight = phoneWidth * phoneAspectRatio;
      }

      // Ensure minimum size for usability
      const minPhoneWidth = 280;
      const minPhoneHeight = minPhoneWidth * phoneAspectRatio;

      if (phoneWidth < minPhoneWidth) {
        phoneWidth = minPhoneWidth;
        phoneHeight = minPhoneHeight;
      }

      // If the total simulator height is greater than the viewport, scale down to fit
      let totalWidth = phoneWidth;
      let totalHeight = phoneHeight + titleBarHeight + gap;

      if (totalHeight > viewportHeight) {
        // Calculate scale factor to fit simulator in viewport
        const scale = viewportHeight / totalHeight;
        phoneWidth = phoneWidth * scale;
        phoneHeight = phoneHeight * scale;
        totalWidth = phoneWidth;
        totalHeight = phoneHeight + titleBarHeight + gap;
      }

      setSimulatorSize({
        width: totalWidth,
        height: totalHeight,
        phoneWidth,
        phoneHeight,
      });
    };

    calculateSize();
    window.addEventListener("resize", calculateSize);

    return () => {
      window.removeEventListener("resize", calculateSize);
    };
  }, []);

  return simulatorSize;
}
