import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "./SmoothScroll";

const LINKS = [
  { href: "#topo", id: "topo", label: "Início" },
  { href: "#projetos", id: "projetos", label: "Projetos" },
  { href: "#sobre", id: "sobre", label: "Sobre" },
  { href: "#contato", id: "contato", label: "Contato" },
];

const NavBar = () => {

  const [active, setActive] = useState("topo");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  function handleNavClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (lenis && target) {
      lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView();
    }
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);

    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${scrolled ? "bg-bg/80 backdrop-blur-md border-b border-line" : "bg-transparent"
        }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-10 h-20">
        <a 
          href="#topo" 
          onClick={(e) => handleNavClick(e, "topo")}
          className="font-display font-bold text-xl text-gradient">
          Matheus
        </a>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm">
          {LINKS.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.id)}
                className={`transition-colors ${
                  active === l.id ? "text-text" : "text-textdim hover:text-text"
                  }`}
              >
                {l.label}
              </a>
              {active === l.id && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet to-blue rounded-full" />
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-line text-text"
        >
          <svg width='18' height='18' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Painel do menu mobile: só existe no DOM quando mobileOpen é true */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-md border-b border-line"
          >
            {LINKS.map((l) => (
              <li key={l.id}>
                <a 
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.id)}
                  className={`block px-6 sm:px-10 py-4 font-body text-sm ${
                    active === l.id ? "text-text" : "text-textdim"
                  }`}
                  >
                    {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavBar