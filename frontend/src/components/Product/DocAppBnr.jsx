import React from 'react'
import { Link } from 'react-router-dom'
import vetbanner from "../../assets/doct.avif";


const DocAppBnr = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
        <div className=" container mx-auto flex flex-col-reverse lg:flex-row items-center bg-[#c2c2d2] rounded-3xl">
            {/** left content */}
            <div className="lg:w-1/2 p-8 text-center lg:text-left">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Worried About Your Pet ?
                </h2>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Book an Appointment With a Veterinarian 
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Schedule a hassle-free appointment with a veterinarian at your preferred date and time!
                </p>
                <Link to="/doc" className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700'>
                    Book Now
                </Link>
            </div>
            {/**right content */}
            <div className=' lg:w-1/2'>
                <img src={vetbanner} alt="Veterinary" className="w-full h-full object-cover lg:rounded-br-3xl lg:rounded-tr-3xl " />
            </div>
        </div>
    </section>
  )
}

export default DocAppBnr