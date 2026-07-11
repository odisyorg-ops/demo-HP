import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HygienePlus BD — Landing Page
 * -------------------------------------------------
 * Design tokens (keep these in sync with your tailwind.config if you
 * migrate the arbitrary values below into theme colors):
 *
 *   --porcelain : #F6F2EA   background (light)
 *   --basalt    : #131210   background (dark) / ink
 *   --brass     : #9C7A4A   accent (fixtures, CTAs)
 *   --brass-lt  : #C7A873   accent hover / highlights
 *   --mist      : #E8E2D3   placeholder / card surface (light)
 *   --slate     : #24231F   placeholder / card surface (dark)
 *
 * Fonts (loaded via Google Fonts below):
 *   Display : "Fraunces"        — used sparingly, headlines only
 *   Body    : "Inter"           — paragraphs, nav, buttons
 *   Mono    : "IBM Plex Mono"   — eyebrows, labels, tags
 *
 * All images are intentionally left as empty placeholder <div>s.
 * Each is labeled with a data-slot comment so you can find/replace
 * it later — search for "IMAGE SLOT" in this file.
 */

// ---------------------------------------------------------------------------
// Small reusable bits
// ---------------------------------------------------------------------------

/** Eyebrow label with the signature "rising water" line that fills on scroll. */
function Eyebrow({ children, dark = false }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <span className="relative block h-4 w-px overflow-hidden bg-current/20">
                <motion.span
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute bottom-0 left-0 w-px ${dark ? "bg-[#C7A873]" : "bg-[#9C7A4A]"
                        }`}
                />
            </span>
            <span
                className={`font-['IBM_Plex_Mono'] text-[11px] tracking-[0.22em] uppercase ${dark ? "text-[#C7A873]" : "text-[#9C7A4A]"
                    }`}
            >
                {children}
            </span>
        </div>
    );
}

/** Placeholder for an image that will be swapped in later. */
function ImageSlot({ label, dark = false, className = "" }) {
    return (
        <div
            // IMAGE SLOT — replace this div's children with an <img> or bg image
            className={`relative w-full h-full min-h-[220px] flex items-end p-4 border ${dark
                    ? "bg-[#1B1A16] border-white/10"
                    : "bg-[#E8E2D3] border-black/5"
                } ${className}`}
        >
            <span
                className={`font-['IBM_Plex_Mono'] text-[10px] tracking-[0.15em] uppercase ${dark ? "text-white/30" : "text-black/30"
                    }`}
            >
                {label}
            </span>
        </div>
    );
}

function fadeUp(delay = 0) {
    return {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    };
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

function Nav() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${scrolled ? "bg-[#131210]/90 backdrop-blur-md" : "bg-transparent"
                }`}
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-16">
                <span className="font-['Fraunces'] text-white text-[17px] tracking-wide">
                    Hygiene<span className="text-[#C7A873]">Plus</span>
                </span>
                <nav className="hidden md:flex items-center gap-9 font-['Inter'] text-[13px] text-white/70">
                    <a href="#" className="hover:text-white transition-colors">Bath</a>
                    <a href="#" className="hover:text-white transition-colors">Kitchen</a>
                    <a href="#" className="hover:text-white transition-colors">Showroom</a>
                    <a href="#" className="hover:text-white transition-colors">Journal</a>
                </nav>
                <a
                    href="#"
                    className="font-['Inter'] text-[13px] text-white/90 border border-white/25 rounded-full px-4 py-1.5 hover:bg-white hover:text-[#131210] transition-colors"
                >
                    Contact
                </a>
            </div>
        </header>
    );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
    return (
        <section className="relative h-[92vh] min-h-[560px] w-full">
            <ImageSlot label="Image — hero, master bath" className="absolute inset-0 min-h-0" dark />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

            <motion.div
                {...fadeUp(0.15)}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
            >
                <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.28em] uppercase text-[#E8C79A] mb-6">
                    Sanitary Bathware &amp; Kitchenware
                </p>
                <h1 className="font-['Fraunces'] text-white text-[13vw] leading-[0.95] md:text-[5.4rem] max-w-4xl">
                    Water,
                    <br />
                    considered.
                </h1>
                <button className="mt-9 font-['Inter'] text-[13px] text-[#131210] bg-white rounded-full px-6 py-3 hover:bg-[#E8C79A] transition-colors">
                    View collections
                </button>
            </motion.div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Two-tile grid (Collection / Brass statement panel)
// ---------------------------------------------------------------------------

function CollectionRow() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2">
            <motion.div {...fadeUp(0)} className="h-[70vh] min-h-[420px] flex flex-col">
                <ImageSlot label="Image — brass mixer tap" className="flex-1" />
                <div className="bg-[#F6F2EA] px-8 py-7">
                    <Eyebrow>Collection 01</Eyebrow>
                    <h3 className="font-['Fraunces'] text-2xl text-[#131210] mb-2">
                        Mixers &amp; taps
                    </h3>
                    <p className="font-['Inter'] text-[13px] text-black/55 mb-5 max-w-xs">
                        Brushed brass fittings finished by hand, built for daily ritual.
                    </p>
                    <a href="#" className="font-['Inter'] text-[12px] tracking-wide text-[#9C7A4A] border-b border-[#9C7A4A]/40 pb-0.5 hover:border-[#9C7A4A] transition-colors">
                        Explore taps →
                    </a>
                </div>
            </motion.div>

            <motion.div
                {...fadeUp(0.1)}
                className="h-[70vh] min-h-[420px] bg-[#9C7A4A] flex flex-col justify-between p-10"
            >
                <Eyebrow dark>Visit us</Eyebrow>
                <div>
                    <h3 className="font-['Fraunces'] text-3xl text-[#131210] leading-tight mb-6 max-w-sm">
                        See the full range at our Dhaka showroom.
                    </h3>
                    <button className="font-['Inter'] text-[13px] text-[#F6F2EA] bg-[#131210] rounded-full px-6 py-3 hover:bg-black transition-colors">
                        Get directions
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Full-bleed statement
// ---------------------------------------------------------------------------

function Statement() {
    return (
        <section className="relative h-[80vh] min-h-[460px]">
            <ImageSlot label="Image — hand under running water" className="absolute inset-0 min-h-0" dark />
            <div className="absolute inset-0 bg-black/25" />
            <motion.div {...fadeUp(0.1)} className="relative z-10 h-full flex flex-col justify-end p-8 md:p-14">
                <Eyebrow dark>Ritual</Eyebrow>
                <p className="font-['Fraunces'] italic text-white/90 text-2xl md:text-3xl max-w-xl">
                    “The tap is where the day begins.”
                </p>
            </motion.div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Second two-tile grid (Kitchen / Product)
// ---------------------------------------------------------------------------

function KitchenRow() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2">
            <motion.div {...fadeUp(0)} className="h-[70vh] min-h-[420px] relative">
                <ImageSlot label="Image — kitchen, evening" className="absolute inset-0 min-h-0" dark />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                    <Eyebrow dark>Collection 02</Eyebrow>
                    <h3 className="font-['Fraunces'] text-2xl text-white mb-4">
                        Kitchen, considered
                    </h3>
                    <a href="#" className="font-['Inter'] text-[12px] tracking-wide text-[#E8C79A] border-b border-[#E8C79A]/40 pb-0.5 hover:border-[#E8C79A] transition-colors">
                        Discover sinks →
                    </a>
                </div>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="h-[70vh] min-h-[420px] flex flex-col">
                <ImageSlot label="Image — steel sink, studio" className="flex-1" />
                <div className="bg-[#F6F2EA] px-8 py-7">
                    <Eyebrow>Material</Eyebrow>
                    <h3 className="font-['Fraunces'] text-2xl text-[#131210] mb-2">
                        A quieter kind of steel
                    </h3>
                    <p className="font-['Inter'] text-[13px] text-black/55 max-w-xs">
                        16-gauge basins, sound-dampened and finished matte.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function Footer() {
    const cols = [
        {
            title: "Shop",
            links: ["Taps & mixers", "Basins", "Kitchen sinks", "Showers"],
        },
        {
            title: "Company",
            links: ["About", "Showroom", "Journal", "Careers"],
        },
        {
            title: "Contact",
            links: ["Gulshan, Dhaka", "+880 1XX XXX XXXX", "hello@hygieneplusbd.com"],
        },
    ];
    return (
        <footer className="bg-[#131210] px-6 md:px-10 pt-16 pb-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                <div className="col-span-2 md:col-span-1">
                    <span className="font-['Fraunces'] text-white text-[17px]">
                        Hygiene<span className="text-[#C7A873]">Plus</span>
                    </span>
                    <p className="font-['Inter'] text-[12px] text-white/40 mt-3 max-w-[200px]">
                        Sanitary bathware &amp; kitchenware, made for quiet, lasting use.
                    </p>
                </div>
                {cols.map((col) => (
                    <div key={col.title}>
                        <p className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
                            {col.title}
                        </p>
                        <ul className="space-y-2.5">
                            {col.links.map((l) => (
                                <li key={l}>
                                    <a
                                        href="#"
                                        className="font-['Inter'] text-[13px] text-white/65 hover:text-white transition-colors"
                                    >
                                        {l}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-[1400px] mx-auto border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-3">
                <p className="font-['Inter'] text-[11px] text-white/30">
                    © {new Date().getFullYear()} HygienePlus BD. All rights reserved.
                </p>
                <p className="font-['Inter'] text-[11px] text-white/30">
                    Dhaka, Bangladesh
                </p>
            </div>
        </footer>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HygienePlusLanding() {
    return (
        <div className="bg-[#F6F2EA] font-['Inter']">
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
            />
            <Nav />
            <Hero />
            <CollectionRow />
            <Statement />
            <KitchenRow />
            <Footer />
        </div>
    );
}