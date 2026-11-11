import React from 'react';
import { Cpu, Terminal, Layers, CheckCircle2, ShieldCheck, Box } from 'lucide-react';
import { TECH_SPECS, TEST_COUNTS } from '../../data/fichioContent';

export const TechSpecs: React.FC = () => {
  return (
    <section id="arquitectura" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            05. ESPECIFICACIONES Y STACK TÉCNICO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            Ingeniería de sistemas para una práctica sanitaria ininterrumpida.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Fichio divide su arquitectura de forma estricta entre un núcleo de seguridad en Rust y una interfaz reactiva en TypeScript. Sin capas innecesarias ni telemetría invasiva.
          </p>
        </div>

        {/* 2-Column Split: Tech Specs Grid + Architecture Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Tech Spec Rows */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Parámetros de Rendimiento y Seguridad</span>
              </h3>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
                {TECH_SPECS.map((spec) => (
                  <div key={spec.label} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-neutral-500">{spec.label}</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 text-xs text-neutral-600 dark:text-neutral-300 space-y-2">
              <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Rigurosidad en Calidad de Código</span>
              </div>
              <p>
                Cada release de Fichio valida {TEST_COUNTS.rust} tests en Rust (<code className="font-mono text-brand-700 dark:text-brand-300">cargo test --lib</code>) y {TEST_COUNTS.frontend} tests en React con Vitest (<code className="font-mono text-brand-700 dark:text-brand-300">pnpm test</code>), con base de datos real en los commands end-to-end.
              </p>
            </div>
          </div>

          {/* Right Column: Roles & Authorization Matrix */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Control de Acceso Basado en Roles (RBAC)</span>
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                La seguridad no depende de la interfaz. El backend en Rust registra la sesión y exige autorización de rol (SessionState) antes de cada comando sensible:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 space-y-1">
                  <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Rol Administrador</span>
                    <span className="font-mono text-[10px] text-brand-700 dark:text-brand-400">Gestión Técnica</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Altas, bajas lógicas, reseteo de contraseñas, rotación de la semilla y respaldos firmados con auditoría. También admisión y otorgamiento de acceso de pacientes. Sin vista clínica.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 space-y-1">
                  <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Rol Asistente (Recepción)</span>
                    <span className="font-mono text-[10px] text-brand-700 dark:text-brand-400">Admisión</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Admisión de pacientes y otorgamiento del acceso de paciente desde su ficha. Sin gestión de cuentas, auditoría ni vista clínica.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 space-y-1">
                  <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Rol Profesional de la Salud</span>
                    <span className="font-mono text-[10px] text-brand-700 dark:text-brand-400">Atención Clínica</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Vista clínica: EHR, evolución append-only, perfil profesional y export .md. Firma con la clave Ed25519 de su vault. No realiza admisión ni gestiona cuentas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 space-y-1">
                  <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Rol Paciente</span>
                    <span className="font-mono text-[10px] text-brand-700 dark:text-brand-400">Aislamiento Estructural</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Cuenta ligada a una ficha y un acceso activo. Inicia sesión, pero no posee la DataKey: todos los comandos clínicos le fallan por diseño. La teleconsulta asíncrona llega en la Fase 5.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
