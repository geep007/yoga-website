import {
  C, FONT,
  GlobalStyles, StickyNav, FooterSection,
  Eyebrow, Btn, LotusMark,
} from "./PadmaYogaShala.jsx";
import { HOME, PageHero, PageCTA } from "./pageParts.jsx";

const IMG = {
  teacher:  "/images/teacher.jpg",
  lakeYoga: "/images/3.png",
  // Archive frame from the original Pioneer Fitness Center site — only exists at
  // 131×200, so it is never rendered wider than its native size.
  pioneer:  "/images/pioneer-training.jpg",
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT — edit all copy here
// ─────────────────────────────────────────────────────────────────────────────
const PAGE = {
  hero: {
    eyebrow: "Founder’s Desk",
    heading: "A note from\nJayesh Mistry",
    sub: "Founder and Chief Instructor, Padma Yog Shala, on what we consciously choose to do differently.",
  },

  different: {
    eyebrow: "What We Do Differently",
    paras: [
      "Mr. Jayesh Mistry, the founder and chief instructor of Padma Yog Shala, has taught over 35,000 students from across the globe. His years of teaching brought to light a fundamental gap in the way Yog is practised and taught in many places today. Such teaching is often extremely limiting, as it does not fulfil the true purpose of learning Yog for the student. In some instances, rather than simply offering limited benefit, it can even take the practice in a direction that is contrary to the very purpose of Yog itself.",
      "At Padma Yog Shala, we believe that Yog must begin with an understanding of the manas. Only then can one truly appreciate the philosophy, theory, and eventually the asanas that support this understanding. We consciously teach Yog in this order because we believe that physical practice without an understanding of the mind remains incomplete.",
      "One truth that is often left unspoken is that Yog is ultimately an individual practice. While it can certainly be learnt within a cohort or under the guidance of a teacher, it can only truly be practised by oneself. A teacher may guide the path, but the practice of Yog must eventually become one’s own. We believe this is essential to the spirit of Yog.",
      "Another aspect that distinguishes our teaching is the way we approach yogasana itself. Mr. Jayesh Mistry is yet to come across a school where even the most fundamental basics of Yog, the asanas, are taught in a sequence that is truly appropriate for the human body and practised as described by the actual masters. At Padma Yog Shala, every sequence is designed with intention, ensuring that each posture prepares the body for the next, rather than treating asanas as isolated exercises.",
      "Our approach is rooted in the belief that Yog is far more than movement. It is a lifelong discipline of understanding the mind, cultivating awareness, and living with anushasan. Everything we teach is guided by this philosophy.",
    ],
    signature: {
      name: "Jayesh Mistry",
      role: "Founder & Chief Instructor · Padma Yog Shala",
    },
  },

  archive: {
    caption: "Mr. Jayesh training members at Pioneer Fitness Centre",
    note: "Before Padma Yog Shala, there was Pioneer, the fitness centre he built and ran himself, where more than 35,000 people first trained under him.",
  },

  cta: {
    heading: "Study it the way\nit was handed down.",
    sub: "Four courses, taught in this order and for this reason, from a two-day introduction to a forty-hour teacher training.",
    primary:   { label: "View the Courses",     href: `${HOME}#courses` },
    secondary: { label: "Philosophy & Vision",  href: "/philosophy.html" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
function DifferenceSection() {
  const { different: D, archive: A } = PAGE;

  return (
    <section className="py-24 md:py-36" style={{ background: "#1A1200" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        <div className="mb-14">
          <Eyebrow light>{D.eyebrow}</Eyebrow>
        </div>

        <div className="max-w-3xl flex flex-col gap-7">
          {D.paras.map((p, i) => (
            <p key={i} className="text-base md:text-lg leading-relaxed"
               style={{ color: "rgba(249,245,239,0.66)", fontFamily: FONT.ui }}>
              {p}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="max-w-3xl mt-14 pt-8 flex items-center gap-4"
             style={{ borderTop: "var(--hairline) solid rgba(249,245,239,0.12)" }}>
          <LotusMark size={30} />
          <div>
            <p className="text-lg font-semibold leading-snug"
               style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
              {D.signature.name}
            </p>
            <p className="text-sm" style={{ color: "rgba(249,245,239,0.48)", fontFamily: FONT.ui }}>
              {D.signature.role}
            </p>
          </div>
        </div>

        {/* Archive frame from the Pioneer years */}
        <figure className="max-w-3xl mt-12 flex items-start gap-5 rounded-2xl p-5"
                style={{ background: "rgba(249,245,239,0.05)", boxShadow: "0 0 0 1px rgba(249,245,239,0.08)" }}>
          <img
            src={IMG.pioneer}
            alt={A.caption}
            width="131"
            height="200"
            loading="lazy"
            className="rounded-lg flex-shrink-0"
            style={{ width: 96, height: "auto" }}
          />
          <figcaption>
            <p className="text-sm leading-relaxed mb-2"
               style={{ color: "rgba(249,245,239,0.66)", fontFamily: FONT.ui }}>
              {A.note}
            </p>
            <p className="text-xs leading-snug"
               style={{ color: "rgba(249,245,239,0.42)", fontFamily: FONT.ui }}>
              {A.caption}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function FoundersDeskPage() {
  const { hero: H, cta } = PAGE;

  return (
    <div style={{ background: C.dark, color: C.charcoal }}>
      <GlobalStyles />
      <StickyNav hrefBase={HOME} />
      <main>
        <PageHero image={IMG.teacher} {...H} />
        <DifferenceSection />
        <PageCTA image={IMG.lakeYoga} heading={cta.heading} sub={cta.sub}>
          <Btn label={cta.primary.label}   href={cta.primary.href}   large />
          <Btn label={cta.secondary.label} href={cta.secondary.href} large outline />
        </PageCTA>
      </main>
      <FooterSection hrefBase={HOME} />
    </div>
  );
}
