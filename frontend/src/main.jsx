import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx'; // Use relative path properly
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ChakraProvider>
      <CartProvider>
      <AuthProvider >
      <App />
      </AuthProvider>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
