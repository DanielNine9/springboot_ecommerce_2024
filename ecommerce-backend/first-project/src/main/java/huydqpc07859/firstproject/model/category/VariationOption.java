package huydqpc07859.firstproject.model.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
@Data
public class VariationOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String value;
    @ManyToOne
    Variation variation;
    @ManyToMany
    List<ProductItem> productItems;

    @JsonProperty("variation")
    public String getVariationJson() {
        return variation.getName();
    }
    @JsonProperty("productItems")
    public List<Long> getProductItemsJson() {
        return productItems.stream().map(ProductItem::getId).toList();
    }
}
