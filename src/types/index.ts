export type SpecialtyId = 'medicina' | 'veterinaria' | 'psicologia' | 'odontologia_kinesio' | 'enfermeria';

export interface SpecialtyData {
  id: SpecialtyId;
  title: string;
  subtitle: string;
  tagline: string;
  iconName: string;
  entityType: 'Humano' | 'Animal + Tutor' | 'Confidencial';
  imageSrc?: string;
  imageAlt?: string;
  samplePatient: {
    nombre: string;
    identificador: string;
    extraLabel?: string;
    extraValor?: string;
    edad: string;
    diagnosticoPrincipal: string;
    ultimaEvolucion: string;
    alergias: string[];
    medicacionActual: string[];
  };
  sampleSoap: {
    subjetivo: string;
    objetivo: string;
    analisis: string;
    plan: string;
  };
}

export interface SecurityFeature {
  number: string;
  title: string;
  mechanism: string;
  benefit: string;
  technicalBadge: string;
  detail: string;
  codePath: string;
}

export interface GuideStep {
  number: string;
  title: string;
  summary: string;
  intro: string;
  actions: string[];
  tip: string;
  uiPath: string;
}

export interface ComparisonRow {
  feature: string;
  fichio: string;
  traditional: string;
  advantage: boolean;
}
