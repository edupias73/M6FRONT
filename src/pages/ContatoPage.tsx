import { useEffect } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Instagram } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink } from '@/lib/vehicle-utils';
import LocationSection from '@/components/LocationSection';

export default function ContatoPage() {
  useEffect(() => {
    document.title = 'Contacto | M6 Garagem';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Ponete en contacto con M6 Garagem. WhatsApp, dirección y horario de atención.'
      );
    }
  }, []);

  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    '¡Hola! Me gustaría más información.'
  );

  const fullAddress = `${garageConfig.address.street}, ${garageConfig.address.number} - ${garageConfig.address.district}, ${garageConfig.address.city} - ${garageConfig.address.state}, ${garageConfig.address.zip}`;

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-800 tracking-tight text-white sm:text-4xl">
          Contacto
        </h1>
        <p className="mt-2 text-sm text-ink-400 sm:text-base">
          Estamos listos para atenderte. Elegí el canal de tu preferencia.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface flex flex-col gap-3 p-6 transition-colors hover:border-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <MessageCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">WhatsApp</h3>
              <p className="mt-1 text-sm text-ink-400">
                {garageConfig.phone}
              </p>
            </div>
            <span className="mt-auto text-sm font-semibold text-accent">
              Enviar mensaje →
            </span>
          </a>

          <a
            href={`tel:${garageConfig.phone.replace(/\D/g, '')}`}
            className="card-surface flex flex-col gap-3 p-6 transition-colors hover:border-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Teléfono</h3>
              <p className="mt-1 text-sm text-ink-400">
                {garageConfig.phone}
              </p>
            </div>
            <span className="mt-auto text-sm font-semibold text-accent">
              Llamar ahora →
            </span>
          </a>

          <a
            href={garageConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface flex flex-col gap-3 p-6 transition-colors hover:border-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Instagram className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Instagram</h3>
              <p className="mt-1 text-sm text-ink-400">
                {garageConfig.instagram}
              </p>
            </div>
            <span className="mt-auto text-sm font-semibold text-accent">
              Seguir →
            </span>
          </a>

          <div className="card-surface flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dirección</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                {fullAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 card-surface flex items-start gap-3 p-6">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <h3 className="text-base font-bold text-white">Horario de atención</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink-400">
              <li>{garageConfig.hours.weekdays}</li>
              <li>{garageConfig.hours.saturday}</li>
              <li>{garageConfig.hours.sunday}</li>
            </ul>
          </div>
        </div>
      </div>

      <LocationSection />
    </div>
  );
}
