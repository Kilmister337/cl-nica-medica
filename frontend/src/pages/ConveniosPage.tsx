import { useEffect, useState } from 'react';
import { api } from '../api';
import type { ConvenioSaude } from '../types';

export default function ConveniosPage() {
  const [lista, setLista] = useState<ConvenioSaude[]>([]);
  const [form, setForm] = useState({ nome: '', percentualCobertura: '' });

  async function carregar() { setLista(await api.listarConvenios()); }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarConvenio({ nome: form.nome, percentualCobertura: Number(form.percentualCobertura) });
    setForm({ nome: '', percentualCobertura: '' });
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Convênios</h1>
        <p>Planos de saúde aceitos e o percentual de cobertura de cada um.</p>
      </div>
      <div className="card">
        <form className="grid-form" onSubmit={handleSubmit}>
          <input placeholder="Nome do convênio" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
          <input type="number" step="0.1" placeholder="Cobertura (%)" value={form.percentualCobertura}
            onChange={e => setForm({ ...form, percentualCobertura: e.target.value })} required />
          <button type="submit" className="btn-primary">Adicionar</button>
        </form>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Nome</th><th>Cobertura</th></tr></thead>
          <tbody>
            {lista.map(c => (
              <tr key={c.id}><td>{c.nome}</td><td>{c.percentualCobertura}%</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
