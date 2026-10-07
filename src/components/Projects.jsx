import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projetos" className="min-h-screen">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24">
            {projects.map((p) => (
                <div key={p.client}>
                    <h3>{p.client}</h3>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Projects