import Head from "next/head";

const projects = [
  {
    title: "WebGWAS",
    description:
      "A new statistical method I developed and implemented in a free public website. WebGWAS gives researchers access to a common genetic analysis in seconds instead of days, without needing to download private data.",
  },
  {
    title: "MaxGCP",
    description:
      "A data-driven method for defining disease states in observational data. MaxGCP is a new statistical method that gives a principled way to incorporate rich, high-dimensional data, boosting statistical power for common genetic tests.",
  },
  {
    title: "COVID blood type study",
    description:
      "I led one of the first studies in early 2020 that investigated links between blood type and COVID-19 severity. My advisor and I were interviewed by the New York Times for this work, which has received over 200 citations and over 700,000 views.",
  },
];

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <Head>
        <title>Michael Zietz | Projects</title>
      </Head>
      <h1 className="text-left">Projects</h1>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <Project key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}

function Project({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div id={title} className="flex flex-col gap-6">
      <h2 className="text-left">{title}</h2>
      <p className="text-left">{description}</p>
    </div>
  );
}
