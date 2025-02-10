import { useEffect } from "react";

export default function AltmetricEmbed({ doi }: { doi: string }) {
  useEffect(() => {
    // After React mounts, re-scan the DOM for .altmetric-embed
    if (window._altmetric?.embed_badges) {
      window._altmetric.embed_badges();
    }
  }, [doi]);

  return (
    <div
      className="altmetric-embed"
      data-badge-type="donut"
      data-doi={doi}
      data-link-target="_blank"
    />
  );
}
