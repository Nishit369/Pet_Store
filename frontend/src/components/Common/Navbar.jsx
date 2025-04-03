import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-0 px-5">
        {/** left -logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            PETCONNECT
          </Link>
        </div>
        {/** center nav links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/petsall" className="text-gray-600 hover:text-black text-sm font-medium ">
            Pets
          </Link>
          <Link to="/productsall" className="text-gray-600 hover:text-black text-sm font-medium ">
            Supplies
          </Link>
          <Link to="/doc" className="text-gray-600 hover:text-black text-sm font-medium space-x-1">
            Consult a Vet
          </Link>
        </div>
        {/** right icons*/}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}
          {user && user.role === "doctor" && (
            <Link
              to="/doctor"
              className="block bg-blue-500 px-2 rounded text-sm text-white"
            >
              Doctor
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-950" />
          </Link>
          <button onClick={toggleCartDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-light-brown text-white text-xs rounded-full px-1.5 py-0.5">
              {cartItemCount}
            </span>
          </button>
          {/** search*/}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 " />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/**mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link to="/petsall" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
              Pet
            </Link>
            <Link to="/productsall" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
              Supplies
            </Link>
            <Link to="/doc" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
              Consult a Vet
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;