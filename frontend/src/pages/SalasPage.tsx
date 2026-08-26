import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Sala } from '../types';

export default function SalasPage() {
  const [lista, setLista] = useState<Sala[]>([]);
  const [form, setForm] = useState({ numero: '', andar: '' });

  async function carregar() { setLista(await api.listarSalas()); }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarSala({ numero: form.numero, andar: Number(form.andar) });
    setForm({ numero: '', andar: '' });
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Salas</h1>
        <p>Consultórios disponíveis para atendimento.</p>
      </div>
      <div className="card">
        <form className="grid-form" onSubmit={handleSubmit}>
          <input placeholder="Número (ex: 101)" value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} required />
          <input type="number" placeholder="Andar" value={form.andar} onChange={e => setForm({ ...form, andar: e.target.value })} required />
          <button type="submit" className="btn-primary">Adicionar</button>
        </form>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Número</th><th>Andar</th></tr></thead>
          <tbody>
            {lista.map(s => (
              <tr key={s.id}><td>{s.numero}</td><td>{s.andar}º andar</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
