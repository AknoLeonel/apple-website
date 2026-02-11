import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // --- 1. CATÁLOGO ---
  const products = [
    { id: 151, name: "iPhone 15 Pro Max", brand: "Apple", image: "/assets/images/black.jpg", specs: "256GB - Titânio Natural" },
    { id: 152, name: "iPhone 15 Pro", brand: "Apple", image: "/assets/images/blue.jpg", specs: "128GB - Titânio Azul" },
    { id: 153, name: "iPhone 15", brand: "Apple", image: "/assets/images/yellow.jpg", specs: "128GB - Amarelo" },
    { id: 141, name: "iPhone 14 Pro Max", brand: "Apple", image: "/assets/images/black.jpg", specs: "256GB - Preto Espacial" },
    { id: 142, name: "iPhone 14 Pro", brand: "Apple", image: "/assets/images/white.jpg", specs: "128GB - Prateado" },
    { id: 143, name: "iPhone 14", brand: "Apple", image: "/assets/images/blue.jpg", specs: "128GB - Azul" },
    { id: 131, name: "iPhone 13 Pro Max", brand: "Apple", image: "/assets/images/explore1.jpg", specs: "128GB - Azul Serra" },
    { id: 132, name: "iPhone 13", brand: "Apple", image: "/assets/images/black.jpg", specs: "128GB - Meia-noite" },
    { id: 121, name: "iPhone 12 Pro Max", brand: "Apple", image: "/assets/images/explore2.jpg", specs: "256GB - Azul Pacífico" },
    { id: 122, name: "iPhone 12", brand: "Apple", image: "/assets/images/white.jpg", specs: "64GB - Branco" },
    { id: 111, name: "iPhone 11", brand: "Apple", image: "/assets/images/yellow.jpg", specs: "128GB - Preto" },
    { id: 112, name: "iPhone 11", brand: "Apple", image: "/assets/images/white.jpg", specs: "64GB - Branco" },
  ];

  const initialInventory = {
    'barreiras': {
      151: { qty: 2, price: 6890.00 }, 152: { qty: 1, price: 5990.00 }, 153: { qty: 3, price: 4590.00 },
      141: { qty: 4, price: 5490.00 }, 142: { qty: 0, price: 4890.00 }, 143: { qty: 5, price: 3690.00 },
      131: { qty: 3, price: 4290.00 }, 132: { qty: 8, price: 2990.00 },
      121: { qty: 2, price: 3190.00 }, 122: { qty: 6, price: 2190.00 },
      111: { qty: 10, price: 1890.00 }, 112: { qty: 4, price: 1690.00 },
    },
    'formosa': {
      151: { qty: 1, price: 6890.00 }, 152: { qty: 2, price: 5990.00 }, 153: { qty: 0, price: 4590.00 },
      141: { qty: 2, price: 5490.00 }, 142: { qty: 3, price: 4890.00 }, 143: { qty: 4, price: 3690.00 },
      131: { qty: 1, price: 4290.00 }, 132: { qty: 6, price: 2990.00 },
      121: { qty: 0, price: 3190.00 }, 122: { qty: 8, price: 2190.00 },
      111: { qty: 5, price: 1890.00 }, 112: { qty: 12, price: 1690.00 },
    }
  };

  // --- ESTADOS ---
  const [view, setView] = useState('client');
  const [location, setLocation] = useState('barreiras');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inventory, setInventory] = useState(initialInventory);
  
  // [NOVO] Estado de Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- PERSISTÊNCIA ---
  useEffect(() => {
    const savedCart = localStorage.getItem('nexus_cart');
    const savedInv = localStorage.getItem('nexus_inventory');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedInv) setInventory(JSON.parse(savedInv));
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    localStorage.setItem('nexus_inventory', JSON.stringify(inventory));
  }, [cart, inventory]);

  // --- FUNÇÕES ---
  const addToCart = (id) => {
    const stockItem = inventory[location][id];
    if (stockItem.qty <= 0) return alert("Estoque esgotado!");
    const existing = cart.find(i => i.id === id);
    if (existing && existing.qty >= stockItem.qty) return alert("Limite atingido!");
    
    if (existing) {
      setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const formatMoney = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const updateStock = (prodId, field, value) => {
    setInventory(prev => ({
      ...prev,
      [location]: {
        ...prev[location],
        [prodId]: {
          ...prev[location][prodId],
          [field]: Number(value)
        }
      }
    }));
  };

  // [NOVO] Funções de Login
const adminLogin = (password) => {
    // Em vez de 'nexus123', usamos a variável de ambiente
    // O Vite acessa via import.meta.env
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) { 
        setIsAuthenticated(true);
        return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setView('client');
  };

  return (
    <ShopContext.Provider value={{
      products, inventory, location, setLocation, cart, addToCart, removeFromCart, 
      isCartOpen, toggleCart, formatMoney, 
      view, setView, updateStock,
      isAuthenticated, adminLogin, logout // Exportando novas funções
    }}>
      {children}
    </ShopContext.Provider>
  );
};