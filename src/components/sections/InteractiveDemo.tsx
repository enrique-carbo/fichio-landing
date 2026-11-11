import React, { useState } from 'react';
import { Stethoscope, PawPrint, Brain, Activity, HeartPulse, ShieldCheck, FileText, CheckCircle2, Copy, Download, RefreshCw, Lock, Sparkles, Send } from 'lucide-react';
import { SPECIALTIES, PRODUCT_VERSION } from '../../data/fichioContent';
import { SpecialtyId } from '../../types';

interface ClinicalEntry {
  id: string;
  category: 'SOAP_NOTE' | 'MEDICATION' | 'ALLERGY' | 'CONDITION';
  title: string;
  timestamp: string;
  author: string;
  authorRole: string;
  content: {
    subjetivo: string;
    objetivo: string;
    analisis: string;
    plan: string;
  };
  signature: string;
  status: 'ACTIVE' | 'RESOLVED' | 'COMPLETED';
}

interface InteractiveDemoProps {
  initialSpecialty?: SpecialtyId;
}

/** Firmante de ejemplo por especialidad, para que el sandbox no firme siempre con la médica. */
const SPECIALTY_SIGNERS: Record<SpecialtyId, { author: string; authorRole: string }> = {
  medicina: { author: 'Dra. Valeria Gómez', authorRole: 'Médica Clínica · M.N. 142.809' },
  veterinaria: { author: 'Dr. Martín Rossi', authorRole: 'Medicina Veterinaria · M.V. 8.412' },
  psicologia: { author: 'Lic. Elena Ramos', authorRole: 'Psicoterapia Cognitiva · M.N. 49.301' },
  odontologia_kinesio: { author: 'Lic. Lucía Ferreyra', authorRole: 'Kinesiología · M.N. 12.874' },
  enfermeria: { author: 'Enf. Carla Domínguez', authorRole: 'Enfermería · M.P. 6.215' },
};

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ initialSpecialty = 'medicina' }) => {
  const [activeSpecialty, setActiveSpecialty] = useState<SpecialtyId>(initialSpecialty);
  const [activeTab, setActiveTab] = useState<'ehr' | 'export_md'>('ehr');
  const [copied, setCopied] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signSuccessNotice, setSignSuccessNotice] = useState(false);

  const specialty = SPECIALTIES.find((s) => s.id === activeSpecialty) || SPECIALTIES[0];

  // Initial clinical entries
  const [entries, setEntries] = useState<ClinicalEntry[]>([
    {
      id: 'entry-001',
      category: 'SOAP_NOTE',
      title: 'Evolución de Control Trimestral',
      timestamp: '2026-10-10 10:30',
      author: SPECIALTY_SIGNERS[initialSpecialty].author,
      authorRole: SPECIALTY_SIGNERS[initialSpecialty].authorRole,
      content: { ...specialty.sampleSoap },
      signature: 'ed25519:7f8a9b2c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
      status: 'ACTIVE',
    },
  ]);

  // Form state for adding new note
  const [newTitle, setNewTitle] = useState('Consulta de Seguimiento');
  const [newSubjetivo, setNewSubjetivo] = useState(
    'Paciente asintomático, cumple pautas indicadas en consulta previa. Refiere buena tolerancia general.'
  );
  const [newObjetivo, setNewObjetivo] = useState(
    'Examen clínico sin particularidades. Signos vitales estables dentro de parámetros normales.'
  );
  const [newAnalisis, setNewAnalisis] = useState('Evolución clínica satisfactoria.');
  const [newPlan, setNewPlan] = useState('Continuar conducta expectante y controles habituales.');

  // Switch specialty handler
  const handleSpecialtyChange = (id: SpecialtyId) => {
    setActiveSpecialty(id);
    const selected = SPECIALTIES.find((s) => s.id === id) || SPECIALTIES[0];
    const signer = SPECIALTY_SIGNERS[id];
    setEntries([
      {
        id: `entry-${Date.now()}`,
        category: 'SOAP_NOTE',
        title: 'Consulta Inicial / Registro Canónico',
        timestamp: '2026-10-14 09:15',
        author: signer.author,
        authorRole: signer.authorRole,
        content: { ...selected.sampleSoap },
        signature: 'ed25519:' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
        status: 'ACTIVE',
      },
    ]);
  };

  // Sign and Append Entry (simulating Ed25519 signature + Append-Only storage)
  const handleSignAndAppend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigning(true);

    setTimeout(() => {
      const randomSig = 'ed25519:' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newEntry: ClinicalEntry = {
        id: `entry-${Date.now()}`,
        category: 'SOAP_NOTE',
        title: newTitle || 'Evolución Clínica',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        author: SPECIALTY_SIGNERS[activeSpecialty].author,
        authorRole: SPECIALTY_SIGNERS[activeSpecialty].authorRole,
        content: {
          subjetivo: newSubjetivo,
          objetivo: newObjetivo,
          analisis: newAnalisis,
          plan: newPlan,
        },
        signature: randomSig,
        status: 'ACTIVE',
      };

      setEntries([newEntry, ...entries]);
      setIsSigning(false);
      setSignSuccessNotice(true);
      setTimeout(() => setSignSuccessNotice(false), 3500);

      // Reset form fields
      setNewTitle('Consulta de Seguimiento');
      setNewSubjetivo('');
      setNewObjetivo('');
      setNewAnalisis('');
      setNewPlan('');
    }, 450);
  };

  // Generate real Markdown export snapshot exactly as Fichio exports it
  const generateMarkdownExport = () => {
    const p = specialty.samplePatient;
    const now = new Date().toISOString().split('T')[0];
    return `# HISTORIA CLÍNICA DIGITAL — FICHIO CARE
Generado el: ${now} | Formato: Markdown Firmado v${PRODUCT_VERSION}
ID Fichero: FICHIO-EXPORT-${specialty.id.toUpperCase()}-2026

## 1. Datos de Filiación (Descifrado en RAM bajo sesión activa)
- **Paciente**: ${p.nombre}
- **Identificador / DNI**: ${p.identificador}
${p.extraLabel ? `- **${p.extraLabel}**: ${p.extraValor}\n` : ''}- **Edad / Parámetros**: ${p.edad}
- **Diagnóstico Principal**: ${p.diagnosticoPrincipal}
- **Alergias Registradas**: ${p.alergias.join(', ')}
- **Medicación Activa**: ${p.medicacionActual.join(', ')}

---

## 2. Resumen de Registros Clínicos (Append-Only)
Total de evoluciones verificadas: ${entries.length}

${entries
  .map(
    (e, idx) => `### [${idx + 1}] ${e.title}
- **Fecha y Hora**: ${e.timestamp}
- **Profesional Firmante**: ${e.author} (${e.authorRole})
- **Estado**: ${e.status}
- **Firma Ed25519 (No-Repudio)**: ✓ VÁLIDA \`${e.signature.substring(0, 28)}...\`

#### Subjetivo (S):
${e.content.subjetivo}

#### Objetivo (O):
${e.content.objetivo}

#### Análisis (A):
${e.content.analisis}

#### Plan (P):
${e.content.plan}
`
  )
  .join('\n---\n\n')}

---
### Certificación Criptográfica de Exportación
- **Motor**: Fichio Native Core (Rust + ed25519-dalek)
- **Firma Ed25519 del documento**: \`ed25519:8f3c1a...documento-completo\`
- **Fingerprint de la clave pública**: SHA-256:4b7e2d9a...firmante
- **Integridad SHA-256 del contenido**: 8e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a
- **Ubicación de emisión**: exports/ (carpeta local de la aplicación)
- **Aviso de Confidencialidad**: Este documento contiene información médica protegida por secreto profesional y normativa de protección de datos personales.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdownExport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdownFile = () => {
    const content = generateMarkdownExport();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HistoriaClinica_${specialty.samplePatient.nombre.replace(/[^a-zA-Z0-9]/g, '_')}_2026.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="demostracion" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            03. SIMULADOR CLÍNICO EN VIVO (SANDBOX)
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            Prueba cómo se siente Fichio en tu flujo real de trabajo.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Alterna entre especialidades, agrega una evolución SOAP, simula el sellado con firma digital Ed25519 en RAM y exporta la historia clínica completa en formato Markdown.
          </p>
        </div>

        {/* Specialty Selector Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {SPECIALTIES.map((spec) => {
              const isActive = spec.id === activeSpecialty;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => handleSpecialtyChange(spec.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-700 dark:bg-brand-700 text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {spec.id === 'medicina' && <Stethoscope className="w-3.5 h-3.5" />}
                  {spec.id === 'veterinaria' && <PawPrint className="w-3.5 h-3.5" />}
                  {spec.id === 'psicologia' && <Brain className="w-3.5 h-3.5" />}
                  {spec.id === 'odontologia_kinesio' && <Activity className="w-3.5 h-3.5" />}
                  {spec.id === 'enfermeria' && <HeartPulse className="w-3.5 h-3.5" />}
                  <span>{spec.title.split(' ')[0].replace(/,$/, '')}</span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher: EHR vs Export .md */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('ehr')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'ehr'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Ficha & Evolución
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('export_md')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'export_md'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Exportar Markdown (.md)
            </button>
          </div>
        </div>

        {/* Sandbox Screen Container */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">

          {/* Top Bar of the Mock App */}
          <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{specialty.samplePatient.nombre}</span>
                <span className="text-neutral-400 mx-2">|</span>
                <span className="font-mono text-neutral-500 text-[11px]">{specialty.samplePatient.identificador}</span>
                {specialty.samplePatient.extraLabel && (
                  <span className="ml-2 text-[11px] text-brand-700 dark:text-brand-400 font-medium">
                    ({specialty.samplePatient.extraLabel}: {specialty.samplePatient.extraValor})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold">
                <Lock className="w-3 h-3" />
                Bóveda Abierta en RAM
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>Ed25519 Ready</span>
            </div>
          </div>

          {activeTab === 'ehr' ? (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Form to create new Append-Only SOAP Entry */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Nueva Evolución Clínica (SOAP Template v1)
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Inmutable al firmar
                  </span>
                </div>

                {signSuccessNotice && (
                  <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-xs text-brand-800 dark:text-brand-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>¡Nota firmada con Ed25519 y añadida a la cadena append-only!</span>
                  </div>
                )}

                <form onSubmit={handleSignAndAppend} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Título de la Entrada
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Subjetivo (S) — Motivo / Anamnesis
                      </label>
                      <textarea
                        rows={3}
                        value={newSubjetivo}
                        onChange={(e) => setNewSubjetivo(e.target.value)}
                        placeholder="Relato del paciente o tutor..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Objetivo (O) — Examen físico / Signos
                      </label>
                      <textarea
                        rows={3}
                        value={newObjetivo}
                        onChange={(e) => setNewObjetivo(e.target.value)}
                        placeholder="Parámetros, signos vitales, hallazgos..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Análisis (A) — Juicio / Diagnóstico
                      </label>
                      <textarea
                        rows={2}
                        value={newAnalisis}
                        onChange={(e) => setNewAnalisis(e.target.value)}
                        placeholder="Juicio clínico del profesional..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Plan (P) — Indicaciones / Tratamiento
                      </label>
                      <textarea
                        rows={2}
                        value={newPlan}
                        onChange={(e) => setNewPlan(e.target.value)}
                        placeholder="Fármacos, conducta, próximo turno..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">
                      Cifrado automático con AES-GCM-256 en RAM.
                    </span>

                    <button
                      type="submit"
                      disabled={isSigning}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-lg shadow-sm transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50"
                    >
                      {isSigning ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Sellando con Ed25519...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Firmar y Guardar Nota</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Timeline of append-only verified entries */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Historial Clínico Cronológico ({entries.length} registros)
                  </h3>
                  <span className="text-xs font-mono text-brand-600 dark:text-brand-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    100% Firmas Verificadas
                  </span>
                </div>

                <div className="space-y-3 max-h-115 overflow-y-auto pr-1">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">
                          {entry.title}
                        </span>
                        <span className="font-mono text-[11px] text-neutral-500">
                          {entry.timestamp}
                        </span>
                      </div>

                      <div className="text-[11px] text-neutral-500">
                        Por: <span className="font-medium text-neutral-700 dark:text-neutral-300">{entry.author}</span> · {entry.authorRole}
                      </div>

                      <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1.5 text-neutral-700 dark:text-neutral-300">
                        {entry.content.subjetivo && (
                          <div>
                            <strong className="text-brand-700 dark:text-brand-400">S: </strong>
                            <span>{entry.content.subjetivo}</span>
                          </div>
                        )}
                        {entry.content.objetivo && (
                          <div>
                            <strong className="text-brand-700 dark:text-brand-400">O: </strong>
                            <span>{entry.content.objetivo}</span>
                          </div>
                        )}
                        {entry.content.analisis && (
                          <div>
                            <strong className="text-brand-700 dark:text-brand-400">A: </strong>
                            <span>{entry.content.analisis}</span>
                          </div>
                        )}
                        {entry.content.plan && (
                          <div>
                            <strong className="text-brand-700 dark:text-brand-400">P: </strong>
                            <span>{entry.content.plan}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span className="truncate max-w-60">
                          Firma: {entry.signature.substring(0, 24)}...
                        </span>
                        <span className="text-brand-600 dark:text-brand-400 font-semibold">
                          ✓ No-Repudio Legal
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Export to Markdown view */
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Vista Previa de Exportación Markdown Nativo (.md)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Simulación del render nativo en Rust: snapshot desde RAM, firma Ed25519 del documento y SHA-256 de integridad.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadMarkdownFile}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 dark:bg-brand-700 rounded-lg shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar .md</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-300 max-h-115 overflow-y-auto leading-relaxed shadow-inner">
                <pre className="whitespace-pre-wrap">{generateMarkdownExport()}</pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
