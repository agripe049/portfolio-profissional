import { useLenis } from "./SmoothScroll";

const Footer = () => {

    const lenis = useLenis();
    const year = new Date().getFullYear();

    function backToTop() {
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0 });
        }
    }

    return (
        <footer className="border-t border-line">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-body text-sm text-textdim">
                <p>© {year} Matheus Agripe</p>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/agripe049"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-text transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/matheus-agripe/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-text transition-colors"
                    >
                        LinkedIn
                    </a>
                    <button
                        type="button"
                        onClick={backToTop}
                        className="hover:text-text transition-colors"
                    >
                        Voltar ao topo
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer