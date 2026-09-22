import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, MapPin, Clock } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink } from '@/lib/vehicle-utils';
import Logo from './Logo';

export default function Footer() {
  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    '¡Hola! Me gustaría más información.'
  );

  const fullAddress = `${garageConfig.address.street}, ${garageConfig.address.number} - ${garageConfig.address.district}, ${garageConfig.address.city} - ${garageConfig.address.state}`;

  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm leading-relaxed text-ink-400">
              Vehículos seleccionados, procedencia y atención personalizada.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-200">
              Navegación
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-accent">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/estoque" className="text-sm text-ink-400 transition-colors hover:text-accent">
                  Stock
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-ink-400 transition-colors hover:text-accent">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-ink-400 transition-colors hover:text-accent">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-200">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  {garageConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={garageConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-accent"
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  {garageConfig.instagram}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ink-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{fullAddress}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-ink-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {garageConfig.hours.weekdays}
                  <br />
                  {garageConfig.hours.saturday}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-200">
              Atención
            </h3>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-700 pt-6">
          <p className="text-center text-xs text-ink-500">
            &copy; {new Date().getFullYear()} {garageConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
