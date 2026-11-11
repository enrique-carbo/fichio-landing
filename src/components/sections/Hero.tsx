import React, { useState } from 'react';
import { Shield, Lock, FileSignature, HardDrive, Download, Play, CheckCircle2, ChevronRight, Stethoscope, PawPrint, Brain, Award, HeartPulse } from 'lucide-react';
import { SPECIALTIES, PRODUCT_VERSION, TEST_COUNTS } from '../../data/fichioContent';
import { SpecialtyId } from '../../types';

interface HeroProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onOpenDemo }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyId>('medicina');

  const currentSpecialty = SPECIALTIES.find((s) => s.id === selectedSpecialty) || SPECIALTIES[0];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-neutral-200 dark:border-neutral-800">
      {/* Background architectural grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">

            {/* Human unboxed metadata lead-in */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="text-brand-700 dark:text-brand-400 font-semibold">Fichio v{PRODUCT_VERSION}</span>
              <span aria-hidden="true">·</span>
              <span>Arquitectura Local-First</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Knowledge Parcial</span>
              <span aria-hidden="true">·</span>
              <span>Motor Nativo Rust</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              La historia clínica digital donde vos tenés el <span className="text-brand-700 dark:text-brand-400">control total y absoluto de tus datos</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Software de gestión clínica para <strong>médicos, veterinarios, psicólogos, kinesiólogos, enfermeros y agentes de salud</strong>.
            Funciona 100% offline, sin internet, resguarda de forma segura los datos confidenciales de tus pacientes y sella el historial con firma criptográfica verificable.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Download className="w-4 h-4" />
                <span>Descargar</span>
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors whitespace-nowrap"
              >
                <Play className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Probar Sandbox</span>
              </button>
            </div>

            {/* Specialty Switcher Controls (interactive tab buttons) */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                Adapta el flujo según tu disciplina:
              </div>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((spec) => {
                  const isActive = spec.id === selectedSpecialty;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => setSelectedSpecialty(spec.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-brand-700 dark:bg-brand-700 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {spec.id === 'medicina' && <Stethoscope className="w-3.5 h-3.5" />}
                      {spec.id === 'veterinaria' && <PawPrint className="w-3.5 h-3.5" />}
                      {spec.id === 'psicologia' && <Brain className="w-3.5 h-3.5" />}
                      {spec.id === 'odontologia_kinesio' && <Award className="w-3.5 h-3.5" />}
                      {spec.id === 'enfermeria' && <HeartPulse className="w-3.5 h-3.5" />}
                      <span>{spec.title.split(' ')[0].replace(/,$/, '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Mockup with Fallback & Interactive Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 sm:p-3 shadow-xl transition-all">

              {/* Window Header Decor */}
              <div className="flex flex-wrap gap-2 items-center justify-between px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-[11px] text-neutral-400">fichio://boveda/activa</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 font-mono">
                  <Lock className="w-3 h-3" />
                  <span>AES-GCM-256</span>
                </div>
              </div>

              {/* Main Image with fallback */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-950 mt-2">
                <img
                  src="/images/hero_fichio_workstation.jpg"
                  alt="Estación de trabajo Fichio en consultorio moderno"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Floating clinical card snippet based on selected specialty */}
                <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/90 shadow-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {currentSpecialty.samplePatient.nombre}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500">
                      {currentSpecialty.samplePatient.identificador}
                    </span>
                  </div>

                  {currentSpecialty.samplePatient.extraLabel && (
                    <div className="text-[11px] text-brand-700 dark:text-brand-400">
                      {currentSpecialty.samplePatient.extraLabel}: {currentSpecialty.samplePatient.extraValor}
                    </div>
                  )}

                  <p className="text-neutral-600 dark:text-neutral-300 text-[11px] line-clamp-2">
                    {currentSpecialty.samplePatient.ultimaEvolucion}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-400 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-medium">
                      <FileSignature className="w-3 h-3" />
                      Firma Ed25519 verificada
                    </span>
                    <span className="font-mono">SQLite WAL · &lt;0.5 ms</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Bar */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="p-1.5">
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 font-mono">100%</div>
                  <div className="text-[10px] text-neutral-500">Offline Nativo</div>
                </div>
                <div className="p-1.5 border-x border-neutral-100 dark:border-neutral-800">
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 font-mono">0 bytes</div>
                  <div className="text-[10px] text-neutral-500">Nube / Terceros</div>
                </div>
                <div className="p-1.5">
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 font-mono">{TEST_COUNTS.rust} Tests</div>
                  <div className="text-[10px] text-neutral-500">Rust Core</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Claim-to-Proof 4-Column Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <HardDrive className="hidden sm:inline-flex w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Local-First</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              SQLite en disco local. Consultas en &lt; 0.5 ms y autonomía si cae internet.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <Lock className="hidden sm:inline-flex w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Zero-Knowledge Parcial</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              AES-GCM-256 + Argon2id. Protege el disco: sin contraseña o semilla, la base es ilegible.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <FileSignature className="hidden sm:inline-flex w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>No-Repudio</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Firma Ed25519 en cada nota append-only y en el documento exportado.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <Shield className="hidden sm:inline-flex w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Frase Semilla</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Break-glass auditado de 6 palabras: restablece la contraseña del admin, no la DataKey.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
