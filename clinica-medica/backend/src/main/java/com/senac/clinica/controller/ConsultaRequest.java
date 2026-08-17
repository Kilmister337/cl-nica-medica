package com.senac.clinica.controller;

import java.time.LocalDateTime;

public class ConsultaRequest {
    public Long pacienteId;
    public Long medicoId;
    public Long salaId;
    public LocalDateTime dataHora;
    public Double valor;
    public String observacoes;
}
