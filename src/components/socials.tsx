import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleScholarIcon } from "./icons/google_scholar";

export default function Socials({
  iconStyle = "h-10 w-10 text-foreground hover:text-secondary",
}) {
  const socials = [
    {
      name: "email",
      url: "mailto:michael.zietz@gmail.com",
      icon: <FontAwesomeIcon icon={faEnvelopeSquare} className={iconStyle} />,
    },
    {
      name: "github",
      url: "https://github.com/zietzm",
      icon: <FontAwesomeIcon icon={faGithubSquare} className={iconStyle} />,
    },
    {
      name: "scholar",
      url: "https://scholar.google.com/citations?user=UsyldQoAAAAJ",
      icon: <GoogleScholarIcon className={iconStyle} />,
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/michaelzietz",
      icon: <FontAwesomeIcon icon={faLinkedin} className={iconStyle} />,
    },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-2xl"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
