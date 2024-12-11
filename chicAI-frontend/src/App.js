import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';

function App() {
  const { isSignedIn } = useUser();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <Homepage />} />

          <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
