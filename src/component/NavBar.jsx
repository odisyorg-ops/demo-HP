import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importing your image assets
import productPic1 from "../assets/productPic (1).jpg";
import productPic2 from "../assets/productPic (2).jpg";
import productPic3 from "../assets/productPic (3).jpg";
import productPic4 from "../assets/productPic (4).jpg";
import productPic5 from "../assets/productPic (5).jpg";
import productPic8 from "../assets/productPic (8).jpg";
import productPic9 from "../assets/productPic (9).jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);

  const navLinks = [
    { title: "Collections", href: "#collections" },
    { 
      title: "Bathware", 
      href: "#bathware",
      subItems: ["Faucets", "Wash Basins", "Bathtubs", "Showers"]
    },
    { 
      title: "Kitchenware", 
      href: "#kitchenware",
      subItems: ["Sinks", "Mixers", "Accessories"]
    },
    { title: "Bespoke", href: "#bespoke" },
  ];

  // Helper to map sub-menu items to images
  const getSubItemImage = (itemName) => {
    const map = {
      "Faucets": productPic1,
      "Wash Basins": productPic5,
      "Bathtubs": productPic2,
      "Showers": productPic3,
      "Sinks": productPic8,
      "Mixers": productPic4,
      "Accessories": productPic9
    };
    return map[itemName] || productPic1;
  };

  return (
    <nav className="w-full h-full bg-[#0A0A0A] rounded-lg md:rounded-lg flex items-center justify-between px-6 md:px-10 z-50 relative border border-white/5">
      
      {/* Logo */}
      <a href="#" className="flex flex-col group">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#C7A873]">
          HygienePlus
        </span>
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white/60 transition-colors duration-500 mt-0.5">
          Atelier
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 h-full">
        {navLinks.map((link) => (
          <div 
            key={link.title}
            className="relative h-full flex items-center"
            onMouseEnter={() => {
              setHoveredItem(link.title);
              setHoveredSubItem(link.subItems?.[0] || null);
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
              setHoveredSubItem(null);
            }}
          >
            <a
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 py-2 ${hoveredItem === link.title ? 'text-[#C7A873]' : 'text-[#F6F2EA]/80'}`}
            >
              {link.title}
            </a>

            {/* Dropdown Menu */}
            {link.subItems && (
              <AnimatePresence>
                {hoveredItem === link.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
                  >
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-3 flex shadow-2xl">
                      {/* Left: Link List */}
                      <div className="flex flex-col min-w-[180px]">
                        {link.subItems.map((subItem) => (
                          <a
                            key={subItem}
                            onMouseEnter={() => setHoveredSubItem(subItem)}
                            href={`#${subItem.toLowerCase().replace(' ', '-')}`}
                            className={`text-[11px] px-4 py-3 rounded-lg transition-all duration-300 tracking-[0.1em] uppercase ${hoveredSubItem === subItem ? 'text-[#C7A873] bg-white/5' : 'text-white/70'}`}
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>

                      {/* Right: Image Preview Box */}
                      <div className="w-[180px] h-[180px] rounded-lg overflow-hidden ml-2 relative bg-black/50">
                        <AnimatePresence mode="wait">
                          {hoveredSubItem && (
                            <motion.img
                              key={hoveredSubItem}
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              src={getSubItemImage(hoveredSubItem)}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="hidden md:flex items-center">
        <a href="#inquire" className="text-[11px] uppercase tracking-[0.15em] text-[#F6F2EA] border border-white/20 hover:border-[#C7A873] hover:text-[#C7A873] px-5 py-2 rounded-full transition-all duration-500 ease-out">
          Inquire
        </a>
      </div>

      {/* Mobile Toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col justify-center items-end w-6 h-6 gap-1.5 z-[70]">
        <span className={`h-[1px] bg-[#F6F2EA] transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
        <span className={`h-[1px] bg-[#F6F2EA] transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-4"}`} />
        <span className={`h-[1px] bg-[#F6F2EA] transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-1.5" : "w-5"}`} />
      </button>
    </nav>
  );
}