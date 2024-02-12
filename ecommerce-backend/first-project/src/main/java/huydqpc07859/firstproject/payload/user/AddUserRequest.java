package huydqpc07859.firstproject.payload.user;

import huydqpc07859.firstproject.model.user.AuthProvider;
import huydqpc07859.firstproject.model.user.Role;
import huydqpc07859.firstproject.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddUserRequest {
    private String email;
    private String fullName;
    private String password;
    private Role role;
    private boolean locked = false;
    private boolean enabled = false;
    private AuthProvider provider = AuthProvider.local;
    private String providerId;
    private String imageUrl;
    private String address = "Empty";
    private String phoneNumber = "Empty";


}
