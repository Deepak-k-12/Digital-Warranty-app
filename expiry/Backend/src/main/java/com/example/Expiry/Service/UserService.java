package com.example.Expiry.Service;
import com.example.Expiry.Model.User;
import com.example.Expiry.Model.Product;
import com.example.Expiry.Repositry.User_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    User_Repo repo;


    public User addReg(User pr) {
        pr.setRole("CUSTOMER");
        Optional<User> us= Optional.ofNullable(repo.findByUsername(pr.getUsername()));
        if(us.isPresent())
        {
            throw new RuntimeException("USER_NAME ALREADY TAKEN");
        }
        else
        {
            return repo.save(pr);
        }




    }

    public List<User> getRegDet() {
        return repo.findAll();
    }

    public String VerifyUser(String username, String password) {
        Optional<User> us= Optional.ofNullable(repo.findByUsername(username));
        if(us.isPresent())
        {
            if(us.get().getPassword().equals(password))
            {
                if(us.get().getRole().equals("ADMIN"))
                {
                    return "WELCOME TO OUR WEBSITE,ADMIN";
                }
                else {
                    return "WELCOME TO OUR WEBSITE,CUSTOMER";

                }
            }
            else {
                return "INVALID CREDENTIALS";
            }
        }
        else {
            return "NO USERNAME FOUND";
        }

    }

    public User changePass(String username, String password, String newPassword) {

        Optional<User> us= Optional.ofNullable(repo.findByUsername(username));
        if(us.isPresent())
        {
            if(us.get().getPassword().equals(password))
            {
                us.get().setPassword(newPassword);
                return repo.save(us.get());
            }
            else
            {
                throw new RuntimeException("YOUR OLD PASSWORD MAY BE WRONG");
            }
        }
        else {
            throw new RuntimeException("NO USER FOUND WITH THE USER NAME");

        }
    }
}
