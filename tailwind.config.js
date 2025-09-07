/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#e6f3ff',
          100: '#b3d9ff', 
          200: '#80bfff',
          300: '#4da5ff',
          400: '#1a8bff',
          500: '#0066cc',  // Super Earth Blue
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001429',
          950: '#000714',
        },
        // 功能色彩
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        warning: {
          50: '#fffdf0',
          100: '#fffae0',
          200: '#fff2b3',
          300: '#ffe980',
          400: '#ffd700',  // Super Earth Gold/Yellow
          500: '#ffcc00',
          600: '#e6b800',
          700: '#cc9900',
          800: '#996600',
          900: '#664400',
          950: '#332200',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#ff6b6b',
          500: '#ff4444',  // Super Earth Red (alert/danger)
          600: '#e63946',
          700: '#cc2936',
          800: '#b91c26',
          900: '#990f17',
          950: '#4d080b',
        },
        // 灰度系统 - 支持深色模式
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Helldivers 2 游戏配色
        helldiver: {
          blue: {
            50: '#e6f3ff',
            100: '#cce6ff',
            200: '#99ccff', 
            300: '#66b3ff',
            400: '#3399ff',
            500: '#0066cc',  // Super Earth Blue
            600: '#0052a3',
            700: '#003d7a',
            800: '#002952',
            900: '#001429',
          },
          yellow: {
            50: '#fffdf0',
            100: '#fffae0',
            200: '#fff5cc',
            300: '#ffeb99',
            400: '#ffd700',  // Super Earth Gold
            500: '#ffcc00',
            600: '#e6b800',
            700: '#cc9900',
            800: '#b38600',
            900: '#996600',
          },
          red: {
            50: '#fff0f0',
            100: '#ffe0e0',
            200: '#ffcccc',
            300: '#ff9999',
            400: '#ff6666',
            500: '#ff4444',  // Alert Red
            600: '#e63946',
            700: '#cc2936',
            800: '#b91c26',
            900: '#990f17',
          },
          steel: {
            50: '#f8f9fa',
            100: '#e9ecef',
            200: '#dee2e6',
            300: '#ced4da',
            400: '#adb5bd',
            500: '#6c757d',  // Steel Gray
            600: '#495057',
            700: '#343a40',
            800: '#212529',
            900: '#1a1d20',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'monospace'],
        military: ['Rajdhani', 'Orbitron', 'system-ui', 'sans-serif'], // 军事科幻风格字体
        display: ['Exo 2', 'Orbitron', 'system-ui', 'sans-serif'], // 标题字体
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px  
        'base': '1rem',      // 16px - 正文默认
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px - 小标题
        '3xl': '1.875rem',   // 30px - 大标题
        '4xl': '2.25rem',    // 36px - 页面标题
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
      },
      spacing: {
        '18': '4.5rem',     // 72px
        '88': '22rem',      // 352px
        '112': '28rem',     // 448px
        '128': '32rem',     // 512px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',   // 2px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
        'full': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { 
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
          },
          '50%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
          },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}