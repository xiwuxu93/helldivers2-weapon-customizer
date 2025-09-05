import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Single Converter", href: "/" },
        { name: "Batch Converter", href: "/batch" },
        { name: "Examples", href: "/examples" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "Blog", href: "/blog" }
      ]
    },
    support: {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "About Us", href: "/about" }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" }
      ]
    }
  }

  const socialLinks: any[] = []

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
            {/* 版权信息 */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>© 2025 Black And White Converter. All rights reserved.</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for image processing</span>
            </div>

          </div>

          {/* 友情链接 */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Featured On</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <a href="https://magicbox.tools" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://magicbox.tools/badge-dark.svg"
                      alt="Featured on MagicBox.tools"
                      width="200"
                      height="54"
                      className="transition-opacity hover:opacity-80"
                    />
                  </a>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <a href="https://dang.ai/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png"
                      alt="Dang.ai"
                      width="150"
                      height="54"
                      className="transition-opacity hover:opacity-80"
                    />
                  </a>
                  <a 
                    href="https://kontext-ai.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 border border-border rounded-md hover:border-foreground"
                  >
                    Kontext AI
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 额外信息 */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center text-xs text-muted-foreground">
              <p>This tool processes images locally in your browser - no data is uploaded to our servers.</p>
              <p>Your privacy is protected and your images remain completely private.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}