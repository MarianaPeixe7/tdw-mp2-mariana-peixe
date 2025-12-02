import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-zinc-900 border-b border-zinc-700 p-4 flex gap-6 justify-center">
            <Link className="hover:text-purple-400" to="/">Home</Link>
            <Link className="hover:text-purple-400" to="/poems">Poems</Link>
            <Link className="hover:text-purple-400" to="/about">About</Link>
            <Link className="hover:text-purple-400" to="/favorites">Favoritos</Link>
        </nav>
    );
}