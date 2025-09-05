# Frontend Tools Hub

> A modern, privacy-first collection of frontend tools built with Next.js 14. Fast, reliable, and secure - all processing happens locally in your browser.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🚀 **Modern Tech Stack** - Next.js 14 + React 18 + TypeScript
- 🎨 **Beautiful Design** - Responsive design with Tailwind CSS
- 🌓 **Dark Mode** - Seamless light/dark theme switching
- 📱 **Mobile Friendly** - Perfect on all device sizes
- 🔧 **Component Library** - Highly reusable component system
- 🛡️ **Type Safe** - Complete TypeScript type definitions
- 🎯 **SEO Optimized** - Built-in SEO best practices
- ⚡ **High Performance** - SSG/SSR support and code splitting
- 🔒 **Privacy First** - All processing happens locally
- 🔄 **Easily Extensible** - Modular architecture for easy customization

## 🎯 Use Cases

Perfect for building:
- Text processing utilities
- Image editing tools
- Data conversion tools
- Color utilities
- Encoding/decoding tools
- Hash generators
- Code formatters
- And any other frontend-only tools

## 📦 Tech Stack

### Core Framework
- **Next.js 14** - Full-stack React framework
- **React 18** - UI library with concurrent features
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme switching

### State Management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling

### Tools & Configuration
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **class-variance-authority** - Component variant management

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/frontend-tools-hub.git
cd frontend-tools-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Build for Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
frontend-tools-hub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── tools/             # Tools page
│   ├── components/            # Components directory
│   │   ├── ui/                # Base UI components
│   │   ├── tools/             # Tool-specific components
│   │   ├── layout/            # Layout components
│   │   └── providers/         # Provider components
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts           # Common utilities
│   │   └── frontend-tools.ts  # Tool implementations
│   ├── types/                 # TypeScript type definitions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## 🛠️ Available Tools

### Text Tools
- **Text Statistics** - Word count, character count, reading time
- **Case Converter** - Upper, lower, title, camel, pascal, snake, kebab case
- **Text Cleaner** - Remove extra whitespace and normalize formatting
- **URL Extractor** - Extract all URLs from text
- **Email Extractor** - Extract all email addresses from text

### Image Tools
- **Image Resizer** - Resize images while maintaining aspect ratio
- **Format Converter** - Convert between JPEG, PNG, and WebP
- **Filter Application** - Apply grayscale, sepia, blur, brightness, contrast filters
- **Batch Processing** - Process multiple images at once

### Data Tools
- **CSV ↔ JSON** - Convert between CSV and JSON formats
- **JSON Formatter** - Format and beautify JSON
- **JSON Minifier** - Minify JSON for production
- **JSON Validator** - Validate JSON syntax

### Encoding Tools
- **URL Encoding** - Encode/decode URLs
- **Base64 Conversion** - Encode/decode Base64
- **HTML Entities** - Encode/decode HTML entities
- **Hash Generator** - Generate SHA-256 hashes
- **Random String** - Generate secure random strings
- **UUID Generator** - Generate UUID v4

### Color Tools
- **Color Converter** - Convert between HEX, RGB, HSL
- **Palette Generator** - Generate color palettes
- **Color Picker** - Interactive color selection

## 🎨 Customization

### Changing Colors

Update the color scheme in `tailwind.config.js`:

```javascript
primary: {
  50: '#your-color-50',
  500: '#your-primary-color',
  // ... other shades
}
```

### Adding New Tools

1. Create a new tool component in `src/components/tools/`
2. Add tool logic to `src/lib/frontend-tools.ts`
3. Register the tool in `src/components/frontend-tools-hub.tsx`

### Example New Tool

```tsx
// src/components/tools/my-tool.tsx
export function MyTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const processInput = () => {
    // Your tool logic here
    setOutput(processedResult)
  }

  return (
    // Your tool UI here
  )
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Site configuration
NEXT_PUBLIC_SITE_NAME=Frontend Tools Hub
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### SEO Configuration

Update metadata in `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Your Tools Hub',
  description: 'Your description',
  keywords: ['tools', 'utilities', 'frontend'],
  // ... other metadata
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy with one click

### Other Platforms

- **Netlify** - Supports static export
- **Docker** - Dockerfile included
- **Traditional Servers** - PM2 deployment supported

### Static Export

```bash
# Generate static site
npm run build

# Export static files to out/ directory
npm run export
```

## 📈 Performance Features

### Code Splitting
- Page-level automatic code splitting
- Component lazy loading
- Dynamic imports

### Image Optimization
- Next.js Image component
- WebP format support
- Responsive images

### SEO Optimization
- Automatic sitemap generation
- robots.txt configuration
- Structured data
- Open Graph tags

## 🔮 Future Plans - AI Integration

This template is designed with future AI tool integration in mind:

- **Modular Architecture** - Easy to add AI processing endpoints
- **Component Abstraction** - UI components work with both frontend and AI tools
- **Type Safety** - Ready for AI service integrations
- **Error Handling** - Robust error handling for API calls

### Planned AI Tools
- 🤖 AI Image Enhancement
- 📝 Smart Text Generation
- 🌐 Language Translation
- 🎨 Creative AI Tools

## 🛡️ Privacy & Security

- **Local Processing** - All current tools run entirely in your browser
- **No Data Collection** - Your data never leaves your device
- **Open Source** - Transparent and auditable code
- **HTTPS Only** - Secure connections enforced

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Vercel](https://vercel.com/) - Excellent deployment platform

---

If this template helps you build amazing tools, please give it a ⭐️!

Have questions or suggestions? Feel free to [create an issue](../../issues) or reach out to us.

## 🔗 Links

- 📖 [Documentation](./USAGE.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 📋 [Changelog](./CHANGELOG.md)
- 💬 [Discussions](../../discussions)