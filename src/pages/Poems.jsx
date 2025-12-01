import React, { useMemo, useState } from 'react'
import { useGetPoemsByAuthorQuery } from '../api/poetryApi'
import PoemCard from '../components/PoemCard'
import Loading from '../components/Loading'

export default function Poems() {
  const { data: poems = [], isLoading, isError } = useGetPoemsByAuthorQuery('Shakespeare')
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(0)
  const pageSize = 9

  const filtered = useMemo(() => {
    return poems.filter((p) =>
      p.title.toLowerCase().includes(filter.toLowerCase())
    )
  }, [poems, filter])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize)

  if (isLoading) return <Loading />
  if (isError) return <div>Erro ao carregar poemas.</div>

  return (
    <section className="pt-24 p-6">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-serif text-purple-300">Poemas de Shakespeare</h2>
        <div className="flex gap-2">
          <input
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(0) }}
            placeholder="Procurar por título..."
            className="px-3 py-2 rounded bg-zinc-900 border border-zinc-700"
          />
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((p) => <PoemCard key={p.title} poem={p} />)}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button onClick={() => setPage((s) => Math.max(0, s - 1))} disabled={page === 0} className="px-3 py-1 rounded bg-zinc-800 disabled:opacity-40">Anterior</button>
        <span>Pagina {page + 1} / {pageCount || 1}</span>
        <button onClick={() => setPage((s) => Math.min(pageCount - 1, s + 1))} disabled={page >= pageCount - 1} className="px-3 py-1 rounded bg-zinc-800 disabled:opacity-40">Próxima</button>
      </div>
    </section>
  )
}