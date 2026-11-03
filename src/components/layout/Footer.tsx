import React from 'react';
import { HardDrive, Lock, FileCode, ArrowUp } from 'lucide-react';
import { CORE_LICENSE } from '../../data/fichioContent';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-100 dark:border-neutral-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-0.5">
                <img
                  src="/fichio.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <span className="font-extrabold text-neutral-900 dark:text-neutral-100 text-sm tracking-tight">
                Fichio
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
              Software de historia clínica digital con arquitectura Local-First y Zero-Knowledge Parcial. Dos compilaciones sobre el mismo motor: <strong className="font-semibold text-neutral-700 dark:text-neutral-300">Fichio Care</strong> para salud humana y <strong className="font-semibold text-neutral-700 dark:text-neutral-300">Fichio Vet</strong> para veterinaria. Autonomía offline, cifrado en reposo y en RAM, y no-repudio mediante firmas Ed25519. La telemedicina asíncrona está en el roadmap (Fase 5).
            </p>
            <div className="flex items-center gap-4 text-[11px] text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                SQLite Local
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                AES-GCM-256
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                Rust Core (Tauri v2)
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <div className="font-bold text-neutral-900 dark:text-neutral-200 text-xs uppercase tracking-wider">
              Navegación
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#especialidades" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Especialidades Médicas y Veterinarias
                </a>
              </li>
              <li>
                <a href="#seguridad" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Criptografía y Bóveda en RAM
                </a>
              </li>
              <li>
                <a href="#demostracion" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Sandbox Clínico Interactivo
                </a>
              </li>
              <li>
                <a href="#comparativa" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Fichio vs. Softwares en la Nube
                </a>
              </li>
              <li>
                <a href="#arquitectura" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Especificaciones Técnicas
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Manifest */}
          <div className="space-y-2">
            <div className="font-bold text-neutral-900 dark:text-neutral-200 text-xs uppercase tracking-wider">
              Principios Fundamentales
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>Tus historias clínicas son tuyas</li>
              <li>Cero intermediarios comerciales</li>
              <li>Sin dependencia de conexión a internet</li>
              <li>Firmas Ed25519 por entrada y por documento exportado</li>
              <li>Respaldos locales firmados con manifest.json</li>
              <li>Recuperación física con frase semilla</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Fichio · {CORE_LICENSE}. Diseñado con enfoque Local-First soberano.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacidad por diseño matemático</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
