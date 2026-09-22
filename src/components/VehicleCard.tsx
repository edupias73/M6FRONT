import { Link } from 'react-router-dom';
import { Gauge, Settings2, Calendar } from 'lucide-react';
import type { Vehicle } from '@/types';
import { formatPrice, formatKm, createSlug } from '@/lib/vehicle-utils';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const slug = createSlug(vehicle);

  return (
    <Link
      to={`/veiculos/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-700 bg-ink-850 transition-all duration-200 hover:border-ink-500 hover:shadow-xl hover:shadow-black/30 md:hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.version}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {vehicle.isNew && (
            <span className="badge bg-accent text-white">Nuevo en stock</span>
          )}
          {vehicle.featured && !vehicle.isNew && (
            <span className="badge bg-ink-950/80 text-accent backdrop-blur-sm">
              Destacado
            </span>
          )}
        </div>
        {vehicle.status === 'sold' && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/70">
            <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white">
              Vendido
            </span>
          </div>
        )}
        {vehicle.status === 'reserved' && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/70">
            <span className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold uppercase text-white">
              Reservado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            {vehicle.brand}
          </span>
          <span className="text-xs text-ink-600">•</span>
          <span className="text-xs text-ink-400">{vehicle.year}</span>
        </div>

        <h3 className="text-base font-bold leading-tight text-white">
          {vehicle.model} {vehicle.version}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {formatKm(vehicle.km)}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" />
            {vehicle.transmission}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <div className="text-lg font-800 text-white">
            {formatPrice(vehicle.price)}
          </div>
          <div className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm font-bold text-white transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            Ver detalles
          </div>
        </div>
      </div>
    </Link>
  );
}
