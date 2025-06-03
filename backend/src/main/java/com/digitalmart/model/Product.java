package com.digitalmart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Double price;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer stock;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer sold = 0;

    @NotBlank
    @Column(nullable = false)
    private String status = "Active";

    @Column(nullable = true)
    private String category;

    @Column(nullable = true)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    // Constructor without seller (will be set later)
    public Product(String name, Double price, Integer stock, String image) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }

    public Product(String name, Double price, Integer stock, String category, String image) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.image = image;
    }
} 