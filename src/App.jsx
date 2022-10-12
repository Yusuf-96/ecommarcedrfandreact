import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Orders from "./pages/Orders";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import Loading from "./components/Loading";
import { isAuthenticated } from "./utils/auth";
import SalePage from "./pages/SalePage";
import UserPage from "./pages/UserPage";
import RolePage from "./pages/RolePage";
import ReportPage from "./pages/ReportPage";
import SaleDetails from "./pages/SaleDetails";
import ProductUpload from "./components/ProductUpload";

const App = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const showSideBar = () => {
    setIsOpen(!isOpen);
  };

  const auth = isAuthenticated();
  useEffect(() => {
    if (auth) {
      setTimeout(() => setisLoading(false), 3000);
    }
  }, [auth]);
  return (
    <Router>
      <Header isOpen={isOpen} toggle={showSideBar} />
      <div className="flex  pt-16  pb-28 lg:pb-0 bg-gray-100">
        {auth ? <SideBar isOpen={isOpen} toggle={showSideBar} /> : null}

        {/* <Sidebars /> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoutes>
                {isLoading ? <Loading /> : <HomePage />}
              </PrivateRoutes>
            }
          />
          <Route
            path="/product"
            element={
              <PrivateRoutes>
                <ProductPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/shop"
            element={
              <PrivateRoutes>
                <ShopPage />
              </PrivateRoutes>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoutes>
                <Orders />
              </PrivateRoutes>
            }
          />
          <Route
            path="/salepoint"
            element={
              <PrivateRoutes>
                <SalePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoutes>
                <UserPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/role"
            element={
              <PrivateRoutes>
                <RolePage />
              </PrivateRoutes>
            }
          />

          <Route
            path="/report"
            element={
              <PrivateRoutes>
                <ReportPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/all-salles"
            element={
              <PrivateRoutes>
                <SaleDetails />
              </PrivateRoutes>
            }
          />
          <Route
            path="/product-upload"
            element={
              <PrivateRoutes>
                <ProductUpload />
              </PrivateRoutes>
            }
          />
          {/* <Route
            path="/"
            element={
              <PrivateRoutes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="sale" element={<SalesPage />} />
                <Route path="sales" element={<SaleModal />} />
                <Route path="orders" element={<Orders />} />
              </PrivateRoutes>
            }
          /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
