// ============================================
// Articles & resources for ministries/support.html
//
// To add one, copy a line below and fill it in:
//   group:   'grief' | 'cancer' | 'divorce'  (which filter it appears under)
//   title:   the article or episode title
//   source:  where it's from (publication, podcast, etc.)
//   summary: one short line
//   url:     full link (opens in a new tab)
//   parish:  true if it's from our own parish (shows a "From our parish" badge)
// Order within a group = order on the page.
// ============================================
const SUPPORT_RESOURCES = [
  // ---- Divorce ----
  {
    group: 'divorce',
    title: 'Pastoral Guidelines on Divorce',
    source: "SSPP Pastor's Corner",
    summary: "Understand our Church's pastoral approach to civil and ecclesiastical divorce: what the process looks like, and why it's treated as a healing ministry rather than a formality.",
    url: 'https://ssppglenview.org/pastors-corner/divorce/pastoral-guidelines-on-divorce/',
    parish: true,
  },
  {
    group: 'divorce',
    title: 'Coping with Divorce',
    source: 'Ancient Faith Radio · Live with the Louhs',
    summary: 'The founders of our own Divorce Rebuilders ministry share their story and the heart behind why this group exists.',
    url: 'https://www.ancientfaith.com/podcasts/livewiththelouhs/coping_with_divorce',
    parish: true,
  },
  {
    group: 'divorce',
    title: 'Divorce as an Orthodox Christian',
    source: 'Public Orthodoxy',
    summary: 'A reflection on finding healing and community after divorce, and how our faith can transform even the most painful circumstances.',
    url: 'https://publicorthodoxy.org/2024/12/10/divorce-as-an-orthodox-christian/',
    parish: false,
  },
  {
    group: 'divorce',
    title: 'Considering Marital Separation & Divorce',
    source: 'Ancient Faith Radio · Family Matters',
    summary: 'Fr. Alex Goussetis speaks with an Orthodox marriage & family therapist about warning signs in a marriage and resources to help heal it.',
    url: 'https://www.ancientfaith.com/podcasts/familymatters/considering_marital_separation_divorce/',
    parish: false,
  },
  {
    group: 'divorce',
    title: 'Marriage Enrichment in an Orthodox Parish',
    source: 'Orthodox Church in America',
    summary: 'A pastoral look at marital disharmony in Orthodox parishes, and how a parish community can help before and after a marriage struggles.',
    url: 'https://www.oca.org/parish-ministry/familylife/marriage-enrichment-in-an-orthodox-parish',
    parish: false,
  },
  {
    group: 'divorce',
    title: 'Remarriage After Divorce: FAQ',
    source: 'Saint John the Evangelist Orthodox Church',
    summary: "Common questions about the Church's process and view on remarriage after a civil or ecclesiastical divorce.",
    url: 'https://www.saintjohnchurch.org/remarriage-after-divorce/',
    parish: false,
  },

  // ---- Grief & Loss ----
  // (none yet)

  // ---- Cancer ----
  {
    group: 'cancer',
    title: 'National Cancer Institute',
    source: 'cancer.gov',
    summary: 'Trusted information on every type of cancer, treatment, and clinical trials.',
    url: 'https://www.cancer.gov/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'American Cancer Society',
    source: 'cancer.org',
    summary: 'Information, support programs, and a 24/7 helpline for patients and families.',
    url: 'https://www.cancer.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'Cancer.Net (ASCO)',
    source: 'American Society of Clinical Oncology',
    summary: 'Doctor-approved guides to diagnosis, treatment, and coping.',
    url: 'https://www.cancer.net/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'NCCN Guidelines for Patients',
    source: 'National Comprehensive Cancer Network',
    summary: 'Easy-to-read treatment guidelines written for patients.',
    url: 'https://www.nccn.org/patientresources/patient-resources',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'Mayo Clinic',
    source: 'mayoclinic.org',
    summary: 'Patient-friendly information on cancer care and treatment.',
    url: 'https://www.mayoclinic.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'CancerCare',
    source: 'cancercare.org',
    summary: 'Free counseling, support groups, and education. Helpline: 800-813-4673.',
    url: 'https://www.cancercare.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'National Coalition for Cancer Survivorship',
    source: 'canceradvocacy.org',
    summary: 'Advocacy and resources for living with and beyond cancer.',
    url: 'https://canceradvocacy.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'Cancer Connect',
    source: 'cancerconnect.com',
    summary: 'News and community for people affected by cancer.',
    url: 'https://news.cancerconnect.com/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'CURE Magazine',
    source: 'curetoday.com',
    summary: 'Stories, news, and education for patients, survivors, and caregivers.',
    url: 'https://www.curetoday.com/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'Breastcancer.org',
    source: 'breastcancer.org',
    summary: 'Information and community for those affected by breast cancer.',
    url: 'https://www.breastcancer.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'Living Beyond Breast Cancer',
    source: 'lbbc.org',
    summary: 'Support and education for anyone affected by breast cancer.',
    url: 'https://www.lbbc.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'Susan G. Komen',
    source: 'komen.org',
    summary: 'Breast cancer information, support, and a patient helpline.',
    url: 'https://www.komen.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'National Breast Cancer Coalition',
    source: 'stopbreastcancer.org',
    summary: 'Advocacy and education to end breast cancer.',
    url: 'https://www.stopbreastcancer.org/',
    parish: false,
  },
  {
    group: 'cancer',
    title: 'FORCE: Facing Our Risk of Cancer Empowered',
    source: 'facingourrisk.org',
    summary: 'Support for people with hereditary cancer risk.',
    url: 'https://www.facingourrisk.org/',
    parish: false,
  },
];
