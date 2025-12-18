"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { useTheme } from "next-themes"

const themes = [
  {
    name: "Zinc",
    activeColor: "240 5.9% 10%",
    cssVars: {
      light: {
        "--primary": "240 5.9% 10%",
        "--primary-foreground": "0 0% 98%",
        "--ring": "240 5.9% 10%",
      },
      dark: {
        "--primary": "0 0% 98%",
        "--primary-foreground": "240 5.9% 10%",
        "--ring": "240 4.9% 83.9%",
      },
    },
  },
  {
    name: "Red",
    activeColor: "0 72.2% 50.6%",
    cssVars: {
      light: {
        "--primary": "0 72.2% 50.6%",
        "--primary-foreground": "0 85.7% 97.3%",
        "--ring": "0 72.2% 50.6%",
      },
      dark: {
        "--primary": "0 72.2% 50.6%",
        "--primary-foreground": "0 85.7% 97.3%",
        "--ring": "0 72.2% 50.6%",
      },
    },
  },
  {
    name: "Orange",
    activeColor: "24.6 95% 53.1%",
    cssVars: {
      light: {
        "--primary": "24.6 95% 53.1%",
        "--primary-foreground": "60 9.1% 97.8%",
        "--ring": "24.6 95% 53.1%",
      },
      dark: {
        "--primary": "20.5 90.2% 48.2%",
        "--primary-foreground": "60 9.1% 97.8%",
        "--ring": "24.6 95% 53.1%",
      },
    },
  },
  {
    name: "Green",
    activeColor: "142.1 76.2% 36.3%",
    cssVars: {
      light: {
        "--primary": "142.1 76.2% 36.3%",
        "--primary-foreground": "355.7 100% 97.3%",
        "--ring": "142.1 76.2% 36.3%",
      },
      dark: {
        "--primary": "142.1 70.6% 45.3%",
        "--primary-foreground": "144.9 80.4% 10%",
        "--ring": "142.1 70.6% 45.3%",
      },
    },
  },
  {
    name: "Blue",
    activeColor: "221.2 83.2% 53.3%",
    cssVars: {
      light: {
        "--primary": "221.2 83.2% 53.3%",
        "--primary-foreground": "210 40% 98%",
        "--ring": "221.2 83.2% 53.3%",
      },
      dark: {
        "--primary": "217.2 91.2% 59.8%",
        "--primary-foreground": "222.2 47.4% 11.2%",
        "--ring": "217.2 91.2% 59.8%",
      },
    },
  },
  {
    name: "Violet",
    activeColor: "262.1 83.3% 57.8%",
    cssVars: {
      light: {
        "--primary": "262.1 83.3% 57.8%",
        "--primary-foreground": "210 40% 98%",
        "--ring": "262.1 83.3% 57.8%",
      },
      dark: {
        "--primary": "263.4 70% 50.4%",
        "--primary-foreground": "210 40% 98%",
        "--ring": "263.4 70% 50.4%",
      },
    },
  },
]

export function ThemeCustomizer() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [activeTheme, setActiveTheme] = React.useState("Zinc")

  React.useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("custom-theme")
    if (savedTheme) {
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (themeName: string) => {
    const selectedTheme = themes.find((t) => t.name === themeName)
    if (!selectedTheme) return

    setActiveTheme(themeName)
    localStorage.setItem("custom-theme", themeName)

    const vars = selectedTheme.cssVars
    const styleId = "custom-theme-styles"
    let styleTag = document.getElementById(styleId)
    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = styleId
      document.head.appendChild(styleTag)
    }

    styleTag.innerHTML = `
      :root {
        --primary: ${vars.light["--primary"]};
        --primary-foreground: ${vars.light["--primary-foreground"]};
        --ring: ${vars.light["--ring"]};
      }
      .dark {
        --primary: ${vars.dark["--primary"]};
        --primary-foreground: ${vars.dark["--primary-foreground"]};
        --ring: ${vars.dark["--ring"]};
      }
    `
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {themes.map((theme) => {
        const isActive = activeTheme === theme.name
        return (
          <button
            key={theme.name}
            onClick={() => applyTheme(theme.name)}
            className={`
              group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
              ${isActive 
                ? "border-neutral-900 dark:border-white" 
                : "border-transparent hover:scale-105"}
            `}
            style={{ backgroundColor: `hsl(${theme.activeColor})` }}
            title={theme.name}
          >
            {isActive && (
              <Check className="h-5 w-5 text-white mix-blend-difference" />
            )}
            <span className="sr-only">{theme.name}</span>
          </button>
        )
      })}
    </div>
  )
}
