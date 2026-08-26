package com.senac.clinica.controller;

import com.senac.clinica.model.*;
import com.senac.clinica.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaRepository consultaRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final SalaRepository salaRepository;

    public ConsultaController(ConsultaRepository consultaRepository, PacienteRepository pacienteRepository,
                               MedicoRepository medicoRepository, SalaRepository salaRepository) {
        this.consultaRepository = consultaRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.salaRepository = salaRepository;
    }

    @GetMapping
    public List<Consulta> listar() {
        return consultaRepository.findAll();
    }

    // Agenda uma nova consulta.
    // OBS: não verifica se o médico ou a sala já têm outra consulta marcada no mesmo horário.
    @PostMapping
    public Consulta criar(@RequestBody ConsultaRequest req) {
        Paciente paciente = pacienteRepository.findById(req.pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        Medico medico = medicoRepository.findById(req.medicoId)
                .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        Sala sala = salaRepository.findById(req.salaId)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        Consulta consulta = new Consulta();
        consulta.setPaciente(paciente);
        consulta.setMedico(medico);
        consulta.setSala(sala);
        consulta.setDataHora(req.dataHora);
        consulta.setValor(req.valor);
        consulta.setObservacoes(req.observacoes);
        consulta.setStatus("AGENDADA");

        return consultaRepository.save(consulta);
    }

    @PatchMapping("/{id}/status")
    public Consulta atualizarStatus(@PathVariable Long id, @RequestBody StatusRequest req) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        consulta.setStatus(req.status);
        return consultaRepository.save(consulta);
    }

    public static class StatusRequest {
        public String status;
    }
}
