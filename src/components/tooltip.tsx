"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
// import "./CustomTooltip.css"; // Assuming you have a CSS file for default styles

interface CustomTooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  position = "top",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Detect touch screen devices
  const isDeviceTouchFriendly = useCallback(() => {
    // Directly check for the presence of touch points
    if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) {
      return true;
    }
    if (
      "msMaxTouchPoints" in navigator &&
      (navigator.msMaxTouchPoints as number) > 0
    ) {
      return true;
    }

    // Use matchMedia to check for a coarse pointer (indicative of a touch screen)
    const matchQuery =
      window.matchMedia && window.matchMedia("(pointer:coarse)");
    if (matchQuery && matchQuery.matches) {
      return true;
    }

    // As a last resort, check for the deprecated orientation property
    if ("orientation" in window) {
      return true;
    }

    // Avoid user agent sniffing if possible as it's unreliable and not recommended
    return false;
  }, []);

  // Event handlers
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // Attach or detach event listeners based on device type
  useEffect(() => {
    const currentRef = tooltipRef.current;
    if (currentRef) {
      if (isDeviceTouchFriendly()) {
        currentRef.addEventListener("click", showTooltip);
        // Hide tooltip when clicking anywhere else
        document.addEventListener("click", (e) => {
          if (currentRef && !currentRef.contains(e.target as Node)) {
            hideTooltip();
          }
        });
      } else {
        currentRef.addEventListener("mouseenter", showTooltip);
        currentRef.addEventListener("mouseleave", hideTooltip);
      }
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("click", showTooltip);
        currentRef.removeEventListener("mouseenter", showTooltip);
        currentRef.removeEventListener("mouseleave", hideTooltip);
        document.removeEventListener("click", hideTooltip);
      }
    };
  }, [tooltipRef, isDeviceTouchFriendly]);

  return (
    <div className="tooltip-container" ref={tooltipRef}>
      {children}
      {isVisible && (
        <div className={`tooltip-content ${position} ${className}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
