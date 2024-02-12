package huydqpc07859.firstproject.services.auth;

import huydqpc07859.firstproject.model.user.UserPrincipal;
import huydqpc07859.firstproject.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername in CustomUserDetailsService");
        return userRepository.findByEmail(username)
                .map(UserPrincipal::create)
                .orElseThrow(() -> new UsernameNotFoundException("Email is not registered")
        );
    }

}
