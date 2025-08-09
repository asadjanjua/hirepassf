import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './components/Login';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/dashboard" element={isAuthenticated ? <div>Dashboard</div> : <Login />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;