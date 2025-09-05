import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Smartphone, 
  Palette, 
  Zap, 
  Shield, 
  Code, 
  Search,
  Globe,
  Layers
} from "lucide-react"

export function FeatureGrid() {
  const features = [
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Perfect adaptation to all device sizes, optimal experience from mobile to desktop",
      category: "UI/UX"
    },
    {
      icon: Palette,
      title: "Dark Mode",
      description: "Built-in dark mode support, users can freely switch themes according to preferences",
      category: "Design"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Based on Next.js 14, supports server-side rendering and static generation for ultra-fast loading",
      category: "Performance"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Follows security best practices to protect user data and privacy",
      category: "Security"
    },
    {
      icon: Code,
      title: "TypeScript",
      description: "Full TypeScript support for better development experience and code quality",
      category: "Development"
    },
    {
      icon: Search,
      title: "SEO Optimized",
      description: "Built-in SEO best practices including meta tags, structured data, sitemap, and more",
      category: "SEO"
    },
    {
      icon: Globe,
      title: "Internationalization",
      description: "Multi-language support for easy creation of international products",
      category: "Features"
    },
    {
      icon: Layers,
      title: "Component-Based",
      description: "Highly modular component design with strong reusability for easy maintenance and expansion",
      category: "Architecture"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <Card key={feature.title} hover className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md w-fit mt-1">
                    {feature.category}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}