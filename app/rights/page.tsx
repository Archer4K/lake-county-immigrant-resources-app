"use client";
import { hindiRights } from "../hindi";

import { SiteNav, useLanguage } from "../language";
import "./rights.css";

const sources = [
  ["National Immigrant Justice Center", "https://immigrantjustice.org/for-immigrants/know-your-rights/ice-encounter/"],
  ["Illinois • Immigration Rights", "https://idec.illinois.gov/resources/immigration-rights.html"],
  ["Illinois Attorney General", "https://illinoisattorneygeneral.gov/rights-of-the-people/civil-rights/immigration/"],
];
const copy = {
  हिन्दी: hindiRights,
  English: {
    title: "Know your rights", intro: "Clear starting points for encounters with immigration officers and preparing your family.",
    note: "General information, not legal advice. Rules and enforcement practices can change. Ask a qualified immigration lawyer about your situation. These translations are a site summary, not an official legal translation.",
    checked: "Sources checked September 17, 2026", urgent: "Need immigration support now?",
    hotline: "ICIRR Family Support Hotline • 24 hours", emergency: "For immediate danger or a medical emergency, call 911.",
    print: "Print / save as PDF", source: "Read the guidance", help: "Find qualified legal help",
    helpText: "Use the U.S. Department of Justice directory to find legal representation. Ask about eligibility, availability, and fees.",
    legal: "Find legal representation", cards: "Download rights cards and family resources", more: "Sources and updates",
    sections: [
      ["If officers stop you", "Stay calm. Do not run, physically resist, lie, or use false documents. You can state that you wish to remain silent. Identification and immigration-document duties vary by situation; ask a lawyer what you must carry or show."],
      ["If officers come to your home", "You can ask to see a warrant through a window or under the door. An ICE administrative warrant is different from a warrant signed by a judge. Do not physically resist entry. Read the current NIJC guidance and seek legal help."],
      ["Before signing documents", "Ask for a lawyer and an interpreter if needed. Do not sign documents you do not understand. Immigration proceedings generally do not include a government-paid lawyer."],
      ["Make a family plan", "Write down trusted contacts and important phone numbers. Arrange emergency school or childcare pickup. Ask a qualified professional about any written authorization your family may need."]
    ],
  },
  Español: {
    title: "Conozca sus derechos", intro: "Información inicial para encuentros con agentes de inmigración y para preparar a su familia.",
    note: "Información general, no asesoría legal. Las normas y prácticas pueden cambiar. Consulte a un abogado de inmigración calificado sobre su situación. Estas traducciones son un resumen del sitio, no una traducción jurídica oficial.",
    checked: "Fuentes consultadas el 17 de septiembre de 2026", urgent: "¿Necesita apoyo migratorio ahora?",
    hotline: "Línea de apoyo familiar de ICIRR • 24 horas", emergency: "En caso de peligro inmediato o emergencia médica, llame al 911.",
    print: "Imprimir / guardar PDF", source: "Leer la guía", help: "Busque ayuda legal calificada",
    helpText: "Use el directorio del Departamento de Justicia de EE. UU. para buscar representación legal. Pregunte por requisitos, disponibilidad y costos.",
    legal: "Buscar representación legal", cards: "Descargar tarjetas de derechos y recursos familiares", more: "Fuentes y actualizaciones",
    sections: [
      ["Si un agente lo detiene", "Mantenga la calma. No corra, no se resista físicamente, no mienta ni use documentos falsos. Puede declarar que desea guardar silencio. Las obligaciones de identificación y documentos migratorios varían según la situación; consulte a un abogado sobre qué debe llevar o mostrar."],
      ["Si los agentes vienen a su casa", "Puede pedir que muestren una orden por una ventana o la pasen por debajo de la puerta. Una orden administrativa de ICE es distinta de una orden firmada por un juez. No se resista físicamente a la entrada. Consulte la guía actual de NIJC y busque ayuda legal."],
      ["Antes de firmar documentos", "Pida un abogado y un intérprete si lo necesita. No firme documentos que no entienda. En los procesos migratorios, generalmente el gobierno no paga un abogado."],
      ["Prepare un plan familiar", "Anote contactos de confianza y teléfonos importantes. Organice quién recogerá a sus hijos de la escuela o guardería en una emergencia. Consulte a un profesional calificado sobre las autorizaciones escritas que su familia pueda necesitar."]
    ],
  },
  Русский: {
    title: "Знайте свои права", intro: "Основная информация о встречах с иммиграционными сотрудниками и подготовке семьи.",
    note: "Общая информация, а не юридическая консультация. Правила и практика могут меняться. Обсудите свою ситуацию с квалифицированным иммиграционным адвокатом. Перевод — краткое изложение сайта, а не официальный юридический перевод.",
    checked: "Источники проверены 17 сентября 2026 года", urgent: "Нужна срочная поддержка по вопросам иммиграции?",
    hotline: "Линия поддержки семей ICIRR • круглосуточно", emergency: "При непосредственной опасности или медицинской экстренной ситуации звоните 911.",
    print: "Печать / сохранить PDF", source: "Прочитать руководство", help: "Найдите квалифицированную юридическую помощь",
    helpText: "Найдите юридического представителя в справочнике Министерства юстиции США. Уточните условия, доступность и стоимость помощи.",
    legal: "Найти юридического представителя", cards: "Карточки о правах и ресурсы для семей", more: "Источники и обновления",
    sections: [
      ["Если вас остановили", "Сохраняйте спокойствие. Не убегайте, не сопротивляйтесь физически, не лгите и не используйте поддельные документы. Вы можете заявить, что хотите хранить молчание. Обязанности предъявлять удостоверение личности и иммиграционные документы зависят от ситуации; уточните их у адвоката."],
      ["Если сотрудники пришли домой", "Можно попросить показать ордер через окно или передать его под дверью. Административный ордер ICE отличается от ордера, подписанного судьёй. Не сопротивляйтесь входу физически. Прочитайте актуальное руководство NIJC и обратитесь за юридической помощью."],
      ["Перед подписанием документов", "Попросите адвоката и при необходимости переводчика. Не подписывайте непонятные вам документы. В иммиграционных разбирательствах государство обычно не оплачивает адвоката."],
      ["Подготовьте семейный план", "Запишите доверенные контакты и важные телефоны. Договоритесь, кто заберёт детей из школы или детского сада в экстренной ситуации. Узнайте у квалифицированного специалиста, какие письменные разрешения могут понадобиться вашей семье."]
    ],
  },
};

export default function RightsPage() {
  const { language } = useLanguage();
  const t = copy[language];
  return <main className="more-page rights-page">
    <SiteNav current="rights" />
    <header className="more-heading"><div className="eyebrow">{language === "हिन्दी" ? "लेक काउंटी · इलिनॉय" : language === "Русский" ? "ОКРУГ ЛЕЙК · ИЛЛИНОЙС" : language === "Español" ? "CONDADO DE LAKE · ILLINOIS" : "LAKE COUNTY · ILLINOIS"}</div><h1>{t.title}</h1><p>{t.intro}</p><p className="rights-date">{t.checked}</p></header>
    <aside className="rights-urgent"><h2>{t.urgent}</h2><p>{t.hotline}</p><a href="tel:8554357693">855-435-7693</a><p>{t.emergency}</p></aside>
    <p className="rights-note">{t.note}</p>
    <button className="rights-print" onClick={() => window.print()}>{t.print}</button>
    <section className="rights-grid" aria-label={t.title}>{t.sections.map(([title, body], i) => <article key={title}><span className="rights-number" aria-hidden="true">0{i+1}</span><h2>{title}</h2><p>{body}</p><a href={sources[i === 2 ? 2 : 0][1]}>{t.source} · {i === 2 ? "Illinois Attorney General" : "NIJC"} ↗</a></article>)}</section>
    <section className="pathway-help"><h2>{t.help}</h2><p>{t.helpText}</p><div><a href="https://www.justice.gov/eoir/find-legal-representation">{t.legal} ↗</a><a href={sources[1][1]}>{t.cards} ↗</a></div></section>
    <footer className="rights-sources"><h2>{t.more}</h2>{sources.map(([name,url]) => <a key={url} href={url}>{name} ↗</a>)}</footer>
  </main>;
}
