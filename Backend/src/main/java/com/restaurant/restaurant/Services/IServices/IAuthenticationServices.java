package com.restaurant.restaurant.Services.IServices;

import com.restaurant.restaurant.Entites.AuthenticationResponse;
import com.restaurant.restaurant.Entites.Client;
import com.restaurant.restaurant.Entites.RefreshTokenRequest;


import java.util.HashMap;

public interface IAuthenticationServices {
    AuthenticationResponse login(String email, String password);
    AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken);
    HashMap<String,String> forgetPassword(String email);
    HashMap<String,String> resetPassword(String passwordResetToken, String newPassword);
    Client addClient(Client client);
}
