package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.Menu;
import com.restaurant.restaurant.Services.IServices.IArticleServices;
import com.restaurant.restaurant.Services.IServices.IMenuServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/Menu")
@RequiredArgsConstructor
public class MenuController {
    private final IMenuServices menuServices ;

}
