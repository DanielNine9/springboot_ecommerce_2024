package huydqpc07859.firstproject.payload.product;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductResponse {
    private long id;
    private String name;
    private String description;
    private String imageUrl;
    private boolean deleted;
    private List<ProductItem> productItems;
    private String productCategoryName;

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.imageUrl = product.getImageUrl();
        this.deleted = product.isDeleted();
        this.productItems = product.getProductItems();
        if(product.getProductCategory() != null){
            this.productCategoryName = product.getProductCategory().getName();
        }
    }
}
