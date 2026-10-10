import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { store } from '../../config/store';
import { stockStatus } from '../../data/catalog';
import ProductImage from '../ui/ProductImage';

const AdminPanel = () => {
  const { products, location, setLocation, getStatus, updatePrice, updateStatus, resetOverrides, formatMoney, logout } = useContext(ShopContext);

  const counts = products.reduce((acc, p) => {
    const s = getStatus(p.id);
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 border-b border-white/10 pb-6 gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Painel de Controle</h1>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center bg-[#161617] rounded-lg px-4 py-2 border border-white/10">
            <span className="text-gray-200 text-sm mr-2">Loja:</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent font-semibold text-blue outline-none cursor-pointer"
            >
              {store.locations.map((l) => (
                <option key={l.id} value={l.id} className="bg-black">{l.label}</option>
              ))}
            </select>
          </label>
          <button
            onClick={() => window.confirm('Voltar todos os preços e status para os valores do site?') && resetOverrides()}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-sm"
          >
            Restaurar padrão
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition text-sm"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
        As alterações deste painel ficam salvas <strong>somente neste navegador</strong>. Para mudar preços para todos os
        clientes, edite o catálogo em <code className="font-mono">src/constants/index.js</code> e publique o site.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {Object.entries(stockStatus).map(([key, s]) => (
          <div key={key} className="bg-[#161617] border border-white/5 p-5 rounded-2xl">
            <p className="text-gray-200 text-xs uppercase font-semibold mb-1">{s.label}</p>
            <p className="text-3xl font-semibold">{counts[key] || 0}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#161617] border border-white/5 rounded-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead className="bg-black/20 text-xs text-gray-200 uppercase">
            <tr>
              <th className="p-4 pl-6">Produto</th>
              <th className="p-4">Preço (R$)</th>
              <th className="p-4 pr-6">Status nesta loja</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3">
                    <ProductImage product={p} className="h-12 w-auto" />
                    <div>
                      <p className="font-semibold">{p.model}</p>
                      <p className="text-xs text-gray-200">{p.storage} · {formatMoney(p.price)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={p.price}
                    onChange={(e) => updatePrice(p.id, e.target.value)}
                    className="w-36 bg-black border border-white/10 rounded px-3 py-2 outline-none font-mono text-right focus:border-blue"
                    aria-label={`Preço do ${p.model} ${p.storage}`}
                  />
                </td>
                <td className="p-4 pr-6">
                  <select
                    value={getStatus(p.id)}
                    onChange={(e) => updateStatus(p.id, e.target.value)}
                    className="bg-black border border-white/10 rounded px-3 py-2 outline-none cursor-pointer focus:border-blue"
                    aria-label={`Status do ${p.model} ${p.storage}`}
                  >
                    {Object.entries(stockStatus).map(([key, s]) => (
                      <option key={key} value={key}>{s.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
