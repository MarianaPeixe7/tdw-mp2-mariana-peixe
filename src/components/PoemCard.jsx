import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/favoritesSlice'
import PropTypes from "prop-types"  

export default function PoemCard({ poem }) {
  const dispatch = useDispatch()
  const favs = useSelector((s) => s.favorites.items)
  const isFav = favs.some((p) => p.title === poem.title)

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite({ title: poem.title }))
    else dispatch(addFavorite({ title: poem.title, author: poem.author }))
  }

  return (
    <article className="bg-white/5 p-4 rounded-md border border-zinc-800 shadow-sm">
      <h3 className="font-serif text-lg text-purple-300">{poem.title}</h3>
      <p className="text-sm text-zinc-400 mt-2">{poem.author}</p>
      <p className="mt-3 italic text-zinc-300 text-sm line-clamp-3">
        {poem.lines.slice(0, 3).join(' ')}...
      </p>

      <div className="mt-4 flex justify-between items-center">
        <Link to={`/poems/${encodeURIComponent(poem.title)}`} className="text-sm underline">
          Ver poema
        </Link>

        <button
          onClick={toggleFav}
          className={`px-3 py-1 rounded text-sm ${isFav ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}
        >
          {isFav ? 'Remover' : 'Favorito'}
        </button>
      </div>
    </article>
  )
}

PoemCard.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};