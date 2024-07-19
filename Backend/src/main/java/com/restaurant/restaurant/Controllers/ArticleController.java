package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Categorie;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Services.IServices.IArticleServices;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import static com.restaurant.restaurant.Controllers.AuthenticationController.uploadDirectory;

@RestController
@CrossOrigin("*")
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {
    private final IArticleServices articleServices;
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploadUser";

    @PostMapping("/add")
    public ResponseEntity<Article> ajouterArticle(@RequestParam("nom") String nom,
                                                  @RequestParam("description") String description,
                                                  @RequestParam("prix") double prix,
                                                  @RequestParam(value = "quantityStock", required = false) Double quantityStock,
                                                  @RequestParam("categorieId") int categorieId,
                                                  @RequestParam("image") MultipartFile file) throws IOException {
        Article article = new Article();
        article.setNom(nom);
        article.setQuantityStock(quantityStock != null ? quantityStock : 1000000.0);

        article.setDescription(description);
        article.setPrix(prix);
        Categorie categorie = new Categorie();
        categorie.setId(categorieId);

        article.setCategorie(categorie);
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path fileNameAndPath = Paths.get(uploadDirectory, uniqueFilename);
        if (!Files.exists(fileNameAndPath.getParent())) {
            Files.createDirectories(fileNameAndPath.getParent());
        }
        Files.write(fileNameAndPath, file.getBytes());
        article.setImage(uniqueFilename);
        Article savedArticle = articleServices.ajouterArticle(article);
        return ResponseEntity.ok(savedArticle);
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
    @GetMapping("/get-quantity/{id}")
    public ResponseEntity<Integer> getQuantity(@PathVariable("id") int articleId) {
        Integer quantity = articleServices.getArticleQuantite(articleId);
        if (quantity != null) {
            return ResponseEntity.ok(quantity);
        } else {
            return ResponseEntity.badRequest().body(0); // ou une autre valeur ou message approprié
        }
    }
    @PutMapping("/update")
    public ResponseEntity<Article> modifierArticle(@RequestParam("nom") String nom,
                                                   @RequestParam("id") int id,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("prix") double prix,
                                                   @RequestParam("categorieId") int categorieId,
                                                   @RequestParam("image") MultipartFile file) throws IOException {
        Article article = new Article();
        article.setNom(nom);
        article.setId(id);
        article.setDescription(description);
        article.setPrix(prix);
        Categorie categorie = new Categorie();
        categorie.setId(categorieId);

        article.setCategorie(categorie);
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path fileNameAndPath = Paths.get(uploadDirectory, uniqueFilename);
        if (!Files.exists(fileNameAndPath.getParent())) {
            Files.createDirectories(fileNameAndPath.getParent());
        }
        Files.write(fileNameAndPath, file.getBytes());
        article.setImage(uniqueFilename);
        Article savedArticle = articleServices.modifierArticle(article);
        return ResponseEntity.ok(savedArticle);
    }
    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerArticle(@PathVariable("id") int articleId) {
        try {
            articleServices.supprimerArticle(articleId);
            return ResponseEntity.ok("article deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllArticles() {

        try {
            List<Article> Agents = articleServices.getAllArticle();
            if (Agents.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(Agents);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé"+exception.getMessage());
        }
    }

    @GetMapping("/unsold")
    public List<Article> getUnsoldArticles() {
        return articleServices.getUnsoldArticles();
    }

    @GetMapping("/count-unsold")
    public long getCountOfUnsoldArticles() {
        return articleServices.getCountOfUnsoldArticles();
    }
    @GetMapping("GetById/{id}")
    public Article getArticleByIdWithDetails(@PathVariable int id) {
        return articleServices.getArticleByiD(id);
    }


    @GetMapping("/sold-count")
    public long getCountOfSoldArticles() {
        return articleServices.getCountOfSoldArticles();
    }

    @GetMapping("/top10")
    public ResponseEntity<List<Article>> getTop10Articles() {
        List<Article> articles = articleServices.getTop10Articles();
        return ResponseEntity.ok(articles);
    }
}
