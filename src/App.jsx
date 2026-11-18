import { MotionConfig } from "framer-motion"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import Projects from "./components/Projects"
import SmoothScroll from "./components/SmoothScroll"

function App() {

  return (

    // reducedMotion="user": desliga as animações de movimento pra quem ativou "reduzir movimento" no sistema
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  )
}

export default App
