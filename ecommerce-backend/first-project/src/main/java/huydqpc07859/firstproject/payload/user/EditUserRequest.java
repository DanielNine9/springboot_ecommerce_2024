package huydqpc07859.firstproject.payload.user;

import huydqpc07859.firstproject.model.user.AuthProvider;
import huydqpc07859.firstproject.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditUserRequest {
    private String email;
    private Role role;
    private String password;
    private boolean locked = false;
    private boolean enabled = false;
}
