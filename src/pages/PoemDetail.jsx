import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPoemByTitleQuery } from '../api/poetryApi';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { Heart, HeartOff } from 'lucide-react';

const LINES_PER_PAGE = 20;

export default function PoemDetail() {
  const { title } = useParams();
  const decoded = decodeURIComponent(title);
  const { data, isLoading, isError } = useGetPoemByTitleQuery(decoded);
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.items);
  const isFav = favs.some((p) => p.title === decoded);

  const [linesToShow, setLinesToShow] = useState(LINES_PER_PAGE);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !data?.lines) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLinesToShow((prev) =>
              Math.min(prev + LINES_PER_PAGE, data.lines.length)
            );
          }
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [data?.lines?.length]);

  if (isLoading) return <Loading />;
  if (isError || !data) return <div>Poem not found.</div>;

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite({ title: decoded }));
    else dispatch(addFavorite({ title: decoded, author: data.author }));
  };

  const visibleLines = data.lines.slice(0, linesToShow);
  const shouldShowLoadMoreRef = linesToShow < data.lines.length;

  return (
    <article className="mt-24 p-6 max-w-3xl mx-auto flex flex-col gap-6 bg-zinc-900/60 rounded-xl border border-gold/20 shadow-lg">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-shakespeare text-gold drop-shadow-sm">
          {data.title}
        </h1>
      </header>

      {/* Poem lines */}
      <div className="whitespace-pre-line leading-relaxed text-zinc-200 font-poppins text-base">
        {visibleLines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      {shouldShowLoadMoreRef && <div ref={loadMoreRef} className="h-10" />}

      {/* Footer */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={toggleFav}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
            ${isFav ? 'bg-gold text-black border-gold' : 'bg-zinc-800 border-zinc-700 text-zinc-200'}
          `}
        >
          {isFav ? <><HeartOff size={16} /> Remove favorite</> : <><Heart size={16} /> Add favorite</>}
        </button>

        <Link
          to="/poems"
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 transition"
        >
          Back
        </Link>
      </div>
    </article>
  );
}
