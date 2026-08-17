package com.senac.clinica.repository;

import com.senac.clinica.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    List<Consulta> findAllByPacienteId(Long pacienteId);
    List<Consulta> findAllByMedicoIdAndDataHora(Long medicoId, LocalDateTime dataHora);
    List<Consulta> findAllBySalaIdAndDataHora(Long salaId, LocalDateTime dataHora);
}
