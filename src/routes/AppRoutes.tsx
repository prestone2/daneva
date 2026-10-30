import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { Suspense } from 'react'
import { PageLoading } from '../components/ui/PageLoading'
import { routePage } from './route-page'
const HomePage = routePage(() => import('../pages/HomePage').then(module => ({ default: module.HomePage })))
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { pages } from '../data/pages'
import type { ReactElement } from 'react'
import type { SitePath } from '../types/site'
import { Metadata } from '../components/ui/Metadata'
const AboutPage = routePage(() => import('../pages/AboutPage').then(module => ({ default: module.AboutPage })))
const ServicesPage = routePage(() => import('../pages/ServicesPage').then(module => ({ default: module.ServicesPage })))
const CorridorsPage = routePage(() => import('../pages/CorridorsPage').then(module => ({ default: module.CorridorsPage })))
const FleetPage = routePage(() => import('../pages/FleetPage').then(module => ({ default: module.FleetPage })))
const SafetyPage = routePage(() => import('../pages/SafetyPage').then(module => ({ default: module.SafetyPage })))
const ContactPage = routePage(() => import('../pages/ContactPage').then(module => ({ default: module.ContactPage })))
const QuotePage = routePage(() => import('../pages/QuotePage').then(module => ({ default: module.QuotePage })))

const corporatePages: Partial<Record<SitePath, ReactElement>> = {
  '/about': <AboutPage />,
  '/services': <ServicesPage />,
  '/transport-corridors': <CorridorsPage />,
  '/fleet-operations': <FleetPage />,
  '/safety-compliance': <SafetyPage />,
  '/contact': <ContactPage />,
  '/request-quote': <QuotePage />,
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        {pages.filter(({ path }) => path !== '/').map((page) => (
          <Route key={page.path} path={page.path} element={corporatePages[page.path]
            ? <><Metadata {...page} />{corporatePages[page.path]}</>
            : <PlaceholderPage page={page} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </Suspense>
  )
}
