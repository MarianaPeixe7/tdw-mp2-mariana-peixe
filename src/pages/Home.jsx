import shakespeareImg from "../assets/shakespeare-img.png"; // <-- coloca aqui o teu PNG
import Logo from "../assets/Shakespeare-Poetry-logo-bege.svg"; // <-- o teu SVG da logo
import Poems from "./Poems";


export default function Home() {
  return (
    <div>

    
    <section className="min-h-screen bg-wine text-white pt-24 flex">

      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8 text-center">

        {/* Logo */}
        <img
          src={Logo}
          alt="Shakespeare Poetry Logo"
          className="w-56 mb-10 drop-shadow-xl"
        />

        {/* Quote */}
        <blockquote className="font-shakespeare text-gold text-2xl leading-relaxed max-w-xl drop-shadow-md">
          “Words are easy, like the wind; faithful friends are hard to find.”
          <br />
          <span className="text-gold mt-4 block text-xl">
            — William Shakespeare, *The Passionate Pilgrim*
          </span>
        </blockquote>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center p-8">
        <img
          src={shakespeareImg}
          alt="William Shakespeare"
          className="w-96 max-w-full rounded-xl shadow-2xl object-contain"
        />
      </div>

      
    </section>
    <Poems></Poems>
    </div>
  );
}
