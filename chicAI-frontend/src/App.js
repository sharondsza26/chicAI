import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';
import { useUser, useAuth } from "@clerk/clerk-react";
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';
import WardrobeManagement from './components/wardrobeManagement/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import OutfitManagement from "./components/outfitsManage/OutfitManagement";
import OutfitCreator from "./components/outfitsManage/OutfitCreator";
import Laundry from './components/Laundry/Laundry';
import Details from './components/wardrobeManagement/IndividualItemView/ItemEditView';
import ProfilePage from './components/ProfilePage/ProfilePage';
import './App.css';

function App() {
  const { isSignedIn } = useUser();
  const { userId } = useAuth();

  return (
    <Router>
      <div className="app-wrapper">
        {isSignedIn && (
          <div className="nav-and-header">
            <NavigationBar />

            <Navbar.Brand href="/" className="navbar-brand">
              <h3 className="text-light">ChicAI</h3>
            </Navbar.Brand>

            <Header />
          </div>
        )}

        {/* Main Content */}
        <Container className="main-content" fluid>
          <Routes>
            {/* Default Route */}
            <Route
              path="/"
              element={
                isSignedIn && userId ? <Navigate to="/outfits" /> : <Homepage />
              }
            />

            {/* Specific Routes */}
            <Route
              path="/outfits"
              element={
                isSignedIn && userId ? <OutfitCreator userId={userId} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/dashboard"
              element={
                isSignedIn && userId ? <Dashboard /> : <Navigate to="/" />
              }
            />

            {/* New Profile Page Route */}
            <Route
              path="/profile"
              element={
                isSignedIn && userId ? <ProfilePage /> : <Navigate to="/" />
              }
            />
            <Route path="/wardrobe-management" element={isSignedIn && userId ? <WardrobeManagement userId={userId} /> : <Navigate to="/" />} />
            <Route path="/laundry" element={isSignedIn && userId ? <Laundry userId={userId} /> : <Navigate to="/" />} />
            <Route path="/details" element={isSignedIn && userId ? <Details userId={userId} /> : <Navigate to="/" />} />
          </Routes>
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
