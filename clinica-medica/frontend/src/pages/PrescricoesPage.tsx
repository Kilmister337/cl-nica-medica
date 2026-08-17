import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Prescricao, Consulta } from '../types';

export default function PrescricoesPage() {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [form, setForm] = useState({ consultaId: '', medicamento: '', dosagem: '', instrucoes: '' });

  async function carregar() {
    setPrescricoes(await api.listarPrescricoes());
    setConsultas(await api.listarConsultas());
  }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarPrescricao({
      consultaId: Number(form.consultaId),
      medicamento: form.medicamento,
      dosagem: form.dosagem,
      instrucoes: form.instrucoes,
    });
    setForm({ consultaId: '', medicamento: '', dosagem: '', instrucoes: '' });
    carregar();
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Prescrições</h1>
        <p>Medicamentos prescritos em cada consulta.</p>
      </div>

      <div className="card">
        <h2>Nova prescrição</h2>
        <form className="grid-form" onSubmit={handleSubmit}>
          <select value={form.consultaId} onChange={e => setForm({ ...form, consultaId: e.target.value })} required>
            <option value="">Consulta</option>
            {consultas.map(c => (
              <option key={c.id} value={c.id}>#{c.id} — {c.paciente?.nome} ({new Date(c.dataHora).toLocaleDateString('pt-BR')})</option>
            ))}
          </select>
          <input placeholder="Medicamento" value={form.medicamento} onChange={e => setForm({ ...form, medicamento: e.target.value })} required />
          {/* OBS: campo de dosagem sem "required" — o formulário deixa salvar prescrição sem dosagem preenchida. */}
          <input placeholder="Dosagem" value={form.dosagem} onChange={e => setForm({ ...form, dosagem: e.target.value })} />
          <input placeholder="Instruções" value={form.instrucoes} onChange={e => setForm({ ...form, instrucoes: e.target.value })} />
          <button type="submit" className="btn-primary">Registrar</button>
        </form>
      </div>

      <div className="card">
        <table className="data-table">
          <thead><tr><th>Paciente</th><th>Medicamento</th><th>Dosagem</th><th>Instruções</th></tr></thead>
          <tbody>
            {prescricoes.map(p => (
              <tr key={p.id}>
                <td>{p.consulta?.paciente?.nome}</td>
                <td>{p.medicamento}</td>
                <td>{p.dosagem || <span className="tag tag-danger">vazio</span>}</td>
                <td>{p.instrucoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
