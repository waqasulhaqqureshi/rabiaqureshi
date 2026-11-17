import { Children, ReactNode, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  cardClass?: string;
  autoPlay?: boolean;
};

export default function Carousel({ children, cardClass = "w-[84%] sm:w-[400px]", autoPlay = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = Children.toArray(children);
  const count = items.length;

  const goTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const target = el.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    if (target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
  }, [count]);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft);
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - pad - el.scrollLeft);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  };

  useEffect(() => {
    if (!autoPlay || paused) return;
    const t = setInterval(() => goTo(active + 1 >= count ? 0 : active + 1), 4500);
    return () => clearInterval(t);
  }, [autoPlay, paused, active, count, goTo]);

  // drag to scroll with mouse
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const onDown = (e: React.MouseEvent) => {
    const el = ref.current!;
    drag.current = { down: true, x: e.pageX, left: el.scrollLeft, moved: false };
  };
  const onMove = (e: React.MouseEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const el = ref.current!;
    const dx = e.pageX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    el.style.scrollSnapType = "none";
    el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    const el = ref.current!;
    el.style.scrollSnapType = "";
    onScroll();
    goTo(active);
  };

  const btn =
    "grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink";

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={ref}
        onScroll={onScroll}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        className="no-scrollbar -mx-5 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-10 pt-4 active:cursor-grabbing sm:mx-0 sm:px-0"
      >
        {items.map((c, i) => (
          <div key={i} className={`${cardClass} shrink-0 snap-start select-none`}>
            {c}
          </div>
        ))}
        <div className="w-1 shrink-0" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl italic tabular-nums">
            {String(active + 1).padStart(2, "0")}
            <span className="text-black/30"> / {String(count).padStart(2, "0")}</span>
          </span>
          <div className="hidden items-center gap-2 sm:flex">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-ink" : "w-2 bg-black/20 hover:bg-black/40"}`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button aria-label="Previous" className={btn} disabled={active === 0} onClick={() => goTo(active - 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button aria-label="Next" className={btn} disabled={active === count - 1} onClick={() => goTo(active + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
