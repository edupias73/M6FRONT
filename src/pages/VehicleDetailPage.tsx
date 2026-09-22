import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Share2, Check, ArrowLeft, ChevronRight } from 'lucide-react';
import { getVehicleBySlug, getSimilarVehicles, formatPrice, buildWhatsAppLink, buildVehicleWhatsAppMessage, buildVehicleShareText } from '@/lib/vehicle-utils';
import { garageConfig } from '@/config/garage';
import VehicleGallery from '@/components/VehicleGallery';
import VehicleSpecs from '@/components/VehicleSpecs';
import VehicleCarousel from '@/components/VehicleCarousel';

export default function VehicleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const vehicle = slug ? getVehicleBySlug(slug) : undefined;

  useEffect(() => {
    if (vehicle) {
      const title = `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year} | ${garageConfig.name}`;
      document.title = title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', vehicle.description.slice(0, 160));
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', vehicle.description.slice(0, 160));
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', vehicle.images[0]);
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-16 text-center">
        <h1 className="text-2xl font-bold text-white">Vehículo no encontrado</h1>
        <p className="mt-2 text-sm text-ink-400">
          El vehículo que buscás ya no está disponible.
        </p>
        <Link to="/estoque" className="btn-primary mt-6">
          Ver stock
        </Link>
      </div>
    );
  }

  const similar = getSimilarVehicles(vehicle);
  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    buildVehicleWhatsAppMessage(vehicle)
  );

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = buildVehicleShareText(vehicle);
    if (navigator.share) {
      try {
        await navigator.share({ title: `${vehicle.brand} ${vehicle.model}`, text: shareText, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('¡Link copiado!');
      } catch {
        // clipboard not available
      }
    }
  };

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-400">
          <Link to="/" className="hover:text-accent">Inicio</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/estoque" className="hover:text-accent">Stock</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-ink-300">
            {vehicle.brand} {vehicle.model}
          </span>
        </nav>

        {/* Back button (mobile) */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-300 transition-colors hover:text-white sm:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Gallery */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <VehicleGallery images={vehicle.images} alt={`${vehicle.brand} ${vehicle.model} ${vehicle.version}`} />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {vehicle.isNew && (
                  <span className="badge bg-accent text-white">Nuevo en stock</span>
                )}
                {vehicle.featured && (
                  <span className="badge bg-ink-800 text-accent">Destacado</span>
                )}
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  {vehicle.brand}
                </span>
              </div>

              <h1 className="font-display text-2xl font-800 leading-tight tracking-tight text-white sm:text-3xl">
                {vehicle.model} {vehicle.version}
              </h1>

              <div className="mt-4 text-3xl font-800 text-white sm:text-4xl">
                {formatPrice(vehicle.price)}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                <MessageCircle className="h-5 w-5" />
                Tengo interés
              </a>
              <button
                onClick={handleShare}
                className="btn-secondary"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
            </div>

            {/* Specs */}
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-200">
                Información principal
              </h2>
              <VehicleSpecs vehicle={vehicle} />
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-200">
                Descripción
              </h2>
              <p className="text-sm leading-relaxed text-ink-300">
                {vehicle.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-200">
                Opcionales y equipamientos
              </h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-ink-300"
                  >
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vehicle info table */}
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-200">
                Información del vehículo
              </h2>
              <div className="card-surface divide-y divide-ink-700">
                {[
                  { label: 'Marca', value: vehicle.brand },
                  { label: 'Modelo', value: vehicle.model },
                  { label: 'Versión', value: vehicle.version },
                  { label: 'Año', value: String(vehicle.year) },
                  { label: 'Kilometraje', value: new Intl.NumberFormat('es-PY').format(vehicle.km) + ' km' },
                  { label: 'Caja', value: vehicle.transmission },
                  { label: 'Combustible', value: vehicle.fuel },
                  { label: 'Color', value: vehicle.color },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-ink-400">{row.label}</span>
                    <span className="text-sm font-semibold text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <div className="mt-8">
          <VehicleCarousel
            vehicles={similar}
            title="También te puede interesar"
            badge="Similares"
          />
        </div>
      )}
    </div>
  );
}
