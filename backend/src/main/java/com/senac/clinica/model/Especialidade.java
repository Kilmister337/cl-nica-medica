package com.senac.clinica.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "especialidades")
@Getter
@Setter
@NoArgsConstructor
public class Especialidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nome;

    // OBS: cascade = ALL + orphanRemoval fazem uma exclusão de especialidade apagar em
    // cascata todos os médicos vinculados a ela, sem nenhum aviso.
    @JsonIgnore
    @OneToMany(mappedBy = "especialidade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medico> medicos;

    public Especialidade(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
}
