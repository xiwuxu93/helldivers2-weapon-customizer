# Helldivers 2 Weapon Customizer

> The ultimate Helldivers 2 weapon customization tool. Build perfect loadouts, compare weapon stats, and dominate the battlefield with data-driven weapon builds.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🎯 **Complete Weapon Database** - All primary, secondary, and support weapons
- 🔧 **Advanced Customization** - Full attachment system with compatibility checking
- 📊 **Detailed Statistics** - Damage, accuracy, range, and more weapon stats
- 🎨 **Beautiful Interface** - Modern, responsive design with dark/light modes
- 📱 **Mobile Optimized** - Perfect experience on all devices
- ⚡ **Lightning Fast** - Built with Next.js 14 for maximum performance
- 🔍 **Smart Filtering** - Find weapons by category, warbond, tier, and more
- 💾 **Save & Share** - Save favorite builds and share with your squad

## 🎮 Weapon Categories

Comprehensive support for:
- **Primary Weapons** - Assault rifles, SMGs, shotguns, and more
- **Secondary Weapons** - Pistols, machine pistols, and sidearms
- **Support Weapons** - Heavy weapons and special equipment
- **All Warbonds** - Free weapons plus all premium Warbond content

## 📦 Tech Stack

- **Next.js 14** - Modern React framework with App Router
- **React 18** - Latest React with concurrent features  
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/helldivers2-weapon-customizer.git
cd helldivers2-weapon-customizer

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
helldivers2-weapon-customizer/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with SEO
│   │   └── page.tsx           # Main weapon customizer
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components
│   │   ├── weapons/           # Weapon-specific components
│   │   ├── layout/            # Layout components
│   │   └── providers/         # Context providers
│   ├── lib/                   # Utility functions
│   │   └── helldivers-data.ts # Weapon data management
│   └── types/                 # TypeScript definitions
├── public/
│   └── helldivers2/           # Game data and assets
└── package.json
```

## 🎯 Core Features

### Weapon Database
- Complete weapon stats and information
- All primary, secondary, and support weapons
- Regular updates with game patches

### Customization System  
- Attachment compatibility checking
- Real-time stat calculations
- Visual weapon previews

### Advanced Filtering
- Filter by category, warbond, tier
- Search by weapon name
- Quick filter shortcuts

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables if needed
4. Deploy with one click

### Other Options

- **Netlify** - Great for static export
- **Traditional Servers** - Works with any Node.js hosting

## 📈 Performance & SEO

### Built-in SEO
- Comprehensive meta tags and Open Graph
- Structured data for search engines
- Optimized for Helldivers 2 weapon searches
- Mobile-first responsive design

### Performance Features
- Next.js 14 App Router for speed
- Component lazy loading
- Optimized weapon data loading
- Progressive Web App ready

## 🎮 Game Data

The weapon database includes:
- **70+ Primary Weapons** across all categories
- **25+ Secondary Weapons** including sidearms
- **15+ Support Weapons** and heavy equipment
- **50+ Attachments** with compatibility system
- **All Warbonds** including free and premium content

Data is regularly updated to match game patches and balance changes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-weapon-stats`)
3. Make your changes
4. Test the build: `npm run build`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🎯 For Helldivers

*For Super Earth! Use this tool to build the perfect loadout and bring managed democracy to the galaxy.*

---

If this tool helps you dominate the battlefield, please give it a ⭐️!