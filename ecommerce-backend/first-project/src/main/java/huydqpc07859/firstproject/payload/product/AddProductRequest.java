package huydqpc07859.firstproject.payload.product;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddProductRequest {
    @NotBlank
    private String name = "";
    @NotBlank
    private String description = "";
    private String imageUrl;
    @NotBlank
    private String nameCategory = "";
    private Double discount = 0.0;
}
