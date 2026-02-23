import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Sparkles,
} from "lucide-react";
import { useCountUp, useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Animated stat counter ── */
const Stat = ({ icon: Icon, label, value }) => {
  const ref = useRef(null);
  useCountUp(ref, value, 1800);
  return (
    <div className="stat-box flex flex-col items-center gap-1 min-w-[100px]">
      <Icon size={18} className="text-black/30 dark:text-white/30 mb-1" />
      <span
        ref={ref}
        className="text-3xl font-black text-black dark:text-white tabular-nums"
      >
        {value}
      </span>
      <span className="text-xs text-black/35 dark:text-white/25 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

const stats = [
  { icon: BookOpen, label: "Courses", value: "500+" },
  { icon: Users, label: "Students", value: "20K+" },
  { icon: Award, label: "Instructors", value: "120+" },
];

const TICKER_WORDS = [
  "Next.js",
  "Machine Learning",
  "UI Design",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "DevOps",
  "Web3",
  "Figma",
  "Flutter",
  "AWS",
  "Next.js",
  "Machine Learning",
  "UI Design",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "DevOps",
  "Web3",
  "Figma",
  "Flutter",
  "AWS",
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const cursorRef = useRef(null);

  /* Silky lerp cursor glow */
  useEffect(() => {
    let raf;
    const current = { x: -999, y: -999 };
    const target = { x: -999, y: -999 };
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const loop = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${current.x}px`;
        cursorRef.current.style.top = `${current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const searchQueryHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`course/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="cursor-glow"
        style={{ left: -999, top: -999 }}
      />

      <section className="relative grid-bg min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-16 noise-overlay">
        {/* Floating particles */}
        <div
          className="animate-float      absolute top-24  left-[8%]   w-3 h-3 rounded-full bg-black/10 dark:bg-white/10 pointer-events-none"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="animate-float-slow absolute top-40  right-[10%] w-5 h-5 rounded-full bg-black/6  dark:bg-white/5  pointer-events-none"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="animate-float      absolute bottom-40 left-[15%] w-2 h-2 rounded-full bg-black/15 dark:bg-white/15 pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="animate-float-slow absolute bottom-24 right-[18%] w-4 h-4 rounded-full bg-black/8  dark:bg-white/8  pointer-events-none"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Spinning rings */}
        <div className="animate-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-black/[0.04] dark:border-white/[0.025] pointer-events-none" />
        <div
          className="animate-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-black/[0.05] dark:border-white/[0.03]  pointer-events-none"
          style={{ animationDirection: "reverse", animationDuration: "30s" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          {/* Badge */}
          <div className="badge-pill animate-slide-up delay-0">
            <Sparkles size={12} />
            The future of learning is here
          </div>

          {/* Headline */}
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight animate-slide-up delay-100">
              <span className="text-black dark:text-white">Master Any</span>{" "}
              <span className="gradient-text">Skill.</span>
            </h1>
          </div>
          <div className="overflow-hidden -mt-4">
            <p className="text-3xl md:text-5xl font-bold text-black/30 dark:text-white/35 animate-slide-up delay-200">
              On Your Own Terms.
            </p>
          </div>

          <p className="text-base md:text-lg text-black/45 dark:text-white/30 max-w-xl leading-relaxed animate-slide-up delay-300">
            Discover world-class courses taught by industry experts. Build
            real-world skills and level up your career — at your own pace.
          </p>

          {/* Search */}
          <form
            onSubmit={searchQueryHandler}
            className="flex items-center w-full max-w-xl h-14 rounded-2xl overflow-hidden glow-border bg-white/80 dark:bg-white/[0.04] backdrop-blur-md shadow-sm dark:shadow-none animate-scale-in delay-400"
          >
            <Search
              size={18}
              className="ml-4 text-black/30 dark:text-white/25 flex-shrink-0"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses, topics, skills..."
              className="h-full flex-grow bg-transparent border-none focus:outline-none px-4 text-black dark:text-white placeholder:text-black/25 dark:placeholder:text-white/20 text-sm"
            />
            <button
              type="submit"
              className="btn-glow h-full px-6 text-sm font-semibold rounded-r-2xl"
            >
              Search
            </button>
          </form>

          {/* CTA */}
          <div className="animate-slide-up delay-500">
            <Button
              onClick={() => navigate(`/course/search?query`)}
              className="btn-glow h-12 px-10 rounded-xl text-sm animate-pulse-glow"
            >
              Explore All Courses <ArrowRight size={15} className="ml-2" />
            </Button>
          </div>

          {/* Stat boxes */}
          <div className="flex items-center gap-4 mt-4 flex-wrap justify-center animate-slide-up delay-600">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
      </section>

      {/* Ticker strip */}
      <div className="ticker-wrap py-3">
        <div className="ticker-track">
          {TICKER_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 mx-6 text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-white/30"
            >
              <span className="text-black/30 dark:text-white/15">✦</span>
              {word}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
