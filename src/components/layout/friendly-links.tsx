import Link from "next/link"

export function FriendlyLinks() {
  const friendlyLinks = [
    {
      name: "Image Compressor",
      href: "https://imagecompressor.com",
      description: "Online image compression tool"
    },
    {
      name: "Photo Editor",
      href: "https://photoeditor.com", 
      description: "Professional photo editing online"
    },
    {
      name: "Color Picker",
      href: "https://colorpicker.com",
      description: "Advanced color picker tool"
    },
    {
      name: "Image Resizer",
      href: "https://imageresizer.com",
      description: "Resize images online instantly"
    },
    {
      name: "Background Remover",
      href: "https://backgroundremover.com",
      description: "Remove image backgrounds automatically"
    },
    {
      name: "Image Converter",
      href: "https://imageconverter.com",
      description: "Convert images to any format"
    },
    {
      name: "PDF Tools",
      href: "https://pdftools.com",
      description: "PDF conversion and editing tools"
    },
    {
      name: "Text Tools",
      href: "https://texttools.com",
      description: "Text processing and formatting tools"
    }
  ]

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Recommended Tools
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {friendlyLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 text-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all"
              title={link.description}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Discover more useful online tools for your creative workflow
        </p>
      </div>
    </section>
  )
}