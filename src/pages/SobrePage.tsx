import { useEffect } from 'react';
import { MapPin, Clock, Phone, MessageCircle, Instagram } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink } from '@/lib/vehicle-utils';

export default function SobrePage() {
  useEffect(() => {
    document.title = 'Nosotros | M6 Garagem';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Conocé M6 Garagem - excelencia sobre ruedas, vehículos seleccionados y atención personalizada.'
      );
    }
  }, []);

  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    '¡Hola! Me gustaría más información sobre M6 Garagem.'
  );

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-800 tracking-tight text-white sm:text-4xl">
          Sobre nosotros
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src="https://images.pexels.com/photos/33814736/pexels-photo-33814736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Interior del garaje"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-ink-300 sm:text-base">
              
            Texto sobre a historia de voces. ou outra coisa 
            </p>
            <p className="text-sm leading-relaxed text-ink-300 sm:text-base">
            texto sobre a equipe e como voces trbalham, da pra colocar algo envolendo importação tambem. tipo "proximos veiculos"
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="card-surface flex items-center gap-3 p-4">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Dirección
                  </div>
                  <div className="text-sm text-ink-200">
                    {garageConfig.address.street}, {garageConfig.address.number}
                  </div>
                  <div className="text-sm text-ink-400">
                    {garageConfig.address.city} - {garageConfig.address.state}
                  </div>
                </div>
              </div>

              <div className="card-surface flex items-center gap-3 p-4">
                <Clock className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Horario
                  </div>
                  <div className="text-sm text-ink-200">
                    {garageConfig.hours.weekdays}
                  </div>
                  <div className="text-sm text-ink-400">
                    {garageConfig.hours.saturday}
                  </div>
                </div>
              </div>

              <div className="card-surface flex items-center gap-3 p-4">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Teléfono
                  </div>
                  <div className="text-sm text-ink-200">
                    {garageConfig.phone}
                  </div>
                </div>
              </div>

              <div className="card-surface flex items-center gap-3 p-4">
                <Instagram className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Instagram
                  </div>
                  <div className="text-sm text-ink-200">
                    {garageConfig.instagram}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
