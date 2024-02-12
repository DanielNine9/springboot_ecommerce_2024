package huydqpc07859.firstproject.payload.auth;

import huydqpc07859.firstproject.model.user.AuthProvider;
import huydqpc07859.firstproject.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditProfileRequest {
    private String fullName = "";
    private String imageUrl = "";
    private String address = "";
    private String phoneNumber = "";
}
