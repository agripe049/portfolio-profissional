import { li } from "framer-motion/client";
import { useLenis } from "./SmoothScroll"
import TiltPhoto from "./TiltPhoto";
import { motion } from "framer-motion";

const STACK = ["React", "Vite", "Firebase", "Tailwind"];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/agripe049",
    icon: (
      <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0012 2z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matheus-agripe/",
    icon: (
      <>
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="4" r="2" />
        <path d="M11 9h3.6v1.9h.05c.5-.9 1.75-1.9 3.6-1.9 3.85 0 4.75 2.4 4.75 5.6V21h-4v-5.6c0-1.35 0-3.1-1.95-3.1-1.95 0-2.25 1.45-2.25 3v5.7h-4V9z" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5544998995803",
    icon: (
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.8 14.2c-.25.7-1.4 1.3-2.1 1.4-.55.1-1.25.15-4-.85-3.35-1.25-5.5-4.65-5.7-4.9-.15-.25-1.35-1.8-1.35-3.4s.85-2.4 1.15-2.7c.3-.3.65-.4.85-.4h.65c.2 0 .5-.05.75.6l.9 2.2c.1.25.15.4 0 .65-.1.25-.2.4-.35.6-.2.2-.35.4-.15.75.6 1 1.3 1.8 2.2 2.5 1 .8 1.4.9 1.7.9.25 0 .4-.1.6-.3l.85-1c.2-.25.45-.2.75-.1l1.95.95c.25.1.4.2.45.3.05.15.05.65-.2 1.35z" />
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Hero = () => {

  const lenis = useLenis();

  function scrollToSection(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (lenis && target) {
      lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView();
    }
  }


  return (
    <section id='topo' className='min-h-screen flex items-center'>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto w-full px-6 sm:px-10 pt-28 pb-16 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div className="">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-surface px-4 py-2 text-sm text-textdim mb-6">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#8B5CF6">
              <path d="M12 2l1.6 5.8L19 9l-5.4 1.2L12 16l-1.6-5.8L5 9l5.4-1.2z" />
            </svg>
            Disponível para novos projetos
          </motion.div>

          <motion.h1 variants={item} className="font-display font-bold text-5xl sm:text-6xl md:text-5xl leading-[1.05] text-text">
            Olá! Me chamo <span className='text-gradient'>Matheus Agripe</span>.
          </motion.h1>

          <motion.p variants={item} className="font-body text-xl text-text/80 mt-4">
            Crio sistemas que resolvem problema de verdade.
          </motion.p>

          <motion.p variants={item} className="font-body text-textdim mt-4 max-w-md leading-relaxed">
            Construo aplicações pra donos de barbearia,
            oficina e confeitaria. Sem departamento de TI, sem tempo pra planilha.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-2.5 mt-7">
            {STACK.map((s) => (
              <span
                key={s}
                className="px-4 py-1.5 rounded-full bg-surface border border-line text-sm text-textdim"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex gap-3 mt-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center text-textdim hover:text-violet hover:border-violet/50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {s.icon}
                </svg>
              </a>
            ))}
          </motion.div>


          <motion.div variants={item} className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projetos"
              onClick={(e) => scrollToSection(e, "projetos")}
              className="px-6 py-3 bg-text text-bg font-body font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, "contato")}
              className="px-6 py-3 bg-surface border border-line text-text font-body rounded-xl hover:border-violet/50 transition-colors"
            >
              Contato
            </a>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <TiltPhoto />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero