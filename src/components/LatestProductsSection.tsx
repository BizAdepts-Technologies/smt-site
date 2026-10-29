import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/products';
import { api } from '../cms/api';

/**
 * Latest products – one product at a time.
 *
 * Layout (same idea as the reference recording):
 *  - full-height image flush on the left, the NEXT product's image peeking in at the right edge
 *  - bold product name on the right; its letters scatter away along a curve, then the next name
 *    flies back in letter by letter
 *  - bottom bar: "02 —— 04" counter with an autoplay progress line, round prev / next buttons
 *
 * To show different items, pass an `items` prop (otherwise the latest products come from the backend,
 * falling back to `defaultItems`).
 */

export type LatestItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  meta?: string;
  href: string;
};

const defaultItems: LatestItem[] = categories.slice(0, 6).map((c) => ({
  id: c.id,
  name: c.name,
  image: c.image,
  description: c.description,
  meta: `${c.count} Products`,
  href: `/products/${c.id}`,
}));

const SLIDE_DURATION = 0.9; // seconds for the image strip to move
const AUTOPLAY_MS = 4000; // 4 seconds (4-5s timer)
const PEEK = 48; // px of the next image visible at the right edge
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const resolveImageUrl = (img?: string) => {
  if (!img) return import.meta.env.BASE_URL + 'das_ideenbuch_2018/sliding-wardrobe-interior.jpg';
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img.replace('127.0.0.1:8000', 'localhost:8000');
  }
  if (img.startsWith('/media')) {
    return `http://localhost:8000${img}`;
  }
  return img;
};

const pad = (n: number) => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ */
/* Letter-scatter heading                                              */
/* ------------------------------------------------------------------ */

function makeCharVariants(reduce: boolean | null): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2 } },
      out: { opacity: 0, transition: { duration: 0.15 } },
    };
  }
  return {
    // enters from the upper right, curving into place
    hidden: (i: number) => ({
      opacity: 0,
      x: 150 + i * 8,
      y: -90 - (i % 4) * 22,
      rotate: 70 + (i % 3) * 40,
      scale: 0.5,
      filter: 'blur(6px)',
    }),
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { delay: Math.min(i, 26) * 0.022, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
    // leaves toward the lower right, curving away
    out: (i: number) => ({
      opacity: 0,
      x: 170 + i * 14,
      y: 50 + Math.sin(i * 0.8) * 70 + i * 6,
      rotate: 110 + (i % 3) * 50,
      scale: 0.6,
      filter: 'blur(6px)',
      transition: { delay: Math.min(i, 26) * 0.012, duration: 0.5, ease: [0.55, 0, 1, 0.45] },
    }),
  };
}

function ScatterTitle({ text, variants }: { text: string; variants: Variants }) {
  let n = 0;
  return (
    <h3
      aria-label={text}
      className="text-2xl md:text-[2rem] font-extrabold tracking-tight leading-[1.15] text-charcoal line-clamp-2"
    >
      {text.split(' ').map((word, w, words) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split('').map((ch) => {
            const i = n++;
            return (
              <motion.span key={i} custom={i} variants={variants} className="inline-block will-change-transform">
                {ch}
              </motion.span>
            );
          })}
          {w < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/* Image strip                                                         */
/* ------------------------------------------------------------------ */

function ImageSlide({
  item,
  slot,
  step,
  reduce,
}: {
  item: LatestItem;
  slot: number;
  step: number;
  reduce: boolean | null;
}) {
  const prevSlot = useRef(slot);
  // A slide that has to cross the whole strip (wrapping around) jumps instead of sweeping across.
  const jump = Math.abs(slot - prevSlot.current) > 1.5;
  useEffect(() => {
    prevSlot.current = slot;
  });

  return (
    <motion.div
      className="absolute top-0 left-0 h-[200px] md:h-full w-[calc(100%-48px)] md:w-[300px] bg-warm-beige"
      initial={false}
      animate={{ x: slot * step }}
      transition={{ duration: jump || reduce ? 0 : SLIDE_DURATION, ease: EASE }}
    >
      <img
        src={resolveImageUrl(item.image)}
        alt={slot === 0 ? item.name : ''}
        draggable={false}
        className="w-full h-full object-cover object-center"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function LatestProductsSection({ items: itemsProp }: { items?: LatestItem[] }) {
  const [backendItems, setBackendItems] = useState<LatestItem[] | null>(null);

  // Fetch the latest products added in backend; fall back to defaultItems if empty or loading
  useEffect(() => {
    if (itemsProp) return;
    let isMounted = true;
    api.getLatestProducts(6)
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped: LatestItem[] = res.data.map((p: any) => ({
            id: String(p.id),
            name: p.title || p.name || 'Fittings Solution',
            image: p.image,
            description: p.description || 'Precision-engineered fittings solution designed for premium interior applications.',
            meta: p.product_code
              ? `${p.product_code} • ${p.category_name || 'New Arrival'}`
              : (p.category_name || 'New Arrival'),
            href: `/products?search=${encodeURIComponent(p.product_code || p.title || '')}`,
          }));
          setBackendItems(mapped);
        }
      })
      .catch(() => {
        // Fall back gracefully to defaultItems
      });
    return () => {
      isMounted = false;
    };
  }, [itemsProp]);

  const items = itemsProp ?? (backendItems && backendItems.length > 0 ? backendItems : defaultItems);
  const count = items.length;
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Measure the card: the image strip moves by (card width − peek) per product.
  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Preload so images never pop in while sliding.
  useEffect(() => {
    items.forEach((it) => {
      if (it.image) {
        const img = new Image();
        img.src = resolveImageUrl(it.image);
      }
    });
  }, [items]);

  const current = count > 0 ? index % count : 0;
  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(count, 1)), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % Math.max(count, 1)), [count]);

  // Autoplay timer that automatically advances product every 4 seconds
  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, index]);

  const charVariants = makeCharVariants(reduce);
  const blockVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } },
    out: { opacity: 0, transition: { duration: 0.25 } },
  };
  const fadeUp: Variants = reduce
    ? blockVariants
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35, ease: 'easeOut' } },
        out: { opacity: 0, y: -8, transition: { duration: 0.2 } },
      };

  if (count === 0) return null;

  const item = items[current];
  const step = Math.max(width - PEEK, 0);

  return (
    <section
      className="py-10 md:py-16 bg-warm-white overflow-hidden border-b border-warm-beige/80"
      aria-roledescription="carousel"
      aria-label="Latest products"
    >
      <style>{`@keyframes lp-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={cardRef}
          className="relative overflow-hidden bg-white border border-warm-beige shadow-sm flex flex-col min-h-[560px] md:min-h-0 md:h-[410px]"
        >
          {/* Image strip: current on the left, next peeking at the right edge */}
          {width > 0 &&
            items.map((it, i) => {
              const rel = (i - current + count) % count;
              const slot = rel === count - 1 && count > 2 ? -1 : rel;
              return <ImageSlide key={it.id} item={it} slot={slot} step={step} reduce={reduce} />;
            })}

          {/* Text column */}
          <div className="relative z-10 flex flex-col flex-1 pt-[224px] pb-6 px-6 md:pt-7 md:pb-6 md:pl-[368px] md:pr-[72px] pointer-events-none">
            <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal">Latest products</h2>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial="hidden"
                animate="show"
                exit="out"
                className="mt-4 md:mt-5 pointer-events-auto"
                aria-live="polite"
              >
                <ScatterTitle text={item.name} variants={charVariants} />

                {item.meta && (
                  <motion.p variants={fadeUp} className="text-xs md:text-sm text-charcoal mt-4">
                    <strong className="font-semibold">Details:</strong>
                    <span className="ml-2 text-warm-grey">{item.meta}</span>
                  </motion.p>
                )}

                <motion.div variants={fadeUp} className="mt-3">
                  <p className="text-xs md:text-sm font-semibold text-charcoal">Description:</p>
                  <p className="text-warm-grey text-xs md:text-[13px] leading-relaxed mt-1.5 line-clamp-3 max-w-xl">
                    {item.description}
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-4">
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-white text-xs md:text-sm font-medium hover:bg-gold-deep transition-colors shadow-sm"
                  >
                    View product <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom bar: counter + progress + arrows */}
            <div className="mt-auto pt-5 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3 text-sm text-charcoal tabular-nums">
                <span>{pad(current + 1)}</span>
                <span className="relative block w-24 h-[2px] bg-charcoal/10 overflow-hidden">
                  {count > 1 && (
                    <span
                      key={`${current}-${count}`}
                      className="absolute inset-0 bg-gold origin-left"
                      style={{
                        animation: `lp-progress ${AUTOPLAY_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </span>
                <span>{pad(count)}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous product"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gold text-white shadow-md hover:bg-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next product"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gold text-white shadow-md hover:bg-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
