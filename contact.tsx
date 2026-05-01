"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
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
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

const TRUST_BADGES = [
  { icon: "⚡", text: "Odpovím do 24 hodin" },
  { icon: "🔒", text: "Bez závazků" },
  { icon: "✓",  text: "Bezplatná konzultace" },
]

export default function Contact() {
  const { t } = useLang()
  const c = t.contact

  const headRef  = useReveal(0)
  const leftRef  = useReveal(100)
  const rightRef = useReveal(200)

  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(c.errorTitle)
      setSent(true)
      setForm({ name: "", email: "", message: "" })
      setTimeout(() => setSent(false), 6000)
    } catch (err) {
      setError(err instanceof Error ? err.message : c.errorTitle)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (id: string) =>
    `w-full px-4 py-3.5 border bg-white text-[#111111] placeholder:text-[#bbbbbb] text-sm focus:outline-none transition-all duration-200 rounded-sm ${
      focused === id ? "border-[#111111]" : "border-[#e5e5e5] hover:border-[#bbbbbb]"
    }`

  return (
    <section id="kontakt" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: "translateY(24px)" }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px bg-[#1a56db]" />
          <span className="num-tag">{c.label}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div
            ref={leftRef}
            style={{ opacity: 0, transform: "translateY(28px)" }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-display font-black uppercase text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.01em] text-[#111111]">
              {c.line1}<br />
              <span className="text-[#1a56db]">{c.line2}</span>
            </h2>

            <p className="text-[1rem] text-[#888888] leading-relaxed max-w-sm">{c.body}</p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {TRUST_BADGES.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3 py-2 bg-[#f5f5f5] border border-[#e5e5e5] rounded-sm"
                >
                  <span className="text-sm">{icon}</span>
                  <span className="text-[0.72rem] font-semibold text-[#555555] tracking-wide">{text}</span>
                </div>
              ))}
            </div>

            {/* Availability indicator */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="ping-green absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-[0.75rem] text-[#555555] font-medium">
                Momentálně beru nové klienty
              </span>
            </div>

            <div className="flex flex-col gap-0 divide-y divide-[#e5e5e5]">
              {[
                { Icon: Mail,   label: c.emailLabel,    val: "websure.cz@gmail.com",   href: "mailto:websure.cz@gmail.com" },
                { Icon: Phone,  label: c.phoneLabel,    val: "+420 725 768 171",        href: "tel:+420725768171" },
                { Icon: MapPin, label: c.locationLabel, val: "Litoměřice, CZ",          href: null },
              ].map(({ Icon, label, val, href }) => {
                const inner = (
                  <div className="flex items-center gap-5 py-5">
                    <Icon size={16} className="text-[#1a56db] shrink-0" />
                    <div>
                      <p className="text-[0.65rem] text-[#888888] font-semibold tracking-[0.1em] uppercase mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-[#111111]">{val}</p>
                    </div>
                  </div>
                )
                return href ? (
                  <a key={label} href={href} className="hover:text-[#1a56db] transition-colors">{inner}</a>
                ) : (
                  <div key={label}>{inner}</div>
                )
              })}
            </div>
          </div>

          {/* Right — form */}
          <div
            ref={rightRef}
            style={{ opacity: 0, transform: "translateY(28px)" }}
            className="border border-[#e5e5e5] bg-white p-8 rounded-sm"
          >
            {sent ? (
              <div className="flex flex-col items-center gap-5 py-16 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#f0f9f4] border border-[#bbf5d4] rounded-sm">
                  <CheckCircle size={28} className="text-[#22c55e]" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#111111]">{c.successTitle}</p>
                  <p className="text-sm text-[#888888] mt-1">{c.successBody}</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-5 py-16 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#fef2f2] border border-[#fecaca] rounded-sm">
                  <AlertCircle size={28} className="text-[#dc2626]" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#111111]">{c.errorTitle}</p>
                  <p className="text-sm text-[#dc2626] mt-1">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-4 text-sm text-[#1a56db] font-semibold underline underline-offset-2"
                  >
                    {c.retryBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.7rem] font-semibold text-[#888888] tracking-[0.08em] uppercase">{c.nameLabel}</label>
                  <input
                    id="name" type="text" placeholder={c.namePlaceholder} required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    className={inputCls("name")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.7rem] font-semibold text-[#888888] tracking-[0.08em] uppercase">{c.emailInputLabel}</label>
                  <input
                    id="email" type="email" placeholder={c.emailPlaceholder} required
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    className={inputCls("email")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[0.7rem] font-semibold text-[#888888] tracking-[0.08em] uppercase">{c.messageLabel}</label>
                  <textarea
                    id="message" rows={4} placeholder={c.messagePlaceholder} required
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    className={`${inputCls("message")} resize-none`}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary group mt-1 justify-center">
                  <Send size={15} />
                  {loading ? c.sending : c.sendBtn}
                </button>
                <p className="text-center text-[0.7rem] text-[#bbbbbb]">{c.privacyNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  )
}
