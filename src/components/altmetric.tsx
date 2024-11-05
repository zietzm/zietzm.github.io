import { useEffect, useRef } from "react";

interface AltmetricEmbedProps {
  doi: string;
  badgeType?: "donut" | "medium-donut" | "large-donut" | "bar" | "badge";
}

export default function AltmetricEmbed({
  doi,
  badgeType = "donut",
}: AltmetricEmbedProps) {
  const loaded = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (!loaded.current) {
      const script = document.createElement("script");
      script.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
      script.async = true;
      script.onload = () => {
        // After script loads, trigger Altmetric to process the badge
        if (window._altmetric) {
          window._altmetric.callbacks.load_badges();
        }
      };
      document.body.appendChild(script);
      loaded.current = true;
    } else {
      // If script is already loaded, just process the badge
      if (window._altmetric) {
        window._altmetric.callbacks.load_badges();
      }
    }

    // Cleanup
    return () => {
      if (loaded.current) {
        const existingScript = document.querySelector(
          'script[src="https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js"]',
        );
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
        loaded.current = false;
      }
    };
  }, []);

  return (
    <div
      className="altmetric-embed"
      data-badge-type={badgeType}
      data-doi={doi}
      data-link-target="_blank"
    />
  );
}

// Add necessary type for window._altmetric
declare global {
  interface Window {
    _altmetric?: {
      callbacks: {
        load_badges: () => void;
      };
    };
  }
}
