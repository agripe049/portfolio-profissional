import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { useState } from "react";

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
                <div className="w-full h-full bg-gradient-to-br from-violet/20 to-blue/20 flex items-center justify-center">
                    <span className="font-display font-bold text-5xl text-gradient">
                        {project.client.charAt(0)}
                    </span>
                </div>
            )}
        </div>
    );
}

const Projects = () => {
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
                    Cada projeto nasceu de um problema real de um negócio local, e não de
                    um exercício.
                </motion.p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {projects.map((project) => (
                        <motion.article
                            key={project.client}
                            variants={item}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            // MUDOU: saiu o "p-6", entraram "group" e "overflow-hidden"
                            className="group flex flex-col overflow-hidden rounded-2xl bg-surface border border-line shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* NOVO: a capa fica no topo do card */}
                            <ProjectCover project={project} />

                            {/* MUDOU: o texto todo agora vive dentro desta div, que ganhou o "p-6" */}
                            <div className="flex flex-col flex-1 p-6">
                                <span className="font-body text-sm text-violet">{project.type}</span>

                                <h3 className="font-display font-bold text-2xl text-text mt-2">
                                    {project.client}
                                </h3>

                                <p className="font-body text-textdim leading-relaxed mt-3">
                                    {project.solved}
                                </p>

                                <p className="font-body text-xs text-textdim/70 mt-4">
                                    {project.stack}
                                </p>

                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-auto pt-5 font-body text-sm font-semibold text-text underline decoration-line underline-offset-4 hover:decoration-violet transition-colors"
                                    >
                                        {project.linkLabel}
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default Projects