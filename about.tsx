"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
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

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true
        const dur = 1600
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - t, 3)
          setN(Math.floor(ease * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function About() {
  const { t } = useLang()
  const a = t.about

  const headRef = useReveal(0)
  const leftRef = useReveal(100)

  return (
    <section id="o-nas" className="relative py-28 bg-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: "translateY(24px)" }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px bg-[#1a56db]" />
          <span className="num-tag">{a.label}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div
            ref={leftRef}
            style={{ opacity: 0, transform: "translateY(28px)" }}
            className="lg:sticky lg:top-28 flex flex-col gap-8"
          >
            <h2 className="font-display font-black uppercase text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.01em] text-[#111111]">
              {a.line1}<br />
              <span className="text-[#1a56db]">{a.line2}</span>
            </h2>

            <p className="text-[1rem] text-[#888888] leading-relaxed max-w-sm">
              {a.body}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#e5e5e5]">
              {[
                { n: 150, s: "+", l: a.stat1l },
                { n: 8,   s: "",  l: a.stat2l },
                { n: 98,  s: "%", l: a.stat3l },
              ].map((st) => (
                <div key={st.l} className="flex flex-col gap-1 items-center text-center">
                  <span className="font-display text-[2.5rem] font-black leading-none tracking-[-0.025em] text-[#111111] tabular-nums stat-underline">
                    <Counter target={st.n} suffix={st.s} />
                  </span>
                  <span className="text-xs text-[#888888] font-medium mt-2">{st.l}</span>
                </div>
              ))}
            </div>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#1a56db] transition-colors duration-200 mt-2 group"
            >
              {a.meetCta}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-2">
            {a.pillars.map((p, i) => (
              <PillarRow key={p.num} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  )
}

function PillarRow({
  pillar,
  index,
}: {
  pillar: { num: string; title: string; desc: string }
  index: number
}) {
  const ref = useReveal(index * 80)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 400)
  }

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(20px)" }}
      onClick={handleClick}
      className={`group flex items-start gap-5 px-5 py-6 cursor-pointer select-none rounded-sm border transition-all duration-200 ${
        clicked
          ? "bg-white border-[#1a56db] shadow-[0_6px_24px_rgba(26,86,219,0.12)]"
          : "bg-white/60 border-[#e5e5e5] hover:bg-white hover:border-[#c8d0e0] hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
      }`}
    >
      <span className={`num-tag w-8 shrink-0 pt-0.5 transition-colors duration-200 ${clicked ? "text-[#1a56db]" : ""}`}>
        {pillar.num}
      </span>
      <div className="flex flex-col gap-2 flex-1">
        <h4 className="text-base font-semibold text-[#111111] group-hover:text-[#1a56db] transition-colors duration-200">
          {pillar.title}
        </h4>
        <p className="text-sm text-[#888888] leading-relaxed">{pillar.desc}</p>
      </div>
      <ArrowRight
        size={14}
        className={`shrink-0 mt-1 transition-all duration-300 ${
          clicked ? "opacity-100 translate-x-1 text-[#1a56db]" : "opacity-0 group-hover:opacity-60 text-[#888888]"
        }`}
      />
    </div>
  )
}
