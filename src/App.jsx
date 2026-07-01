import React, { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './component/Hero'
import Manifesto from './component/Manifesto'
import Nav from './component/Nav'

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
    <main className="bg-black">
      {/* <Nav />
      <Hero /> */}
      <Manifesto />
    </main>
  )
}

export default App