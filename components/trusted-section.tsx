"use client"

import { useTranslations } from "next-intl"
import { AnimatedSection } from "./animated-section"

const clients = [
  { name: "TechVision", logo: "/logos/techvision.svg" },
  { name: "NovaSoft", logo: "/logos/novasoft.svg" },
  { name: "CloudPeak", logo: "/logos/cloudpeak.svg" },
  { name: "DataForge", logo: "/logos/dataforge.svg" },
  { name: "PixelCraft", logo: "/logos/pixelcraft.svg" },
  { name: "AppNest", logo: "/logos/appnest.svg" },
  { name: "CodeWave", logo: "/logos/codewave.svg" },
  { name: "BrightLoop", logo: "/logos/brightloop.svg" },
  { name: "SyncFlow", logo: "/logos/syncflow.svg" },
  { name: "NetPulse", logo: "/logos/netpulse.svg" },
  { name: "CyberEdge", logo: "/logos/cyberedge.svg" },
  { name: "FluxMedia", logo: "/logos/fluxmedia.svg" },
]

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-16 sm:gap-20">
      {clients.map((client) => (
        <img
          key={client.name}
          src={client.logo}
          alt={client.name}
          className="h-8 w-auto opacity-30 grayscale transition-all duration-300 hover:opacity-60 hover:grayscale-0 sm:h-9"
          draggable={false}
        />
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

        <div className="flex gap-16 animate-marquee sm:gap-20">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>
    </section>
  )
}
