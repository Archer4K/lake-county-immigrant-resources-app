import type { Language } from "./language";

const descriptions: Record<string, { Español: string; Русский: string }> = {
  haces: { Español:"Orientación migratoria, clases de ciudadanía y apoyo a familias inmigrantes; llame para consultar los requisitos.", Русский:"Помощь по иммиграционным вопросам, занятия по гражданству и поддержка семей; уточняйте условия по телефону." },
  "lake-health": { Español:"Atención primaria y otros servicios de salud; no se rechaza a residentes por no poder pagar.", Русский:"Первичная и другая медицинская помощь; жителям не отказывают из-за невозможности оплатить услуги." },
  "clc-esl": { Español:"Clases de inglés y educación para adultos residentes de Illinois, con prioridad para Lake County.", Русский:"Английский язык и образование для взрослых жителей Иллинойса; приоритет жителям округа Лейк." },
  "job-center": { Español:"Búsqueda de empleo, capacitación y orientación profesional, incluso para inmigrantes.", Русский:"Поиск работы, обучение и карьерные услуги, включая поддержку иммигрантов." },
  "211": { Español:"Referencias gratuitas y confidenciales para alimentos, refugio, alquiler, servicios públicos, salud y más; hay intérpretes.", Русский:"Бесплатные конфиденциальные направления по вопросам еды, жилья, аренды, коммунальных услуг и здоровья; доступны переводчики." },
  "north-suburban-legal": { Español:"Ayuda legal civil gratuita para personas de bajos ingresos en inmigración, vivienda y asuntos familiares.", Русский:"Бесплатная гражданская юридическая помощь людям с низким доходом по вопросам иммиграции, жилья и семьи." },
  "painesville-food": { Español:"Refugio de emergencia, comidas y ayuda para encontrar vivienda a personas sin hogar.", Русский:"Экстренный приют, питание и помощь с жильём людям без постоянного места проживания." },
  "lake-county-vets": { Español:"Capacitación laboral gratuita, ayuda con currículum y orientación sobre beneficios para adultos que reúnen los requisitos.", Русский:"Бесплатное обучение, помощь с резюме и пособиями для взрослых, отвечающих требованиям." },
  "uscis-forms": { Español:"Formularios oficiales para permisos de trabajo, ciudadanía, peticiones familiares y exenciones de tarifas; los formularios en blanco son gratis.", Русский:"Официальные формы для разрешения на работу, гражданства, семейных петиций и освобождения от сборов; пустые формы бесплатны." },
  fafsa: { Español:"Solicitud gratuita para subvenciones, trabajo estudiantil y préstamos; estudiantes sin número de Seguro Social pueden revisar opciones.", Русский:"Бесплатная заявка на гранты, работу во время учёбы и займы; студенты без SSN могут изучить варианты помощи." },
  "illinois-benefits": { Español:"Solicite SNAP, Medicaid y ayuda económica en el portal oficial de Illinois.", Русский:"Подайте заявку на SNAP, Medicaid и денежную помощь через официальный портал Иллинойса." },
};

export function resourceDescription(id: string, original: string, language: Language) {
  return language === "English" || language === "हिन्दी" ? original : descriptions[id]?.[language] || original;
}
