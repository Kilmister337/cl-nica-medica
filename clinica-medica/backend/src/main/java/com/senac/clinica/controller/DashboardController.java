package com.senac.clinica.controller;

import com.senac.clinica.model.Consulta;
import com.senac.clinica.model.Pagamento;
import com.senac.clinica.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ConsultaRepository consultaRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final PagamentoRepository pagamentoRepository;

    public DashboardController(ConsultaRepository consultaRepository, PacienteRepository pacienteRepository,
                                MedicoRepository medicoRepository, PagamentoRepository pagamentoRepository) {
        this.consultaRepository = consultaRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.pagamentoRepository = pagamentoRepository;
    }

    @GetMapping("/resumo")
    public DashboardDTO resumo() {
        List<Consulta> consultas = consultaRepository.findAll();
        List<Pagamento> pagamentos = pagamentoRepository.findAll();

        DashboardDTO dto = new DashboardDTO();
        dto.consultasAgendadas = consultas.stream().filter(c -> "AGENDADA".equals(c.getStatus())).count();
        dto.totalPacientes = pacienteRepository.count();
        dto.totalMedicos = medicoRepository.count();

        // OBS: soma o valorCobrado de TODOS os pagamentos, inclusive os que ainda estão
        // com status "PENDENTE" — deveria somar apenas os pagamentos com status "PAGO".
        dto.faturamentoTotal = pagamentos.stream().mapToDouble(Pagamento::getValorCobrado).sum();

        return dto;
    }
}
