package com.senac.clinica.controller;

import com.senac.clinica.model.ConvenioSaude;
import com.senac.clinica.repository.ConvenioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/convenios")
public class ConvenioController {

    private final ConvenioRepository repository;

    public ConvenioController(ConvenioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ConvenioSaude> listar() {
        return repository.findAll();
    }

    @PostMapping
    public ConvenioSaude criar(@RequestBody ConvenioSaude convenio) {
        return repository.save(convenio);
    }
}
