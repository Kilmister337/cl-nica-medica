import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Consulta, Paciente, Medico, Sala } from '../types';

const STATUS_OPCOES = [
  { valor: 'agendada', label: 'Agendada' },
  { valor: 'realizada', label: 'Realizada' },
  { valor: 'cancelada', label: 'Cancelada' },
];

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [filtroStatus, setFiltroStatus] = useState('');

  const [form, setForm] = useState({
    pacienteId: '', medicoId: '', salaId: '', dataHora: '', valor: '', observacoes: '',
  });

  async function carregar() {
    setConsultas(await api.listarConsultas());
    setPacientes(await api.listarPacientes());
    setMedicos(await api.listarMedicos());
    setSalas(await api.listarSalas());
  }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarConsulta({
      pacienteId: Number(form.pacienteId),
      medicoId: Number(form.medicoId),
      salaId: Number(form.salaId),
      dataHora: form.dataHora,
      valor: Number(form.valor),
      observacoes: form.observacoes,
    });
    // OBS: o formulário não é limpo depois de agendar — os campos continuam preenchidos
    // com os mesmos valores, o que facilita agendar a mesma consulta duas vezes sem querer.
    carregar();
  }

  async function handleStatus(id: number, status: string) {
    await api.atualizarStatusConsulta(id, status);
    carregar();
  }

  // OBS: o filtro compara com valores em minúsculo ("agendada"), mas o status salvo no
  // banco está em maiúsculo ("AGENDADA") — a comparação nunca bate e o filtro sempre
  // esconde tudo quando um status é selecionado.
  const consultasFiltradas = filtroStatus
    ? consultas.filter(c => c.status === filtroStatus)
    : consultas;

  function formatarDataHora(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Consultas</h1>
        <p>Agende novas consultas e acompanhe a agenda da clínica.</p>
      </div>

      <div className="card">
        <h2>Agendar consulta</h2>
        <form className="grid-form" onSubmit={handleSubmit}>
          <select value={form.pacienteId} onChange={e => setForm({ ...form, pacienteId: e.target.value })} required>
            <option value="">Paciente</option>
            {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
          <select value={form.medicoId} onChange={e => setForm({ ...form, medicoId: e.target.value })} required>
            <option value="">Médico</option>
            {medicos.map(m => <option key={m.id} value={m.id}>{m.nome} — {m.especialidade?.nome}</option>)}
          </select>
          <select value={form.salaId} onChange={e => setForm({ ...form, salaId: e.target.value })} required>
            <option value="">Sala</option>
            {salas.map(s => <option key={s.id} value={s.id}>Sala {s.numero} ({s.andar}º andar)</option>)}
          </select>
          <input type="datetime-local" value={form.dataHora} onChange={e => setForm({ ...form, dataHora: e.target.value })} required />
          <input type="number" step="0.01" placeholder="Valor (R$)" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} required />
          <input placeholder="Observações" value={form.observacoes} onChange={e => setForm({ ...form, observacoes: e.target.value })} />
          <button type="submit" className="btn-primary">Agendar</button>
        </form>
      </div>

      <div className="card">
        <div className="card-head-row">
          <h2>Agenda</h2>
          <select className="filter-select" value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
            <option value="">Todos os status</option>
            {STATUS_OPCOES.map(s => <option key={s.valor} value={s.valor}>{s.label}</option>)}
          </select>
        </div>
        <table className="data-table">
          <thead><tr><th>Data/Hora</th><th>Paciente</th><th>Médico</th><th>Sala</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {consultasFiltradas.map(c => (
              <tr key={c.id}>
                <td>{formatarDataHora(c.dataHora)}</td>
                <td>{c.paciente?.nome}</td>
                <td>{c.medico?.nome}</td>
                <td>Sala {c.sala?.numero}</td>
                <td><span className={'tag ' + statusTag(c.status)}>{c.status}</span></td>
                <td className="col-actions">
                  {c.status === 'AGENDADA' && (
                    <>
                      <button className="link-action" onClick={() => handleStatus(c.id, 'REALIZADA')}>Marcar realizada</button>
                      <button className="link-danger" onClick={() => handleStatus(c.id, 'CANCELADA')}>Cancelar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {consultasFiltradas.length === 0 && (
              <tr><td colSpan={6} className="empty-state">Nenhuma consulta encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function statusTag(status: string): string {
  if (status === 'REALIZADA') return 'tag-success';
  if (status === 'CANCELADA') return 'tag-danger';
  return 'tag-muted';
}
