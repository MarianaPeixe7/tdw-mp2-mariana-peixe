export default function About() {
  return (
    <section className="pt-28 px-6 min-h-screen bg-wine text-white font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-shakespeare text-gold drop-shadow mb-4">
          About This Project
        </h2>
        <p className="text-zinc-300 leading-relaxed text-lg">
          This web application is a mini-project for the TDW class at the University of Aveiro.
          It presents the poetry of William Shakespeare.
        </p>
        <p className="text-zinc-400 mt-4 leading-relaxed text-base">
          Users can browse poems, search for specific titles, read details with lazy-loaded verses,
          and mark their favorite poems for quick access. The design emphasizes readability,
          with a serif font for titles and a clean sans-serif font for content, and a responsive
          layout that works well on all devices.
        </p>        
      </div>
    </section>
  );
}
