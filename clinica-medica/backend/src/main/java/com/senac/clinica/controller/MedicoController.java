package com.senac.clinica.controller;

import com.senac.clinica.model.Especialidade;
import com.senac.clinica.model.Medico;
import com.senac.clinica.repository.EspecialidadeRepository;
import com.senac.clinica.repository.MedicoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    private final MedicoRepository medicoRepository;
    private final EspecialidadeRepository especialidadeRepository;

    public MedicoController(MedicoRepository medicoRepository, EspecialidadeRepository especialidadeRepository) {
        this.medicoRepository = medicoRepository;
        this.especialidadeRepository = especialidadeRepository;
    }

    @GetMapping
    public List<Medico> listar() {
        return medicoRepository.findAll();
    }

    @PostMapping
    public Medico criar(@RequestBody MedicoRequest req) {
        Especialidade especialidade = especialidadeRepository.findById(req.especialidadeId)
                .orElseThrow(() -> new RuntimeException("Especialidade não encontrada"));

        Medico medico = new Medico();
        medico.setNome(req.nome);
        medico.setCrm(req.crm);
        medico.setEspecialidade(especialidade);

        return medicoRepository.save(medico);
    }
}
