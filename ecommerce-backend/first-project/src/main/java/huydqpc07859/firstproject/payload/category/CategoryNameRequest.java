package huydqpc07859.firstproject.payload.category;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategoryNameRequest {
    private Long id;
    @NotBlank
    private String name = "";
    private String imageUrl = "";
    private String parentName = "";
    private boolean top = false;
    private boolean deleted = false;

    public CategoryNameRequest(String name) {
        this.name = name;
    }
}
