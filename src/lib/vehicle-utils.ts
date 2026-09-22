import type { Vehicle } from '@/types';
import { vehicles } from '@/data/vehicles';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(value: number): string {
  return new Intl.NumberFormat('es-PY').format(value) + ' km';
}

export function formatYear(value: number): string {
  return String(value);
}

export function createSlug(vehicle: Vehicle): string {
  const slug = `${vehicle.brand}-${vehicle.model}-${vehicle.version}-${vehicle.year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => createSlug(v) === slug);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured && v.status === 'available');
}

export function getNewVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.isNew && v.status === 'available');
}

export function getSimilarVehicles(vehicle: Vehicle, limit = 6): Vehicle[] {
  const others = vehicles.filter(
    (v) => v.id !== vehicle.id && v.status === 'available'
  );

  const sameBrand = others.filter((v) => v.brand === vehicle.brand);
  const similarPrice = others.filter(
    (v) =>
      v.brand !== vehicle.brand &&
      Math.abs(v.price - vehicle.price) < vehicle.price * 0.3
  );

  const result = [...sameBrand, ...similarPrice];
  const seen = new Set<string>();
  return result
    .filter((v) => {
      if (seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    })
    .slice(0, limit);
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function buildVehicleWhatsAppMessage(vehicle: Vehicle): string {
  const price = formatPrice(vehicle.price);
  return `Hola! Tengo interés en el ${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year} anunciado por ${price}. Me gustaría más información.`;
}

export function buildVehicleShareText(vehicle: Vehicle): string {
  const price = formatPrice(vehicle.price);
  return `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year} - ${price}`;
}

export function getUniqueBrands(): string[] {
  return [...new Set(vehicles.map((v) => v.brand))].sort();
}

export function getUniqueModels(brand?: string): string[] {
  const filtered = brand
    ? vehicles.filter((v) => v.brand === brand)
    : vehicles;
  return [...new Set(filtered.map((v) => v.model))].sort();
}

export function getUniqueTransmissions(): string[] {
  return [...new Set(vehicles.map((v) => v.transmission))].sort();
}

export function getUniqueFuels(): string[] {
  return [...new Set(vehicles.map((v) => v.fuel))].sort();
}

export function getPriceRange(): { min: number; max: number } {
  const prices = vehicles.map((v) => v.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getYearRange(): { min: number; max: number } {
  const years = vehicles.map((v) => v.year);
  return { min: Math.min(...years), max: Math.max(...years) };
}
