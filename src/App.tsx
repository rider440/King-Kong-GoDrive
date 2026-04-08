import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </ToastProvider>
  );
}

export default App;
