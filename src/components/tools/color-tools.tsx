"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { copyToClipboard } from "@/lib/utils"
import { colorTools } from "@/lib/frontend-tools"
import { Palette, Copy, RotateCcw, Hash } from "lucide-react"

export function ColorTools() {
  const [selectedColor, setSelectedColor] = React.useState('#3B82F6')
  const [hexInput, setHexInput] = React.useState('#3B82F6')
  const [rgbValues, setRgbValues] = React.useState({ r: 59, g: 130, b: 246 })
  const [hslValues, setHslValues] = React.useState({ h: 217, s: 91, l: 60 })
  const [colorPalette, setColorPalette] = React.useState<string[]>([])
  const [paletteCount, setPaletteCount] = React.useState(5)

  const updateColor = (hex: string) => {
    try {
      const rgb = colorTools.hexToRgb(hex)
      if (rgb) {
        setSelectedColor(hex)
        setHexInput(hex)
        setRgbValues(rgb)
        setHslValues(colorTools.rgbToHsl(rgb.r, rgb.g, rgb.b))
        setColorPalette(colorTools.generatePalette(hex, paletteCount))
      }
    } catch (error) {
      console.error('Invalid color:', error)
    }
  }

  const updateFromRgb = (r: number, g: number, b: number) => {
    const hex = colorTools.rgbToHex(r, g, b)
    updateColor(hex)
  }

  const handleHexChange = (value: string) => {
    setHexInput(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      updateColor(value)
    }
  }

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      console.log('Copied to clipboard')
    }
  }

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()
    updateColor(randomHex)
  }

  const reset = () => {
    updateColor('#3B82F6')
    setPaletteCount(5)
  }

  React.useEffect(() => {
    updateColor(selectedColor)
  }, [paletteCount])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary-600" />
            <span>Color Tools</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Convert between color formats, generate palettes, and work with color values
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Color Picker */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Color Picker</CardTitle>
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => updateColor(e.target.value)}
                  className="h-16 w-16 rounded-lg border border-gray-300 cursor-pointer"
                />
                <div className="flex-1">
                  <div 
                    className="h-16 rounded-lg border border-gray-300"
                    style={{ backgroundColor: selectedColor }}
                  />
                </div>
              </div>
              
              <Button onClick={generateRandomColor} variant="outline" className="w-full">
                Generate Random Color
              </Button>
            </CardContent>
          </Card>

          {/* Color Formats */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Color Formats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* HEX */}
              <div className="space-y-2">
                <label className="text-sm font-medium">HEX:</label>
                <div className="flex space-x-2">
                  <Input
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                    placeholder="#000000"
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(hexInput)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* RGB */}
              <div className="space-y-2">
                <label className="text-sm font-medium">RGB:</label>
                <div className="grid grid-cols-4 gap-2">
                  <Input
                    type="number"
                    value={rgbValues.r}
                    onChange={(e) => updateFromRgb(Number(e.target.value), rgbValues.g, rgbValues.b)}
                    min={0}
                    max={255}
                    placeholder="R"
                    className="text-center"
                  />
                  <Input
                    type="number"
                    value={rgbValues.g}
                    onChange={(e) => updateFromRgb(rgbValues.r, Number(e.target.value), rgbValues.b)}
                    min={0}
                    max={255}
                    placeholder="G"
                    className="text-center"
                  />
                  <Input
                    type="number"
                    value={rgbValues.b}
                    onChange={(e) => updateFromRgb(rgbValues.r, rgbValues.g, Number(e.target.value))}
                    min={0}
                    max={255}
                    placeholder="B"
                    className="text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* HSL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">HSL:</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                    hsl({hslValues.h}°, {hslValues.s}%, {hslValues.l}%)
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Color Palette */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Color Palette</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Count:</span>
                  <Input
                    type="number"
                    value={paletteCount}
                    onChange={(e) => setPaletteCount(Number(e.target.value))}
                    min={3}
                    max={10}
                    className="w-16 text-center"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {colorPalette.map((color, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => updateColor(color)}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-mono">{color}</div>
                      <div className="text-xs text-muted-foreground">
                        Shade {index + 1}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(color)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Color Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Color Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Color Formats</h4>
                  <p className="text-sm text-muted-foreground">
                    Convert between HEX, RGB, and HSL color formats. Click any palette color to select it.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">🎨 HEX</Badge>
                    <Badge variant="secondary">🔴 RGB</Badge>
                    <Badge variant="secondary">🌈 HSL</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Palette Generator</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate color palettes based on your selected color. Perfect for design systems and themes.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">🎭 Shades</Badge>
                    <Badge variant="secondary">🎨 Design</Badge>
                    <Badge variant="secondary">⚡ Instant</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}