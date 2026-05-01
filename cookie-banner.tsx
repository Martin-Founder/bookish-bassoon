"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useLang } from "@/lib/lang-context"

export default function CookieBanner() {
  const { t } = useLang()
  const c = t.cookie

  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const id = setTimeout(() => {
        setVisible(true)
        setTimeout(() => setMounted(true), 20)
      }, 2000)
      return () => clearTimeout(id)
    }
  }, [])

  const dismiss = (val: "accepted" | "declined") => {
    setMounted(false)
    setTimeout(() => {
      localStorage.setItem("cookie-consent", val)
      setVisible(false)
    }, 350)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 transition-all duration-350 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="bg-white border border-[#e5e5e5] shadow-xl shadow-black/5 p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="text-sm font-bold text-[#111111]">{c.title}</p>
          <button
            onClick={() => dismiss("declined")}
            className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-[#111111] transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-xs text-[#888888] leading-relaxed mb-4">{c.body}</p>

        <div className="flex gap-2">
          <button
            onClick={() => dismiss("accepted")}
            className="flex-1 py-2.5 bg-[#111111] text-white text-xs font-semibold hover:bg-[#1a56db] transition-colors duration-200"
          >
            {c.accept}
          </button>
          <button
            onClick={() => dismiss("declined")}
            className="flex-1 py-2.5 border border-[#e5e5e5] text-[#888888] text-xs font-medium hover:border-[#111111] hover:text-[#111111] transition-colors duration-200"
          >
            {c.decline}
          </button>
        </div>

        <p className="mt-3 text-center text-[0.65rem] text-[#cccccc]">
          {c.privacyPrefix}{" "}
          <a href="/privacy-policy" className="text-[#1a56db] hover:underline">
            {c.privacyLink}
          </a>
        </p>
      </div>
    </div>
  )
}
