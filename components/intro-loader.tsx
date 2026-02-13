"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const SPLIT_DELAY = 0.8
const SPLIT_DURATION = 1.5
const EXIT_DELAY = SPLIT_DELAY + SPLIT_DURATION + 0.6
const TOTAL = EXIT_DELAY + 1.0

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const t = useTranslations("intro")
  const [phase, setPhase] = useState<"intro" | "split" | "exit">("intro")
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const t1 = setTimeout(() => setPhase("split"), SPLIT_DELAY * 1000)
    const t2 = setTimeout(() => setPhase("exit"), EXIT_DELAY * 1000)
    const t3 = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ""
      onComplete()
    }, TOTAL * 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      document.body.style.overflow = ""
    }
  }, [onComplete])

  if (!visible) return null

  const isSplit = phase === "split" || phase === "exit"
  const isExit = phase === "exit"
  const panelWidth = isExit ? "0vw" : isSplit ? "35vw" : "50vw"
  const panelRadius = isSplit ? 24 : 0
  const duration = isExit ? 0.8 : SPLIT_DURATION

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Radial glow visible through the gap */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSplit && !isExit ? 0.12 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="h-[60vh] w-[30vw] rounded-full bg-primary blur-[100px]" />
      </motion.div>

      {/* ─── Left curtain ─── */}
      <motion.div
        className="absolute inset-y-0 left-0 z-10 flex items-center justify-end overflow-hidden bg-background"
        initial={{ width: "50vw" }}
        animate={{
          width: panelWidth,
          borderTopRightRadius: panelRadius,
          borderBottomRightRadius: panelRadius,
        }}
        transition={{ duration, ease }}
      >
        {/* Inner edge glow line */}
        <motion.div
          className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSplit && !isExit ? 1 : 0 }}
          transition={{ duration: 0.5, delay: isSplit ? 0.3 : 0 }}
        />
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isExit ? 0 : 1, y: 0 }}
          transition={{
            opacity: { duration: isExit ? 0.3 : 0.5 },
            y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="shrink-0 select-none text-[12vw] font-bold leading-none tracking-tighter text-foreground sm:text-[8vw] md:text-[6vw]"
        >
          Al
        </motion.span>
      </motion.div>

      {/* ─── Right curtain ─── */}
      <motion.div
        className="absolute inset-y-0 right-0 z-10 flex items-center justify-start overflow-hidden bg-background"
        initial={{ width: "50vw" }}
        animate={{
          width: panelWidth,
          borderTopLeftRadius: panelRadius,
          borderBottomLeftRadius: panelRadius,
        }}
        transition={{ duration, ease }}
      >
        {/* Inner edge glow line */}
        <motion.div
          className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSplit && !isExit ? 1 : 0 }}
          transition={{ duration: 0.5, delay: isSplit ? 0.3 : 0 }}
        />
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isExit ? 0 : 1, y: 0 }}
          transition={{
            opacity: { duration: isExit ? 0.3 : 0.5, delay: isExit ? 0 : 0.08 },
            y: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
          }}
          className="shrink-0 select-none text-[12vw] font-bold leading-none tracking-tighter text-foreground sm:text-[8vw] md:text-[6vw]"
        >
          leycom
        </motion.span>
      </motion.div>

      {/* ─── Bottom tagline (over panels) ─── */}
      <motion.p
        className="absolute bottom-[12vh] left-1/2 z-20 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-muted-foreground sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "split" ? 1 : 0 }}
        transition={{ duration: 0.5, delay: phase === "split" ? 0.6 : 0 }}
      >
        {t("tagline")}
      </motion.p>
    </div>
  )
}
