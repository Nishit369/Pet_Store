import { Link } from "react-router-dom";
import heroImg from "../../assets/fstbanner.jpeg";

const Hero = () => {
  return (
    <section className="relative">
      <img src={heroImg} alt="Hero Banner" className="w-full h-[400px] lg:h-[750px] object-covercover" />
      <div className="absolute inset-0 bg-black bg-opacity-35 flex items-center justify-center">
        <div className="text-center text-white p-6">
        <p className="text-sm tracking-tighter md:text-lg mb-3">
            Welcome to
            </p>
            <h1 className="text-4xl md:text-9xl font-bold tracking-tighter  mb-4">
                PetConnect
            </h1>
            <p className="text-sm tracking-tighter md:text-lg mb-6">
            How can we help you and your furry friend today?
            </p>
            <Link to="#" className="bg-white text-gray-900 px-6 py-2 rounded-sm text-lg">
            EXPLORE
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;