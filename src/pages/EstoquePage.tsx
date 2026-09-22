import { useState, useMemo, useEffect } from 'react';
import { SearchX } from 'lucide-react';
import type { VehicleFilters as FilterState, SortOption } from '@/types';
import VehicleCard from '@/components/VehicleCard';
import VehicleFilters from '@/components/VehicleFilters';
import { vehicles } from '@/data/vehicles';

const defaultFilters: FilterState = {
  search: '',
  brand: '',
  model: '',
  priceMin: '',
  priceMax: '',
  yearMin: '',
  yearMax: '',
  transmission: '',
  fuel: '',
  sort: 'recent',
};

export default function EstoquePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  useEffect(() => {
    document.title = 'Stock | M6 Garagem';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Navegá por nuestro stock de vehículos seleccionados. Filtrá por marca, modelo, precio, año y más.'
      );
    }
  }, []);

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => v.status === 'available');

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (v) =>
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.version.toLowerCase().includes(q) ||
          v.color.toLowerCase().includes(q)
      );
    }

    if (filters.brand) result = result.filter((v) => v.brand === filters.brand);
    if (filters.model) result = result.filter((v) => v.model === filters.model);
    if (filters.transmission)
      result = result.filter((v) => v.transmission === filters.transmission);
    if (filters.fuel) result = result.filter((v) => v.fuel === filters.fuel);

    if (filters.priceMin)
      result = result.filter((v) => v.price >= Number(filters.priceMin));
    if (filters.priceMax)
      result = result.filter((v) => v.price <= Number(filters.priceMax));
    if (filters.yearMin)
      result = result.filter((v) => v.year >= Number(filters.yearMin));
    if (filters.yearMax)
      result = result.filter((v) => v.year <= Number(filters.yearMax));

    const sortMap: Record<SortOption, (a: typeof result[0], b: typeof result[0]) => number> = {
      recent: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'km-asc': (a, b) => a.km - b.km,
      'year-desc': (a, b) => b.year - a.year,
    };

    return [...result].sort(sortMap[filters.sort]);
  }, [filters]);

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-800 tracking-tight text-white sm:text-4xl">
            Nuestro stock
          </h1>
          <p className="mt-2 text-sm text-ink-400 sm:text-base">
            Vehículos seleccionados, listos para que los conozcas.
          </p>
        </div>

        <VehicleFilters
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        <div className="mb-4 text-sm text-ink-400">
          <span className="font-bold text-white">{filtered.length}</span> vehículo
          {filtered.length !== 1 ? 's' : ''} encontrado
          {filtered.length !== 1 ? 's' : ''}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-ink-700 bg-ink-850 py-16 text-center">
            <SearchX className="mb-4 h-12 w-12 text-ink-500" />
            <h3 className="text-lg font-bold text-white">
              Ningún vehículo encontrado
            </h3>
            <p className="mt-2 text-sm text-ink-400">
              Probá ajustar los filtros para ver más resultados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
