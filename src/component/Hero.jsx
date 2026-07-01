import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Nav from './Nav';

const Hero = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const smoothEase = [0.76, 0, 0.24, 1];

  const titleReveal = {
    hidden: { y: "120%" },
    visible: { 
      y: 0, 
      transition: { duration: 1.2, ease: smoothEase, delay: 0.2 } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#F5F5F7] overflow-hidden font-sans selection:bg-[#F5F5F7] selection:text-black">
      <Nav isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      {/* Header - Constrained to 95vw for alignment */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-center pt-8">
        <div className="w-[95vw] flex justify-between items-center">
          <h2 className="font-medium tracking-tight text-lg">ODISY™</h2>
          <button 
            onClick={() => setIsNavOpen(true)}
            className="flex items-center gap-2 text-sm group hover:opacity-70 transition-opacity duration-300"
          >
            <span className="text-xl font-light group-hover:rotate-90 transition-transform duration-500 ease-out">+</span>
            Menu
          </button>
        </div>
      </header>

      {/* Main Content - Centered 95vw wrapper */}
      <main className="w-[95vw] mx-auto h-screen flex flex-col justify-end pb-[10vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-x-8 gap-y-16">
          
          {/* Large Branding */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden pb-4">
              <motion.h1 
                variants={titleReveal}
                initial="hidden"
                animate="visible"
                className="text-[14vw] leading-[0.8] font-medium tracking-tighter"
              >
                ODISY<span className="text-[4vw] align-top text-[#A1A1A6]">™</span>
              </motion.h1>
            </div>
          </div>

          {/* Intro Card & Text - Given more space and shifted visually */}
          <div className="lg:col-span-4 flex flex-col gap-10 lg:pl-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: smoothEase, delay: 0.4 }}
              className="aspect-square w-full max-w-[320px] bg-gradient-to-br from-[#2c2c2e] to-[#1c1c1e] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5"
            >
              {/* Colored Card Placeholder */}
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.p 
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: smoothEase, delay: 0.6 }}
                className="text-[15px] leading-relaxed text-[#A1A1A6] max-w-[340px] font-light tracking-wide"
              >
                ODISY is a creative development agency focused on crafting premium digital interfaces and robust web architectures that are clear, intentional, and built to scale.
              </motion.p>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Hero;