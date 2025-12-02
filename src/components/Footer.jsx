export default function Footer() {
  return (
    <footer className="bg-wine text-zinc-300 py-6 px-6 mt-16 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-2 text-sm justify-center">
        <p>© 2025 Mariana Peixe  |</p>
        <a
          href="https://github.com/MarianaPeixe7/tdw-mp2-mariana-peixe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          GitHub Repository
        </a>
        <p>  | MCTW - UA</p>
      </div>
    </footer>
  );
}
