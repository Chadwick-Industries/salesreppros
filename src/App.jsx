import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Directory from "./pages/Directory";
import RepProfile from "./pages/RepProfile";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/rep/:id" element={<RepProfile />} />

        {/* Auth & member pages */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}