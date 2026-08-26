package com.senac.clinica.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "pagamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "consulta_id", nullable = false)
    private Consulta consulta;

    @Column(nullable = false)
    private Double valorCobrado;

    @Column(nullable = false)
    private Double valorConvenio;

    @Column(nullable = false)
    private Double valorPaciente;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(nullable = false, length = 30)
    private String formaPagamento;
}
