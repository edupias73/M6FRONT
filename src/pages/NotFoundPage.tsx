import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-16 text-center">
      <h1 className="font-display text-6xl font-800 text-white">404</h1>
      <p className="mt-4 text-sm text-ink-400 sm:text-base">
        La página que buscás no existe o fue movida.
      </p>
      <Link to="/" className="btn-primary mt-6">
        <Home className="h-4 w-4" />
        Volver al inicio
      </Link>
    </div>
  );
}
