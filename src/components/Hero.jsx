import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "./SmoothScroll";
import perfil from "../assets/perfil.jpeg";
import barbeariaMob from "../assets/barbearia-mob.webp";
import cineMob from "../assets/cine-mob.webp";
import psaMob from "../assets/psa-mob.webp";

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
];

// Os 3 projetos que giram na órbita
const ORBIT = [
  {
    image: barbeariaMob,
    alt: "Agenda online da Barbearia Sr. Ofrélio no celular",
    tab: "Barbearia",
    type: "Full stack · Sistema de agendamento",
    name: "Barbearia Sr. Ofrélio",
    sub: "Agenda online no lugar do caderno físico",
    left: { label: "Front-end", value: "React + Tailwind" },
    right: { label: "Back-end", value: "Node.js + MySQL" },
    url: "https://barbearia-green-iota.vercel.app/",
  },
  {
    image: cineMob,
    alt: "Cine Pot no celular, com a lista de lançamentos",
    tab: "Cine Pot",
    type: "Estudo · Consumo de API REST",
    name: "Cine Pot",
    sub: "Busca e detalhes de filmes pela API do TMDB",
    left: { label: "Front-end", value: "React + React Router" },
    right: { label: "Dados", value: "API do TMDB" },
    url: "https://api-filmes.vercel.app/",
  },
  {
    image: psaMob,
    alt: "Site da PSA Planejados no celular",
    tab: "PSA Planejados",
    type: "Landing page",
    name: "PSA Planejados",
    sub: "Galeria por ambiente e orçamento pelo WhatsApp",
    left: { label: "Front-end", value: "React + Tailwind" },
    right: { label: "Movimento", value: "Framer Motion" },
    url: "https://marcenaria-omega.vercel.app/",
  },
];

// Posições da órbita: 0 = frente, 1 = direita (atrás), 2 = esquerda (atrás)
const SLOTS = [
  { side: 0, y: 0, rotate: 0, scale: 1, zIndex: 3, filter: "saturate(1) brightness(1)" },
  { side: 1, y: 20, rotate: 7, scale: 0.72, zIndex: 2, filter: "saturate(0.8) brightness(0.97)" },
  { side: -1, y: 20, rotate: -7, scale: 0.72, zIndex: 1, filter: "saturate(0.8) brightness(0.97)" },
];

// Cada tela flutua num ritmo diferente
const FLOAT_DELAYS = ["0s", "-3s", "-5.5s"];

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
  const reduceMotion = useReducedMotion();

  // order[0] é o projeto da frente, order[1] o da direita e order[2] o da esquerda
  const [order, setOrder] = useState([0, 1, 2]);
  // Guarda qual tela está passando por trás das outras durante a troca
  const [behind, setBehind] = useState(null);
  const [paused, setPaused] = useState(false);
  // Distância das telas de trás até o centro, calculada pela largura do palco
  const [spread, setSpread] = useState(160);
  const stageRef = useRef(null);
  const busy = useRef(false);

  const active = order[0];
  const project = ORBIT[active];
  const autoplay = !reduceMotion;

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSpread(Math.min(172, entry.contentRect.width * 0.31));
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  function scrollToSection(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (lenis && target) {
      lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView();
    }
  }

  // dir 1: a da direita vem pra frente, a da frente vai pra esquerda e a da esquerda passa por trás até a direita
  // dir -1: o mesmo giro, no sentido contrário
  function step(dir) {
    if (busy.current) return;
    const next = dir === 1 ? [order[1], order[2], order[0]] : [order[2], order[0], order[1]];
    const passing = dir === 1 ? order[2] : order[1];
    busy.current = !reduceMotion;
    setBehind({ index: passing, from: order.indexOf(passing) });
    setOrder(next);
  }

  function bringToFront(index) {
    const pos = order.indexOf(index);
    if (pos === 1) step(1);
    if (pos === 2) step(-1);
  }

  // Para onde cada tela vai. A que passa por trás faz uma curva: diminui e sobe no meio do caminho.
  function targetFor(index) {
    const to = SLOTS[order.indexOf(index)];
    const end = { x: to.side * spread, y: to.y, rotate: to.rotate, scale: to.scale, filter: to.filter };
    if (behind?.index !== index) return end;

    const from = SLOTS[behind.from];
    return {
      x: [from.side * spread, 0, end.x],
      y: [from.y, -30, end.y],
      rotate: [from.rotate, 0, end.rotate],
      scale: [from.scale, 0.5, end.scale],
      filter: [from.filter, "saturate(0.6) brightness(0.9)", end.filter],
    };
  }

  function handleOrbitDone(index) {
    if (behind?.index !== index) return;
    busy.current = false;
    setBehind(null);
  }

  return (
    <section id='topo' className='min-h-screen flex items-center'>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto w-full px-6 sm:px-10 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-7 min-w-0">

          <motion.h1 variants={item} className="font-display font-bold text-[2.6rem] sm:text-5xl lg:text-[4.3rem] leading-[1.02] tracking-[-0.025em] text-text text-balance">
            Sistemas web completos, <span className="text-accent">do banco de dados à tela.</span>
          </motion.h1>

          <motion.div variants={item} className="flex items-center gap-3.5">
            <img
              src={perfil}
              alt="Foto de Matheus Agripe"
              className="w-[52px] h-[52px] rounded-full object-cover object-[center_20%]"
            />
            <p className="font-body">
              <strong className="block font-display font-semibold text-text">Matheus Agripe</strong>
              <span className="text-sm text-textdim">Desenvolvedor full stack no interior do Paraná</span>
            </p>
          </motion.div>

          <motion.p variants={item} className="font-body text-lg text-textdim max-w-[34ch] leading-relaxed">
            Já entreguei 4 projetos para negócios reais com React, Node.js e MySQL,
            do levantamento com o cliente até o deploy.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <a
              href="#projetos"
              onClick={(e) => scrollToSection(e, "projetos")}
              className="px-6 py-3.5 bg-accent text-white font-body font-semibold rounded-xl hover:bg-[#165641] hover:-translate-y-0.5 transition"
            >
              Ver projetos
            </a>
            <a
              href="/curriculo.pdf"
              download="Curriculo-Matheus-Agripe.pdf"
              className="px-6 py-3.5 bg-surface border border-line text-text font-body font-semibold rounded-xl hover:border-accent hover:-translate-y-0.5 transition"
            >
              Baixar currículo
            </a>
          </motion.div>

          <motion.ul variants={item} className="flex gap-5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-textdim hover:text-accent transition-colors"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {s.icon}
                  </svg>
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Órbita: a tela da frente fica grande e as outras duas giram por trás */}
        <motion.div variants={item} className={`flex flex-col min-w-0 ${paused ? "hero-paused" : ""}`}>
          <div className="flex justify-between items-baseline font-body text-xs font-medium text-textdim">
            <span>Projetos no ar</span>
            <span className="tabular-nums"><b className="text-text font-semibold">0{active + 1}</b> / 03</span>
          </div>

          <div ref={stageRef} className="relative h-[420px] md:h-[510px] mt-2.5">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 470" preserveAspectRatio="none" aria-hidden="true">
              <g className="hero-rings">
                <ellipse cx="300" cy="250" rx="280" ry="92" transform="rotate(-8 300 250)" fill="none" stroke="rgba(31,111,84,0.22)" />
                <ellipse cx="300" cy="250" rx="230" ry="150" transform="rotate(14 300 250)" fill="none" stroke="rgba(143,179,57,0.35)" strokeDasharray="2 6" />
              </g>
            </svg>

            {ORBIT.map((p, index) => {
              const pos = order.indexOf(index);
              const isBack = pos !== 0;
              return (
                <div
                  key={p.name}
                  className="absolute inset-x-0 top-[16%] md:top-[12%] bottom-0 flex items-center justify-center pointer-events-none"
                  style={{ zIndex: behind?.index === index ? 0 : SLOTS[pos].zIndex }}
                >
                  <motion.figure
                    initial={false}
                    animate={targetFor(index)}
                    transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
                    onAnimationComplete={() => handleOrbitDone(index)}
                    onClick={() => bringToFront(index)}
                    className={`m-0 w-[150px] md:w-[214px] pointer-events-auto ${isBack ? "cursor-pointer group" : ""}`}
                  >
                    <div className="hero-float" style={{ animationDelay: FLOAT_DELAYS[index] }}>
                      <div className="aspect-[9/19.5] rounded-[24px] md:rounded-[34px] bg-text p-[5px] md:p-1.5 shadow-[0_34px_50px_-24px_rgba(16,59,46,0.55),0_8px_18px_rgba(20,32,27,0.10)] transition-shadow duration-300 group-hover:shadow-[0_0_0_3px_#1F6F54,0_34px_50px_-24px_rgba(16,59,46,0.55)]">
                        <img
                          src={p.image}
                          alt={p.alt}
                          className="w-full h-full object-cover object-top rounded-[19px] md:rounded-[28px]"
                        />
                      </div>
                    </div>
                  </motion.figure>
                </div>
              );
            })}

            {/* Stack do projeto da frente, nos cantos de cima */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 top-0 z-[5] flex justify-between gap-4 pointer-events-none"
              >
                {[project.left, project.right].map((note, i) => (
                  <p key={note.label} className={`flex flex-col gap-0.5 ${i === 1 ? "text-right" : ""}`}>
                    <small className="font-body text-[0.68rem] tracking-[0.08em] uppercase font-semibold text-textdim">{note.label}</small>
                    <span className="font-display font-semibold text-[0.9rem] md:text-[1.02rem] tracking-[-0.02em] text-text">{note.value}</span>
                    <span className={`hidden md:block w-14 h-px bg-accent/50 mt-2 ${i === 1 ? "ml-auto" : ""}`} />
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-1.5 items-center pt-5 border-t border-line"
            >
              <p className="col-start-1 font-body text-[0.82rem] font-semibold text-[#165641]">{project.type}</p>
              <h2 className="col-start-1 font-display font-bold text-[1.6rem] md:text-[2.2rem] leading-[1.1] tracking-[-0.025em] text-text">{project.name}</h2>
              <p className="col-start-1 font-body text-[0.95rem] text-textdim">{project.sub}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Acessar ${project.name}`}
                className="col-start-2 row-start-1 row-span-3 w-12 h-12 rounded-full grid place-items-center bg-surface border border-line text-text hover:bg-accent hover:text-white hover:-rotate-[8deg] transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 mt-5">
            <div role="tablist" aria-label="Projetos em destaque" className="flex-1 grid grid-cols-3 gap-3.5">
              {ORBIT.map((p, index) => {
                const selected = index === active;
                return (
                  <button
                    key={p.name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => bringToFront(index)}
                    className={`relative text-left pb-2.5 flex gap-2 items-baseline min-w-0 font-body text-[0.84rem] ${selected ? "text-text font-semibold" : "text-textdim font-medium"}`}
                  >
                    <em className="not-italic text-[0.7rem] tabular-nums opacity-70">0{index + 1}</em>
                    <span className="truncate">{p.tab}</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-line rounded overflow-hidden">
                      {/* A barra enche em 6s. Quando termina, a órbita gira pro próximo projeto. */}
                      {selected && autoplay && (
                        <span key={active} className="hero-bar-fill block h-full w-full bg-accent origin-left" onAnimationEnd={() => step(1)} />
                      )}
                      {selected && !autoplay && <span className="block h-full w-full bg-accent" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {autoplay && (
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-pressed={paused}
                className="self-start sm:self-center inline-flex items-center gap-2 h-[38px] px-3 rounded-[10px] bg-surface border border-line font-body text-[0.8rem] font-semibold text-text hover:border-accent transition-colors whitespace-nowrap"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {paused ? (
                    <path d="M8 5v14l11-7z" />
                  ) : (
                    <>
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </>
                  )}
                </svg>
                {paused ? "Retomar movimento" : "Pausar movimento"}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
