export default function AltmetricEmbed({ doi }: { doi: string }) {
  return (
    <div
      className="altmetric-embed"
      data-badge-type="donut"
      data-doi={doi}
      data-link-target="_blank"
    />
  );
}
