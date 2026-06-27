import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  // Light sections
  cream:       "#F9F5EF",
  cardBg:      "#EDE7DC",
  // Dark sections
  dark:        "#0F0D0B",
  darkCard:    "#1C1814",
  // Accents
  terracotta:  "#C2622D",
  terraDark:   "#A8521F",
  sage:        "#6B7C5E",
  // Text
  charcoal:    "#1C1917",
  muted:       "#8B7D74",
  // Borders
  border:      "rgba(28,25,23,0.10)",
  borderMid:   "rgba(28,25,23,0.16)",
  darkBorder:  "rgba(249,245,239,0.09)",
};

// Fixed z-index scale (Emil — no ad-hoc values)
const Z = {
  base:    1,
  overlay: 10,
  content: 20,
  sticky:  40,
  nav:     50,
};

// Emil Kowalski easing blueprint
const E = {
  outCubic:    "cubic-bezier(0.215,0.61,0.355,1)",
  outQuart:    "cubic-bezier(0.165,0.84,0.44,1)",
  outQuint:    "cubic-bezier(0.23,1,0.32,1)",
  inOutCubic:  "cubic-bezier(0.645,0.045,0.355,1)",
  ease:        "ease",
};

// Typography: Onest for all UI, Fraunces for editorial accent/display
const FONT = {
  ui:      "'Onest', system-ui, sans-serif",
  display: "'Fraunces', Georgia, serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// FORM CONFIG
// Create a free form at https://formspree.io → paste the id (e.g. "xpzgkqab").
// If left empty, the booking form gracefully falls back to opening WhatsApp
// with a pre-filled message — so registration works either way.
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = "";
const WHATSAPP_NUMBER = "919725560379"; // +91 97255 60379

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────
const IMG = {
  groupStretch: "/images/1.png",          // group side-stretch on terrace
  instructor:   "/images/2.png",          // instructor solo on grass (red mat)
  lakeYoga:     "/images/3.png",          // two people yoga, Phewa Lake behind
  groupClass:   "/images/4.png",          // 1 instructor + 3 students seated
  pool:         "/images/5.png",          // resort pool, mountains
  garden:       "/images/6.jpeg",         // lush stone-path garden
  castle:       "/images/7.jpeg",         // castle building in greenery
  lake:         "/images/8.png",          // Phewa Lake panorama
  yogaFocus1:   "/images/Yoga Focus-1.png",
  yogaFocus2:   "/images/Yoga Focus-2.png",
  yogaFocus3:   "/images/Yoga Focus-3.png",
};

// Foundational asanas — ink-line illustrations (B1 style).
// Drop matching files into /public/images/poses/ (png or jpg). Until a file
// exists, the card shows a graceful name-placeholder — no broken images.
const POSES = [
  { slug: "downward-dog",    sanskrit: "Adho Mukha Svanasana",   english: "Downward Dog",        benefit: "Lengthens the spine, calms the mind." },
  { slug: "tree",            sanskrit: "Vrikshasana",            english: "Tree Pose",           benefit: "Balance, focus, and rootedness." },
  { slug: "side-angle",      sanskrit: "Utthita Parsvakonasana", english: "Extended Side Angle", benefit: "Opens the body, builds strength." },
  { slug: "lotus",           sanskrit: "Padmasana",              english: "Lotus Pose",          benefit: "The steady seat of meditation." },
  { slug: "mountain",        sanskrit: "Tadasana",               english: "Mountain Pose",       benefit: "Where every standing pose begins." },
  { slug: "forward-fold",    sanskrit: "Paschimottanasana",      english: "Seated Forward Fold", benefit: "Release through the whole back body." },
];
const POSE_PATH = "/images/poses/"; // e.g. /images/poses/downward-dog.png

// Hero slideshow order — best visual progression
const SLIDES = [
  { src: IMG.lake,          alt: "Phewa Lake panorama, Pokhara" },
  { src: IMG.lakeYoga,      alt: "Yoga overlooking Phewa Lake" },
  { src: IMG.groupClass,    alt: "Morning group class at The Castle Resort" },
  { src: IMG.castle,        alt: "The Castle Resort, Lakeside Pokhara" },
  { src: IMG.pool,          alt: "Castle Resort pool with Himalayan backdrop" },
  { src: IMG.groupStretch,  alt: "Side-stretch group session" },
  { src: IMG.garden,        alt: "Castle Resort gardens" },
  { src: IMG.instructor,    alt: "Padma Yoga Shala lead instructor" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT — edit all copy here without touching layout code
// ─────────────────────────────────────────────────────────────────────────────
const CONTENT = {
  nav: {
    logo: "Padma Yoga Shala",
    links: [
      { label: "Courses",    href: "#courses" },
      { label: "Philosophy", href: "#philosophy" },
      { label: "Teacher",    href: "#instructor" },
      { label: "Location",   href: "#location" },
    ],
    cta: { label: "Register", href: "#register" },
  },

  hero: {
    sutra: "योगश्चित्तवृत्तिनिरोधः",
    sutraTranslit: "Yogaś-citta-vṛtti-nirodhaḥ",
    sutraRef: "Patanjali Yoga Sutra 1.2",
    eyebrow: "Pokhara, Nepal · The Castle Resort",
    headline1: "Yoga is not\nan acrobat’s art.",
    headline2: "It is the art of\nstilling the mind.",
    sub: "One living tradition — taught the way it was meant to be, through the lens of the Upanishads.",
    highlights: [
      { v: "40+",       l: "Years teaching" },
      { v: "35,000+",   l: "Students taught" },
      { v: "15–18 Hrs", l: "Deep theory" },
    ],
    primaryCta:   { label: "Register for a Course", href: "#register" },
    secondaryCta: { label: "Compare Courses",       href: "#compare" },
    glassCard: {
      stat: "35,000+",
      label: "students taught",
      sub: "by one teacher, across four decades",
    },
  },

  // Quick-compare strip directly under the hero
  compare: {
    eyebrow: "Three Courses · Clear Hours",
    heading: "Find your course in ten seconds",
    sub: "Every course pairs hands-on practice with deep Upanishadic theory. Pick by where you are today.",
    rows: [
      {
        id: "foundations",
        name: "Foundations of Yoga",
        hours: "8",
        unit: "hours",
        forWhom: "Open to all",
        price: "$96",
        href: "#courses",
      },
      {
        id: "senior",
        name: "Teaching Seniors",
        hours: "20",
        unit: "hours",
        forWhom: "Certified teachers",
        price: "$280",
        href: "#courses",
      },
      {
        id: "yttc",
        name: "Advanced YTTC",
        hours: "40",
        unit: "hrs · 15 days",
        forWhom: "Yoga teachers",
        price: "$480",
        href: "#courses",
      },
    ],
  },

  testimonials: [
    {
      quote: "“My sister and I tried five yoga places in Pokhara, including the famous names. Don’t trust the online reviews — many felt fake. Then we found Jayesh.”",
      author: "Visiting Yoga Teacher",
    },
    {
      quote: "“We had tried Varanasi, Rishikesh, Indonesia, and more. Till date I haven’t found anyone of his class. You feel it from the very first session.”",
      author: "Visiting Yoga Teacher",
    },
    {
      quote: "“A course that finally explained the why behind every pose — not just the how. I came for the asanas and left with the philosophy that built them.”",
      author: "Past Student",
    },
    {
      quote: "“The setting at The Castle Resort, overlooking Phewa Lake, made every theory session feel like a retreat in itself.”",
      author: "Past Student",
    },
  ],

  philosophy: {
    eyebrow: "Why Most Training Falls Short",
    heading: "Yoga without philosophy\nis gymnastics with\nSanskrit names.",
    body: "Most teacher training treats philosophy as a footnote — and quietly copies its syllabus from somewhere else. Jayesh found the same gap again and again: the important, foundational asanas neglected, the exciting ones performed, and the philosophical spine missing entirely. Padma Yoga Shala was built to put that spine back. Alongside rigorous practice, every course carries deep theory drawn from the Upanishads, Patanjali, and Samkhya — so you understand not just how to hold a pose, but why it exists.",
    stats: [
      { value: "35,000+",   label: "Students taught worldwide" },
      { value: "40+ Yrs",   label: "Teaching experience" },
      { value: "15–18 Hrs", label: "Theory in the 40 Hr course" },
    ],
  },

  whyPadma: {
    eyebrow: "Why Padma",
    heading: "Four things we refuse\nto compromise on",
    items: [
      {
        title: "Foundational asanas, not trending ones",
        desc: "Out of thousands of asanas, we teach the most important — and most neglected. Not the exciting poses that look good and teach nothing.",
      },
      {
        title: "Philosophy as foundation, not footnote",
        desc: "15–18 hours of real theory in the advanced course. A weak philosophical base makes a weak teacher, however flexible the body.",
      },
      {
        title: "Logical reasoning, not blind repetition",
        desc: "Every theory and every pose is taught through its logic. You understand the why before you ever teach the how.",
      },
      {
        title: "Customised, not standardised",
        desc: "Sessions adjust to what you most want to explore. Real assignments during the course teach you to read students — not just lead poses.",
      },
    ],
  },

  courses: {
    eyebrow: "Our Courses",
    headingLeft: "Three courses.\nClear hours.\nClear outcomes.",
    headingRight: "From a first taste of yoga philosophy to advanced teacher training — each course states exactly how many hours you get, what they cover, and what you walk away able to do.",
    note: "All courses held at The Castle Resort Pvt. Ltd., Lakeside, Pokhara, Nepal. Session times can be adjusted on mutual understanding.",
    items: [
      {
        number:       "01",
        id:           "foundations",
        title:        "Foundations of Yoga",
        tags:         ["History", "Philosophy", "Ayurveda"],
        level:        "Open to All",
        levelSub:     "Trial Course",
        hours:        "8",
        hoursUnit:    "Hours",
        hoursSub:     "Flexible · choose your topics",
        price:        "$96",
        priceSub:     "per person",
        desc:         "Your first real conversation with the tradition — an introduction to yoga, Ayurveda, and the philosophy that shaped it. Choose the topics that interest you most from eleven theory areas.",
        outcome:      "Walk away understanding what yoga actually is — and where to begin.",
        highlights:   ["11 theory topics", "Choose your focus", "No experience needed"],
        schedule:     "Flexible timings · open to all",
        image:        IMG.groupClass,
        split:        null,
        pricingTable: null,
      },
      {
        number:       "02",
        id:           "senior",
        title:        "Teaching Yoga to Senior Citizens",
        tags:         ["Specialisation", "Methodology", "Adaptation"],
        level:        "Certified Yoga Teachers",
        levelSub:     "Specialisation",
        hours:        "20",
        hoursUnit:    "Hours",
        hoursSub:     "Mon–Fri · 2 hrs per session",
        price:        "$280",
        priceSub:     "per person",
        desc:         "A focused course for working teachers who want to teach older bodies safely — adapting asanas, re-sequencing for limited mobility, and reading what a senior student actually needs.",
        outcome:      "Walk away able to teach older students safely and with confidence.",
        highlights:   ["Safe sequencing", "Adapt for mobility", "Teachers only"],
        schedule:     "Mon–Fri · 6:00–8:00 AM or 4:00–6:00 PM",
        image:        IMG.groupStretch,
        split:        null,
        pricingTable: null,
      },
      {
        number:       "03",
        id:           "yttc",
        title:        "Advanced Yoga Teachers Training",
        tags:         ["Patanjali Yoga Sutra", "Samkhya", "Pranayama"],
        level:        "Yoga Teachers Only",
        levelSub:     "Advanced YTTC",
        hours:        "40",
        hoursUnit:    "Hrs · 15 Days",
        hoursSub:     "Theory + practice, with assignments",
        price:        "$480",
        priceSub:     "+ $350 stay · $830 all-in",
        desc:         "Our most complete programme. Fifteen days of deep theory paired with structured asana series, meditation sequences, and stress-relief practice — plus real teaching assignments. The split below is a starting point; it adjusts to where you want to go deeper.",
        outcome:      "Walk away a stronger teacher — with the philosophy, method, and practice to back it.",
        highlights:   ["Assignments included", "15 days · stay + meals", "Patanjali Yoga Sutra"],
        schedule:     "Mon–Fri · 8:30–10:30 AM or 6:30–8:30 PM",
        image:        IMG.lakeYoga,
        split:        { theory: "15–18", practice: "22–25", theoryLabel: "Theory", practiceLabel: "Practice" },
        pricingTable: [
          { label: "Course Fee",                              value: "$480"      },
          { label: "Accommodation + Food (15 days @ Castle)", value: "$350"      },
          { label: "Total, all-inclusive",                    value: "$830 USD", isTotal: true },
        ],
      },
    ],
  },

  theory: {
    eyebrow: "What You’ll Study",
    heading: "Theory that changes how\nyou practice and teach",
    sub: "Choose the topics that matter to you — especially in the 8 Hour course. Each one is a question worth a lifetime.",
    items: [
      { icon: "📜", title: "History & Philosophy",  desc: "Where did yoga come from, and what did it actually set out to do? Trace it through Indian civilisation and thought." },
      { icon: "🧘", title: "Yama-Niyama",           desc: "Ten ethical commitments the ancients considered more foundational than any asana. Why were they stressed so heavily?" },
      { icon: "🌌", title: "Samkhya",               desc: "What is the self, and what is not? Sankhyadarshan reframes the goal of yoga — and asks what it has to say about God." },
      { icon: "🌬️", title: "Pranayama",            desc: "What is prana, and why does breath sit at the centre of practice and daily life? The bridge between body and mind." },
      { icon: "🎵", title: "Mantra",                desc: "What aid do mantras really offer on the path of yoga? Sound, vibration, and their quiet work on the mind." },
      { icon: "☀️", title: "Sun Salutation",        desc: "The history and root theory behind yoga’s most iconic sequence — and why it is built the way it is." },
      { icon: "📖", title: "Patanjali Yoga Sutra",  desc: "An initial understanding of the foundational text behind classical yoga, in plain language." },
      { icon: "🌿", title: "Ayurveda",              desc: "India’s ancient science of balance — and the root causes it sees where modern medicine often sees only symptoms." },
    ],
  },

  practical: {
    eyebrow: "Practice & Application",
    heading: "From first asana to\nteaching your own series",
    items: [
      { title: "Where to Begin",          desc: "Which asanas to learn and teach first, and why — a principled foundation for any student who walks in." },
      { title: "Anatomy of Each Asana",   desc: "The body mechanics behind every pose, so you teach safely and explain with confidence." },
      { title: "Sukshma Kriyas",          desc: "Subtle warm-up variations that prepare body and mind before deeper practice." },
      { title: "Structured Asana Series", desc: "Fixed beginner series for physical health & flexibility, meditation & mental stress, disease management, and core strength." },
      { title: "Teaching Assignments",    desc: "Real assignments during the course: identify what a student needs, assess their level, and learn what to ask before you teach a single pose. This is what turns a practitioner into a teacher." },
    ],
    note: "Sessions can be adjusted to match what students are most interested in exploring.",
  },

  asana: {
    eyebrow: "The Asanas We Teach",
    heading: "The most important poses —\nnot the most impressive ones",
    sub: "Out of thousands of asanas, we focus on the foundational few that most trainings neglect. Learn them deeply, teach them safely.",
  },

  instructor: {
    eyebrow: "Your Teacher",
    heading: "Forty years.\nThirty-five thousand students.\nOne tradition.",
    body: "Jayesh Mistry learned in lineage, not in a weekend. He trained under Yoga Kendra, Vadodara — the oldest yoga institute in Gujarat, founded in 1963 by Yogacharya Dushant Modi, Yoga Coordinator at the M.S. University of Vadodara. In 2016 the Kendra officially appointed him its Chief International Instructor, to carry its yoga seminars and teacher-training courses beyond India. Across four decades he has taught more than thirty-five thousand students — and still teaches the way he always has: one person at a time, until the why is truly understood.",
    badge: {
      name: "Jayesh Mistry",
      role: "Chief International Instructor, Yoga Kendra · Vadodara",
    },
    affiliation: "Affiliated with Yoga Kendra, Vadodara — est. 1963 · Reg. No. E-1642, Govt. of Gujarat.",
  },

  location: {
    eyebrow: "Where You’ll Stay & Study",
    heading: "The Castle Resort,\nLakeside Pokhara",
    body: "Set on a hillside overlooking Phewa Lake — with gardens, a pool, and a calm, homely atmosphere that makes theory feel like retreat. The 40 Hour course includes fifteen days of stay, breakfast, lunch, and dinner.",
  },

  ctaBanner: {
    sutra: "योगश्चित्तवृत्तिनिरोधः",
    heading: "You came looking\nfor ease.",
    sub: "Yoga, said Patanjali, is the stilling of the movements of the mind. That is exactly where every class at Padma begins — and ends.",
    cta: { label: "Register for a Course", href: "#register" },
  },

  register: {
    eyebrow: "Register",
    heading: "Reserve your place",
    sub: "Tell us which course fits you and we’ll confirm dates and details. Prefer to chat first? Message us on WhatsApp — we reply fast.",
    courses: [
      "Foundations of Yoga — 8 Hrs · $96",
      "Teaching Yoga to Senior Citizens — 20 Hrs · $280",
      "Advanced YTTC — 40 Hrs · $480 (+$350 stay)",
      "Not sure yet — help me choose",
    ],
    whatsappPrompts: [
      { label: "8 Hr Foundations",  msg: "Hi Padma Yoga Shala, I’m interested in the 8 Hr Foundations of Yoga course." },
      { label: "20 Hr Seniors",     msg: "Hi Padma Yoga Shala, I’m interested in the 20 Hr Teaching Yoga to Senior Citizens course." },
      { label: "40 Hr Advanced YTTC", msg: "Hi Padma Yoga Shala, I’m interested in the 40 Hr Advanced YTTC." },
    ],
  },

  footer: {
    logo:    "Padma Yoga Shala",
    tagline: "Yoga as the art of stilling the mind",
    links:   ["Courses", "Philosophy", "Teacher", "Register"],
    affiliation: "Affiliated with Yoga Kendra, Vadodara — the oldest yoga institute in Gujarat, est. 1963, founded by Yogacharya Dushant Modi. Reg. No. E-1642, Government of Gujarat.",
    contact: {
      email:    "hello@padmayogashala.com",
      whatsapp: "+91 97255 60379",
      address:  "The Castle Resort Pvt. Ltd., Lakeside, Pokhara-6, Nepal",
    },
    year: new Date().getFullYear(),
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LOTUS MARK — inline SVG so it stays crisp at any size (no asset dependency)
// ─────────────────────────────────────────────────────────────────────────────
function LotusMark({ size = 26 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 48 48" fill="none"
      role="img" aria-label="Padma Yoga Shala lotus mark"
      style={{ userSelect: "none", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="lotusGrad" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9763B" />
          <stop offset="1" stopColor="#A8521F" />
        </linearGradient>
      </defs>
      {/* centre petal */}
      <path d="M24 5c3.2 4.2 4.6 8.6 4.6 12.8 0 4.4-2 8.1-4.6 10.7-2.6-2.6-4.6-6.3-4.6-10.7C19.4 13.6 20.8 9.2 24 5Z" fill="url(#lotusGrad)" />
      {/* side petals */}
      <path d="M13 13c4.6 1.6 7.8 4.6 9.6 7.9 1.7 3.1 1.9 6.6 1 9.6-3-1-6.3-3.2-8.1-6.4C13.7 20.8 12.9 16.7 13 13Z" fill="url(#lotusGrad)" opacity="0.92" />
      <path d="M35 13c-4.6 1.6-7.8 4.6-9.6 7.9-1.7 3.1-1.9 6.6-1 9.6 3-1 6.3-3.2 8.1-6.4C34.3 20.8 35.1 16.7 35 13Z" fill="url(#lotusGrad)" opacity="0.92" />
      {/* base cradle */}
      <path d="M10 27c4 4 9 6 14 6s10-2 14-6c-1.4 5.4-7 9.4-14 9.4S11.4 32.4 10 27Z" fill="url(#lotusGrad)" opacity="0.85" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("padma-styles")) return;
    const el = document.createElement("style");
    el.id = "padma-styles";
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { -webkit-font-smoothing: antialiased; background: ${C.dark}; }
      h1, h2, h3, h4 { text-wrap: balance; }
      [data-anchor] { scroll-margin-top: 80px; }

      :root { --hairline: 1px; }
      @media (min-resolution: 192dpi) { :root { --hairline: 0.5px; } }

      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .padma-marquee { animation: marquee 60s linear infinite; will-change: transform; }

      @media (hover: hover) and (pointer: fine) {
        .padma-marquee:hover    { animation-play-state: paused; }
        .padma-nav-link:hover   { color: ${C.terracotta} !important; }
        .padma-btn:hover        { background: ${C.terraDark} !important; }
        .padma-compare-row:hover { background: ${C.cardBg} !important; }
        .padma-course-row:hover .padma-course-num { color: ${C.terracotta} !important; }
        .padma-course-row:hover .padma-course-img { transform: scale(1.04); }
        .padma-theory-card:hover {
          background: rgba(249,245,239,0.10) !important;
          box-shadow: 0 0 0 1px rgba(249,245,239,0.18) !important;
        }
        .padma-practical-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(28,25,23,0.10), 0 0 0 1px ${C.border} !important;
        }
        .padma-why-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(28,25,23,0.10), 0 0 0 1px ${C.borderMid} !important;
        }
        .padma-footer-link:hover { color: rgba(249,245,239,0.9) !important; }
        .padma-wa-chip:hover { background: ${C.terracotta} !important; color: #F9F5EF !important; }
      }

      /* Course row: flex-col on mobile, 3-col grid on md+ */
      @media (min-width: 768px) {
        .padma-course-grid {
          display: grid !important;
          grid-template-columns: 5.5rem 1fr 11rem;
          align-items: start;
          gap: 2.5rem;
        }
      }

      button, a { touch-action: manipulation; }

      input, select, textarea { font-size: 16px; } /* prevent iOS zoom */
      .padma-field:focus {
        outline: none;
        box-shadow: 0 0 0 1px ${C.terracotta}, 0 0 0 4px ${C.terracotta}22 !important;
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(el);
    return () => { document.getElementById("padma-styles")?.remove(); };
  }, []);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVES
// Reveal is intentionally static — Emil's marketing rule: no scroll fade-ups.
// Kept as a passthrough so section markup stays clean and easy to revert.
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function GlassCard({ children, className = "", dark = true }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background:          dark ? "rgba(15,13,11,0.55)"       : "rgba(249,245,239,0.12)",
        backdropFilter:      "blur(24px)",
        WebkitBackdropFilter:"blur(24px)",
        boxShadow:           dark ? "0 0 0 1px rgba(249,245,239,0.13)" : "0 0 0 1px rgba(249,245,239,0.25)",
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
       style={{ color: light ? "rgba(249,245,239,0.50)" : C.terracotta, fontFamily: FONT.ui }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, light = false, className = "" }) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-semibold leading-tight whitespace-pre-line ${className}`}
      style={{ fontFamily: FONT.display, color: light ? "#F9F5EF" : C.charcoal }}
    >
      {children}
    </h2>
  );
}

function Btn({ label, href, large = false, outline = false, onClick, type, fullWidth = false }) {
  const base = `padma-btn inline-flex items-center justify-center rounded-full font-medium ${fullWidth ? "w-full" : ""} ${
    large ? "px-9 py-4 text-base min-h-[52px]" : "px-6 py-3 text-sm min-h-[44px]"
  }`;
  const colors = outline
    ? { color: "rgba(249,245,239,0.88)", boxShadow: "0 0 0 1px rgba(249,245,239,0.30)", background: "transparent" }
    : { background: C.terracotta, color: "#F9F5EF" };

  const sharedStyle = {
    textDecoration: "none",
    transition: `background 180ms ${E.ease}, transform 100ms ${E.ease}`,
    ...colors,
  };
  const press = {
    onMouseDown: e => { e.currentTarget.style.transform = "scale(0.97)"; },
    onMouseUp:   e => { e.currentTarget.style.transform = "scale(1)"; },
    onMouseLeave:e => { e.currentTarget.style.transform = "scale(1)"; },
  };

  if (type) {
    return (
      <button type={type} onClick={onClick} className={base} style={{ border: "none", cursor: "pointer", ...sharedStyle }} {...press}>
        {label}
      </button>
    );
  }
  return (
    <a href={href} onClick={onClick} className={base} style={sharedStyle} {...press}>
      {label}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STICKY NAV
// ─────────────────────────────────────────────────────────────────────────────
function StickyNav() {
  const scrolled = useNavScroll();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0"
         style={{
           zIndex:              Z.nav,
           background:          scrolled ? "rgba(15,13,11,0.88)" : "transparent",
           borderBottom:        `var(--hairline) solid ${scrolled ? C.darkBorder : "transparent"}`,
           backdropFilter:      scrolled ? "blur(20px)" : "none",
           WebkitBackdropFilter:scrolled ? "blur(20px)" : "none",
           transition:          `background 300ms ${E.ease}, border-color 280ms ${E.ease}`,
         }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">

        <a href="#" className="flex items-center gap-2.5"
           style={{ fontFamily: FONT.display, color: "#F9F5EF", fontSize: "1.1rem", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
          <LotusMark size={26} />
          {CONTENT.nav.logo}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {CONTENT.nav.links.map(l => (
            <a key={l.label} href={l.href}
               className="padma-nav-link text-sm font-medium"
               style={{ color: "rgba(249,245,239,0.68)", textDecoration: "none", fontFamily: FONT.ui, transition: `color 160ms ${E.ease}` }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Btn label={CONTENT.nav.cta.label} href={CONTENT.nav.cta.href} />
          </div>
          <button
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block w-5 h-3.5">
              {[0, 1, 2].map(i => (
                <span key={i} className="absolute left-0 w-full h-0.5 rounded-full"
                      style={{
                        background: "#F9F5EF",
                        top:        i === 0 ? 0 : i === 2 ? "100%" : "50%",
                        transform:  open ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "translateY(-50%)") : i === 1 ? "translateY(-50%)" : "none",
                        opacity:    open && i === 1 ? 0 : 1,
                        transition: `transform 240ms ${E.inOutCubic}, opacity 180ms ${E.ease}`,
                      }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div className="md:hidden overflow-hidden"
           style={{ maxHeight: open ? "360px" : "0", background: "rgba(15,13,11,0.95)", backdropFilter: "blur(20px)", transition: `max-height 340ms ${E.outCubic}` }}>
        <div className="px-6 pt-2 pb-8 flex flex-col">
          {CONTENT.nav.links.map(l => (
            <a key={l.label} href={l.href}
               className="py-3.5 text-base font-medium border-b"
               style={{ color: "rgba(249,245,239,0.80)", borderColor: C.darkBorder, textDecoration: "none", fontFamily: FONT.ui }}
               onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mt-4">
            <Btn label={CONTENT.nav.cta.label} href={CONTENT.nav.cta.href} large fullWidth />
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — auto-advancing slideshow (pauses on reduced-motion + tab blur),
// left-aligned content, glass stat card, slide dot indicators.
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [idx, setIdx] = useState(0);
  const { hero: H } = CONTENT;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5000);
    const onVis = () => {
      clearInterval(id);
      if (!document.hidden) id = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5000);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden"
             style={{ minHeight: "100svh", isolation: "isolate" }}>

      {/* Slideshow images — opacity-only crossfade, GPU-safe */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage:    `url(${slide.src})`,
            backgroundSize:     "cover",
            backgroundPosition: "center",
            opacity:            i === idx ? 1 : 0,
            transition:         `opacity 1400ms ${E.ease}`,
            zIndex:             i === idx ? Z.base : 0,
          }}
          role="img"
          aria-label={slide.alt}
        />
      ))}

      {/* Layered overlay for text legibility:
          1) vertical scrim (dark bottom → mid)  2) left scrim under the copy column */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ zIndex: Z.overlay, background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.48) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ zIndex: Z.overlay, background: "linear-gradient(to right, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.30) 48%, rgba(0,0,0,0) 72%)" }} />

      {/* Content layer */}
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-20 pt-28" style={{ zIndex: Z.content }}>
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">

          {/* Left: sutra + headline + CTAs */}
          <div className="max-w-3xl">
            {/* Highlighted Sanskrit sutra — terracotta pill with accent bar */}
            <div className="inline-flex items-center gap-3 mb-7 pl-3 pr-4 py-2 rounded-full"
                 style={{ background: "rgba(194,98,45,0.18)", boxShadow: `0 0 0 1px ${C.terracotta}66`, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
              <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: C.terracotta }} />
              <span className="leading-tight">
                <span className="block text-lg md:text-xl"
                      style={{ fontFamily: FONT.display, color: "#F4C9A8", letterSpacing: "0.02em", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
                  {H.sutra}
                </span>
                <span className="block text-[10px] tracking-[0.16em] uppercase"
                      style={{ fontFamily: FONT.ui, color: "rgba(249,245,239,0.62)" }}>
                  {H.sutraTranslit} · {H.sutraRef}
                </span>
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold leading-[1.04] tracking-tight mb-8 whitespace-pre-line"
              style={{ fontFamily: FONT.display, color: "#F9F5EF", textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
            >
              {H.headline1}{"\n"}{H.headline2}
            </h1>

            {/* Highlight chips — the main facts, scannable at a glance */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {H.highlights.map(h => (
                <div key={h.l} className="inline-flex items-baseline gap-2 px-4 py-2.5 rounded-xl"
                     style={{ background: "rgba(249,245,239,0.10)", boxShadow: "0 0 0 1px rgba(249,245,239,0.18)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                  <span className="text-xl md:text-2xl font-semibold leading-none"
                        style={{ fontFamily: FONT.display, color: "#F4C9A8", fontVariantNumeric: "tabular-nums" }}>
                    {h.v}
                  </span>
                  <span className="text-xs md:text-sm font-medium" style={{ color: "rgba(249,245,239,0.88)", fontFamily: FONT.ui }}>
                    {h.l}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
               style={{ color: "rgba(249,245,239,0.80)", fontFamily: FONT.ui, textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>
              {H.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Btn label={H.primaryCta.label} href={H.primaryCta.href} large />
              <Btn label={H.secondaryCta.label} href={H.secondaryCta.href} large outline />
            </div>
          </div>

          {/* Right: glass stat card (desktop only) */}
          <div className="hidden md:block">
            <GlassCard className="p-7 min-w-[220px]">
              <p className="text-xs font-medium tracking-[0.14em] uppercase mb-4"
                 style={{ color: "rgba(249,245,239,0.42)", fontFamily: FONT.ui }}>
                Taught by one master
              </p>
              <p className="text-5xl font-semibold leading-none mb-2"
                 style={{ fontFamily: FONT.display, color: C.terracotta, fontVariantNumeric: "tabular-nums" }}>
                {H.glassCard.stat}
              </p>
              <p className="text-base font-medium mb-1"
                 style={{ color: "#F9F5EF", fontFamily: FONT.ui }}>
                {H.glassCard.label}
              </p>
              <p className="text-sm"
                 style={{ color: "rgba(249,245,239,0.48)", fontFamily: FONT.ui }}>
                {H.glassCard.sub}
              </p>
              <div className="mt-6 pt-5" style={{ borderTop: "var(--hairline) solid rgba(249,245,239,0.10)" }}>
                <a href="#courses" className="text-sm font-medium"
                   style={{ color: C.terracotta, textDecoration: "none", fontFamily: FONT.ui }}>
                  View all courses →
                </a>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
              className="min-w-[44px] min-h-[44px] -ml-3 pl-3 flex items-center"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <span
                className="block h-0.5 rounded-full"
                style={{
                  width:      i === idx ? 28 : 8,
                  background: i === idx ? "#F9F5EF" : "rgba(249,245,239,0.35)",
                  transition: `width 300ms ${E.outCubic}, background 300ms ${E.ease}`,
                }}
              />
            </button>
          ))}
          <span className="text-xs ml-2" style={{ color: "rgba(249,245,239,0.35)", fontFamily: FONT.ui, fontVariantNumeric: "tabular-nums" }}>
            {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE COMPARE — fast, scannable strip right under the hero
// ─────────────────────────────────────────────────────────────────────────────
function CompareSection() {
  const { compare: CM } = CONTENT;

  return (
    <section id="compare" data-anchor className="py-20 md:py-28" style={{ background: C.cardBg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <Eyebrow>{CM.eyebrow}</Eyebrow>
          <SectionHeading className="mb-4">{CM.heading}</SectionHeading>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>{CM.sub}</p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: C.cream, boxShadow: `0 0 0 1px ${C.border}` }}>
          {CM.rows.map((r, i) => (
            <a
              key={r.id}
              href={r.href}
              className="padma-compare-row grid grid-cols-[auto_1fr_auto] md:grid-cols-[7rem_1fr_1fr_auto] items-center gap-4 md:gap-6 px-5 md:px-8 py-5 md:py-6"
              style={{
                textDecoration: "none",
                borderTop: i > 0 ? `var(--hairline) solid ${C.border}` : "none",
                transition: `background 160ms ${E.ease}`,
              }}
            >
              {/* Hours — the headline number */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-semibold leading-none"
                      style={{ fontFamily: FONT.display, color: C.terracotta, fontVariantNumeric: "tabular-nums" }}>
                  {r.hours}
                </span>
                <span className="text-xs md:text-sm" style={{ color: C.muted, fontFamily: FONT.ui }}>{r.unit}</span>
              </div>

              {/* Name */}
              <div className="min-w-0">
                <p className="text-base md:text-lg font-semibold leading-tight truncate"
                   style={{ fontFamily: FONT.display, color: C.charcoal }}>
                  {r.name}
                </p>
                <p className="text-xs md:text-sm md:hidden" style={{ color: C.muted, fontFamily: FONT.ui }}>{r.forWhom}</p>
              </div>

              {/* For whom (desktop) */}
              <p className="hidden md:block text-sm" style={{ color: C.muted, fontFamily: FONT.ui }}>{r.forWhom}</p>

              {/* Price */}
              <div className="text-right">
                <p className="text-base md:text-lg font-semibold"
                   style={{ color: C.charcoal, fontFamily: FONT.ui, fontVariantNumeric: "tabular-nums" }}>
                  {r.price}
                </p>
                <span className="text-xs font-medium" style={{ color: C.terracotta, fontFamily: FONT.ui }}>Register →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIAL MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialMarquee() {
  const items = [...CONTENT.testimonials, ...CONTENT.testimonials, ...CONTENT.testimonials];

  return (
    <section className="py-10 overflow-hidden"
             style={{ background: C.cream, borderTop: `var(--hairline) solid ${C.border}`, borderBottom: `var(--hairline) solid ${C.border}` }}
             aria-label="Student testimonials">
      <p className="text-center text-[11px] mb-6 select-none pointer-events-none uppercase"
         style={{ color: C.muted, fontFamily: FONT.ui, letterSpacing: "0.16em" }}>
        In their words
      </p>
      <div className="relative">
        <div className="padma-marquee flex gap-4 w-max">
          {items.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 rounded-2xl p-6"
                 style={{ background: C.cardBg, boxShadow: `0 0 0 1px ${C.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                     style={{ background: `${C.sage}28`, boxShadow: `0 0 0 1px ${C.borderMid}` }}>
                  <LotusMark size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: C.charcoal, fontFamily: FONT.ui }}>{t.author}</p>
                  <p className="text-xs" style={{ color: C.muted, fontFamily: FONT.ui }}>Padma Yoga Shala</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed"
                 style={{ color: C.charcoal, fontFamily: FONT.display, fontStyle: "italic" }}>
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────────────────────────────────────
function WhyCard({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}
         className="rounded-2xl p-7 md:p-8 flex items-start gap-5"
         style={{
           background: "rgba(249,245,239,0.05)",
           boxShadow: "0 0 0 1px rgba(249,245,239,0.08)",
           opacity: visible ? 1 : 0,
           transform: visible ? "translateY(0)" : "translateY(28px)",
           transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
         }}>
      <span className="text-3xl font-semibold leading-none flex-shrink-0 mt-0.5"
            style={{ fontFamily: FONT.display, color: C.terracotta, fontVariantNumeric: "tabular-nums", opacity: 0.5 }}>
        0{index + 1}
      </span>
      <div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 leading-snug"
            style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed"
           style={{ color: "rgba(249,245,239,0.48)", fontFamily: FONT.ui }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function PhilosophySection() {
  const { philosophy: P, whyPadma: W } = CONTENT;
  const bodyRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const SplitText = window.SplitText;
    if (!gsap || !ScrollTrigger || !SplitText) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const el = bodyRef.current;
    if (!el) return;
    const split = new SplitText(el, {
      type: "words,chars",
      autoSplit: true,
      onSplit(self) {
        const tl = gsap.timeline({
          scrollTrigger: {
            scrub: true,
            trigger: el,
            start: "top 88%",
            end: "bottom 55%",
          },
        });
        tl.from(self.chars, { autoAlpha: 0.12, stagger: 0.08, ease: "linear" });
        return tl;
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); split.revert?.(); };
  }, []);

  return (
    <section id="philosophy" data-anchor className="py-24 md:py-36 relative overflow-hidden"
             style={{ background: "#1A1200" }}>

      {/* LotusMark ghost watermark */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none"
           style={{ zIndex: Z.base }}>
        <svg width="480" height="480" viewBox="0 0 48 48" fill="none"
             aria-hidden="true" style={{ opacity: 0.05, userSelect: "none" }}>
          <defs>
            <linearGradient id="philoWmGrad" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D9763B" /><stop offset="1" stopColor="#A8521F" />
            </linearGradient>
          </defs>
          <path d="M24 5c3.2 4.2 4.6 8.6 4.6 12.8 0 4.4-2 8.1-4.6 10.7-2.6-2.6-4.6-6.3-4.6-10.7C19.4 13.6 20.8 9.2 24 5Z" fill="url(#philoWmGrad)" />
          <path d="M13 13c4.6 1.6 7.8 4.6 9.6 7.9 1.7 3.1 1.9 6.6 1 9.6-3-1-6.3-3.2-8.1-6.4C13.7 20.8 12.9 16.7 13 13Z" fill="url(#philoWmGrad)" opacity="0.92" />
          <path d="M35 13c-4.6 1.6-7.8 4.6-9.6 7.9-1.7 3.1-1.9 6.6-1 9.6 3-1 6.3-3.2 8.1-6.4C34.3 20.8 35.1 16.7 35 13Z" fill="url(#philoWmGrad)" opacity="0.92" />
          <path d="M10 27c4 4 9 6 14 6s10-2 14-6c-1.4 5.4-7 9.4-14 9.4S11.4 32.4 10 27Z" fill="url(#philoWmGrad)" opacity="0.85" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10" style={{ zIndex: Z.content }}>

        {/* Heading */}
        <div className="mb-14">
          <Eyebrow light>{P.eyebrow}</Eyebrow>
          <SectionHeading light className="whitespace-pre-line">{P.heading}</SectionHeading>
        </div>

        {/* Scroll-highlight body text */}
        <p ref={bodyRef}
           className="text-xl md:text-2xl leading-relaxed font-medium"
           style={{ color: "rgba(249,245,239,0.9)", fontFamily: FONT.display }}>
          {P.body}
        </p>

        {/* 3 stat cards */}
        <div className="grid grid-cols-3 gap-4 mt-16">
          {P.stats.map((s) => (
            <div key={s.value}
                 className="rounded-2xl p-6 md:p-8 flex flex-col gap-2"
                 style={{ background: "rgba(249,245,239,0.05)", boxShadow: "0 0 0 1px rgba(249,245,239,0.08)" }}>
              <p className="text-3xl md:text-4xl font-semibold leading-none"
                 style={{ fontFamily: FONT.display, color: C.terracotta, fontVariantNumeric: "tabular-nums" }}>
                {s.value}
              </p>
              <p className="text-xs leading-snug"
                 style={{ color: "rgba(249,245,239,0.5)", fontFamily: FONT.ui }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* 4 commitments — IntersectionObserver stagger cards */}
        <div className="mt-20 pt-12 grid sm:grid-cols-2 gap-4"
             style={{ borderTop: "var(--hairline) solid rgba(249,245,239,0.1)" }}>
          {W.items.map((item, i) => (
            <WhyCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// COURSES — list rows with explicit hours band + theory/practice split
// ─────────────────────────────────────────────────────────────────────────────
function CoursesSection() {
  const { courses: CO } = CONTENT;

  return (
    <section id="courses" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Split header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 pb-10"
             style={{ borderBottom: `var(--hairline) solid ${C.border}` }}>
          <div>
            <Eyebrow>{CO.eyebrow}</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight whitespace-pre-line"
                style={{ fontFamily: FONT.display, color: C.charcoal }}>
              {CO.headingLeft}
            </h2>
          </div>
          <div>
            <p className="text-base md:text-lg leading-relaxed mb-5"
               style={{ color: C.muted, fontFamily: FONT.ui }}>
              {CO.headingRight}
            </p>
            <a href="#register" className="text-sm font-medium"
               style={{ color: C.terracotta, textDecoration: "none", fontFamily: FONT.ui }}>
              Register for a course →
            </a>
          </div>
        </div>

        {/* Course rows */}
        {CO.items.map((course) => (
          <div
            key={course.number}
            className="padma-course-row padma-course-grid flex flex-col gap-4 py-8 md:py-10"
            style={{ borderBottom: `var(--hairline) solid ${C.border}` }}
          >
            {/* 1 — Number */}
            <span
              className="padma-course-num text-4xl md:text-6xl font-semibold leading-none select-none"
              style={{ fontFamily: FONT.display, color: "rgba(28,25,23,0.14)", transition: `color 200ms ${E.ease}`, fontVariantNumeric: "tabular-nums" }}
            >
              {course.number}
            </span>

            {/* 2 — Main info */}
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                {course.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: `${C.terracotta}14`, color: C.terracotta, fontFamily: FONT.ui }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 leading-tight"
                  style={{ fontFamily: FONT.display, color: C.charcoal }}>
                {course.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted, fontFamily: FONT.ui }}>
                {course.desc}
              </p>

              {/* Outcome — the highlighted promise */}
              {course.outcome && (
                <p className="text-sm font-semibold mb-4 inline-flex items-start gap-2 leading-snug"
                   style={{ color: C.terracotta, fontFamily: FONT.ui }}>
                  <span aria-hidden="true" className="mt-px">→</span>
                  {course.outcome}
                </p>
              )}

              {/* Highlight chips — scannable key facts */}
              {course.highlights && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {course.highlights.map(h => (
                    <span key={h} className="text-xs font-medium px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5"
                          style={{ background: C.cream, boxShadow: `0 0 0 1px ${C.border}`, color: C.charcoal, fontFamily: FONT.ui }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.sage }} />
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Theory / practice split bar (40hr only) */}
              {course.split && (
                <div className="mb-4 max-w-md">
                  <div className="flex h-2.5 rounded-full overflow-hidden" style={{ boxShadow: `0 0 0 1px ${C.border}` }}>
                    <div style={{ width: "42%", background: C.terracotta }} />
                    <div style={{ width: "58%", background: C.sage }} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs" style={{ color: C.muted, fontFamily: FONT.ui }}>
                    <span><strong style={{ color: C.terracotta }}>{course.split.theory} hrs</strong> {course.split.theoryLabel}</span>
                    <span><strong style={{ color: C.sage }}>{course.split.practice} hrs</strong> {course.split.practiceLabel}</span>
                  </div>
                </div>
              )}

              {course.schedule && (
                <p className="text-xs mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                   style={{ color: C.sage, fontFamily: FONT.ui, background: `${C.sage}14` }}>
                  🕗 {course.schedule}
                </p>
              )}

              {course.pricingTable && (
                <div className="rounded-xl overflow-hidden text-xs w-full max-w-md"
                     style={{ boxShadow: `0 0 0 1px ${C.border}`, fontFamily: FONT.ui }}>
                  {course.pricingTable.map((row, ri) => (
                    <div key={ri} className="flex justify-between px-3 py-2"
                         style={{
                           background: row.isTotal ? `${C.terracotta}0F` : ri % 2 ? `${C.border}40` : "transparent",
                           borderTop:  ri > 0 ? `var(--hairline) solid ${C.border}` : "none",
                           fontWeight: row.isTotal ? 600 : 400,
                           color:      row.isTotal ? C.terracotta : C.charcoal,
                         }}>
                      <span className="pr-2 leading-snug">{row.label}</span>
                      <span style={{ fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3 — Right: hours band + meta + image + button */}
            <div className="flex-shrink-0">
              {/* Hours band — the clear, scannable number */}
              <div className="rounded-xl p-4 mb-4 text-center md:text-right"
                   style={{ background: C.cardBg, boxShadow: `0 0 0 1px ${C.border}` }}>
                <p className="text-xs uppercase tracking-[0.12em] mb-1" style={{ color: C.muted, fontFamily: FONT.ui }}>Duration</p>
                <p className="text-3xl md:text-4xl font-semibold leading-none"
                   style={{ fontFamily: FONT.display, color: C.charcoal, fontVariantNumeric: "tabular-nums" }}>
                  {course.hours}<span className="text-base font-medium ml-1" style={{ color: C.muted }}>{course.hoursUnit}</span>
                </p>
                <p className="text-xs mt-1.5" style={{ color: C.muted, fontFamily: FONT.ui }}>{course.hoursSub}</p>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-4 md:flex md:flex-col md:items-end md:gap-4">
                <div className="md:text-right">
                  <p className="text-xs mb-0.5" style={{ color: C.muted, fontFamily: FONT.ui }}>Level</p>
                  <p className="text-sm font-medium" style={{ color: C.charcoal, fontFamily: FONT.ui }}>{course.level}</p>
                  <p className="text-xs mb-3" style={{ color: C.muted, fontFamily: FONT.ui }}>{course.levelSub}</p>
                  <p className="text-lg font-semibold" style={{ color: C.terracotta, fontFamily: FONT.ui, fontVariantNumeric: "tabular-nums" }}>{course.price}</p>
                  <p className="text-xs" style={{ color: C.muted, fontFamily: FONT.ui }}>{course.priceSub}</p>
                </div>
                <div className="w-28 h-24 md:w-full md:h-28 rounded-xl overflow-hidden self-start">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="padma-course-img w-full h-full object-cover"
                    style={{ transition: `transform 400ms ${E.outCubic}` }}
                  />
                </div>
              </div>
              <div className="mt-4 md:flex md:justify-end">
                <Btn label="Register" href="#register" fullWidth />
              </div>
            </div>
          </div>
        ))}

        <p className="mt-8 text-sm text-center" style={{ color: C.muted, fontFamily: FONT.ui }}>{CO.note}</p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THEORY — cards on dark background
// ─────────────────────────────────────────────────────────────────────────────
function TheorySection() {
  const { theory: T } = CONTENT;

  return (
    <section id="theory" data-anchor className="py-24 md:py-36" style={{ background: C.cardBg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow>{T.eyebrow}</Eyebrow>
          <SectionHeading className="whitespace-pre-line mb-5">{T.heading}</SectionHeading>
          <p className="text-base leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>{T.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {T.items.map((item) => (
            <div
              key={item.title}
              className="padma-theory-card rounded-2xl p-7 h-full"
              style={{
                background:  C.cream,
                boxShadow:   `0 0 0 1px ${C.border}`,
                transition:  `background 220ms ${E.ease}, box-shadow 220ms ${E.ease}`,
              }}
            >
              <span className="text-3xl block mb-5 select-none pointer-events-none" aria-hidden="true">{item.icon}</span>
              <h3 className="text-lg font-semibold mb-2 leading-tight"
                  style={{ fontFamily: FONT.display, color: C.charcoal }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed"
                 style={{ color: C.muted, fontFamily: FONT.ui }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRACTICAL
// ─────────────────────────────────────────────────────────────────────────────
function TimelineItem({ item, index, total }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLast = index === total - 1;

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-12"
         style={{
           opacity: visible ? 1 : 0,
           transform: visible ? "translateX(0)" : "translateX(-20px)",
           transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
         }}>

      {/* Line + dot column */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: "2rem" }}>
        {/* Dot */}
        <div className="rounded-full flex-shrink-0 mt-1"
             style={{
               width: "10px", height: "10px",
               background: visible ? C.terracotta : C.borderMid,
               boxShadow: visible ? `0 0 0 3px ${C.terracotta}28` : "none",
               transition: `background 0.4s ease ${index * 0.12 + 0.3}s, box-shadow 0.4s ease ${index * 0.12 + 0.3}s`,
               flexShrink: 0,
             }} />
        {/* Connector line */}
        {!isLast && (
          <div className="flex-1 mt-2"
               style={{ width: "1px", background: C.border, minHeight: "3rem" }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <p className="text-xs font-semibold tracking-[0.12em] mb-2"
           style={{ color: C.terracotta, fontFamily: FONT.ui, fontVariantNumeric: "tabular-nums" }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="text-xl md:text-2xl font-semibold mb-3 leading-snug"
            style={{ fontFamily: FONT.display, color: C.charcoal }}>
          {item.title}
        </h3>
        <p className="text-base leading-relaxed max-w-xl"
           style={{ color: C.muted, fontFamily: FONT.ui }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function PracticalSection() {
  const { practical: P } = CONTENT;

  return (
    <section id="practical" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        <div className="mb-16">
          <Eyebrow>{P.eyebrow}</Eyebrow>
          <SectionHeading className="whitespace-pre-line">{P.heading}</SectionHeading>
        </div>

        <div>
          {P.items.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} total={P.items.length} />
          ))}
        </div>

        <p className="text-sm italic mt-4 ml-16"
           style={{ color: C.muted, fontFamily: FONT.ui }}>{P.note}</p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POSE IMAGE — B1 ink-line illustration with graceful name-placeholder.
// Fixed aspect-ratio container → no layout shift whether the file exists or not.
// ─────────────────────────────────────────────────────────────────────────────
function PoseImg({ pose }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={`${POSE_PATH}${pose.slug}.png`}
        alt={`${pose.english} — ${pose.sanskrit}`}
        className="w-full h-full object-contain"
        style={{ padding: "1.5rem" }}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none"
         style={{ border: `var(--hairline) dashed ${C.borderMid}`, margin: "0.75rem", borderRadius: "1rem", width: "calc(100% - 1.5rem)", height: "calc(100% - 1.5rem)" }}>
      <LotusMark size={30} />
      <p className="text-xs mt-2 tracking-[0.12em] uppercase" style={{ color: C.muted, fontFamily: FONT.ui }}>
        {pose.slug}.png
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ASANA SHOWCASE — foundational poses in B1 ink-line style
// ─────────────────────────────────────────────────────────────────────────────
function AsanaSection() {
  const { asana: A } = CONTENT;

  return (
    <section id="asanas" data-anchor className="py-24 md:py-36" style={{ background: C.cardBg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header — left-aligned, Image #5 reference style */}
        <div className="max-w-xl mb-14">
          <Eyebrow>{A.eyebrow}</Eyebrow>
          <SectionHeading className="whitespace-pre-line">{A.heading}</SectionHeading>
        </div>

        {/* 3-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {POSES.map((pose) => (
            <div key={pose.slug}
                 className="flex flex-col rounded-2xl overflow-hidden"
                 style={{ background: "#F4EFE6", boxShadow: `0 0 0 1px ${C.border}` }}>

              {/* Illustration — fixed 4:5 area, off-white bg */}
              <div className="relative w-full overflow-hidden"
                   style={{ aspectRatio: "4/5", background: "#FDFAF6" }}>
                <PoseImg pose={pose} />
              </div>

              {/* Card text — dash + Sanskrit + English + benefit */}
              <div className="flex flex-col gap-2.5 p-6">
                {/* Terracotta dash — Image #5 signature detail */}
                <span className="block rounded-full"
                      style={{ width: "2rem", height: "2px", background: C.terracotta }} />
                <h3 className="text-lg font-semibold leading-snug"
                    style={{ fontFamily: FONT.display, color: C.charcoal }}>
                  {pose.sanskrit}
                </h3>
                <p className="text-xs tracking-[0.1em] uppercase"
                   style={{ color: C.terracotta, fontFamily: FONT.ui }}>
                  {pose.english}
                </p>
                <p className="text-sm leading-relaxed"
                   style={{ color: C.muted, fontFamily: FONT.ui }}>
                  {pose.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote — italic centered, Image #5 style */}
        <p className="text-center mt-12 text-sm italic"
           style={{ color: C.muted, fontFamily: FONT.display }}>
          {A.sub}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCTOR
// ─────────────────────────────────────────────────────────────────────────────
function InstructorSection() {
  const { instructor: I } = CONTENT;

  return (
    <section id="instructor" data-anchor className="py-24 md:py-36" style={{ background: C.dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="relative max-w-sm mx-auto md:max-w-none">
            <img
              src={IMG.instructor}
              alt="Jayesh Mistry, lead instructor at Padma Yoga Shala"
              className="w-full object-cover rounded-2xl"
              style={{ aspectRatio: "4/5" }}
            />
            <GlassCard className="absolute bottom-5 left-5 right-5 p-5">
              <p className="text-base font-semibold" style={{ color: "#F9F5EF", fontFamily: FONT.display }}>
                {I.badge.name}
              </p>
              <p className="text-sm" style={{ color: "rgba(249,245,239,0.62)", fontFamily: FONT.ui }}>
                {I.badge.role}
              </p>
            </GlassCard>
          </div>

          <div>
            <Eyebrow light>{I.eyebrow}</Eyebrow>
            <SectionHeading light className="mb-8 whitespace-pre-line">{I.heading}</SectionHeading>
            <p className="text-lg leading-relaxed mb-8"
               style={{ color: "rgba(249,245,239,0.62)", fontFamily: FONT.ui }}>
              {I.body}
            </p>
            <p className="text-sm leading-relaxed pt-6"
               style={{ color: "rgba(249,245,239,0.45)", fontFamily: FONT.ui, borderTop: `var(--hairline) solid ${C.darkBorder}` }}>
              {I.affiliation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCATION
// ─────────────────────────────────────────────────────────────────────────────
function LocationSection() {
  const { location: L } = CONTENT;

  return (
    <section id="location" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <Eyebrow>{L.eyebrow}</Eyebrow>
          <SectionHeading className="mb-6 whitespace-pre-line">{L.heading}</SectionHeading>
          <p className="text-lg leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>{L.body}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 md:row-span-2 h-full">
            <img src={IMG.lake} alt="Phewa Lake panorama from The Castle Resort"
                 className="w-full h-full object-cover rounded-2xl"
                 style={{ aspectRatio: "16/9", minHeight: "180px" }} />
          </div>
          {[
            { src: IMG.pool,    alt: "Castle Resort swimming pool" },
            { src: IMG.castle,  alt: "The Castle Resort building" },
            { src: IMG.garden,  alt: "Resort garden stone path" },
          ].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt}
                 className="w-full object-cover rounded-2xl" style={{ aspectRatio: "4/3" }} />
          ))}
          <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3", background: C.terracotta }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <p className="text-3xl font-semibold mb-2" style={{ fontFamily: FONT.display, color: "#F9F5EF", fontVariantNumeric: "tabular-nums" }}>15</p>
              <p className="text-sm font-medium" style={{ color: "rgba(249,245,239,0.82)", fontFamily: FONT.ui }}>days, all included</p>
              <p className="text-xs mt-1" style={{ color: "rgba(249,245,239,0.58)", fontFamily: FONT.ui }}>stay + meals · 40 Hr YTTC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BANNER — circular close back to the opening sutra
// ─────────────────────────────────────────────────────────────────────────────
function CTABannerSection() {
  const { ctaBanner: B } = CONTENT;

  return (
    <section className="relative py-32 md:py-52 overflow-hidden" style={{ isolation: "isolate" }}>
      <img
        src={IMG.lakeYoga}
        alt="Yoga practice at The Castle Resort, Pokhara"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: Z.base }}
      />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "rgba(0,0,0,0.62)", zIndex: Z.overlay }} />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center" style={{ zIndex: Z.content }}>
        <p className="mb-6 text-xl md:text-2xl"
           style={{ fontFamily: FONT.display, color: "rgba(249,245,239,0.80)" }}>
          {B.sutra}
        </p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-7 whitespace-pre-line"
            style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
          {B.heading}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
           style={{ color: "rgba(249,245,239,0.70)", fontFamily: FONT.ui, lineHeight: 1.75 }}>
          {B.sub}
        </p>
        <Btn label={B.cta.label} href={B.cta.href} large />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER — booking form (Formspree, graceful WhatsApp fallback) + quick chat
// ─────────────────────────────────────────────────────────────────────────────
function waLink(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function RegisterSection() {
  const { register: R, footer: F } = CONTENT;
  const [form, setForm] = useState({ name: "", email: "", course: R.courses[0], dates: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please add your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // No backend configured → open WhatsApp pre-filled so registration still works.
    if (!FORMSPREE_ID) {
      const msg = `Hi Padma Yoga Shala, I'd like to register.\n\nName: ${form.name}\nEmail: ${form.email}\nCourse: ${form.course}\nPreferred dates: ${form.dates || "flexible"}\n${form.message ? `\nNote: ${form.message}` : ""}`;
      window.open(waLink(msg), "_blank", "noopener");
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  // Cmd/Ctrl+Enter submits
  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit(e);
  };

  const fieldStyle = (k) => ({
    width: "100%",
    background: "rgba(249,245,239,0.05)",
    color: "#F9F5EF",
    borderRadius: "0.75rem",
    padding: "0.85rem 1rem",
    fontFamily: FONT.ui,
    minHeight: "48px",
    boxShadow: `0 0 0 1px ${errors[k] ? "#C2622D" : "rgba(249,245,239,0.14)"}`,
    border: "none",
    transition: `box-shadow 160ms ${E.ease}`,
  });
  const labelStyle = { color: "rgba(249,245,239,0.55)", fontFamily: FONT.ui };

  return (
    <section id="register" data-anchor className="py-24 md:py-36" style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow light>{R.eyebrow}</Eyebrow>
          <SectionHeading light className="mb-5">{R.heading}</SectionHeading>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(249,245,239,0.58)", fontFamily: FONT.ui }}>{R.sub}</p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">

          {/* Booking form */}
          <div className="rounded-2xl p-7 md:p-9" style={{ background: "rgba(249,245,239,0.04)", boxShadow: `0 0 0 1px ${C.darkBorder}` }}>
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <span className="text-4xl mb-4" aria-hidden="true">🪷</span>
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
                  {FORMSPREE_ID ? "Request received" : "Opening WhatsApp…"}
                </h3>
                <p className="text-sm max-w-sm" style={{ color: "rgba(249,245,239,0.58)", fontFamily: FONT.ui }}>
                  {FORMSPREE_ID
                    ? "Thank you. We’ll confirm your dates and details shortly."
                    : "Your details are pre-filled in a WhatsApp message — just press send and we’ll take it from there."}
                </p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium"
                        style={{ color: C.terracotta, fontFamily: FONT.ui, background: "none", border: "none", cursor: "pointer" }}>
                  Register for another course
                </button>
              </div>
            ) : (
              <form onSubmit={submit} onKeyDown={onKeyDown} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="reg-name" className="block text-sm mb-2" style={labelStyle}>Name</label>
                    <input id="reg-name" className="padma-field" style={fieldStyle("name")}
                           value={form.name} onChange={set("name")} placeholder="Your full name" />
                    {errors.name && <p className="text-xs mt-1.5" style={{ color: "#E0853F", fontFamily: FONT.ui }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="reg-email" className="block text-sm mb-2" style={labelStyle}>Email</label>
                    <input id="reg-email" type="email" className="padma-field" style={fieldStyle("email")}
                           value={form.email} onChange={set("email")} placeholder="you@email.com" />
                    {errors.email && <p className="text-xs mt-1.5" style={{ color: "#E0853F", fontFamily: FONT.ui }}>{errors.email}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="reg-course" className="block text-sm mb-2" style={labelStyle}>Course</label>
                  <select id="reg-course" className="padma-field" style={fieldStyle("course")}
                          value={form.course} onChange={set("course")}>
                    {R.courses.map(c => <option key={c} value={c} style={{ color: "#1C1917" }}>{c}</option>)}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="reg-dates" className="block text-sm mb-2" style={labelStyle}>Preferred dates <span style={{ opacity: 0.5 }}>(optional)</span></label>
                  <input id="reg-dates" className="padma-field" style={fieldStyle("dates")}
                         value={form.dates} onChange={set("dates")} placeholder="e.g. early October" />
                </div>

                <div className="mb-6">
                  <label htmlFor="reg-msg" className="block text-sm mb-2" style={labelStyle}>Anything we should know? <span style={{ opacity: 0.5 }}>(optional)</span></label>
                  <textarea id="reg-msg" rows={3} className="padma-field" style={{ ...fieldStyle("message"), resize: "vertical" }}
                            value={form.message} onChange={set("message")} placeholder="Experience level, questions, special requirements…" />
                </div>

                {status === "error" && (
                  <p className="text-sm mb-4" style={{ color: "#E0853F", fontFamily: FONT.ui }}>
                    Something went wrong. Please try again, or message us on WhatsApp.
                  </p>
                )}

                <Btn
                  label={status === "submitting" ? "Sending…" : "Submit registration"}
                  type="submit" large fullWidth
                />
                <p className="text-xs text-center mt-3" style={{ color: "rgba(249,245,239,0.40)", fontFamily: FONT.ui }}>
                  Press ⌘/Ctrl + Enter to submit
                </p>
              </form>
            )}
          </div>

          {/* Quick WhatsApp + contact */}
          <div className="rounded-2xl p-7 md:p-9 flex flex-col" style={{ background: C.terracotta }}>
            <span className="text-3xl mb-4 select-none" aria-hidden="true">💬</span>
            <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
              Prefer to chat first?
            </h3>
            <p className="text-sm mb-6" style={{ color: "rgba(249,245,239,0.85)", fontFamily: FONT.ui }}>
              Message us on WhatsApp about any course — we reply fast. Tap the one you’re considering:
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {R.whatsappPrompts.map(p => (
                <a key={p.label} href={waLink(p.msg)} target="_blank" rel="noopener noreferrer"
                   className="padma-wa-chip flex items-center justify-between px-5 py-3.5 rounded-full text-sm font-medium min-h-[48px]"
                   style={{ background: "rgba(249,245,239,0.16)", color: "#F9F5EF", textDecoration: "none", fontFamily: FONT.ui, transition: `background 160ms ${E.ease}` }}>
                  {p.label}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>

            <div className="mt-auto pt-6 space-y-2" style={{ borderTop: "var(--hairline) solid rgba(249,245,239,0.22)" }}>
              <a href={`mailto:${F.contact.email}`} className="block text-sm"
                 style={{ color: "#F9F5EF", fontFamily: FONT.ui, textDecoration: "none" }}>
                ✉️  {F.contact.email}
              </a>
              <p className="text-sm" style={{ color: "rgba(249,245,239,0.85)", fontFamily: FONT.ui }}>
                📞  {F.contact.whatsapp}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(249,245,239,0.72)", fontFamily: FONT.ui }}>
                📍  {F.contact.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STICKY MOBILE CTA — always-available register action on small screens
// ─────────────────────────────────────────────────────────────────────────────
function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 px-4 pt-3"
      style={{
        zIndex: Z.sticky,
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        background: "linear-gradient(to top, rgba(15,13,11,0.96) 60%, rgba(15,13,11,0))",
        transform: show ? "translateY(0)" : "translateY(120%)",
        transition: `transform 320ms ${E.outCubic}`,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <Btn label="Register for a Course" href="#register" large fullWidth />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function FooterSection() {
  const { footer: F } = CONTENT;

  return (
    <footer style={{ background: C.dark, borderTop: `var(--hairline) solid ${C.darkBorder}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <p className="text-xl font-semibold mb-2 flex items-center gap-2.5"
               style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
              <LotusMark size={24} />
              {F.logo}
            </p>
            <p className="text-sm mb-6" style={{ color: "rgba(249,245,239,0.40)", fontFamily: FONT.ui }}>{F.tagline}</p>
            <p className="text-xs leading-relaxed mb-8 max-w-xs" style={{ color: "rgba(249,245,239,0.32)", fontFamily: FONT.ui }}>
              {F.affiliation}
            </p>
            <div className="flex gap-3">
              {[{ label: "Instagram", g: "IG" }, { label: "Facebook", g: "FB" }].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                   className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold min-w-[44px] min-h-[44px]"
                   style={{ background: "rgba(249,245,239,0.07)", color: "rgba(249,245,239,0.50)", textDecoration: "none", fontFamily: FONT.ui }}>
                  {s.g}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-5"
               style={{ color: "rgba(249,245,239,0.28)", fontFamily: FONT.ui }}>Navigation</p>
            <div className="flex flex-col gap-3">
              {F.links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                   className="padma-footer-link text-sm"
                   style={{ color: "rgba(249,245,239,0.50)", textDecoration: "none", fontFamily: FONT.ui, transition: `color 160ms ${E.ease}` }}>
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-5"
               style={{ color: "rgba(249,245,239,0.28)", fontFamily: FONT.ui }}>Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${F.contact.email}`} className="text-sm"
                 style={{ color: "rgba(249,245,239,0.50)", textDecoration: "none", fontFamily: FONT.ui }}>
                {F.contact.email}
              </a>
              <p className="text-sm" style={{ color: "rgba(249,245,239,0.50)", fontFamily: FONT.ui }}>
                WhatsApp: {F.contact.whatsapp}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(249,245,239,0.35)", fontFamily: FONT.ui }}>
                {F.contact.address}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8"
             style={{ borderTop: `var(--hairline) solid ${C.darkBorder}` }}>
          <p className="text-xs" style={{ color: "rgba(249,245,239,0.22)", fontFamily: FONT.ui }}>
            © {F.year} Padma Yoga Shala. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(249,245,239,0.18)", fontFamily: FONT.ui }}>
            The Castle Resort Pvt. Ltd., Lakeside, Pokhara-6, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function PadmaYogaShala() {
  return (
    <div style={{ background: C.dark, color: C.charcoal }}>
      <GlobalStyles />
      <StickyNav />
      <main>
        <HeroSection />
        <TestimonialMarquee />
        <PhilosophySection />
        <CoursesSection />
        <InstructorSection />
        <TheorySection />
        <PracticalSection />
        <AsanaSection />
        <LocationSection />
        <RegisterSection />
      </main>
      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
}
