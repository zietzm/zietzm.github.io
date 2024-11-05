import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import faviconUrl from "@/assets/favicon.svg";
import Socials from "@/components/socials";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/publications", label: "Publications" },
    // { href: "/projects", label: "Projects" },
  ];

  return (
    <div
      className={`w-full mx-auto sticky top-0 ${isOpen ? "bg-accent" : "bg-background"} ${
        isScrolled ? "shadow-sm border-b md:border-b md:shadow-none" : ""
      }`}
    >
      <div
        className={`w-full mx-auto px-4 flex flex-row max-w-4xl justify-between h-16 items-center w-full ${isOpen ? "bg-accent" : "bg-background"}`}
      >
        <Link
          href="/"
          className="dark:border dark:border-1 dark:rounded-md dark:border-white"
        >
          <Image alt="logo" src={faviconUrl} className="h-8 w-8 mx-2 md:mx-0" />
        </Link>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full border">
                <Menu className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-screen h-screen border-0 rounded-none bg-accent px-4">
              <div className="h-16 flex items-center">
                <Link href="/">
                  <Image alt="logo" src={faviconUrl} className="h-8 w-8 mx-2" />
                </Link>
              </div>
              <nav className="mt-40 w-full flex flex-col gap-8 mt-6 text-lg pl-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-secondary no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator />
                <Socials />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-2">
          <nav className="flex gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary/90 hover:bg-primary/10 no-underline rounded-lg px-2 py-1 ${
                  pathname === link.href
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
