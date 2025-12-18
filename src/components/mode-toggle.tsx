"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const modes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Laptop, label: "System" },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = theme === mode.name
        
        return (
          <button
            key={mode.name}
            onClick={() => setTheme(mode.name)}
            className={`
              group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
              ${isActive 
                ? "border-foreground bg-accent text-accent-foreground" 
                : "border-transparent bg-muted text-muted-foreground hover:scale-105"}
            `}
            title={mode.label}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{mode.label}</span>
          </button>
        )
      })}
    </div>
  )
}
