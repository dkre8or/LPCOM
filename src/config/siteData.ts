export const BRAND = {
  name: 'The Launchpad Community',
  tagline: 'Bridging Learning & Opportunity.',
  shortTagline: 'Bridging Learning & Opportunity',
  footerDescription:
    "A free, members-based community for students, graduates, and young professionals building careers they're proud of.",
  footerSupportingStatement: 'A space for learners, doers and dreamers.',
  copyright: '© 2026 The Launchpad Community. All rights reserved.',
} as const;

export const EXTERNAL_LINKS = {
  registrationEmbedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdcOEkYqVc4ZFbU4KPIUNKer2UqzAROaeleD_MG9zvNFUKw4w/viewform?embedded=true',
  registrationDirectUrl: 'https://forms.gle/mKevK4AWa5rUbu8n8',
  instagramUrl:
    'https://www.instagram.com/thelaunchpadcommunity?stkn=b3E1aWlnbTk4OWc0&utm_source=qr',
  emails: [
    'thelaunchpadcommunity1@gmail.com',
    'hello@thelaunchpadcommunity.com',
  ],
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Membership', href: '#membership' },
  { label: 'Programs', href: '#programs' },
  { label: 'Sub-brands', href: '#sub-brands' },
  { label: 'Contact', href: '#contact' },
] as const;

export const HERO_STATS = [
  { value: 8500, suffix: '+', display: '8,500+', label: 'Members' },
  { value: 45, suffix: '+', display: '45+', label: 'Countries' },
  { value: 340, suffix: '+', display: '340+', label: 'Opportunities' },
] as const;

export interface CoreProgram {
  id: string;
  anchorId?: string;
  index: string;
  category: string;
  name: string;
  hasTrademark?: boolean;
  description: string;
  ctaLabel: string;
}

export const CORE_PROGRAMS: CoreProgram[] = [
  {
    id: 'compound-meeting',
    index: '01',
    category: 'Core Program',
    name: 'Compound Meeting',
    description:
      'Our flagship gathering — a space where the Launchpad community comes together to share wins, tackle challenges, and build the kind of momentum that compounds over time. Every meeting is a reminder that you are not building alone.',
    ctaLabel: 'Get involved',
  },
  {
    id: 'lecture-saturdays',
    index: '02',
    category: 'Weekly',
    name: 'Session | Lecture Saturdays',
    description:
      'Every Saturday, members gather for structured learning sessions and expert-led lectures. Practical, focused, and built around what young professionals actually need to know — from career strategy to digital skills to mindset.',
    ctaLabel: 'View upcoming sessions',
  },
  {
    id: 'opportunity-radar',
    anchorId: 'opportunities',
    index: '03',
    category: 'Newsletter',
    name: 'Opportunity Radar',
    description:
      'Our curated newsletter delivering scholarships, internships, fellowships, jobs, grants, and remote opportunities directly to your inbox. Every edition is hand-picked — no noise, no filler. Just the opportunities worth your attention, when they matter most.',
    ctaLabel: 'Subscribe to Opportunity Radar',
  },
  {
    id: 'launch-break',
    index: '04',
    category: 'Conference',
    name: 'Launch Break',
    hasTrademark: true,
    description:
      'Our signature conference format — part fireside chat, part open-mic. Speakers share real stories, real lessons, and unfiltered career advice. The floor is then opened for members to share, ask, and connect. A room full of honesty and ambition.',
    ctaLabel: 'Learn about Launch Break',
  },
];

export interface StandaloneSubBrand {
  id: 'podcast' | 'summit';
  index: string;
  category: string;
  name: string;
  label: string;
  description: string;
  ctaLabel: string;
}

export const STANDALONE_SUB_BRANDS: StandaloneSubBrand[] = [
  {
    id: 'podcast',
    index: '05',
    category: 'Sub-brand · Audio',
    name: 'Accountability Podcast',
    label: 'Standalone Sub-brand.',
    description:
      'A podcast built on one conviction: that accountability is the missing ingredient between goals and results. Each episode brings together members, mentors, and guests to talk openly about the gap between where they are and where they are going — and what they are actively doing to close it. Raw, consistent, and real.',
    ctaLabel: 'Listen to the podcast',
  },
  {
    id: 'summit',
    index: '06',
    category: 'Sub-brand · Annual Event',
    name: 'Launchpad Summit',
    label: 'Standalone Sub-brand.',
    description:
      'The biggest moment on the Launchpad calendar. An annual gathering that brings together ambitious young people, industry leaders, and partner organisations for a full day of conversations, connections, and clarity. The Summit is where the community steps into the room that changes everything.',
    ctaLabel: 'Learn about the Summit',
  },
];

export const TESTIMONIAL = {
  quote:
    'Very grateful to have found myself in a space with like-minded individuals who dream big.',
  author: 'Precious E.',
  roleAndLocation: 'Community Member · Lagos, Nigeria.',
  imageCaption: 'Launchpad Community members at our Lagos meetup, 2025.',
} as const;

export interface FooterLinkItem {
  label: string;
  href?: string;
  external?: boolean;
  unavailableReason?: string;
}

export const FOOTER_PROGRAMS: FooterLinkItem[] = [
  { label: 'Compound Meeting', href: '#programs' },
  { label: 'Lecture Saturdays', href: '#programs' },
  { label: 'Opportunity Radar', href: '#opportunities' },
  { label: 'Launch Break™', href: '#programs' },
  { label: 'Accountability Podcast', href: '#sub-brands' },
  { label: 'Launchpad Summit', href: '#sub-brands' },
];

export const FOOTER_PAGES: FooterLinkItem[] = [
  { label: 'Our Vision', href: '#membership' },
  {
    label: 'Our Team',
    unavailableReason:
      'Our Team page URL has not been published yet. Reach out via Contact to connect with the Launchpad team.',
  },
  { label: 'Contact', href: '#contact' },
  {
    label: 'Blog',
    unavailableReason:
      'Our Blog destination has not been published yet. Follow us on Instagram or join the community for updates.',
  },
  { label: 'Partners', href: '#contact' },
];

export const FOOTER_CONNECT: FooterLinkItem[] = [
  {
    label: 'Instagram',
    href: EXTERNAL_LINKS.instagramUrl,
    external: true,
  },
  {
    label: 'LinkedIn',
    unavailableReason:
      'Official LinkedIn URL has not been added to the website yet. Follow us on Instagram or contact us directly.',
  },
  {
    label: 'Twitter / X',
    unavailableReason:
      'Official Twitter / X URL has not been added to the website yet. Follow us on Instagram or contact us directly.',
  },
  {
    label: 'WhatsApp',
    unavailableReason:
      'WhatsApp community access is shared after completing free member registration.',
  },
  {
    label: 'TikTok',
    unavailableReason:
      'Official TikTok URL has not been added to the website yet. Follow us on Instagram for community highlights.',
  },
];
