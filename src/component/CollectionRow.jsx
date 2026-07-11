import React from 'react';
import bathware from "../assets/Modern Outdoor Shower.png";
import kitchenware from "../assets/Minimalist Kitchen Design.png";

const CollectionRow = () => {
  const collections = [
    {
      id: 1,
      title: "Bathware",
      subtitle: "Serene Sanctuaries",
      image: bathware,
      href: "#bathware"
    },
    {
      id: 2,
      title: "Kitchenware",
      subtitle: "Culinary Precision",
      image: kitchenware,
      href: "#kitchenware"
    }
  ];

  return (
    // Height updated to mathematically equal 100vh minus the App's outer padding, 
    // ensuring a perfect full-screen bento fit without triggering a double scrollbar.
    <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-2 h-[calc(100vh-24px)] md:h-[calc(100vh-40px)]">
      {collections.map((item) => (
        <a 
          key={item.id}
          href={item.href}
          className="relative w-full h-full overflow-hidden rounded-lg md:rounded-lg group block"
        >
          {/* Cinematic Image Zoom */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[0.25,1,0.5,1] group-hover:scale-105"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          
          {/* Base overlay to ensure text is always readable, darkening slightly on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 ease-out" />

          {/* Text & Icon Content Box */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            
            {/* Hidden overflow box for the subtitle slide-up effect */}
            <div className="overflow-hidden mb-3">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C7A873] translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {item.subtitle}
              </p>
            </div>
            
            <div className="flex items-end justify-between w-full">
              <h2 className="font-serif text-[#F6F2EA] text-4xl md:text-5xl tracking-tight leading-none">
                {item.title}
              </h2>
              
              {/* Minimalist Interactive Arrow */}
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-[#C7A873] group-hover:border-[#C7A873] transition-all duration-500 ease-out">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-[#F6F2EA]"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

          </div>
        </a>
      ))}
    </div>
  );
};

export default CollectionRow;