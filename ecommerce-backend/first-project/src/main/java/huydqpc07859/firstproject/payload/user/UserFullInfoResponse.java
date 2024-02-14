package huydqpc07859.firstproject.payload.user;

import huydqpc07859.firstproject.model.user.AuthProvider;
import huydqpc07859.firstproject.model.user.Role;
import huydqpc07859.firstproject.model.user.User;
import huydqpc07859.firstproject.model.user.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserFullInfoResponse {
    private String email;
    private String fullName;
    private Role role;
    private boolean locked = false;
    private boolean enabled = false;
    private AuthProvider provider = AuthProvider.local;
    private String providerId;
    private String imageUrl;
    private String address = "";
    private String phoneNumber = "";


    public UserFullInfoResponse(User user){

        UserInfo userInfo;
        if(user.getUserInfo() != null){
            userInfo = (UserInfo) user.getUserInfo();
            this.address = userInfo.getAddress();
            this.phoneNumber = userInfo.getPhoneNumber();
        }
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.role = user.getRole();
        this.locked = user.isLocked();
        this.enabled = user.isEnabled();
        this.provider = user.getProvider();
        this.providerId = user.getProviderId();
        this.imageUrl = user.getImageUrl();

    }
}
