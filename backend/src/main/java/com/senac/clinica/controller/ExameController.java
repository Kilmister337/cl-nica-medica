package com.senac.clinica.controller;

import com.senac.clinica.model.Consulta;
import com.senac.clinica.model.Exame;
import com.senac.clinica.repository.ConsultaRepository;
import com.senac.clinica.repository.ExameRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exames")
public class ExameController {

    private final ExameRepository exameRepository;
    private final ConsultaRepository consultaRepository;

    public ExameController(ExameRepository exameRepository, ConsultaRepository consultaRepository) {
        this.exameRepository = exameRepository;
        this.consultaRepository = consultaRepository;
    }

    @GetMapping
    public List<Exame> listar(@RequestParam(required = false) Long consultaId) {
        if (consultaId != null) {
            return exameRepository.findAllByConsultaId(consultaId);
        }
        return exameRepository.findAll();
    }

    @PostMapping
    public Exame criar(@RequestBody ExameRequest req) {
        Consulta consulta = consultaRepository.findById(req.consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        Exame exame = new Exame();
        exame.setConsulta(consulta);
        exame.setTipo(req.tipo);
        exame.setDataSolicitacao(req.dataSolicitacao);
        exame.setStatus("SOLICITADO");

        return exameRepository.save(exame);
    }

    @PatchMapping("/{id}/resultado")
    public Exame registrarResultado(@PathVariable Long id, @RequestBody ResultadoRequest req) {
        Exame exame = exameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exame não encontrado"));
        exame.setResultado(req.resultado);
        exame.setStatus("REALIZADO");
        return exameRepository.save(exame);
    }

    public static class ResultadoRequest {
        public String resultado;
    }
}
