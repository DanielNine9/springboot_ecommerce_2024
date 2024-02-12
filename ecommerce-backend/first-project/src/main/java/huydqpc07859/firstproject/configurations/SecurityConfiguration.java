package huydqpc07859.firstproject.configurations;

import huydqpc07859.firstproject.configurations.oauth2config.OAuth2AuthenticationSuccessHandler;
import huydqpc07859.firstproject.configurations.oauth2config.Oauth2AuthenticationFailureHandler;
import huydqpc07859.firstproject.configurations.oauth2config.HttpCookieOAuth2AuthorizationRequestRepository;
import huydqpc07859.firstproject.configurations.oauth2config.RestAuthenticationEntryPoint;
import huydqpc07859.firstproject.model.user.Role;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;

@Configuration
@AllArgsConstructor
public class SecurityConfiguration {
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private UserDetailsService userDetailsService;
    private DefaultOAuth2UserService oAuth2UserService;
    private JWTAuthenticationFilter jwtAuthenticationFilter;
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private Oauth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        return new ProviderManager(Arrays.asList(authenticationProvider()));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //.cors(cors -> cors.disable()) // Disabling CORS
                .csrf(csrf -> csrf.disable()) // Disabling CSRF
                .authorizeRequests(authorize -> authorize
//                        .requestMatchers("api/user").hasAnyAuthority(Role.ADMIN.name())
                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless session management
                )
                .exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                        httpSecurityExceptionHandlingConfigurer .authenticationEntryPoint(new RestAuthenticationEntryPoint()))
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authorizationEndpointConfig ->
                                authorizationEndpointConfig.baseUri("/api/oauth2/authorize") // Configuring authorization endpoint base URI
                                        .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
                        )
                        .redirectionEndpoint(redirectionEndpointConfig ->
                                redirectionEndpointConfig.baseUri("/oauth2/*") // Configuring redirection endpoint base URI
                        )
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService) // Configuring user info endpoint
                        )
                        .successHandler(oAuth2AuthenticationSuccessHandler) // Success handler for OAuth2 authentication
                        .failureHandler(oauth2AuthenticationFailureHandler) // Failure handler for OAuth2 authentication
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Adding JWT authentication filter
        return http.build();
    }


}
