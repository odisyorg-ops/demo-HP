import React from "react";
import { motion } from "framer-motion";
import bannerPic from "../assets/Minimalist Monochromatic Bathroom.png";

export default function Hero() {
  return (
    // Replaced h-screen with h-full so it perfectly matches the bento slot
    <section className="relative h-full w-full flex items-center justify-center text-center">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{ backgroundImage: `url(${bannerPic})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/40" />

      {/* Content Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 flex flex-col items-center px-6"
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] mb-6"
        >
          Curated Excellence
        </motion.p>
        
        <h1 className="font-serif text-[#F6F2EA] text-[3.2rem] md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-12">
          Water, <br />
          <span className="italic font-light text-white/90">considered.</span>
        </h1>
        
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-[#F6F2EA] hover:text-[#C7A873] transition-colors duration-500"
        >
          <span className="w-8 h-[1px] bg-current transition-all duration-500 ease-out group-hover:w-16"></span>
          Discover the collection
          <span className="w-8 h-[1px] bg-current transition-all duration-500 ease-out group-hover:w-0"></span>
        </motion.button>
      </motion.div>
    </section>
  );
}