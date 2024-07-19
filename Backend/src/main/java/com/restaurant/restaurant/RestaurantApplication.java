package com.restaurant.restaurant;

import com.restaurant.restaurant.Entites.Admin;
import com.restaurant.restaurant.Entites.Role;
import com.restaurant.restaurant.Entites.User;
import com.restaurant.restaurant.Repository.IAdminRepository;
import com.restaurant.restaurant.Repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableAspectJAutoProxy
@RequiredArgsConstructor
@ComponentScan(basePackages={"com.restaurant.restaurant" ,"com.restaurant.restaurant.CorsCongiguration"})
public class RestaurantApplication implements CommandLineRunner {
    private final IUserRepository userRepository;
    private final IAdminRepository adminRepository;
    public static void main(String[] args) {
        SpringApplication.run(RestaurantApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if (adminAccount == null) {
            Admin admin = new Admin();
            admin.setEmail("admin@gmail.com");
            admin.setNom("Nefzi");
            admin.setPrenom("Aymen");
            admin.setRole(Role.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            adminRepository.save(admin);
        }
    }
}
