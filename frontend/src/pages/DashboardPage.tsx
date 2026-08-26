import { useEffect, useState } from 'react';
import { api } from '../api';
import type { DashboardResumo } from '../types';

export default function DashboardPage() {
  const [resumo, setResumo] = useState<DashboardResumo | null>(null);

  useEffect(() => { api.dashboard().then(setResumo); }, []);

  function fmt(v: number) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Dashboard</h1>
        <p>Panorama geral da clínica.</p>
      </div>

      {resumo && (
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-label">Consultas agendadas</span>
            <span className="kpi-value">{resumo.consultasAgendadas}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Pacientes cadastrados</span>
            <span className="kpi-value">{resumo.totalPacientes}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Médicos ativos</span>
            <span className="kpi-value">{resumo.totalMedicos}</span>
          </div>
          <div className="kpi-card highlight">
            <span className="kpi-label">Faturamento (pago)</span>
            <span className="kpi-value">{fmt(resumo.faturamentoTotal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
