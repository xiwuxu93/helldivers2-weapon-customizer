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
        name: 'Helldivers 2 Weapon Customizer',
        alternateName: 'Helldivers 2 Loadout Builder',
        description: 'Plan Helldivers 2 loadouts with real-time weapon stats, faction counters, stratagem combos, and warbond unlock paths.',
        url: 'https://helldivers2-weapon-customization.com',
        keywords: [
          'helldivers 2 weapon customization',
          'helldivers 2 loadout builder',
          'helldivers 2 weapon stats'
        ].join(', '),
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://helldivers2-weapon-customization.com/?q={search_term_string}'
          }
        } as any,
        publisher: {
          '@type': 'Organization',
          name: 'Helldivers 2 Weapon Customizer',
          url: 'https://helldivers2-weapon-customization.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://helldivers2-weapon-customization.com/logo.png'
          }
        }
      } satisfies WithContext<WebSite>
      break

    case 'application':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Helldivers 2 Weapon Customizer',
        alternateName: 'Helldivers 2 Loadout Planner',
        description: 'Interactive Helldivers 2 tool to compare weapons, attachments, stratagems, and create optimized squad loadouts.',
        url: 'https://helldivers2-weapon-customization.com',
        applicationCategory: 'GameApplication',
        applicationSubCategory: 'Utility',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        featureList: [
          'Compare Helldivers 2 weapon damage, recoil, fire rate, and armor penetration',
          'Preview attachments and customization options',
          'Track stratagem synergies for Terminid and Automaton encounters',
          'Filter weapons by warbond, armor penetration, and tier ranking',
          'Live database updates from the Galactic War intel feeds'
        ],
        screenshot: 'https://helldivers2-weapon-customization.com/logo.png',
        image: 'https://helldivers2-weapon-customization.com/logo.png',
        author: {
          '@type': 'Organization',
          name: 'Helldivers 2 Weapon Customizer'
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
          name: 'Helldivers 2 Weapon Customizer',
          logo: {
            '@type': 'ImageObject',
            url: 'https://helldivers2-weapon-customization.com/logo.png'
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
