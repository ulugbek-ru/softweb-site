export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  tags: string[];
  features: string[];
  gradient: string;
  accentColor: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Development",
    shortDesc: "Modern, ultra-fast and scalable websites and dynamic web applications built with Next.js & React.",
    detailedDesc:
      "We build lightning-fast, reactive web applications with clean architecture, zero-bloat code, and production reliability for ambitious brands.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "App Router"],
    features: [
      "Server-Side Rendering & ISR",
      "Sub-second load times & 99+ Lighthouse",
      "Modular design system architecture",
      "Robust state management & clean APIs",
    ],
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    accentColor: "#38bdf8",
  },
  {
    id: "ui-ux",
    number: "02",
    title: "UI/UX Design",
    shortDesc: "Bespoke, intuitive, and conversion-focused digital experiences crafted in Figma.",
    detailedDesc:
      "Interface design that bridges aesthetics with commercial psychology. Every layout, typography scale, and micro-interaction is intentionally crafted.",
    tags: ["Figma", "Design Systems", "Prototyping", "UX Strategy"],
    features: [
      "Design tokens & atomic components",
      "High-fidelity interactive prototypes",
      "User journey mapping & usability audits",
      "Tailored micro-interactions & fluid animations",
    ],
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentColor: "#c084fc",
  },
  {
    id: "full-stack",
    number: "03",
    title: "Full-Stack Engineering",
    shortDesc: "Seamless frontend + secure backend, database architectures, and API integrations.",
    detailedDesc:
      "End-to-end full-stack capabilities. From database schema design with PostgreSQL / Supabase to secure RESTful/GraphQL APIs and server actions.",
    tags: ["Node.js", "PostgreSQL", "Supabase", "REST/GraphQL"],
    features: [
      "Secure authentication & RBAC roles",
      "High-throughput relational databases",
      "Webhooks, payment gateways & third-party APIs",
      "Automated CI/CD deployment pipelines",
    ],
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accentColor: "#60a5fa",
  },
  {
    id: "ecommerce",
    number: "04",
    title: "E-Commerce Solutions",
    shortDesc: "High-converting online storefronts and frictionless commerce ecosystems.",
    detailedDesc:
      "Modern headless commerce systems with instant checkout flows, localized payment systems (Click, Payme, Stripe), and inventory sync.",
    tags: ["Custom Storefront", "Payment Gateways", "Cart Architecture", "Admin Panel"],
    features: [
      "High-converting 2-click checkout UX",
      "Direct Click, Payme, Stripe integrations",
      "Live order analytics & stock tracking",
      "Automated customer Telegram notifications",
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#34d399",
  },
  {
    id: "business-sites",
    number: "05",
    title: "Business Websites",
    shortDesc: "Authoritative corporate platforms designed to win high-ticket clients and trust.",
    detailedDesc:
      "Premium digital headquarters for enterprises, tech ventures, and modern businesses who require an unmistakable market presence.",
    tags: ["Corporate Identity", "SEO Dominance", "Multilingual", "Speed"],
    features: [
      "Bespoke visual identity & branding",
      "Complete internationalization (UZ / RU / EN)",
      "Technical SEO & OpenGraph optimization",
      "Integrated CRM and direct inquiry routing",
    ],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "#fbbf24",
  },
  {
    id: "custom-products",
    number: "06",
    title: "Custom Digital Products",
    shortDesc: "Bespoke SaaS platforms, internal tools, and specialized business software.",
    detailedDesc:
      "Tailored platforms engineered from the ground up around your unique business operations, customer workflows, and automation requirements.",
    tags: ["SaaS Architecture", "Telegram Bots", "Dashboards", "Internal Tools"],
    features: [
      "Complex interactive dashboards & charts",
      "Automated Telegram bots & business assistants",
      "Custom workflow engines & CRM backends",
      "Scalable cloud infrastructure ready for growth",
    ],
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    accentColor: "#a855f7",
  },
];
