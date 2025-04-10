import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPets from "./pages/CollectionPets";
import { Toaster } from "sonner";
import ProductDetails from "./components/Product/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderMangement from "./components/Admin/OrderMangement";
import PetManagement from "./components/Admin/PetManagement";
import CollectionProducts from "./pages/CollectionProducts";
import DocHomePage from "./pages/DocHomePage";
import AppointmentPage from "./pages/AppointmentPage";
import CollectionDocs from "./pages/CollectionDocs";
import SchedulePage from "./pages/Schedule";
import DoctorLayout from "./components/Layout/DoctorLayout";
import DoctorAppointmentPage from "./components/Doctor/DoctorAppointmentPage";
import PetPayment from "./components/Cart/PetPayment";
import DoctorRegister from "./pages/DoctorRegister";
import PetSuccessPage from "./pages/PetSuccessPage";
import AppointmentSummary from "./components/Doctor/DoctorAppointmentSummary";


import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import AdminAppointment from "./components/Admin/AdminAppointment";
import PetCheckout from "./pages/PetCheckout";
import TransactionSummary from "./components/Admin/TransactionSummary";
import AboutUs from "./pages/About";
import Footer from "./components/Common/Footer";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="profile" element={<Profile />} /> {/* Changed to lowercase */}
          <Route path="petsall" element={<CollectionPets />} /> {/* Removed leading slash */}
          <Route path="productsall" element={<CollectionProducts />} /> {/* Removed leading slash */}
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} /> {/* Removed leading slash */}
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="doc" element={<DocHomePage />} />
          <Route path="appointment/:id" element={<AppointmentPage />} />
          <Route path="collection-docs" element={<CollectionDocs />} />
          <Route path="/pets/:productId" element={<PetCheckout />} />
          <Route path="/pet/checkout/:id" element={<PetPayment />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/pet/success/:productId" element={<PetSuccessPage />} />
          <Route path="/footer" element={<Footer />} />

          <Route path="/about" element={<AboutUs/>} />
        </Route>
        {/* Admin Routes - You can add an actual admin layout later */}
        <Route path="/admin" element={<ProtectedRoute role={'admin'}><AdminLayout /></ProtectedRoute>} >

            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="pets" element={<PetManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderMangement />} />
            <Route path="appointment" element={<AdminAppointment />} />
            <Route path="transaction-summary" element={<TransactionSummary />} />
        </Route>

        

        

        {/* Doctor Routes */}
        <Route path="/doctor" element={<ProtectedRoute role={'doctor'}><DoctorLayout /></ProtectedRoute>} >
            <Route index element={<DoctorAppointmentPage />} />
            <Route path="summary" element={<AppointmentSummary />} />
        </Route>


      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;