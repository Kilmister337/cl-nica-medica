package com.senac.clinica.repository;

import com.senac.clinica.model.Exame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExameRepository extends JpaRepository<Exame, Long> {
    List<Exame> findAllByConsultaId(Long consultaId);
    List<Exame> findAllByConsultaPacienteId(Long pacienteId);
}
