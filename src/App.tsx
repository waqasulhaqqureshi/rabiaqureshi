import { ReactNode, useEffect, useRef, useState } from "react";
import Carousel from "./components/Carousel";
import {
  profile,
  experience,
  skillGroups,
  education,
  certificates,
  development,
  interests,
} from "./data";

/* ---------- helpers ---------- */

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <Reveal className="mb-6 text-center" >
      <div id={id} className="-mt-24 pt-24" />
      <p className="font-serif text-xl italic text-black/60">/ {eyebrow}</p>
      <h2 className="mt-2 text-4xl font-light tracking-tight sm:text-6xl">{title}</h2>
    </Reveal>
  );
}

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const brands = ["Svenyx", "BAROSA Events", "Stylin Beauty Salon", "Rose Vale School", "MetaTrader 5", "WordPress", "MS Excel", "Photoshop"];
const portrait = "/images/image-2.png";

/* ---------- sections ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-12 sm:pt-8">
        <a href="#home" className="font-serif text-3xl italic leading-none sm:text-4xl">
          Rabia Haq
        </a>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/80 shadow-sm ring-1 ring-black/10 backdrop-blur transition hover:bg-white"
        >
          <span className="flex flex-col gap-[5px]">
            <i className="block h-[1.5px] w-5 bg-ink" />
            <i className="block h-[1.5px] w-5 bg-ink" />
            <i className="block h-[1.5px] w-5 bg-ink" />
          </span>
        </button>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-ink text-white transition-all duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="mx-auto flex h-full max-w-5xl flex-col px-8 py-8">
          <div className="flex items-center justify-between">
            <span className="font-serif text-3xl italic">Rabia Haq</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-12 w-12 place-items-center rounded-full bg-lime text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-1 text-5xl font-light tracking-tight transition hover:text-lime sm:text-7xl"
              >
                <span className="font-serif text-lg italic text-white/40">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-white/50">{profile.email} · {profile.phoneDisplay}</p>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-bg relative mx-3 mt-3 aspect-video overflow-hidden rounded-[2rem] sm:mx-5">
      <Header />

      {/* location badge */}
      <div className="rise absolute left-1/2 top-[8%] z-20 -translate-x-1/2 sm:top-[5%]" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white/60 px-4 py-1.5 text-xs backdrop-blur sm:text-base">
          <span className="text-base">📍</span>
          <span>Based in {profile.address}</span>
        </div>
      </div>

      {/* title (sits behind the portrait) */}
      <div className="absolute inset-x-0 top-[18%] z-0 text-center leading-[0.9] sm:top-[16%]">
        <h1 className="rise text-[17vw] font-light tracking-[-0.04em] sm:text-[11vw] xl:text-[150px]" style={{ animationDelay: "0.2s" }}>
          Hi I’m {profile.first}
        </h1>
        <p
          className="rise -mt-[1.5vw] font-serif text-[18vw] italic tracking-[-0.03em] sm:text-[12.5vw] xl:text-[185px]"
          style={{ animationDelay: "0.35s" }}
        >
          Computer Operator
        </p>
      </div>

      {/* portrait */}
      <img
        src={portrait}
        alt="Rabia Haq Qureshi portrait"
        className="portrait-mask rise pointer-events-none absolute bottom-0 left-1/2 z-10 h-[92%] w-auto max-w-none -translate-x-1/2 sm:h-[95%] md:h-[97%]"
        style={{ animationDelay: "0.5s" }}
      />

      {/* left: availability */}
      <div className="rise absolute left-6 top-[58%] z-20 hidden md:left-12 md:block" style={{ animationDelay: "0.7s" }}>
        <div className="flex items-center gap-3 rounded-full bg-white py-3 pl-3 pr-6 text-lg shadow-sm">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-lime/40">
            <span className="h-4 w-4 rounded-full bg-lime shadow-[0_0_0_4px_rgba(180,242,60,0.4)]" />
          </span>
          Available for new opportunities
        </div>
      </div>

      {/* right: tagline */}
      <p className="rise absolute right-6 top-[56%] z-20 hidden max-w-[300px] text-xl leading-snug md:right-12 md:block lg:max-w-[340px] lg:text-2xl" style={{ animationDelay: "0.8s" }}>
        passionate about organising data, people and ideas into smooth, reliable digital workflows.
      </p>

      {/* bottom-left: stats */}
      <div className="rise absolute bottom-8 left-6 z-20 flex max-w-[240px] items-center gap-3 md:left-12" style={{ animationDelay: "0.9s" }}>
        <div className="flex shrink-0 -space-x-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm text-white ring-2 ring-white">اردو</span>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-sm font-medium ring-2 ring-white">EN</span>
        </div>
        <p className="text-xs leading-snug text-black/70">
          Bilingual professional with <b className="font-medium text-ink">4+ years</b> across data, events &amp; sales.
        </p>
      </div>

      {/* bottom-right: CTA */}
      <a
        href="#contact"
        className="rise absolute bottom-8 right-6 z-20 flex items-center gap-3 rounded-full bg-ink px-8 py-5 text-white shadow-[0_0_0_6px_rgba(255,255,255,0.35),0_20px_40px_-12px_rgba(0,0,0,0.5)] transition hover:scale-[1.04] md:right-[10%]"
        style={{ animationDelay: "1s" }}
      >
        <Arrow />
        <span className="font-medium">Get in Touch</span>
      </a>
    </section>
  );
}

function Marquee() {
  const row = [...brands, ...brands];
  return (
    <div className="relative mx-auto mt-10 max-w-[1400px] overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-14 py-4">
        {row.map((b, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap text-2xl font-semibold tracking-tight text-black/30 sm:text-3xl">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-black/20 text-sm text-white">{b[0]}</span>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

const chipData: { label: string; color: string; rot: string; pos: string }[] = [
  { label: "Data Entry", color: "#ff6b2c", rot: "6deg", pos: "left-[2%] top-[4%]" },
  { label: "MS Excel", color: "#2f9bff", rot: "5deg", pos: "left-[6%] top-[38%]" },
  { label: "MetaTrader 5", color: "#222", rot: "-4deg", pos: "left-[1%] top-[72%]" },
  { label: "Client Relations", color: "#ffc61a", rot: "-5deg", pos: "right-[2%] top-[2%]" },
  { label: "WordPress", color: "#f43fa5", rot: "6deg", pos: "right-[4%] top-[38%]" },
  { label: "HTML · CSS · JS", color: "#2ccf58", rot: "4deg", pos: "right-[0%] top-[72%]" },
];

function Chip({ label, color, rot }: { label: string; color: string; rot: string }) {
  return (
    <span
      className="floaty inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs shadow-[0_10px_24px_-10px_rgba(0,0,0,0.3)] sm:text-sm"
      style={{ ["--r" as string]: rot }}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: color }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
      </span>
      {label}
    </span>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1200px] px-5 pb-24 pt-24 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full md:block">
        {chipData.map((c) => (
          <div key={c.label} className={`absolute ${c.pos}`}>
            <Chip {...c} />
          </div>
        ))}
      </div>

      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-serif text-2xl italic text-black/70">Hallo!</p>
        <p className="mt-4 text-3xl font-normal leading-[1.15] tracking-tight sm:text-5xl">
          I’m Rabia, and my focus is on blending accurate data work, clear communication and a love for code to{" "}
          <span className="text-black/30">craft smooth experiences that solve real problems.</span>
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap justify-center gap-3 md:hidden">
        {chipData.map((c) => (
          <Chip key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}

const cardBase = "glass relative flex h-full flex-col rounded-[2rem] p-7 sm:p-8";

function ExperienceSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-5 py-16">
      <SectionHead id="experience" eyebrow="My Journey" title="Work Experience" />
      <Carousel cardClass="w-[88%] sm:w-[420px]">
        {experience.map((e, i) => (
          <article key={e.role + e.company} className={`${cardBase} min-h-[500px]`}>
            <div className="flex items-start justify-between">
              <span className="text-6xl font-light tracking-tight">{String(i + 1).padStart(2, "0")}</span>
              {e.current ? (
                <span className="flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 text-xs font-medium">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-ink" /> Currently working
                </span>
              ) : (
                <span className="rounded-full bg-black/5 px-3 py-1.5 text-xs text-black/60">{e.place}</span>
              )}
            </div>
            <div className="mt-auto pt-10">
              <p className="font-serif text-lg italic text-black/50">{e.period}</p>
              <h3 className="mt-1 text-3xl font-light leading-tight tracking-tight">{e.role}</h3>
              <p className="mt-2 flex items-center gap-2 text-base font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-lime/40" />
                {e.company}
                {e.current && <span className="font-normal text-black/50">· {e.place}</span>}
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-black/60">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/40" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-5 py-16">
      <SectionHead id="skills" eyebrow="Toolkit" title="Skills & Strengths" />
      <Carousel cardClass="w-[88%] sm:w-[420px]">
        {skillGroups.map((g, i) => (
          <article key={g.title} className={`${cardBase} min-h-[440px] ${i === 0 ? "!bg-ink !text-white" : ""}`}>
            <span className={`text-6xl font-light tracking-tight ${i === 0 ? "text-lime" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
            <div className="mt-auto pt-10">
              <h3 className="text-3xl font-light tracking-tight">{g.title}</h3>
              <p className={`mt-1 font-serif text-lg italic ${i === 0 ? "text-white/50" : "text-black/50"}`}>{g.note}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className={`rounded-full px-3.5 py-1.5 text-sm ${i === 0 ? "bg-white/10 text-white" : "bg-white text-ink shadow-sm ring-1 ring-black/5"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-5 py-16">
      <SectionHead id="education" eyebrow="Learning" title="Education" />
      <Carousel cardClass="w-[88%] sm:w-[420px]">
        {education.map((e, i) => (
          <article key={e.title} className={`${cardBase} min-h-[420px]`}>
            <div className="flex items-start justify-between">
              <span className="text-6xl font-light tracking-tight">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full bg-lime px-3 py-1.5 text-xs font-medium">{e.period}</span>
            </div>
            <div className="mt-auto pt-10">
              <h3 className="text-3xl font-light leading-tight tracking-tight">{e.title}</h3>
              <p className="mt-2 text-base font-medium">{e.school}</p>
              <p className="font-serif text-lg italic text-black/50">{e.place}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{e.detail}</p>
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
}

function CertificatesSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-5 py-16">
      <SectionHead id="certificates" eyebrow="Proof of work" title="Certificates" />
      <Carousel cardClass="w-[80%] sm:w-[330px]" autoPlay>
        {certificates.map((c, i) => (
          <a
            key={c.title}
            href={`${profile.website}/#certificates`}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            className={`${cardBase} group min-h-[400px] !p-4 transition hover:-translate-y-1`}
          >
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#d9f77f] via-lime to-[#8fe01f] p-6 text-center">
              <div className="absolute inset-3 rounded-2xl border border-dashed border-ink/25" />
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></svg>
              <p className="mt-4 font-serif text-3xl italic leading-tight">{c.title}</p>
              <p className="mt-2 text-sm text-ink/70">{c.issuer}</p>
              <span className="absolute left-5 top-5 text-sm font-light">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex items-center justify-between px-3 pb-2 pt-4">
              <div>
                <p className="text-sm text-black/50">{c.kind}</p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-lime ring-2 ring-lime/40" /> Available
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition group-hover:bg-lime group-hover:text-ink">
                <Arrow />
              </span>
            </div>
          </a>
        ))}
      </Carousel>
      <p className="mt-2 text-center text-sm text-black/50">
        Links to all certificates are available on{" "}
        <a className="underline underline-offset-4 hover:text-ink" href={profile.website} target="_blank" rel="noreferrer">
          {profile.websiteDisplay}
        </a>
      </p>
    </section>
  );
}

function BeyondSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-5 py-16">
      <SectionHead eyebrow="Growing" title="Personal Development" />
      <Carousel cardClass="w-[80%] sm:w-[340px]">
        {development.map((d, i) => (
          <article key={d.title} className={`${cardBase} min-h-[300px]`}>
            <div className="flex items-start justify-between">
              <span className="text-5xl font-light tracking-tight">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full bg-lime px-3 py-1.5 text-xs font-medium">{d.level}</span>
            </div>
            <div className="mt-auto pt-8">
              <h3 className="text-3xl font-light tracking-tight">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{d.text}</p>
            </div>
          </article>
        ))}
      </Carousel>

      <div className="mt-10">
        <SectionHead eyebrow="Off the clock" title="Interests" />
        <Carousel cardClass="w-[80%] sm:w-[340px]">
          {interests.map((d) => (
            <article key={d.title} className={`${cardBase} min-h-[300px]`}>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-black/5">{d.emoji}</span>
              <div className="mt-auto pt-8">
                <h3 className="text-3xl font-light tracking-tight">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{d.text}</p>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { k: "Phone", v: profile.phoneDisplay, href: `tel:${profile.phone}` },
    { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
    { k: "LinkedIn", v: profile.linkedinDisplay, href: profile.linkedin },
    { k: "Website", v: profile.websiteDisplay, href: profile.website },
    { k: "Address", v: profile.address, href: "https://maps.google.com/?q=Al+Nahda+2+Dubai" },
  ];
  return (
    <section id="contact" className="mx-3 mb-3 sm:mx-5 sm:mb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-white sm:px-14 sm:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-lime/30 blur-[120px]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="font-serif text-xl italic text-white/60">/ Let’s talk</p>
            <h2 className="mt-3 text-5xl font-light leading-[1] tracking-tight sm:text-7xl">
              Let’s work <span className="font-serif italic text-lime">together.</span>
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Open to roles in operations, administration, sales support and digital content. Reach out and let’s make
              something run smoothly.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-8 py-5 font-medium text-ink transition hover:scale-[1.04]"
            >
              <Arrow /> Get in Touch
            </a>
          </Reveal>
          <Reveal delay={150}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {rows.map((r) => (
                <li key={r.k}>
                  <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between gap-4 py-5">
                    <span className="font-serif text-lg italic text-white/50">{r.k}</span>
                    <span className="break-all text-right text-base transition group-hover:text-lime sm:text-xl">{r.v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="relative mt-16 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name} · Computer Operator · Dubai
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="relative bg-[radial-gradient(60%_30%_at_80%_20%,rgba(180,242,60,0.12),transparent),radial-gradient(50%_25%_at_10%_55%,rgba(180,242,60,0.1),transparent)]">
      <Hero />
      <Marquee />
      <About />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <CertificatesSection />
      <BeyondSection />
      <div className="h-10" />
      <Contact />
    </main>
  );
}
