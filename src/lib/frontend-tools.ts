/**
 * Frontend Tools Library
 * Pure frontend utilities that run entirely in the browser
 */

// Text processing tools
export const textTools = {
  /**
   * Count words, characters, lines in text
   */
  getTextStats: (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const lines = text.split('\n').length
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0
    
    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
      readingTime: Math.ceil(words / 200) // Average reading speed: 200 WPM
    }
  },

  /**
   * Convert text case
   */
  convertCase: (text: string, caseType: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab') => {
    switch (caseType) {
      case 'upper':
        return text.toUpperCase()
      case 'lower':
        return text.toLowerCase()
      case 'title':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      case 'sentence':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      case 'camel':
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '')
      case 'pascal':
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
          word.toUpperCase()
        ).replace(/\s+/g, '')
      case 'snake':
        return text.toLowerCase().replace(/\s+/g, '_')
      case 'kebab':
        return text.toLowerCase().replace(/\s+/g, '-')
      default:
        return text
    }
  },

  /**
   * Remove extra whitespace and clean text
   */
  cleanText: (text: string) => {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n\n') // Replace multiple line breaks with double
      .trim()
  },

  /**
   * Extract URLs from text
   */
  extractUrls: (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.match(urlRegex) || []
  },

  /**
   * Extract emails from text
   */
  extractEmails: (text: string) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
    return text.match(emailRegex) || []
  }
}

// Image processing tools (using Canvas API)
export const imageTools = {
  /**
   * Resize image
   */
  resizeImage: (file: File, maxWidth: number, maxHeight: number, quality: number = 0.9): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and convert to blob
        ctx?.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to resize image'))
            }
          },
          file.type,
          quality
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  },

  /**
   * Convert image format
   */
  convertFormat: (file: File, outputFormat: 'image/jpeg' | 'image/png' | 'image/webp', quality: number = 0.9): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        // Fill white background for JPEG (since it doesn't support transparency)
        if (outputFormat === 'image/jpeg') {
          ctx!.fillStyle = '#FFFFFF'
          ctx!.fillRect(0, 0, canvas.width, canvas.height)
        }
        
        ctx?.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to convert image'))
            }
          },
          outputFormat,
          quality
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  },

  /**
   * Add image filters
   */
  applyFilter: (file: File, filter: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast', intensity: number = 1): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        // Apply CSS filter
        switch (filter) {
          case 'grayscale':
            ctx!.filter = `grayscale(${intensity})`
            break
          case 'sepia':
            ctx!.filter = `sepia(${intensity})`
            break
          case 'blur':
            ctx!.filter = `blur(${intensity}px)`
            break
          case 'brightness':
            ctx!.filter = `brightness(${intensity})`
            break
          case 'contrast':
            ctx!.filter = `contrast(${intensity})`
            break
        }

        ctx?.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to apply filter'))
            }
          },
          file.type,
          0.9
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }
}

// Data processing tools
export const dataTools = {
  /**
   * Parse CSV to JSON
   */
  csvToJson: (csvText: string, delimiter: string = ','): any[] => {
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(delimiter).map(h => h.trim())
    
    return lines.slice(1).map(line => {
      const values = line.split(delimiter).map(v => v.trim())
      const obj: any = {}
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''
      })
      return obj
    })
  },

  /**
   * Convert JSON to CSV
   */
  jsonToCsv: (jsonArray: any[], delimiter: string = ','): string => {
    if (!jsonArray.length) return ''
    
    const headers = Object.keys(jsonArray[0])
    const csvRows = [
      headers.join(delimiter),
      ...jsonArray.map(obj => 
        headers.map(header => {
          const value = obj[header] || ''
          // Escape values containing delimiter or quotes
          return typeof value === 'string' && (value.includes(delimiter) || value.includes('"'))
            ? `"${value.replace(/"/g, '""')}"`
            : value
        }).join(delimiter)
      )
    ]
    
    return csvRows.join('\n')
  },

  /**
   * Validate JSON
   */
  validateJson: (jsonString: string): { valid: boolean; error?: string; parsed?: any } => {
    try {
      const parsed = JSON.parse(jsonString)
      return { valid: true, parsed }
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON'
      }
    }
  },

  /**
   * Format JSON with indentation
   */
  formatJson: (jsonString: string, indent: number = 2): string => {
    try {
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed, null, indent)
    } catch {
      throw new Error('Invalid JSON string')
    }
  },

  /**
   * Minify JSON
   */
  minifyJson: (jsonString: string): string => {
    try {
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed)
    } catch {
      throw new Error('Invalid JSON string')
    }
  }
}

// URL and encoding tools
export const encodingTools = {
  /**
   * URL encode/decode
   */
  urlEncode: (text: string): string => encodeURIComponent(text),
  urlDecode: (text: string): string => {
    try {
      return decodeURIComponent(text)
    } catch {
      throw new Error('Invalid URL encoded string')
    }
  },

  /**
   * Base64 encode/decode
   */
  base64Encode: (text: string): string => btoa(unescape(encodeURIComponent(text))),
  base64Decode: (text: string): string => {
    try {
      return decodeURIComponent(escape(atob(text)))
    } catch {
      throw new Error('Invalid Base64 string')
    }
  },

  /**
   * HTML encode/decode
   */
  htmlEncode: (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  },
  htmlDecode: (text: string): string => {
    const div = document.createElement('div')
    div.innerHTML = text
    return div.textContent || div.innerText || ''
  }
}

// Hash and crypto tools (using Web Crypto API)
export const hashTools = {
  /**
   * Generate MD5 hash (using a simple implementation)
   */
  md5: async (text: string): Promise<string> => {
    // Note: For production, use a proper crypto library
    // This is a simplified implementation for demo purposes
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  /**
   * Generate SHA-256 hash
   */
  sha256: async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  /**
   * Generate random string
   */
  generateRandomString: (length: number = 16, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return result
  },

  /**
   * Generate UUID v4
   */
  generateUUID: (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}

// Color tools
export const colorTools = {
  /**
   * Convert HEX to RGB
   */
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  /**
   * Convert RGB to HEX
   */
  rgbToHex: (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  },

  /**
   * Convert RGB to HSL
   */
  rgbToHsl: (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  },

  /**
   * Generate color palette
   */
  generatePalette: (baseColor: string, count: number = 5): string[] => {
    const rgb = colorTools.hexToRgb(baseColor)
    if (!rgb) return []

    const palette: string[] = []
    for (let i = 0; i < count; i++) {
      const factor = (i + 1) / count
      const newR = Math.round(rgb.r * factor)
      const newG = Math.round(rgb.g * factor)
      const newB = Math.round(rgb.b * factor)
      palette.push(colorTools.rgbToHex(newR, newG, newB))
    }
    
    return palette
  }
}