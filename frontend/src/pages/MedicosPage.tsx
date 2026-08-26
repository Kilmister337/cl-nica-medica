import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Medico, Especialidade } from '../types';

export default function MedicosPage() {
  const [lista, setLista] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [form, setForm] = useState({ nome: '', crm: '', especialidadeId: '' });

  async function carregar() {
    setLista(await api.listarMedicos());
    setEspecialidades(await api.listarEspecialidades());
  }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarMedico({ nome: form.nome, crm: form.crm, especialidadeId: Number(form.especialidadeId) });
    setForm({ nome: '', crm: '', especialidadeId: '' });
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Médicos</h1>
        <p>Corpo clínico da unidade.</p>
      </div>
      <div className="card">
        <form className="grid-form" onSubmit={handleSubmit}>
          <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
          <input placeholder="CRM" value={form.crm} onChange={e => setForm({ ...form, crm: e.target.value })} required />
          <select value={form.especialidadeId} onChange={e => setForm({ ...form, especialidadeId: e.target.value })} required>
            <option value="">Especialidade</option>
            {especialidades.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
          <button type="submit" className="btn-primary">Adicionar</button>
        </form>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Nome</th><th>CRM</th><th>Especialidade</th></tr></thead>
          <tbody>
            {lista.map(m => (
              <tr key={m.id}><td>{m.nome}</td><td>{m.crm}</td><td>{m.especialidade?.nome}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
