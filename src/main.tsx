import { StrictMode } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { createRoot } from "react-dom/client";

import SignIn from "./modules/pages/SignIn.tsx";
import Home from "./modules/pages/Home.tsx";
import MyServices from "./modules/pages/MyServices.tsx";
import Opportunities from "./modules/pages/Opportunities.tsx";
import ServiceDetails from "./modules/pages/ServiceDetails.tsx";
import Applications from "./modules/pages/Applications.tsx";

import Profile from "./modules/pages/Profile.tsx";

import Skills from "./modules/pages/admin/Skills.tsx";
import Categories from "./modules/pages/admin/Categories.tsx";

import "./index.scss";

const Main = () => {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<SignIn />} />

        {/* Rotas protegidas */}
        <Route path="/home" element={<Home />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adm-skills" element={<Skills />} />
        <Route path="/adm-categories" element={<Categories />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <Main />
  </StrictMode>
);
