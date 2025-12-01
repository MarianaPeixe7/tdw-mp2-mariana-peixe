import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetPoemByTitleQuery } from '../api/poetryApi'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/favoritesSlice'

export default function PoemDetail() {
  const { title } = useParams()
  const decoded = decodeURIComponent(title)
  const { data, isLoading, isError } = useGetPoemByTitleQuery(decoded)
  const dispatch = useDispatch()
  const favs = useSelector((s) => s.favorites.items)
  const isFav = favs.some((p) => p.title === decoded)

  if (isLoading) return <Loading />
  if (isError || !data) return <div>Poema não encontrado.</div>

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite({ title: decoded }))
    else dispatch(addFavorite({ title: decoded, author: data.author }))
  }

  return (
    <article className="pt-24 p-6 max-w-3xl mx-auto bg-white/3 rounded">
      <h1 className="text-3xl font-serif text-purple-300">{data.title}</h1>
      <p className="italic text-sm text-zinc-400">{data.author}</p>

      <div className="mt-6 whitespace-pre-line leading-relaxed text-zinc-200">{data.lines.join('\n')}</div>

      <div className="mt-6 flex gap-3">
        <button onClick={toggleFav} className={`px-3 py-1 rounded ${isFav ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}>
          {isFav ? 'Remover favorito' : 'Adicionar favorito'}
        </button>
        <Link to="/poems" className="underline">Voltar</Link>
      </div>
    </article>
  )
}