'use client'

import { WithContext, WebSite, SiteNavigationElement } from 'schema-dts'

export function NavigationStructuredData() {
  const baseUrl = 'https://helldivers2-weapon-customization.com'

  const websiteData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Helldivers 2 Weapon Customizer',
    alternateName: 'Helldivers 2 Loadout Builder',
    url: baseUrl,
    description: 'Interactive Helldivers 2 tool for planning weapon loadouts, stratagem combos, and mission tactics.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`
      }
    } as any,
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/`,
        url: `${baseUrl}/`,
        name: 'Helldivers 2 Weapon Customizer',
        description: 'Plan Helldivers 2 loadouts with real-time weapon analytics and stratagem advice.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': baseUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/weapons`,
        url: `${baseUrl}/weapons`,
        name: 'Helldivers 2 Weapons Library',
        description: 'Browse every Helldivers 2 weapon with stats, attachments, and faction counters.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': baseUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#enemy-factions`,
        url: `${baseUrl}/#enemy-factions`,
        name: 'Enemy Faction Countermeasures',
        description: 'Learn how to counter Terminids, Automatons, and Illuminate forces.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': baseUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#mission-planning`,
        url: `${baseUrl}/#mission-planning`,
        name: 'Mission Planning Briefings',
        description: 'Adapt loadouts to Helldivers 2 mission types and hazard conditions.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': baseUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#stratagem-playbook`,
        url: `${baseUrl}/#stratagem-playbook`,
        name: 'Stratagem Playbook',
        description: 'Coordinate stratagem combos for every squad role.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': baseUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#faq`,
        url: `${baseUrl}/#faq`,
        name: 'Helldivers 2 FAQ',
        description: 'Answers to the most common Helldivers 2 weapon and loadout questions.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': baseUrl
        }
      }
    ]
  }

  const navigationData: WithContext<SiteNavigationElement> = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Helldivers 2 Arsenal Navigation',
    url: baseUrl,
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Home',
        url: `${baseUrl}/`
      },
      {
        '@type': 'WebPage',
        name: 'Weapons Library',
        url: `${baseUrl}/weapons`
      },
      {
        '@type': 'WebPage',
        name: 'Enemy Counters',
        url: `${baseUrl}/#enemy-factions`
      },
      {
        '@type': 'WebPage',
        name: 'Mission Planning',
        url: `${baseUrl}/#mission-planning`
      },
      {
        '@type': 'WebPage',
        name: 'Stratagem Playbook',
        url: `${baseUrl}/#stratagem-playbook`
      },
      {
        '@type': 'WebPage',
        name: 'FAQ',
        url: `${baseUrl}/#faq`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationData)
        }}
      />
    </>
  )
}
