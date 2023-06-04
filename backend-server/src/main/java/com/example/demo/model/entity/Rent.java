package com.example.demo.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "rents")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rent extends Model{

    @Id
    @SequenceGenerator(name = "id", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @Column(name = "client_id", nullable = false, unique = true)
    private Long clientId;

    @Column(name = "prop_id", nullable = false)
    private Long propId;

    @Column(name = "date", nullable = false)
    private String date;
}
