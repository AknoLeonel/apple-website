import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Importar o Provedor da Loja
import { ShopProvider } from './context/ShopContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver o App com o ShopProvider */}
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>,
)