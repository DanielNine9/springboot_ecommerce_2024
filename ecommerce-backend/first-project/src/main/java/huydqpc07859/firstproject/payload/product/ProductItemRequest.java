package huydqpc07859.firstproject.payload.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductItemRequest {
    private long quantity;
    private String imageUrl;

    private long idProduct;
    private List<Long> idVariationOptions;
}
