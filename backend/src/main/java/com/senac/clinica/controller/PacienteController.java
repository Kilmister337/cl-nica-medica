package com.senac.clinica.controller;

import com.senac.clinica.model.ConvenioSaude;
import com.senac.clinica.model.Paciente;
import com.senac.clinica.repository.ConvenioRepository;
import com.senac.clinica.repository.PacienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteRepository pacienteRepository;
    private final ConvenioRepository convenioRepository;

    public PacienteController(PacienteRepository pacienteRepository, ConvenioRepository convenioRepository) {
        this.pacienteRepository = pacienteRepository;
        this.convenioRepository = convenioRepository;
    }

    @GetMapping
    public List<Paciente> listar() {
        return pacienteRepository.findAll();
    }

    @PostMapping
    public Paciente criar(@RequestBody PacienteRequest req) {
        Paciente paciente = new Paciente();
        paciente.setNome(req.nome);
        paciente.setCpf(req.cpf);
        paciente.setDataNascimento(req.dataNascimento);
        paciente.setTelefone(req.telefone);

        if (req.convenioId != null) {
            ConvenioSaude convenio = convenioRepository.findById(req.convenioId).orElse(null);
            paciente.setConvenio(convenio);
        }

        return pacienteRepository.save(paciente);
    }
}
