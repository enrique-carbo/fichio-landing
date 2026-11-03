import React from 'react';
import { Stethoscope, PawPrint, Brain, Activity, Check, ArrowRight } from 'lucide-react';
import { SPECIALTIES } from '../../data/fichioContent';

interface SpecialtiesBentoProps {
  onSelectSpecialtyForDemo: (specialtyId: string) => void;
}

export const SpecialtiesBento: React.FC<SpecialtiesBentoProps> = ({ onSelectSpecialtyForDemo }) => {
  return (
    <section id="especialidades" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            01. VERSATILIDAD CLÍNICA MULTI-ESPECIALIDAD
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            Un único core criptográfico que comprende pacientes humanos o animales.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            El motor de Fichio no prejuzga qué es un paciente: procesa entidades genéricas con atributos tipados en JSON. Médicos, veterinarios y terapeutas disponen del mismo nivel de seguridad con flujos adaptados a su práctica cotidiana.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Medicina General & Especialidades (Span 2 on lg) */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-400 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="text-xs text-neutral-500 font-mono">
                  Schema: HumanEntity · v1
                </div>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Medicina General, Pediatría y Consultorios Médicos
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Diseñado para consultas ágiles: antecedentes patológicos, registro cronológico SOAP inmutable, control de fármacos habituales y alergias con verificación inmediata por firma digital.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Filiación con DNI indexado mediante Blind Index</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Historial farmacológico y alergias con alertas</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Evoluciones SOAP (Subjetivo, Objetivo, Análisis, Plan)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Exportación .md firmada (Ed25519 + SHA-256)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Paciente de ejemplo: Carlos E. Méndez · 44 años
              </span>
              <button
                type="button"
                onClick={() => onSelectSpecialtyForDemo('medicina')}
                className="text-xs font-semibold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>Probar en Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Veterinaria (Span 1) with Real Image */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="relative aspect-4/3 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <img
                src="/images/specialty_veterinary_care.jpg"
                alt="Consultorio veterinario con canino y tutor"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium rounded">
                Esquema Paciente + Tutor
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PawPrint className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Veterinaria y Pequeños Animales
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Filiación especializada: datos del paciente animal (especie, raza, microchip) junto al responsable/tutor legal con validación condicional.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Schema: AnimalEntity
                </span>
                <button
                  type="button"
                  onClick={() => onSelectSpecialtyForDemo('veterinaria')}
                  className="text-xs font-semibold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>Ver Ficha Animal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Psicología y Psicoterapia (Span 1) with Real Image */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="relative aspect-4/3 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <img
                src="/images/specialty_psychology_office.jpg"
                alt="Consultorio privado de psicología y salud mental"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium rounded">
                Máxima Confidencialidad
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Psicología y Psiquiatría
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Las sesiones y notas terapéuticas se cifran antes de persistir. El acceso clínico se limita por rol y autorización en el backend; el cifrado protege el disco y la RAM, no aísla a los co-usuarios de la misma instalación.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Cifrado en reposo + RAM
                </span>
                <button
                  type="button"
                  onClick={() => onSelectSpecialtyForDemo('psicologia')}
                  className="text-xs font-semibold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>Ver Ficha Terapia</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Kinesiología, Odontología y Nutrición (Span 2 on lg) */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-400 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-xs text-neutral-500 font-mono">
                  Templates: SOAP · Condition · Medication
                </div>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Kinesiología, Odontología, Nutrición y Fisioterapia
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Seguimiento de planes de rehabilitación y tratamientos recurrentes. Las plantillas de evolución se definen en JSON y se embeben en el build; labels y orden son los mismos en la ficha, el formulario y el export.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 mb-1">
                    Plantillas Clínicas
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Formularios definidos en JSON y embebidos en el build, sin dependencias en runtime.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 mb-1">
                    Timeline Cronológico
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Visualiza la evolución de lesiones y medidas corporales en el tiempo.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 mb-1">
                    Exportación Firmada
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Exporta la historia completa a Markdown con firma Ed25519 y SHA-256 en 1 clic.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Paciente de ejemplo: Marcos A. Rossi · Tendinopatía rotuliana
              </span>
              <button
                type="button"
                onClick={() => onSelectSpecialtyForDemo('odontologia_kinesio')}
                className="text-xs font-semibold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>Probar en Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
