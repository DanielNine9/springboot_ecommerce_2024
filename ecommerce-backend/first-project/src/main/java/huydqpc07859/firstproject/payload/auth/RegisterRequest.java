package huydqpc07859.firstproject.payload.auth;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern.List({
            @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter"),
            @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter")
    })
    private String password;

    @NotNull(message = "fullName not be null")
    private String fullName;
    @NotNull(message = "address not be null")
    private String address;
    @NotNull(message = "phoneNumber not be null")
    @Size(min = 10, max = 12, message = "Phone number must be at least 10 and at most 12 digits")
    @Pattern(regexp = "\\d*", message = "Phone number must contain only digits")
    private String phoneNumber;
}