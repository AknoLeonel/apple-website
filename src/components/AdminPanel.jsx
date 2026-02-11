import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const AdminPanel = () => {
  // [ALTERADO] Importamos 'logout' em vez de apenas 'setView'
  const { products, inventory, location, setLocation, updateStock, formatMoney, logout } = useContext(ShopContext);

  // Calcular totais
  const totalItems = Object.values(inventory[location]).reduce((acc, item) => acc + item.qty, 0);
  const totalValue = Object.values(inventory[location]).reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6">
      
      {/* Cabeçalho do Admin */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 gap-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Painel de Controle</h1>
        </div>

        <div className="flex items-center gap-4">
            {/* Seletor de Loja */}
            <div className="flex items-center bg-zinc-900 rounded-lg px-4 py-2 border border-white/10">
                <span className="text-gray-400 text-sm mr-2">Editando:</span>
                <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent font-bold text-blue-400 outline-none uppercase cursor-pointer"
                >
                    <option value="barreiras">Barreiras</option>
                    <option value="formosa">Formosa</option>
                </select>
            </div>

            {/* Botão Sair */}
            <button 
                onClick={logout} // [ALTERADO] Usa a função logout para deslogar de verdade
                className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                Sair
            </button>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-500 text-xs uppercase font-bold mb-1">Valor Total em Estoque</p>
            <h3 className="text-3xl font-bold text-white">{formatMoney(totalValue)}</h3>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-500 text-xs uppercase font-bold mb-1">Quantidade de Itens</p>
            <h3 className="text-3xl font-bold text-white">{totalItems} un</h3>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-black/20 text-xs font-mono text-gray-500 uppercase">
                <tr>
                    <th className="p-4 pl-6">Produto</th>
                    <th className="p-4">Estoque (Qtd)</th>
                    <th className="p-4">Preço (R$)</th>
                    <th className="p-4 text-right pr-6">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
                {products.map(p => {
                    const stock = inventory[location][p.id];
                    return (
                        <tr key={p.id} className="hover:bg-white/5 transition group">
                            <td className="p-4 pl-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded p-1">
                                    <img src={p.image} className="w-full h-full object-contain" alt="" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">{p.name}</p>
                                    <p className="text-xs text-gray-500">{p.specs}</p>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => updateStock(p.id, 'qty', Math.max(0, stock.qty - 1))}
                                        className="w-8 h-8 flex items-center justify-center bg-black border border-white/10 rounded hover:bg-white/10"
                                    >-</button>
                                    <input 
                                        type="number" 
                                        value={stock.qty}
                                        onChange={(e) => updateStock(p.id, 'qty', e.target.value)}
                                        className="w-12 text-center bg-transparent font-mono font-bold outline-none"
                                    />
                                    <button 
                                        onClick={() => updateStock(p.id, 'qty', stock.qty + 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-black border border-white/10 rounded hover:bg-white/10"
                                    >+</button>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-1 bg-black border border-white/10 rounded px-3 py-2 w-32 focus-within:border-blue-500 transition">
                                    <span className="text-gray-500">R$</span>
                                    <input 
                                        type="number" 
                                        value={stock.price}
                                        onChange={(e) => updateStock(p.id, 'price', e.target.value)}
                                        className="w-full bg-transparent outline-none font-mono text-right"
                                    />
                                </div>
                            </td>
                            <td className="p-4 pr-6 text-right">
                                {stock.qty > 0 ? (
                                    <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs font-bold border border-green-500/20">Ativo</span>
                                ) : (
                                    <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs font-bold border border-red-500/20">Esgotado</span>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;