import { useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser";

const CONTACT_EMAIL = "agripeheber@gmail.com";

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

const inputClasses =
    "w-full bg-surface border border-line rounded-xl px-4 py-3 font-body text-text focus-visible:border-violet transition-colors";

const Contact = () => {
    const [form, setForm] = useState({ name: "", business: "", email: "", message: "" });
    const [status, setStatus] = useState("idle");

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("sending");

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form,
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
            );
            setStatus("success");
            setForm({ name: "", business: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }


    return (
        <section id="contato" className="min-h-screen flex items-center border-t border-line">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-6xl mx-auto w-full px-6 sm:px-10 py-24 grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16"
            >
                <div>
                    <motion.h2
                        variants={item}
                        className="font-display font-bold text-4xl sm:text-5xl text-text"
                    >
                        Vamos conversar
                    </motion.h2>

                    <motion.p
                        variants={item}
                        className="font-body text-textdim mt-4 max-w-sm leading-relaxed"
                    >
                        Conta o que o seu negócio precisa. Eu respondo dizendo se dá pra
                        fazer e como eu faria.
                    </motion.p>

                    <motion.a
                        variants={item}
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-block mt-6 font-body text-text underline decoration-line underline-offset-4 hover:decoration-violet transition-colors"
                    >
                        {CONTACT_EMAIL}
                    </motion.a>
                </div>

                <motion.form variants={item} onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                    <div>
                        <label htmlFor="name" className="block font-body text-sm text-textdim mb-2">
                            Seu nome
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label htmlFor="business" className="block font-body text-sm text-textdim mb-2">
                            Nome do negócio (opcional)
                        </label>
                        <input
                            id="business"
                            name="business"
                            type="text"
                            value={form.business}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-body text-sm text-textdim mb-2">
                            Seu e-mail
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block font-body text-sm text-textdim mb-2">
                            O que você precisa
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={form.message}
                            onChange={handleChange}
                            className={`${inputClasses} resize-none`}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="px-6 py-3 bg-text text-bg font-body font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                    </button>

                    <p role="status" aria-live="polite" className="font-body text-sm min-h-5">
                        {status === "success" && (
                            <span className="text-green-700">Mensagem enviada! Respondo assim que possível.</span>
                        )}
                        {status === "error" && (
                            <span className="text-red-600">
                                Não consegui enviar agora. Tenta de novo ou me chama por e-mail.
                            </span>
                        )}
                    </p>
                </motion.form>
            </motion.div>
        </section>
    )
}

export default Contact