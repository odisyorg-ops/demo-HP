import React from 'react';
import { motion } from 'framer-motion';

const Nav = ({
  isOpen,
  setIsOpen,
  // Premium dark tones for the staggered underlays
  colors = ['#1c1c1e', '#2c2c2e'],
  links = ['Home', 'Works', 'About Us', 'Contact'],
  socials = [
    { label: 'Instagram', link: '#' },
    { label: 'LinkedIn', link: '#' },
    { label: 'Twitter / X', link: '#' }
  ]
}) => {
  // Fluid, Apple-inspired easing curve
  const smoothEase = [0.76, 0, 0.24, 1];

  // Staggered Pre-layers
  const layerVariants = {
    closed: (i) => ({
      x: '100%',
      // Reverse stagger on close
      transition: { duration: 0.8, ease: smoothEase, delay: (colors.length - i) * 0.05 }
    }),
    opened: (i) => ({
      x: 0,
      transition: { duration: 0.8, ease: smoothEase, delay: i * 0.08 }
    })
  };

  // Main Menu Panel
  const panelVariants = {
    closed: {
      x: '100%',
      transition: { duration: 0.8, ease: smoothEase }
    },
    opened: {
      x: 0,
      transition: { duration: 0.8, ease: smoothEase, delay: colors.length * 0.08 }
    },
  };

  // Menu Links (staggered sequentially after the main panel opens)
  const linkVariants = {
    closed: { opacity: 0, y: "100%", transition: { duration: 0.4 } },
    opened: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: smoothEase,
        delay: (colors.length * 0.08) + 0.15 + (i * 0.08),
      },
    }),
  };

  // Fade in for socials and headers
  const fadeVariants = {
    closed: { opacity: 0, transition: { duration: 0.4 } },
    opened: { opacity: 1, transition: { duration: 1, ease: smoothEase, delay: (colors.length * 0.08) + 0.4 } }
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "opened" : "closed"}
      className="fixed inset-0 z-50 flex justify-end pointer-events-none"
    >
      {/* Backdrop Blur - fades in smoothly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className={`absolute inset-0 bg-black/40 backdrop-blur-md ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Staggered Pre-layers */}
      {colors.map((color, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={layerVariants}
          className="absolute top-0 right-0 h-full w-full md:w-[50vw] pointer-events-none"
          style={{ backgroundColor: color, zIndex: 10 + i }}
        />
      ))}

      {/* Main Menu Panel */}
      <motion.div
        variants={panelVariants}
        className={`absolute top-0 right-0 w-full md:w-[50vw] bg-[#050505] h-full p-8 md:p-16 flex flex-col justify-between border-l border-white/5 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        style={{ zIndex: 10 + colors.length }}
      >
        <motion.div variants={fadeVariants} className="flex justify-between items-center">
          <span className="text-white font-medium tracking-tight">ODISY™</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white flex items-center gap-2 border border-white/20 px-5 py-1.5 rounded-full text-xs hover:bg-white hover:text-black transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span className="w-4 h-[1px] bg-current"></span> Close
          </button>
        </motion.div>

        <nav className="flex flex-col gap-6 mt-20">
          {links.map((link, i) => (
            <div key={link} className="overflow-hidden">
              <motion.a
                custom={i}
                variants={linkVariants}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="group flex items-baseline gap-4 block text-white text-6xl md:text-[6vw] leading-[0.9] font-medium tracking-tighter hover:italic hover:text-white/70 transition-all duration-500"
              >
                {/* Integrated item numbering */}
                <span className="text-lg text-white/40 font-light group-hover:text-white/70 transition-colors duration-500">
                  0{i + 1}
                </span>
                {link}
              </motion.a>
            </div>
          ))}
        </nav>

        <motion.div
          variants={fadeVariants}
          className="grid grid-cols-2 gap-8 text-[#A1A1A6] text-sm mt-auto font-light"
        >
          <div>
            <p className="mb-3 text-white/40">Email</p>
            <a href="mailto:hello@odisy.studio" className="hover:text-white transition-colors duration-300">
              hello@odisy.studio
            </a>
          </div>
          <div>
            <p className="mb-3 text-white/40">Socials</p>
            <div className="flex flex-col gap-1">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="hover:text-white transition-colors duration-300"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Nav;