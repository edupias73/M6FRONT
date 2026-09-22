import { Calendar, Gauge, Settings2, Fuel, Palette } from 'lucide-react';
import type { Vehicle } from '@/types';
import { formatKm } from '@/lib/vehicle-utils';

export default function VehicleSpecs({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Calendar, label: 'Año', value: String(vehicle.year) },
    { icon: Gauge, label: 'Kilometraje', value: formatKm(vehicle.km) },
    { icon: Settings2, label: 'Caja', value: vehicle.transmission },
    { icon: Fuel, label: 'Combustible', value: vehicle.fuel },
    { icon: Palette, label: 'Color', value: vehicle.color },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {specs.map((spec) => {
        const Icon = spec.icon;
        return (
          <div
            key={spec.label}
            className="card-surface flex flex-col items-center gap-2 p-4 text-center"
          >
            <Icon className="h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                {spec.label}
              </div>
              <div className="mt-0.5 text-sm font-bold text-white">
                {spec.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
