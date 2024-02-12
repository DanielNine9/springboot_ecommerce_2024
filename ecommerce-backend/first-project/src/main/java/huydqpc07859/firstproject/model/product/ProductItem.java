package huydqpc07859.firstproject.model.product;

import huydqpc07859.firstproject.model.category.VariationOption;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
@Data
public class ProductItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long quantity;
    private String imageUrl;

    @ManyToOne
    Product product;
    @ManyToMany(mappedBy = "productItems")
    private List<VariationOption> variationOptions;
}
