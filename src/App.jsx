import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      <div className="p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;