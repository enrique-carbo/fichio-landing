# 🩺 Fichio — Landing Page Oficial

Landing page de nivel producción para **Fichio**, el software de historias clínicas digitales con enfoque **Local-First** y arquitectura de seguridad **Zero-Knowledge Parcial** (cifrado AES-GCM-256 en reposo y en RAM; la telemedicina asíncrona está en el roadmap, Fase 5).

**Fichio** es la marca y el motor; existen dos compilaciones sobre el mismo Core: **Fichio Care** (salud humana) y **Fichio Vet** (veterinaria). La landing habla de *Fichio* como producto y de ambas ediciones solo donde aporta precisión.

Construida con **React 19**, **TypeScript estricto**, **Tailwind CSS v4** y **Vite**, siguiendo una arquitectura modular desacoplada inspirada en el modelo de componentes e islas de **Astro**.

> Fuente de verdad de las capacidades del producto: **[docs/README_original_project.md](./docs/README_original_project.md)**. Si cambian tests, roles, licencia o alcance de seguridad, actualiza primero este README y la landing.

---

## ✨ Características Principales

### 1. 🌓 Sistema Dual de Temas (Modo Claro / Modo Oscuro)
- Soporte completo y reactivo para modo claro y modo oscuro.
- Configurado con la variante personalizada de Tailwind CSS v4 (`@custom-variant dark (&:where(.dark, .dark *))`).
- Persistencia automática de la preferencia del usuario en `localStorage`.
- Inicia por defecto en modo claro con alto contraste y legibilidad según pautas WCAG AA.

### 2. 🧩 Arquitectura Modular ("Astro-Like Islands")
- Componentes desacoplados en `src/components/sections/` y `src/components/layout/`.
- Fácilmente exportables a proyectos de **Astro** mediante `@astrojs/react` (`<Component client:load />` o `<Component client:visible />`).
- Estado y datos de dominio centralizados en `src/data/fichioContent.ts` y fuertemente tipados en `src/types/index.ts`.

### 3. 🧪 Sandbox Clínico Interactivo en Vivo (`InteractiveDemo.tsx`)
- **Selector de Especialidad**: Alterna en tiempo real entre *Medicina General*, *Veterinaria*, *Psicología* y *Kinesiología/Odontología*.
- **Editor de Evoluciones SOAP v1**: Formulario dinámico para registrar Subjetivo, Objetivo, Análisis y Plan.
- **Sellado Criptográfico Ed25519**: Simulación de firma digital con hash canónico y adición al historial inmutable (*Append-Only*).
- **Exportación Directa a Markdown (.md)**: Generación instantánea del archivo `.md` de la historia clínica con formato canónico, firma Ed25519 del documento y hash de verificación SHA-256 en el footer, listo para copiar o descargar al disco.

### 4. 🔒 Inspector de Criptografía y Seguridad (`SecurityArchitecture.tsx`)
- Desglose detallado de los 6 pilares de seguridad del Core nativo en Rust:
  1. **Criptografía en RAM con Zero-Knowledge Parcial**: AES-GCM-256 + Argon2id para el wrap de la DataKey, con limpieza `zeroize` *best-effort* al cerrar sesión. Protege el disco, no aísla a los co-usuarios de la misma instalación.
  2. **Firma Digital Asimétrica por Entry**: Ed25519 sobre JSON canónico de todos los campos persistidos y garantía de No-Repudio.
  3. **Búsqueda por Índice Ciego**: HMAC-SHA256 Blind Index para consultar por DNI sin descifrar la base de datos.
  4. **Recuperación Soberana Break-Glass**: Frase semilla de 6 palabras en papel, verificada contra el master wrap con Argon2id (sal de dominio `fichio/seed-kdf/v1`); restablece la contraseña del administrador más antiguo y queda auditada. La DataKey no cambia.
  5. **Autonomía 100% Offline (Local-First)**: SQLite (rusqlite) embebido en modo WAL, sin depender de internet ni de servidores caídos.
  6. **Exportación Abierta a Markdown**: Historia completa en `exports/`, firma Ed25519 del documento, SHA-256 de integridad y auditoría `export_emitted` sin PHI.
- Inspector de snippets ilustrativos del Core en Rust, con la ruta real de cada módulo (`security/crypto.rs`, `security/seed.rs`, `db/database.rs`, `export/render.rs`).
- **Aviso de custodia de llaves**: tarjeta destacada al final de la sección con la responsabilidad del usuario sobre la **frase semilla** (dos copias en papel, fuera de la PC), la **contraseña del administrador** y los **respaldos cifrados**, más el recordatorio explícito de que sin frase semilla los datos no se pueden recuperar (sin puerta trasera ni soporte).

### 5. 🏥 Adaptabilidad Multi-Especialidad (`SpecialtiesBento.tsx`)
- **Medicina General**: Antecedentes, medicación activa y alertas de alergias.
- **Veterinaria y Animales de Compañía**: Esquema tipado paciente animal + tutor/responsable legal.
- **Psicología y Psiquiatría**: Cifrado campo a campo en reposo y RAM, con acceso clínico limitado por rol y autorización (la DataKey es compartida por instalación).
- **Kinesiología, Odontología y Nutrición**: Plantillas de rehabilitación y evolución cronológica definidas en JSON y embebidas en el build (offline e inmutables en runtime).

### 6. ⚖️ Comparativa Estructural y Ficha Técnica (`FeatureComparison.tsx` & `TechSpecs.tsx`)
- Tabla comparativa directa: **Fichio (Local-First)** frente al **SaaS Médico tradicional en la Nube**.
- Métricas de rendimiento: latencia de consulta < 0.5 ms, **138 tests unitarios en Rust** y **73 tests en Vitest**; requisitos de instalación: ~100 MB de disco y sin internet salvo instalar/actualizar.
- Matriz de autorización por roles (RBAC): *Administrador* (cuentas y auditoría, sin vista clínica), *Asistente* (admisión y acceso de pacientes), *Profesional de la Salud* (EHR, entries y export) y *Paciente* (sin DataKey por diseño).
- Licencia del Core: **AGPL-3.0-or-later** con posibilidad de licencia comercial dual.

### 7. 📖 Guía del Profesional (`ProfessionalGuide.tsx`)
- **Seis pasos interactivos** que resumen la [guía de usuario](./docs/guia-usuario.md) para un profesional: instalación, primer inicio y frase semilla, perfil profesional, pacientes, notas clínicas y export/respaldo.
- Cada paso muestra **qué hacer** con los nombres de botones tal como aparecen en la app, un aviso de cuidado y la ruta de la interfaz (`Perfil → Datos del profesional`, `Entries → Nueva Entry`, etc.).
- Navegación con la lista lateral, botones **Anterior / Siguiente** y contador de paso. El contenido vive en `GUIDE_STEPS` (`fichioContent.ts`) y el tipo `GuideStep`.
- Tarjeta de **diferencias de Fichio Vet** (ficha, microchip, tutor, base propia) y accesos a la guía completa en GitHub y a Issues para reportar discrepancias.
- La guía completa se enlaza al tag de la versión vigente (`docs/guia-usuario.md` en el repo del producto).

### 8. 💾 Centro de Descargas e Instalación (`DownloadWaitlist.tsx`) — Beta 0.2.0
- Tarjetas de descarga para **Windows 10/11** (.exe 64-bit) y **Linux amd64** (.deb / .AppImage) enlazadas a **GitHub Releases**; **macOS** aparece como *próximamente* (roadmap).
- **Aviso antes de instalar**: recuerda en ámbar que la frase semilla y la contraseña del administrador quedan bajo custodia del usuario, con enlace a la Guía del Profesional para ver el procedimiento.
- **Fichio Care** y **Fichio Vet** se publican como instaladores separados y son **coinstalables**: cada uno usa su propia base y pueden convivir en la misma PC.
- **Linux**: los binarios se compilan en Ubuntu 24.04 y requieren **glibc 2.39** — funcionan en Ubuntu 24.04+, Debian 13+ y LMDE 7+; no arrancan en Debian 12 / Ubuntu 22.04. La tarjeta lo advierte explícitamente.
- **Actualización sin migraciones**: la base y los respaldos de 0.1.x se abren tal cual, pero se recomienda respaldar antes de actualizar.
- Bloque **“Novedades de la 0.2.0”** con los cuatro cambios de la release (nota SOAP desde la ficha, tema oscuro más legible, recordatorio de respaldos y “Acerca de”) y enlace a las notas completas del tag.
- Aviso de beta sin certificado comercial en Windows (SmartScreen puede advertir) y requisito de WebView2.
- Formulario de asesoramiento para clínicas con validación en tiempo real. Al enviarlo se genera un enlace `wa.me` con los datos del solicitante (nombre/consultorio, email, especialidad, sistema operativo y versión) y se abre WhatsApp con el mensaje precargado hacia el **+54 9 343 471-8183**. El estado de confirmación incluye un botón de reintento por si el navegador bloquea la pestaña y la opción de editar los datos. El número se cambia en un solo lugar: `WHATSAPP_NUMBER` en `DownloadWaitlist.tsx`.

---

## 🎯 Alcance Honesto del Zero-Knowledge

La landing comunica **Zero-Knowledge Parcial**, no cifrado de extremo a extremo entre usuarios:

- **Protege el disco**: sin la contraseña o la frase semilla, la base local es incomprensible.
- **No aísla a co-usuarios**: la DataKey es compartida por instalación; el control entre usuarios staff es de autorización y rol, no criptográfico.
- **El rol `paciente` es la excepción estructural**: inicia sesión pero no posee la DataKey, por lo que todos los comandos clínicos le fallan.
- **La limpieza de memoria es *best-effort*** (`zeroize`), no un borrado criptográfico garantizado.

---

## 📁 Estructura del Proyecto

```text
/
├── index.html                           # Entry point HTML con fuentes y metadatos SEO
├── metadata.json                        # Identificación del proyecto en AI Studio
├── package.json                         # Dependencias (React 19, Tailwind v4, Lucide, Vite)
├── tsconfig.json                        # Configuración estricta de TypeScript
├── vite.config.ts                       # Configuración de compilación con @tailwindcss/vite
├── src/
│   ├── App.tsx                          # Orquestador principal de la landing page
│   ├── main.tsx                         # Punto de montaje de React 19
│   ├── index.css                        # Tailwind CSS v4 (@custom-variant dark) + tipografía
│   ├── types/
│   │   └── index.ts                     # Interfaces tipadas (SpecialtyData, SecurityFeature, etc.)
│   ├── data/
│   │   └── fichioContent.ts             # Datos de contenido, comparativas, specs y pacientes
│   ├── assets/
│   │   └── images/                      # Imágenes de alta resolución generadas para el dominio
│   │       ├── hero_fichio_workstation_*.jpg
│   │       ├── specialty_veterinary_care_*.jpg
│   │       └── specialty_psychology_office_*.jpg
│   └── components/
│       ├── common/
│       │   └── ThemeToggle.tsx          # Interruptor de Modo Oscuro / Modo Claro
│       ├── layout/
│       │   ├── Navbar.tsx               # Barra superior conforme al Top Bar Contract
│       │   └── Footer.tsx               # Pie de página con principios de soberanía de datos
│       └── sections/
│           ├── Hero.tsx                 # Hero principal con selector de especialidad y métricas
│           ├── SpecialtiesBento.tsx     # Bento grid asimétrico multi-especialidad
│           ├── SecurityArchitecture.tsx # Inspector de seguridad y snippets en Rust
│           ├── InteractiveDemo.tsx      # Sandbox clínico EHR con notas SOAP y exportación .md
│           ├── FeatureComparison.tsx    # Tabla comparativa Local-First vs. Nube
│           ├── TechSpecs.tsx            # Especificaciones técnicas, tests y roles RBAC
│           ├── ProfessionalGuide.tsx    # Guía interactiva de 6 pasos para médicos y veterinarios
│           └── DownloadWaitlist.tsx     # Tarjetas de descarga OS y formulario para clínicas
```

---

## 🚀 Puesta en Marcha en Desarrollo

### Requisitos
- **Node.js** >= 20
- **npm** o **pnpm**

### Instalación de Dependencias
```bash
npm install
```

### Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### Verificación de Tipos y Calidad
```bash
npm run lint
```

### Compilar para Producción
```bash
npm run build
```

---

## 🔄 Exportabilidad a Astro

Todos los componentes de `src/components/` están programados en React puro con TypeScript, sin dependencias propietarias:

1. Instala la integración oficial en Astro:
   ```bash
   npx astro add react
   ```
2. Importa y utiliza los componentes como islas interactivas en tus páginas `.astro`:
   ```astro
   ---
   import { Navbar } from '../components/layout/Navbar';
   import { Hero } from '../components/sections/Hero';
   import { InteractiveDemo } from '../components/sections/InteractiveDemo';
   import { Footer } from '../components/layout/Footer';
   ---

   <Navbar client:load />
   <Hero client:load />
   <InteractiveDemo client:visible />
   <Footer />
   ```

---

## 🛡️ Principios de Diseño Aplicados
- **Zero-Pill Discipline**: Metadatos limpios con separadores tipográficos (`·`), eliminando etiquetas innecesarias.
- **Top Bar Contract**: Cabecera estructurada en 3 zonas (marca, navegación y llamada a la acción única).
- **Anti-AI Slop**: Sin comentarios de código en encabezados (`//`), sin contadores falsos de telemetría y con tipografía equilibrada (`Plus Jakarta Sans` y `JetBrains Mono`).
- **Garantía Visual Resiliente**: Imágenes reales del dominio optimizadas con políticas de contingencia sin enlaces externos frágiles.
- **Paleta de Marca**: azul derivado del logo (`#3981b8`), expuesto como escala `brand-*` en `src/index.css` (`@theme`). Todos los botones, enlaces y acentos usan `brand-*`; cambiar el color de marca es editar un solo bloque.
