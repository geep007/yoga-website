import { C, FONT, Z, Eyebrow } from "./PadmaYogaShala.jsx";

// Secondary pages live at their own URLs, so in-page anchors from the shared
// nav and footer must point back at the home page.
export const HOME = "/";

// ─────────────────────────────────────────────────────────────────────────────
// PAGE HERO — shared by every secondary page: photo, scrim, optional sutra,
// heading, sub. Keeps the two pages visually identical below the nav.
// ─────────────────────────────────────────────────────────────────────────────
export function PageHero({ image, eyebrow, sutra, sutraTranslit, sutraRef, heading, sub }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
             style={{ background: C.dark, isolation: "isolate" }}>

      <img src={image} alt="" aria-hidden="true"
           className="absolute inset-0 w-full h-full object-cover"
           style={{ zIndex: Z.base, opacity: 0.28 }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ zIndex: Z.overlay, background: "linear-gradient(to top, rgba(15,13,11,0.98) 10%, rgba(15,13,11,0.72) 100%)" }} />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10" style={{ zIndex: Z.content }}>
        <Eyebrow light>{eyebrow}</Eyebrow>

        {sutra && (
          <div className="mb-8">
            <p className="text-2xl md:text-3xl mb-1.5"
               style={{ fontFamily: FONT.display, color: "#F4C9A8", letterSpacing: "0.02em" }}>
              {sutra}
            </p>
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase"
               style={{ fontFamily: FONT.ui, color: "rgba(249,245,239,0.55)" }}>
              {sutraTranslit}{sutraRef ? ` · ${sutraRef}` : ""}
            </p>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight mb-7 whitespace-pre-line"
            style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
          {heading}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed"
           style={{ color: "rgba(249,245,239,0.72)", fontFamily: FONT.ui }}>
          {sub}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CTA — closing banner over a photo, shared by every secondary page
// ─────────────────────────────────────────────────────────────────────────────
export function PageCTA({ image, imageFocus = "center", minHeight, heading, sub, children }) {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden flex items-center"
             style={{ isolation: "isolate", minHeight }}>
      {/* The band is much wider than it is tall, so object-cover crops hard on the
          vertical axis. imageFocus keeps the part of the photo that matters in frame. */}
      <img src={image} alt="" aria-hidden="true"
           className="absolute inset-0 w-full h-full object-cover"
           style={{ zIndex: Z.base, objectPosition: imageFocus }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "rgba(0,0,0,0.66)", zIndex: Z.overlay }} />

      <div className="relative w-full max-w-3xl mx-auto px-6 md:px-10 text-center" style={{ zIndex: Z.content }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 whitespace-pre-line"
            style={{ fontFamily: FONT.display, color: "#F9F5EF" }}>
          {heading}
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto"
           style={{ color: "rgba(249,245,239,0.72)", fontFamily: FONT.ui, lineHeight: 1.75 }}>
          {sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {children}
        </div>
      </div>
    </section>
  );
}
