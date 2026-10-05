import React from 'react'

const Hero = () => {
  return (
    <section id='topo' className='min-h-screen flex items-center'>
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 pt-28 pb-16 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="border border-line">
              Coluna texto
            </div>

            <div className="border border-line">
              Coluna foto
            </div>
        </div>
    </section>
  )
}

export default Hero