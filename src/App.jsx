import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/home";
import AboutUs from "./components/About/aboutus";
import Gifts from "./components/Gifts/gifts";
import Popular from "./components/Popular/popular";
import PopularItems from "./components/Popular/popularItems";
import GiftsDetails from "./components/GiftsDetails/GiftsDetails";
import ShoppingCart from "./components/ShoppingCart";
import ContactUs from "./components/ContactUs/ContactUs";
import Customize from "./components/customize";
import AdminPanel from "./components/Admin/page";
import CustomJewelleryPage from "./components/custom-jewellery";
import AddJewelryType from "./components/Admin/add_jewelry_type";
import AddJewelrySpecs from "./components/Admin/add_specs";
import LoginPage from "./components/Login/LoginPage";

export default function App() {
  return (
    <Routes>
      {/* Public routes with Layout (Header & Footer) */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><AboutUs /></Layout>} />
      <Route path="/gifts" element={<Layout><Gifts /></Layout>} />
      <Route path="/popular" element={<Layout><Popular /></Layout>} />
      <Route path="/popularItems" element={<Layout><PopularItems /></Layout>} />
      <Route path="/GiftDetails" element={<Layout><GiftsDetails /></Layout>} />
      <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
      <Route path="/customize" element={<Layout><Customize /></Layout>} />
      <Route path="/custom-jewellery" element={<Layout><CustomJewelleryPage /></Layout>} />
      <Route path="/shopping-cart" element={<Layout><ShoppingCart /></Layout>} />
      
      {/* Admin routes - no Layout (or you can keep them without Layout) */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/jtype" element={<AddJewelryType />} />
      <Route path="/admin/jspecs" element={<AddJewelrySpecs />} />
      <Route path="/admin/login" element={<LoginPage />} />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}