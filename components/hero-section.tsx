"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { TextAnimate } from "@/components/ui/text-animate"
import { AuroraText } from "@/components/ui/aurora-text"
import { Ripple } from "@/components/ui/ripple"
import { ClickRipple } from "@/components/click-ripple"

const titles = [
  "React & Next.js",
  "Vue.js & Astro",
  "Node.js & Express",
  "Laravel & Payload CMS",
  "Supabase & PostgreSQL",
  "Vercel & Cloudflare",
  "Docker & DevOps",
]

function TypingAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = titles[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1))
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % titles.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex])

  return (
    <span className="text-primary">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-primary ml-0.5 align-middle"
      />
    </span>
  )
}

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Static ripple background */}
      <Ripple mainCircleSize={150} mainCircleOpacity={0.08} numCircles={6} className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      {/* Interactive click ripples */}
      <ClickRipple numCircles={6} circleSize={40} opacity={0.15} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 shadow-sm dark:shadow-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <TextAnimate
            as="span"
            by="character"
            animation="blurIn"
            delay={0.2}
            duration={0.5}
            startOnView={false}
            className="text-sm text-primary"
          >
            {t("available")}
          </TextAnimate>
        </motion.div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <TextAnimate
            as="span"
            by="word"
            animation="blurInUp"
            delay={0.1}
            duration={0.8}
            startOnView={false}
            className="text-foreground"
          >
            {t("developer")}
          </TextAnimate>
          <br />
          <AuroraText
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            colors={["#8b5cf6", "#6366f1", "#0ea5e9", "#8b5cf6"]}
            speed={0.8}
          >
            {t("fullStack")}
          </AuroraText>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-10 font-mono text-lg sm:text-xl md:text-2xl"
        >
          <TypingAnimation />
        </motion.div>

        <TextAnimate
          as="p"
          by="word"
          animation="fadeIn"
          delay={0.6}
          duration={1}
          startOnView={false}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("description")}
        </TextAnimate>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projets"
            className="w-full rounded-lg bg-primary px-8 py-3.5 text-center text-sm font-medium text-primary-foreground shadow-[0_2px_8px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] sm:w-auto"
          >
            {t("viewProjects")}
          </a>
          <a
            href="#contact"
            className="w-full rounded-lg border border-border bg-secondary px-8 py-3.5 text-center text-sm font-medium text-foreground shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/40 hover:bg-secondary/80 sm:w-auto"
          >
            {t("contactMe")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:ben.alleycom@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
