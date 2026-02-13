"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")
  return (
    <footer className="border-t border-border px-6 py-8 shadow-[0_-1px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 border border-primary/20 shadow-sm dark:shadow-none">
            <span className="font-mono text-xs font-bold text-primary">{"</"}</span>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {t("rights")}
          </span>
        </div>

        <div className="flex items-center gap-3">
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
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 hover:text-primary"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
