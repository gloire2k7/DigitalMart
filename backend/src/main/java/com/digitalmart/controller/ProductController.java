package com.digitalmart.controller;

import com.digitalmart.dto.MessageResponse;
import com.digitalmart.dto.ProductRequest;
import com.digitalmart.model.Product;
import com.digitalmart.model.User;
import com.digitalmart.repository.ProductRepository;
import com.digitalmart.repository.UserRepository;
import com.digitalmart.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.upload.dir:${user.home}/uploads}")
    private String uploadDir;

    // Get all products for the authenticated seller
    @GetMapping("/seller")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> getSellerProducts() {
        User seller = getCurrentUser();
        List<Product> products = productRepository.findBySeller(seller);
        return ResponseEntity.ok(products);
    }

    // Create a new product
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("stock") Integer stock,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        User seller = getCurrentUser();

        // Check if product with same name exists for this seller
        if (productRepository.existsByNameAndSeller(name, seller)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Product with this name already exists!"));
        }

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            try {
                imageUrl = saveImage(image);
            } catch (IOException e) {
                e.printStackTrace(); // Log the error
                return ResponseEntity.status(500).body(new MessageResponse("Error uploading image."));
            }
        }

        Product product = new Product(name, price, stock, category, imageUrl);
        product.setSeller(seller);

        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    // Update a product
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("stock") Integer stock,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        User seller = getCurrentUser();

        return productRepository.findById(id)
                .map(product -> {
                    // Check if product belongs to the seller
                    if (!product.getSeller().getId().equals(seller.getId())) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: You don't have permission to update this product!"));
                    }

                    // Check if new name conflicts with another product (excluding itself)
                    if (!product.getName().equals(name) &&
                            productRepository.existsByNameAndSeller(name, seller)) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: Product with this name already exists!"));
                    }

                    product.setName(name);
                    product.setPrice(price);
                    product.setStock(stock);
                    product.setCategory(category);

                    // Handle image update
                    if (image != null && !image.isEmpty()) {
                         try {
                            // Delete old image if it exists
                            if (product.getImage() != null) {
                                deleteImage(product.getImage());
                            }
                            product.setImage(saveImage(image));
                        } catch (IOException e) {
                            e.printStackTrace(); // Log the error
                            return ResponseEntity.status(500).body(new MessageResponse("Error uploading new image."));
                        }
                    } else if (image != null && image.isEmpty() && product.getImage() != null) {
                         // If image is sent but is empty, it means the user wants to remove the image
                         try {
                            deleteImage(product.getImage());
                            product.setImage(null);
                         } catch (IOException e) {
                            e.printStackTrace(); // Log the error
                            return ResponseEntity.status(500).body(new MessageResponse("Error deleting old image."));
                         }
                    } else if (image == null && product.getImage() != null) {
                        // If image is not sent and product had an image, keep the old image
                         // No change needed for product.setImage()
                    } else if (image == null && product.getImage() == null) {
                         // If image is not sent and product had no image
                          product.setImage(null); // Ensure it's null
                    }


                    productRepository.save(product);
                    return ResponseEntity.ok(product);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a product
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        User seller = getCurrentUser();

        return productRepository.findById(id)
                .map(product -> {
                    // Check if product belongs to the seller
                    if (!product.getSeller().getId().equals(seller.getId())) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: You don't have permission to delete this product!"));
                    }

                    // Delete associated image file
                    if (product.getImage() != null) {
                         try {
                             deleteImage(product.getImage());
                         } catch (IOException e) {
                             e.printStackTrace(); // Log the error
                             // Continue with product deletion even if image deletion fails
                         }
                    }

                    productRepository.delete(product);
                    return ResponseEntity.ok(new MessageResponse("Product deleted successfully!"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Update product status
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> updateProductStatus(@PathVariable Long id, @RequestParam String status) {
        User seller = getCurrentUser();

        return productRepository.findById(id)
                .map(product -> {
                    // Check if product belongs to the seller
                    if (!product.getSeller().getId().equals(seller.getId())) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: You don't have permission to update this product!"));
                    }

                    product.setStatus(status);
                    productRepository.save(product);
                    return ResponseEntity.ok(product);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Helper method to get current authenticated user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));
    }

    // Helper method to save image file
    private String saveImage(MultipartFile imageFile) throws IOException {
        String originalFilename = imageFile.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".") ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // Create upload directory if it doesn't exist
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }
        
        // Create the file
        File destFile = new File(uploadDirFile, uniqueFilename);
        
        // Save the file
        imageFile.transferTo(destFile);
        
        return uniqueFilename; // Store only the unique filename
    }

    // Helper method to delete image file
    private void deleteImage(String filename) throws IOException {
        File file = new File(uploadDir, filename);
        if (file.exists()) {
            file.delete();
        }
    }

} 