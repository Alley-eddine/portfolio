"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronRight, X } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github?: string
  live?: string
  image: string
  accent: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complete avec panier, paiement Stripe et dashboard admin.",
    longDescription:
      "Application e-commerce full-stack avec authentification, gestion de catalogue, panier dynamique, integration Stripe pour les paiements, et un tableau de bord administrateur complet. Deploye sur Vercel avec Supabase pour la base de donnees et Redis pour le caching.",
    tech: ["Next.js", "React", "Supabase", "Redis", "Vercel", "Stripe"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "/projects/ecommerce.jpg",
    accent: "hsl(168 80% 58%)",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Application de gestion de projets en temps reel avec tableaux Kanban.",
    longDescription:
      "Outil de gestion de taches collaboratif inspire de Trello avec drag-and-drop, notifications en temps reel via WebSockets, assignation de membres, filtres avances et synchronisation multi-utilisateurs. Backend Express avec MongoDB.",
    tech: ["Vue.js", "Node.js", "Express", "MongoDB", "Docker"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "/projects/taskmanager.jpg",
    accent: "hsl(200 80% 55%)",
  },
  {
    id: 3,
    title: "Blog CMS Headless",
    description: "CMS headless complet avec Payload CMS, Astro en front et deploy Cloudflare.",
    longDescription:
      "Systeme de gestion de contenu headless utilisant Payload CMS pour le back-office avec un frontend Astro ultra-rapide. Deploiement automatise sur Cloudflare Pages avec pipeline CI/CD via GitHub Actions. Integration Keystatic pour l'edition en ligne.",
    tech: ["Astro", "Payload CMS", "Keystatic", "PostgreSQL", "Cloudflare"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "/projects/blog-api.jpg",
    accent: "hsl(350 80% 55%)",
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    description: "Tableau de bord interactif avec visualisations de donnees en temps reel.",
    longDescription:
      "Dashboard analytique avec graphiques interactifs, filtres dynamiques, export de rapports, notifications intelligentes, et integration avec plusieurs sources de donnees. Construit avec Next.js, Supabase pour le temps reel et Redis pour le caching.",
    tech: ["React", "Next.js", "Supabase", "Redis", "Vercel"],
    category: "Frontend",
    github: "#",
    live: "#",
    image: "/projects/dashboard.jpg",
    accent: "hsl(45 80% 55%)",
  },
  {
    id: 5,
    title: "API Microservices",
    description: "Architecture microservices pour plateforme sociale avec messagerie temps reel.",
    longDescription:
      "Architecture microservices pour une plateforme sociale avec gestion du feed algorithmique, messagerie temps reel, systeme de followers, notifications push et moderation de contenu. Orchestre avec Docker et deploye via CI/CD GitHub Actions.",
    tech: ["Node.js", "Express", "MongoDB", "Redis", "Docker", "GitHub Actions"],
    category: "Backend",
    github: "#",
    image: "/projects/social-api.jpg",
    accent: "hsl(168 80% 58%)",
  },
  {
    id: 6,
    title: "Portfolio Generator",
    description: "Generateur de portfolios dynamiques avec CMS headless et deploy automatise.",
    longDescription:
      "Application SaaS permettant de creer des portfolios personnalises avec un editeur visuel, themes customisables, SEO automatique via Astro, gestion du contenu avec Keystatic et deploiement automatique sur Vercel ou Cloudflare.",
    tech: ["Next.js", "Astro", "Keystatic", "Supabase", "Vercel"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "/projects/portfolio-gen.jpg",
    accent: "hsl(280 80% 55%)",
  },
  {
    id: 7,
    title: "Real-time Chat App",
    description: "Application de chat en temps reel avec WebSockets et notifications push.",
    longDescription:
      "Application de chat en temps reel avec systeme de messagerie instantanee, notifications push, gestion des utilisateurs connectes, et interface utilisateur moderne. Construite avec React, Node.js, Express et Socket.IO.",
    tech: ["React", "Node.js", "Express", "Socket.IO", "MongoDB"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "/projects/chat-app.jpg",
    accent: "hsl(200 80% 55%)",
  },
  {
    id: 8,
    title: "Event Booking System",
    description: "Systeme de reservation d'evenements avec calendrier interactif et paiement en ligne.",
    longDescription:
      "Systeme de reservation d'evenements avec calendrier interactif, gestion des places, integration Stripe pour les paiements, et tableau de bord administrateur pour la gestion des evenements. Construit avec Vue.js pour le frontend et Laravel pour le backend.",
    tech: ["Vue.js", "Laravel", "MySQL", "Stripe", "Vercel"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "/projects/event-booking.jpg",
    accent: "hsl(350 80% 55%)",
  }
]

const categories = ["Tous", "Full Stack", "Frontend", "Backend"]

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.button
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full overflow-hidden rounded-xl border border-border bg-card text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-none transition-all duration-500 hover:border-primary/30 hover:shadow-[0_4px_24px_hsl(var(--primary)/0.1)]"
    >
      {/* Image preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`Preview de ${project.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute right-3 top-3">
          <span className="rounded-md bg-card/80 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
          <ChevronRight
            size={16}
            className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
          />
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-xs text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-none"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-xs text-muted-foreground">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={`Preview de ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-card hover:text-foreground"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-md bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
              {project.category}
            </span>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-foreground">{project.title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>

          <div className="mb-6">
            <h4 className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-3 text-sm font-medium text-foreground shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/40"
              >
                <Github size={16} />
                Code source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground shadow-[0_2px_8px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              >
                <ExternalLink size={16} />
                Voir le projet
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projets" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 max-w-12 bg-primary" />
            <span className="font-mono text-sm text-primary">02</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Mes Projets
          </h2>
          <p className="mb-10 max-w-xl text-muted-foreground leading-relaxed">
            {"Une selection de projets qui illustrent mon expertise en developpement full stack, du concept a la mise en production."}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-[0_2px_12px_hsl(var(--primary)/0.3)]"
                    : "border border-border bg-secondary text-muted-foreground shadow-sm dark:shadow-none hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
