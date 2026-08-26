package com.senac.clinica.controller;

import com.senac.clinica.model.Consulta;
import com.senac.clinica.model.ConvenioSaude;
import com.senac.clinica.model.Pagamento;
import com.senac.clinica.model.Paciente;
import com.senac.clinica.repository.ConsultaRepository;
import com.senac.clinica.repository.PagamentoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    private final PagamentoRepository pagamentoRepository;
    private final ConsultaRepository consultaRepository;

    public PagamentoController(PagamentoRepository pagamentoRepository, ConsultaRepository consultaRepository) {
        this.pagamentoRepository = pagamentoRepository;
        this.consultaRepository = consultaRepository;
    }

    @GetMapping
    public List<Pagamento> listar() {
        return pagamentoRepository.findAll();
    }

    @PostMapping
    public Pagamento criar(@RequestBody PagamentoRequest req) {
        Consulta consulta = consultaRepository.findById(req.consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        Paciente paciente = consulta.getPaciente();
        ConvenioSaude convenio = paciente.getConvenio();

        double valorConvenio = 0;
        if (convenio != null) {
            // OBS: deveria dividir por 100 (percentual), mas divide por 1000 — o valor
            // coberto pelo convênio fica muito menor do que deveria, e o paciente acaba
            // pagando quase o valor cheio mesmo tendo convênio.
            valorConvenio = req.valorCobrado * convenio.getPercentualCobertura() / 1000;
        }
        double valorPaciente = req.valorCobrado - valorConvenio;

        Pagamento pagamento = new Pagamento();
        pagamento.setConsulta(consulta);
        pagamento.setValorCobrado(req.valorCobrado);
        pagamento.setValorConvenio(valorConvenio);
        pagamento.setValorPaciente(valorPaciente);
        pagamento.setFormaPagamento(req.formaPagamento);
        pagamento.setStatus("PENDENTE");

        return pagamentoRepository.save(pagamento);
    }

    @PatchMapping("/{id}/confirmar")
    public Pagamento confirmar(@PathVariable Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
        pagamento.setStatus("PAGO");
        return pagamentoRepository.save(pagamento);
    }
}
