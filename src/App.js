import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const PrivateRoute = ({ children }) => {
  const logged = localStorage.getItem('loggedIn') === 'true';
  return logged ? children : <Navigate to="/" replace />;
};

const App=()=> {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
