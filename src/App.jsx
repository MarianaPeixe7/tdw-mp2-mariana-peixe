import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import About from "./pages/About";


export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}