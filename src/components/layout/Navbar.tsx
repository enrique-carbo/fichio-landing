import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { PRODUCT_VERSION } from '../../data/fichioContent';

interface NavbarProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenu = () => setMobileMenuOpen(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    const desktopQuery = window.matchMedia('(min-width: 1280px)');
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    desktopQuery.addEventListener('change', handleDesktop);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      desktopQuery.removeEventListener('change', handleDesktop);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Seguridad', href: '#seguridad' },
    { label: 'Demo en Vivo', href: '#demostracion' },
    { label: 'Comparativa', href: '#comparativa' },
    { label: 'Arquitectura', href: '#arquitectura' },
    { label: 'Guía', href: '#guia' },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 backdrop-blur-md bg-neutral-50/90 dark:bg-neutral-950/90 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">

        {/* Zone 1: Brand Title (single text element wordmark) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1 shadow-sm transition-transform group-hover:scale-105">
            <img
              src="/fichio.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <span className="font-extrabold text-neutral-950 dark:text-neutral-50 tracking-tight">
            Fichio
          </span>
        </a>

        {/* Zone 2: clean single-line nav links (desktop desde xl) */}
        <nav
          aria-label="Navegación principal"
          className="hidden xl:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-brand-500/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          <button
            type="button"
            onClick={onOpenDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors whitespace-nowrap"
          >
            Probar Sandbox
          </button>

          <button
            type="button"
            onClick={onOpenDownload}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-2 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-lg transition-colors shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <span>
              Descargar<span className="hidden sm:inline"> v{PRODUCT_VERSION}</span>
            </span>
            <ArrowUpRight className="hidden sm:block w-3.5 h-3.5" />
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="xl:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <nav
        id="mobile-nav"
        aria-label="Navegación móvil"
        hidden={!mobileMenuOpen}
        className="xl:hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 pt-2 pb-6 space-y-2"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400"
          >
            {link.label}
          </a>
        ))}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDownload();
            }}
            className="w-full py-2 text-center text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Descargar v{PRODUCT_VERSION}
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemo();
            }}
            className="w-full py-2 text-center text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Probar Sandbox
          </button>
        </div>
      </nav>
    </header>
  );
};
