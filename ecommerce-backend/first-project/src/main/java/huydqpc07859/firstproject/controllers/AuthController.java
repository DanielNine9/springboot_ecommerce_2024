package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.*;
import huydqpc07859.firstproject.payload.auth.*;
import huydqpc07859.firstproject.services.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<CommonResponse> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> login(@Validated @RequestBody LoginRequest req) {

        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/logout")
    public ResponseEntity<CommonResponse> logout() {
        return ResponseEntity.ok(authService.logout());
    }

    @GetMapping("/confirm")
    public void confirmToken( @RequestParam("token") String confirmToken,
                              HttpServletResponse res) {
        authService.confirmToken(confirmToken, res);
    }

    @GetMapping("/send-forget-password-token/{email}")
    public ResponseEntity<CommonResponse> sendToEmailForgetPasswordToken(@PathVariable String email) {
        return ResponseEntity.ok(authService.sendToEmailForgetPasswordToken(email));
    }

    @GetMapping("/forget-password-token")
    public void confirmEmailForgetPasswordToken(@RequestParam("token") String token, HttpServletResponse res) {
        authService.confirmForgetPassword(token, res);
    }

    @PostMapping("/change-password-with-forget-password-token")
    public ResponseEntity<CommonResponse> changePasswordWithForgetPasswordToken
            (@RequestParam("token") String token, @RequestBody NewPasswordRequest newPassword) {
        return ResponseEntity
                .ok(authService.changePasswordWithForgetPassword(token, newPassword.getNewPassword()));
    }

    @PostMapping("profile/edit")
    public ResponseEntity<CommonResponse> editProfile(@RequestHeader("Authorization") String bearer,
                                                      @RequestBody EditProfileRequest request) {
        if (!bearer.startsWith("Bearer ")) {
            throw new RuntimeException("You do not have token for get it");
        }

        String token = bearer.substring("Bearer ".length());
        return ResponseEntity.ok(authService.editMyProfile(token, request));
    }

    @PostMapping("profile/change-password")
    public ResponseEntity<CommonResponse> changePassword(@RequestHeader("Authorization") String bearer,
                                                      @RequestBody ChangePassword request) {
        if (!bearer.startsWith("Bearer ")) {
            throw new RuntimeException("You do not have token for get it");
        }

        String token = bearer.substring("Bearer ".length());
        return ResponseEntity.ok(authService.changePassword(token, request));
    }

    @GetMapping("profile")
    public ResponseEntity<CommonResponse> getProfile(@RequestHeader("Authorization") String bearer) {
        if (!bearer.startsWith("Bearer ")) {
            throw new RuntimeException("You do not have token for get it");
        }

        String token = bearer.substring("Bearer ".length());
        CommonResponse response = authService.getProfile(token);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/redirect")
    public void redirect(HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
        response.setHeader("Location", "http://localhost:3000");
    }

}
