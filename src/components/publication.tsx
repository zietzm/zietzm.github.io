import { useState } from "react";
import AltmetricEmbed from "./icons/altmetric";

export interface PublicationLinks {
  abstract: string;
  html: string;
  pdf: string;
}

export interface PublicationProps {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume?: string;
  issue?: string;
  doi: string;
  links: PublicationLinks;
}

export default function Publication({
  title,
  authors,
  journal,
  year,
  volume,
  issue,
  doi,
  links,
}: PublicationProps) {
  return (
    <div className="w-full max-w-5xl rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col items-start gap-2">
        {/* Title */}
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Authors */}
        <Authors authors={authors} />

        {/* Journal Info */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">{journal}</span>
          {` (${year})`}
          {volume && issue && `, ${volume}(${issue})`}
        </p>

        {/* Links and DOI */}
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col gap-4">
            <Links links={links} />
            <DoiBadge doi={doi} />
          </div>
          <AltmetricEmbed doi={doi} />
        </div>
      </div>
    </div>
  );
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-gray-600">
      {authors.map((author, index) => (
        <span key={author}>
          {author === "Michael Zietz" ? (
            <strong className="underline">Michael Zietz</strong>
          ) : (
            author
          )}
          {index < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

function Links({ links }: { links: PublicationLinks }) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowAbstract(!showAbstract)}
          className="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Abstract
        </button>
        <a
          href={links.html}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm no-underline hover:bg-gray-50 dark:hover:bg-gray-800"
          target="_blank"
          rel="noreferrer"
        >
          HTML
        </a>
        <a
          href={links.pdf}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm no-underline hover:bg-gray-50 dark:hover:bg-gray-800"
          target="_blank"
          rel="noreferrer"
        >
          PDF
        </a>
      </div>

      {showAbstract && (
        <div className="rounded-md bg-muted p-4 text-sm">{links.abstract}</div>
      )}
    </div>
  );
}

function DoiBadge({ doi }: { doi: string }) {
  return (
    <a
      href={`https://doi.org/${doi}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex self-start rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 no-underline hover:bg-gray-200"
    >
      DOI: {doi}
    </a>
  );
}
