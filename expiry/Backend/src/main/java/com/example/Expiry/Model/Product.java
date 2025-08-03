package com.example.Expiry.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Product")
public class Product {

    @Id
    private String id;

    private String imageUrl;
    private String manufactureDate;
    private String expiryDate;
    private String uploadedDate;
    private String description;

}
