import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Layout from "./layout/Layout";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { SkeletonTheme } from "react-loading-skeleton";
import Order from "./pages/Order";
import ProtectedRouter from "./router/ProtectedRouter";

const App = () => {
  return (
    <div className='h-screen text-slate-700 bg-[#fff]'>
      <Toaster />
      <SkeletonTheme baseColor='#d2cfd1' highlightColor='#bebbbc'>
        <Router>
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='cart' element={<Cart />} />
              <Route path='/Shop' element={<Products category={"Shop"} />} />
              <Route
                path='/Electronics'
                element={<Products category={"Electronics"} />}
              />
              <Route path='/Books' element={<Products category={"Books"} />} />
              <Route
                path='/Groceries'
                element={<Products category={"Groceries"} />}
              />
              <Route
                path='/clothes'
                element={<Products category={"clothes"} />}
              />
              <Route
                path='/Beauty'
                element={<Products category={"Beauty"} />}
              />
              <Route
                path='/Search'
                element={<Products category={"Search"} />}
              />
              <Route path='/product/:slug' element={<ProductDetail />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route element={<ProtectedRouter />}>
                <Route path='/order' element={<Order />} />
                <Route path='/order/:id' element={<Order />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </SkeletonTheme>
    </div>
  );
};

export default App;
