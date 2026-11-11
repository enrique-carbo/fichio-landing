import React, { useState } from 'react';
import { Shield, Key, Lock, FileCode, CheckCircle, Database, RefreshCw, Cpu, AlertTriangle } from 'lucide-react';
import { SECURITY_PILLARS, TEST_COUNTS } from '../../data/fichioContent';

export const SecurityArchitecture: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = SECURITY_PILLARS[activePillarIndex];

  const RUST_CODE_SNIPPETS = [
    `// 1. Cold Start & Zeroize en memoria RAM (Rust)
pub struct DataKey(pub Zeroizing<[u8; 32]>);

impl Drop for CryptoVault {
    fn drop(&mut self) {
        // Al cerrar sesión, los bytes de la clave se ponen
        // a CERO inmediatamente. Cero residuos en el heap.
        self.master_key.zeroize();
        self.signing_key.zeroize();
    }
}`,
    `// 2. Firma Digital Asimétrica Ed25519 (No-Repudio)
let canonical_json = json!({
    "category": entry.category,
    "subject_id": entry.subject_id,
    "title": entry.title,
    "timestamp": entry.timestamp,
    "payload_ciphertext": hex::encode(&ciphertext),
    "author_id": author.id
});

let signature = signing_key.sign(canonical_json.to_string().as_bytes());`,
    `// 3. Blind Index determinista sin descifrar
let hmac_key = derive_key(&data_key, b"fichio/blind-index/v1");
let blind_index = hmac_sha256(&hmac_key, normalized_dni.as_bytes());

// La búsqueda por DNI es O(1) exacta sin exponer el DNI real:
// SELECT * FROM entities WHERE blind_index = ?;`,
    `// 4. Frase Semilla de 6 Palabras (Break-Glass Soberano)
// La frase vive en papel en el consultorio, NUNCA en disco ni en nube.
let mnemonic = ["salud", "roble", "viento", "brisa", "faro", "clínica"];
let seed_key = argon2id_derive(
    mnemonic.join(" ").as_bytes(),
    b"fichio/seed-kdf/v1", // sal de dominio, no se persiste
)?;
let master_wrap = aes_gcm_wrap(&seed_key, &data_key);`,
    `// 5. Persistencia Local SQLite con WAL Mode
let conn = Connection::open_with_flags(
    db_path,
    OpenFlags::SQLITE_OPEN_READ_WRITE | OpenFlags::SQLITE_OPEN_CREATE
)?;
conn.pragma_update(None, "journal_mode", "WAL")?;
conn.pragma_update(None, "synchronous", "NORMAL")?;`,
    `// 6. Exportación de Historia Clínica a Markdown
let hash_verificacion = sha256_digest(&markdown_buffer);
writeln!(writer, "---")?;
writeln!(writer, "SHA-256 Footer: {}", hex::encode(hash_verificacion))?;
writeln!(writer, "Fichio · Verificado por firma digital Ed25519")?;`,
  ];

  return (
    <section id="seguridad" className="py-20 bg-neutral-100/70 dark:bg-neutral-900 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-colors">
      {/* Background cryptographic grid effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(#3981b8 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 tracking-wide mb-2">
            02. ARQUITECTURA CRIPTOGRÁFICA Y ZERO-KNOWLEDGE PARCIAL
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            Protección de datos por diseño matemático, no por promesas comerciales.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            A diferencia de los sistemas web donde cualquier empleado o atacante puede leer tus historias clínicas en la base de datos, Fichio cifra la información clínica directamente en tu equipo.
          </p>
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 border-l-2 border-brand-500/60 pl-3">
            <strong className="text-neutral-700 dark:text-neutral-300">Alcance honesto:</strong> el Zero-Knowledge es parcial. Protege el disco frente a quien no tenga la contraseña o la frase semilla, pero no aísla criptográficamente a los co-usuarios de la misma instalación: la DataKey es compartida por diseño. El rol <em>paciente</em> no la posee.
          </p>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 border-l-2 border-brand-500/60 pl-3">
            <strong className="text-neutral-700 dark:text-neutral-300">Alcance de la firma:</strong> Ed25519 acredita integridad y autoría criptográfica, y cualquier tercero puede verificarla con la clave pública. No reemplaza a la firma digital certificada de la Ley 25.506 mientras no se integre una autoridad certificante; sí prueba que el registro no fue alterado desde que se selló.
          </p>
        </div>

        {/* Interactive Cryptographic Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive Pillar List */}
          <div className="lg:col-span-5 space-y-2">
            {SECURITY_PILLARS.map((pillar, idx) => {
              const isSelected = idx === activePillarIndex;
              return (
                <button
                  key={pillar.number}
                  type="button"
                  onClick={() => setActivePillarIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-800/90 border-brand-600 dark:border-brand-500/80 shadow-sm ring-1 ring-brand-500/30'
                      : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className={`font-mono text-sm font-bold ${isSelected ? 'text-brand-700 dark:text-brand-400' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    {pillar.number}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
                      <span>{pillar.title}</span>
                      {isSelected && (
                        <span className="text-[10px] text-brand-700 dark:text-brand-400 font-mono font-semibold">Activo</span>
                      )}
                    </div>
                    <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                      {pillar.mechanism}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Card + Live Rust Implementation Inspector */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-6 sm:p-8 space-y-6 shadow-xl transition-colors">

              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{activePillar.technicalBadge}</div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{activePillar.title}</h3>
                  </div>
                </div>
                <div className="font-mono text-xs text-brand-800 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 px-2.5 py-1 rounded font-medium">
                  {activePillar.mechanism}
                </div>
              </div>

              {/* Functional Explanation */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-brand-700 dark:text-brand-400">BENEFICIO PARA EL PROFESIONAL:</div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                  {activePillar.benefit}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {activePillar.detail}
                </p>
              </div>

              {/* Rust Engine Code View */}
              <div className="space-y-2 pt-2">
                <div className="flex flex-wrap gap-2 items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <FileCode className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    {activePillar.codePath}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">Rust · Tauri v2</span>
                </div>

                <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed shadow-inner">
                  <pre className="text-[12px]">{RUST_CODE_SNIPPETS[activePillarIndex]}</pre>
                </div>
              </div>

              {/* Security Invariant Guarantee */}
              <div className="p-3.5 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/40 text-xs text-brand-900 dark:text-neutral-300 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-brand-700 dark:text-brand-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Invariante verificado:</strong> el Core cuenta con {TEST_COUNTS.rust} tests unitarios en Rust verificados con <code className="text-brand-800 dark:text-brand-300 font-mono">cargo test --lib</code>, incluyendo commands end-to-end con base real.
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Custody warning: local-first means user-held keys */}
        <div className="mt-8 rounded-2xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/20 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                La soberanía también es una responsabilidad.
              </h3>
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                Fichio no tiene llave maestra: la tenés vos. Esa es la garantía y, al mismo tiempo, tu responsabilidad.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/80 dark:bg-neutral-950/50 border border-amber-200/80 dark:border-amber-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Key className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>Frase semilla · 6 palabras</span>
              </div>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Única llave para recuperar el acceso si olvidás la contraseña del administrador. Anotala en papel, hacé dos copias y guardalas en lugares distintos, fuera de la PC.
              </p>
            </div>

            <div className="rounded-xl bg-white/80 dark:bg-neutral-950/50 border border-amber-200/80 dark:border-amber-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>Contraseña del administrador</span>
              </div>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Acceso diario a la instalación y gestión de usuarios y respaldos. Guardala en un gestor de contraseñas o en un sobre sellado; no confíes solo en la memoria.
              </p>
            </div>

            <div className="rounded-xl bg-white/80 dark:bg-neutral-950/50 border border-amber-200/80 dark:border-amber-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <RefreshCw className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>Respaldos cifrados</span>
              </div>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Copia periódica fuera del equipo. Un respaldo sin la frase semilla (o la contraseña con la que se generó) no se puede abrir.
              </p>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-white/80 dark:bg-neutral-950/50 border border-amber-300 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Si perdés la frase semilla y no podés abrir la instalación, los datos no se pueden recuperar.</strong>{' '}
              No hay puerta trasera, ni soporte, ni nube que los rescate: es el precio de que nadie más pueda leerlos.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
