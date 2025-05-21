import { StrictMode } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import SignIn from "./modules/pages/SignIn.tsx";
import Home from "./modules/pages/Home.tsx";
import MyServices from "./modules/pages/MyServices.tsx";
import Opportunities from "./modules/pages/Opportunities.tsx";
import ServiceDetails from "./modules/pages/ServiceDetails.tsx";

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
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
