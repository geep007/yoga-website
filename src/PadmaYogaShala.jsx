import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
export const C = {
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
export const Z = {
  base:    1,
  overlay: 10,
  content: 20,
  sticky:  40,
  nav:     50,
};

// Emil Kowalski easing blueprint
export const E = {
  outCubic:    "cubic-bezier(0.215,0.61,0.355,1)",
  outQuart:    "cubic-bezier(0.165,0.84,0.44,1)",
  outQuint:    "cubic-bezier(0.23,1,0.32,1)",
  inOutCubic:  "cubic-bezier(0.645,0.045,0.355,1)",
  ease:        "ease",
};

// Typography: Onest for all UI, Fraunces for editorial accent/display
export const FONT = {
  ui:      "'Onest', system-ui, sans-serif",
  display: "'Fraunces', Georgia, serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// FORM CONFIG
// Registrations are delivered by email to CONTACT_EMAIL through FormSubmit
// (https://formsubmit.co) — no account or API key needed.
//
// ONE-TIME ACTIVATION: the first submission triggers a confirmation email to
// CONTACT_EMAIL. Click the activation link in it once; every submission after
// that arrives straight in the inbox.
//
// If the request fails for any reason, the form falls back to opening WhatsApp
// with the details pre-filled — so registration works either way.
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT_EMAIL = "padmayogshala@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const WHATSAPP_NUMBER = "919725560379"; // +91 97255 60379

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────
// The teacher photo is a wide landscape frame with him seated slightly right of
// centre — this focal point keeps him centred in any portrait crop.
export const TEACHER_FOCUS = "59% center";
// The portrait of Shri Jayesh Mistry is a tall 2:3 frame — his face sits in the
// upper third, so portrait crops are pulled towards the top.
export const TEACHER_PORTRAIT_FOCUS = "50% 26%";

const IMG = {
  groupStretch: "/images/1.png",          // group side-stretch on terrace
  instructor:   "/images/2.png",          // instructor solo on grass (red mat)
  teacher:      "/images/teacher.jpg",    // Jayesh Mistry seated in padmasana
  teacherPortrait: "/images/teacher-jayesh.jpg", // Shri Jayesh Mistry, seated portrait
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
      { label: "Courses",             href: "#courses" },
      { label: "Philosophy & Vision", href: "/philosophy.html" },
      { label: "Founder’s Desk",      href: "/founders-desk.html" },
      { label: "Location",            href: "#location" },
    ],
    cta: { label: "Register", href: "#register" },
  },

  hero: {
    sutra: "“अथ योगानुशासनम्”",
    sutraTranslit: "“Atha yogānuśāsanam”",
    headline: "“Now, from this moment onwards,\nwe begin the disciplined study\nand practice of Yog.”",
    attribution: "Patanjali Yoga Sutra · Chapter 1, Samadhi Pada",
    primaryCta:   { label: "Register for a Course", href: "#register" },
    secondaryCta: { label: "Compare Courses",       href: "#compare" },
  },

  // Quick-compare strip directly under the hero
  compare: {
    eyebrow: "Four Courses · Clear Hours",
    heading: "Find your course in ten seconds",
    sub: "Every course pairs hands-on practice with deep Upanishadic theory. Pick by where you are today.",
    rows: [
      {
        id: "foundations",
        name: "8 Hour Course",
        hours: "8",
        unit: "hrs · 2 days",
        forWhom: "Open to all",
        price: "$96",
        href: "#courses",
      },
      {
        id: "twenty",
        name: "20 Hour Course",
        hours: "20",
        unit: "hrs · 5 days",
        forWhom: "Teachers · or self-practice",
        price: "$280",
        href: "#courses",
      },
      {
        id: "yttc",
        name: "40 Hour YTTC",
        hours: "40",
        unit: "hrs · 15 days",
        forWhom: "Certified teachers only",
        price: "$480",
        href: "#courses",
      },
      {
        id: "retreat",
        name: "Two Day Retreat",
        hours: "2",
        unit: "days",
        forWhom: "Open to all · stay included",
        price: "$220",
        href: "#courses",
      },
    ],
  },

  philosophy: {
    eyebrow: "The Teachers Who Taught Us",
    body: [
      "All courses offered at Padma Yog Shala are a result of deep study and discourse between Jayesh Mistry and his revered mentors. The open curricula are developed under the guidance of Vedacharya and Yogacharya Shri Shanti Kumar Bhatt, Yogacharya Shri Jayantibhai Patel, amongst others.",
      "Shri Shanti Kumar Bhatt dedicated fifty-five years exclusively to the teaching of Yog, teaching at institutions such as NASA and to prominent figures like former Indian Prime Minister Shri Morarji Desai. He has also authored the seminal book The Science of Yogic Meditation and is the recipient of the prestigious Sahitya Ratna Award.",
      "Shri Jayantibhai Patel, Yog Guru at L.I.F.E. Mission and Lakulesh Yog, was instrumental in the formation of these courses, lending his expertise in designing university-level Yog curricula.",
      "Padma Yog Shala is Jayesh Mistry’s humble attempt at carrying forward the legacy his teachers entrusted to him. Every course here is designed to go far and beyond just learning postures. Our courses are immersive, transformative, and exceptionally detailed programmes that encourage students to question, think, and engage with Yog in its fullest sense.",
    ],
  },

  whyPadma: {
    eyebrow: "Why Padma",
    heading: "Four things every course\nis built on",
    items: [
      {
        title: "Foundational asanas",
        desc: "Out of thousands of asanas, we teach the ones that matter most to the body and to the practice that follows.",
      },
      {
        title: "Philosophy",
        desc: "The 40 Hour course carries 15 to 25 hours of real theory, because a strong philosophical base is what makes a strong teacher.",
      },
      {
        title: "Logical reasoning",
        desc: "Every theory and every pose is taught through its logic. You understand the why before you ever teach the how.",
      },
      {
        title: "Customised teaching",
        desc: "Sessions adjust to what you most want to explore, and real assignments during the course teach you to read your students.",
      },
    ],
  },

  courses: {
    eyebrow: "Our Courses",
    headingLeft: "Four courses.\nClear hours.\nClear outcomes.",
    headingRight: "From a first taste of yoga philosophy to advanced teacher training and a two-day Ayurvedic retreat — each course states exactly how many hours you get, what they cover, and what you walk away able to do.",
    note: "All courses held at The Castle Resort Pvt. Ltd., Lakeside, Pokhara, Nepal. Session times can be adjusted on mutual understanding. Teaching follows the Guru–Shishya Parampara: instruction is mainly oral, in the Vedic tradition, and students are welcome to make their own notes.",
    items: [
      {
        number:       "01",
        id:           "foundations",
        title:        "8 Hour Course",
        tags:         ["Open to All", "Choose Your Topics", "2 Days"],
        level:        "Open to All",
        levelSub:     "Beginners welcome",
        hours:        "8",
        hoursUnit:    "Hours",
        hoursSub:     "2 days · 4 hrs per day",
        price:        "$96",
        priceSub:     "for the full course",
        desc:         "Eight hours across two days — two in the morning, two in the evening. You choose what you want to learn from ten subject areas; if you would rather be guided, Mr. Jayesh Mistry will suggest the topic that fits you best.",
        outcome:      "Walk away understanding what yoga actually is — and where to begin.",
        highlights:   ["Choose from 10 topics", "Morning + evening sessions", "No experience needed"],
        schedule:     "2 days · 2 hrs morning + 2 hrs evening",
        image:        IMG.groupClass,
        split:        null,
        pricingTable: null,
        topicsTitle:  "Choose your topics",
        topics: [
          "Yog and Yog Philosophy",
          "Yog Practical and Asana Theory",
          "Ayurveda",
          "Indian History and Civilisation",
          "Sankhya Darshan (Sankhya Philosophy)",
          "Mantra and Mantra Philosophy",
          "Pranayama and Pranayama Philosophy",
          "Yama – Niyama",
          "Patanjali Yog Sutra",
          "Sun Salutation — theory only (combine with one other topic)",
        ],
        bullets: [
          "Who it’s for: beginners, anyone wanting in-depth knowledge of a specific topic, and anyone who wants to try a course with Mr. Jayesh Mistry.",
          "Students are guided to build their own asana sequence and schedule, tailored to their requirements.",
          "Accommodation and food available on request, chargeable.",
        ],
      },
      {
        number:       "02",
        id:           "twenty",
        title:        "20 Hour Course",
        tags:         ["Two Variations", "Senior Citizens", "Self Practice"],
        level:        "Teachers · or self-practice",
        levelSub:     "Two variations",
        hours:        "20",
        hoursUnit:    "Hours",
        hoursSub:     "5 days · Mon–Fri · 4 hrs a day",
        price:        "$280",
        priceSub:     "for the full course",
        desc:         "Five days, Monday to Friday, four hours a day. The course runs in two variations — a teaching specialisation for working with senior citizens, and a fully personalised self-practice course open to everyone.",
        outcome:      "Walk away able to teach older students safely — or to practise on your own with a sequence built for you.",
        highlights:   ["Purak asanas focus", "Injury-free methodology", "Syllabus built around you"],
        schedule:     "Mon–Fri · 6:00–8:00 AM and 4:00–6:00 PM",
        image:        IMG.groupStretch,
        split:        null,
        pricingTable: null,
        variations: [
          {
            name:    "20 Hr YTTC — Teaching Senior Citizens",
            forWhom: "Teachers only",
            desc:    "Asana series plus core theory, focused on how to assist and teach yogasanas to senior citizens in a way that prevents injury and keeps the class risk-free. Main focus is on Purak asanas.",
          },
          {
            name:    "20 Hr Self Practice",
            forWhom: "Open to all",
            desc:    "The syllabus is designed around your own requirements — for anyone who wants to design an asana sequence they can practise on their own.",
          },
        ],
        bullets: [
          "Accommodation on request, chargeable: one week’s stay with breakfast and dinner — $280.",
        ],
      },
      {
        number:       "03",
        id:           "yttc",
        title:        "40 Hour YTTC",
        tags:         ["Purak Asana", "Asana Theory", "Yog Theory"],
        level:        "Certified Teachers Only",
        levelSub:     "Certificate awarded",
        hours:        "40",
        hoursUnit:    "Hrs · 15 Days",
        hoursSub:     "10 teaching days over two weeks",
        price:        "$480",
        priceSub:     "+ $350 stay · $830 all-in",
        desc:         "Our most complete programme: forty hours over ten teaching days, spread across two weeks with weekends off. Theory and practical hours are adjusted to what each student needs — the total always comes to forty.",
        outcome:      "Walk away a stronger teacher — with the philosophy, method, and practice to back it.",
        highlights:   ["Certificate on completion", "Hours adjusted to you", "15 days · stay + meals"],
        schedule:     "Mon–Fri · 8:30–10:30 AM and 6:30–8:30 PM",
        image:        IMG.lakeYoga,
        split:        { theory: "15–25", practice: "15–25", theoryLabel: "Theory", practiceLabel: "Practice" },
        pricingTable: [
          { label: "Course Fee",                              value: "$480"      },
          { label: "Accommodation + Food (15 days @ Castle)", value: "$350"      },
          { label: "Total, all-inclusive",                    value: "$830 USD", isTotal: true },
        ],
        topicsTitle: "Sample topics covered",
        topics: [
          "Purak asana",
          "How to teach asanas and prepare students for advanced poses",
          "Asana theory",
          "Yog theory",
        ],
        bullets: [
          "Only for practising or certified teachers.",
          "Accommodation on request, chargeable: 15 days of stay with breakfast and dinner — $350. The course is spread over two weeks; weekends are off.",
        ],
      },
      {
        number:       "04",
        id:           "retreat",
        title:        "Two Day Retreat",
        tags:         ["Ayurveda", "Doshas", "Body Reset"],
        level:        "Open to All",
        levelSub:     "Self practice retreat",
        hours:        "2",
        hoursUnit:    "Days",
        hoursSub:     "Accommodation included",
        price:        "$220",
        priceSub:     "stay included",
        desc:         "A two-day retreat course for self practice. You learn your doshas and your body type through Ayurvedic theory — and, more importantly, how to retreat yourself at home, without needing a retreat centre ever again.",
        outcome:      "Walk away knowing your body type — and how to reset it on your own.",
        highlights:   ["Know your doshas", "Gut cleaning food", "Stay included"],
        schedule:     "2 days · residential",
        image:        IMG.garden,
        split:        null,
        pricingTable: null,
        topicsTitle:  "The $220 includes",
        topics: [
          "Theory explanation and lectures",
          "Herbs for internal body cleaning, focused on the stomach",
          "Specially prepared food for two days — gut cleaning and body resetting",
          "Accommodation for the full retreat",
        ],
        bullets: null,
      },
    ],
  },

  theory: {
    eyebrow: "What You’ll Study",
    heading: "Theory that changes how\nyou practice and teach",
    items: [
      { icon: "🪷", title: "Yog & Yog Philosophy",        desc: "What yog actually is, what it set out to do, and the philosophy that holds the whole practice together." },
      { icon: "🧘", title: "Yog Practical & Asana Theory", desc: "Practice paired with the theory behind it — why each asana exists, and what it is doing to body and mind." },
      { icon: "🌿", title: "Ayurveda",                     desc: "India’s ancient science of balance — and the root causes it sees where modern medicine often sees only symptoms." },
      { icon: "📜", title: "Indian History & Civilisation",desc: "The civilisation that produced yog: its history, its thought, and the world these practices grew out of." },
      { icon: "🌌", title: "Sankhya Darshan",              desc: "What is the self, and what is not? Sankhya philosophy reframes the goal of yog — and asks what it has to say about God." },
      { icon: "🎵", title: "Mantra & Mantra Philosophy",   desc: "What aid do mantras really offer on the path of yog? Sound, vibration, and their quiet work on the mind." },
      { icon: "🌬️", title: "Pranayama & Its Philosophy",  desc: "What is prana, and why does breath sit at the centre of practice and daily life? The bridge between body and mind." },
      { icon: "⚖️", title: "Yama – Niyama",               desc: "Ten ethical commitments the ancients considered more foundational than any asana. Why were they stressed so heavily?" },
      { icon: "📖", title: "Patanjali Yog Sutra",          desc: "An initial understanding of the foundational text behind classical yog, in plain language." },
      { icon: "☀️", title: "Sun Salutation",              desc: "The history and root theory behind yog’s most iconic sequence. Theory only — pair it with one other topic." },
    ],
  },

  instructor: {
    eyebrow: "Your Teacher",
    heading: "Shri Jayesh Mistry",
    body: [
      "With over 30 years of experience in health and fitness, Shri Jayesh Mistry has trained more than 35,000 individuals through his fitness ventures, including the Pioneer Fitness Centre. His journey in yoga has been shaped by years of learning under accomplished teachers, including Yogacharya and Vedacharya Shri Shanti Kumar Bhatt (personal yoga teacher to former Prime Minister Shri Morarji Desai and Sahitya Ratna awardee), Shri Jayantibhai Patel, and Shri Dushyant Modi (M.S. University, Baroda).",
      "He has taught yoga and its philosophy at institutions across the world, including Prince Aga Khan University in Nairobi, Kenya. Through Padma Yog Shala, he continues to share the practice and philosophy of yoga with students in India and around the world. He also serves as the appointed International Yoga Instructor of Yog Kendra, Vadodara.",
    ],
    badge: {
      name: "Shri Jayesh Mistry",
      role: "International Yoga Instructor, Yog Kendra · Vadodara",
    },
    affiliation: "Affiliated with Yoga Kendra, Vadodara — est. 1963 · Reg. No. E-1642, Govt. of Gujarat.",
  },

  location: {
    eyebrow: "Where You’ll Stay & Study",
    heading: "The Castle Resort,\nLakeside Pokhara",
    body: "Set on a hillside overlooking Phewa Lake — with gardens, a pool, and a calm, homely atmosphere that makes theory feel like retreat. Stay and food are arranged on request: fifteen days with breakfast and dinner for the 40 Hour YTTC, a week for the 20 Hour course, and full accommodation included in the Two Day Retreat.",
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
      "8 Hour Course — 2 days · $96",
      "20 Hour Course — Teaching Senior Citizens (teachers) · $280",
      "20 Hour Course — Self Practice (open to all) · $280",
      "40 Hour YTTC — 15 days · $480 (+$350 stay)",
      "Two Day Retreat — stay included · $220",
      "Not sure yet — help me choose",
    ],
    whatsappPrompts: [
      { label: "8 Hour Course",   msg: "Hi Padma Yog Shala, I’m interested in the 8 Hour Course." },
      { label: "20 Hour Course",  msg: "Hi Padma Yog Shala, I’m interested in the 20 Hour Course." },
      { label: "40 Hour YTTC",    msg: "Hi Padma Yog Shala, I’m interested in the 40 Hour YTTC." },
      { label: "Two Day Retreat", msg: "Hi Padma Yog Shala, I’m interested in the Two Day Retreat course." },
    ],
  },

  footer: {
    logo:    "Padma Yoga Shala",
    tagline: "Yoga as the art of stilling the mind",
    links:   [
      { label: "Courses",             href: "#courses" },
      { label: "Philosophy & Vision", href: "/philosophy.html" },
      { label: "Founder’s Desk",      href: "/founders-desk.html" },
      { label: "Teacher",             href: "#instructor" },
      { label: "Register",            href: "#register" },
    ],
    affiliation: "Affiliated with Yoga Kendra, Vadodara — the oldest yoga institute in Gujarat, est. 1963, founded by Yogacharya Dushant Modi. Reg. No. E-1642, Government of Gujarat.",
    contact: {
      email:    CONTACT_EMAIL,
      whatsapp: "+91 97255 60379",
      address:  "The Castle Resort Pvt. Ltd., Lakeside, Pokhara-6, Nepal",
    },
    year: new Date().getFullYear(),
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LOTUS MARK — inline SVG so it stays crisp at any size (no asset dependency)
// ─────────────────────────────────────────────────────────────────────────────
export function LotusMark({ size = 26 }) {
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
export function GlobalStyles() {
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

      @media (hover: hover) and (pointer: fine) {
        .padma-nav-link:hover   { color: ${C.terracotta} !important; }
        .padma-btn:hover        { background: ${C.terraDark} !important; }
        .padma-compare-row:hover { background: ${C.cardBg} !important; }
        .padma-course-row:hover .padma-course-num { color: ${C.terracotta} !important; }
        .padma-course-row:hover .padma-course-img { transform: scale(1.04); }
        .padma-theory-card:hover {
          background: rgba(249,245,239,0.10) !important;
          box-shadow: 0 0 0 1px rgba(249,245,239,0.18) !important;
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

export function Eyebrow({ children, light = false }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
       style={{ color: light ? "rgba(249,245,239,0.50)" : C.terracotta, fontFamily: FONT.ui }}>
      {children}
    </p>
  );
}

export function SectionHeading({ children, light = false, className = "" }) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-semibold leading-tight whitespace-pre-line ${className}`}
      style={{ fontFamily: FONT.display, color: light ? "#F9F5EF" : C.charcoal }}
    >
      {children}
    </h2>
  );
}

export function Btn({ label, href, large = false, outline = false, onClick, type, fullWidth = false }) {
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
// `hrefBase` lets a secondary page (e.g. /philosophy.html) point in-page anchors back
// at the home page: pass "/" and "#courses" becomes "/#courses".
export function StickyNav({ hrefBase = "" }) {
  const scrolled = useNavScroll();
  const [open, setOpen] = useState(false);
  const to = (href) => (href.startsWith("#") ? `${hrefBase}${href}` : href);

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

        <a href={hrefBase || "#"} className="flex items-center gap-2.5"
           style={{ fontFamily: FONT.display, color: "#F9F5EF", fontSize: "1.1rem", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
          <LotusMark size={26} />
          {CONTENT.nav.logo}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {CONTENT.nav.links.map(l => (
            <a key={l.label} href={to(l.href)}
               className="padma-nav-link text-sm font-medium"
               style={{ color: "rgba(249,245,239,0.68)", textDecoration: "none", fontFamily: FONT.ui, transition: `color 160ms ${E.ease}` }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Btn label={CONTENT.nav.cta.label} href={to(CONTENT.nav.cta.href)} />
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
            <a key={l.label} href={to(l.href)}
               className="py-3.5 text-base font-medium border-b"
               style={{ color: "rgba(249,245,239,0.80)", borderColor: C.darkBorder, textDecoration: "none", fontFamily: FONT.ui }}
               onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mt-4">
            <Btn label={CONTENT.nav.cta.label} href={to(CONTENT.nav.cta.href)} large fullWidth />
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — auto-advancing slideshow (pauses on reduced-motion + tab blur).
// Deliberately minimal: sutra, its translation, attribution, two actions.
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
           style={{ zIndex: Z.overlay, background: "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.24) 52%, rgba(0,0,0,0) 76%)" }} />

      {/* Content layer — one column, nothing but the sutra and the two actions */}
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-20 pt-28" style={{ zIndex: Z.content }}>
        <div className="max-w-4xl">

          {/* Sanskrit sutra — quiet, above the headline it translates */}
          <span className="block rounded-full mb-8"
                style={{ width: "2.5rem", height: "1px", background: C.terracotta }} aria-hidden="true" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.25] mb-4"
              style={{ fontFamily: FONT.display, color: "#F4C9A8", letterSpacing: "0.02em", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
            {H.sutra}
          </h1>
          <p className="text-sm md:text-base tracking-[0.24em] uppercase mb-10"
             style={{ fontFamily: FONT.ui, color: "rgba(249,245,239,0.72)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
            {H.sutraTranslit}
          </p>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-medium leading-[1.35] tracking-tight mb-8 whitespace-pre-line max-w-2xl"
            style={{ fontFamily: FONT.display, color: "#F9F5EF", textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
          >
            {H.headline}
          </p>

          <p className="text-xs tracking-[0.16em] uppercase mb-12"
             style={{ fontFamily: FONT.ui, color: "rgba(249,245,239,0.55)" }}>
            {H.attribution}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Btn label={H.primaryCta.label} href={H.primaryCta.href} large />
            <Btn label={H.secondaryCta.label} href={H.secondaryCta.href} large outline />
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-14">
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
        <div className="mb-10">
          <Eyebrow light>{P.eyebrow}</Eyebrow>
        </div>

        {/* Scroll-highlight body text */}
        <div ref={bodyRef} className="flex flex-col gap-7">
          {P.body.map((para, i) => (
            <p key={i}
               className="text-xl md:text-2xl leading-relaxed font-medium"
               style={{ color: "rgba(249,245,239,0.9)", fontFamily: FONT.display }}>
              {para}
            </p>
          ))}
        </div>

        {/* 4 commitments — IntersectionObserver stagger cards */}
        <div className="mt-16 pt-12 grid sm:grid-cols-2 gap-4"
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

              {/* Variations — courses that run in more than one form */}
              {course.variations && (
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {course.variations.map(v => (
                    <div key={v.name} className="rounded-xl p-4"
                         style={{ background: C.cardBg, boxShadow: `0 0 0 1px ${C.border}` }}>
                      <p className="text-xs font-medium mb-1.5 inline-block px-2 py-0.5 rounded-full"
                         style={{ background: `${C.sage}22`, color: C.sage, fontFamily: FONT.ui }}>
                        {v.forWhom}
                      </p>
                      <p className="text-sm font-semibold mb-1.5 leading-snug"
                         style={{ fontFamily: FONT.display, color: C.charcoal }}>
                        {v.name}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>
                        {v.desc}
                      </p>
                    </div>
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

              {/* Topic list — what you can choose, or what’s included */}
              {course.topics && (
                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3"
                     style={{ color: C.terracotta, fontFamily: FONT.ui }}>
                    {course.topicsTitle}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {course.topics.map(t => (
                      <li key={t} className="flex items-start gap-2.5 text-sm leading-snug"
                          style={{ color: C.charcoal, fontFamily: FONT.ui }}>
                        <span className="rounded-full flex-shrink-0 mt-[0.45rem]"
                              style={{ width: "5px", height: "5px", background: C.sage }} aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Practical notes — stay, food, who it’s for, flexibility */}
              {course.bullets && (
                <ul className="mt-5 flex flex-col gap-2 pt-4"
                    style={{ borderTop: `var(--hairline) solid ${C.border}` }}>
                  {course.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-xs leading-relaxed"
                        style={{ color: C.muted, fontFamily: FONT.ui }}>
                      <span aria-hidden="true" style={{ color: C.terracotta }}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
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
          <SectionHeading className="whitespace-pre-line">{T.heading}</SectionHeading>
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
              src={IMG.teacherPortrait}
              alt="Shri Jayesh Mistry, lead instructor at Padma Yog Shala"
              className="w-full object-cover rounded-2xl"
              style={{ aspectRatio: "4/5", objectPosition: TEACHER_PORTRAIT_FOCUS }}
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
            {(Array.isArray(I.body) ? I.body : [I.body]).map((para, i) => (
              <p key={i} className="text-lg leading-relaxed mb-6 last:mb-8"
                 style={{ color: "rgba(249,245,239,0.62)", fontFamily: FONT.ui }}>
                {para}
              </p>
            ))}
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
              <p className="text-sm font-medium" style={{ color: "rgba(249,245,239,0.82)", fontFamily: FONT.ui }}>days of stay + meals</p>
              <p className="text-xs mt-1" style={{ color: "rgba(249,245,239,0.58)", fontFamily: FONT.ui }}>40 Hr YTTC · on request, $350</p>
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

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject:  `New course registration — ${form.course}`,
          _template: "table",
          name:      form.name,
          email:     form.email,
          course:    form.course,
          dates:     form.dates || "flexible",
          message:   form.message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  // If the email delivery fails, registration still gets through on WhatsApp.
  const fallbackWa = waLink(
    `Hi Padma Yog Shala, I'd like to register.\n\nName: ${form.name}\nEmail: ${form.email}\nCourse: ${form.course}\nPreferred dates: ${form.dates || "flexible"}${form.message ? `\n\nNote: ${form.message}` : ""}`
  );

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
                  Request received
                </h3>
                <p className="text-sm max-w-sm" style={{ color: "rgba(249,245,239,0.58)", fontFamily: FONT.ui }}>
                  Thank you. Your details are on their way to us — we’ll confirm your dates and the rest shortly.
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
                    Something went wrong sending your details.{" "}
                    <a href={fallbackWa} target="_blank" rel="noopener noreferrer"
                       style={{ color: "#E0853F", textDecoration: "underline" }}>
                      Send them on WhatsApp instead
                    </a>{" "}
                    — or email {CONTACT_EMAIL}.
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
export function FooterSection({ hrefBase = "" }) {
  const { footer: F } = CONTENT;
  const to = (href) => (href.startsWith("#") ? `${hrefBase}${href}` : href);

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
                <a key={l.label} href={to(l.href)}
                   className="padma-footer-link text-sm"
                   style={{ color: "rgba(249,245,239,0.50)", textDecoration: "none", fontFamily: FONT.ui, transition: `color 160ms ${E.ease}` }}>
                  {l.label}
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
        <CompareSection />
        <PhilosophySection />
        <CoursesSection />
        <InstructorSection />
        <TheorySection />
        <LocationSection />
        <RegisterSection />
      </main>
      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
}
