"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, FolderOpen, Zap, Mail, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const navLinks = [
  { href: "#accueil", label: "Accueil", icon: Home },
  { href: "#projets", label: "Projets", icon: FolderOpen },
  { href: "#competences", label: "Compétences", icon: Zap },
  { href: "#contact", label: "Contact", icon: Mail },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#accueil")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  /* Track active section on scroll */
  const updateActive = useCallback(() => {
    const offsets = navLinks.map(({ href }) => {
      const el = document.querySelector(href)
      if (!el) return { href, top: Infinity }
      return { href, top: el.getBoundingClientRect().top }
    })
    const threshold = window.innerHeight * 0.35
    const current = offsets
      .filter((o) => o.top <= threshold)
      .sort((a, b) => b.top - a.top)[0]
    if (current) setActiveSection(current.href)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener("scroll", updateActive)
  }, [updateActive])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <>
      {/* ─── Desktop: vertical sidebar ─── */}
      <motion.nav
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1 md:flex"
      >
        {/* Glass pill container */}
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-border/50 bg-background/60 p-2 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:border-border/50">
          {/* Logo */}
          <a
            href="#accueil"
            className="group mb-1 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:border-primary/40"
          >
            <span className="font-mono text-xs font-bold text-primary transition-transform duration-300 group-hover:scale-110">
              {"</"}
            </span>
          </a>

          <div className="my-1 h-px w-6 bg-border/50" />

          {/* Nav items */}
          {navLinks.map((link, i) => {
            const Icon = link.icon
            const isActive = activeSection === link.href
            return (
              <div key={link.href} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute -left-[11px] h-5 w-[3px] rounded-r-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon size={19} strokeWidth={isActive ? 2.2 : 1.6} />
                </a>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, x: -6, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border/50 bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-xl shadow-lg"
                    >
                      {link.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 rotate-45 h-2 w-2 border-l border-b border-border/50 bg-background/95" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}

          <div className="my-1 h-px w-6 bg-border/50" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-all duration-300 hover:bg-muted/50 hover:text-foreground"
            aria-label="Changer de thème"
          >
            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile: floating bottom bar ─── */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      >
        <div className="flex items-center justify-around rounded-2xl border border-border/50 bg-background/80 px-2 py-2 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} className="relative z-10" />
                <span className="relative z-10 text-[10px] font-medium">{link.label}</span>
              </a>
            )
          })}
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-muted-foreground transition-all duration-300"
            aria-label="Changer de thème"
          >
            {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            <span className="text-[10px] font-medium">Thème</span>
          </button>
        </div>
      </motion.nav>
    </>
  )
}
