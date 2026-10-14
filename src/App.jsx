import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Heroo"
import NavBar from "./components/NavBar"
import Projects from "./components/Projects"
import SmoothScroll from "./components/SmoothScroll"

function App() {

  return (

    <SmoothScroll>
      <div className="relative bg-bg">
        <NavBar />
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
