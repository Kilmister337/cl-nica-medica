package com.senac.clinica.controller;

import com.senac.clinica.model.Consulta;
import com.senac.clinica.model.Prescricao;

import java.util.List;

public class ProntuarioDTO {
    public String pacienteNome;
    public List<Consulta> consultas;
    public List<Prescricao> prescricoes;
    // OBS: propositalmente não existe uma lista de exames aqui — o prontuário não traz
    // os exames do paciente, mesmo eles existindo no sistema.
}
