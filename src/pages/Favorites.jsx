import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { Heart, HeartOff } from "lucide-react";

export default function Favorites() {
  const favs = useSelector((state) => state.favorites.items); //acesso ao favorites da store
  const dispatch = useDispatch();

  const toggleFav = (poem) => {
    const isFav = favs.some((p) => p.title === poem.title);
    if (isFav) dispatch(removeFavorite({ title: poem.title }));
    else dispatch(addFavorite({ title: poem.title, author: poem.author }));
  };

  //quando nao há favoritos
  if (favs.length === 0) {
    return (
      <div className="pt-28 px-6 min-h-screen font-sans bg-wine text-white text-center">
        <h2 className="text-4xl font-shakespeare text-gold drop-shadow mb-2">
          No favorites
        </h2>
        <p className="text-zinc-300">
          Add poems to your favorites, so you can see them here.
        </p>
      </div>
    );
  }

  //há favs!
  return (
    <section className="min-h-screen bg-wine text-white pt-28 px-6 font-sans">
      <h2 className="text-4xl font-shakespeare text-gold drop-shadow mb-10">
        My Favorites
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {favs.map((poem) => {    {/*mapeia os favoritos*/}
          const isFav = favs.some((p) => p.title === poem.title);
          return (
            <div key={poem.title} className="h-full">
              <article
                className="h-full flex flex-col justify-between overflow-visible
                          bg-zinc-900/60 backdrop-blur-sm p-5 rounded-xl border border-gold/20
                          shadow-lg transition-transform duration-300 will-change-transform
                          hover:-translate-y-2 hover:shadow-2xl"
              >
                <h3 className="font-shakespeare text-xl text-gold mb-1 drop-shadow-sm">
                  {poem.title}
                </h3>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <Link
                    to={`/poems/${encodeURIComponent(poem.title)}`}
                    className="text-sm text-gold hover:underline font-medium"
                  >
                    See poem
                  </Link>

                  <button
                    onClick={() => toggleFav(poem)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition
                      ${isFav ? "bg-gold text-black border-gold" : "bg-zinc-800 border-zinc-700 text-zinc-200"}`}
                  >
                    {isFav ? <><HeartOff size={16} /> Remove</> : <><Heart size={16} /> Favorite</>}
                  </button>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}