package com.example.Expiry.Controller;

import com.example.Expiry.Model.Product;
import com.example.Expiry.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
public class ProductController {

    @Autowired
    ProductService serv;

    @PostMapping("/upload")
    public Product uploadProduct(
            @RequestParam("file") MultipartFile file,
            @RequestParam("manufactureDate") String mfgDate,
            @RequestParam("expiryDate") String expDate,
            @RequestParam("uploadedDate") String uploadedDate,
            @RequestParam(value = "description", required = false) String description
    ) throws IOException {
        return serv.saveProduct(file, mfgDate, expDate, uploadedDate, description);
    }
    @GetMapping("/getDet/{id}")
    public Product getProduct(@PathVariable("id") String id)
    {
        return serv.getProduct(id);
    }

    @DeleteMapping("/deleid/{id}")
    public void  deleteProduct(@PathVariable("id") String id)
    {
        serv.deleteProduct(id);
    }
    @GetMapping("/getAllprod")
    public List<Product> getAllProd()
    {
        return serv.getAllprod();
    }
}



