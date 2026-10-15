import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import perfil from "../assets/perfil.jpeg"

const TiltPhoto = () => {
    const [failed, setFailed] = useState(false);
    const ref = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
        stiffness: 150,
        damping: 15,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
        stiffness: 150,
        damping: 15,
    });

    function handleMouseMove(e) {
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <div
            className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto"
            style={{ perspective: 800 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                whileHover={{ scale: 1.04 }}
                className="w-full h-full rounded-full overflow-hidden border-4 border-surface shadow-xl bg-surface flex items-center justify-center"
            >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface shadow-xl bg-surface flex items-center justify-center">
                    {!failed ? (
                        <img
                            src={perfil}
                            alt="Foto de perfil"
                            className="w-full h-full object-cover"
                            onError={() => setFailed(true)}
                        />
                    ) : (
                        <span className="font-display font-bold text-6xl text-gradient">
                            M
                        </span>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default TiltPhoto