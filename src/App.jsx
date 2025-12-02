import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#8D2929] text-white">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/poems/:title" element={<PoemDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;