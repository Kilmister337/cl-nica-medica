package com.senac.clinica.controller;

import com.senac.clinica.model.Consulta;
import com.senac.clinica.model.Prescricao;
import com.senac.clinica.repository.ConsultaRepository;
import com.senac.clinica.repository.PrescricaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescricoes")
public class PrescricaoController {

    private final PrescricaoRepository prescricaoRepository;
    private final ConsultaRepository consultaRepository;

    public PrescricaoController(PrescricaoRepository prescricaoRepository, ConsultaRepository consultaRepository) {
        this.prescricaoRepository = prescricaoRepository;
        this.consultaRepository = consultaRepository;
    }

    @GetMapping
    public List<Prescricao> listar(@RequestParam(required = false) Long consultaId) {
        if (consultaId != null) {
            return prescricaoRepository.findAllByConsultaId(consultaId);
        }
        return prescricaoRepository.findAll();
    }

    // Registra uma prescrição.
    // OBS: não valida se a dosagem foi preenchida antes de salvar.
    @PostMapping
    public Prescricao criar(@RequestBody PrescricaoRequest req) {
        Consulta consulta = consultaRepository.findById(req.consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        Prescricao prescricao = new Prescricao();
        prescricao.setConsulta(consulta);
        prescricao.setMedicamento(req.medicamento);
        prescricao.setDosagem(req.dosagem);
        prescricao.setInstrucoes(req.instrucoes);

        return prescricaoRepository.save(prescricao);
    }
}
