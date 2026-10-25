export function Metadata({ title, description, noIndex = false }: { title: string; description: string; noIndex?: boolean }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
    </>
  )
}
