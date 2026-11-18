import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function useLenis() {
    return useContext(LenisContext);
}

const SmoothScroll = ({ children }) => {

    const [lenisInstance, setLenisInstance] = useState(null);

    useEffect(() => {
        // Quem pediu "reduzir movimento" no sistema fica com a rolagem nativa
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // autoRaf: o próprio Lenis cuida do loop de animação e o cancela no destroy()
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            autoRaf: true,
        });
        setLenisInstance(lenis);

        return () => {
            lenis.destroy();
            setLenisInstance(null);
        };
    }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
        {children}
    </LenisContext.Provider>
  )
}

export default SmoothScroll
