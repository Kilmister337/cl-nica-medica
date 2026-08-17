package com.senac.clinica;

import com.senac.clinica.model.*;
import com.senac.clinica.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EspecialidadeRepository especialidadeRepository;
    private final MedicoRepository medicoRepository;
    private final ConvenioRepository convenioRepository;
    private final PacienteRepository pacienteRepository;
    private final SalaRepository salaRepository;
    private final ConsultaRepository consultaRepository;
    private final PrescricaoRepository prescricaoRepository;
    private final ExameRepository exameRepository;

    public DataSeeder(EspecialidadeRepository especialidadeRepository, MedicoRepository medicoRepository,
                       ConvenioRepository convenioRepository, PacienteRepository pacienteRepository,
                       SalaRepository salaRepository, ConsultaRepository consultaRepository,
                       PrescricaoRepository prescricaoRepository, ExameRepository exameRepository) {
        this.especialidadeRepository = especialidadeRepository;
        this.medicoRepository = medicoRepository;
        this.convenioRepository = convenioRepository;
        this.pacienteRepository = pacienteRepository;
        this.salaRepository = salaRepository;
        this.consultaRepository = consultaRepository;
        this.prescricaoRepository = prescricaoRepository;
        this.exameRepository = exameRepository;
    }

    @Override
    public void run(String... args) {
        if (especialidadeRepository.count() > 0) return;

        Especialidade cardiologia = especialidadeRepository.save(new Especialidade(null, "Cardiologia"));
        Especialidade pediatria = especialidadeRepository.save(new Especialidade(null, "Pediatria"));
        Especialidade dermatologia = especialidadeRepository.save(new Especialidade(null, "Dermatologia"));
        especialidadeRepository.save(new Especialidade(null, "Ortopedia"));

        Medico ricardo = medicoRepository.save(new Medico(null, "Dr. Ricardo Almeida", "12345-DF", cardiologia));
        Medico fernanda = medicoRepository.save(new Medico(null, "Dra. Fernanda Castro", "23456-DF", pediatria));
        medicoRepository.save(new Medico(null, "Dr. Bruno Tavares", "34567-DF", dermatologia));

        ConvenioSaude saudeTotal = convenioRepository.save(new ConvenioSaude(null, "Saúde Total", 80.0));
        ConvenioSaude vidaPlena = convenioRepository.save(new ConvenioSaude(null, "Vida Plena", 60.0));
        convenioRepository.save(new ConvenioSaude(null, "Bem Estar", 100.0));

        Paciente ana = pacienteRepository.save(new Paciente(null, "Ana Paula Ribeiro", "111.222.333-01",
                LocalDate.of(1990, 4, 12), "(61) 99111-0001", saudeTotal));
        Paciente carlos = pacienteRepository.save(new Paciente(null, "Carlos Eduardo Souza", "222.333.444-02",
                LocalDate.of(1985, 9, 3), "(61) 99222-0002", null));
        pacienteRepository.save(new Paciente(null, "Beatriz Lima", "333.444.555-03",
                LocalDate.of(2015, 1, 20), "(61) 99333-0003", vidaPlena));

        Sala sala101 = salaRepository.save(new Sala(null, "101", 1));
        salaRepository.save(new Sala(null, "102", 1));
        salaRepository.save(new Sala(null, "201", 2));

        // Consulta já marcada amanhã às 10h, com Dr. Ricardo na Sala 101 — usada pra testar
        // rapidamente o conflito de agenda (tentar marcar outra consulta no mesmo horário).
        LocalDateTime amanha10h = LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(10, 0));
        Consulta consultaAna = new Consulta();
        consultaAna.setPaciente(ana);
        consultaAna.setMedico(ricardo);
        consultaAna.setSala(sala101);
        consultaAna.setDataHora(amanha10h);
        consultaAna.setStatus("AGENDADA");
        consultaAna.setValor(250.0);
        consultaAna.setObservacoes("Consulta de rotina — acompanhamento cardíaco");
        consultaRepository.save(consultaAna);

        LocalDateTime ontem14h = LocalDateTime.of(LocalDate.now().minusDays(5), LocalTime.of(14, 0));
        Consulta consultaAnaAnterior = new Consulta();
        consultaAnaAnterior.setPaciente(ana);
        consultaAnaAnterior.setMedico(ricardo);
        consultaAnaAnterior.setSala(sala101);
        consultaAnaAnterior.setDataHora(ontem14h);
        consultaAnaAnterior.setStatus("REALIZADA");
        consultaAnaAnterior.setValor(250.0);
        consultaAnaAnterior.setObservacoes("Primeira consulta — queixa de palpitações");
        consultaRepository.save(consultaAnaAnterior);

        Prescricao prescricao = new Prescricao();
        prescricao.setConsulta(consultaAnaAnterior);
        prescricao.setMedicamento("Losartana 50mg");
        prescricao.setDosagem("1 comprimido ao dia");
        prescricao.setInstrucoes("Tomar pela manhã, com água");
        prescricaoRepository.save(prescricao);

        // Exame vinculado à mesma consulta anterior — deve aparecer no prontuário da Ana,
        // mas o endpoint de prontuário não inclui exames (bug).
        Exame exame = new Exame();
        exame.setConsulta(consultaAnaAnterior);
        exame.setTipo("Eletrocardiograma");
        exame.setDataSolicitacao(LocalDate.now().minusDays(5));
        exame.setResultado("Ritmo sinusal normal, sem alterações significativas.");
        exame.setStatus("REALIZADO");
        exameRepository.save(exame);

        LocalDateTime hoje9h = LocalDateTime.of(LocalDate.now(), LocalTime.of(9, 0));
        Consulta consultaCarlos = new Consulta();
        consultaCarlos.setPaciente(carlos);
        consultaCarlos.setMedico(fernanda);
        consultaCarlos.setSala(sala101);
        consultaCarlos.setDataHora(hoje9h);
        consultaCarlos.setStatus("AGENDADA");
        consultaCarlos.setValor(200.0);
        consultaCarlos.setObservacoes("Consulta particular");
        consultaRepository.save(consultaCarlos);
    }
}
