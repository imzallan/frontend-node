import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from './components/index/HeroSections'
import LoginForm from './components/forms/LoginForm'
import NotFound from './components/404/NotFound'
import Dashboard from './components/dashboard/index';

function App()  {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/404" element={<NotFound/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
