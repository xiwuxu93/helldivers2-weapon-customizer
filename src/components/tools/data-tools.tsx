"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { copyToClipboard } from "@/lib/utils"
import { dataTools } from "@/lib/frontend-tools"
import { Database, Copy, RotateCcw, FileText, CheckCircle, AlertCircle } from "lucide-react"

export function DataTools() {
  const [inputData, setInputData] = React.useState('')
  const [outputData, setOutputData] = React.useState('')
  const [selectedTool, setSelectedTool] = React.useState<string>('csv-to-json')
  const [delimiter, setDelimiter] = React.useState(',')
  const [indent, setIndent] = React.useState(2)
  const [error, setError] = React.useState('')

  const tools = [
    { id: 'csv-to-json', name: 'CSV to JSON', icon: Database },
    { id: 'json-to-csv', name: 'JSON to CSV', icon: FileText },
    { id: 'format-json', name: 'Format JSON', icon: CheckCircle },
    { id: 'minify-json', name: 'Minify JSON', icon: AlertCircle },
    { id: 'validate-json', name: 'Validate JSON', icon: CheckCircle },
  ]

  const processData = () => {
    setError('')
    
    if (!inputData.trim()) {
      setOutputData('')
      return
    }

    try {
      switch (selectedTool) {
        case 'csv-to-json':
          const jsonResult = dataTools.csvToJson(inputData, delimiter)
          setOutputData(JSON.stringify(jsonResult, null, 2))
          break

        case 'json-to-csv':
          const parsed = JSON.parse(inputData)
          if (!Array.isArray(parsed)) {
            throw new Error('Input must be a JSON array for CSV conversion')
          }
          const csvResult = dataTools.jsonToCsv(parsed, delimiter)
          setOutputData(csvResult)
          break

        case 'format-json':
          const formatted = dataTools.formatJson(inputData, indent)
          setOutputData(formatted)
          break

        case 'minify-json':
          const minified = dataTools.minifyJson(inputData)
          setOutputData(minified)
          break

        case 'validate-json':
          const validation = dataTools.validateJson(inputData)
          if (validation.valid) {
            setOutputData('✅ Valid JSON!\n\n' + JSON.stringify(validation.parsed, null, 2))
          } else {
            setError(validation.error || 'Invalid JSON')
            setOutputData('')
          }
          break

        default:
          setOutputData('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing error')
      setOutputData('')
    }
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(outputData)
    if (success) {
      console.log('Copied to clipboard')
    }
  }

  const handleReset = () => {
    setInputData('')
    setOutputData('')
    setError('')
  }

  React.useEffect(() => {
    processData()
  }, [inputData, selectedTool, delimiter, indent])

  const getCurrentTool = () => tools.find(t => t.id === selectedTool)
  const ToolIcon = getCurrentTool()?.icon || Database

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary-600" />
            <span>Data Processing Tools</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Convert between data formats, validate JSON, and format data structures
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Input Data</CardTitle>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your data here..."
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                className="min-h-[300px] resize-none font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Tool Options</CardTitle>
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

              {(selectedTool === 'csv-to-json' || selectedTool === 'json-to-csv') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Delimiter:</label>
                  <Select value={delimiter} onValueChange={setDelimiter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=",">,</SelectItem>
                      <SelectItem value=";">;</SelectItem>
                      <SelectItem value="\t">Tab</SelectItem>
                      <SelectItem value="|">|</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedTool === 'format-json' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Indent Size:</label>
                  <Select value={indent.toString()} onValueChange={(v) => setIndent(Number(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 spaces</SelectItem>
                      <SelectItem value="4">4 spaces</SelectItem>
                      <SelectItem value="8">8 spaces</SelectItem>
                    </SelectContent>
                  </Select>
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
                {outputData && (
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                </div>
              ) : outputData ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-[300px]">
                    {outputData}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ToolIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter data to see the converted result</p>
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
                {selectedTool === 'csv-to-json' && (
                  <div>
                    <h4 className="font-medium mb-2">CSV to JSON Converter</h4>
                    <p className="text-sm text-muted-foreground">
                      Convert CSV data to JSON format. The first row is treated as headers.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">📊 Data</Badge>
                      <Badge variant="secondary">🔄 Convert</Badge>
                    </div>
                  </div>
                )}

                {selectedTool === 'json-to-csv' && (
                  <div>
                    <h4 className="font-medium mb-2">JSON to CSV Converter</h4>
                    <p className="text-sm text-muted-foreground">
                      Convert JSON array to CSV format. All objects should have the same structure.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">📋 Export</Badge>
                      <Badge variant="secondary">📊 Spreadsheet</Badge>
                    </div>
                  </div>
                )}

                {selectedTool === 'format-json' && (
                  <div>
                    <h4 className="font-medium mb-2">JSON Formatter</h4>
                    <p className="text-sm text-muted-foreground">
                      Format and beautify JSON with proper indentation for better readability.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">✨ Format</Badge>
                      <Badge variant="secondary">📖 Readable</Badge>
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