import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Globe, FileCode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import AltmetricEmbed from "./altmetric";

export interface PublicationLinks {
  abstract: string;
  html: string;
  pdf: string;
}

export interface PublicationProps {
  /** The title of the publication */
  title: string;
  /** List of author names */
  authors: string[];
  /** Name of the journal or publication venue */
  journal: string;
  /** Publication year */
  year: string;
  /** Volume number */
  volume?: string;
  /** Issue number */
  issue?: string;
  /** Digital Object Identifier */
  doi: string;
  /** URLs for different versions of the paper */
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
    <Card className="w-full max-w-7xl">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-3">{title}</h2>

            {/* Authors */}
            <p className="text-sm text-gray-600 mb-2">
              {authors.map((author, index) => (
                <span key={author}>
                  {author === "Michael Zietz" ? (
                    <b className="underline">Michael Zietz</b>
                  ) : (
                    author
                  )}
                  {index < authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            {/* Journal Info */}
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">{journal}</span>
              {` (${year})`}
              {volume && issue && `, ${volume}(${issue})`}
            </p>

            {/* Links Section */}
            <div className="flex gap-2 mb-4">
              <TooltipProvider>
                <Popover>
                  <PopoverTrigger asChild>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild>
                          <a className="flex items-center gap-1 no-underline">
                            <FileText className="h-4 w-4" />
                            Abstract
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View Abstract</TooltipContent>
                    </Tooltip>
                  </PopoverTrigger>
                  <PopoverContent className="w-[600px]">
                    {links.abstract}
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={links.html}
                        className="flex items-center gap-1 no-underline"
                      >
                        <Globe className="h-4 w-4" />
                        HTML
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View Online</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={links.pdf}
                        className="flex items-center gap-1 no-underline"
                      >
                        <FileCode className="h-4 w-4" />
                        PDF
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download PDF</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* DOI Badge */}
            <Badge
              variant="secondary"
              className="text-xs bg-accent hover:bg-accent/90"
            >
              <a
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                DOI: {doi}
              </a>
            </Badge>
          </div>

          {/* Citations and Metrics */}
          <div className="flex flex-col items-end gap-2">
            <AltmetricEmbed doi={doi} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
