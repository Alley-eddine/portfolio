"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { useTranslations } from "next-intl"

export function ContactSection() {
  const t = useTranslations("contact")
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 max-w-12 bg-primary" />
            <span className="font-mono text-sm text-primary">04</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mb-12 max-w-xl text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-none">
                <h3 className="mb-6 text-lg font-semibold text-foreground">
                  {t("info")}
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t("email")}</p>
                      <p className="text-sm text-muted-foreground">contact@monportfolio.dev</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <MapPin size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t("location")}</p>
                      <p className="text-sm text-muted-foreground">{t("locationValue")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-none">
                <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                  {t("findMe")}
                </h3>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/40 hover:text-primary"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-none">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle size={32} className="text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{t("sent")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("sentDescription")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-300 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder={t("namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-300 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder={t("emailPlaceholder")}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t("subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder={t("subjectPlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-300 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_2px_8px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                  >
                    <Send size={16} />
                    {t("send")}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
