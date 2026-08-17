import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Especialidade } from '../types';

export default function EspecialidadesPage() {
  const [lista, setLista] = useState<Especialidade[]>([]);
  const [nome, setNome] = useState('');

  async function carregar() { setLista(await api.listarEspecialidades()); }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    await api.criarEspecialidade(nome.trim());
    setNome('');
    carregar();
  }

  async function handleExcluir(id: number, nomeEsp: string) {
    if (!confirm(`Excluir a especialidade "${nomeEsp}"?`)) return;
    await api.excluirEspecialidade(id);
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Especialidades</h1>
        <p>Áreas médicas atendidas pela clínica.</p>
      </div>
      <div className="card">
        <form className="inline-form" onSubmit={handleSubmit}>
          <input placeholder="Nome da especialidade" value={nome} onChange={e => setNome(e.target.value)} />
          <button type="submit" className="btn-primary">Adicionar</button>
        </form>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Nome</th><th></th></tr></thead>
          <tbody>
            {lista.map(e => (
              <tr key={e.id}>
                <td>{e.nome}</td>
                <td className="col-actions"><button className="link-danger" onClick={() => handleExcluir(e.id, e.nome)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
