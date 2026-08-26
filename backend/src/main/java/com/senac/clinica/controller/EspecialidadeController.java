package com.senac.clinica.controller;

import com.senac.clinica.model.Especialidade;
import com.senac.clinica.repository.EspecialidadeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
public class EspecialidadeController {

    private final EspecialidadeRepository repository;

    public EspecialidadeController(EspecialidadeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Especialidade> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Especialidade criar(@RequestBody Especialidade especialidade) {
        return repository.save(especialidade);
    }

    // Remove uma especialidade.
    // OBS: a entidade Especialidade está mapeada com cascade = ALL + orphanRemoval sobre
    // "medicos", então excluir uma especialidade apaga em cascata todos os médicos dela.
    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
