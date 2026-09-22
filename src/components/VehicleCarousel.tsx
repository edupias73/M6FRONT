import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Vehicle } from '@/types';
import VehicleCard from './VehicleCard';

export default function VehicleCarousel({
  vehicles,
  title,
  badge,
}: {
  vehicles: Vehicle[];
  title: string;
  badge?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('[data-card]') as HTMLElement;
    const step = cardWidth
      ? cardWidth.offsetWidth + 16
      : container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  }, []);

  if (vehicles.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {badge && (
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-wide text-accent">
                {badge}
              </span>
            )}
            <h2 className="font-display text-2xl font-800 tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollBy('left')}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 bg-ink-800 text-ink-200 transition-colors hover:border-ink-400 hover:text-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy('right')}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 bg-ink-800 text-ink-200 transition-colors hover:border-ink-400 hover:text-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide snap-x-carousel flex gap-4 overflow-x-auto pb-4"
        >
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              data-card
              className="snap-item w-[280px] shrink-0 sm:w-[320px] lg:w-[340px]"
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
