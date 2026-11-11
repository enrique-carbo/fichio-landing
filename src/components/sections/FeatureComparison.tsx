import React from 'react';
import { Check, X, Shield, CloudOff, Lock, Server } from 'lucide-react';
import { COMPARISON_TABLE } from '../../data/fichioContent';

export const FeatureComparison: React.FC = () => {
  return (
    <section id="comparativa" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            04. COMPARATIVA ESTRUCTURAL
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            ¿Por qué la arquitectura Local-First supera al software de salud en la nube?
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Un análisis honesto entre tener la custodia de tus datos en tu hardware frente a confiar historias clínicas confidenciales a servidores remotos de terceros.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
                <th className="py-4 px-6 font-bold text-neutral-900 dark:text-neutral-100 w-1/3">
                  Criterio Operativo y Legal
                </th>
                <th className="py-4 px-6 font-bold text-brand-700 dark:text-brand-400 w-1/3">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Fichio (Local-First)</span>
                  </div>
                </th>
                <th className="py-4 px-6 font-bold text-neutral-500 w-1/3">
                  <div className="flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-neutral-400" />
                    <span>Software sanitario en la Nube</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {COMPARISON_TABLE.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={idx % 2 === 0 ? 'bg-transparent' : 'bg-neutral-50/50 dark:bg-neutral-950/30'}
                >
                  <td className="py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-neutral-800 dark:text-neutral-200">
                    <div className="flex items-start gap-2">
                      <div className="p-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {row.fichio}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-start gap-2">
                      <div className="p-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Claim-to-Proof Adjacency */}
        <div className="mt-8 p-6 rounded-2xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Garantía de Soberanía Absoluta
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Fichio no requiere portales web externos. El software se ejecuta en tu máquina y los respaldos se guardan en una carpeta local con manifest.json firmado (SHA-256 por archivo + Ed25519).
            </p>
          </div>
          <div className="font-mono text-xs text-brand-700 dark:text-brand-400 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-4 py-2 rounded-lg whitespace-nowrap shrink-0 shadow-xs">
            Consulta local: &lt; 0.5 ms
          </div>
        </div>

      </div>
    </section>
  );
};
