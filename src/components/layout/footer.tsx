import Link from "next/link"
import { Shield, Target } from "lucide-react"

export function Footer() {
  const footerLinks = {
    tools: {
      title: "Tools",
      links: [
        { name: "Weapon Customizer", href: "/" },
        { name: "Loadout Builder", href: "/" }
      ]
    },
    game: {
      title: "Helldivers 2",
      links: [
        { name: "All Weapons", href: "/" },
        { name: "Weapon Stats", href: "/" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Game Data", href: "/" },
        { name: "Community", href: "/" }
      ]
    }
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-border">
      <div className="container py-12">
        {/* 主要内容区域 */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="text-center">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>© 2025 HD2 Weapon Customizer. All rights reserved.</span>
              <span>Made for</span>
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Super Earth</span>
            </div>

          </div>

          {/* Game Disclaimer */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center text-xs text-muted-foreground">
              <p>This is an unofficial fan-made tool for Helldivers 2.</p>
              <p>Helldivers 2 is developed by Arrowhead Game Studios and published by Sony Interactive Entertainment.</p>
              <p>All game assets and trademarks belong to their respective owners.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}