import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Pagamento, Consulta } from '../types';

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [form, setForm] = useState({ consultaId: '', valorCobrado: '', formaPagamento: 'Cartão de crédito' });

  async function carregar() {
    setPagamentos(await api.listarPagamentos());
    setConsultas(await api.listarConsultas());
  }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.criarPagamento({
      consultaId: Number(form.consultaId),
      valorCobrado: Number(form.valorCobrado),
      formaPagamento: form.formaPagamento,
    });
    setForm({ consultaId: '', valorCobrado: '', formaPagamento: 'Cartão de crédito' });
    carregar();
  }

  async function handleConfirmar(id: number) {
    await api.confirmarPagamento(id);
    carregar();
  }

  function fmt(v: number) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Pagamentos</h1>
        <p>Cobrança das consultas, com abatimento do convênio quando aplicável.</p>
      </div>

      <div className="card">
        <h2>Registrar cobrança</h2>
        <form className="grid-form" onSubmit={handleSubmit}>
          <select value={form.consultaId} onChange={e => setForm({ ...form, consultaId: e.target.value })} required>
            <option value="">Consulta</option>
            {consultas.map(c => (
              <option key={c.id} value={c.id}>#{c.id} — {c.paciente?.nome} ({c.paciente?.convenio?.nome || 'Particular'})</option>
            ))}
          </select>
          <input type="number" step="0.01" placeholder="Valor cobrado (R$)" value={form.valorCobrado}
            onChange={e => setForm({ ...form, valorCobrado: e.target.value })} required />
          <select value={form.formaPagamento} onChange={e => setForm({ ...form, formaPagamento: e.target.value })}>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
            <option>Pix</option>
            <option>Dinheiro</option>
          </select>
          <button type="submit" className="btn-primary">Registrar</button>
        </form>
      </div>

      <div className="card">
        <table className="data-table">
          <thead><tr><th>Paciente</th><th>Cobrado</th><th>Convênio</th><th>Paciente paga</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {pagamentos.map(p => (
              <tr key={p.id}>
                <td>{p.consulta?.paciente?.nome}</td>
                <td>{fmt(p.valorCobrado)}</td>
                <td>{fmt(p.valorConvenio)}</td>
                <td>{fmt(p.valorPaciente)}</td>
                <td><span className={'tag ' + (p.status === 'PAGO' ? 'tag-success' : 'tag-muted')}>{p.status}</span></td>
                <td className="col-actions">
                  {p.status === 'PENDENTE' && (
                    <button className="link-action" onClick={() => handleConfirmar(p.id)}>Confirmar pagamento</button>
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
