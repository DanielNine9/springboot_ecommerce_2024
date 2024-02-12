package huydqpc07859.firstproject.payload.category;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.category.Variation;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.payload.product.ProductResponse;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategoryResponse {
    private String name;
    private String imageUrl;
    private boolean deleted;
    private boolean top;
    private String parentCategoryName;
    private List<VariationResponse> variations;
    private List<ProductResponse> products;

    public CategoryResponse(ProductCategory category) {
        this.name = category.getName();
        this.imageUrl = category.getImageUrl();
        this.deleted = category.isDeleted();
        this.variations = category.getVariations().stream().map(VariationResponse::new).toList();
        this.products = category.getProducts().stream().map(ProductResponse::new).toList();
        if (category.getParentCategory() != null) {
            this.parentCategoryName = category.getParentCategory().getName();
        } else {
            this.parentCategoryName = null;
        }
        this.top = category.isTop();
        this.deleted = category.isDeleted();
    }
}
