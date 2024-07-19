package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.*;
import com.restaurant.restaurant.Services.IServices.IAuthenticationServices;
import com.restaurant.restaurant.Services.ServiceImpl.SendEmailServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  public static String uploadDirectory = System.getProperty("user.dir") + "/uploadUser";

  private final IAuthenticationServices authenticationServices;
  private  final SendEmailServiceImp sendEmailService;

  @PostMapping("/registerClient")
  public ResponseEntity<Client> registerClient(@RequestParam("nom") String nom,
                                               @RequestParam("prenom") String prenom,
                                               @RequestParam("email") String email,
                                               @RequestParam("password") String password,
                                               @RequestParam("numeroTelephone") String numeroTelephone,
                                               @RequestParam("cin") Long cin,
                                               @RequestParam("dateNaissance") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateNaissance,
                                               @RequestParam("adresse") String adresse,

                                               @RequestParam("image") MultipartFile file) throws IOException {
    Client client = new Client();
    client.setNom(nom);
    client.setPrenom(prenom);
    client.setEmail(email);
    client.setPassword(password);
    client.setCin(cin);

    client.setNumeroTelephone(numeroTelephone);
    client.setDateNaissance(dateNaissance);
    client.setRole(Role.CLIENT);
    client.setAdresse(adresse);
    String originalFilename = file.getOriginalFilename();
    String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
    Path fileNameAndPath = Paths.get(uploadDirectory, uniqueFilename);
    if (!Files.exists(fileNameAndPath.getParent())) {
      Files.createDirectories(fileNameAndPath.getParent());
    }
    Files.write(fileNameAndPath, file.getBytes());
    client.setImage(uniqueFilename);
    Client savedClient = authenticationServices.addClient(client);

    String subject = "Welcome to Our Service!";
    String body = "Hello " + nom + ",\n\n"
            + "Your account has been created successfully. "
            + "You can log in using the following credentials:\n"
            + "Email: " + email + "\n"
            + "Password: " + password + "\n\n"
            + "Thank you for joining us!";

    sendEmailService.sendEmail(email, body, subject);

    return ResponseEntity.ok(savedClient);
  }

  @GetMapping("/{filename:.+}")
  @ResponseBody
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws MalformedURLException {

    Path filePath = Paths.get(uploadDirectory).resolve(filename);
    Resource file = new UrlResource(filePath.toUri());

    if (file.exists() || file.isReadable()) {
      return ResponseEntity
              .ok()
              .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
              .body(file);
    } else {
      throw new RuntimeException("Could not read the file!");
    }
  }

  @PostMapping("/login")
  public AuthenticationResponse login(@RequestBody User user) {
      return authenticationServices.login(user.getEmail(), user.getPassword());
  }

  @PostMapping("/refreshToken")
  public AuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshToken) {
      return authenticationServices.refreshToken(refreshToken);
  }

  @PostMapping("/forgetpassword")
  public HashMap<String,String> forgetPassword(@RequestBody String email){
        return authenticationServices.forgetPassword(email);
  }

    @PostMapping("/resetPassword/{passwordResetToken}")
    public HashMap<String,String> resetPassword(@PathVariable String passwordResetToken, String newPassword){
        return authenticationServices.resetPassword(passwordResetToken, newPassword);
    }


}
