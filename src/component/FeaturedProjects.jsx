import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import all 12 local product pictures
import productPic1 from "../assets/productPic (1).jpg";
import productPic2 from "../assets/productPic (2).jpg";
import productPic3 from "../assets/productPic (3).jpg";
import productPic4 from "../assets/productPic (4).jpg";
import productPic5 from "../assets/productPic (5).jpg";
import productPic6 from "../assets/productPic (6).jpg";
import productPic7 from "../assets/productPic (7).jpg";
import productPic8 from "../assets/productPic (8).jpg";
import productPic9 from "../assets/productPic (9).jpg";
import productPic10 from "../assets/productPic (10).jpg";
import productPic11 from "../assets/productPic (11).jpg";
import productPic12 from "../assets/productPic (12).jpg";

export default function SignatureProducts() {
  const [isExpanded, setIsExpanded] = useState(false);

  // 12 curated product images using the local imports
  const products = [
    { id: 1, title: "Aura Faucet", finish: "Brushed Brass", aspect: "aspect-[3/4]", image: productPic1 },
    { id: 2, title: "Lumina Tub", finish: "Matte White", aspect: "aspect-square", image: productPic2 },
    { id: 3, title: "Zenith Shower", finish: "Gunmetal", aspect: "aspect-[4/5]", image: productPic3 },
    { id: 4, title: "Chef's Mixer", finish: "Stainless Steel", aspect: "aspect-[3/5]", image: productPic4 },
    { id: 5, title: "Onyx Basin", finish: "Nero Marquina", aspect: "aspect-video", image: productPic5 },
    { id: 6, title: "Pillar Tap", finish: "Polished Nickel", aspect: "aspect-[3/4]", image: productPic6 },
    { id: 7, title: "Freestanding Mixer", finish: "Brushed Gold", aspect: "aspect-square", image: productPic7 },
    { id: 8, title: "Farmhouse Sink", finish: "Fireclay White", aspect: "aspect-[4/3]", image: productPic8 },
    { id: 9, title: "Rainhead", finish: "Matte Black", aspect: "aspect-[3/4]", image: productPic9 },
    { id: 10, title: "Wall Mounted Spout", finish: "Aged Bronze", aspect: "aspect-square", image: productPic10 },
    { id: 11, title: "Vessel Sink", finish: "Concrete", aspect: "aspect-[3/5]", image: productPic11 },
    { id: 12, title: "Thermostatic Valve", finish: "Chrome", aspect: "aspect-[4/3]", image: productPic12 },
  ];

  return (
    <div className={`relative w-full rounded-lg md:rounded-lg bg-[#0A0A0A] border border-white/5 transition-all duration-[1.5s] ease-[0.22,1,0.36,1] ${
      isExpanded 
        ? "h-full pb-12" // Expands fully when clicked
        : "h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] overflow-hidden" // Locks to bento height initially
    }`}>
      
      {/* Section Header */}
      <div className="pt-12 px-6 md:px-12 md:pt-16 mb-10 md:mb-14 text-center md:text-left z-10 relative">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] mb-4">
          The Collection
        </p>
        <h2 className="font-serif text-[#F6F2EA] text-4xl md:text-6xl tracking-tight">
          Signature Pieces
        </h2>
      </div>

      {/* Masonry Layout */}
      <div className="px-4 md:px-10 columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-2 space-y-2 md:space-y-2">
        {products.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
            className={`relative group w-full overflow-hidden rounded-md cursor-pointer break-inside-avoid ${item.aspect}`}
          >
            {/* Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              style={{ backgroundImage: `url("${item.image}")` }}
            />
            
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

            {/* Hover Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C7A873] mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.finish}
              </p>
              <h3 className="font-serif text-[#F6F2EA] text-lg md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Gradient Fade & Button (Disappears when expanded) */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent flex items-end justify-center pb-12 md:pb-16 pointer-events-none z-20">
          <button 
            onClick={() => setIsExpanded(true)}
            className="pointer-events-auto group flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-[#F6F2EA] border border-white/20 bg-[#0A0A0A]/50 backdrop-blur-md px-8 py-4 rounded-full hover:border-[#C7A873] hover:text-[#C7A873] transition-all duration-500"
          >
            <span className="w-4 h-[1px] bg-current transition-all duration-500 ease-out group-hover:w-8"></span>
            Show More
            <span className="w-4 h-[1px] bg-current transition-all duration-500 ease-out group-hover:w-0"></span>
          </button>
        </div>
      )}

    </div>
  );
}