import React from 'react'
import { motion } from 'framer-motion'

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

const STACK_GROUPS = [
    { title: "Front-end", items: ["React", "JavaScript", "Tailwind CSS"] },
    { title: "Back-end", items: ["Node.js", "Express"] },
    { title: "Dados", items: ["Firebase", "MySQL"] },
    { title: "Ferramentas", items: ["Git", "GitHub", "Vercel"] },
];

const About = () => {
    return (
        <section id='sobre' className="min-h-screen flex items-center border-t border-line">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-6xl mx-auto w-full px-6 sm:px-10 py-24 grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16"
            >
                <motion.h2
                    variants={item}
                    className="font-display font-bold text-4xl sm:text-5xl text-text"
                >
                    Quem está por trás do código
                </motion.h2>

                <div className="font-body text-lg text-textdim leading-relaxed space-y-5 max-w-xl">
                    <motion.p variants={item}>
                        Moro no interior do Paraná, e trabalho direto com o
                        dono do negócio, sem departamento de TI no meio.
                    </motion.p>
                    <motion.p variants={item}>
                        No dia a dia uso React, Vite, Firebase e Tailwind. Também estou
                        estudando Go pra abrir outras frentes.
                    </motion.p>

                    <motion.div variants={item} className="pt-4 space-y-5">
                        {STACK_GROUPS.map((g) => (
                            <div key={g.title}>
                                <h3 className="font-display font-semibold text-base text-text">
                                    {g.title}
                                </h3>
                                <div className="flex flex-wrap gap-2.5 mt-3">
                                    {g.items.map((t) => (
                                        <span
                                            key={t}
                                            className="px-4 py-1.5 rounded-full bg-surface border border-line text-sm text-textdim"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default About