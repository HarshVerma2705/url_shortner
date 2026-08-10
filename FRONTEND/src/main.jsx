
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { UrlProvider } from './store/UrlContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UrlProvider>
        <App />
      </UrlProvider>
    </AuthProvider>
  </BrowserRouter>
);