import React from 'react';

const Footer = () => {
  const aboutLinks = [
    { name: "About", href: "#about" },
    { name: "Terms & Conditions", href: "#terms" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Contact Us", href: "#contact" }
  ];

  const policyLinks = [
    { name: "Shipping Policy", href: "#shipping" },
    { name: "Warranty Policy", href: "#warranty" },
    { name: "Return & Refund Policy", href: "#return" },
    { name: "Legal", href: "#legal" }
  ];

  return (
    <footer className="w-full h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] bg-[#0A0A0A] rounded-lg md:rounded-lg flex flex-col justify-between px-8 py-12 md:px-16 md:py-16 border border-white/5 overflow-hidden relative">
      
      {/* 
        Top Section: Dramatic Negative Space 
        Fills the 100vh container with a massive, subtle brand mark 
      */}
      <div className="flex-1 flex items-center justify-center w-full select-none pointer-events-none">
        <h2 className="font-serif text-[#F6F2EA] text-[15vw] md:text-[12vw] leading-none tracking-tighter opacity-[0.03] whitespace-nowrap">
          HYGIENEPLUS
        </h2>
      </div>

      {/* 
        Middle Section: Information Grid 
        Pushed to the bottom half of the screen 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full z-10">
        
        {/* Column 1: About Us */}
        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873]">About Us</h3>
          <ul className="flex flex-col gap-3">
            {aboutLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-[#F6F2EA]/60 hover:text-[#C7A873] text-[13px] tracking-wide transition-colors duration-300">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Our Policies */}
        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873]">Our Policies</h3>
          <ul className="flex flex-col gap-3">
            {policyLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-[#F6F2EA]/60 hover:text-[#C7A873] text-[13px] tracking-wide transition-colors duration-300">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873]">Contact</h3>
          <div className="flex flex-col gap-3 text-[13px] tracking-wide text-[#F6F2EA]/60">
            <a href="tel:+8801703394802" className="hover:text-[#C7A873] transition-colors duration-300">
              +880 1703-394802
            </a>
            <a href="mailto:hygieneplusbd@gmail.com" className="hover:text-[#C7A873] transition-colors duration-300">
              hygieneplusbd@gmail.com
            </a>
          </div>
        </div>

        {/* Column 4: Offices */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873]">Dhaka Office</h3>
            <p className="text-[#F6F2EA]/60 text-[13px] leading-relaxed tracking-wide pr-4">
              Mazed Sardar Tower-1,<br />
              153 Haji Osman Gani Road Alu Bazar,<br />
              Dhaka, Bangladesh
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873]">China Office</h3>
            <p className="text-[#F6F2EA]/60 text-[13px] leading-relaxed tracking-wide pr-4">
              3403, Zhongliangyunjing Building,<br />
              Songbai Road, Matian Street,<br />
              Guangming, Shenzhen, Guangdong, China
            </p>
          </div>
        </div>
      </div>

      {/* 
        Bottom Section: Copyright & Legal 
      */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 z-10 w-full">
        <p className="text-[11px] text-[#F6F2EA]/40 tracking-wider">
          Copyright © {new Date().getFullYear()} hygieneplusbd.com ltd.
        </p>
        
        {/* Minimalist Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#F6F2EA]/60 hover:text-[#C7A873] transition-colors duration-300"
        >
          Back to top
          <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#C7A873] flex items-center justify-center transition-all duration-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-90">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </button>
      </div>

    </footer>
  );
};

export default Footer;