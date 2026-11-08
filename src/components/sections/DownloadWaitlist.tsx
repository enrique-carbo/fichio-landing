import React, { useState } from 'react';
import { Download, Apple, Monitor, HardDrive, CheckCircle2, MessageCircle } from 'lucide-react';
import { PRODUCT_VERSION, RELEASE_HIGHLIGHTS } from '../../data/fichioContent';

const RELEASES_URL = 'https://github.com/enrique-carbo/historia-clinica-tauri/releases';
const RELEASE_NOTES_URL = `${RELEASES_URL}/tag/v${PRODUCT_VERSION}`;

// Formato internacional sin "+" ni separadores, requerido por wa.me
const WHATSAPP_NUMBER = '5493434718183';
const WHATSAPP_DISPLAY = '+54 9 343 471-8183';

const SPECIALTY_OPTIONS = [
  { value: 'medicina', label: 'Medicina General / Pediatría' },
  { value: 'veterinaria', label: 'Clínica Veterinaria (Canina / Felina)' },
  { value: 'psicologia', label: 'Psicología / Salud Mental' },
  { value: 'odontologia', label: 'Odontología' },
  { value: 'kinesiologia', label: 'Kinesiología / Fisioterapia' },
  { value: 'centro_medico', label: 'Centro Médico Multidisciplinario' },
];

const OS_OPTIONS = [
  { value: 'windows', label: 'Windows 10 o Windows 11' },
  { value: 'linux', label: 'Linux (Debian, Ubuntu, Fedora)' },
  { value: 'mixto', label: 'Red mixta Windows + Linux' },
  { value: 'a-definir', label: 'A definir / necesito asesoramiento' },
];

const labelOf = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

export const DownloadWaitlist: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('medicina');
  const [os, setOs] = useState('windows');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const message = [
      'Hola, quiero solicitar la Guía de Instalación de Fichio.',
      '',
      `• Nombre / Consultorio: ${name.trim()}`,
      `• Email: ${email.trim()}`,
      `• Especialidad: ${labelOf(SPECIALTY_OPTIONS, specialty)}`,
      `• Sistema operativo: ${labelOf(OS_OPTIONS, os)}`,
      `• Versión: ${PRODUCT_VERSION} (beta)`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEdit = () => {
    setSubmitted(false);
    setWhatsappUrl(null);
  };

  return (
    <section id="descargas" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            07. DESCARGA E INSTALACIÓN (BETA)
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            Obtén Fichio para Windows o Linux.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Beta {PRODUCT_VERSION} compilada en Rust con Tauri v2. Los instaladores se publican en GitHub Releases; macOS está en el roadmap.
          </p>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            Actualización sin migraciones: la base y los respaldos de 0.1.x se abren tal cual. Respaldá antes de actualizar.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 text-brand-800 dark:text-brand-300 font-semibold">
              Fichio Care · salud humana
            </span>
            <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 text-brand-800 dark:text-brand-300 font-semibold">
              Fichio Vet · veterinaria
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">Dos compilaciones coinstalables, cada una con su propia base.</span>
          </div>
        </div>

        {/* 3 Native Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* Card 1: macOS */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-100 mb-4">
                <Apple className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                macOS Desktop <span className="font-mono text-[10px] font-medium text-neutral-500">· Próximamente</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Build para Apple Silicon e Intel en preparación. La beta actual se distribuye para Windows y Linux.
              </p>
              <div className="mt-4 text-xs font-mono text-neutral-400 space-y-1">
                <div>Estado: en roadmap</div>
                <div>Sin instalador en {PRODUCT_VERSION}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>No disponible en beta</span>
              </button>
            </div>
          </div>

          {/* Card 2: Windows */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-100 mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Windows 10 / 11
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Instaladores .exe de 64-bit para Fichio Care y Fichio Vet. Sin certificado comercial en beta: SmartScreen puede advertir.
              </p>
              <div className="mt-4 text-xs font-mono text-neutral-400 space-y-1">
                <div>Versión: {PRODUCT_VERSION} · .exe 64-bit</div>
                <div>WebView2: se instala automáticamente</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar .exe (GitHub)</span>
              </a>
            </div>
          </div>

          {/* Card 3: Linux */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-100 mb-4">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Linux Desktop
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Paquetes .deb y .AppImage para amd64, en versiones Fichio Care y Fichio Vet.
              </p>
              <div className="mt-4 text-xs font-mono text-neutral-400 space-y-1">
                <div>Versión: {PRODUCT_VERSION} · amd64</div>
                <div>Requiere glibc 2.39: Ubuntu 24.04+, Debian 13+, LMDE 7+</div>
              </div>
              <p className="mt-2 text-[11px] text-amber-700 dark:text-amber-400">
                No arranca en Debian 12, LMDE 6 ni Ubuntu 22.04.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar (GitHub)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Novedades de la release vigente */}
        <div className="mb-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Novedades de la {PRODUCT_VERSION}
            </h3>
            <a
              href={RELEASE_NOTES_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-brand-700 dark:text-brand-400 hover:underline underline-offset-4 whitespace-nowrap"
            >
              Ver notas completas →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {RELEASE_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.title}</div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-xs text-brand-800 dark:text-brand-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              Instaladores publicados en GitHub Releases. En Windows, si SmartScreen advierte, elegí «Más información → Ejecutar de todas formas»: la beta no tiene certificado comercial.
            </span>
          </div>
          <a
            href={RELEASE_NOTES_URL}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] font-semibold whitespace-nowrap hover:underline"
          >
            Release v{PRODUCT_VERSION} →
          </a>
        </div>

        {/* Lead Capture & Custom Clinic Deployment Assistance Form */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-10 shadow-sm">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              ¿Gestionas una clínica, veterinaria o consultorio con varios profesionales?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              Te asistimos en la configuración inicial, el alta de usuarios, el resguardo de la frase semilla y la puesta en marcha de los respaldos firmados.
            </p>

            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 p-5 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 space-y-3"
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                  <span>Tu solicitud está lista en WhatsApp</span>
                </div>
                <p className="leading-relaxed">
                  Abrimos WhatsApp con tus datos ya cargados: <strong>{name.trim() || 'sin nombre'}</strong>, {email},
                  {' '}{labelOf(SPECIALTY_OPTIONS, specialty)} · {labelOf(OS_OPTIONS, os)}. Solo falta que envíes el mensaje.
                  Si la pestaña no se abrió, usá el botón de abajo.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href={whatsappUrl ?? `https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir WhatsApp {WHATSAPP_DISPLAY}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-xs font-semibold text-brand-800 dark:text-brand-300 hover:underline underline-offset-4"
                  >
                    Editar datos
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Nombre o Consultorio
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Fernando Soler"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Correo Electrónico Profesional
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="fernando@consultorio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Especialidad Principal
                    </label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {SPECIALTY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Sistema Operativo
                    </label>
                    <select
                      value={os}
                      onChange={(e) => setOs(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {OS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">
                    Sin spam ni telemetría comercial. Privacidad garantizada.
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Solicitar Guía de Instalación</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Al enviar, se abre WhatsApp con tu nombre, email, especialidad y sistema operativo precargados al {WHATSAPP_DISPLAY}.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
