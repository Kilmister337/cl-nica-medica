package com.senac.clinica.repository;

import com.senac.clinica.model.Prescricao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescricaoRepository extends JpaRepository<Prescricao, Long> {
    List<Prescricao> findAllByConsultaId(Long consultaId);
    List<Prescricao> findAllByConsultaPacienteId(Long pacienteId);
}
