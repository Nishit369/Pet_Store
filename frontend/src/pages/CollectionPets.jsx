import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FilterSidebar from '../components/Product/FilterSidebar';
import SortOptions from '../components/Product/SortOptions';
import ProductGrid from '../components/Product/ProductGrid';
const CollectionPets = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    
    const toggleSidebar = () => {
        setSideBarOpen(!isSideBarOpen);
    };

    const handleClickOutside = (e) => {
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setSideBarOpen(false);
        }
    };
 
    useEffect(() => {
        document.addEventListener("mousedown",handleClickOutside);
        return () => {
        document.removeEventListener("mousedown",handleClickOutside);};
    }, []);
 useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: "9",
          name: "Golden Retriever",
          price: 2000,
          description: "Friendly and playful dog.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "Golden Retriever",
            },
          ],
        },
        {
          _id: "11",
          name: "Labrador",
          price: 2000,
          description: "Loyal and intelligent breed.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "Labrador",
            },
          ],
        },
        {
          _id: "31",
          name: "German Shepherd",
          price: 2000,
          description: "Strong and protective dog.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=3",
              altText: "German Shepherd",
            },
          ],
        },
        {
          _id: "14",
          name: "Beagle",
          price: 2000,
          description: "Curious and friendly breed.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=4",
              altText: "Beagle",
            },
          ],
        },
        {
          _id: "51",
          name: "Bulldog",
          price: 2000,
          description: "Gentle and affectionate dog.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=5",
              altText: "Bulldog",
            },
          ],
        },
        {
          _id: "61",
          name: "Poodle",
          price: 2000,
          description: "Smart and hypoallergenic breed.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=6",
              altText: "Poodle",
            },
          ],
        },
        {
          _id: "71",
          name: "Shih Tzu",
          price: 2000,
          description: "Small and affectionate companion.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "Shih Tzu",
            },
          ],
        },
        {
          _id: "81",
          name: "Dachshund",
          price: 2000,
          description: "Playful and energetic dog.",
          quantity: 10,
          age: 1,
          trained: "yes",
          images: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "Dachshund",
            },
          ],
        },
      ];setProducts(fetchedProducts);
    }, 1000);   
 }, []
    );
  return (
    <div className="flex flex-col lg:flex-row">
        {/*mobile filter button*/}
        <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
            <FaFilter className="mr-2" />Filters
        </button>
        {/** filter side bar */}
        <div ref={sidebarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar />
        </div>
        <div className="flex-grow p-4">
            <h2 className="text-2xl uppercase mb-4">pets</h2>
            {/** sort options */}
            <SortOptions />
            {/**prduct grid */}
            <ProductGrid products={products}/>
        </div>
    </div>
  )
}

export default CollectionPets;