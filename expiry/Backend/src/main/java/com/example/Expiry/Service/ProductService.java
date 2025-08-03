package com.example.Expiry.Service;

import com.example.Expiry.Model.Product;
import com.example.Expiry.Repositry.Prod_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    Prod_Repo repo;



    public Product saveProduct(MultipartFile file, String mfgDate, String expDate, String uploadedDate, String description) throws IOException {

        String fileName= UUID.randomUUID()+"_"+file.getOriginalFilename();
        Path uploadPath= Paths.get("uploads/"+fileName);

        Files.createDirectories(uploadPath.getParent());

        Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
        String imgUrl="http://localhost:8080/uploads/"+fileName;

        Product pro=new Product();
        pro.setImageUrl(imgUrl);
        pro.setManufactureDate(mfgDate);
        pro.setExpiryDate(expDate);
        pro.setUploadedDate(uploadedDate);
        pro.setDescription(description);

        return repo.save(pro);

    }

    public Product getProduct(String id) {

        Optional<Product> pro=repo.findById(id);
        if(pro.isPresent())
        {
            return pro.get();
        }
        else
        {
            throw new RuntimeException("CANT GET TO THE PRODUCT WUTH THIS ID");
        }
    }

    public void deleteProduct(String id) {

        repo.deleteById(id);
    }


    public List<Product> getAllprod() {

        return repo.findAll();
    }
}
