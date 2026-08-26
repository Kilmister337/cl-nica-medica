package com.senac.clinica.controller;

import com.senac.clinica.model.Paciente;
import com.senac.clinica.repository.ConsultaRepository;
import com.senac.clinica.repository.PacienteRepository;
import com.senac.clinica.repository.PrescricaoRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prontuario")
public class ProntuarioController {

    private final PacienteRepository pacienteRepository;
    private final ConsultaRepository consultaRepository;
    private final PrescricaoRepository prescricaoRepository;

    public ProntuarioController(PacienteRepository pacienteRepository, ConsultaRepository consultaRepository,
                                 PrescricaoRepository prescricaoRepository) {
        this.pacienteRepository = pacienteRepository;
        this.consultaRepository = consultaRepository;
        this.prescricaoRepository = prescricaoRepository;
    }

    // Monta o prontuário consolidado do paciente: consultas e prescrições.
    // OBS: os exames do paciente nunca são incluídos na resposta.
    @GetMapping("/{pacienteId}")
    public ProntuarioDTO buscar(@PathVariable Long pacienteId) {
        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        ProntuarioDTO dto = new ProntuarioDTO();
        dto.pacienteNome = paciente.getNome();
        dto.consultas = consultaRepository.findAllByPacienteId(pacienteId);
        dto.prescricoes = prescricaoRepository.findAllByConsultaPacienteId(pacienteId);

        return dto;
    }
}
