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
  X, 
  ChevronDown,
  Image as ImageIcon,
  HelpCircle,
  Info,
  Shield,
  FileText
} from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Batch Converter", href: "/batch" },
    { name: "Examples", href: "/examples" },
    { name: "How to Use", href: "/how-to-use" },
    { name: "Blog", href: "/blog" },
    {
      name: "More",
      href: "#",
      children: [
        { name: "FAQ", href: "/faq", icon: HelpCircle, description: "Common questions answered" },
        { name: "About Us", href: "/about", icon: Info, description: "Our story and mission" },
        { name: "Privacy Policy", href: "/privacy", icon: Shield, description: "How we protect your data" },
        { name: "Terms of Service", href: "/terms", icon: FileText, description: "Usage terms and conditions" }
      ]
    }
  ]

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo和品牌名 */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="BW Converter Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">BW</span>
              <span className="text-xl font-light text-gray-600 dark:text-gray-400">Converter</span>
            </div>
          </Link>
        </div>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.children ? (
                <div className="relative">
                  <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* 下拉菜单 */}
                  <div className="absolute top-full left-0 mt-1 w-64 py-2 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex items-start px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group/item"
                        >
                          {ChildIcon && <ChildIcon className="w-4 h-4 mr-3 mt-0.5 text-muted-foreground group-hover/item:text-foreground" />}
                          <div>
                            <div className="font-medium">{child.name}</div>
                            {child.description && (
                              <div className="text-xs text-muted-foreground mt-0.5">{child.description}</div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* 右侧操作按钮 */}
        <div className="flex items-center space-x-2">
          {/* 主题切换 */}
          {mounted && (
            <Button
              variant="ghost"
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


          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="ml-4 space-y-2">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {ChildIcon && <ChildIcon className="w-4 h-4 mr-2" />}
                            {child.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}