import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';
import WardrobeManagement from './components/wardrobeManagement/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import Laundry from './components/Laundry/Laundry';

function App() {
  return (
    <Router>
    <Container className='App' fluid>
      {/* Header */}
      <div className='nav-and-header'>

      {/* Navigation Bar */}
        <NavigationBar />

        {/* Nav Bar Brand */}
        <div className='navbar-brand-app'>
        <Navbar.Brand href="#chic-ai" className='navbar-brand'>
          ChicAI</Navbar.Brand>
          </div>

        {/* Header Content */}
        <Header />
      </div>

      <Routes>
          {/* Default Route */}
          <Route path="/" element={<WardrobeManagement />} />

          {/* Specific Routes */}
          <Route path="/wardrobe-management" element={<WardrobeManagement />} />
          <Route path="/laundry" element={<Laundry />} />
        </Routes>

      {/* Footer Content */}
      <Footer />
      </Container>
      </Router>
  );
}

export default App;
