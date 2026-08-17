import {
  C, FONT,
  GlobalStyles, StickyNav, FooterSection,
  Eyebrow, SectionHeading, Btn, LotusMark,
} from "./PadmaYogaShala.jsx";
import { HOME, PageHero, PageCTA } from "./pageParts.jsx";

const IMG = {
  instructor: "/images/teacher.jpg",
  lake:       "/images/8.png",
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT — edit all copy here
// ─────────────────────────────────────────────────────────────────────────────
const PAGE = {
  hero: {
    eyebrow: "Philosophy & Vision",
    heading: "Yog is not something\nyou practise.\nIt is how you live.",
    sub: "The philosophy Padma Yog Shala stands on, and the vision every course is built to carry.",
  },

  philosophy: {
    eyebrow: "Our Philosophy",
    heading: "What Yog truly means to us",
    intro: "As Sage Patanjali says, Yog is a disciplined practice that must be introduced into every aspect of one’s life. It is not limited to practising asanas on a yoga mat, but is a fundamental reorientation of one’s inner being that should guide every thought, action, and decision. This understanding forms the very foundation of our philosophy. It is also why Sage Patanjali begins the Patanjali Yoga Sutras with:",
    sutraBlock: {
      chapter: "Chapter 1: Samadhi Pada || 1.1 ||",
      sutra:   "“अथ योगानुशासनम्”",
    },
    paras: [
      "One way of understanding this sutra is to imagine Sage Patanjali’s disciples asking, “What shall we learn today?” Patanjali, a master of Indian (Sanskrit) grammar, linguistics, Ayurveda, and Yog, could be understood as responding, “Now, from this moment onwards, after learning everything else, we begin the disciplined study and practice of Yog.” The emphasis is not merely on Yog, but on Anushasan, that is discipline. From this moment onwards, Yog must become a disciplined way of living.",
      "Yog must be deeply imbibed into every aspect of one’s life, and this is only possible if one’s mindset and being are prepared for it. The asanas alone cannot prepare the mind for this.",
      "They play only a very small role, forming just a fraction of what Yog truly is. Asanas alone cannot accomplish the preparation of one’s manas. They merely serve as a means to prepare the body and support the preparation of the mind. Yog is far deeper than physical practice, and anyone wishing to understand it in its true sense must also understand its philosophy and theory. It cannot be reduced to learning asanas or a collection of traditional practices, techniques, or words taught by most schools or studios today.",
      "Yog, therefore, begins with the mind. To truly practise Yog then, one must first understand the ‘manas’ and the nature of the mind itself. An individual who understands the manas only partially and focuses solely on the poses will derive little to no real benefit from Yog. In such a case, if physical fitness alone is the objective, it may simply be better to walk regularly or introduce some active sport activities.",
      "To us, Yog must be taught in such a way that even a person who is physically incapable of practising yogasana can still live, breathe, practise, and experience Yog in its truest sense. No illness, injury, age, or physical limitation should prevent a sincere seeker from walking the path of Yog. If one’s understanding is rooted in the mind rather than merely the body, Yog remains accessible throughout every stage of life.",
    ],
    closing: "This is what Yog means to us, and this is the philosophy upon which Padma Yog Shala stands.",
  },

  cta: {
    heading: "Come and study\nthe whole of it.",
    sub: "Four courses, from a two-day introduction to a forty-hour teacher training, all taught in this order, and for this reason.",
    primary:   { label: "View the Courses",  href: `${HOME}#courses` },
    secondary: { label: "Founder’s Desk",    href: "/founders-desk.html" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
function PhilosophyEssay() {
  const { philosophy: P } = PAGE;

  return (
    <section id="philosophy" data-anchor className="py-24 md:py-36" style={{ background: C.cream }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="mb-12">
          <Eyebrow>{P.eyebrow}</Eyebrow>
          <SectionHeading>{P.heading}</SectionHeading>
        </div>

        <p className="text-lg md:text-xl leading-relaxed mb-10"
           style={{ color: C.charcoal, fontFamily: FONT.ui }}>
          {P.intro}
        </p>

        {/* Pull-out sutra */}
        <figure className="rounded-2xl px-7 py-9 md:px-10 md:py-12 mb-12 text-center"
                style={{ background: C.cardBg, boxShadow: `0 0 0 1px ${C.border}` }}>
          <figcaption className="text-xs font-semibold tracking-[0.16em] uppercase mb-6"
                      style={{ color: C.terracotta, fontFamily: FONT.ui }}>
            {P.sutraBlock.chapter}
          </figcaption>
          <p className="text-3xl md:text-4xl leading-snug"
             style={{ fontFamily: FONT.display, color: C.charcoal }}>
            {P.sutraBlock.sutra}
          </p>
          <div className="flex justify-center mt-7" aria-hidden="true">
            <LotusMark size={24} />
          </div>
        </figure>

        <div className="flex flex-col gap-7">
          {P.paras.map((p, i) => (
            <p key={i} className="text-base md:text-lg leading-relaxed"
               style={{ color: i === 0 ? C.charcoal : C.muted, fontFamily: FONT.ui }}>
              {p}
            </p>
          ))}
        </div>

        <p className="text-xl md:text-2xl leading-snug mt-12 pt-10"
           style={{ fontFamily: FONT.display, color: C.charcoal, borderTop: `var(--hairline) solid ${C.border}` }}>
          {P.closing}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function PhilosophyPage() {
  const { hero: H, cta } = PAGE;

  return (
    <div style={{ background: C.dark, color: C.charcoal }}>
      <GlobalStyles />
      <StickyNav hrefBase={HOME} />
      <main>
        <PageHero image={IMG.lake} {...H} />
        <PhilosophyEssay />
        <PageCTA image={IMG.instructor} imageFocus="center 18%" minHeight="82vh" heading={cta.heading} sub={cta.sub}>
          <Btn label={cta.primary.label}   href={cta.primary.href}   large />
          <Btn label={cta.secondary.label} href={cta.secondary.href} large outline />
        </PageCTA>
      </main>
      <FooterSection hrefBase={HOME} />
    </div>
  );
}
