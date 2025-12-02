import shakespeareImg from "../assets/shakespeare-img.png";
import Logo from "../assets/Shakespeare-Poetry-logo-bege.svg"; 
import Poems from "./Poems";


export default function Home() {
    return (
        <div>
            <section className="min-h-screen bg-wine text-white pt-24 flex">
                {/* esquerda */}
                    <div className="flex flex-col items-center w-1/2 justify-center">
                        <div>
                            {/* Logo */}
                            <img
                            src={Logo}
                            alt="Shakespeare Poetry Logo"
                            className="w-2/3 mb-10 drop-shadow-xl"
                            />
                            {/* Quote */}
                            <blockquote className="font-shakespeare text-gold text-2xl leading-relaxed max-w-xl drop-shadow-md pb-5">
                            “Words are easy, like the wind; faithful friends are hard to find.”
                                <p className="text-gold mt-4 block text-xl">
                                — William Shakespeare, The Passionate Pilgrim
                            </p>
                            </blockquote>
                        </div>
                    </div>

                {/* direita */}
                <div className="w-1/2 flex justify-center items-center p-8">
                    <img
                    src={shakespeareImg}
                    alt="William Shakespeare"
                    className="w-96 max-w-full "
                    />
                </div>
            </section>
            <Poems></Poems>
        </div>
    );
}
