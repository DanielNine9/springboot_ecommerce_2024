package huydqpc07859.firstproject.payload.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EditProductRequest {
    private long id;
    private String name;
    private String description;
    private String imageUrl;
    private String nameCategory;
    private boolean deleted;
    private Integer rank = null;
}