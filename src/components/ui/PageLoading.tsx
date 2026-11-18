export function PageLoading() {
  return <main className="page-loading" aria-label="Page loading">
    <div className="page-loading-status" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <span>Loading…</span>
    </div>
  </main>
}
