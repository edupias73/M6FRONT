import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink } from '@/lib/vehicle-utils';
import { vehicles } from '@/data/vehicles';

export default function Hero() {
  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    '¡Hola! Me gustaría más información sobre los vehículos disponibles.'
  );

  const availableCount = vehicles.filter((v) => v.status === 'available').length;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5050535/pexels-photo-5050535.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Garaje de vehículos"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/60 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-200">
              {availableCount} vehículos disponibles
            </span>
          </div>

          <h1 className="font-display text-4xl font-800 leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tu próximo auto
            <br />
            está acá.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
            Vehículos seleccionados, procedencia y atención personalizada.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/estoque"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-accent-hover active:scale-[0.98]"
            >
              Ver stock
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-500 bg-ink-900/60 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-ink-400 hover:bg-ink-800/80 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-600 to-transparent" />
    </section>
  );
}
