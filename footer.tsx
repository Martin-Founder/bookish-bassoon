"use client"

import Link from "next/link"
import { Linkedin, Facebook, Instagram } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const socials = [
  { Icon: Linkedin,  href: "#", label: "LinkedIn" },
  { Icon: Facebook,  href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
]

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const nav = t.nav

  const navLinks = [
    { label: nav.about,      href: "#o-nas" },
    { label: nav.services,   href: "#sluzby" },
    { label: nav.pricing,    href: "#cenik" },
    { label: nav.references, href: "#reference" },
    { label: nav.cta,        href: "#kontakt" },
  ]

  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-16 pb-12 border-b border-white/10">
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="font-display text-[1.35rem] font-black tracking-[-0.01em] uppercase">
              WEBSURE<span className="text-[#1a56db]">.</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">{f.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-medium text-white/40 hover:text-white uppercase tracking-[0.06em] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p className="text-[0.7rem] text-white/30">{f.copy}</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="text-[0.7rem] text-white/30 hover:text-white/60 transition-colors duration-200">
              {f.privacy}
            </Link>
            <Link href="/terms" className="text-[0.7rem] text-white/30 hover:text-white/60 transition-colors duration-200">
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
