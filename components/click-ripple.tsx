"use client"

import { useState, useCallback, type CSSProperties } from "react"

interface RipplePoint {
  id: number
  x: number
  y: number
}

interface ClickRippleProps {
  numCircles?: number
  circleSize?: number
  opacity?: number
  className?: string
}

let rippleId = 0

export function ClickRipple({
  numCircles = 5,
  circleSize = 30,
  opacity = 0.1,
  className,
}: ClickRippleProps) {
  const [ripples, setRipples] = useState<RipplePoint[]>([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = ++rippleId

      setRipples((prev) => [...prev, { id, x, y }])
    },
    []
  )

  return (
    <div
      className={`absolute inset-0 cursor-pointer ${className ?? ""}`}
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none absolute"
          style={{ left: ripple.x, top: ripple.y }}
        >
          {Array.from({ length: numCircles }, (_, i) => {
            const size = circleSize + i * 60
            const ringOpacity = opacity - i * 0.015
            return (
              <div
                key={i}
                className="absolute rounded-full border border-foreground/30"
                style={
                  {
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: Math.max(ringOpacity, 0.02),
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, hsl(var(--primary) / ${Math.max(ringOpacity * 0.3, 0.005)}) 0%, transparent 70%)`,
                  } as CSSProperties
                }
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
