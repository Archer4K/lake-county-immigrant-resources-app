import Link from "next/link";

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

export default function MoreResources() {
  return <main className="more-page">
    <nav className="site-nav" aria-label="Main navigation"><Link href="/">Directory</Link><Link href="/chat">Chat helper</Link><Link href="/more" aria-current="page">More resources</Link><a href="tel:211">Call 211</a></nav>
    <header className="more-heading"><div className="eyebrow">LAKE COUNTY · ILLINOIS</div><h1>More ways to get help</h1><p>Official forms, local organizations, and places to follow updates. These links open the organization’s own website; check their latest rules and hours before visiting.</p></header>
    {groups.map(group=><section className="more-group" key={group.title}><h2>{group.title}</h2><div className="more-grid">{group.items.map(([name,description,url])=><a className="more-item" href={url} target="_blank" rel="noopener noreferrer" key={name}><strong>{name} <span aria-hidden="true">↗</span></strong><span>{description}</span></a>)}</div></section>)}
    <p className="more-note">Links reviewed September 14, 2026. Services and eligibility can change. For immediate help finding a local provider, call <a href="tel:211">211</a>.</p>
  </main>;
}
