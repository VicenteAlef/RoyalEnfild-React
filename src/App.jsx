import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, BannerFooter } from "./Components";
import Home from "./pages/Home";
import MotoDetail from "./pages/MotoDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moto-detail/:id" element={<MotoDetail />} />
      </Routes>
      <BannerFooter />
    </>
  );
}

export default App;
