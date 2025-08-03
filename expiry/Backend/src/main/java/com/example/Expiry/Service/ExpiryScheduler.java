package com.example.Expiry.Service;

import com.example.Expiry.Model.Product;
import com.example.Expiry.Repositry.Prod_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class ExpiryScheduler {

    @Autowired
    private Prod_Repo repo;

    @Autowired
    private EmailService emailService;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Run once daily at 9:00 AM
    @Scheduled(cron = "0 00 22 * * *") // runs at 8:25 PM
    public void checkExpiringProducts() {
        List<Product> products = repo.findAll();
        LocalDate today = LocalDate.now();

        for (Product p : products) {
            try {
                LocalDate expiry = LocalDate.parse(p.getExpiryDate(), formatter);
                long days = java.time.temporal.ChronoUnit.DAYS.between(today, expiry);

                if (days <= 30 && days >= -10) { // adjust range for testing
                    emailService.sendExpiryNotification(
                            "kdeepak94885@gmail.com",
                            "⚠️ Warranty Expiry Reminder",
                            "Your product \"" + p.getDescription() + "\" is expiring on " + p.getExpiryDate()
                    );
                }
            } catch (Exception e) {
                System.out.println("Error parsing date for product ID " + p.getId());
            }
        }
    }


}