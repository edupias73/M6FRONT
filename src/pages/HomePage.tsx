import { useEffect } from 'react';
import Hero from '@/components/Hero';
import VehicleCarousel from '@/components/VehicleCarousel';
import TrustSection from '@/components/TrustSection';
import LocationSection from '@/components/LocationSection';
import { getFeaturedVehicles, getNewVehicles } from '@/lib/vehicle-utils';

export default function HomePage() {
  useEffect(() => {
    document.title = 'M6 Garagem | Excelencia sobre ruedas';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Vehículos seleccionados, procedencia y atención personalizada. Encontrá tu próximo auto en M6 Garagem.'
      );
    }
  }, []);

  const featured = getFeaturedVehicles();
  const newVehicles = getNewVehicles();

  return (
    <>
      <Hero />
      <VehicleCarousel
        vehicles={featured}
        title="Vehículos destacados"
        badge="Seleccionados"
      />
      {newVehicles.length > 0 && (
        <VehicleCarousel
          vehicles={newVehicles}
          title="Nuevo en stock"
          badge="Recientes"
        />
      )}
      <TrustSection />
      <LocationSection />
    </>
  );
}
