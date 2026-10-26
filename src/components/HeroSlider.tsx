import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Pause, Play } from 'lucide-react';

export type HeroSlide = {
  image: string;
  lines: [string, string, string]; // three headline lines (staggered layout)
  tag: string; // small bold label above the paragraph
  text: string;
  cta: string;
  href: string;
  nextLabel: string; // shown under the "Next" thumbnail
};

const SLIDE_MS = 6000;
const EASE = [0.76, 0, 0.24, 1] as const;

// Horizontal offsets for the 3 headline lines (gives the stepped look from the reference)
const LINE_OFFSETS = ['0%', '14%', '6%'];

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1 for the active segment
  const [peek, setPeek] = useState(false);
  const lockRef = useRef(false);

  const count = slides.length;
  const nextIndex = (index + 1) % count;

  const goTo = useCallback(
    (to: number) => {
      if (lockRef.current || to === index) return;
      lockRef.current = true;
      setPrev(index);
      setIndex(to);
      setProgress(0);
      window.setTimeout(() => (lockRef.current = false), 1400);
    },
    [index]
  );

  const next = useCallback(() => goTo((index + 1) % count), [goTo, index, count]);
  const back = useCallback(() => goTo((index - 1 + count) % count), [goTo, index, count]);

  // Autoplay progress (requestAnimationFrame so pause/resume is smooth)
  useEffect(() => {
    if (!playing || reduce) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setProgress((p) => {
        const np = p + dt / SLIDE_MS;
        return np >= 1 ? 1 : np;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduce, index]);

  useEffect(() => {
    if (progress >= 1 && playing) next();
  }, [progress, playing, next]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, back]);

  const slide = slides[index];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      className="hero-slider relative h-[100dvh] w-full overflow-hidden bg-[#0d0b09] text-[#f3ece2]"
      aria-roledescription="carousel"
      aria-label="Featured"
    >
      {/* ---------- IMAGES ---------- */}
      <div className="absolute inset-0">
        {prev !== null && (
          <img
            src={slides[prev].image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={prev === null || reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            initial={{ scale: prev === null || reduce ? 1 : 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduce ? 0 : 7, ease: 'easeOut' }}
          />
        </motion.div>
        {/* Legibility overlays */}
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-28 md:px-12 md:pb-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Headline */}
          <h1
            key={`h-${index}`}
            className="hero-serif text-[clamp(2.2rem,5.2vw,4.8rem)] font-normal uppercase leading-[1.0] tracking-[0.015em]"
            aria-live="polite"
          >
            {slide.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  className="block"
                  style={{ marginLeft: LINE_OFFSETS[i] }}
                  initial={{ y: reduce ? 0 : '110%', opacity: reduce ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (prev === null ? 0.2 : 0.55) + i * 0.12,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Description + CTA */}
          <motion.div
            key={`p-${index}`}
            className="w-full max-w-[300px] shrink-0 md:mb-3 md:mr-[8%]"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: prev === null ? 0.8 : 1.0, ease: 'easeOut' }}
          >
            <p className="hero-sans text-[13px] font-semibold">{slide.tag}</p>
            <p className="hero-sans mt-2 text-[13px] leading-relaxed text-[#f3ece2]/85">
              {slide.text}
            </p>
            <Link
              to={slide.href}
              className="hero-sans group mt-5 flex items-center justify-between border-b border-[#f3ece2]/60 pb-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-[#d9b36a] hover:text-[#d9b36a]"
            >
              {slide.cta}
              <span className="relative ml-6 block h-px w-10 bg-current transition-all duration-500 group-hover:w-14">
                <span className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rotate-45 border-r border-t border-current" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ---------- BOTTOM BAR ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[1600px] items-center gap-6 px-6 pb-8 md:px-12">
        {/* Scroll cue */}
        <button
          type="button"
          aria-label="Scroll down"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="text-[#f3ece2]/80 transition-colors hover:text-[#d9b36a]"
        >
          <ArrowDown className="h-5 w-5" strokeWidth={1} />
        </button>

        {/* Counter */}
        <span className="hero-sans hidden text-[11px] font-medium tracking-[0.2em] sm:block">
          {pad(index + 1)} / {pad(count)}
        </span>

        {/* Progress segments */}
        <div className="flex flex-1 items-center gap-2 md:max-w-[34%]">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="group relative h-4 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-[#f3ece2]/30" />
              <span
                className="absolute left-0 top-1/2 h-px bg-[#d9b36a]"
                style={{
                  width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%',
                }}
              />
            </button>
          ))}
        </div>

        {/* Pause / play */}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className="text-[#f3ece2]/80 transition-colors hover:text-[#d9b36a]"
        >
          {playing ? <Pause className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Play className="h-3.5 w-3.5" strokeWidth={1.5} />}
        </button>

        <div className="flex-1" />

        {/* Prev / Next */}
        <div className="relative flex items-center gap-4">
          {/* Next thumbnail */}
          <AnimatePresence>
            {peek && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute bottom-12 right-0 w-[130px]"
              >
                <img
                  src={slides[nextIndex].image}
                  alt=""
                  className="h-[160px] w-full object-cover shadow-2xl"
                />
                <p className="hero-sans mt-2 text-[10px] leading-tight">
                  <span className="block opacity-70">Next</span>
                  <span className="block font-semibold">{slides[nextIndex].nextLabel}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={back}
            aria-label="Previous slide"
            className="group flex h-8 w-12 items-center"
          >
            <ArrowLine dir="left" />
          </button>
          <span className="h-4 w-px bg-[#f3ece2]/40" />
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            onMouseEnter={() => setPeek(true)}
            onMouseLeave={() => setPeek(false)}
            onFocus={() => setPeek(true)}
            onBlur={() => setPeek(false)}
            className="group flex h-8 w-12 items-center justify-end"
          >
            <ArrowLine dir="right" />
          </button>
        </div>
      </div>

      {/* Fonts + scoped styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@400;500;600&display=swap');
        .hero-slider .hero-serif { font-family: 'Cormorant Garamond', 'Times New Roman', serif; }
        .hero-slider .hero-sans { font-family: 'Jost', system-ui, sans-serif; }
      `}</style>
    </section>
  );
}

function ArrowLine({ dir }: { dir: 'left' | 'right' }) {
  const isRight = dir === 'right';
  return (
    <span
      className={`relative block h-px w-9 bg-[#f3ece2] transition-all duration-500 group-hover:w-12 group-hover:bg-[#d9b36a] ${
        isRight ? '' : ''
      }`}
    >
      <span
        className={`absolute top-1/2 h-[8px] w-[8px] -translate-y-1/2 rotate-45 border-[#f3ece2] group-hover:border-[#d9b36a] ${
          isRight ? 'right-0 border-r border-t' : 'left-0 border-b border-l'
        }`}
      />
    </span>
  );
}
