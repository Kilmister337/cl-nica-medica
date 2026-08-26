package com.senac.clinica.repository;

import com.senac.clinica.model.ConvenioSaude;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvenioRepository extends JpaRepository<ConvenioSaude, Long> {
}
