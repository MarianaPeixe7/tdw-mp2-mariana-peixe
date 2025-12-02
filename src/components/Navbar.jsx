import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MiniLogo from "../assets/Shakespeare-MiniLogo-branco.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navClasses = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b border-white" //rota ativa estilo
      : "text-red-100 hover:text-white transition"; //rota inativa estilo

  return (
    <header className="bg-[#8D2929] fixed w-full z-50 shadow-md">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* esquerda - Logo */}
          <div className="flex items-center gap-3 font-shakespeare">
            <Link to="/" className="text-white font-bold text-xl tracking-wide flex items-center gap-2">
                <img
                    src={MiniLogo}
                    alt="Shakespeare Mini Poetry Logo"
                    className="h-8 drop-shadow-xl"
                    />
                <p>Shakespeare Poetry</p>
            </Link>
          </div>

          {/* Portatil rotas*/}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li><NavLink to="/" className={navClasses}>Home</NavLink></li>
              <li><NavLink to="/poems" className={navClasses}>Poems</NavLink></li>
              <li><NavLink to="/favorites" className={navClasses}>Favorites</NavLink></li>
              <li><NavLink to="/about" className={navClasses}>About</NavLink></li>
            </ul>
          </nav>

          {/* Botao Mobile Menu */}
          <button
            className="block md:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Aberto -rotas */}
        {open && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col gap-4 text-sm text-red-100">
              <li><NavLink onClick={() => setOpen(false)} to="/" className={navClasses}>Home</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/poems" className={navClasses}>Poems</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/favorites" className={navClasses}>Favorites</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/about" className={navClasses}>About</NavLink></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}