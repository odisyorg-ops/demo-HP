import React, { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './component/Hero'
import CollectionFeature from './component/CollectionRow'
import Navbar from './component/NavBar'
import Footer from './component/Footer'

// Import the new components (ensure the paths match your folder structure)
import CuratedSuite from './component/CuratedSuite'
import BespokeProcess from './component/BespokeProcess'
import FeaturedProjects from './component/FeaturedProjects'
import ContactConcierge from './component/ContactConcierge'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothHover: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    // Outer black canvas with space-y-4 handling the gaps between sections
    <main className="bg-black space-y-4 min-h-screen p-3 md:p-5 font-sans">

      {/* 100vh Bento Container for Navbar + Hero */}
      <div className="flex flex-col h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] gap-2 md:gap-2">

        {/* Navbar takes roughly 8-10% of the height */}
        <div className="h-[70px] md:h-[8vh] min-h-[64px]">
          <Navbar />
        </div>

        {/* Hero takes the remaining height */}
        <div className="flex-1 overflow-hidden rounded-lg md:rounded-lg relative">
          <Hero />
        </div>

      </div>

      {/* 1. Collection Row / Categories */}
      <div className="rounded-lg md:rounded-lg overflow-hidden bg-[#0A0A0A]">
        <CollectionFeature />
      </div>

      {/* 2. Interactive Lookbook */}
      <div className="rounded-lg md:rounded-lg overflow-hidden bg-[#0A0A0A]">
        <CuratedSuite />
      </div>

      {/* 3. The Bespoke Process Timeline */}
      <div className="rounded-lg md:rounded-lg overflow-hidden bg-[#0A0A0A]">
        <BespokeProcess />
      </div>

      {/* 4. Featured Architectural Projects */}
      <div className="rounded-lg md:rounded-lg overflow-hidden bg-[#0A0A0A]">
        <FeaturedProjects />
      </div>
      {/* 4. Featured Architectural Projects */}
      <div className="rounded-lg md:rounded-lg overflow-hidden bg-[#0A0A0A]">
        <ContactConcierge></ContactConcierge>
      </div>

      {/* Footer */}
      <div className="rounded-lg md:rounded-lg overflow-hidden bg-[#0A0A0A]">
        <Footer />
      </div>
      
    </main>
  )
}

export default App