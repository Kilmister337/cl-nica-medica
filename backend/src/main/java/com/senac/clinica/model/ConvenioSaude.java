package com.senac.clinica.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "convenios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConvenioSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nome;

    // percentual coberto pelo convênio, ex: 80 = 80%
    @Column(nullable = false)
    private Double percentualCobertura;
}
