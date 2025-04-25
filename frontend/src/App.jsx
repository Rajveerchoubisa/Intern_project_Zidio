// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Shop from "./pages/Shop.jsx";
import CustomerProfile from "./pages/Customerprofile.jsx";
import ProductCategories from './pages/ProductCategories';
import Cart from  './pages/Cart.jsx'
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/shop"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Shop />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<CustomerProfile />} />

        <Route path="/categories" element={<ProductCategories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

      </Routes>
    </Router>
  );
}

export default App;
