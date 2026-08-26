import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Exame, Consulta } from '../types';

export default function ExamesPage() {
  const [exames, setExames] = useState<Exame[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [form, setForm] = useState({ consultaId: '', tipo: '', dataSolicitacao: '' });
  const [resultados, setResultados] = useState<Record<number, string>>({});

  async function carregar() {
    setExames(await api.listarExames());
    setConsultas(await api.listarConsultas());
  }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarExame({
      consultaId: Number(form.consultaId),
      tipo: form.tipo,
      dataSolicitacao: form.dataSolicitacao,
    });
    setForm({ consultaId: '', tipo: '', dataSolicitacao: '' });
    carregar();
  }

  async function handleRegistrarResultado(id: number) {
    const resultado = resultados[id];
    if (!resultado) return;
    await api.registrarResultadoExame(id, resultado);
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Exames</h1>
        <p>Exames solicitados e seus resultados.</p>
      </div>

      <div className="card">
        <h2>Solicitar exame</h2>
        <form className="grid-form" onSubmit={handleSubmit}>
          <select value={form.consultaId} onChange={e => setForm({ ...form, consultaId: e.target.value })} required>
            <option value="">Consulta</option>
            {consultas.map(c => (
              <option key={c.id} value={c.id}>#{c.id} — {c.paciente?.nome}</option>
            ))}
          </select>
          <input placeholder="Tipo de exame" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required />
          <input type="date" value={form.dataSolicitacao} onChange={e => setForm({ ...form, dataSolicitacao: e.target.value })} required />
          <button type="submit" className="btn-primary">Solicitar</button>
        </form>
      </div>

      <div className="card">
        <table className="data-table">
          <thead><tr><th>Paciente</th><th>Tipo</th><th>Status</th><th>Resultado</th></tr></thead>
          <tbody>
            {exames.map(ex => (
              <tr key={ex.id}>
                <td>{ex.consulta?.paciente?.nome}</td>
                <td>{ex.tipo}</td>
                <td><span className={'tag ' + (ex.status === 'REALIZADO' ? 'tag-success' : 'tag-muted')}>{ex.status}</span></td>
                <td>
                  {ex.resultado ? ex.resultado : (
                    <div className="inline-form">
                      <input
                        placeholder="Registrar resultado"
                        value={resultados[ex.id] || ''}
                        onChange={e => setResultados({ ...resultados, [ex.id]: e.target.value })}
                      />
                      <button className="btn-secondary" onClick={() => handleRegistrarResultado(ex.id)}>Salvar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
