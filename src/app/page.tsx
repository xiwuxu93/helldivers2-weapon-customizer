import helldiversDatabase from '@/../public/helldivers2/data/helldivers2_comprehensive_database.json'
import { HomePageClient } from '@/components/home/home-page-client'
import { defaultHomePageData, normalizeHomePageData } from '@/lib/homepage-data'

export default function Page() {
  const normalizedData = normalizeHomePageData(helldiversDatabase) ?? defaultHomePageData

  return <HomePageClient data={normalizedData} />
}
