import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
)
