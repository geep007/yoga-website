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
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────
const IMG = {
  groupStretch: "/images/1.png",   // group side-stretch on terrace
  instructor:   "/images/2.png",   // instructor solo on grass (red mat)
  lakeYoga:     "/images/3.png",   // two people yoga, Phewa Lake behind
  groupClass:   "/images/4.png",   // 1 instructor + 3 students seated
  pool:         "/images/5.png",   // resort pool, mountains
  garden:       "/images/6.jpeg",  // lush stone-path garden
  castle:       "/images/7.jpeg",  // castle building in greenery
  lake:         "/images/8.png",   // Phewa Lake panorama
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
      { label: "Courses",    href: "#courses" },
      { label: "Philosophy", href: "#philosophy" },
      { label: "Schedule",   href: "#courses" },
      { label: "About",      href: "#instructor" },
      { label: "Contact",    href: "#contact" },
    ],
    cta: { label: "Enquire Now", href: "#contact" },
  },

  hero: {
    eyebrow: "Pokhara, Nepal · Castle Resort",
    headline1: "Yoga is not\nan acrobat's art.",
    headline2: "It is the art of ease\nwith yourself.",
    sub: "Learn to practice — and to teach — through the lens of the Upanishads.",
    primaryCta:   { label: "View Courses", href: "#courses" },
    secondaryCta: { label: "Talk to Us",   href: "#contact" },
    glassCard: {
      stat: "40 hrs",
      label: "of Upanishadic theory",
      sub: "in the advanced YTTC",
    },
  },

  testimonials: [
    { quote: "“A course that finally explained WHY behind every pose, not just how.”", author: "Past Student" },
    { quote: "“I came for the asanas. I left understanding the philosophy that built them.”", author: "Past Student" },
    { quote: "“The setting at Castle Resort, overlooking Phewa Lake, made every theory session feel like a retreat in itself.”", author: "Past Student" },
  ],

  philosophy: {
    eyebrow: "Our Philosophy",
    heading: "Theory rooted in the Upanishads. Practice rooted in the body.",
    body: "Most yoga training treats philosophy as a footnote. At Padma Yoga Shala, it's the foundation. Alongside rigorous practical sessions, every course includes life-changing theory sessions drawn from Upanishadic teachings and stories — helping you understand not just how to perform an asana, but why it exists.",
    stats: [
      { value: "15–18 Hrs", label: "Theory in the 40Hr course" },
      { value: "100s+",     label: "Teaching hours, lead instructor" },
      { value: "3",         label: "Courses, trial to advanced" },
    ],
  },

  courses: {
    eyebrow: "Our Courses",
    headingLeft: "Find the course\nthat meets you",
    headingRight: "From a first taste of yoga philosophy to advanced teacher training — each course blends practical sessions with Upanishadic theory.",
    note: "All courses held at The Castle Resort Pvt. Ltd., Lakeside, Pokhara, Nepal.",
    items: [
      {
        number:       "01",
        title:        "Foundations of Yoga",
        tags:         ["History", "Philosophy", "Ayurveda"],
        level:        "Open to All",
        levelSub:     "Trial Course",
        duration:     "8 Hours",
        price:        "$96 USD",
        desc:         "An introduction to yoga, yoga theory, Ayurveda, Indian philosophy, and the civilization that shaped it — perfect for curious beginners and seasoned practitioners alike.",
        schedule:     null,
        image:        IMG.groupClass,
        pricingTable: null,
      },
      {
        number:       "02",
        title:        "Teaching Yoga to Senior Citizens",
        tags:         ["Specialization", "Methodology", "Adaptation"],
        level:        "Certified Yoga Teachers",
        levelSub:     "Specialization",
        duration:     "20 Hours",
        price:        "$280 USD",
        desc:         "A specialized course for working yoga teachers, focused on adapting asanas, sequencing, and teaching approaches for senior citizen students.",
        schedule:     "Mon–Fri | 6:00–8:00 AM or 4:00–6:00 PM",
        image:        IMG.groupStretch,
        pricingTable: null,
      },
      {
        number:       "03",
        title:        "Advanced Yoga Teachers Training (40 Hrs)",
        tags:         ["Patanjali Yoga Sutra", "Samkhya", "Pranamaya"],
        level:        "Yoga Teachers Only",
        levelSub:     "Advanced YTTC",
        duration:     "40 Hrs · 15 Days",
        price:        "$480 – $830 USD",
        desc:         "Our most comprehensive program — 15–18 hours of deep theory paired with asana series training, meditation sequences, and stress-relief practices.",
        schedule:     "Mon–Fri | 8:30–10:30 AM or 6:30–8:30 PM",
        image:        IMG.lakeYoga,
        pricingTable: [
          { label: "Course Fee",                                value: "$480"     },
          { label: "Accommodation + Food (15 days @ Castle)", value: "$350"     },
          { label: "Total",                                     value: "$830 USD", isTotal: true },
        ],
      },
    ],
  },

  theory: {
    eyebrow: "What You'll Study",
    heading: "Theory that transforms how\nyou practice and teach",
    items: [
      { icon: "📜", title: "History & Philosophy",  desc: "Trace yoga's roots through Indian civilization and thought." },
      { icon: "🧘", title: "Yama-Niyama",           desc: "The ethical foundation every practice and teacher stands on." },
      { icon: "🌌", title: "Samkhya",               desc: "The philosophical framework underlying yogic cosmology." },
      { icon: "🌬️", title: "Pranayama",            desc: "Breath as the bridge between body and mind." },
      { icon: "🎵", title: "Mantra",                desc: "Sound, vibration, and their role in practice." },
      { icon: "☀️", title: "Sun Salutation",        desc: "The anatomy and meaning behind yoga's most iconic sequence." },
      { icon: "📖", title: "Patanjali Yoga Sutra",  desc: "The foundational text behind classical yoga." },
      { icon: "🌿", title: "Ayurveda",              desc: "Understanding the body through India's ancient science of balance." },
    ],
  },

  practical: {
    eyebrow: "Practice & Application",
    heading: "From first asana to\nteaching your own series",
    items: [
      { title: "Where to Begin",          desc: "Which asanas to learn and teach first, and why — building a principled foundation for any student." },
      { title: "Anatomy of Each Asana",   desc: "Understand the body mechanics behind each pose for safer, more informed teaching." },
      { title: "Sukshma Kriyas",          desc: "Subtle warm-up variations that prepare the body and mind before deeper practice." },
      { title: "Structured Asana Series", desc: "For physical health & flexibility, meditation & mental stress relief, disease management, and core strength." },
    ],
    note: "Sessions can be adjusted to match what students are most interested in exploring.",
  },

  instructor: {
    eyebrow: "Your Teacher",
    heading: "Learned from someone\nwho has taught this,\nagain and again",
    body: "Every theory topic is delivered by an experienced teacher with 100s+ hours of teaching across each individual subject — refined over many sessions, so each lecture is clear, lived-in, and grounded.",
  },

  location: {
    eyebrow: "Where You'll Stay & Study",
    heading: "The Castle Resort,\nLakeside Pokhara",
    body: "Set on a hillside overlooking Phewa Lake — with gardens, a pool, and a calm, homely atmosphere that makes theory feel like retreat.",
  },

  ctaBanner: {
    heading: "Begin with ease.\nBegin with Padma.",
    sub: "Whether you're curious about yoga philosophy or ready for advanced teacher training — start with the course that fits where you are.",
    cta: { label: "Enquire About a Course", href: "#contact" },
  },

  footer: {
    logo:    "Padma Yoga Shala",
    tagline: "Yoga as the art of ease with yourself",
    links:   ["Courses", "Philosophy", "About", "Contact"],
    contact: {
      email:    "hello@padmayogashala.com",
      whatsapp: "+91 97255 60379",
      address:  "The Castle Resort Pvt. Ltd., Lakeside, Pokhara-6, Nepal",
    },
    year: new Date().getFullYear(),
  },
};

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

      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .padma-marquee { animation: marquee 52s linear infinite; will-change: transform; }

      @media (hover: hover) and (pointer: fine) {
        .padma-marquee:hover   { animation-play-state: paused; }
        .padma-nav-link:hover  { color: ${C.terracotta} !important; }
        .padma-btn:hover       { background: ${C.terraDark} !important; }
        .padma-course-row:hover .padma-course-num { color: ${C.terracotta} !important; }
        .padma-course-row:hover .padma-course-img { transform: scale(1.04); }
        .padma-theory-card:hover {
          background: rgba(249,245,239,0.10) !important;
          border-color: rgba(249,245,239,0.18) !important;
        }
        .padma-practical-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(28,25,23,0.10) !important;
        }
        .padma-footer-link:hover { color: rgba(249,245,239,0.9) !important; }
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
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVis(true);
      return;
    }
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return {
    ref,
    style: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 600ms ${E.outCubic} ${delay}ms, transform 600ms ${E.outCubic} ${delay}ms`,
    },
  };
}

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
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const { ref, style } = useReveal(delay);
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

function GlassCard({ children, className = "", dark = true }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background:          dark ? "rgba(15,13,11,0.55)"       : "rgba(249,245,239,0.12)",
        backdropFilter:      "blur(24px)",
        WebkitBackdropFilter:"blur(24px)",
        border:              dark ? "1px solid rgba(249,245,239,0.13)" : "1px solid rgba(249,245,239,0.25)",
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

function Btn({ label, href, large = false, outline = false }) {
  const base = `padma-btn inline-flex items-center justify-center rounded-full font-medium transition-all ${
    large ? "px-9 py-4 text-base min-h-[52px]" : "px-6 py-3 text-sm min-h-[44px]"
  }`;
  const colors = outline
    ? { color: "rgba(249,245,239,0.88)", border: "1px solid rgba(249,245,239,0.30)" }
    : { background: C.terracotta, color: "#F9F5EF" };

  return (
    <a
      href={href}
      className={base}
      style={{ textDecoration: "none", transition: `background 180ms ${E.ease}, transform 100ms ${E.ease}`, ...colors }}
      onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >
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
    <nav className="fixed top-0 inset-x-0 z-50"
         style={{
           background:          scrolled ? "rgba(15,13,11,0.88)" : "transparent",
           borderBottom:        `1px solid ${scrolled ? C.darkBorder : "transparent"}`,
           backdropFilter:      scrolled ? "blur(20px)" : "none",
           WebkitBackdropFilter:scrolled ? "blur(20px)" : "none",
           transition:          `background 300ms ${E.ease}, border-color 280ms ${E.ease}`,
         }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">

        <a href="#" style={{ fontFamily: FONT.display, color: "#F9F5EF", fontSize: "1.1rem", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
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
          <Btn label={CONTENT.nav.cta.label} href={CONTENT.nav.cta.href} large />
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — auto-advancing slideshow with crossfade, left-aligned content,
// glass stat card (bottom-right desktop), slide dot indicators.
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [idx, setIdx] = useState(0);
  const { hero: H } = CONTENT;

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ minHeight: "100svh" }}>

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
            zIndex:             i === idx ? 1 : 0,
          }}
          role="img"
          aria-label={slide.alt}
        />
      ))}

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div className="absolute inset-0 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.20) 100%)" }} />

      {/* Content layer */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-20 pt-28">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">

          {/* Left: headline + CTAs */}
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow light>{H.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold leading-[1.04] tracking-tight mb-7 whitespace-pre-line"
                style={{ fontFamily: FONT.display, color: "#F9F5EF" }}
              >
                {H.headline1}{"\n"}{H.headline2}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                 style={{ color: "rgba(249,245,239,0.65)", fontFamily: FONT.ui }}>
                {H.sub}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Btn label={H.primaryCta.label} href={H.primaryCta.href} large />
                <Btn label={H.secondaryCta.label} href={H.secondaryCta.href} large outline />
              </div>
            </Reveal>
          </div>

          {/* Right: glass stat card (desktop only) */}
          <Reveal delay={300} className="hidden md:block">
            <GlassCard className="p-7 min-w-[220px]">
              <p className="text-xs font-medium tracking-[0.14em] uppercase mb-4"
                 style={{ color: "rgba(249,245,239,0.42)", fontFamily: FONT.ui }}>
                Highlight
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
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(249,245,239,0.10)" }}>
                <a href="#courses" className="text-sm font-medium"
                   style={{ color: C.terracotta, textDecoration: "none", fontFamily: FONT.ui }}>
                  View all courses →
                </a>
              </div>
            </GlassCard>
          </Reveal>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
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
// TESTIMONIAL MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialMarquee() {
  const items = [...CONTENT.testimonials, ...CONTENT.testimonials, ...CONTENT.testimonials, ...CONTENT.testimonials];

  return (
    <section className="py-10 overflow-hidden"
             style={{ background: C.cardBg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
             aria-label="Student testimonials">
      <p className="text-center text-[11px] mb-6 select-none pointer-events-none"
         style={{ color: C.muted, fontFamily: FONT.ui, letterSpacing: "0.1em" }}>
        Add real testimonials post-launch
      </p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 w-20 pointer-events-none"
             style={{ maskImage: "linear-gradient(to right, black, transparent)" }} />
        <div className="absolute inset-y-0 right-0 z-10 w-20 pointer-events-none"
             style={{ maskImage: "linear-gradient(to left, black, transparent)" }} />
        <div className="padma-marquee flex gap-4 w-max">
          {items.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 rounded-2xl p-6"
                 style={{ background: C.cream, boxShadow: `0 0 0 1px ${C.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex-shrink-0"
                     style={{ background: `${C.sage}28`, border: `1px solid ${C.borderMid}` }} />
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
function PhilosophySection() {
  const { philosophy: P } = CONTENT;

  return (
    <section id="philosophy" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          <div>
            <Reveal>
              <Eyebrow>{P.eyebrow}</Eyebrow>
              <SectionHeading className="mb-8">{P.heading}</SectionHeading>
              <p className="text-lg leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>{P.body}</p>
            </Reveal>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-10" style={{ borderTop: `1px solid ${C.border}` }}>
              {P.stats.map((s, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className="text-3xl md:text-4xl font-semibold mb-2 leading-none"
                     style={{ fontFamily: FONT.display, color: C.terracotta, fontVariantNumeric: "tabular-nums" }}>
                    {s.value}
                  </p>
                  <p className="text-xs leading-snug" style={{ color: C.muted, fontFamily: FONT.ui }}>{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Staggered grid with real photos — single col on mobile, 2-col stagger on lg */}
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:mt-12">
            <Reveal className="lg:row-span-2">
              <img src={IMG.groupClass} alt="Group yoga class at Castle Resort"
                   className="w-full object-cover rounded-2xl"
                   style={{ aspectRatio: "16/9", maxHeight: "360px" }} />
            </Reveal>
            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:mt-10">
              <Reveal delay={100}>
                <img src={IMG.groupStretch} alt="Side-stretch group session"
                     className="w-full object-cover rounded-2xl"
                     style={{ aspectRatio: "4/3" }} />
              </Reveal>
              <Reveal delay={170}>
                <img src={IMG.lakeYoga} alt="Yoga by Phewa Lake"
                     className="w-full object-cover rounded-2xl"
                     style={{ aspectRatio: "4/3" }} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSES — Yogus-style horizontal list rows on desktop
// ─────────────────────────────────────────────────────────────────────────────
function CoursesSection() {
  const { courses: CO } = CONTENT;

  return (
    <section id="courses" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Split header */}
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 pb-10"
               style={{ borderBottom: `1px solid ${C.border}` }}>
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
              <a href="#contact" className="text-sm font-medium"
                 style={{ color: C.terracotta, textDecoration: "none", fontFamily: FONT.ui }}>
                Enquire about a course →
              </a>
            </div>
          </div>
        </Reveal>

        {/* Course rows */}
        {CO.items.map((course, i) => (
          <Reveal key={course.number} delay={i * 60}>
            {/* padma-course-grid: flex-col on mobile → 3-col CSS grid on md+ (via GlobalStyles) */}
            <div
              className="padma-course-row padma-course-grid flex flex-col gap-4 py-8 md:py-10"
              style={{ borderBottom: `1px solid ${C.border}` }}
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
                {course.schedule && (
                  <p className="text-xs mb-4" style={{ color: C.sage, fontFamily: FONT.ui }}>{course.schedule}</p>
                )}
                {course.pricingTable && (
                  <div className="rounded-xl overflow-hidden text-xs w-full"
                       style={{ border: `1px solid ${C.border}`, fontFamily: FONT.ui }}>
                    {course.pricingTable.map((row, ri) => (
                      <div key={ri} className="flex justify-between px-3 py-2"
                           style={{
                             background: row.isTotal ? `${C.terracotta}0F` : ri % 2 ? `${C.border}40` : "transparent",
                             borderTop:  ri > 0 ? `1px solid ${C.border}` : "none",
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

              {/* 3 — Right: meta + image + button
                  Mobile: 2-col mini-grid [meta | image] then button full-width
                  Desktop: stacked column, right-aligned (via md:flex md:flex-col) */}
              <div className="flex-shrink-0">
                <div className="grid grid-cols-[1fr_auto] gap-4 md:flex md:flex-col md:items-end md:gap-5">
                  {/* Meta */}
                  <div className="md:text-right">
                    <p className="text-xs mb-0.5" style={{ color: C.muted, fontFamily: FONT.ui }}>Level</p>
                    <p className="text-sm font-medium" style={{ color: C.charcoal, fontFamily: FONT.ui }}>{course.level}</p>
                    <p className="text-xs mb-4" style={{ color: C.muted, fontFamily: FONT.ui }}>{course.levelSub}</p>
                    <p className="text-xs mb-0.5" style={{ color: C.muted, fontFamily: FONT.ui }}>Duration</p>
                    <p className="text-sm font-medium" style={{ color: C.charcoal, fontFamily: FONT.ui, fontVariantNumeric: "tabular-nums" }}>{course.duration}</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: C.terracotta, fontFamily: FONT.ui, fontVariantNumeric: "tabular-nums" }}>{course.price}</p>
                  </div>
                  {/* Image */}
                  <div className="w-28 h-24 md:w-32 rounded-xl overflow-hidden self-start">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="padma-course-img w-full h-full object-cover"
                      style={{ transition: `transform 400ms ${E.outCubic}` }}
                    />
                  </div>
                </div>
                {/* Enquire — full width on mobile, auto on desktop */}
                <div className="mt-4 md:flex md:justify-end">
                  <Btn label="Enquire" href="#contact" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <p className="mt-8 text-sm text-center" style={{ color: C.muted, fontFamily: FONT.ui }}>{CO.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THEORY — glass cards on dark background
// ─────────────────────────────────────────────────────────────────────────────
function TheorySection() {
  const { theory: T } = CONTENT;

  return (
    <section id="theory" data-anchor className="py-24 md:py-36" style={{ background: C.dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow light>{T.eyebrow}</Eyebrow>
            <SectionHeading light className="whitespace-pre-line">{T.heading}</SectionHeading>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {T.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 50}>
              <div
                className="padma-theory-card rounded-2xl p-7 h-full"
                style={{
                  background:  "rgba(249,245,239,0.05)",
                  border:      "1px solid rgba(249,245,239,0.09)",
                  transition:  `background 220ms ${E.ease}, border-color 220ms ${E.ease}`,
                }}
              >
                <span className="text-3xl block mb-5 select-none pointer-events-none" aria-hidden="true">{item.icon}</span>
                <h3 className="text-lg font-semibold mb-2 leading-tight"
                    style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed"
                   style={{ color: "rgba(249,245,239,0.50)", fontFamily: FONT.ui }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRACTICAL
// ─────────────────────────────────────────────────────────────────────────────
function PracticalSection() {
  const { practical: P } = CONTENT;

  return (
    <section id="practical" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <Eyebrow>{P.eyebrow}</Eyebrow>
            <SectionHeading className="whitespace-pre-line">{P.heading}</SectionHeading>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {P.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 70}>
              <div
                className="padma-practical-card rounded-2xl p-8 h-full"
                style={{
                  background:  C.cardBg,
                  boxShadow:   `0 0 0 1px ${C.border}`,
                  transition:  `transform 280ms ${E.outQuart}, box-shadow 280ms ${E.outQuart}`,
                }}
              >
                <div className="w-8 h-0.5 rounded-full mb-7" style={{ background: C.terracotta }} />
                <h3 className="text-xl font-semibold mb-3"
                    style={{ fontFamily: FONT.display, color: C.charcoal }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-sm text-center italic" style={{ color: C.muted, fontFamily: FONT.ui }}>{P.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCTOR — uses real instructor photo (image 2)
// ─────────────────────────────────────────────────────────────────────────────
function InstructorSection() {
  const { instructor: I } = CONTENT;

  return (
    <section id="instructor" data-anchor className="py-24 md:py-36" style={{ background: C.dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <Reveal>
            <div className="relative max-w-sm mx-auto md:max-w-none">
              <img
                src={IMG.instructor}
                alt="Padma Yoga Shala lead instructor"
                className="w-full object-cover rounded-2xl"
                style={{ aspectRatio: "4/5" }}
              />
              {/* Glass overlay badge */}
              <GlassCard className="absolute bottom-5 left-5 right-5 p-5">
                <p className="text-xs font-medium tracking-[0.14em] uppercase mb-2"
                   style={{ color: "rgba(249,245,239,0.42)", fontFamily: FONT.ui }}>
                  Add instructor details
                </p>
                <p className="text-base font-semibold" style={{ color: "#F9F5EF", fontFamily: FONT.display }}>
                  Jayesh Mistry
                </p>
                <p className="text-sm" style={{ color: "rgba(249,245,239,0.55)", fontFamily: FONT.ui }}>
                  Add qualifications, lineage & bio
                </p>
              </GlassCard>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Eyebrow light>{I.eyebrow}</Eyebrow>
            <SectionHeading light className="mb-8 whitespace-pre-line">{I.heading}</SectionHeading>
            <p className="text-lg leading-relaxed"
               style={{ color: "rgba(249,245,239,0.60)", fontFamily: FONT.ui }}>
              {I.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCATION — dark section with real resort/lake photos
// ─────────────────────────────────────────────────────────────────────────────
function LocationSection() {
  const { location: L } = CONTENT;

  return (
    <section id="location" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <Eyebrow>{L.eyebrow}</Eyebrow>
            <SectionHeading className="mb-6 whitespace-pre-line">{L.heading}</SectionHeading>
            <p className="text-lg leading-relaxed" style={{ color: C.muted, fontFamily: FONT.ui }}>{L.body}</p>
          </div>
        </Reveal>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Reveal className="col-span-2 md:row-span-2 h-full">
            <img src={IMG.lake} alt="Phewa Lake panorama from Castle Resort"
                 className="w-full h-full object-cover rounded-2xl"
                 style={{ aspectRatio: "16/9", minHeight: "180px" }} />
          </Reveal>
          {[
            { src: IMG.pool,    alt: "Castle Resort swimming pool" },
            { src: IMG.castle,  alt: "The Castle Resort building" },
            { src: IMG.garden,  alt: "Resort garden stone path" },
          ].map((img, i) => (
            <Reveal key={i} delay={(i + 1) * 55}>
              <img src={img.src} alt={img.alt}
                   className="w-full object-cover rounded-2xl"
                   style={{ aspectRatio: "4/3" }} />
            </Reveal>
          ))}
          <Reveal delay={200}>
            <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3", background: C.terracotta }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-3xl font-semibold mb-2" style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>15</p>
                <p className="text-sm font-medium" style={{ color: "rgba(249,245,239,0.80)", fontFamily: FONT.ui }}>days in paradise</p>
                <p className="text-xs mt-1" style={{ color: "rgba(249,245,239,0.55)", fontFamily: FONT.ui }}>for the 40Hr YTTC</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BANNER — yoga-by-lake image as full-width background
// ─────────────────────────────────────────────────────────────────────────────
function CTABannerSection() {
  const { ctaBanner: B } = CONTENT;

  return (
    <section className="relative py-32 md:py-52 overflow-hidden">
      <img
        src={IMG.lakeYoga}
        alt="Yoga practice at Castle Resort, Pokhara"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "rgba(0,0,0,0.60)", zIndex: 1 }} />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center" style={{ zIndex: 2 }}>
        <Reveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-7 whitespace-pre-line"
              style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
            {B.heading}
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
             style={{ color: "rgba(249,245,239,0.65)", fontFamily: FONT.ui, lineHeight: 1.75 }}>
            {B.sub}
          </p>
          <Btn label={B.cta.label} href={B.cta.href} large />
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────────
function ContactSection() {
  const { footer: F } = CONTENT;

  return (
    <section id="contact" data-anchor className="py-24 md:py-36" style={{ background: C.dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <Eyebrow light>Get in Touch</Eyebrow>
            <SectionHeading light>Start the conversation</SectionHeading>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <Reveal delay={0}>
            <div className="rounded-2xl p-8 text-center h-full flex flex-col items-center"
                 style={{ background: "rgba(249,245,239,0.05)", border: `1px solid ${C.darkBorder}` }}>
              <span className="text-3xl mb-4 select-none" aria-hidden="true">✉️</span>
              <p className="font-semibold mb-2" style={{ color: "#F9F5EF", fontFamily: FONT.ui }}>Email</p>
              <a href={`mailto:${F.contact.email}`} className="text-sm break-all"
                 style={{ color: C.terracotta, fontFamily: FONT.ui, textDecoration: "none" }}>
                {F.contact.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl p-8 text-center h-full flex flex-col items-center"
                 style={{ background: C.terracotta }}>
              <span className="text-3xl mb-4 select-none" aria-hidden="true">💬</span>
              <p className="font-semibold mb-1" style={{ color: "#F9F5EF", fontFamily: FONT.ui }}>WhatsApp</p>
              <a href={`https://wa.me/${F.contact.whatsapp.replace(/\D/g, "")}`}
                 className="text-sm mb-5" style={{ color: "rgba(249,245,239,0.80)", fontFamily: FONT.ui, textDecoration: "none" }}>
                {F.contact.whatsapp}
              </a>
              <a href={`https://wa.me/${F.contact.whatsapp.replace(/\D/g, "")}`}
                 className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium min-h-[44px]"
                 style={{ background: "rgba(249,245,239,0.18)", color: "#F9F5EF", border: "1px solid rgba(249,245,239,0.30)", textDecoration: "none" }}>
                Message us
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-2xl p-8 text-center h-full flex flex-col items-center"
                 style={{ background: "rgba(249,245,239,0.05)", border: `1px solid ${C.darkBorder}` }}>
              <span className="text-3xl mb-4 select-none" aria-hidden="true">📍</span>
              <p className="font-semibold mb-2" style={{ color: "#F9F5EF", fontFamily: FONT.ui }}>Visit Us</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(249,245,239,0.50)", fontFamily: FONT.ui }}>
                {F.contact.address}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function FooterSection() {
  const { footer: F } = CONTENT;

  return (
    <footer style={{ background: C.dark, borderTop: `1px solid ${C.darkBorder}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <p className="text-xl font-semibold mb-2"
               style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
              {F.logo}
            </p>
            <p className="text-sm mb-8" style={{ color: "rgba(249,245,239,0.40)", fontFamily: FONT.ui }}>{F.tagline}</p>
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
             style={{ borderTop: `1px solid ${C.darkBorder}` }}>
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
        <TheorySection />
        <PracticalSection />
        <InstructorSection />
        <LocationSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
