"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Sun, 
  Moon, 
  Menu, 
  X
} from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: "Overview", href: "/#overview" },
    { name: "Weapons", href: "/#weapon-customizer-section" },
    { name: "Factions", href: "/#enemy-factions" },
    { name: "Missions", href: "/#mission-planning" },
    { name: "Stratagems", href: "/#stratagem-playbook" },
    { name: "FAQ", href: "/#faq" }
  ]

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-helldiver-blue-400/30 bg-helldiver-steel-50/95 dark:bg-helldiver-steel-900/95 backdrop-blur supports-[backdrop-filter]:bg-helldiver-steel-50/80 command-panel">
      <div className="container flex h-20 items-center justify-between">
        {/* Super Earth Command Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="HD2 Arsenal Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black text-super-earth">
                HD2 ARSENAL
              </span>
              <span className="text-xs font-military text-helldiver-steel-600 dark:text-helldiver-steel-400 -mt-1 uppercase tracking-wider">
                SUPER EARTH COMMAND
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Command Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Command Switch */}
          {mounted && (
            <Button
              className="btn-outline border-helldiver-yellow-400 text-helldiver-yellow-600 hover:bg-helldiver-yellow-50 dark:hover:bg-helldiver-yellow-900/20"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          )}


          {/* Mobile Command Menu */}
          <Button
            className="md:hidden btn-outline border-helldiver-blue-400 text-helldiver-blue-600"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
