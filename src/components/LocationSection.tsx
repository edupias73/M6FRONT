import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink } from '@/lib/vehicle-utils';

export default function LocationSection() {
  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    '¡Hola! Me gustaría más información.'
  );

  const fullAddress = `${garageConfig.address.street}, ${garageConfig.address.number} - ${garageConfig.address.district}, ${garageConfig.address.city} - ${garageConfig.address.state}, ${garageConfig.address.zip}`;

  return (
    <section id="localizacao" className="bg-ink-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-800 tracking-tight text-white sm:text-3xl">
            Dónde estamos
          </h2>
          <p className="mt-3 text-sm text-ink-400 sm:text-base">
            Vení a conocer nuestro espacio y los vehículos de cerca.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card-surface flex flex-col gap-6 p-6 sm:p-8">
            <div>
              <div className="mb-3 flex items-center gap-2 text-accent">
                <MapPin className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">
                  Dirección
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-300">
                {fullAddress}
              </p>
              <a
                href={garageConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                Abrir en Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-accent">
                <Phone className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">
                  Teléfono
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-300">
                {garageConfig.phone}
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-accent">
                <Clock className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">
                  Horario de atención
                </h3>
              </div>
              <ul className="space-y-1 text-sm leading-relaxed text-ink-300">
                <li>{garageConfig.hours.weekdays}</li>
                <li>{garageConfig.hours.saturday}</li>
                <li>{garageConfig.hours.sunday}</li>
              </ul>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-auto w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </div>

          <div className="card-surface overflow-hidden p-0">
            <iframe
              title="Mapa de la ubicación"
              src={garageConfig.mapEmbedUrl}
              className="h-full min-h-[300px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
