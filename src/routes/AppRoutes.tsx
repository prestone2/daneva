import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { HomePage } from '../pages/HomePage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { pages } from '../data/pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        {pages.filter(({ path }) => path !== '/').map((page) => <Route key={page.path} path={page.path} element={<PlaceholderPage page={page} />} />)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
