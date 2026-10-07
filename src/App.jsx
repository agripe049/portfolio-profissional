import Hero from "./components/Heroo"
import NavBar from "./components/NavBar"
import Projects from "./components/Projects"

function App() {

  return (

    <div>
      <NavBar />
      <Hero />
      <Projects />
      <section id="sobre" className="min-h-screen border-b border-line" />
      <section id="contato" className="min-h-screen border-b border-line" />
    </div>
  )
}

export default App
