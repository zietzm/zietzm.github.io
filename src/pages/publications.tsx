import Publication, { PublicationProps } from "@/components/publication";
import Head from "next/head";
import Script from "next/script";

const publications: PublicationProps[] = [
  {
    title:
      "Estimating the heritability of SARS-CoV-2 susceptibility and COVID-19 severity",
    authors: [
      "Kathleen LaRow Brown",
      "Vijendra Ramlall",
      "Michael Zietz",
      "Undina Gisladottir",
      "Nicholas P. Tatonetti",
    ],
    journal: "Nature Communications",
    year: "2024",
    volume: "15",
    issue: "367",
    doi: "10.1038/s41467-023-44250-7",
    links: {
      abstract:
        "SARS-CoV-2 has infected over 340 million people, prompting therapeutic research. While genetic studies can highlight potential drug targets, understanding the heritability of SARS-CoV-2 susceptibility and COVID-19 severity can contextualize their results. To date, loci from meta-analyses explain 1.2% and 5.8% of variation in susceptibility and severity respectively. Here we estimate the importance of shared environment and additive genetic variation to SARS-CoV-2 susceptibility and COVID-19 severity using pedigree data, PCR results, and hospitalization information. The relative importance of genetics and shared environment for susceptibility shifted during the study, with heritability ranging from 33% (95% CI: 20%-46%) to 70% (95% CI: 63%-74%). Heritability was greater for days hospitalized with COVID-19 (41%, 95% CI: 33%-57%) compared to shared environment (33%, 95% CI: 24%-38%). While our estimates suggest these genetic architectures are not fully understood, the shift in susceptibility estimates highlights the challenge of estimation during a pandemic, given environmental fluctuations and vaccine introduction.",
      html: "https://doi.org/10.1038/s41467-023-44250-7",
      pdf: "https://www.nature.com/articles/s41467-023-44250-7.pdf",
    },
  },
  {
    title:
      "The probability of edge existence due to node degree: a baseline for network-based predictions",
    authors: [
      "Michael Zietz",
      "Daniel S. Himmelstein",
      "Kyle Kloster",
      "Christopher Williams",
      "Michael W. Nagle",
      "Casey S. Greene",
    ],
    journal: "GigaScience",
    year: "2024",
    volume: "13",
    issue: "giae001",
    doi: "10.1093/gigascience/giae001",
    links: {
      abstract:
        "Important tasks in biomedical discovery such as predicting gene functions, gene–disease associations, and drug repurposing opportunities are often framed as network edge prediction. The number of edges connecting to a node, termed degree, can vary greatly across nodes in real biomedical networks, and the distribution of degrees varies between networks. If degree strongly influences edge prediction, then imbalance or bias in the distribution of degrees could lead to nonspecific or misleading predictions. We introduce a network permutation framework to quantify the effects of node degree on edge prediction. Our framework decomposes performance into the proportions attributable to degree and the network’s specific connections using network permutation to generate features that depend only on degree. We discover that performance attributable to factors other than degree is often only a small portion of overall performance. Researchers seeking to predict new or missing edges in biological networks should use our permutation approach to obtain a baseline for performance that may be nonspecific because of degree. We released our methods as an open-source Python package (https://github.com/hetio/xswap/).",
      html: "https://doi.org/10.1093/gigascience/giae001",
      pdf: "https://academic.oup.com/gigascience/article-pdf/doi/10.1093/gigascience/giae001/56609974/giae001.pdf",
    },
  },
  {
    title:
      "Hetnet connectivity search provides rapid insights into how biomedical entities are related",
    authors: [
      "Daniel S. Himmelstein",
      "Michael Zietz",
      "Vincent Rubinetti",
      "Kyle Kloster",
      "Benjamin J. Heil",
      "Faisal Alquaddoomi",
      "Dongbo Hu",
      "David N. Nicholson",
      "Yun Hao",
      "Blair D. Sullivan",
      "Michael W. Nagle",
      "Casey S. Greene",
    ],
    journal: "Gigascience",
    year: "2023",
    volume: "12",
    issue: "giad047",
    doi: "10.1093/gigascience/giad047",
    links: {
      abstract:
        "Hetnets, short for 'heterogeneous networks,' contain multiple node and relationship types and offer a way to encode biomedical knowledge. One such example, Hetionet, connects 11 types of nodes—including genes, diseases, drugs, pathways, and anatomical structures—with over 2 million edges of 24 types. Previous work has demonstrated that supervised machine learning methods applied to such networks can identify drug repurposing opportunities. However, a training set of known relationships does not exist for many types of node pairs, even when it would be useful to examine how nodes of those types are meaningfully connected. For example, users may be curious about not only how metformin is related to breast cancer but also how a given gene might be involved in insomnia. We developed a new procedure, termed hetnet connectivity search, that proposes important paths between any 2 nodes without requiring a supervised gold standard. The algorithm behind connectivity search identifies types of paths that occur more frequently than would be expected by chance (based on node degree alone). Several optimizations were required to precompute significant instances of node connectivity at the scale of large knowledge graphs. We implemented the method on Hetionet and provide an online interface at https://het.io/search. We provide an open-source implementation of these methods in our new Python package named hetmatpy.",
      html: "https://doi.org/10.1093/gigascience/giad047",
      pdf: "https://academic.oup.com/gigascience/article-pdf/doi/10.1093/gigascience/giad047/51838433/giad047.pdf",
    },
  },
  {
    title:
      "Shotgun transcriptome, spatial omics, and isothermal profiling of SARS-CoV-2 infection reveals unique host responses, viral diversification, and drug interactions",
    authors: [
      "Christopher Mozsary",
      "Cem Meydan",
      "Jonathan Foox",
      "Joel Rosiene",
      "Alon Shaiber",
      "David Danko",
      "Ebrahim Afshinnekoo",
      "Matthew MacKay",
      "Fritz J. Sedlazeck",
      "Nikolay A. Ivanov",
      "Maria Sierra",
      "Diana Pohle",
      "Michael Zietz",
      "Undina Gisladottir",
      "Vijendra Ramlall",
      "Evan T. Sholle",
      "Edward J. Schenck",
      "Craig D. Westover",
      "Ciaran Hassan",
      "Krista Ryon",
      "Benjamin Young",
      "Chandrima Bhattacharya",
      "Dianna L. Ng",
      "Andrea C. Granados",
      "Yale A. Santos",
      "Venice Servellita",
      "Scot Federman",
      "Phyllis Ruggiero",
      "Arkarachai Fungtammasan",
      "Chen-Shan Chin",
      "Nathaniel M. Pearson",
      "Bradley W. Langhorst",
      "Nathan A. Tanner",
      "Youngmi Kim",
      "Jason W. Reeves",
      "Tyler D. Hether",
      "Sarah E. Warren",
      "Michael Bailey",
      "Justyna Gawrys",
      "Dmitry Meleshko",
      "Dong Xu",
      "Mara Couto-Rodriguez",
      "Dorottya Nagy-Szakal",
      "Joseph Barrows",
      "Heather Wells",
      "Niamh B. O’Hara",
      "Jeffrey A. Rosenfeld",
      "Ying Chen",
      "Peter A.D. Steel",
      "Amos J. Shemesh",
      "Jenny Xiang",
      "Jean Thierry-Mieg",
      "Danielle Thierry-Mieg",
      "Angelika Iftner",
      "Daniela Bezdan",
      "Elizabeth Sanchez",
      "Thomas R. Campion Jr.",
      "John Sipley",
      "Lin Cong",
      "Arryn Craney",
      "Priya Velu",
      "Ari M. Melnick",
      "Sagi Shapira",
      "Iman Hajirasouliha",
      "Alain Borczuk",
      "Thomas Iftner",
      "Mirella Salvatore",
      "Massimo Loda",
      "Lars F. Westblade",
      "Melissa Cushing",
      "Shixiu Wu",
      "Shawn Levy",
      "Charles Chiu",
      "Robert E. Schwartz",
      "Nicholas Tatonetti",
      "Hanna Rennert",
      "Marcin Imielinski",
      "Christopher E. Mason",
    ],
    journal: "Nature Communications",
    year: "2021",
    volume: "12",
    issue: "1660",
    doi: "10.1038/s41467-021-21361-7",
    links: {
      abstract:
        "In less than nine months, the Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2) killed over a million people, including >25,000 in New York City (NYC) alone. The COVID-19 pandemic caused by SARS-CoV-2 highlights clinical needs to detect infection, track strain evolution, and identify biomarkers of disease course. To address these challenges, we designed a fast (30-minute) colorimetric test (LAMP) for SARS-CoV-2 infection from naso/oropharyngeal swabs and a large-scale shotgun metatranscriptomics platform (total-RNA-seq) for host, viral, and microbial profiling. We applied these methods to clinical specimens gathered from 669 patients in New York City during the first two months of the outbreak, yielding a broad molecular portrait of the emerging COVID-19 disease. We find significant enrichment of a NYC-distinctive clade of the virus (20C), as well as host responses in interferon, ACE, hematological, and olfaction pathways. In addition, we use 50,821 patient records to find that renin–angiotensin–aldosterone system inhibitors have a protective effect for severe COVID-19 outcomes, unlike similar drugs. Finally, spatial transcriptomic data from COVID-19 patient autopsy tissues reveal distinct ACE2 expression loci, with macrophage and neutrophil infiltration in the lungs. These findings can inform public health and may help develop and drive SARS-CoV-2 diagnostic, prevention, and treatment strategies.",
      html: "https://doi.org/10.1038/s41467-021-21361-7",
      pdf: "https://www.nature.com/articles/s41467-021-21361-7.pdf",
    },
  },
  {
    title:
      "Associations between blood type and COVID-19 infection, intubation, and death",
    authors: ["Michael Zietz", "Jason Zucker", "Nicholas P. Tatonetti"],
    journal: "Nature Communications",
    year: "2020",
    volume: "11",
    issue: "5761",
    doi: "10.1038/s41467-020-19623-x",
    links: {
      abstract:
        "The rapid global spread of the novel coronavirus SARS-CoV-2 has strained healthcare and testing resources, making the identification and prioritization of individuals most at-risk a critical challenge. Recent evidence suggests blood type may affect risk of severe COVID-19. Here, we use observational healthcare data on 14,112 individuals tested for SARS-CoV-2 with known blood type in the New York Presbyterian (NYP) hospital system to assess the association between ABO and Rh blood types and infection, intubation, and death. We find slightly increased infection prevalence among non-O types. Risk of intubation was decreased among A and increased among AB and B types, compared with type O, while risk of death was increased for type AB and decreased for types A and B. We estimate Rh-negative blood type to have a protective effect for all three outcomes. Our results add to the growing body of evidence suggesting blood type may play a role in COVID-19.",
      html: "https://doi.org/10.1038/s41467-020-19623-x",
      pdf: "https://www.nature.com/articles/s41467-020-19623-x.pdf",
    },
  },
  {
    title:
      "Compressing gene expression data using multiple latent space dimensionalities learns complementary biological representations",
    authors: [
      "Gregory P. Way",
      "Michael Zietz",
      "Vincent Rubinetti",
      "Daniel S. Himmelstein",
      "Casey S. Greene",
    ],
    journal: "Genome Biology",
    year: "2020",
    volume: "21",
    issue: "109",
    doi: "10.1186/s13059-020-02021-3",
    links: {
      abstract:
        "Unsupervised compression algorithms applied to gene expression data extract latent or hidden signals representing technical and biological sources of variation. However, these algorithms require a user to select a biologically appropriate latent space dimensionality. In practice, most researchers fit a single algorithm and latent dimensionality. We sought to determine the extent by which selecting only one fit limits the biological features captured in the latent representations and, consequently, limits what can be discovered with subsequent analyses. We compress gene expression data from three large datasets consisting of adult normal tissue, adult cancer tissue, and pediatric cancer tissue. We train many different models across a large range of latent space dimensionalities and observe various performance differences. We identify more curated pathway gene sets significantly associated with individual dimensions in denoising autoencoder and variational autoencoder models trained using an intermediate number of latent dimensionalities. Combining compressed features across algorithms and dimensionalities captures the most pathway-associated representations. When trained with different latent dimensionalities, models learn strongly associated and generalizable biological representations including sex, neuroblastoma MYCN amplification, and cell types. Stronger signals, such as tumor type, are best captured in models trained at lower dimensionalities, while more subtle signals such as pathway activity are best identified in models trained with more latent dimensionalities. There is no single best latent dimensionality or compression algorithm for analyzing gene expression data. Instead, using features derived from different compression models across multiple latent space dimensionalities enhances biological representations.",
      html: "https://doi.org/10.1186/s13059-020-02021-3",
      pdf: "https://link.springer.com/content/pdf/10.1186/s13059-020-02021-3.pdf",
    },
  },
  {
    title:
      "Opportunities and obstacles for deep learning in biology and medicine",
    authors: [
      "Travers Ching",
      "Daniel S. Himmelstein",
      "Brett K. Beaulieu-Jones",
      "Alexandr A. Kalinin",
      "Brian T. Do",
      "Gregory P. Way",
      "Enrico Ferrero",
      "Paul-Michael Agapow",
      "Michael Zietz",
      "Michael M. Hoffman",
      "Wei Xie",
      "Gail L. Rosen",
      "Benjamin J. Lengerich",
      "Johnny Israeli",
      "Jack Lanchantin",
      "Stephen Woloszynek",
      "Anne E. Carpenter",
      "Avanti Shrikumar",
      "Jinbo Xu",
      "Evan M. Cofer",
      "Christopher A. Lavender",
      "Srinivas C. Turaga",
      "Amr M. Alexandari",
      "Zhiyong Lu",
      "David J. Harris",
      "Dave DeCaprio",
      "Yanjun Qi",
      "Anshul Kundaje",
      "Yifan Peng",
      "Laura K. Wiley",
      "Marwin H. S. Segler",
      "Simina M. Boca",
      "S. Joshua Swamidass",
      "Austin Huang",
      "Anthony Gitter",
      "Casey S. Greene",
    ],
    journal: "Journal of the Royal Society Interface",
    year: "2018",
    volume: "15",
    issue: "141",
    doi: "10.1098/rsif.2017.0387",
    links: {
      abstract:
        "Deep learning describes a class of machine learning algorithms that are capable of combining raw inputs into layers of intermediate features. These algorithms have recently shown impressive results across a variety of domains. Biology and medicine are data-rich disciplines, but the data are complex and often ill-understood. Hence, deep learning techniques may be particularly well suited to solve problems of these fields. We examine applications of deep learning to a variety of biomedical problems—patient classification, fundamental biological processes and treatment of patients—and discuss whether deep learning will be able to transform these tasks or if the biomedical sphere poses unique challenges. Following from an extensive literature review, we find that deep learning has yet to revolutionize biomedicine or definitively resolve any of the most pressing challenges in the field, but promising advances have been made on the prior state of the art. Even though improvements over previous baselines have been modest in general, the recent progress indicates that deep learning methods will provide valuable means for speeding up or aiding human investigation. Though progress has been made linking a specific neural network's prediction to input features, understanding how users should interpret these models to make testable hypotheses about the system under study remains an open challenge. Furthermore, the limited amount of labelled data for training presents problems in some domains, as do legal and privacy constraints on work with sensitive health records. Nonetheless, we foresee deep learning enabling changes at both bench and bedside with the potential to transform several areas of biology and medicine.",
      html: "https://doi.org/10.1098/rsif.2017.0387",
      pdf: "https://royalsocietypublishing.org/doi/epdf/10.1098/rsif.2017.0387",
    },
  },
];

export default function Publications() {
  return (
    <div className="flex flex-col gap-6">
      <Head>
        <title>Michael Zietz | Publications</title>
      </Head>
      <h1 className="text-center md:text-left">Publications</h1>
      <div className="grid grid-cols-1 gap-6">
        {publications.map((publication) => (
          <Publication key={publication.title} {...publication} />
        ))}
      </div>
      <Script
        type="text/javascript"
        src="https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js"
      ></Script>
    </div>
  );
}
