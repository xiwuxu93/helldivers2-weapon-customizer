"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  helpful: number
  notHelpful: number
}

export function FAQSection() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const faqs: FAQ[] = [
    {
      id: '1',
      question: '如何上传文件到工具？',
      answer: '您可以通过两种方式上传文件：1) 点击上传区域选择文件；2) 直接拖拽文件到上传区域。支持的文件格式包括图片、文档、音频等。单个文件最大支持10MB。',
      category: '基础使用',
      tags: ['上传', '文件', '操作'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: '支持哪些文件格式？',
      answer: '我们支持大多数常见的文件格式，包括：图片格式（PNG, JPG, GIF, WebP）、文档格式（PDF, DOC, TXT）、音频格式（MP3, WAV）、视频格式（MP4, AVI）等。具体支持的格式会在每个工具页面明确标注。',
      category: '技术支持',
      tags: ['格式', '文件类型', '支持'],
      helpful: 32,
      notHelpful: 1
    },
    {
      id: '3',
      question: '文件处理失败怎么办？',
      answer: '如果文件处理失败，请检查：1) 文件格式是否支持；2) 文件大小是否超限；3) 网络连接是否稳定。如果问题仍然存在，请尝试刷新页面重新上传，或联系技术支持。',
      category: '故障排除',
      tags: ['失败', '错误', '处理'],
      helpful: 28,
      notHelpful: 3
    },
    {
      id: '4',
      question: '数据安全性如何保障？',
      answer: '我们非常重视数据安全：1) 所有文件传输使用HTTPS加密；2) 文件处理完成后会自动删除；3) 不会保存或备份用户文件；4) 遵循GDPR等隐私保护法规。您的数据安全是我们的首要任务。',
      category: '隐私安全',
      tags: ['安全', '隐私', '数据保护'],
      helpful: 67,
      notHelpful: 0
    },
    {
      id: '5',
      question: '可以批量处理文件吗？',
      answer: '是的，大部分工具都支持批量处理。您可以一次选择多个文件进行处理，系统会依次处理每个文件。批量处理的文件数量限制为每次最多5个文件。',
      category: '高级功能',
      tags: ['批量', '多文件', '处理'],
      helpful: 23,
      notHelpful: 1
    },
    {
      id: '6',
      question: '处理结果如何下载？',
      answer: '处理完成后，您可以：1) 点击下载按钮保存到本地；2) 复制结果内容到剪贴板；3) 通过分享链接发送给他人。所有结果都会保留24小时，过期后自动删除。',
      category: '基础使用',
      tags: ['下载', '保存', '结果'],
      helpful: 41,
      notHelpful: 1
    }
  ]

  const categories = [
    'all',
    ...Array.from(new Set(faqs.map(faq => faq.category)))
  ]

  const filteredFAQs = React.useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [faqs, searchTerm, selectedCategory])

  const toggleOpen = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-8">
      {/* 搜索和筛选 */}
      <div className="space-y-4">
        {/* 搜索框 */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索问题或关键词..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ列表 */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                没有找到相关问题
              </h3>
              <p className="text-muted-foreground text-center">
                尝试更改搜索关键词或选择不同的分类
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-6 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{faq.category}</Badge>
                        {faq.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                </button>
                
                {isOpen && (
                  <CardContent className="pt-0 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      {/* 有用性反馈 */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">
                          这个回答对您有帮助吗？
                        </span>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-success-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{faq.helpful}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-error-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{faq.notHelpful}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })
        )}
      </div>

      {/* 联系支持 */}
      <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            没有找到您需要的答案？
          </h3>
          <p className="text-muted-foreground mb-4">
            我们的支持团队随时为您提供帮助
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              联系客服
            </button>
            <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              提交问题
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}