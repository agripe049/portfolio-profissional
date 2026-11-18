import { projects } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "./SmoothScroll";

const buttonSecondary =
    "px-5 py-2.5 bg-surface border border-line text-text font-body text-sm font-semibold rounded-xl hover:border-accent/50 transition-colors";

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};



function ProjectCover({ project }) {
    const [failed, setFailed] = useState(false);

    return (
        <div className="aspect-video overflow-hidden bg-bg">
            {project.image && !failed ? (
                <img
                    src={project.image}
                    alt={`Capa do projeto ${project.client}`}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
                    <span className="font-display font-bold text-5xl text-gradient">
                        {project.client.charAt(0)}
                    </span>
                </div>
            )}
        </div>
    );
}

function ProjectModal({ project, onClose }) {
    const lenis = useLenis();
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        // Guarda quem tinha o foco (ex: o botão "Ver mais") pra devolver ao fechar
        const previousFocus = document.activeElement;
        closeButtonRef.current?.focus();

        // Trava a página de fundo enquanto o modal está aberto
        lenis?.stop();
        document.body.style.overflow = "hidden";

        function handleKeyDown(e) {
            if (e.key === "Escape") {
                onClose();
                return;
            }

            // Mantém o Tab circulando só entre os elementos do modal
            if (e.key === "Tab" && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll(
                    "a[href], button:not([disabled]), video[controls]"
                );
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            lenis?.start();
            document.body.style.overflow = "";
            previousFocus?.focus?.();
        };
    }, [lenis, onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={project.client}
                data-lenis-prevent
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl bg-surface p-6 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar"
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface/90 text-textdim hover:text-text hover:bg-bg transition-colors"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8">
                    <div className="aspect-video overflow-hidden rounded-xl bg-bg">
                        {project.video ? (
                            <video
                                src={project.video}
                                poster={project.image}
                                controls
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover"
                            />
                        ) : project.image ? (
                            <img
                                src={project.image}
                                alt={`Capa do projeto ${project.client}`}
                                className="w-full h-full object-cover"
                            />
                        ) : null}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-body text-sm text-accent">{project.type}</span>

                        <h3 className="font-display font-bold text-3xl text-text mt-2 pr-8">
                            {project.client}
                        </h3>

                        <p className="font-body text-textdim leading-relaxed mt-4">
                            {project.solved}
                        </p>

                        {project.highlights && (
                            <ul className="mt-4 space-y-2 font-body text-sm text-textdim">
                                {project.highlights.map((h) => (
                                    <li key={h} className="flex gap-2">
                                        <span
                                            aria-hidden="true"
                                            className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                                        />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <p className="font-body text-xs text-textdim/70 mt-4">{project.stack}</p>
                    </div>
                </div>

                {(project.demo || project.repo || project.post) && (
                    <div className="flex flex-wrap gap-3 mt-6">
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 bg-text text-bg font-body text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Acessar projeto
                            </a>
                        )}

                        {project.repo && (
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noreferrer"
                                className={buttonSecondary}
                            >
                                Ver repositório
                            </a>
                        )}

                        {project.post && (
                            <a
                                href={project.post}
                                target="_blank"
                                rel="noreferrer"
                                className={buttonSecondary}
                            >
                                Ver post no LinkedIn
                            </a>
                        )}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

const Projects = () => {

    const [selected, setSelected] = useState(null);

    // useCallback mantém a mesma função entre renders, senão o efeito do modal rodaria de novo
    const closeModal = useCallback(() => setSelected(null), []);

    return (
        <section id="projetos" className="min-h-screen">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-6xl mx-auto px-6 sm:px-10 py-24"
            >
                <motion.h2
                    variants={item}
                    className="font-display font-bold text-4xl sm:text-5xl text-text"
                >
                    Sistemas feitos pra negócios de verdade
                </motion.h2>

                <motion.p
                    variants={item}
                    className="font-body text-textdim mt-4 max-w-xl leading-relaxed"
                >
                    A maioria nasceu de um problema real de um negócio local. Os outros, de estudo aplicado.
                </motion.p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {projects.map((project) => (
                        <motion.article
                            key={project.client}
                            variants={item}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setSelected(project)}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-surface border border-line shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            <ProjectCover project={project} />

                            <div className="flex flex-col flex-1 p-6">
                                <span className="font-body text-sm text-accent">{project.type}</span>

                                <h3 className="font-display font-bold text-2xl text-text mt-2">
                                    {project.client}
                                </h3>

                                <p className="font-body text-xs text-textdim/70 mt-4">
                                    {project.stack}
                                </p>

                                <div className="mt-auto pt-5 flex items-center justify-between gap-4">
                                    {/* Sem onClick próprio: o clique sobe até o card, que abre o modal */}
                                    <button
                                        type="button"
                                        className="font-body text-sm font-semibold text-accent hover:underline underline-offset-4"
                                    >
                                        Ver mais
                                    </button>

                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={closeModal} />
                )}
            </AnimatePresence>
        </section>
    )
}

export default Projects