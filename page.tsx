import { Mail, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "🔐 Ochrana osobních údajů",
      subtitle: "Jak s vašimi údaji zacházíme",
      content: [
        {
          heading: "Sbírané údaje",
          text: "Sbíráme vaše jméno, příjmení, e-mail, telefon, zprávy z formulářů a IP adresu pro komunikaci a poskytování služeb.",
        },
        {
          heading: "Účely zpracování",
          text: "Údaje používáme pro komunikaci se zákazníky, poptávky služeb, obchodní jednání a marketing (pouze s vaším souhlasem).",
        },
        {
          heading: "Doba uchování",
          text: "Údaje uchováváme po dobu komunikace a maximálně 10 let dle platné legislativy.",
        },
        {
          heading: "Vaše práva",
          text: "Máte právo na přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování a stížnost u Úřadu pro ochranu osobních údajů.",
        },
      ],
    },
    {
      title: "🧾 GDPR & Cookies",
      subtitle: "Právní základ zpracování",
      content: [
        {
          heading: "Správce údajů",
          text: "Martin Lacko, IČO: 24332704, Litoměřice",
        },
        {
          heading: "Právní důvody zpracování",
          items: [
            "Oprávněný zájem (komunikace a obchod)",
            "Plnění smlouvy (domluvené služby)",
            "Souhlas (marketing)",
            "Zákonná povinnost (účetnictví)",
          ],
        },
        {
          heading: "Cookies na webu",
          text: "Používáme cookies pro funkčnost webu, analytiku a marketing. Cookies můžete přijmout, odmítnout nebo spravovat v nastavení prohlížeče.",
        },
        {
          heading: "Kontakt pro GDPR",
          text: "websure.cz@gmail.com",
        },
      ],
    },
    {
      title: "📍 Kontakt",
      subtitle: "Máte otázky?",
      content: [
        {
          heading: "E-mail",
          text: "websure.cz@gmail.com",
        },
        {
          heading: "Telefon",
          text: "+420 725 768 171",
        },
        {
          heading: "Lokace",
          text: "Litoměřice",
        },
      ],
    },
  ]

  return (
    <main className="bg-[#030a14] min-h-screen relative overflow-hidden">
      {/* Background breathing effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] animate-breathing"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10, 35, 80, 0.7) 0%, rgba(8, 28, 65, 0.5) 25%, rgba(5, 20, 50, 0.3) 50%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8 pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 font-bold text-sm tracking-wide transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Zpět na web
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95] mb-6">
              Zásady ochrany <br />
              <span className="text-gradient">osobních údajů</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Transparentnost a bezpečnost vašich údajů jsou pro nás prioritou. Přečtěte si, jak s vašimi informacemi zacházíme.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-32 max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-white/40 text-lg">{section.subtitle}</p>
              </div>

              <div className="space-y-6">
                {section.content.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <h3 className="text-white font-bold text-lg mb-2">
                      {item.heading}
                    </h3>
                    {item.text && (
                      <p className="text-white/60 leading-relaxed">
                        {item.text}
                      </p>
                    )}
                    {item.items && (
                      <ul className="space-y-2 mt-3">
                        {item.items.map((listItem, listIdx) => (
                          <li
                            key={listIdx}
                            className="text-white/60 flex items-start gap-3"
                          >
                            <span className="text-[#3b6fd4] mt-1.5">•</span>
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer CTA */}
          <div className="mt-16 p-8 rounded-3xl border border-[#3b6fd4]/30 bg-gradient-to-br from-[#0e2040]/60 to-[#0a1628]/40">
            <h3 className="text-2xl font-bold text-white mb-3">
              Máte dotaz?
            </h3>
            <p className="text-white/50 mb-6">
              Kontaktujte nás a ochotně vám všechno vysvětlíme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:websure.cz@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3b6fd4] text-white font-bold text-sm tracking-wide hover:bg-[#2d4fa8] transition-all duration-200"
              >
                <Mail size={16} />
                Napsat e-mail
              </a>
              <a
                href="tel:+420725768171"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-bold text-sm tracking-wide hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                <Phone size={16} />
                +420 725 768 171
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
