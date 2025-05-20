import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx'; // Use relative path properly
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ChakraProvider>
      <WishlistProvider>
      <CartProvider>
      <AuthProvider >
      <App />
      </AuthProvider>
      </CartProvider>
      </WishlistProvider>
    </ChakraProvider>
  </React.StrictMode>
);
