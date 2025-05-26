import { StrictMode } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import SignIn from "./modules/pages/SignIn.tsx";
import Home from "./modules/pages/Home.tsx";
import MyServices from "./modules/pages/MyServices.tsx";
import Opportunities from "./modules/pages/Opportunities.tsx";
import ServiceDetails from "./modules/pages/ServiceDetails.tsx";
import Applications from "./modules/pages/Applications.tsx";

import Skills from "./modules/pages/admin/Skills.tsx";
import Categories from "./modules/pages/admin/Categories.tsx";

import "./index.scss";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/applications" element={<Applications />} />

        <Route path="/adm-skills" element={<Skills />} />
        <Route path="/adm-categories" element={<Categories />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
