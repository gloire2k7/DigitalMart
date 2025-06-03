package com.digitalmart.repository;

import com.digitalmart.model.Product;
import com.digitalmart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySeller(User seller);
    List<Product> findBySellerAndStatus(User seller, String status);
    boolean existsByNameAndSeller(String name, User seller);
} 