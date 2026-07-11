// CuratedSuite.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CuratedSuite() {
  const [activeProduct, setActiveProduct] = useState(null);

  // Example architectural image placeholder (replace with your own high-res render)
  const bgImage = "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop";

  const hotspots = [
    {
      id: 1,
      title: "Matte Black Basin Mixer",
      subtitle: "Precision Flow",
      description: "Machined from solid brass with a custom matte black PVD finish. Features a progressive cartridge for ultimate temperature control.",
      x: "45%", // X coordinate on the image
      y: "55%", // Y coordinate on the image
    },
    {
      id: 2,
      title: "Freestanding Stone Tub",
      subtitle: "Cast Resin",
      description: "A seamless monolithic block poured from eco-friendly volcanic limestone and resin, retaining water heat 3x longer than standard acrylic.",
      x: "70%",
      y: "75%",
    }
  ];

  return (
    <div className="w-full h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] relative overflow-hidden rounded-lg md:rounded-lg bg-[#0A0A0A]">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Title Meta */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] mb-2">Curated Spaces</h2>
        <p className="font-serif text-[#F6F2EA] text-2xl md:text-3xl tracking-tight">The Gulshan Residence</p>
      </div>

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <div 
          key={spot.id}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ top: spot.y, left: spot.x }}
        >
          <button 
            onClick={() => setActiveProduct(spot)}
            className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-[#C7A873]/40 animate-ping" />
            {/* Core dot */}
            <span className="relative w-3 h-3 rounded-full bg-[#C7A873] transition-transform duration-300 group-hover:scale-150" />
          </button>
        </div>
      ))}

      {/* Slide-in Product Drawer */}
      <AnimatePresence>
        {activeProduct && (
          <>
            {/* Invisible backdrop to close drawer when clicking outside */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProduct(null)}
              className="absolute inset-0 z-30 bg-black/10 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-white/10 z-40 p-8 md:p-12 flex flex-col justify-center"
            >
              <button 
                onClick={() => setActiveProduct(null)}
                className="absolute top-8 right-8 text-[#F6F2EA]/50 hover:text-[#C7A873] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] mb-4">
                {activeProduct.subtitle}
              </p>
              <h3 className="font-serif text-[#F6F2EA] text-3xl md:text-4xl tracking-tight leading-none mb-6">
                {activeProduct.title}
              </h3>
              <p className="text-[#F6F2EA]/60 text-sm leading-relaxed tracking-wide mb-12">
                {activeProduct.description}
              </p>

              <a 
                href="#inquire" 
                className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-[#F6F2EA] hover:text-[#C7A873] transition-colors duration-500"
              >
                <span className="w-8 h-[1px] bg-current transition-all duration-500 ease-out group-hover:w-16"></span>
                Inquire about this piece
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}