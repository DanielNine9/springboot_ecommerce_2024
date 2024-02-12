package huydqpc07859.firstproject.utils;

import huydqpc07859.firstproject.configurations.AppProperties;
import huydqpc07859.firstproject.model.user.User;
import huydqpc07859.firstproject.model.user.UserPrincipal;
import huydqpc07859.firstproject.repositories.UserRepository;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
@AllArgsConstructor
public class TokenUtil {
    private AppProperties appProperties;
    private UserRepository userRepository;


    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        System.out.println(appProperties.getAuth().getTokenSecret());
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
        User user = userRepository.findByEmail(userPrincipal.getEmail()).orElseThrow(() -> new UsernameNotFoundException ("You are not the right"));
        Map<String, Object> claims = new HashMap<>();
        claims.put("phoneNumber", user.getUserInfo() != null ? user.getUserInfo().getPhoneNumber() : "Empty");
        claims.put("address", user.getUserInfo() != null ? user.getUserInfo().getAddress() : "Empty");
        claims.put("imageUrl", user.getImageUrl() != null ? user.getImageUrl() : null);
        claims.put("role", user.getRole());
        claims.put("fullName", user.getFullName() != null ? user.getFullName(): null);
        claims.put("auth", user.getProvider());
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .addClaims(claims) // Set multiple claims using a Map
                .signWith(SignatureAlgorithm.HS256, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }

}
