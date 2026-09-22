import { MessageCircle } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink, buildVehicleWhatsAppMessage } from '@/lib/vehicle-utils';
import type { Vehicle } from '@/types';

export default function WhatsAppButton({
  vehicle,
}: {
  vehicle?: Vehicle;
}) {
  const message = vehicle
    ? buildVehicleWhatsAppMessage(vehicle)
    : '¡Hola! Me gustaría más información sobre los vehículos disponibles.';
  const link = buildWhatsAppLink(garageConfig.whatsapp, message);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3.5 font-bold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/40 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Hablanos</span>
    </a>
  );
}
