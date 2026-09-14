"use client";
import { SiteNav, useLanguage } from "../language";

const groups = [
  { title: "Local help and organizations", items: [
    ["211 Lake County service search", "Find food, shelter, health care, and other local help at any hour.", "https://search.211lakecounty.org/"],
    ["HACES", "Lake County immigrant family support, citizenship education, and legal guidance.", "https://haces.org/"],
    ["North Suburban Legal Aid Clinic", "Ask about immigration, housing, and domestic violence legal services.", "https://nslegalaid.org/"],
    ["College of Lake County adult education", "Free English, high school equivalency, computer literacy, and citizenship classes.", "https://www.clcillinois.edu/programs-and-classes/adult-education-and-esl"],
    ["Lake County Job Center", "Employment, training, and job search services.", "https://www.lakecountyil.gov/4927/Job-Center-of-Lake-County"],
  ]},
  { title: "Legal rights and official forms", items: [
    ["Illinois Immigration Information Hub", "State links to rights information, legal help, and welcoming centers.", "https://gov.illinois.gov/about/ona/resources.html"],
    ["Illinois Legal Aid Online", "Plain-language Illinois legal information, forms, and help finding a lawyer.", "https://www.illinoislegalaid.org/legal-information"],
    ["Legal resources for new arrivals", "Illinois legal information and referrals for people newly arriving in the state.", "https://www.illinoislegalaid.org/legal-information/resources-new-arrivals"],
    ["USCIS forms", "Official immigration forms and filing instructions; blank forms are free.", "https://www.uscis.gov/forms"],
    ["USCIS online account", "File eligible forms online and track a case.", "https://myaccount.uscis.gov/create-account"],
  ]},
  { title: "Health, money, and education", items: [
    ["Illinois health benefits for immigrants", "Current state program information and eligibility changes.", "https://hfs.illinois.gov/medicalclients/healthbenefitsforimmigrants.html"],
    ["Illinois ABE benefits", "Apply for SNAP, Medicaid, and cash assistance through the state.", "https://abe.illinois.gov/abe/access/"],
    ["Illinois Alternative Financial Aid Application", "State financial aid pathway for some students who cannot use FAFSA.", "https://www.isac.org/students/before-college/financial-aid-planning/retention-of-illinois-rise-act/"],
    ["Federal Student Aid (FAFSA)", "Check federal aid eligibility and apply for college financial aid.", "https://studentaid.gov/h/apply-for-aid/fafsa"],
    ["Free tax preparation and ITIN help", "Find IRS volunteer tax sites that may help with Form W-7 and an ITIN.", "https://www.irs.gov/tin/itin/volunteer-income-tax-assistance-vita-sites-with-itin-services"],
  ]},
  { title: "Updates and newsletters", items: [
    ["Lake County Board newsletters", "Subscribe to updates from your county board member.", "https://www.lakecountyil.gov/2266/County-Board"],
    ["Illinois Legal Aid updates", "Read current Illinois legal information and join their updates.", "https://www.illinoislegalaid.org/"],
    ["Lake County emergency updates", "County guidance and 211 contacts for food, shelter, and other urgent needs.", "https://www.lakecountyil.gov/4972/Emergency-Info"],
  ]},
] as const;
const translations = {
  English: { title:"More ways to get help", intro:"Official forms, local organizations, and places to follow updates. Check each organization’s latest rules and hours before visiting.", groups:["Local help and organizations","Legal rights and official forms","Health, money, and education","Updates and newsletters"], note:"Links reviewed September 14, 2026. Services and eligibility can change. For immediate local help, call 211.", descriptions:groups.map(group=>group.items.map(item=>item[1])) },
  Español: { title:"Más formas de obtener ayuda", intro:"Formularios oficiales, organizaciones locales y fuentes de noticias. Revise las reglas y horarios actuales antes de visitar.", groups:["Ayuda y organizaciones locales","Derechos legales y formularios oficiales","Salud, dinero y educación","Noticias y boletines"], note:"Enlaces revisados el 14 de septiembre de 2026. Los servicios y requisitos pueden cambiar. Para ayuda local inmediata, llame al 211.", descriptions:[["Encuentre alimentos, refugio, atención médica y otra ayuda local a cualquier hora.","Apoyo para familias inmigrantes, educación para ciudadanía y orientación legal en Lake County.","Pregunte por servicios legales de inmigración, vivienda y violencia doméstica.","Clases de inglés, equivalencia de secundaria, informática y ciudadanía.","Servicios de empleo, capacitación y búsqueda de trabajo."],["Enlaces estatales sobre derechos, ayuda legal y centros de bienvenida.","Información legal de Illinois, formularios y ayuda para encontrar un abogado.","Información y referencias legales para recién llegados a Illinois.","Formularios e instrucciones oficiales de inmigración; los formularios en blanco son gratis.","Presente ciertos formularios en línea y consulte el estado de su caso."],["Información actual sobre programas estatales de salud y cambios en los requisitos.","Solicite SNAP, Medicaid y ayuda económica mediante el estado.","Vía de ayuda financiera estatal para algunos estudiantes que no pueden usar FAFSA; confirme disponibilidad.","Consulte los requisitos de ayuda federal y solicite ayuda para estudios universitarios.","Busque centros voluntarios del IRS que puedan ayudar con el formulario W-7 y el ITIN."],["Suscríbase a noticias de su representante del condado.","Lea información legal actual de Illinois y suscríbase a noticias.","Orientación del condado y contactos del 211 para necesidades urgentes."]] },
  Русский: { title:"Другие способы получить помощь", intro:"Официальные формы, местные организации и источники новостей. Перед посещением уточняйте актуальные правила и часы работы.", groups:["Местная помощь и организации","Юридические права и официальные формы","Здоровье, финансы и образование","Новости и рассылки"], note:"Ссылки проверены 14 сентября 2026 года. Услуги и условия могут измениться. Для срочной местной помощи позвоните 211.", descriptions:[["Ищите продукты, жильё, медицинскую и другую местную помощь в любое время.","Поддержка семей иммигрантов, подготовка к гражданству и юридическая помощь в округе Лейк.","Узнайте о помощи по вопросам иммиграции, жилья и домашнего насилия.","Занятия по английскому, школьному образованию, компьютерам и гражданству.","Помощь с трудоустройством, обучением и поиском работы."],["Ссылки штата на информацию о правах, юридическую помощь и центры поддержки.","Правовая информация Иллинойса, формы и помощь в поиске юриста.","Правовая информация и направления для недавно прибывших в штат.","Официальные иммиграционные формы и инструкции; пустые формы бесплатны.","Подавайте доступные формы онлайн и отслеживайте своё дело."],["Актуальная информация о программах здравоохранения и изменениях условий.","Подайте заявку на SNAP, Medicaid и денежную помощь через сайт штата.","Возможность помощи студентам, которые не могут использовать FAFSA; уточняйте доступность.","Проверьте право на федеральную помощь и подайте заявку на оплату учёбы.","Найдите центры IRS, где могут помочь с формой W-7 и ITIN."],["Подпишитесь на новости представителя совета округа.","Читайте актуальную правовую информацию Иллинойса и новости.","Информация округа и контакты 211 для срочных нужд."]] },
};

export default function MoreResources() {
  const { language } = useLanguage();
  const t = translations[language];
  return <main className="more-page">
    <SiteNav current="more" />
    <header className="more-heading"><div className="eyebrow">LAKE COUNTY · ILLINOIS</div><h1>{t.title}</h1><p>{t.intro}</p></header>
    {groups.map((group,i)=><section className="more-group" key={group.title}><h2>{t.groups[i]}</h2><div className="more-grid">{group.items.map(([name,,url],j)=><a className="more-item" href={url} target="_blank" rel="noopener noreferrer" key={name}><strong>{name} <span aria-hidden="true">↗</span></strong><span>{t.descriptions[i][j]}</span></a>)}</div></section>)}
    <p className="more-note">{t.note}</p>
  </main>;
}
