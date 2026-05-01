"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { useLang } from "@/lib/lang-context"

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, delay)
        obs.unobserve(el)
      }
    }, { threshold: 0.06 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

type PkgType = {
  name: string
  price: string
  desc: string
  features: string[]
  highlight?: boolean
  badge?: string
}

function PriceCard({
  pkg,
  index,
  interestedLabel,
}: {
  pkg: PkgType
  index: number
  interestedLabel: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const revealRef = useReveal(index * 80)

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [flash, setFlash] = useState(false)

  // Merge both refs
  const setRef = (el: HTMLDivElement | null) => {
    ;(wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    ;(revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8
    setTilt({ x, y })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })
  const handleClick = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 380)
  }

  const isHighlight = !!pkg.highlight

  return (
    <div
      ref={setRef}
      style={{ opacity: 0, transform: "translateY(28px)", perspective: "700px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <div
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.18s ease-out",
        }}
        className={`relative flex flex-col gap-6 p-7 overflow-hidden rounded-sm h-full transition-all duration-200 ${
          isHighlight
            ? "bg-[#1a56db] text-white shadow-[0_16px_48px_rgba(26,86,219,0.40)]"
            : `bg-white border-[1.5px] shadow-[0_4px_16px_rgba(0,0,0,0.07)] ${flash ? "border-[#1a56db]" : "border-[#c8d0e0]"} hover:border-[#1a56db] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]`
        } ${flash && !isHighlight ? "ring-2 ring-[#1a56db]/30" : ""}`}
      >
        {/* Highlight shimmer overlay */}
        {isHighlight && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        )}

        {pkg.badge && (
          <span className={`absolute top-4 right-4 flex items-center gap-1 text-[0.62rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm ${
            isHighlight ? "bg-white/20 text-white" : "bg-[#1a56db] text-white"
          }`}>
            <Sparkles size={9} />
            {pkg.badge}
          </span>
        )}

        {/* Name + desc */}
        <div className="flex flex-col gap-1.5 pt-1">
          <h4 className={`text-lg font-bold tracking-[-0.02em] ${isHighlight ? "text-white" : "text-[#111111]"}`}>
            {pkg.name}
          </h4>
          <p className={`text-[0.8rem] leading-relaxed ${isHighlight ? "text-white/70" : "text-[#666666]"}`}>
            {pkg.desc}
          </p>
        </div>

        {/* Price */}
        <div className={`text-[1.75rem] font-extrabold tracking-[-0.03em] ${isHighlight ? "text-white" : "text-[#111111]"}`}>
          {pkg.price}
        </div>

        {/* Divider */}
        <div className={`h-px ${isHighlight ? "bg-white/20" : "bg-[#e2e8f0]"}`} />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {pkg.features.map((f) => (
            <li key={f} className={`flex items-start gap-3 text-sm ${isHighlight ? "text-white/85" : "text-[#333333]"}`}>
              <Check size={14} className={`shrink-0 mt-0.5 ${isHighlight ? "text-white" : "text-[#1a56db]"}`} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="#kontakt"
          onClick={(e) => e.stopPropagation()}
          className={`group mt-1 flex items-center justify-center gap-2 py-3 text-sm font-bold tracking-wide rounded-sm transition-all duration-200 ${
            isHighlight
              ? "bg-white text-[#1a56db] hover:bg-[#f0f5ff]"
              : "bg-[#111111] text-white hover:bg-[#1a56db]"
          }`}
        >
          {interestedLabel}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  )
}

export default function Packages() {
  const { t } = useLang()
  const p = t.packages

  const headRef    = useReveal(0)
  const webHeadRef = useReveal(0)
  const socHeadRef = useReveal(0)
  const bundleRef  = useReveal(100)

  return (
    <section id="cenik" className="relative py-28 bg-grid-cool overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <div
          ref={headRef}
          style={{ opacity: 0, transform: "translateY(24px)" }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px bg-[#1a56db]" />
          <span className="text-[0.7rem] font-bold tracking-[0.18em] text-[#1a56db] uppercase">{p.label}</span>
        </div>

        {/* Headline */}
        <div className="mb-20">
          <h2 className="font-display font-black uppercase text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.01em] text-[#111111]">
            {p.line1}<br />
            <span className="text-[#1a56db]">{p.line2}</span>
          </h2>
          <p className="mt-4 text-sm text-[#666666] max-w-md leading-relaxed">{p.note}</p>
        </div>

        {/* Web packages */}
        <div className="mb-20">
          <div
            ref={webHeadRef}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="flex items-baseline gap-4 mb-8 pb-5 border-b-2 border-[#1a56db]/20"
          >
            <h3 className="text-base font-extrabold text-[#111111] tracking-[-0.01em] uppercase">{p.webTitle}</h3>
            <span className="text-xs text-[#888888] font-medium">{p.webSub}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {p.webPackages.map((pkg, i) => (
              <PriceCard key={pkg.name} pkg={pkg} index={i} interestedLabel={p.interested} />
            ))}
          </div>
        </div>

        {/* Social packages */}
        <div className="mb-20">
          <div
            ref={socHeadRef}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="flex items-baseline gap-4 mb-8 pb-5 border-b-2 border-[#1a56db]/20"
          >
            <h3 className="text-base font-extrabold text-[#111111] tracking-[-0.01em] uppercase">{p.socialTitle}</h3>
            <span className="text-xs text-[#888888] font-medium">{p.socialSub}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {p.socialPackages.map((pkg, i) => (
              <PriceCard key={pkg.name} pkg={pkg} index={i} interestedLabel={p.interested} />
            ))}
          </div>
        </div>

        {/* Bundle CTA */}
        <div
          ref={bundleRef}
          style={{ opacity: 0, transform: "translateY(28px)" }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 bg-[#111111] border border-[#111111] rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#1a56db]">{p.bundleLabel}</span>
            <h4 className="text-lg font-bold text-white tracking-[-0.02em]">{p.bundleTitle}</h4>
            <p className="text-sm text-white/55 max-w-lg">{p.bundleBody}</p>
          </div>
          <Link
            href="#kontakt"
            className="group flex items-center gap-2 px-6 py-3.5 bg-[#1a56db] text-white text-sm font-bold rounded-sm shrink-0 whitespace-nowrap hover:bg-[#1648c0] transition-colors duration-200"
          >
            {p.bundleCta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  )
}
