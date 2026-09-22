import {
  ShieldCheck,
  FileCheck,
  MessageCircle,
  Repeat,
  CreditCard,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { trustItems } from '@/config/garage';

const iconMap: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  'file-check': FileCheck,
  'message-circle': MessageCircle,
  'repeat': Repeat,
  'credit-card': CreditCard,
  'file-text': FileText,
};

export default function TrustSection() {
  return (
    <section className="border-y border-ink-800 bg-ink-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-800 tracking-tight text-white sm:text-3xl">
            ¿Por qué comprar con nosotros?
          </h2>
          <p className="mt-3 text-sm text-ink-400 sm:text-base">
            Compromiso con calidad y transparencia en cada vehículo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <div
                key={item.title}
                className="card-surface p-6 transition-colors hover:border-ink-600"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
