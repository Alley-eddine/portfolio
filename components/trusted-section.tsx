"use client"

import { useTranslations } from "next-intl"
import { AnimatedSection } from "./animated-section"

const clients = [
  { name: "Boucherie Chayma", logo: "/logos/boucherie-chayma.svg", invertDark: false },
  { name: "Bensow Auto", logo: "/logos/bensow-auto.png", invertDark: false },
  { name: "Maison Claire Conciergerie", logo: "/logos/mcc.png", invertDark: false },
  { name: "Colors Paint", logo: "/logos/colors-paint.png", invertDark: false },
  { name: "Ouvertures Pro", logo: "/logos/ouvertures-pro.png", invertDark: false },
  { name: "Dawn Martins", logo: "/logos/dawn-martins.svg", invertDark: true },
]

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-12 sm:gap-16">
      {clients.map((client) => (
        <div key={client.name} className="flex items-center gap-3 transition-all duration-300 opacity-40 grayscale hover:opacity-70 hover:grayscale-0">
          <img
            src={client.logo}
            alt={client.name}
            className={`h-8 max-w-[120px] w-auto object-contain sm:h-10 ${client.invertDark ? "dark:invert" : ""}`}
            draggable={false}
          />
          <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">{client.name}</span>
        </div>
      ))}
    </div>
  )
}

export function TrustedSection() {
  const t = useTranslations("trusted")

  return (
    <section className="relative py-12 sm:py-16">
      <AnimatedSection>
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-border" />
          <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground/50 uppercase">
            {t("title")}
          </p>
          <div className="h-px w-8 bg-border" />
        </div>
      </AnimatedSection>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex gap-12 animate-marquee sm:gap-16">
          <MarqueeRow />
          <MarqueeRow />
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>
    </section>
  )
}
