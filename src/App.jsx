import './App.css'
import "./index.css"; // ⚠ Esta linha é essencial

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 
                    flex items-center justify-center text-white text-center p-10">
      <div className="max-w-xl">
        <h1 className="text-6xl font-extrabold drop-shadow-xl mb-6">
          Shakespeare Poetry 🌙
        </h1>
        <p className="text-2xl font-light opacity-90 leading-relaxed">
          “To be, or not to be, that is the question.”  
        </p>
      </div>
    </div>
  );
}


export default App

