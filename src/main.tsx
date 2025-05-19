import { StrictMode } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import SignIn from "./modules/pages/SignIn.tsx";
import Home from "./modules/pages/Home.tsx";
import MyServices from "./modules/pages/MyServices.tsx";

import "./index.scss";
const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-services" element={<MyServices />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
