import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const AdminLogin = () => {
  const { adminLogin, setView } = useContext(ShopContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (!success) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#101010] border border-white/10 p-8 rounded-3xl w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Área Restrita</h2>
            <p className="text-gray-500 text-sm">Digite a senha de administrador</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    placeholder="Senha de acesso"
                    className={`w-full bg-black border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white outline-none focus:border-blue-500 transition text-center tracking-widest`}
                    autoFocus
                />
                {error && <p className="text-red-500 text-xs text-center mt-2">Senha incorreta.</p>}
            </div>

            <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition"
            >
                Entrar
            </button>
            
            <button 
                type="button"
                onClick={() => setView('client')}
                className="w-full text-gray-500 text-sm py-2 hover:text-white transition"
            >
                Voltar à Loja
            </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;