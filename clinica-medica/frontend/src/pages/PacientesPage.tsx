import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Paciente, ConvenioSaude } from '../types';

export default function PacientesPage() {
  const [lista, setLista] = useState<Paciente[]>([]);
  const [convenios, setConvenios] = useState<ConvenioSaude[]>([]);
  const [form, setForm] = useState({ nome: '', cpf: '', dataNascimento: '', telefone: '', convenioId: '' });

  async function carregar() {
    setLista(await api.listarPacientes());
    setConvenios(await api.listarConvenios());
  }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarPaciente({
      nome: form.nome, cpf: form.cpf, dataNascimento: form.dataNascimento, telefone: form.telefone,
      convenioId: form.convenioId ? Number(form.convenioId) : null,
    });
    setForm({ nome: '', cpf: '', dataNascimento: '', telefone: '', convenioId: '' });
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Pacientes</h1>
        <p>Cadastro de pacientes da clínica.</p>
      </div>
      <div className="card">
        <form className="grid-form" onSubmit={handleSubmit}>
          <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
          <input placeholder="CPF" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} required />
          <input type="date" value={form.dataNascimento} onChange={e => setForm({ ...form, dataNascimento: e.target.value })} required />
          <input placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
          <select value={form.convenioId} onChange={e => setForm({ ...form, convenioId: e.target.value })}>
            <option value="">Particular (sem convênio)</option>
            {convenios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
          <button type="submit" className="btn-primary">Adicionar</button>
        </form>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Nome</th><th>CPF</th><th>Telefone</th><th>Convênio</th></tr></thead>
          <tbody>
            {lista.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td><td>{p.cpf}</td><td>{p.telefone}</td>
                <td>{p.convenio ? p.convenio.nome : <span className="tag tag-muted">Particular</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
