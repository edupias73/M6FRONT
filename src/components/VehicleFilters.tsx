import { useState } from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import type { VehicleFilters as FilterState, SortOption } from '@/types';
import {
  getUniqueBrands,
  getUniqueModels,
  getUniqueTransmissions,
  getUniqueFuels,
  getPriceRange,
  getYearRange,
} from '@/lib/vehicle-utils';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'km-asc', label: 'Menor kilometraje' },
  { value: 'year-desc', label: 'Año más nuevo' },
];

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

export default function VehicleFilters({
  filters,
  onChange,
  resultCount,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const brands = getUniqueBrands();
  const models = getUniqueModels(filters.brand || undefined);
  const transmissions = getUniqueTransmissions();
  const fuels = getUniqueFuels();
  const priceRange = getPriceRange();
  const yearRange = getYearRange();

  const update = (key: keyof FilterState, value: string) => {
    if (key === 'brand') {
      onChange({ ...filters, brand: value, model: '' });
    } else {
      onChange({ ...filters, [key]: value });
    }
  };

  const reset = () => {
    onChange({
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
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.brand ||
    filters.model ||
    filters.priceMin ||
    filters.priceMax ||
    filters.yearMin ||
    filters.yearMax ||
    filters.transmission ||
    filters.fuel;

  const FilterContent = () => (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
          Marca
        </label>
        <select
          value={filters.brand}
          onChange={(e) => update('brand', e.target.value)}
          className="input-field"
        >
          <option value="">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
          Modelo
        </label>
        <select
          value={filters.model}
          onChange={(e) => update('model', e.target.value)}
          className="input-field"
          disabled={!filters.brand && models.length === 0}
        >
          <option value="">Todos los modelos</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
          Rango de precio
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={String(priceRange.min)}
            value={filters.priceMin}
            onChange={(e) => update('priceMin', e.target.value)}
            className="input-field"
            inputMode="numeric"
          />
          <span className="text-ink-500">—</span>
          <input
            type="number"
            placeholder={String(priceRange.max)}
            value={filters.priceMax}
            onChange={(e) => update('priceMax', e.target.value)}
            className="input-field"
            inputMode="numeric"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
          Año
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={String(yearRange.min)}
            value={filters.yearMin}
            onChange={(e) => update('yearMin', e.target.value)}
            className="input-field"
            inputMode="numeric"
          />
          <span className="text-ink-500">—</span>
          <input
            type="number"
            placeholder={String(yearRange.max)}
            value={filters.yearMax}
            onChange={(e) => update('yearMax', e.target.value)}
            className="input-field"
            inputMode="numeric"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
          Caja
        </label>
        <select
          value={filters.transmission}
          onChange={(e) => update('transmission', e.target.value)}
          className="input-field"
        >
          <option value="">Todos</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
          Combustible
        </label>
        <select
          value={filters.fuel}
          onChange={(e) => update('fuel', e.target.value)}
          className="input-field"
        >
          <option value="">Todos</option>
          {fuels.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      {/* Search + sort bar - always visible */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo, versión..."
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <select
          value={filters.sort}
          onChange={(e) => update('sort', e.target.value)}
          className="input-field sm:w-auto"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-ink-500 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
              !
            </span>
          )}
        </button>
      </div>

      {/* Desktop filters sidebar */}
      <div className="mt-4 hidden lg:block">
        <div className="card-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-200">
              Filtros
            </h3>
            {hasActiveFilters && (
              <button
                onClick={reset}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-ink-600 bg-ink-900 p-5 pb-8 animate-slide-up">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Filtros</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 text-ink-200"
                aria-label="Cerrar filtros"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent />
            <div className="mt-6 flex gap-3">
              <button
                onClick={reset}
                className="btn-secondary flex-1"
              >
                Limpiar
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex-1"
              >
                Ver {resultCount} vehículo{resultCount !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
