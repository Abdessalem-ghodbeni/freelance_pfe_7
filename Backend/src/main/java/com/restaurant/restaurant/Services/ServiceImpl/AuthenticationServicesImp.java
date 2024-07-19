package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.*;
import com.restaurant.restaurant.Repository.IClientRepository;
import com.restaurant.restaurant.Repository.IUserRepository;
import com.restaurant.restaurant.Services.IServices.IAuthenticationServices;
import com.restaurant.restaurant.Services.IServices.IJWTServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationServicesImp implements IAuthenticationServices {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final IJWTServices jwtServices;
    private final IClientRepository clientRepository;

    @Override
    public AuthenticationResponse login(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        var user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        var jwt = jwtServices.generateToken(user);
        var refreshToken = jwtServices.generateRefreshToken(new HashMap<>(), user);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setAccessToken(jwt);
        authenticationResponse.setRefreshToken(refreshToken);

       if (user.getRole()== Role.CLIENT) {
            Client client = (Client) user;
            Client agentDto = convertToClientDto(client);
            authenticationResponse.setUserDetails(agentDto);
       } else {
            User userDetails = convertToUserDto(user);
            authenticationResponse.setUserDetails(userDetails);
       }
        return authenticationResponse;
    }

    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken) {
        String userEmail = jwtServices.extractUsername(refreshToken.getRefreshToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        if(jwtServices.isTokenValid(refreshToken.getRefreshToken(), user)) {
            var jwt = jwtServices.generateToken(user);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse();

            authenticationResponse.setAccessToken(jwt);
            authenticationResponse.setRefreshToken(refreshToken.getRefreshToken());
            return authenticationResponse;
        }
        return null;
    }

    @Override
    public HashMap<String, String> forgetPassword(String email) {
        return null;
    }

    @Override
    public HashMap<String, String> resetPassword(String passwordResetToken, String newPassword) {
        return null;
    }

    @Override
    public Client addClient(Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return clientRepository.save(client);
    }


    private User convertToUserDto(User user) {
        User dto = new User();
        dto.setId(user.getId());
        dto.setNom(user.getNom());
        dto.setPrenom(user.getPrenom());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setNumeroTelephone(user.getNumeroTelephone());
    return dto;
    }


    private Client convertToClientDto(Client client) {
        Client dto = new Client();
        dto.setId(client.getId());
        dto.setNom(client.getNom());
        dto.setPrenom(client.getPrenom());
        dto.setEmail(client.getEmail());
        dto.setPassword(client.getPassword());
        dto.setRole(client.getRole());
        dto.setCin(client.getCin());
        dto.setNumeroTelephone(client.getNumeroTelephone());
        dto.setDateNaissance(client.getDateNaissance());
        dto.setAdresse(client.getAdresse());
        dto.setImage(client.getImage());
        return dto;
    }
}
