import React, { useState, useEffect, useRef } from "react";
import tpic1 from "../assets/tpic (1).jpeg";
import tpic2 from "../assets/tpic (2).jpeg";
import tpic3 from "../assets/tpic (3).jpeg";
import tpic4 from "../assets/tpic (4).jpeg";
import tpic5 from "../assets/tpic (5).jpeg";
import tpic6 from "../assets/tpic (6).jpeg";
import tpic7 from "../assets/tpic (7).jpeg";
import tpic8 from "../assets/tpic (8).jpeg";
import tpic9 from "../assets/tpic (9).jpeg";
import tpic10 from "../assets/tpic (10).jpeg";
import tpic11 from "../assets/tpic (11).jpeg";
import tpic12 from "../assets/tpic (12).jpeg";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Heart, ArrowDown, Play, Pause, SkipForward, SkipBack,
  Sparkles, Quote, Infinity as InfinityIcon,
} from "lucide-react";

/**
 * A LETTER FOR HER — Ultimate Romantic Edition, take three
 * ------------------------------------------------------------------
 * This pass: the gallery is now a real Pinterest-style masonry wall
 * built from your 12 photos, each one framed as its own polaroid,
 * kept at its natural size/aspect ratio instead of being cropped
 * into a fixed box. Captions are written about her — this gallery
 * is just her, not "us" shots — so adjust CAPTIONS below to match
 * whichever photo lands in which slot if you reorder PHOTOS.
 * ------------------------------------------------------------------
 */

// ---------- 1. CONTENT (personalize this!) ----------

const HER_NAME = "My Love Tahrina";
const YOUR_NAME = "Your e beta";

const STANZAS = [
  "I don't need a specific reason or a special occasion to write this. Some mornings the light comes through the window a certain way, and I think of you before the world even wakes up. That is reason enough.",
  "You have this quiet, beautiful way of turning my ordinary days into moments I want to frame forever. It's in the small jokes we share, the way you laugh at your own stories before you finish them, and the comfortable silence when we don't need words at all.",
  "I wanted to build something for you with my own hands. A digital sanctuary. A small, imperfect letter, crafted line by line, just to remind you of how deeply you are loved.",
];

const THE_LITTLE_THINGS = [
  "How your definition of 'sitting next to me' actually means sitting completely on top of me (and how I wouldn't have it any other way).",
  "The beautiful, absolute chaos of your train of thought, and how you look so damn cute when you get hyper about a random idea.",
  "How you weaponize that little pout of yours, knowing exactly how fast I'll surrender to it.",
  "The way you randomly turn into a tiny, aggressive koala when you decide you need attention right that very second.",
  "How you can seamlessly switch from being a complete, adorable menace to the most gorgeous girl in the room in under three seconds."
];

const REASONS = [
  { 
    title: "Your Beautiful Chaos", 
    desc: "You are a whirlwind of random energy and spontaneous ideas. Watching your mind run wild is endlessly entertaining, and honestly, incredibly hot." 
  },
  { 
    title: "Your Zero-Boundary Policy", 
    desc: "The way you completely refuse to respect my personal space. Having you permanently attached to me like a gorgeous, needy koala is my favorite feeling in the world." 
  },
  { 
    title: "Your Weaponized Charm", 
    desc: "How you can be acting completely silly, throw a tiny, adorable tantrum, and then flash that smile that makes me want to give you literally anything you ask for." 
  },
  { 
    title: "The Crash", 
    desc: "For all your wild, unhinged energy, the moment you finally run out of batteries and just melt into my chest is the most perfect peace I've ever known." 
  },
];

const TIMELINE = [
  { date: "October 22", title: "wanna date ?", desc: "I still remember exactly exiced you were wish i could see the reaction." },
  { date: "October 24", title: "The First kiss", desc: "I still remember exactly what you were wearing and how my heart raced while we kissed." },
  { date: "dont remember the date", title: "e beta 😤", desc: "Still laugh when I remember it." },
];

// Same story, plotted as a constellation. Keep it short — five points reads well.
const STARS = [
  { x: 12, y: 72, label: "The First Hello" },
  { x: 32, y: 28, label: "That Midnight" },
  { x: 54, y: 62, label: "The Back Hug" },
  { x: 74, y: 22, label: "Today" },
  { x: 90, y: 50, label: "Whatever comes next" },
];

const PROMISES = [
  "I promise to always listen, especially when you think you aren't making sense.",
  "I promise to be your safe place, on the good days and the impossible ones.",
  "I promise to choose you. Every single day.",
];

const SECRET_MESSAGE = "Thank you. You have won unlimited free kisses for life";

const CLOSING_LINE = "Thank you for being the absolute best part of my life.";

// her photos, in order — reorder freely, PHOTOS and CAPTIONS just need to line up
const PHOTOS = [
  tpic1, tpic2, tpic3, tpic4, tpic5, tpic6,
  tpic7, tpic8, tpic9, tpic10, tpic11, tpic12,
];

// captions about her alone — edit these to match each actual photo
const CAPTIONS = [
  "Her smile that undoes me",
  "another cute pic",
  "she at morning",
  "The look only she has",
  "Cuttest pic",
  "Her favorite kind of morning",
  "cutieeeee",
  "Her in her element",
  "eeeechuuuuuu",
  "Just her, being her",
  "the laugh tho 😭",
  "She said she cant pout",
];

// a small deterministic set of tilts so the wall doesn't feel too uniform
const TILTS = [-4, 3, -2, 5, -3, 4, -5, 2, -3, 4, -2, 3];

// ---------- 2. AMBIENT / ATMOSPHERE ----------

// background wash that drifts through warm tones as you scroll the page
function AmbientWash({ scrollYProgress }) {
  const bg = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#fdfbf9", "#faf1ee", "#f6ebee", "#f1e4ee", "#ece0ef"]
  );
  return (
    <motion.div className="fixed inset-0 -z-10" style={{ backgroundColor: bg }} />
  );
}

// little hearts that bloom and fade wherever the cursor moves
function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastSpawn.current < 100) return;
      lastSpawn.current = now;
      const id = now + Math.random();
      setTrail((t) => [...t.slice(-12), { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 hidden sm:block">
      <AnimatePresence>
        {trail.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0.75, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 1.3, y: "-160%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            onAnimationComplete={() =>
              setTrail((t) => t.filter((pt) => pt.id !== p.id))
            }
          >
            <Heart size={11} className="text-[#d48a9b]" fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// heart-shaped reading progress, pinned top right
function ScrollHeart({ scrollYProgress }) {
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heartPath =
    "M12 21s-7.5-4.6-10-9.3C.5 8 2 4 6 4c2 0 3.5 1.2 6 4 2.5-2.8 4-4 6-4 4 0 5.5 4 4 7.7C19.5 16.4 12 21 12 21z";
  return (
    <div className="fixed top-6 right-6 z-50 w-9 h-9 hidden sm:block">
      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full opacity-25">
        <path d={heartPath} fill="none" stroke="#9e3a47" strokeWidth="1.5" />
      </svg>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `path('${heartPath}')` }}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ height, background: "#d48a9b" }}
        />
      </div>
    </div>
  );
}

function GlowingParticles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 43) % 100}%`,
    top: `${(i * 61) % 100}%`,
    size: (i % 3) + 2,
    duration: 10 + (i % 5) * 2,
    delay: (i % 6) * 0.8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d48a9b]"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(212, 138, 155, 0.35)`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: [-20, -100] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// word-by-word reveal for the hero line
function TypeReveal({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  );
}

// ---------- 3. PHOTOS ----------

// a real photo, framed as a polaroid, kept at its natural aspect ratio,
// that tilts gently in 3D toward the cursor
function Polaroid({ src, label, rotation, delay }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 150, damping: 14 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 150, damping: 14 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      style={{ rotate: rotation, rotateX, rotateY, transformPerspective: 800 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative bg-white p-3 pb-9 shadow-xl rounded-sm cursor-pointer w-full"
    >
      <img
        src={src}
        alt={label}
        className="w-full h-auto block rounded-[1px]"
        loading="lazy"
      />
      <p className="absolute bottom-2 left-0 w-full text-center ll-handwriting text-lg text-[#4a3b42] opacity-80">
        {label}
      </p>
    </motion.div>
  );
}

// ---------- 4. INTERACTIVE PIECES ----------

function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(74,59,66,0.05)] mt-12 mb-20 relative z-10">
      <p className="ll-utility text-[10px] tracking-[0.3em] uppercase opacity-50 mb-6 font-bold text-[#4a3b42]">
        Our Soundtrack
      </p>
      <div className="flex items-center w-full gap-6">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center shadow-xl border-4 border-zinc-800"
        >
          <div className="absolute inset-1 rounded-full border border-zinc-700/50" />
          <div className="absolute inset-3 rounded-full border border-zinc-700/50" />
          <div className="w-8 h-8 bg-[#d48a9b] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
        <div className="flex-1 text-left">
          <h4 className="ll-utility font-bold text-[#4a3b42] text-lg">Perfect</h4>
          <p className="ll-utility text-sm text-[#4a3b42] opacity-60">Ed Sheeran</p>
          <div className="flex items-center gap-4 mt-3 text-[#4a3b42]">
            <SkipBack size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-[#4a3b42] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-1" fill="currentColor" />}
            </button>
            <SkipForward size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-[#4a3b42]/10 rounded-full mt-8 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#d48a9b]"
          initial={{ width: "0%" }}
          animate={{ width: isPlaying ? "100%" : "25%" }}
          transition={{ duration: isPlaying ? 240 : 0.5, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// your story, plotted as a constellation — hover a star for the memory
function ConstellationMap() {
  const [hovered, setHovered] = useState(null);
  const pathD = STARS.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const bgStars = Array.from({ length: 36 }, (_, i) => ({
    left: (i * 53) % 100, top: (i * 29) % 100, size: (i % 3) + 1,
  }));

  return (
    <div
      className="relative w-full max-w-4xl mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl"
      style={{ background: "radial-gradient(ellipse at center, #2a1c2e 0%, #1b1224 100%)" }}
    >
      {bgStars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i % 5) * 0.4 }}
        />
      ))}

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <motion.path
          d={pathD}
          fill="none"
          stroke="#d48a9b"
          strokeWidth="0.3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {STARS.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-[#f2c6d6] cursor-pointer"
            style={{ boxShadow: "0 0 12px 4px rgba(242,198,214,0.55)" }}
            whileHover={{ scale: 1.7 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          />
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-1/2 -translate-x-1/2 top-5 whitespace-nowrap bg-white/95 text-[#4a3b42] text-xs px-3 py-1.5 rounded-full shadow-lg ll-utility"
              >
                {p.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// scratch away the foil to read the secret underneath
function ScratchCard({ message }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = "#e4d8ce";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9e3a47";
      ctx.textAlign = "center";
      ctx.font = "600 13px Jost, sans-serif";
      ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2 - 6);
      ctx.font = "italic 400 13px 'Cormorant Garamond', serif";
      ctx.fillStyle = "#4a3b42";
      ctx.fillText("a secret, just for you", canvas.width / 2, canvas.height / 2 + 16);
    };
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 26, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 4 * 10) {
      sampled++;
      if (data[i] === 0) clear++;
    }
    if (sampled && clear / sampled > 0.55) setRevealed(true);
  };

  const handleMove = (e) => {
    if (!isDrawing.current) return;
    const point = e.touches ? e.touches[0] : e;
    scratchAt(point.clientX, point.clientY);
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-md mx-auto aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-white">
        <p className="ll-display italic text-xl sm:text-2xl text-[#4a3b42] leading-relaxed">{message}</p>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none select-none"
          onMouseDown={() => (isDrawing.current = true)}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
          onMouseMove={handleMove}
          onTouchStart={() => (isDrawing.current = true)}
          onTouchEnd={() => (isDrawing.current = false)}
          onTouchMove={handleMove}
        />
      )}
    </div>
  );
}

// tap to seal the letter with a burst of little hearts
function KissSeal() {
  const [sealed, setSealed] = useState(false);
  const burst = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={() => setSealed(true)}
        disabled={sealed}
        whileHover={!sealed ? { scale: 1.06 } : {}}
        whileTap={!sealed ? { scale: 0.94 } : {}}
        animate={sealed ? { scale: [1, 1.25, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "#9e3a47" }}
      >
        <Heart size={26} color="#fff" fill="#fff" />
        <AnimatePresence>
          {sealed &&
            burst.map((i) => {
              const angle = (i / burst.length) * Math.PI * 2;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                  animate={{ x: Math.cos(angle) * 90, y: Math.sin(angle) * 90, opacity: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <Heart size={10} color="#d48a9b" fill="#d48a9b" />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.button>
      <p className="ll-utility text-[11px] tracking-[0.25em] uppercase opacity-50 mt-4">
        {sealed ? "sealed with love" : "tap to seal with a kiss"}
      </p>
    </div>
  );
}

// ---------- 5. ENVELOPE INTRO ----------

function Envelope({ onOpen, stage }) {
  const opening = stage !== "envelope";
  return (
    <AnimatePresence>
      {stage !== "letter" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdfbf9]"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.button
              onClick={onOpen}
              disabled={opening}
              className="relative group"
              style={{ width: 280, height: 190 }}
              whileHover={!opening ? { scale: 1.02 } : {}}
              animate={opening ? { scale: 1.05, y: -20 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 rounded-lg shadow-2xl bg-[#eee5e0]" />
              <motion.div
                className="absolute left-1/2 rounded-md shadow-md bg-white border border-[#eaeaea] p-4 flex flex-col items-center justify-center"
                style={{ width: 240, height: 160, top: 15, x: "-50%" }}
                animate={opening ? { y: -140, opacity: 1 } : { y: 0, opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Heart className="text-[#d48a9b] opacity-50 mb-2" size={24} />
                <div className="w-2/3 h-2 bg-gray-100 rounded-full mb-2" />
                <div className="w-1/2 h-2 bg-gray-100 rounded-full" />
              </motion.div>
              <motion.div
                className="absolute top-0 left-0 w-full origin-top"
                style={{ height: 110 }}
                animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 280 110" className="w-full h-full drop-shadow-md">
                  <polygon points="0,0 280,0 140,110" fill="#f4ece8" stroke="#e8dfd8" strokeWidth="1" />
                </svg>
              </motion.div>
              <motion.div
                className="absolute z-20 rounded-full flex items-center justify-center bg-[#9e3a47] shadow-[0_4px_10px_rgba(158,58,71,0.4)]"
                style={{ width: 50, height: 50, top: 85, left: "50%", x: "-50%" }}
                animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Heart size={20} color="#ffffff" fill="#ffffff" />
              </motion.div>
            </motion.button>

            <motion.p
              className="text-center opacity-60 ll-utility text-[11px] tracking-[0.3em] text-[#4a3b42] font-semibold uppercase"
              animate={{ opacity: opening ? 0 : [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: opening ? 0 : Infinity }}
            >
              {opening ? "Opening..." : "Tap the seal"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- 6. MAIN APP ----------

export default function LoveLetter() {
  const [stage, setStage] = useState("envelope");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (stage === "letter") window.scrollTo(0, 0);
  }, [stage]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-[#d48a9b] selection:text-white text-[#4a3b42]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@500;700&family=Jost:wght@300;400;500;600&display=swap');
        .ll-display { font-family: 'Cormorant Garamond', serif; }
        .ll-utility { font-family: 'Jost', sans-serif; }
        .ll-handwriting { font-family: 'Dancing Script', cursive; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fdfbf9; }
        ::-webkit-scrollbar-thumb { background: #e8dfd8; border-radius: 10px; }
      `}</style>

      <Envelope
        onOpen={() => {
          if (stage === "envelope") {
            setStage("opening");
            setTimeout(() => setStage("letter"), 1200);
          }
        }}
        stage={stage}
      />

      {stage === "letter" && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10"
        >
          <AmbientWash scrollYProgress={scrollYProgress} />
          <ScrollHeart scrollYProgress={scrollYProgress} />
          <CursorTrail />
          <GlowingParticles />

          {/* HERO */}
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
            <Reveal delay={0.2}>
              <p className="ll-utility text-[12px] tracking-[0.4em] uppercase opacity-60 mb-6 font-medium text-[#9e3a47]">
                For {HER_NAME}
              </p>
            </Reveal>
            <TypeReveal
              text="Every beautiful story I tell finds its way back to you."
              className="ll-display italic text-4xl sm:text-7xl leading-tight max-w-3xl text-[#4a3b42]"
              delay={0.4}
            />
            <Reveal delay={1.6} className="absolute bottom-12">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="opacity-30">
                <ArrowDown size={28} />
              </motion.div>
            </Reveal>
          </section>

          {/* THE LETTER */}
          <section className="relative px-6 sm:px-10 py-24 max-w-3xl mx-auto text-center sm:text-left">
            <Reveal>
              <div className="flex items-center gap-4 mb-16 justify-center sm:justify-start opacity-50">
                <div className="h-px w-12 bg-[#4a3b42]" />
                <Sparkles size={16} />
                <div className="h-px w-12 bg-[#4a3b42]" />
              </div>
            </Reveal>
            <div className="space-y-10">
              {STANZAS.map((line, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <p className="ll-display text-2xl sm:text-3xl leading-[1.6] text-[#4a3b42] opacity-90">{line}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <VinylPlayer />
          </Reveal>

          {/* REASONS WHY */}
          <section className="relative px-6 sm:px-10 py-24 max-w-5xl mx-auto">
            <Reveal className="text-center mb-16">
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">Why I Love You</h2>
              <div className="w-12 h-px bg-[#d48a9b] mx-auto mt-6" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {REASONS.map((reason, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-8 sm:p-10 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all group">
                    <Heart size={20} className="text-[#d48a9b] mb-4 opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all" fill="currentColor" />
                    <h3 className="ll-display text-2xl font-semibold mb-3">{reason.title}</h3>
                    <p className="ll-utility text-[15px] leading-relaxed opacity-70">{reason.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* THE LITTLE THINGS */}
          <section className="relative px-6 sm:px-10 py-24 w-full bg-gradient-to-b from-transparent via-[#f5efeb] to-transparent">
            <Reveal className="text-center mb-16 max-w-2xl mx-auto">
              <Quote className="mx-auto mb-6 text-[#d48a9b] opacity-40" size={32} />
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">The Little Things</h2>
              <p className="ll-utility text-sm mt-4 opacity-60 uppercase tracking-widest">The details I'd memorize if the world ended tomorrow.</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {THE_LITTLE_THINGS.map((thing, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 sm:p-8 rounded-xl bg-white/60 shadow-sm flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#d48a9b] mt-2 flex-shrink-0" />
                    <p className="ll-display text-xl sm:text-2xl text-[#4a3b42] leading-snug">{thing}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* TIMELINE */}
          <section className="relative px-6 sm:px-10 py-32 max-w-3xl mx-auto">
            <Reveal className="text-center mb-20">
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">Moments in Time</h2>
            </Reveal>
            <div className="relative border-l-2 border-[#e8dfd8] ml-4 sm:ml-12 space-y-16 pb-8">
              {TIMELINE.map((item, i) => (
                <Reveal key={i} delay={i * 0.1} className="relative pl-8 sm:pl-16">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#d48a9b] border-4 border-[#fdfbf9] shadow-sm" />
                  <span className="ll-utility text-[11px] font-bold tracking-[0.2em] text-[#9e3a47] uppercase bg-[#f4ece8] px-3 py-1 rounded-full">{item.date}</span>
                  <h3 className="ll-display text-3xl font-semibold mt-4 mb-2 text-[#4a3b42]">{item.title}</h3>
                  <p className="ll-utility text-[15px] opacity-70 leading-relaxed text-[#4a3b42] max-w-md">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* WRITTEN IN THE STARS */}
          <section className="relative px-6 sm:px-10 py-24">
            <Reveal className="text-center mb-14 max-w-2xl mx-auto">
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">Written in the Stars</h2>
              <p className="ll-utility text-sm mt-4 opacity-60 uppercase tracking-widest">Hover a star for the memory</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ConstellationMap />
            </Reveal>
          </section>

          {/* PHOTO WALL — pinterest-style masonry of her, each shot framed as a polaroid */}
          <section className="relative px-6 sm:px-10 py-24 w-full overflow-hidden">
            <Reveal className="text-center mb-16">
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">Simply Her</h2>
              <p className="ll-utility text-sm mt-4 opacity-60 uppercase tracking-widest">
                Every picture here is just you
              </p>
            </Reveal>
            <div className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-5 sm:gap-7">
              {PHOTOS.map((src, i) => (
                <div key={i} className="mb-5 sm:mb-7 break-inside-avoid">
                  <Reveal delay={(i % 6) * 0.08}>
                    <Polaroid
                      src={src}
                      label={CAPTIONS[i] || "Her"}
                      rotation={`${TILTS[i % TILTS.length]}deg`}
                      delay={0}
                    />
                  </Reveal>
                </div>
              ))}
            </div>
          </section>

          {/* PROMISES */}
          <section className="relative px-6 sm:px-10 py-24 max-w-3xl mx-auto text-center">
            <Reveal className="mb-12">
              <InfinityIcon size={32} className="mx-auto text-[#d48a9b] opacity-60 mb-6" />
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">My Promises</h2>
            </Reveal>
            <div className="space-y-8">
              {PROMISES.map((promise, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="ll-display text-2xl sm:text-3xl text-[#4a3b42] opacity-80">"{promise}"</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* SCRATCH-TO-REVEAL SECRET */}
          <section className="relative px-6 sm:px-10 py-24 max-w-3xl mx-auto text-center">
            <Reveal className="mb-10">
              <h2 className="ll-display italic text-4xl sm:text-5xl text-[#4a3b42]">One More Thing</h2>
              <p className="ll-utility text-sm mt-4 opacity-60 uppercase tracking-widest">Scratch the card below</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ScratchCard message={SECRET_MESSAGE} />
            </Reveal>
          </section>

          {/* CLOSING */}
          <section className="relative px-6 py-32 flex flex-col items-center text-center">
            <Reveal>
              <p className="ll-display italic text-4xl sm:text-5xl max-w-2xl leading-tight mb-16 text-[#4a3b42]">
                {CLOSING_LINE}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="ll-handwriting text-4xl sm:text-5xl font-bold text-[#4a3b42] mb-16">
                Love, {YOUR_NAME}
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <KissSeal />
            </Reveal>
          </section>
        </motion.main>
      )}
    </div>
  );
}