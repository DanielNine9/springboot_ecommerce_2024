package huydqpc07859.firstproject.services.auth;


import huydqpc07859.firstproject.model.user.ForgetPasswordToken;
import huydqpc07859.firstproject.model.user.User;
import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.repositories.ForgetPasswordTokenRepository;
import huydqpc07859.firstproject.repositories.UserRepository;
import huydqpc07859.firstproject.services.MailService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ForgetPasswordService {

    private final ForgetPasswordTokenRepository forgetPasswordTokenRepository;
    private final UserRepository userRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    public void confirmForgetPasswordTokenForEmail(String token) {
        Optional<ForgetPasswordToken> optionalConfirmToken = forgetPasswordTokenRepository.findByToken(token);

        if(!optionalConfirmToken.isPresent()){
            throw new RuntimeException("Token is not found");
        }


        ForgetPasswordToken confirmToken = optionalConfirmToken.get();

        if (confirmToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed forget password token");
        }

        LocalDateTime expiredAt = confirmToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }
        confirmToken.setConfirmedAt(LocalDateTime.now());
        forgetPasswordTokenRepository.save(confirmToken);
    }

    public CommonResponse sendToEmailForgetPasswordToken(String email) {
        System.out.println(email);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email not found"));

        String uuid = UUID.randomUUID().toString();
        var token = ForgetPasswordToken.builder().token(uuid)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        forgetPasswordTokenRepository.save(token);

        String link = "http://localhost:8080/api/auth/forget-password-token?token=" + token.getToken();
        mailService.send(
                user.getEmail(),
                buildEmailForForgetPassword(user.getFullName(), link));

        return new CommonResponse("Waiting for you confirmed the token");
    }

    public void changePasswordWithForgetPassword(String token, String newPassword){
        ForgetPasswordToken forgetToken =
                forgetPasswordTokenRepository.findByToken(token)
                        .orElseThrow(() -> new RuntimeException("The forget password token is not found"));

        if(forgetToken.getConfirmedAt() == null){
            throw new RuntimeException("You have not confirmed by email");
        }

        forgetToken.getUser().setPassword(passwordEncoder.encode(newPassword));
        forgetPasswordTokenRepository.save(forgetToken);
    }

    public void confirmForgetPassword(String token, HttpServletResponse res, String clientUrl) {
        this.confirmForgetPasswordTokenForEmail(token);
        ForgetPasswordToken forgetToken =
                forgetPasswordTokenRepository.findByToken(token)
                        .orElseThrow(() -> new RuntimeException("The forget password token is not found"));

        res.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
        res.setHeader("Location", clientUrl +"/change-password-wtk?token=" + forgetToken.getToken()+"&email="+forgetToken.getUser().getEmail());
//        return new CommonResponse("Confirm forget password token successfully");
    }

    private String buildEmailForForgetPassword(String name, String link) {
        return "<div style=\"font-family:Helvetica, Arial, sans-serif; font-size:16px; margin:0; color:#0b0c0c\">\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse: collapse; min-width:100%; width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody>\n" +
                "      <tr>\n" +
                "        <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "          <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "            <tr>\n" +
                "              <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px; line-height:1.315789474; Margin-top:4px; padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica, Arial, sans-serif; font-weight:700; color:#ffffff; text-decoration:none; vertical-align:top; display:inline-block\">Password Reset</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </table>\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "          </table>\n" +
                "        </td>\n" +
                "      </tr>\n" +
                "    </tbody>\n" +
                "  </table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody>\n" +
                "      <tr>\n" +
                "        <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "        <td>\n" +
                "          <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "            <tr>\n" +
                "              <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "            </tr>\n" +
                "          </table>\n" +
                "        </td>\n" +
                "        <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "      </tr>\n" +
                "    </tbody>\n" +
                "  </table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody>\n" +
                "      <tr>\n" +
                "        <td height=\"30\"><br></td>\n" +
                "      </tr>\n" +
                "      <tr>\n" +
                "        <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "        <td style=\"font-family:Helvetica, Arial, sans-serif; font-size:19px; line-height:1.315789474; max-width:560px\">\n" +
                "          <p style=\"Margin:0 0 20px 0; font-size:19px; line-height:25px; color:#0b0c0c\">\n" +
                "            Hi " + name + ",\n" +
                "          </p>\n" +
                "          <p style=\"Margin:0 0 20px 0; font-size:19px; line-height:25px; color:#0b0c0c\">\n" +
                "            You requested a password reset. Click the link below to reset your password:\n" +
                "          </p>\n" +
                "          <blockquote style=\"Margin:0 0 20px 0; border-left:10px solid #b1b4b6; padding:15px 0 0.1px 15px; font-size:19px; line-height:25px\">\n" +
                "            <p style=\"Margin:0 0 20px 0; font-size:19px; line-height:25px; color:#0b0c0c\">\n" +
                "              <a href=\"" + link + "\">Reset Password</a>\n" +
                "            </p>\n" +
                "          </blockquote>\n" +
                "          Link will expire in 15 minutes.\n" +
                "          <p>See you soon</p>\n" +
                "        </td>\n" +
                "        <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      </tr>\n" +
                "      <tr>\n" +
                "        <td height=\"30\"><br></td>\n" +
                "      </tr>\n" +
                "    </tbody>\n" +
                "  </table>\n" +
                "</div>";
    }

}
