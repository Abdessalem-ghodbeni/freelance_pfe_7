package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.Client;
import com.restaurant.restaurant.Entites.Commande;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Services.IServices.IClientServices;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static com.restaurant.restaurant.Controllers.ArticleController.uploadDirectory;

@RestController
@CrossOrigin("*")
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {
    private final IClientServices clientServices;

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client client) {
        client.setId(id);
        Client updatedClient = clientServices.updateClient(client);
        return ResponseEntity.ok(updatedClient);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Client>> getAllCommandes() {

        return ResponseEntity.ok(clientServices.getAllClient());
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
    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerClient(@PathVariable("id") int clientid) {
        try {
            clientServices.supprimerclient(clientid);
            return ResponseEntity.ok("Client deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("GetById/{id}")
    public Client getClientById(@PathVariable int id) {
        return clientServices.getClientById(id);
    }
}
