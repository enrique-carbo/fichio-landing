import { SpecialtyData, SecurityFeature, ComparisonRow, GuideStep } from '../types';

/** Fuente única de los datos de producto que también se muestran en la UI. */
export const PRODUCT_VERSION = '0.2.0';
export const TEST_COUNTS = { rust: 138, frontend: 73 };
export const CORE_LICENSE = 'AGPL-3.0-or-later';

/** Guía del profesional — destilada de docs/guia-usuario.md. */
export const GUIDE_STEPS: GuideStep[] = [
  {
    number: '01',
    title: 'Instalación',
    summary: 'Windows o Linux, Care o Vet',
    intro:
      'Descargá el instalador de la edición que uses desde GitHub Releases. En Windows el .exe todavía no tiene certificado comercial, así que SmartScreen va a advertir antes de dejarte instalar.',
    actions: [
      `Windows: ejecutá Fichio.Care_${PRODUCT_VERSION}_x64-setup.exe o Fichio.Vet_${PRODUCT_VERSION}_x64-setup.exe y elegí «Más información → Ejecutar de todas formas».`,
      `Linux: instalá el .deb con sudo apt install ./Fichio.Care_${PRODUCT_VERSION}_amd64.deb, o usá el .AppImage con chmod +x y doble clic.`,
      'Linux requiere glibc 2.39: Ubuntu 24.04+, Debian 13+ o LMDE 7+. No arranca en Debian 12 ni Ubuntu 22.04.',
      'Care y Vet son coinstalables: cada uno mantiene su propia base y pueden convivir en la misma PC.',
    ],
    tip: 'Si Debian o Ubuntu se queja de dependencias, instalá libwebkit2gtk-4.1-0. Si falta WebView2 en Windows, el instalador lo descarga solo.',
    uiPath: 'Instalador · GitHub Releases',
  },
  {
    number: '02',
    title: 'Primer inicio',
    summary: 'Administrador y frase semilla',
    intro:
      'La primera vez la instalación está vacía. Creás la cuenta de administrador y configurás la frase semilla de 6 palabras, que es el respaldo maestro de la instalación.',
    actions: [
      'Creá el primer administrador con usuario y contraseña de mínimo 8 caracteres: esa cuenta da de alta al resto del equipo y resetea contraseñas.',
      'Generá la frase semilla, anotá las 6 palabras en papel por duplicado y verificá re-escribiéndolas.',
      'La frase no se guarda en la app: solo existe en tu papel y en RAM mientras la usás.',
      'Después del primer administrador no hay registro libre: todos los usuarios los crea el administrador desde Usuarios.',
    ],
    tip: 'No la guardes en fotos, archivos, WhatsApp ni en la PC. Si perdés la frase y no podés abrir la instalación, los datos son irrecuperables por diseño: ni el equipo de Fichio puede recuperarlos. Guardá dos copias en papel, en lugares distintos y fuera de la PC.',
    uiPath: 'Crear Primer Administrador → Tu Frase Semilla',
  },
  {
    number: '03',
    title: 'Tu perfil profesional',
    summary: 'Nombre, profesión y matrícula',
    intro:
      'Tu identidad clínica es lo que queda impreso en cada nota firmada. Conviene completarla antes de crear la primera entry.',
    actions: [
      'Perfil → Datos del profesional → Editar: nombre completo, profesión y especialidad.',
      'Agregá una o más matrículas con número y jurisdicción; la primera es la principal.',
      'Completá domicilio, teléfono, correo y sitio o agenda, y guardá el perfil.',
      'Desde la misma pestaña podés cambiar tu contraseña sin tocar la frase semilla.',
    ],
    tip: 'Si el perfil está incompleto, la pestaña Entries te va a pedir «Completar mi perfil» antes de dejarte firmar.',
    uiPath: 'Perfil → Datos del profesional',
  },
  {
    number: '04',
    title: 'Pacientes',
    summary: 'Alta, búsqueda exacta y acceso',
    intro:
      'El padrón de pacientes es el punto de partida: ahí se da de alta, se busca y se abre la ficha que alimenta la historia clínica y las notas.',
    actions: [
      'Nuevo → completá la ficha → Crear y Cifrar. El DNI en Care y el N° Registro / Microchip en Vet son obligatorios.',
      'Buscá por texto o por documento exacto: el blind index encuentra al paciente correcto sin guardar el dato en claro.',
      'Desde la ficha podés Editar, otorgar Acceso del paciente y revisar alergias y contacto.',
      'El asistente de recepción puede dar de alta y buscar pacientes, pero no accede a la vista clínica.',
    ],
    tip: 'Las alergias son lo primero que muestra la ficha: revisalas antes de atender.',
    uiPath: 'Paciente → Padrón de Pacientes',
  },
  {
    number: '05',
    title: 'Notas clínicas',
    summary: 'SOAP, alergias, medicación y diagnóstico',
    intro:
      'Las entries son la evolución clínica: se cifran antes de tocar el disco y se firman con Ed25519. Son inmutables: no se editan ni se borran.',
    actions: [
      'Elegí la categoría: Nota SOAP, Alergia, Medicación o Diagnóstico, y completá título, estado y campos.',
      'Desde la 0.2.0 también podés crear la nota SOAP desde la ficha del paciente, con la categoría ya fijada.',
      'Cada card muestra «Firmado: nombre · profesión» y el estado Verificada o Sin verificar.',
      'Filtrá por categoría o buscá por título para encontrar una evolución en el timeline.',
    ],
    tip: 'Para corregir un error, creá una entry nueva que deje constancia («Corrección de nota del …»): la anterior queda como registro firmado.',
    uiPath: 'Entries → Nueva Entry · Historia Clínica',
  },
  {
    number: '06',
    title: 'Exportar y respaldar',
    summary: 'Markdown firmado y copia semanal',
    intro:
      'La historia completa de cada paciente se exporta a Markdown firmado y el respaldo se genera en la carpeta que elijas: disco externo, NAS o nube.',
    actions: [
      'Entries → Exportar .md: el archivo incluye filiación, perfil, entries, SHA-256 y firma Ed25519 del documento completo.',
      'Administración → Respaldos → Generar respaldo… y guardalo fuera de la PC por duplicado.',
      'El aviso de respaldos aparece a los 7 días sin copia o si nunca generaste una.',
      'Cerrá la bóveda al terminar la jornada: las claves se borran de la memoria.',
    ],
    tip: 'Antes de actualizar a una versión nueva, respaldá. Restaurar reemplaza todos los datos actuales, así que usalo para recuperarte, no para deshacer cambios.',
    uiPath: 'Entries → Exportar .md · Administración → Respaldos',
  },
];

/** Diferencias de Fichio Vet respecto de Fichio Care (docs/guia-usuario.md §13). */
export const VET_DIFFERENCES = [
  'Ficha sin DNI, Seguro Salud ni Afiliado.',
  'Especie, raza y sexo del animal, más Apellido / Tutor.',
  'N° Registro / Microchip como documento y búsqueda exacta.',
  'Teléfono y correo dentro del grupo Responsable - Tutor.',
  'Base propia: Care y Vet conviven en la misma PC.',
];

/** Novedades de la release vigente (fuente: GitHub Releases). */
export const RELEASE_HIGHLIGHTS = [
  {
    title: 'Nota SOAP desde la ficha del paciente',
    description:
      'El historial de la ficha tiene un botón Nueva nota SOAP que abre el formulario ahí mismo, con la categoría ya fijada. Si cambiás de paciente, se cierra solo: la nota nunca se firma en la ficha equivocada.',
  },
  {
    title: 'Tema oscuro más legible',
    description:
      'Subimos un escalón el contraste de todos los textos. El texto de apoyo sobre paneles elevados pasó de ~3:1 a ~6:1.',
  },
  {
    title: 'Recordatorio de respaldos',
    description:
      'Un banner muestra cuándo fue el último respaldo y avisa si pasaron 7 días o si nunca se generó uno.',
  },
  {
    title: 'Versión y "Acerca de"',
    description:
      'La versión aparece en el pie del menú y en el login; al hacer clic se abre el detalle con licencia y acceso a descargas.',
  },
];

export const SPECIALTIES: SpecialtyData[] = [
  {
    id: 'medicina',
    title: 'Medicina General y Especialidades',
    subtitle: 'Consultorios médicos, pediatría, cardiología y medicina interna',
    tagline: 'Filiación completa, antecedentes clínicos y evoluciones con firma criptográfica verificable.',
    iconName: 'Stethoscope',
    entityType: 'Humano',
    imageSrc: '/src/assets/images/hero_fichio_workstation_1791977202707.jpg',
    imageAlt: 'Estación de trabajo médico con monitor y estetoscopio',
    samplePatient: {
      nombre: 'Carlos E. Méndez',
      identificador: 'DNI 32.841.902',
      edad: '44 años',
      diagnosticoPrincipal: 'Hipertensión Arterial · Dislipemia',
      ultimaEvolucion: 'Control trimestral de presión. Buen cumplimiento del tratamiento.',
      alergias: ['Penicilina', 'Sulfas'],
      medicacionActual: ['Enalapril 10mg / día', 'Atorvastatina 20mg / noche'],
    },
    sampleSoap: {
      subjetivo: 'Paciente acude a control rutinario. Refiere buen descanso nocturno y ausencia de cefaleas matinales. Sin palpitaciones ni disnea.',
      objetivo: 'PA: 122/78 mmHg en MSD. FC: 68 lpm rítmico. IMC: 26.2. Auscultación cardiorrespiratoria sin soplos ni ruidos agregados.',
      analisis: 'Evolución favorable bajo pauta farmacológica habitual. Tensión arterial dentro de metas terapéuticas.',
      plan: 'Mantener esquema de Enalapril 10mg/24h. Solicitar laboratorio de control (perfil lipídico y función renal). Próximo turno en 90 días.',
    },
  },
  {
    id: 'veterinaria',
    title: 'Veterinaria y Pequeños Animales',
    subtitle: 'Clínicas veterinarias y atención a domicilio de animales de compañía',
    tagline: 'Esquema aplanado Paciente-Tutor: nombre del animal, especie, raza y responsable legal.',
    iconName: 'PawPrint',
    entityType: 'Animal + Tutor',
    imageSrc: '/src/assets/images/specialty_veterinary_care_1791977204225.jpg',
    imageAlt: 'Consultorio veterinario moderno con mesa de exploración y tutor',
    samplePatient: {
      nombre: 'Milo (Canino · Golden Retriever)',
      identificador: 'Chip #981098102348',
      extraLabel: 'Tutor Responsable',
      extraValor: 'Sofía Martínez (DNI 38.102.441)',
      edad: '3 años y 2 meses',
      diagnosticoPrincipal: 'Control anual de vacunación · Peso 31.4 kg',
      ultimaEvolucion: 'Examen físico general sin hallazgos patológicos. Aplicación de antirrábica y séxtuple.',
      alergias: ['Hipersensibilidad a picadura de pulga (DAPP)'],
      medicacionActual: ['Nexgard Spectra mensual', 'Omega 3 articular'],
    },
    sampleSoap: {
      subjetivo: 'Tutor refiere apetito normal y actividad física habitual. No presenta episodios de vómito ni diarrea.',
      objetivo: 'Tº 38.6 ºC. Mucosas rosadas TLLC < 2 seg. Ganglios submandibulares normales. Otoscopía bilateral limpia.',
      analisis: 'Paciente canino normopeso con estado general óptimo para inmunización anual.',
      plan: 'Aplicación de refuerzo séxtuple y antirrábica. Desparasitación interna programada.',
    },
  },
  {
    id: 'psicologia',
    title: 'Psicología y Psicoterapia',
    subtitle: 'Terapia individual, parejas, infanto-juvenil y psiquiatría',
    tagline: 'Privacidad absoluta. Notas clínicas cifradas en RAM que ningún tercero puede interceptar.',
    iconName: 'Brain',
    entityType: 'Confidencial',
    imageSrc: '/src/assets/images/specialty_psychology_office_1791977203929.jpg',
    imageAlt: 'Consultorio privado de psicología con sillón y ambiente tranquilo',
    samplePatient: {
      nombre: 'Laura B.',
      identificador: 'Expediente #P-2026-88',
      edad: '31 años',
      diagnosticoPrincipal: 'Trastorno de Ansiedad Generalizada (F41.1) en remisión parcial',
      ultimaEvolucion: 'Sesión enfocada en reestructuración cognitiva y registro de pensamientos automáticos.',
      alergias: ['No refiere'],
      medicacionActual: ['Sertralina 50mg (indicada por psiquiatra tratante)'],
    },
    sampleSoap: {
      subjetivo: 'Refiere disminución en rumiación nocturna durante la última quincena tras implementar pausas activas laborales.',
      objetivo: 'Orientada en tiempo y espacio. Discurso fluido con afecto congruente. Nivel de ansiedad autorreportado: 3/10.',
      analisis: 'Progresión positiva en adquisición de herramientas de regulación emocional.',
      plan: 'Continuar con registro conductual de disparadores. Próxima sesión en 7 días.',
    },
  },
  {
    id: 'odontologia_kinesio',
    title: 'Kinesiología, Odontología y Nutrición',
    subtitle: 'Profesionales independientes, fisioterapeutas y centros de rehabilitación',
    tagline: 'Plantillas adaptables (SOAP, Alergias, Medicación, Condiciones) sin fricciones.',
    iconName: 'Activity',
    entityType: 'Humano',
    samplePatient: {
      nombre: 'Marcos A. Rossi',
      identificador: 'DNI 29.540.118',
      edad: '48 años',
      diagnosticoPrincipal: 'Tendinopatía rotuliana rodilla derecha (Post-esfuerzo)',
      ultimaEvolucion: 'Sesión 4 de rehabilitación kinesiológica. Mejoría en rango de flexión pasiva.',
      alergias: ['Ibuprofeno'],
      medicacionActual: ['Paracetamol 1g en rescate'],
    },
    sampleSoap: {
      subjetivo: 'Reporta menor dolor al descender escaleras (EVA 4/10 frente a 7/10 inicial).',
      objetivo: 'Goniometría flexión activa 125º. Palpación del polo inferior de la rótula con sensibilidad moderada.',
      analisis: 'Respuesta favorable a ejercicios excéntricos de cuádriceps.',
      plan: 'Terapia manual descontracturante, electroanalgesia y progresión de carga excéntrica bilateral.',
    },
  },
  {
    id: 'enfermeria',
    title: 'Enfermería y Agentes de Salud',
    subtitle: 'Cuidados domiciliarios, curaciones y seguimiento de pacientes crónicos',
    tagline: 'Registro de cuidados, medicación administrada y evolución de heridas con trazabilidad firmada.',
    iconName: 'HeartPulse',
    entityType: 'Humano',
    samplePatient: {
      nombre: 'Marta S. Ferreyra',
      identificador: 'DNI 27.614.095',
      edad: '67 años',
      diagnosticoPrincipal: 'Úlcera venosa en miembro inferior derecho · Hipertensión arterial',
      ultimaEvolucion: 'Tercera curación domiciliaria. Lecho con tejido de granulación y menor exudado.',
      alergias: ['Látex', 'Penicilina'],
      medicacionActual: ['Enalapril 10mg / día', 'Paracetamol 500mg condicional'],
    },
    sampleSoap: {
      subjetivo: 'Paciente refiere menor dolor en la herida (EVA 3/10) y buen descanso nocturno. La familia colabora con la elevación del miembro.',
      objetivo: 'PA 128/76 mmHg. FC 74 lpm. Úlcera de 4 x 3 cm en cara medial de pierna derecha, lecho con granulación, exudado seroso moderado, sin signos de infección.',
      analisis: 'Evolución favorable de la úlcera venosa. Se mantiene el plan de curaciones y el control de factores de riesgo.',
      plan: 'Curación con apósito hidrocoloide cada 48 h. Educación sobre elevación del miembro y signos de alarma. Próxima visita en 48 h.',
    },
  },
];

export const SECURITY_PILLARS: SecurityFeature[] = [
  {
    number: '01',
    title: 'Criptografía en RAM con Zero-Knowledge Parcial',
    mechanism: 'AES-GCM-256 + Argon2id (wrap de DataKey)',
    benefit: 'Sin la contraseña o la frase semilla, la base local es incomprensible.',
    technicalBadge: 'Cifrado en reposo + RAM',
    detail: 'La DataKey se desenvuelve en memoria al abrir la bóveda y envuelve los datos clínicos con AES-GCM-256. Al cerrar sesión se descarta y los buffers Zeroizing se ponen a cero (best-effort). Protege el disco: no aísla criptográficamente a los co-usuarios de la misma instalación.',
    codePath: 'src-tauri/src/security/crypto.rs',
  },
  {
    number: '02',
    title: 'Firma Digital Asimétrica por Entry',
    mechanism: 'Ed25519 (Dalek) + JSON Canónico',
    benefit: 'No-Repudio e integridad verificable de cada evolución.',
    technicalBadge: 'Append-Only Inmutable',
    detail: 'Cada evolución queda sellada con la clave privada Ed25519 del profesional sobre el JSON canónico de todos los campos persistidos. La corrección se hace con nuevas entradas: no existe update ni delete de historias clínicas. La firma acredita integridad y autoría criptográfica; no equivale a firma digital certificada mientras no se integre una autoridad certificante.',
    codePath: 'src-tauri/src/security/crypto.rs',
  },
  {
    number: '03',
    title: 'Búsqueda por Índice Ciego',
    mechanism: 'HMAC-SHA256 Blind Index',
    benefit: 'Busca pacientes por DNI sin descifrar la base de datos.',
    technicalBadge: 'Privacidad Operativa',
    detail: 'El índice ciego se deriva con HMAC-SHA256 y una clave derivada de la DataKey sobre el DNI normalizado. Permite búsquedas exactas e instantáneas sin exponer el dato ni necesitar una sal que respaldar o sincronizar.',
    codePath: 'src-tauri/src/security/crypto.rs',
  },
  {
    number: '04',
    title: 'Recuperación Soberana Break-Glass',
    mechanism: 'Frase Semilla de 6 Palabras + Argon2id',
    benefit: 'Recupera el acceso ante emergencias sin backdoors en la nube.',
    technicalBadge: 'Recuperación Auditada',
    detail: 'La frase de 6 palabras vive en papel, nunca en disco. Verifica la posesión contra el master wrap (.data_key.master) con Argon2id y la sal de dominio fichio/seed-kdf/v1; restablece la contraseña del administrador activo más antiguo y queda registrada en audit_log. La DataKey no cambia.',
    codePath: 'src-tauri/src/security/seed.rs',
  },
  {
    number: '05',
    title: 'Autonomía 100% Offline (Local-First)',
    mechanism: 'Rust + Tauri v2 + SQLite WAL (rusqlite)',
    benefit: 'Atiende sin interrupciones, con o sin conexión a internet.',
    technicalBadge: 'Latencia local < 0.5 ms',
    detail: 'No dependes de servidores caídos, enlaces lentos ni suscripciones web que bloqueen tus fichas. La base es un SQLite embebido en modo WAL, accedido directamente desde Rust sin servidor de base de datos ni plugins intermedios.',
    codePath: 'src-tauri/src/db/database.rs',
  },
  {
    number: '06',
    title: 'Exportación Abierta a Markdown',
    mechanism: 'Render en Rust + Ed25519 + SHA-256',
    benefit: 'Tus fichas son tuyas para siempre, sin formatos cautivos.',
    technicalBadge: 'Libre de Vendor Lock-in',
    detail: 'Exporta la historia completa a exports/ como .md cronológico, con labels y orden del esquema clínico. El documento completo se firma con Ed25519 y lleva SHA-256 de integridad; el evento export_emitted queda en auditoría solo con metadata (subject_id, entries y hash).',
    codePath: 'src-tauri/src/export/render.rs',
  },
];

export const COMPARISON_TABLE: ComparisonRow[] = [
  {
    feature: 'Soberanía de los datos',
    fichio: 'Almacenados 100% en tu propio disco duro bajo tu custodia',
    traditional: 'Alojados en servidores en la nube de un tercero',
    advantage: true,
  },
  {
    feature: 'Funcionamiento sin conexión',
    fichio: 'Autonomía total: consultas locales en < 0.5 ms sin internet',
    traditional: 'Si se corta la conexión o se cae el servidor, no puedes atender',
    advantage: true,
  },
  {
    feature: 'Seguridad y Privacidad',
    fichio: 'AES-GCM-256 + Blind Index con Zero-Knowledge Parcial',
    traditional: 'Texto plano accesible por administradores y empleados del SaaS',
    advantage: true,
  },
  {
    feature: 'Integridad y Autoría de las Notas',
    fichio: 'Firma Ed25519 por entrada y del documento exportado, verificable con la clave pública',
    traditional: 'Simples registros editables en bases de datos MySQL/Postgres',
    advantage: true,
  },
  {
    feature: 'Respaldos y Recuperación',
    fichio: 'Carpeta local con manifest.json firmado (SHA-256 por archivo + Ed25519)',
    traditional: 'Depende de la continuidad y la política del proveedor',
    advantage: true,
  },
  {
    feature: 'Acceso y Bloqueo',
    fichio: 'La aplicación es tuya, no te pueden cortar el acceso',
    traditional: 'Si dejas de pagar la suscripción mensual, pierdes tus fichas',
    advantage: true,
  },
  {
    feature: 'Portabilidad de Historias',
    fichio: 'Markdown (.md) con firma Ed25519 del documento y SHA-256 de integridad',
    traditional: 'Formatos propietarios o exportaciones limitadas a PDF con marca',
    advantage: true,
  },
];

export const TECH_SPECS = [
  { label: 'Motor Criptográfico', value: 'Rust nativo (AES-GCM-256, Ed25519, Argon2id, SHA-256)' },
  { label: 'Persistencia Local', value: 'SQLite (rusqlite) embebido en WAL, sin servidor de BD' },
  { label: 'Modelo Clínico', value: 'Entries append-only firmadas; sin update ni delete' },
  { label: 'Respaldos', value: 'manifest.json firmado (SHA-256 + Ed25519)' },
  {
    label: 'Requisitos de Instalación',
    value: '~100 MB de disco; sin internet salvo instalar/actualizar. Linux requiere glibc 2.39 (Ubuntu 24.04+, Debian 13+)',
  },
  { label: 'Tests Automatizados', value: `${TEST_COUNTS.rust} tests en Rust + ${TEST_COUNTS.frontend} en frontend` },
  { label: 'Compatibilidad de SO', value: 'Windows 10/11 (64-bit) y Linux amd64 con glibc 2.39+; macOS en roadmap' },
  { label: 'Licencia del Core', value: `${CORE_LICENSE} · dual licensing disponible` },
];
