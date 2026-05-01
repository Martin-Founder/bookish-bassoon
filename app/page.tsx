"use client"

import { LangProvider } from "@/lib/lang-context"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </LangProvider>
  )
}
