import headshotUrl from "@/assets/headshot.jpg";
import { ExternalLink } from "lucide-react";
import Socials from "@/components/socials";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-wrap justify-center gap-10 pt-12">
      <div className="flex flex-col gap-6 items-center basis-full md:basis-1/4">
        <Image
          src={headshotUrl}
          alt="headshot"
          className="w-2/3 md:w-full rounded-full drop-shadow-md -z-50"
        />
        <Socials />
      </div>
      <div className="flex flex-col basis-full md:basis-2/3 gap-6">
        <h1 className="text-center md:text-left">Michael Zietz</h1>
        <h3 className="text-center md:text-left">Research Data Scientist</h3>
        <div className="flex flex-col gap-6 text-lg leading-normal">
          <p>
            I&apos;m a researcher at{" "}
            <a
              href="https://www.cedars-sinai.edu/health-sciences-university/research/departments-institutes/computational-biomedicine.html"
              target="_blank"
              rel="noreferrer"
            >
              Cedars-Sinai Medical Center
            </a>
            . I develop new statistical and artificial intelligence methods for
            analyzing genetic and electronic health record data.
          </p>
          <p>Here are a couple projects I&apos;m most proud to highlight:</p>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <a
                href="https://webgwas.org"
                target="_blank"
                rel="noreferrer"
                className="flex gap-1 inline-flex no-underline"
              >
                <b>WebGWAS</b>
                <span className="flex items-center">
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>{" "}
              - A new statistical method I developed and implemented in a free
              public website. WebGWAS gives researchers access to a common
              genetic analysis in seconds instead of days, without needing to
              download private data.{" "}
              {/*<Link href="/projects#webgwas">Read more</Link>.*/}
            </li>
            <li>
              <b>MaxGCP</b> - A data-driven method for defining disease states
              in observational data. MaxGCP is a new statistical method that
              gives a principled way to incorporate rich, high-dimensional data,
              boosting statistical power for common genetic tests.{" "}
              {/*<Link href="/projects#maxgcp">Read more</Link>.*/}
            </li>
            {/*<li>
              <b>COVID blood type study</b> - I led one of the first studies in
              early 2020 that investigated links between blood type and COVID-19
              severity. My advisor and I were interviewed by the New York Times
              for this work, which has received over 200 citations and over
              700,000 views.
            </li>*/}
          </ol>
          <div className="flex flex-col">
            <b>Education</b>
            <ul className="list-disc list-inside">
              <li>PhD - Columbia University, Biomedical Informatics</li>
              <li>MS - University of Pennsylvania, Physics</li>
              <li>BA - University of Pennsylvania, Physics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
