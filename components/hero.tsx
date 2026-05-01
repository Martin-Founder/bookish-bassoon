"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useLang } from "@/lib/lang-context"

// ─── Ambient orbs (nahradily emoji) ──────────────────────────────────────────
const ORBS = [
  { size: 280, x: "78%",  y: "-8%",  color: "rgba(26,86,219,0.08)",  blur: 80,  parallax: 6 },
  { size: 180, x: "-4%",  y: "60%",  color: "rgba(26,86,219,0.06)",  blur: 60,  parallax: 10 },
  { size: 120, x: "88%",  y: "72%",  color: "rgba(17,17,17,0.04)",   blur: 40,  parallax: 14 },
]

const CLIENT_NAMES = ["Firma A", "Studio B", "Brand C", "Agency D", "Firma E"]

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(28px)"
    const id = setTimeout(() => {
      el.style.transition = "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, delay)
    return () => clearTimeout(id)
  }, [delay])
  return ref
}

function useRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const fire = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const id = Date.now()
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700)
  }, [])
  return { ripples, fire }
}

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  const tagRef    = useReveal(150)
  const h1Ref     = useReveal(300)
  const subRef    = useReveal(480)
  const ctaRef    = useReveal(620)
  const statsRef  = useReveal(800)
  const clientRef = useReveal(960)

  const sectionRef = useRef<HTMLElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMouse({
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const { ripples, fire } = useRipple()

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-grid flex flex-col overflow-hidden cursor-default select-none"
      onClick={fire}
    >
      {/* Ambient orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            transform: `translate(${mouse.x * orb.parallax}px, ${mouse.y * (orb.parallax * 0.7)}px)`,
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}

      {/* Click ripples */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="pointer-events-none absolute z-20 ripple-burst"
          style={{ left: rp.x, top: rp.y }}
        />
      ))}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-36 pb-28 relative z-30">

        {/* Label */}
        <div ref={tagRef} className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-[#1a56db]" />
          <span className="num-tag text-[#1a56db]">{h.label}</span>
        </div>

        {/* Headline */}
        <div ref={h1Ref}>
          <h1
            className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#111111]"
            style={{ fontSize: "clamp(3.8rem, 12vw, 10.5rem)" }}
          >
            <span className="font-display" style={{ fontWeight: 200, opacity: 0.5 }}>
              {h.line1.split(" ")[0]}
            </span>
            {h.line1.split(" ").length > 1 && (
              <>{" "}{h.line1.split(" ").slice(1).join(" ")}</>
            )}
            <br />
            <span className="hero-line2-shimmer">{h.line2}</span>
          </h1>
        </div>

        {/* Sub */}
        <div ref={subRef} className="mt-8 max-w-lg">
          <p className="text-[1.05rem] text-[#444444] leading-relaxed font-normal select-text">
            {h.sub}
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <Link href="#kontakt" className="btn-primary group">
            {h.cta1}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link href="#sluzby" className="btn-outline group">
            {h.cta2}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-20 pt-8 border-t border-[#e5e5e5] flex flex-wrap gap-12"
        >
          {[
            { val: h.stat1v, label: h.stat1l },
            { val: h.stat2v, label: h.stat2l },
            { val: h.stat3v, label: h.stat3l },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1 items-start">
              <span className="font-display text-[2.8rem] font-black leading-none tracking-[-0.03em] text-[#111111] tabular-nums stat-underline">
                {s.val}
              </span>
              <span className="text-xs text-[#888888] font-medium tracking-wide mt-2">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Client / logo bar */}
        <div ref={clientRef} className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="text-[0.65rem] tracking-[0.16em] uppercase text-[#aaaaaa] mb-5 font-semibold">
            Důvěřují nám
          </p>
          <div className="flex flex-wrap items-center gap-8 opacity-40 grayscale">
            {CLIENT_NAMES.map((name) => (
              <span
                key={name}
                className="text-[0.82rem] font-bold tracking-[0.06em] text-[#111111] uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-30">
        <div className="w-px h-10 bg-[#111111] animate-pulse" />
        <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[#111111]">{h.scroll}</span>
      </div>

      <div className="section-divider" />
    </section>
  )
}
