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
      <nav className="w-full flex items-center justify-between py-2 px-5 bg-gradient-to-b from-gray-700 to-gray-800 shadow-md border-b border-gray-600 sticky top-0 z-50">
        {/** left -logo */}
        <div>
          <Link
            to="/"
            className="text-xl font-bold text-white tracking-wide"
          >
            <span className="text-gradient from-slate-300 to-slate-400">PET</span>CONNECT
          </Link>
        </div>
        {/** center nav links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/petsall"
            className="text-gray-300 hover:text-slate-300 text-sm font-semibold transition duration-200"
          >
            Pets
          </Link>
          <Link
            to="/productsall"
            className="text-gray-300 hover:text-slate-300 text-sm font-semibold transition duration-200"
          >
            Supplies
          </Link>
          <Link
            to="/doc"
            className="text-gray-300 hover:text-slate-300 text-sm font-semibold transition duration-200"
          >
            Consult a Vet
          </Link>
        </div>
        {/** right icons*/}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-slate-500 hover:bg-slate-600 px-2 py-0.5 rounded text-sm text-white font-semibold transition duration-200"
            >
              Admin
            </Link>
          )}
          {user && user.role === "doctor" && (
            <Link
              to="/doctor"
              className="block bg-blue-400 hover:bg-blue-500 px-2 py-0.5 rounded text-sm text-white font-semibold transition duration-200"
            >
              Doctor
            </Link>
          )}
          <Link to="/profile" className="hover:text-slate-300 transition duration-200">
            <HiOutlineUser className="h-5 w-5 text-gray-300" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-slate-300 transition duration-200"
          >
            <HiOutlineShoppingBag className="h-5 w-5 text-gray-300" />
            <span className="absolute -top-0.5 bg-slate-400 text-gray-900 text-xs rounded-full px-1 py-0.5 font-semibold">
              {cartItemCount}
            </span>
          </button>
          <button onClick={toggleNavDrawer} className="md:hidden hover:text-slate-300 transition duration-200">
            <HiBars3BottomRight className="h-5 w-5 text-gray-300" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/**mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-gray-700`}
      >
        <div className="flex justify-end p-3">
          <button onClick={toggleNavDrawer} className="hover:text-gray-400 transition duration-200">
            <IoMdClose className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-white">Menu</h2>
          <nav className="space-y-2">
            <Link
              to="/petsall"
              onClick={toggleNavDrawer}
              className="block text-gray-300 hover:text-slate-300 font-semibold transition duration-200"
            >
              Pets
            </Link>
            <Link
              to="/productsall"
              onClick={toggleNavDrawer}
              className="block text-gray-300 hover:text-slate-300 font-semibold transition duration-200"
            >
              Supplies
            </Link>
            <Link
              to="/doc"
              onClick={toggleNavDrawer}
              className="block text-gray-300 hover:text-slate-300 font-semibold transition duration-200"
            >
              Consult a Vet
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;