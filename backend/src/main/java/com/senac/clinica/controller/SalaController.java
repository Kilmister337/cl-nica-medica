package com.senac.clinica.controller;

import com.senac.clinica.model.Sala;
import com.senac.clinica.repository.SalaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
public class SalaController {

    private final SalaRepository repository;

    public SalaController(SalaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Sala> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Sala criar(@RequestBody Sala sala) {
        return repository.save(sala);
    }
}
