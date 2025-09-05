"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { copyToClipboard } from "@/lib/utils"
import { encodingTools, hashTools } from "@/lib/frontend-tools"
import { Code, Copy, RotateCcw, Hash, Globe, Shield } from "lucide-react"

export function EncodingTools() {
  const [inputText, setInputText] = React.useState('')
  const [outputText, setOutputText] = React.useState('')
  const [selectedTool, setSelectedTool] = React.useState<string>('url-encode')
  const [randomLength, setRandomLength] = React.useState(16)
  const [error, setError] = React.useState('')

  const tools = [
    { id: 'url-encode', name: 'URL Encode', icon: Globe },
    { id: 'url-decode', name: 'URL Decode', icon: Globe },
    { id: 'base64-encode', name: 'Base64 Encode', icon: Code },
    { id: 'base64-decode', name: 'Base64 Decode', icon: Code },
    { id: 'html-encode', name: 'HTML Encode', icon: Code },
    { id: 'html-decode', name: 'HTML Decode', icon: Code },
    { id: 'sha256', name: 'SHA-256 Hash', icon: Hash },
    { id: 'random-string', name: 'Random String', icon: Shield },
    { id: 'uuid', name: 'Generate UUID', icon: Shield },
  ]

  const processText = async () => {
    setError('')
    
    try {
      switch (selectedTool) {
        case 'url-encode':
          setOutputText(inputText ? encodingTools.urlEncode(inputText) : '')
          break
        case 'url-decode':
          setOutputText(inputText ? encodingTools.urlDecode(inputText) : '')
          break
        case 'base64-encode':
          setOutputText(inputText ? encodingTools.base64Encode(inputText) : '')
          break
        case 'base64-decode':
          setOutputText(inputText ? encodingTools.base64Decode(inputText) : '')
          break
        case 'html-encode':
          setOutputText(inputText ? encodingTools.htmlEncode(inputText) : '')
          break
        case 'html-decode':
          setOutputText(inputText ? encodingTools.htmlDecode(inputText) : '')
          break
        case 'sha256':
          if (inputText) {
            const hash = await hashTools.sha256(inputText)
            setOutputText(hash)
          } else {
            setOutputText('')
          }
          break
        case 'random-string':
          setOutputText(hashTools.generateRandomString(randomLength))
          break
        case 'uuid':
          setOutputText(hashTools.generateUUID())
          break
        default:
          setOutputText('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing error')
      setOutputText('')
    }
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(outputText)
    if (success) {
      console.log('Copied to clipboard')
    }
  }

  const handleReset = () => {
    setInputText('')
    setOutputText('')
    setError('')
  }

  const handleGenerate = () => {
    if (selectedTool === 'random-string' || selectedTool === 'uuid') {
      processText()
    }
  }

  React.useEffect(() => {
    if (selectedTool !== 'random-string' && selectedTool !== 'uuid') {
      processText()
    }
  }, [inputText, selectedTool])

  React.useEffect(() => {
    if (selectedTool === 'uuid') {
      processText()
    }
  }, [selectedTool])

  const getCurrentTool = () => tools.find(t => t.id === selectedTool)
  const ToolIcon = getCurrentTool()?.icon || Code
  const needsInput = !['random-string', 'uuid'].includes(selectedTool)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-primary-600" />
            <span>Encoding & Hash Tools</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Encode, decode, hash, and generate secure strings for your applications
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {needsInput && (
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Input Text</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter text to encode/decode..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Select Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors text-left ${
                        selectedTool === tool.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4 text-primary-600" />
                      <span className="font-medium">{tool.name}</span>
                    </button>
                  )
                })}
              </div>

              {selectedTool === 'random-string' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">String Length:</label>
                    <Input
                      type="number"
                      value={randomLength}
                      onChange={(e) => setRandomLength(Number(e.target.value))}
                      min={1}
                      max={256}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={handleGenerate} className="w-full">
                    Generate Random String
                  </Button>
                </div>
              )}

              {selectedTool === 'uuid' && (
                <div className="pt-4 border-t">
                  <Button onClick={handleGenerate} className="w-full">
                    Generate New UUID
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <ToolIcon className="h-4 w-4 text-primary-600" />
                  <span>Output</span>
                </CardTitle>
                {outputText && (
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              ) : outputText ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono break-all">
                    {outputText}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ToolIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {needsInput 
                      ? 'Enter text to see the encoded/decoded result' 
                      : 'Click generate to create a new value'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tool Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{getCurrentTool()?.name}</h4>
                  {selectedTool.includes('url') && (
                    <p className="text-sm text-muted-foreground">
                      URL encoding converts special characters into percent-encoded format for safe transmission in URLs.
                    </p>
                  )}
                  {selectedTool.includes('base64') && (
                    <p className="text-sm text-muted-foreground">
                      Base64 encoding converts binary data to ASCII text format, commonly used for data transmission.
                    </p>
                  )}
                  {selectedTool.includes('html') && (
                    <p className="text-sm text-muted-foreground">
                      HTML encoding converts special characters to HTML entities to prevent XSS attacks and display issues.
                    </p>
                  )}
                  {selectedTool === 'sha256' && (
                    <p className="text-sm text-muted-foreground">
                      SHA-256 creates a unique 256-bit hash from input text. Same input always produces the same hash.
                    </p>
                  )}
                  {selectedTool === 'random-string' && (
                    <p className="text-sm text-muted-foreground">
                      Generate cryptographically secure random strings for passwords, tokens, and API keys.
                    </p>
                  )}
                  {selectedTool === 'uuid' && (
                    <p className="text-sm text-muted-foreground">
                      UUID v4 generates unique identifiers with very low probability of collision.
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">🔒 Secure</Badge>
                    <Badge variant="secondary">⚡ Fast</Badge>
                    <Badge variant="secondary">🏠 Local</Badge>
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