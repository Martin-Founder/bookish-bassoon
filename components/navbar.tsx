"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { LANGS, Lang } from "@/lib/translations"

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const lastY = useRef(0)
  const [visible, setVisible] = useState(true)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setVisible(y < 60 || y < lastY.current)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const navLinks = [
    { label: t.nav.about,      href: "#o-nas" },
    { label: t.nav.services,   href: "#sluzby" },
    { label: t.nav.pricing,    href: "#cenik" },
    { label: t.nav.references, href: "#reference" },
  ]

  const currentLang = LANGS.find((l) => l.code === lang)!

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-white/96 backdrop-blur-md navbar-scrolled"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 group shrink-0">
          <span className="font-display text-[1.25rem] font-black tracking-[-0.01em] text-[#111111] uppercase">WEBSURE</span>
          <span className="font-display text-[1.25rem] font-black text-[#1a56db]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.8rem] font-medium text-[#888888] hover:text-[#111111] tracking-[0.04em] uppercase transition-colors duration-200 underline-grow"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-[0.75rem] font-semibold text-[#888888] hover:text-[#111111] border border-[#e5e5e5] hover:border-[#111111] transition-all duration-200 tracking-[0.06em] uppercase rounded-sm"
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute top-full right-0 mt-2 bg-white border border-[#e5e5e5] shadow-lg shadow-black/5 overflow-hidden transition-all duration-200 rounded-sm ${
                langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ minWidth: "110px" }}
            >
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code as Lang); setLangOpen(false) }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.75rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-150 text-left ${
                    l.code === lang
                      ? "bg-[#111111] text-white"
                      : "text-[#888888] hover:text-[#111111] hover:bg-[#f5f5f5]"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href="#kontakt" className="btn-primary group">
            {t.nav.cta}
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-[#111111]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-[#e5e5e5] overflow-hidden transition-all duration-300 ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-[#444444] hover:text-[#111111] border-b border-[#f0f0f0] transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 pt-5 pb-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[0.7rem] font-bold tracking-[0.06em] uppercase border transition-all duration-150 rounded-sm ${
                  l.code === lang
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "text-[#888888] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>

          <Link
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 justify-center"
          >
            {t.nav.cta}
            <ArrowUpRight size={14} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
