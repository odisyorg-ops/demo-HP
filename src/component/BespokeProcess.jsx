// BespokeProcess.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function BespokeProcess() {
  const steps = [
    { number: "01", title: "Consultation", desc: "Understanding the architectural intent and individual requirements of your space." },
    { number: "02", title: "Engineering", desc: "Translating concepts into precise CAD schematics and hydraulic flow plans." },
    { number: "03", title: "Handcrafting", desc: "Machining solid brass and applying bespoke PVD finishes in our atelier." },
    { number: "04", title: "Installation", desc: "White-glove delivery and technical oversight for flawless integration." }
  ];

  return (
    <div className="w-full h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] rounded-lg md:rounded-lg bg-[#0A0A0A] border border-white/5 flex flex-col items-center justify-center py-16 px-6 relative overflow-hidden">
      
      <div className="text-center mb-16 md:mb-24 z-10">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] mb-4">The Atelier Process</h2>
        <p className="font-serif text-[#F6F2EA] text-3xl md:text-4xl tracking-tight">From Concept to Reality</p>
      </div>

      <div className="relative w-full max-w-3xl mx-auto flex flex-col gap-12 z-10">
        {/* Central Vertical Line Background */}
        <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2" />
        
        {/* Animated Golden Line mapping progress */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute left-[23px] md:left-1/2 top-0 w-[1px] bg-[#C7A873] md:-translate-x-1/2 origin-top"
        />

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0.3, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-30%" }}
              transition={{ duration: 0.8 }}
              className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} pl-16 md:pl-0`}
            >
              {/* Step Node */}
              <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-[#0A0A0A] border border-white/10 md:-translate-x-1/2 flex items-center justify-center z-10">
                <span className="font-mono text-[10px] text-[#C7A873]">{step.number}</span>
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                <h3 className="font-serif text-2xl text-[#F6F2EA] mb-2">{step.title}</h3>
                <p className="text-[#F6F2EA]/60 text-sm tracking-wide leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}