import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VehicleGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToImage = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    }
    setActiveIndex(index);
  }, []);

  const scrollMain = useCallback((direction: 'left' | 'right') => {
    const next = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    if (next >= 0 && next < images.length) {
      scrollToImage(next);
    }
  }, [activeIndex, images.length, scrollToImage]);

  const onScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const center = child.offsetLeft - container.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Desktop: main image + thumbnails */}
      <div className="hidden md:block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-800">
          <img
            src={images[activeIndex]}
            alt={`${alt} - foto ${activeIndex + 1}`}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute bottom-3 right-3 rounded-lg bg-ink-950/80 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
          {activeIndex > 0 && (
            <button
              onClick={() => scrollMain('left')}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {activeIndex < images.length - 1 && (
            <button
              onClick={() => scrollMain('right')}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollToImage(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === activeIndex
                  ? 'border-accent'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <img src={img} alt={`${alt} - miniatura ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal swipe gallery */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="scrollbar-hide snap-x-carousel flex aspect-[4/3] gap-1 overflow-x-auto rounded-xl"
        >
          {images.map((img, i) => (
            <div key={i} className="snap-item relative h-full w-full shrink-0">
              <img
                src={img}
                alt={`${alt} - foto ${i + 1}`}
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="rounded-lg bg-ink-800 px-3 py-1 text-sm font-bold text-white">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
