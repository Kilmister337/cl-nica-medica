import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ConsultasPage from './pages/ConsultasPage';
import ProntuarioPage from './pages/ProntuarioPage';
import PacientesPage from './pages/PacientesPage';
import MedicosPage from './pages/MedicosPage';
import EspecialidadesPage from './pages/EspecialidadesPage';
import ConveniosPage from './pages/ConveniosPage';
import SalasPage from './pages/SalasPage';
import PrescricoesPage from './pages/PrescricoesPage';
import ExamesPage from './pages/ExamesPage';
import PagamentosPage from './pages/PagamentosPage';

type Aba =
  | 'dashboard' | 'consultas' | 'prontuario' | 'pacientes' | 'medicos'
  | 'especialidades' | 'convenios' | 'salas' | 'prescricoes' | 'exames' | 'pagamentos';

const NAV_ITEMS: { id: Aba; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'consultas', label: 'Consultas', icon: '🗓️' },
  { id: 'prontuario', label: 'Prontuário', icon: '📋' },
  { id: 'pacientes', label: 'Pacientes', icon: '🧑‍🤝‍🧑' },
  { id: 'medicos', label: 'Médicos', icon: '🩺' },
  { id: 'especialidades', label: 'Especialidades', icon: '🏷️' },
  { id: 'convenios', label: 'Convênios', icon: '💳' },
  { id: 'salas', label: 'Salas', icon: '🚪' },
  { id: 'prescricoes', label: 'Prescrições', icon: '💊' },
  { id: 'exames', label: 'Exames', icon: '🧪' },
  { id: 'pagamentos', label: 'Pagamentos', icon: '💰' },
];

export default function App() {
  const [aba, setAba] = useState<Aba>('dashboard');

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">+</span>
          <div>
            <div className="brand-name">MedClin</div>
            <div className="brand-sub">Gestão da clínica</div>
          </div>
        </div>

        <nav className="side-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={'side-link' + (aba === item.id ? ' active' : '')}
              onClick={() => setAba(item.id)}
            >
              <span className="side-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">UC9 · Manutenção de sistemas<br/>Senac DF</div>
      </aside>

      <div className="content">
        {aba === 'dashboard' && <DashboardPage />}
        {aba === 'consultas' && <ConsultasPage />}
        {aba === 'prontuario' && <ProntuarioPage />}
        {aba === 'pacientes' && <PacientesPage />}
        {aba === 'medicos' && <MedicosPage />}
        {aba === 'especialidades' && <EspecialidadesPage />}
        {aba === 'convenios' && <ConveniosPage />}
        {aba === 'salas' && <SalasPage />}
        {aba === 'prescricoes' && <PrescricoesPage />}
        {aba === 'exames' && <ExamesPage />}
        {aba === 'pagamentos' && <PagamentosPage />}
      </div>
    </div>
  );
}
