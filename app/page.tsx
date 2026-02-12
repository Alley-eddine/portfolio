"use client"

import { useState, useCallback } from "react"
import { IntroLoader } from "@/components/intro-loader"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  const [loaderDone, setLoaderDone] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true)
  }, [])

  return (
    <>
      {!loaderDone && <IntroLoader onComplete={handleLoaderComplete} />}
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
