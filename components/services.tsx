"use client"

import { useEffect, useRef, useState } from "react"
import { Monitor, Share2, PenTool, Image, ArrowUpRight } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const ICONS = [Monitor, Share2, PenTool, Image]

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
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

export default function Services() {
  const { t } = useLang()
  const s = t.services
  const headRef = useReveal(0)
  const titleRef = useReveal(100)
  const [activeRow, setActiveRow] = useState<number | null>(null)

  return (
    <section id="sluzby" className="relative py-28 bg-grid-dark overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <div
          ref={headRef}
          style={{ opacity: 0, transform: "translateY(24px)" }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px bg-[#1a56db]" />
          <span className="text-[0.7rem] font-bold tracking-[0.18em] text-[#666666] uppercase">{s.label}</span>
        </div>

        {/* Headline */}
        <div
          ref={titleRef}
          style={{ opacity: 0, transform: "translateY(24px)" }}
          className="mb-16"
        >
          <h2 className="font-display font-black uppercase text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.01em] text-white">
            {s.line1}<br />
            <span className="text-[#1a56db]">{s.line2}</span>
          </h2>
        </div>

        {/* Service rows */}
        <div className="flex flex-col gap-3">
          {s.items.map((item, i) => (
            <ServiceRow
              key={item.num}
              item={item}
              index={i}
              iconIndex={i}
              moreLabel={s.more}
              isActive={activeRow === i}
              onActivate={() => setActiveRow(activeRow === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Bottom divider blending back to white */}
      <div className="mt-28 h-px w-full bg-white/10" />
    </section>
  )
}

function ServiceRow({
  item,
  index,
  iconIndex,
  moreLabel,
  isActive,
  onActivate,
}: {
  item: { num: string; title: string; desc: string; tags: string[] }
  index: number
  iconIndex: number
  moreLabel: string
  isActive: boolean
  onActivate: () => void
}) {
  const ref = useReveal(index * 100)
  const Icon = ICONS[iconIndex]

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(24px)" }}
      onClick={onActivate}
      className={`group flex flex-col md:flex-row md:items-center gap-5 md:gap-10 px-6 py-6 cursor-pointer rounded-sm border transition-all duration-300 ${
        isActive
          ? "bg-white border-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25"
      }`}
    >
      {/* Number */}
      <span className={`text-[0.65rem] font-bold tracking-[0.18em] uppercase w-8 shrink-0 transition-colors duration-200 ${
        isActive ? "text-[#1a56db]" : "text-white/30"
      }`}>
        {item.num}
      </span>

      {/* Icon box */}
      <div className={`w-10 h-10 shrink-0 flex items-center justify-center border rounded-sm transition-all duration-300 ${
        isActive
          ? "border-[#1a56db] bg-[#1a56db]"
          : "border-white/20 bg-white/5 group-hover:border-[#1a56db] group-hover:bg-[#1a56db]"
      }`}>
        <Icon size={18} className={`transition-colors duration-300 ${
          isActive ? "text-white" : "text-white/50 group-hover:text-white"
        }`} />
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col gap-1.5">
        <h3 className={`text-[1rem] font-semibold transition-colors duration-200 ${
          isActive ? "text-[#111111]" : "text-white group-hover:text-white"
        }`}>
          {item.title}
        </h3>
        <p className={`text-sm leading-relaxed max-w-xl transition-colors duration-200 ${
          isActive ? "text-[#555555]" : "text-white/50"
        }`}>
          {item.desc}
        </p>

        {/* Tags — slide in on active */}
        <div
          className="flex flex-wrap gap-2 mt-1 overflow-hidden transition-all duration-300"
          style={{ maxHeight: isActive ? "72px" : "0px", opacity: isActive ? 1 : 0 }}
        >
          {item.tags.map((tag, tagIdx) => (
            <span
              key={tag}
              className={`px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide rounded-sm ${
                tagIdx === 0
                  ? "bg-[#EEF4FF] text-[#1a56db] border border-[#C7D9F8]"
                  : "text-[#1a56db] border border-[#1a56db]/40 bg-[#1a56db]/8"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow CTA */}
      <a
        href="#kontakt"
        onClick={(e) => e.stopPropagation()}
        className={`shrink-0 w-10 h-10 flex items-center justify-center border rounded-sm transition-all duration-300 ${
          isActive
            ? "border-[#1a56db] bg-[#1a56db]"
            : "border-white/20 bg-white/5 group-hover:border-[#1a56db] group-hover:bg-[#1a56db]"
        }`}
        aria-label={`${moreLabel} — ${item.title}`}
      >
        <ArrowUpRight size={16} className={`transition-colors duration-300 ${
          isActive ? "text-white" : "text-white/40 group-hover:text-white"
        }`} />
      </a>
    </div>
  )
}
