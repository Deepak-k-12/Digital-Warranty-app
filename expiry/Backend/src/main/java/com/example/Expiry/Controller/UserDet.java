package com.example.Expiry.Controller;

import com.example.Expiry.Model.Product;
import com.example.Expiry.Model.User;
import com.example.Expiry.Service.ProductService;
import com.example.Expiry.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserDet {

    @Autowired
    UserService serv;

    @PostMapping("/reg")
    public User addReg(@RequestBody User pr)
    {
        return serv.addReg(pr);
    }

    @GetMapping("/getRegDet")
    public List<User> getRegDet()
    {
        return serv.getRegDet();
    }
    @PostMapping("/loginVerify")
    public String VerifyUser(@RequestParam("username") String username,
                             @RequestParam("password") String password)
    {
        return serv.VerifyUser(username,password);
    }

    @PatchMapping("changePassword")
    public User forgetPass(@RequestParam("username") String username,
                           @RequestParam("password") String password,
                           @RequestParam("newpassword") String newPassword)
    {
        return serv.changePass(username,password,newPassword);
    }
}
