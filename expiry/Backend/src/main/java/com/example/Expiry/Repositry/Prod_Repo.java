package com.example.Expiry.Repositry;

import com.example.Expiry.Model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Prod_Repo extends MongoRepository<Product,String> {
}
