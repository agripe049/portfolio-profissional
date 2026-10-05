import Hero from "./components/Heroo"
import NavBar from "./components/NavBar"

function App() {

  return (

    <div>
      <NavBar />
      <Hero />
      <section id="projetos" className="min-h-screen border-b border-line" />
      <section id="sobre" className="min-h-screen border-b border-line" />
      <section id="contato" className="min-h-screen border-b border-line" />
    </div>
  )
}

export default App
