import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const favs = useSelector((state) => state.favorites.items);

  if (favs.length === 0) {
    return (
      <div className="pt-24 p-6 text-center">
        <h2 className="text-2xl font-serif text-purple-300">Nenhum favorito</h2>
        <p className="mt-2 text-zinc-400">Adiciona poemas aos favoritos para os veres aqui.</p>
      </div>
    );
  }

  return (
    <section className="pt-24 p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-serif text-purple-300 mb-6">Meus Favoritos</h2>
      <ul className="space-y-4">
        {favs.map((poem) => (
          <li key={poem.title} className="bg-white/5 p-4 rounded border border-zinc-800">
            <h3 className="font-serif text-lg text-purple-300">{poem.title}</h3>
            <p className="text-sm text-zinc-400">{poem.author}</p>
            <Link
              to={`/poems/${encodeURIComponent(poem.title)}`}
              className="mt-2 inline-block text-sm underline text-purple-400"
            >
              Ver poema
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}