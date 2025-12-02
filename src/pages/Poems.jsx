import { useMemo, useState } from "react";
import { useGetPoemsByAuthorQuery } from "../api/poetryApi";
import PoemCard from "../components/PoemCard";
import Loading from "../components/Loading";

export default function Poems() {
  const { data: poems = [], isLoading, isError } = useGetPoemsByAuthorQuery("Shakespeare"); //vai buscar os poemas só de shakespeare à API, e o loading fica ativo, mostrando o <Loading/>

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 9; //mostra apenas 9 poemas por pagina

  //filtragem, só recalcula quando a lista dos poems ou o texto no filtro mudam
  const filtered = useMemo(() => {
    return poems.filter((p) =>
      p.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [poems, filter]);

  const pageCount = Math.ceil(filtered.length / pageSize);
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize); //botoes de back e next fazem com que oque está visivel seja recalculado, atualizando a interface com amsi poemas

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading poems.</div>;

  return (
    <section className="min-h-screen bg-wine text-white pt-28 px-6 font-sans">
      
      {/* header, a plica não funciona bem e tem de se usar o &apos; */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <h2 className="text-4xl font-shakespeare text-gold drop-shadow">
          Shakespeare&apos;s Poems
        </h2>

        <input
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(0);
          }}
          placeholder="Search by title..."
          className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gold/50 transition w-full md:w-64"
        />
      </header>

      {/* grelha */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {visible.map((p) => (
          <div key={p.title} className="h-full">
            <PoemCard poem={p} />
          </div>
        ))}
      </div>


      {/* paginacao */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((s) => Math.max(0, s - 1))}
          disabled={page === 0}
          className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 disabled:opacity-40 hover:bg-zinc-800 transition"
        >
          Back
        </button>

        <span className="text-gold text-lg">
          Page {page + 1} / {pageCount || 1}
        </span>

        <button
          onClick={() => setPage((s) => Math.min(pageCount - 1, s + 1))}
          disabled={page >= pageCount - 1}
          className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 disabled:opacity-40 hover:bg-zinc-800 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
}