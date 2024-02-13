package huydqpc07859.firstproject.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import huydqpc07859.firstproject.model.category.VariationOption;
import huydqpc07859.firstproject.payload.product.ProductResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
public class ProductItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int quantity;
    private String imageUrl;

    @ManyToOne
    private Product product;

    @ManyToMany(mappedBy = "productItems", fetch = FetchType.LAZY)
    private List<VariationOption> variationOptions;

    @JsonProperty("product")
    public Long getProduct() {
        return product.getId();
    }

}
