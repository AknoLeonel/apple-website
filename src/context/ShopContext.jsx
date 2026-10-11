import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { store } from '../config/store';
import { products as catalog } from '../data/catalog';
import { formatMoney } from '../utils/format';

export const ShopContext = createContext();

// Chaves versionadas: ao trocar o catálogo, dados antigos salvos no navegador
// (preços de seminovos, carrinho com produtos que não existem mais) são ignorados.
const KEYS = {
  cart: 'psiphones_cart_v2',
  overrides: 'psiphones_overrides_v2',
  location: 'psiphones_location',
};

const MAX_QTY_PER_ITEM = 5;

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Navegação anônima / armazenamento bloqueado: segue sem salvar.
  }
};

const isAdminHash = () => typeof window !== 'undefined' && window.location.hash === '#admin';

export const ShopProvider = ({ children }) => {
  const [view, setViewState] = useState(isAdminHash() ? 'admin' : 'client');
  const [location, setLocation] = useState(() => {
    const saved = readStorage(KEYS.location, null);
    return store.locations.some((l) => l.id === saved) ? saved : store.locations[0].id;
  });
  const [cart, setCart] = useState(() =>
    readStorage(KEYS.cart, []).filter((item) => catalog.some((p) => p.id === item.id))
  );
  // Ajustes feitos no painel admin: { [id]: { price, basePrice, status: { [loja]: status } } }
  const [overrides, setOverrides] = useState(() => readStorage(KEYS.overrides, {}));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => writeStorage(KEYS.cart, cart), [cart]);
  useEffect(() => writeStorage(KEYS.overrides, overrides), [overrides]);
  useEffect(() => writeStorage(KEYS.location, location), [location]);

  // Acesso ao painel pelo endereço www.psiphones.com.br/#admin
  useEffect(() => {
    const onHash = () => setViewState(isAdminHash() ? 'admin' : 'client');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const setView = useCallback((next) => {
    if (next === 'admin') {
      window.location.hash = 'admin';
    } else if (isAdminHash()) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setViewState(next);
  }, []);

  // Catálogo final = constantes + ajustes do admin. Um ajuste de preço só vale
  // enquanto o preço base do código for o mesmo de quando ele foi feito, assim
  // uma atualização de preço no código nunca fica escondida por um valor antigo.
  const products = useMemo(
    () =>
      catalog.map((p) => {
        const o = overrides[p.id] || {};
        const price = o.price != null && o.basePrice === p.price ? o.price : p.price;
        return { ...p, price };
      }),
    [overrides]
  );

  const getStatus = useCallback(
    (id, loc = location) => overrides[id]?.status?.[loc] || 'disponivel',
    [overrides, location]
  );

  const addToCart = (id) => {
    if (getStatus(id) === 'esgotado') return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, qty: Math.min(MAX_QTY_PER_ITEM, i.qty + 1) } : i
        );
      }
      return [...prev, { id, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const changeQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY_PER_ITEM, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen((open) => !open);

  const updatePrice = (id, value) => {
    const base = catalog.find((p) => p.id === id).price;
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], price: Number(value), basePrice: base },
    }));
  };

  const updateStatus = (id, status) =>
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: { ...prev[id]?.status, [location]: status } },
    }));

  const resetOverrides = () => setOverrides({});

  const adminLogin = (password) => {
    const expected = import.meta.env.VITE_ADMIN_PASSWORD;
    if (expected && password === expected) {
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
    <ShopContext.Provider
      value={{
        products,
        location,
        setLocation,
        getStatus,
        cart,
        addToCart,
        changeQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        toggleCart,
        formatMoney,
        view,
        setView,
        updatePrice,
        updateStatus,
        resetOverrides,
        isAuthenticated,
        adminLogin,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
