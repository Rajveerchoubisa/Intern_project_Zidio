// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Shop from "./pages/Shop.jsx";
import CustomerProfile from "./pages/Customerprofile.jsx";
import ProductCategories from "./pages/ProductCategories";
import Cart from "./pages/Cart.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProducts from "./pages/AdminProduct.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import ManageOrders from "./pages/ManageOrders.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminCoupons from "./pages/AdminCoupons.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import MyOrders from "./pages/MyOrder.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Footer from "./pages/Footer.jsx";
import AdminFooter from "./pages/AdminFooter.jsx";
import { useAuth } from "./context/AuthContext";
import WishlistPage from "./pages/WishlistPage.jsx";

function App() {
  const { user } = useAuth();
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

        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/categories" element={<ProductCategories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/wishlist" element={WishlistPage} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute allowedRoles={["admin"]}>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add-product"
          element={
            <AdminProtectedRoute allowedRoles={["admin"]}>
              <AddProduct />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminProtectedRoute allowedRoles={["admin"]}>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin/orders" element={<ManageOrders />} />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin/coupons" element={<AdminCoupons />} />

        <Route path="admin/analytics" element={<AdminAnalytics />} />

        <Route path="/my-orders" element={<MyOrders />} />

      </Routes>
      {user?.role === "admin" ? <AdminFooter /> : <Footer />}
    </Router>
  );
}

export default App;
