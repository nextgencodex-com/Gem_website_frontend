import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/home";
import AboutUs from "./components/About/aboutus";
import Blog from "./components/Blog/Blog";
import GemCollection from "./components/GemCollection/GemCollection";
import JewelleryCollection from "./components/JewelleryCollection/JewelleryCollection";
import ContactUs from "./components/ContactUs/ContactUs";
import GemDetails from "./components/gem-details";
import JewDetails from "./components/jew-details";
import Customize from "./components/customize";
import AdminPanel from "./components/Admin/page";
import CustomJewelleryPage from "./components/custom-jewellery";
import AddJewelryType from "./components/Admin/add_jewelry_type";
import AddJewelrySpecs from "./components/Admin/add_specs";
import LoginPage from "./components/Login/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><AboutUs /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/gem-collection" element={<Layout><GemCollection /></Layout>} />
      <Route path="/jewellery-collection" element={<Layout><JewelleryCollection /></Layout>} />
      <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
      <Route path="/customize" element={<Layout><Customize /></Layout>} />
      <Route path="/custom-jewellery" element={<CustomJewelleryPage />} />
      <Route path="/gem-details/:id" element={<Layout><GemDetails /></Layout>} />
      <Route path="/jew-details/:id" element={<Layout><JewDetails /></Layout>} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/jtype" element={<AddJewelryType />} />
      <Route path="/admin/jspecs" element={<AddJewelrySpecs />} />
      <Route path="/admin/login" element={<LoginPage />} />
      {/* Add other admin routes as needed */}
    </Routes>
  );
}
