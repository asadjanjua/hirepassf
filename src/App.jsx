import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Signup />
      </main>
      <Footer />
    </div>
  );
};

export default App;