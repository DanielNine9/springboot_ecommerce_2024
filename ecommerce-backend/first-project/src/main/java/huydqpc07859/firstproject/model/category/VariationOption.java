package huydqpc07859.firstproject.model.category;

import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    @JsonIgnore
    Variation variation;
    @ManyToMany
    List<ProductItem> productItems;

}
