import type { GarageConfig, TrustItem } from "@/types";

export const garageConfig: GarageConfig = {
  name: "M6 Garagem",
  shortName: "M6",
  phone: "+595986764608",
  whatsapp: "+595986764608",
  instagram: "@m6garagem",
  instagramUrl: "https://instagram.com/m6garagem",
  address: {
    street: "Coronel Alfredo Ramos",
    number: ``,
    district: "Alto Paraná",
    city: "Ciudad del Este",
    state: "",
    zip: "Paraguay",
  },
  hours: {
    weekdays: "Lun–Vie: 9h a 18h",
    saturday: "Sábado: 9h a 16h",
    sunday: "Domingo: Cerrado",
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=-25.505877,-54.633335&z=16&output=embed",
  mapsUrl:
    "https://www.google.com/maps/place/25%C2%B030'21.2%22S+54%C2%B038'00.0%22W/@-25.50583,-54.6361727,811m/data=!3m1!1e3!4m4!3m3!8m2!3d-25.505877!4d-54.633335?entry=ttu",
  colors: {
    primary: "#0a0b0d",
    accent: "#20d9f5",
  },
};

export const trustItems: TrustItem[] = [
  {
    icon: "shield-check",
    title: "Vehículos seleccionados",
    description:
      "Cada vehículo pasa por una inspección rigurosa antes de entrar al stock.",
  },
  {
    icon: "file-check",
    title: "Procedencia garantizada",
    description:
      "Historial transparente y documentación al día para tu tranquilidad.",
  },
  {
    icon: "message-circle",
    title: "Atención personalizada",
    description:
      "Acompañamiento directo y sin complicaciones desde el primer contacto hasta la entrega.",
  },
  {
    icon: "repeat",
    title: "Tasación de tu usado",
    description: "Tasamos tu vehículo actual con justicia y transparencia.",
  },
  {
    icon: "credit-card",
    title: "Financiación",
    description:
      "Trabajamos con diversos bancos para encontrar la mejor condición.",
  },
  {
    icon: "file-text",
    title: "Transferencia y documentación",
    description: "Nos encargamos de toda la parte burocrática por vos.",
  },
];
