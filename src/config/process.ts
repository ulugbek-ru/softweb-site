export interface ProcessStep {
  number: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  badge: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    step: "PHASE 01",
    title: "Discover & Scope",
    subtitle: "Understanding your vision, business dynamics, and target audience.",
    description:
      "We dive deep into your market positioning, commercial objectives, and technical constraints. We define requirements, core user personas, and success metrics before writing a single line of code.",
    deliverables: [
      "Technical Requirement Spec",
      "Information Architecture Map",
      "Competitive UX Breakdown",
      "Project Roadmap & Milestones",
    ],
    duration: "2–4 Days",
    badge: "Discovery",
  },
  {
    number: "02",
    step: "PHASE 02",
    title: "Strategy & Architecture",
    subtitle: "Engineering the technical blueprint and interaction framework.",
    description:
      "We architect the database schema, component structure, security model, and API contracts. Every performance bottleneck is prevented before design execution starts.",
    deliverables: [
      "System Architecture Diagram",
      "Low-Fidelity Wireframes",
      "Database & Schema Models",
      "Tech Stack & Integration Matrix",
    ],
    duration: "3–6 Days",
    badge: "Engineering",
  },
  {
    number: "03",
    step: "PHASE 03",
    title: "High-End UI/UX Design",
    subtitle: "Crafting a bespoke visual identity and high-fidelity prototype.",
    description:
      "We produce tailor-made Figma layouts, custom typography rules, fluid motion guidelines, and interactive clickable prototypes that match the SoftWeb premium standard.",
    deliverables: [
      "Figma Design System Tokens",
      "Interactive High-Fidelity Prototype",
      "Custom Graphic & Motion Assets",
      "Mobile & Tablet Responsive Layouts",
    ],
    duration: "5–10 Days",
    badge: "Design",
  },
  {
    number: "04",
    step: "PHASE 04",
    title: "Full-Stack Development",
    subtitle: "Turning designs into reactive, lightning-fast production code.",
    description:
      "We develop with Next.js App Router, TypeScript, and Tailwind CSS. We implement Framer Motion transitions, integrate backend logic, databases, Telegram bots, and payment gateways with pixel perfection.",
    deliverables: [
      "Clean TypeScript & Next.js Codebase",
      "Fluid Animations & Transitions",
      "APIs, Auth & Database Integration",
      "SEO, Core Web Vitals & Security Hardening",
    ],
    duration: "1–3 Weeks",
    badge: "Execution",
  },
  {
    number: "05",
    step: "PHASE 05",
    title: "Testing, Launch & Growth",
    subtitle: "Rigorous QA testing, production deployment, and continuous handover.",
    description:
      "Cross-browser testing, mobile validation, Lighthouse 95+ tuning, and smooth deployment to high-availability servers. We configure domain DNS, SSL, analytics, and provide full client onboarding.",
    deliverables: [
      "Production Vercel/Cloud Deployment",
      "Lighthouse 95+ Performance Audit",
      "Admin & Content Training Guide",
      "Post-Launch Technical Support",
    ],
    duration: "2–4 Days",
    badge: "Deployment",
  },
];
