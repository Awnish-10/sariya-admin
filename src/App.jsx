import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/dashboard"));


const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
const LockScreen = lazy(() => import("./pages/auth/lock-screen"));
const Error = lazy(() => import("./pages/404"));

import Loading from "@/components/Loading";
import Layout from "./layout/Layout";
import Dealer from "./pages/dashboard/Dealer";
import Buyer from "./pages/dashboard/Buyer";
import Product from "./pages/dashboard/Product";
import Banner from "./pages/dashboard/Banner";
import Order from "./pages/dashboard/Order";
import Brand from "./pages/dashboard/Brand";
import FeaturedBrands from "./pages/dashboard/FeaturedBrands";

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass />
            </Suspense>
          }
        />

        <Route
          path="/lock-screen"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen />
            </Suspense>
          }
        />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dealer" element={<Dealer />} />
          <Route path="buyer" element={<Buyer />} />
          <Route path="product" element={<Product />} />
          <Route path="brand" element={<Brand />} />
          <Route path="order" element={<Order />} />
          <Route path="banner" element={<Banner />} />
          <Route path="featured-brands" element={<FeaturedBrands />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />

      </Routes>
    </main>
  );
}

export default App;