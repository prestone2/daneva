import { createElement, lazy, type ComponentType } from 'react'
const preloaders: (() => Promise<void>)[] = []
export function routePage(load: () => Promise<{ default: ComponentType }>) {
  const LazyPage = lazy(load)
  let ServerPage: ComponentType | undefined
  if (import.meta.env.SSR) preloaders.push(async () => { ServerPage = (await load()).default })
  return function Page() { return createElement(import.meta.env.SSR && ServerPage ? ServerPage : LazyPage) }
}
export async function preloadRoutes() { await Promise.all(preloaders.map(load => load())) }
