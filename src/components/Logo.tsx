import { Link } from 'react-router-dom';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex items-center ${className}`}
      aria-label="M6 Garagem - início"
    >
      <img
        src="/images/image.png"
        alt="M6 Garagem — Excelência sobre rodas"
        className="h-12 w-12 object-contain sm:h-14 sm:w-14"
      />
    </Link>
  );
}
