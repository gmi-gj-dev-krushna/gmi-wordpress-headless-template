import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LocalWordPressMedia from "./pages/LocalWordPressMedia";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ResourcesPage from "./pages/ResourcesPage";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Team from "./pages/Team";
import SinglePost from "./pages/SinglePost";

export default function App() {
  return (
    <Router>
      <div className="bg-[#030308] min-h-screen">
        <Header />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/media" element={<LocalWordPressMedia />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/teams" element={<Team />} />
            <Route path="/:type/:slug" element={<SinglePost />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
