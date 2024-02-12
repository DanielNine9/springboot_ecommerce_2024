package huydqpc07859.firstproject.services.auth;

import huydqpc07859.firstproject.exception.OAuth2AuthenticationProcessingException;
import huydqpc07859.firstproject.model.user.*;
import huydqpc07859.firstproject.payload.*;
import huydqpc07859.firstproject.payload.auth.ChangePassword;
import huydqpc07859.firstproject.payload.auth.EditProfileRequest;
import huydqpc07859.firstproject.payload.auth.LoginRequest;
import huydqpc07859.firstproject.payload.auth.RegisterRequest;
import huydqpc07859.firstproject.payload.user.UserFullInfoResponse;
import huydqpc07859.firstproject.repositories.ConfirmTokenRepository;
import huydqpc07859.firstproject.repositories.UserRepository;
import huydqpc07859.firstproject.services.MailService;
import huydqpc07859.firstproject.utils.TokenUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final TokenUtil tokenUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmTokenService confirmTokenService;
    private final MailService mailService;
    private final ConfirmTokenRepository confirmTokenRepository;
    private final ForgetPasswordService forgetPasswordService;
    private final String clientURL = "http://localhost:3000";

    public CommonResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Email is not registered"));
        if(!user.getProvider().equals(AuthProvider.local)
                && !user.getProvider().equals(AuthProvider.admin) ){
            throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                    user.getProvider() + " account. Please use your " + user.getProvider() +
                    " account to login.");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenUtil.generateToken(authentication);
        return new CommonResponse(new TokenResponse(token));
    }

    public CommonResponse register(RegisterRequest req) {
        if(userRepository.findByEmail(req.getEmail()).isPresent()){
            throw new RuntimeException("Email is already taken");
        }

        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.BUYER)
                .fullName(req.getFullName())
                .provider(AuthProvider.local)
                .favProducts(new ArrayList<>())
                .build();

        UserInfo userInfo = UserInfo.builder()
                .address(req.getAddress())
                .phoneNumber(req.getPhoneNumber())
                .build();

        user.setUserInfo(userInfo);
        userRepository.save(user);
        String uuid = UUID.randomUUID().toString();
        var token = ConfirmToken.builder().token(uuid)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        confirmTokenRepository.save(token);

        String link = "http://localhost:8080/api/auth/confirm?token=" + token.getToken();
        mailService.send(
                req.getEmail(),
                mailService.buildEmail(req.getFullName(), link));

        return new CommonResponse("Register successfully");
    }

    public CommonResponse logout() {
        return new CommonResponse("Logout successfully");
    }

    public void confirmToken(String token, HttpServletResponse res){
        confirmTokenService.confirmTokenForEmail(token);
        res.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
        res.setHeader("Location", clientURL + "/login");
    }

    public void confirmForgetPassword(String token, HttpServletResponse res) {
       forgetPasswordService.confirmForgetPassword(token, res, clientURL);
    }

    public CommonResponse sendToEmailForgetPasswordToken(String email) {
        forgetPasswordService.sendToEmailForgetPasswordToken(email);
        return new CommonResponse("Waiting for you confirmed the token");
    }

    public CommonResponse changePasswordWithForgetPassword(String token, String newPassword){
        forgetPasswordService.changePasswordWithForgetPassword(token, newPassword);
        return new CommonResponse("Change the password successfully");
    }

    public CommonResponse editMyProfile(String token, EditProfileRequest request) {
        String email = tokenUtil.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email is not registered"));
        if(user.getUserInfo() == null){
            UserInfo userInfo = new UserInfo();
            userInfo.setUser(user);
            user.setUserInfo(userInfo);
        }
        if(!request.getImageUrl().isBlank()){
            user.setImageUrl(request.getImageUrl());
        }
        if(!request.getAddress().isBlank()){
            user.getUserInfo().setAddress(request.getAddress());
        }
        if(!request.getPhoneNumber().isBlank()){
            user.getUserInfo().setPhoneNumber(request.getPhoneNumber());
        }
        if(!request.getFullName().isBlank()){
            user.setFullName(request.getFullName());
        }
        userRepository.save(user);
        return new CommonResponse("Edit profile successfully");
    }

    public CommonResponse getProfile(String bearer) {
        String email = tokenUtil.getEmailFromToken(bearer);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email is not registered"));
        return new CommonResponse(new UserFullInfoResponse(user));
    }

    public CommonResponse changePassword(String token, ChangePassword request) {
        String email = tokenUtil.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email is not registered"));
        String encodedStoredPassword = user.getPassword();
        String newPassword = passwordEncoder.encode(request.getNewPassword());
        if (!passwordEncoder.matches(request.getCurrentPassword(), encodedStoredPassword)) {
            throw new RuntimeException("The current password is not correct");
        }
        user.setPassword(newPassword);
        userRepository.save(user);
        return new CommonResponse("Change password successfully");
    }
}
