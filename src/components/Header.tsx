import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { garageConfig } from '@/config/garage';
import { buildWhatsAppLink } from '@/lib/vehicle-utils';
import Logo from './Logo';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/estoque', label: 'Stock' },
  { to: '/sobre', label: 'Nosotros' },
  { to: '/contato', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const whatsappLink = buildWhatsAppLink(
    garageConfig.whatsapp,
    `¡Hola! Me gustaría más información sobre los vehículos disponibles.`
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink-700 bg-ink-950/95 backdrop-blur-md'
            : 'border-b border-transparent bg-ink-950/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-ink-300 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-hover sm:flex"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white sm:hidden"
              aria-label="Hablar por WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 text-ink-200 md:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 border-b border-ink-700 bg-ink-900 p-4 shadow-2xl animate-slide-up">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-ink-800 text-accent'
                        : 'text-ink-200 hover:bg-ink-800 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
