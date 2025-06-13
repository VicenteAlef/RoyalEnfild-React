import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, BannerFooter, Footer } from "./Components";
import Home from "./pages/Home";
import MotoDetail from "./pages/MotoDetail";

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] w-full min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moto-detail/:id" element={<MotoDetail />} />
        </Routes>
        <BannerFooter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
