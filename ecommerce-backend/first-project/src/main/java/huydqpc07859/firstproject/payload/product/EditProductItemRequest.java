package huydqpc07859.firstproject.payload.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EditProductItemRequest {
    private Long itemId;
    private int quantity = 0;
    private String imageUrl = "";
    private long idProduct = -1;
    private List<Long> idVariationOptions;
}
