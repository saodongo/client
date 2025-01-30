import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import PhoneList from './Components/PhoneList';
import FeatureList from './Components/FeatureList'; // If you want to add FeatureList
import ProfileList from './Components/ProfileList'; // If you want to add ProfileList

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<PhoneList />} />
          <Route path="/features" element={<FeatureList />} /> {/* If you want to show FeatureList */}
          <Route path="/ProfilesList" element={<ProfileList />} /> {/* If you want to show ProfileList */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;