import { WebSite, WithContext, SoftwareApplication, HowTo, FAQPage, BlogPosting } from 'schema-dts'

interface StructuredDataProps {
  type: 'website' | 'application' | 'howto' | 'faq' | 'article'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: WithContext<any>

  switch (type) {
    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'BWConverter - Free Black and White Image Converter',
        alternateName: 'Black and White Image Converter Online',
        description: 'Professional free black and white image converter with advanced filters and instant preview.',
        url: 'https://bwconverter.com',
        keywords: 'black and white image, black and white image converter, convert image to black and white, monochrome image',
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://bwconverter.com/?q={search_term_string}'
          }
        } as any,
        publisher: {
          '@type': 'Organization',
          name: 'BWConverter - Black and White Image Converter',
          url: 'https://bwconverter.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bwconverter.com/logo.png'
          }
        }
      } satisfies WithContext<WebSite>
      break

    case 'application':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'BWConverter - Free Black and White Image Converter Online',
        alternateName: 'Black and White Photo Converter',
        description: 'Professional free online tool to convert color images to beautiful black and white photos. Advanced black and white image processing with instant preview.',
        url: 'https://bwconverter.com',
        applicationCategory: 'MultimediaApplication',
        applicationSubCategory: 'Photo Editor',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        featureList: [
          'Convert images to black and white instantly',
          'Professional black and white presets (Vintage, Dramatic, Film Noir)',
          'Advanced black and white editing controls (Contrast, Brightness, Sepia, Grain)',
          'Batch black and white image processing',
          'Multiple export formats for black and white images (PNG, JPEG, WebP)',
          'Real-time black and white preview',
          'No watermarks on black and white images',
          'Free black and white image conversion'
        ],
        screenshot: 'https://bwconverter.com/website1.png',
        image: 'https://bwconverter.com/black-and-white-image.png',
        author: {
          '@type': 'Organization',
          name: 'BWConverter - Black and White Image Converter'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1247',
          bestRating: '5',
          worstRating: '1'
        }
      } satisfies WithContext<SoftwareApplication>
      break

    case 'howto':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: data.name,
        description: data.description,
        image: data.image,
        totalTime: data.totalTime,
        supply: data.supply || [],
        tool: data.tool || [],
        step: data.steps.map((step: any, index: number) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          image: step.image
        }))
      } satisfies WithContext<HowTo>
      break

    case 'faq':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((item: any) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      } satisfies WithContext<FAQPage>
      break

    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'BWConverter',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bwconverter.com/logo.png'
          }
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate || data.publishedDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        keywords: data.keywords
      } satisfies WithContext<BlogPosting>
      break

    default:
      return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}