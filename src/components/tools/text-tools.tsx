"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { copyToClipboard } from "@/lib/utils"
import { textTools } from "@/lib/frontend-tools"
import { 
  Copy, 
  RotateCcw, 
  Type, 
  Hash, 
  Clock,
  FileText,
  Users,
  Mail,
  Link as LinkIcon
} from "lucide-react"

export function TextTools() {
  const [inputText, setInputText] = React.useState('')
  const [outputText, setOutputText] = React.useState('')
  const [selectedTool, setSelectedTool] = React.useState<string>('stats')
  const [caseType, setCaseType] = React.useState<string>('upper')

  const tools = [
    { id: 'stats', name: 'Text Statistics', icon: Hash },
    { id: 'case', name: 'Case Converter', icon: Type },
    { id: 'clean', name: 'Text Cleaner', icon: FileText },
    { id: 'extract-urls', name: 'Extract URLs', icon: LinkIcon },
    { id: 'extract-emails', name: 'Extract Emails', icon: Mail },
  ]

  const caseTypes = [
    { value: 'upper', label: 'UPPER CASE' },
    { value: 'lower', label: 'lower case' },
    { value: 'title', label: 'Title Case' },
    { value: 'sentence', label: 'Sentence case' },
    { value: 'camel', label: 'camelCase' },
    { value: 'pascal', label: 'PascalCase' },
    { value: 'snake', label: 'snake_case' },
    { value: 'kebab', label: 'kebab-case' },
  ]

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText('')
      return
    }

    switch (selectedTool) {
      case 'stats':
        const stats = textTools.getTextStats(inputText)
        setOutputText(`Text Statistics:
        
📊 Words: ${stats.words}
📝 Characters: ${stats.characters}
🔤 Characters (no spaces): ${stats.charactersNoSpaces}
📄 Lines: ${stats.lines}
📋 Paragraphs: ${stats.paragraphs}
⏱️ Reading time: ${stats.readingTime} min`)
        break

      case 'case':
        const converted = textTools.convertCase(inputText, caseType as any)
        setOutputText(converted)
        break

      case 'clean':
        const cleaned = textTools.cleanText(inputText)
        setOutputText(cleaned)
        break

      case 'extract-urls':
        const urls = textTools.extractUrls(inputText)
        setOutputText(urls.length > 0 ? urls.join('\n') : 'No URLs found in the text.')
        break

      case 'extract-emails':
        const emails = textTools.extractEmails(inputText)
        setOutputText(emails.length > 0 ? emails.join('\n') : 'No email addresses found in the text.')
        break

      default:
        setOutputText('')
    }
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(outputText)
    if (success) {
      // Could add a toast notification here
      console.log('Copied to clipboard')
    }
  }

  const handleReset = () => {
    setInputText('')
    setOutputText('')
  }

  React.useEffect(() => {
    processText()
  }, [inputText, selectedTool, caseType])

  const getCurrentTool = () => tools.find(t => t.id === selectedTool)
  const ToolIcon = getCurrentTool()?.icon || Hash

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="h-5 w-5 text-primary-600" />
            <span>Text Processing Tools</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Analyze, convert, and extract information from text - all processed locally in your browser
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Input Text</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Clear</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Tool Selection */}
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
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Icon className="h-4 w-4 text-primary-600" />
                      <span className="font-medium">{tool.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Case Type Selection for Case Converter */}
              {selectedTool === 'case' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Case Type:</label>
                  <Select value={caseType} onValueChange={setCaseType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {caseTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <ToolIcon className="h-4 w-4 text-primary-600" />
                  <span>{getCurrentTool()?.name || 'Output'}</span>
                </CardTitle>
                {outputText && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="flex items-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {outputText ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {outputText}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ToolIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter some text to see the results</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tool Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedTool === 'stats' && (
                  <div>
                    <h4 className="font-medium mb-2">Text Statistics</h4>
                    <p className="text-sm text-muted-foreground">
                      Get detailed statistics about your text including word count, character count, 
                      reading time estimation, and more.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">📊 Analytics</Badge>
                      <Badge variant="secondary">⏱️ Reading Time</Badge>
                      <Badge variant="secondary">📝 Detailed Stats</Badge>
                    </div>
                  </div>
                )}

                {selectedTool === 'case' && (
                  <div>
                    <h4 className="font-medium mb-2">Case Converter</h4>
                    <p className="text-sm text-muted-foreground">
                      Convert text between different case formats including uppercase, lowercase, 
                      title case, camelCase, PascalCase, snake_case, and kebab-case.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">🔤 Multiple Formats</Badge>
                      <Badge variant="secondary">⚡ Instant</Badge>
                      <Badge variant="secondary">🎯 Programming</Badge>
                    </div>
                  </div>
                )}

                {selectedTool === 'clean' && (
                  <div>
                    <h4 className="font-medium mb-2">Text Cleaner</h4>
                    <p className="text-sm text-muted-foreground">
                      Remove extra whitespace, normalize line breaks, and clean up messy text formatting.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">🧹 Cleanup</Badge>
                      <Badge variant="secondary">📄 Formatting</Badge>
                      <Badge variant="secondary">✨ Polish</Badge>
                    </div>
                  </div>
                )}

                {selectedTool === 'extract-urls' && (
                  <div>
                    <h4 className="font-medium mb-2">URL Extractor</h4>
                    <p className="text-sm text-muted-foreground">
                      Extract all URLs from text content. Useful for processing documents, 
                      emails, or any text containing web links.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">🔗 Links</Badge>
                      <Badge variant="secondary">📤 Extract</Badge>
                      <Badge variant="secondary">🎯 Precise</Badge>
                    </div>
                  </div>
                )}

                {selectedTool === 'extract-emails' && (
                  <div>
                    <h4 className="font-medium mb-2">Email Extractor</h4>
                    <p className="text-sm text-muted-foreground">
                      Find and extract all email addresses from text. Perfect for processing 
                      contact lists, documents, or web content.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">📧 Emails</Badge>
                      <Badge variant="secondary">📋 Contacts</Badge>
                      <Badge variant="secondary">🔍 Search</Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}