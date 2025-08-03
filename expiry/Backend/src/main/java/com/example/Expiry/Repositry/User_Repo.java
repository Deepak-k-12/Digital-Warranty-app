package com.example.Expiry.Repositry;

import com.example.Expiry.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_Repo extends MongoRepository<User,String> {

    User findByUsername(String userName);
}
