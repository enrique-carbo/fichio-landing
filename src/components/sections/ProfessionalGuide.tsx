import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  PawPrint,
  ArrowUpRight,
} from 'lucide-react';
import { GUIDE_STEPS, VET_DIFFERENCES, PRODUCT_VERSION } from '../../data/fichioContent';

const GUIDE_URL = `https://github.com/enrique-carbo/historia-clinica-tauri/blob/v${PRODUCT_VERSION}/docs/guia-usuario.md`;
const ISSUES_URL = 'https://github.com/enrique-carbo/historia-clinica-tauri/issues';

export const ProfessionalGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const step = GUIDE_STEPS[activeStep];
  const isFirst = activeStep === 0;
  const isLast = activeStep === GUIDE_STEPS.length - 1;

  return (
    <section
      id="guia"
      className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            06. GUÍA DEL PROFESIONAL (MÉDICOS Y VETERINARIOS)
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white"
            style={{ textWrap: 'balance' }}
          >
            De la instalación a la primera historia firmada.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Los seis pasos que sigue un profesional en Fichio Care o Fichio Vet, con los nombres de botones tal como aparecen en la app.
            La guía completa vive en el repositorio.
          </p>
        </div>

        {/* Interactive Step Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Step List */}
          <div className="lg:col-span-5 space-y-2">
            {GUIDE_STEPS.map((item, idx) => {
              const isSelected = idx === activeStep;
              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  aria-current={isSelected ? 'step' : undefined}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-800/90 border-brand-600 dark:border-brand-500/80 shadow-sm ring-1 ring-brand-500/30'
                      : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div
                    className={`font-mono text-sm font-bold ${
                      isSelected ? 'text-brand-700 dark:text-brand-400' : 'text-neutral-400 dark:text-neutral-500'
                    }`}
                  >
                    {item.number}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 flex items-center justify-between gap-2">
                      <span>{item.title}</span>
                      {isSelected && (
                        <span className="text-[10px] text-brand-700 dark:text-brand-400 font-mono font-semibold whitespace-nowrap">
                          Viendo
                        </span>
                      )}
                    </div>
                    <div className="text-neutral-500 dark:text-neutral-400 text-xs">{item.summary}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Step Detail */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-6 sm:p-8 space-y-6 shadow-xl transition-colors">

              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      Paso {step.number} de {String(GUIDE_STEPS.length).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{step.title}</h3>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-brand-800 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 px-2.5 py-1 rounded font-medium max-w-full truncate">
                  {step.uiPath}
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{step.intro}</p>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-brand-700 dark:text-brand-400">QUÉ HACER:</div>
                <ul className="space-y-2.5">
                  {step.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tener en cuenta:</strong> {step.tip}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  disabled={isFirst}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                <span className="font-mono text-[11px] text-neutral-400">
                  {step.number} / {String(GUIDE_STEPS.length).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(GUIDE_STEPS.length - 1, prev + 1))}
                  disabled={isLast}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Fichio Vet Differences + Full Guide Links */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400">
                <PawPrint className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Fichio Vet: mismo motor, ficha distinta
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              El flujo de trabajo es idéntico al de Fichio Care —entries, SOAP, export y respaldos—. Cambian los campos del paciente
              y el documento que usa la búsqueda exacta:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {VET_DIFFERENCES.map((difference) => (
                <li key={difference} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                  <span>{difference}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            <a
              href={GUIDE_URL}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:border-brand-400 dark:hover:border-brand-500/60 transition-colors flex items-start justify-between gap-4"
            >
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Guía completa</div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Los 15 capítulos de la guía de usuario, versión {PRODUCT_VERSION}.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={ISSUES_URL}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:border-brand-400 dark:hover:border-brand-500/60 transition-colors flex items-start justify-between gap-4"
            >
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Reportar un problema</div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Si algo no coincide con la guía, abrí un issue. Nunca subas datos de pacientes reales.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
