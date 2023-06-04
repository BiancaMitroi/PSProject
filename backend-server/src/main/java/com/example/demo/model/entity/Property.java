package com.example.demo.model.entity;

import com.example.demo.model.enums.PropertyType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "properties")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Property extends Model {

    @Id
    @SequenceGenerator(name = "id", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @Column(name = "location", nullable = false, unique = true)
    private String location;

    @Column(name = "type", nullable = false)
    private PropertyType propertyType;

    @Column(name = "room_number", nullable = false)
    private int roomNumber;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "is_rented", nullable = false)
    private boolean isRented;
}
