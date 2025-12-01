import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetPoemByTitleQuery } from '../api/poetryApi'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/favoritesSlice'

const LINES_PER_PAGE = 15

export default function PoemDetail() {
  const { title } = useParams()
  const decoded = decodeURIComponent(title)
  const { data, isLoading, isError } = useGetPoemByTitleQuery(decoded)
  const dispatch = useDispatch()
  const favs = useSelector((s) => s.favorites.items)
  const isFav = favs.some((p) => p.title === decoded)

  const [linesToShow, setLinesToShow] = useState(LINES_PER_PAGE)
  const loadMoreRef = useRef(null)

  useEffect(() => {
    if (!loadMoreRef.current || !data?.lines) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Observer triggered:', entry.isIntersecting)
          if (entry.isIntersecting) {
            setLinesToShow((prev) => Math.min(prev + LINES_PER_PAGE, data.lines.length))
          }
        })
      },
      { root: null, rootMargin: '200px', threshold: 0.1 } // garante disparo próximo do fim
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [data?.lines?.length])


  if (isLoading) return <Loading />
  if (isError || !data) return <div>Poema não encontrado.</div>

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite({ title: decoded }))
    else dispatch(addFavorite({ title: decoded, author: data.author }))
  }

  const visibleLines = data.lines.slice(0, linesToShow).join('\n')
  const shouldShowLoadMoreRef = linesToShow < data.lines.length

  return (
    <article className="pt-24 p-6 max-w-3xl mx-auto bg-white/3 rounded">
      <h1 className="text-3xl font-serif text-purple-300">{data.title}</h1>
      <p className="italic text-sm text-zinc-400">{data.author}</p>

      <div className="mt-6 whitespace-pre-line leading-relaxed text-zinc-200">
        {visibleLines}
      </div>

      {shouldShowLoadMoreRef && (
        <div ref={loadMoreRef} className="h-10"></div> // ponto de observação para o scroll
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={toggleFav}
          className={`px-3 py-1 rounded ${isFav ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}
        >
          {isFav ? 'Remover favorito' : 'Adicionar favorito'}
        </button>
        <Link to="/poems" className="underline">Voltar</Link>
      </div>
    </article>
  )
}