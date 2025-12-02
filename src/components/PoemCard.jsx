import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import PropTypes from "prop-types";
import { Heart, HeartOff } from "lucide-react";

//recebe poema por props
export default function PoemCard({ poem }) {
  //favs do redux
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.items);
  const isFav = favs.some((p) => p.title === poem.title);

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite({ title: poem.title }));
    else dispatch(addFavorite({ title: poem.title, author: poem.author }));
  };

  return (
    <article
      className="h-full flex flex-col justify-between overflow-visible
                 bg-zinc-900/60 backdrop-blur-sm p-5 rounded-xl border border-gold/20
                 shadow-lg transition-transform duration-300 will-change-transform
                 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div>
        {/* titulo */}
        <h3 className="font-shakespeare text-xl text-gold mb-1 drop-shadow-sm">
          {poem.title}
        </h3>

        {/* preview poema, nao passa de 3 versos/linhas */}
        <p className="mt-2 text-zinc-200/90 text-sm line-clamp-3 leading-relaxed">
          {poem.lines?.slice(0, 3).join(" ")}...
        </p>
      </div>

      {/* footer do card, para ver poema completo ou para adicionar aos favs */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          to={`/poems/${encodeURIComponent(poem.title)}`}
          className="text-sm text-gold hover:underline font-medium"
        >
          See poem
        </Link>

        <button
          onClick={toggleFav}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition
            ${isFav ? "bg-gold text-black border-gold" : "bg-zinc-800 border-zinc-700 text-zinc-200"}
          `}
        >
          {isFav ? <><HeartOff size={16} /> Remove</> : <><Heart size={16} /> Favorite</>}
        </button>
      </div>
    </article>
  );
}

//validação de dados esperados, porque deu erros algumas vezes e encontrei esta solucao
PoemCard.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};