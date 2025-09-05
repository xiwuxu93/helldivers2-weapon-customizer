"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function Stats() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      label: "Active Users",
      value: 12500,
      suffix: "+",
      description: "Monthly active users"
    },
    {
      label: "Files Processed",
      value: 85000,
      suffix: "+",
      description: "Total files processed"
    },
    {
      label: "Success Rate",
      value: 99.9,
      suffix: "%",
      description: "Tool processing success rate"
    },
    {
      label: "Average Speed",
      value: 2.3,
      suffix: "s",
      description: "Average processing time"
    }
  ]

  // 数字动画效果
  const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!mounted) return

      const increment = value / 100
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, 20)

      return () => clearInterval(timer)
    }, [value, mounted])

    if (!mounted) {
      return <span>0{suffix}</span>
    }

    return (
      <span>
        {displayValue.toLocaleString()}{suffix}
      </span>
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Data Statistics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let the data speak, witness our growth
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-primary-600">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}