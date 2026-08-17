export interface Especialidade {
  id: number;
  nome: string;
}

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: Especialidade;
}

export interface ConvenioSaude {
  id: number;
  nome: string;
  percentualCobertura: number;
}

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  convenio: ConvenioSaude | null;
}

export interface Sala {
  id: number;
  numero: string;
  andar: number;
}

export interface Consulta {
  id: number;
  paciente: Paciente;
  medico: Medico;
  sala: Sala;
  dataHora: string;
  status: string;
  valor: number;
  observacoes: string;
}

export interface Prescricao {
  id: number;
  consulta: Consulta;
  medicamento: string;
  dosagem: string;
  instrucoes: string;
}

export interface Exame {
  id: number;
  consulta: Consulta;
  tipo: string;
  dataSolicitacao: string;
  resultado: string | null;
  status: string;
}

export interface Pagamento {
  id: number;
  consulta: Consulta;
  valorCobrado: number;
  valorConvenio: number;
  valorPaciente: number;
  status: string;
  formaPagamento: string;
}

export interface Prontuario {
  pacienteNome: string;
  consultas: Consulta[];
  prescricoes: Prescricao[];
}

export interface DashboardResumo {
  consultasAgendadas: number;
  totalPacientes: number;
  totalMedicos: number;
  faturamentoTotal: number;
}
