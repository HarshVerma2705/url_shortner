import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { UrlProvider } from './store/UrlContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UrlProvider>
          <App />
        </UrlProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);