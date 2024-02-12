package huydqpc07859.firstproject.services.user;

import huydqpc07859.firstproject.model.user.AuthProvider;
import huydqpc07859.firstproject.model.user.Role;
import huydqpc07859.firstproject.model.user.User;
import huydqpc07859.firstproject.model.user.UserInfo;
import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.user.AddUserRequest;
import huydqpc07859.firstproject.payload.user.EditUserRequest;
import huydqpc07859.firstproject.payload.user.UserFullInfoResponse;
import huydqpc07859.firstproject.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;
    public CommonResponse getUsers(String email, String role, String address) {
        List<Role> roles = role.isBlank() ? List.of(Role.BUYER, Role.ADMIN, Role.SELLER) : Collections.singletonList(Role.valueOf(role.toUpperCase()));
        if (address.isBlank()) {
            return new CommonResponse(userRepository.findByEmailContainingIgnoreCaseAndRoleIn(email, roles)
                    .stream().map(UserFullInfoResponse::new));
        }
        List<UserFullInfoResponse> userFullInfoResponses = userRepository.findByEmailContainingIgnoreCaseAndRoleIn(email, roles)
                .stream()
                .filter(user -> {
                    UserInfo userInfo = user.getUserInfo();
                    return userInfo != null && userInfo.getAddress() != null && userInfo.getAddress().toLowerCase().contains(address.toLowerCase());
                })
                .map(UserFullInfoResponse::new) // Map User objects to UserFullInfoResponse objects
                .collect(Collectors.toList());

        return new CommonResponse(userFullInfoResponses);
    }

    public CommonResponse editUser(EditUserRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new UsernameNotFoundException("Email is not found")
        );
        if(user.getRole().equals(AuthProvider.admin)){
            user.setPassword(request.getPassword());
        }
        user.setEnabled(request.isEnabled());
        user.setLocked(request.isLocked());
        user.setRole(request.getRole());
        userRepository.save(user);
        return new CommonResponse("Edit user successfully");
    }

    public CommonResponse addUser(AddUserRequest req) {
        Optional<User> userOptional = userRepository.findByEmail(req.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalArgumentException("Email is already taken");
        }
        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.BUYER)
                .fullName(req.getFullName())
                .provider(AuthProvider.admin)
                .build();

        UserInfo userInfo = UserInfo.builder()
                .address(req.getAddress())
                .phoneNumber(req.getPhoneNumber())
                .build();

        user.setUserInfo(userInfo);
        userRepository.save(user);

        return new CommonResponse("User added successfully");
    }

}
