import { Children, createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function useLenis() {
    return useContext(LenisContext);
}

const SmoothScroll = () => {

    const [lenisInstance, setLenisInstance] = useState(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
        });
        setLenisInstance(lenis);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const id = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
        {children}
    </LenisContext.Provider>
  )
}

export default SmoothScroll