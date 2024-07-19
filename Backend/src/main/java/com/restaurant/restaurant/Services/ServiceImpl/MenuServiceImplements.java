package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Categorie;
import com.restaurant.restaurant.Entites.Menu;
import com.restaurant.restaurant.Repository.IArticleRepository;
import com.restaurant.restaurant.Repository.ICategorieRepository;
import com.restaurant.restaurant.Repository.IMenuRepository;
import com.restaurant.restaurant.Services.IServices.IMenuServices;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Slf4j
@RequiredArgsConstructor
public class MenuServiceImplements implements IMenuServices {
    private final IArticleRepository articleRepository;
    private final ICategorieRepository categorieRepository;
    private final IMenuRepository menuRepository;





}
