"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

const STAT_VALUES = ["150+", "150+", "98 %", "8"]

export default function Testimonials() {
  const { t } = useLang()
  const tr = t.testimonials

  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const headRef = useReveal(0)
  const bodyRef = useReveal(150)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (idx: number) => {
    if (fading) return
    setFading(true)
    setTimeout(() => { setActive(idx); setFading(false) }, 220)
  }

  const reset = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive((p) => (p + 1) % tr.items.length)
        setFading(false)
      }, 220)
    }, 6000)
  }

  const prev = () => { go((active - 1 + tr.items.length) % tr.items.length); reset() }
  const next = () => { go((active + 1) % tr.items.length); reset() }

  useEffect(() => {
    reset()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tr.items.length])

  // Keep active index within bounds when language changes (all langs have same count)
  const item = tr.items[active] ?? tr.items[0]

  return (
    <section id="reference" className="relative py-28 bg-[#f8f8f8] overflow-hidden">
      <div className="absolute inset-0 bg-grid-dense pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={headRef}
          style={{ opacity: 0, transform: "translateY(24px)" }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px bg-[#1a56db]" />
          <span className="num-tag">{tr.label}</span>
        </div>

        <div
          ref={bodyRef}
          style={{ opacity: 0, transform: "translateY(28px)" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Quote side */}
          <div className="flex flex-col gap-8">
            <span className="text-[6rem] leading-none font-bold text-[#e5e5e5] select-none">&ldquo;</span>

            <blockquote
              className="text-[1.35rem] font-medium text-[#111111] leading-[1.5] tracking-[-0.015em] transition-opacity duration-200"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {item.quote}
            </blockquote>

            <div
              className="flex items-center gap-4 transition-opacity duration-200"
              style={{ opacity: fading ? 0 : 1 }}
            >
              <div className="w-10 h-10 bg-[#1a56db] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {item.name.split(" ").map((w: string) => w[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">{item.name}</p>
                <p className="text-xs text-[#888888]">{item.role}</p>
              </div>
              <span className="ml-auto text-xs font-bold text-[#1a56db] border border-[#1a56db]/20 px-3 py-1 bg-[#1a56db]/5 shrink-0">
                {item.metric}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-[#e5e5e5] bg-white hover:border-[#111111] transition-colors duration-200"
                aria-label={tr.prev}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-[#e5e5e5] bg-white hover:border-[#111111] transition-colors duration-200"
                aria-label={tr.next}
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex items-center gap-2 ml-2">
                {tr.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { go(i); reset() }}
                    className={`h-1 rounded-none transition-all duration-300 ${i === active ? "w-6 bg-[#111111]" : "w-2 bg-[#cccccc] hover:bg-[#888888]"}`}
                    aria-label={`${tr.label} ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {tr.statLabels.map((label, i) => (
              <div key={label} className="bg-white border border-[#e5e5e5] p-6 flex flex-col gap-1">
                <span className="text-[2rem] font-bold tracking-[-0.03em] text-[#111111]">{STAT_VALUES[i]}</span>
                <span className="text-xs text-[#888888] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  )
}
