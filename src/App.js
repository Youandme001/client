import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // Import the UserProvider
import Header from './scences/header'
import HomePage from './scences/home';
import ProductDetail from './scences/productdetail';
import ProductForm from './scences/product';
import Cart from './scences/cart';
import Commande from './scences/commande';
import Login from './scences/login';
import SignUp from './scences/signup';
import Confirmation from './scences/confirmation';
import CheckInformation from './scences/checkinformation';
import UserProfile from './scences/userprofile/UserProfile';
import UpdateUser from './scences/updateuser/UpdateUser';
import UpdatePassword from './scences/updatepassword/UpdatePassword';
// Import other components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './scences/footer';
import AboutUs from './scences/about';
import AboutUs1 from './scences/aboutus';
import LoginCommande from './scences/logincommande';
import BoutiquePage from './scences/boutique';
import OrderHistory from './scences/orderhistory';
import './App.css'
function App() {
  return (
    <div>
      <UserProvider>
       <ToastContainer />
      <Header />
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />
        <Route path="/checkinformation" element={<CheckInformation />} />
        <Route path="/userprofile/:userId" element={<UserProfile />} />
        <Route path="/updateuser/:userId" element={<UpdateUser />} />
        <Route path="/updatepassword/:userId" element={<UpdatePassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/aboutus" element={<AboutUs1 />} />
        <Route path="/logincommande" element={<LoginCommande />} />
        <Route path="/boutique" element={<BoutiquePage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        {/* Define other routes */}
      </Routes>
    
      <Footer />
      </UserProvider>
     
    </div>
  );
}

export default App;
