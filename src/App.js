import logo from "./logo.svg";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";

import AdminOrders from "./pages/admin-view/orders";

import ShopLayout from "./components/shop-view/layout";
import NotFound from "./pages/notfound";
import ShopHome from "./pages/shop-view/home";
import Products from "./pages/shop-view/products";
import Checkout from "./pages/shop-view/checkout";
import Account from "./pages/shop-view/account";
import CheckAuth from "./components/common/check-auth";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckUserAuth } from "./store/action/auth";
import HomeView from "./components/home-view/layout";
//import CreateBrands from "./pages/admin-view/create-brands";
import UpdateBrands from "./pages/admin-view/update-brands";
import CreateMainCategory from "./pages/admin-view/create-main-category";
import UpdateMainCategory from "./pages/admin-view/update-main-category";
import CreateCategory from "./pages/admin-view/create-category";
import UpdateCategory from "./pages/admin-view/update-category";
import CreateProducts from "./pages/admin-view/create-products";
import UpdateProducts from "./pages/admin-view/update-products";
import FromERP from "./pages/admin-view/products-from-erp";
import CreateBrands from "./pages/admin-view/create-brands";
import ProductLayout from "./components/product-view/layout";
import CreateWarranty from "./pages/admin-view/create-warranty";
import { Box, CircularProgress } from "@mui/material";
import { GetCartData } from "./store/action/cart";
import CartPage from "./components/cart-view/cart";
import CartLayout from "./components/cart-view/layout";
import VerifyEmail from "./components/common/verify-email";
import Logout from "./components/admin-view/logout";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const userSaved = sessionStorage.getItem("user");
  const parsedUser = userSaved ? JSON.parse(userSaved) : null;
  const userID = parsedUser ? parsedUser.id : null;

  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(CheckUserAuth(token));
  }, [dispatch]);
  useEffect(() => {
    if (userID) {
      dispatch(GetCartData(userID)); // Fetch cart data only if user is logged in
    }
  }, [dispatch, userID]);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeView />} />

        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="brand-create" element={<CreateBrands />} />
          <Route path="warranty-create" element={<CreateWarranty />} />
          <Route path="brand-update" element={<UpdateBrands />} />
          <Route path="main-category-create" element={<CreateMainCategory />} />
          <Route path="main-category-update" element={<UpdateMainCategory />} />
          <Route path="category-create" element={<CreateCategory />} />
          <Route path="category-update" element={<UpdateCategory />} />
          <Route path="product-create" element={<CreateProducts />} />
          <Route path="product-update" element={<UpdateProducts />} />
          <Route path="erp-products" element={<FromERP />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route path="home/:id" element={<ShopHome />} />
        </Route>
        <Route path="/shop" element={<ProductLayout />}>
          <Route path="products" element={<Products user={user} />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route
          path="/cart-view"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <CartLayout />
            </CheckAuth>
          }
        >
          <Route path="cart" element={<CartPage user={user} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
