package huydqpc07859.firstproject.services.product;

import huydqpc07859.firstproject.model.category.VariationOption;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import huydqpc07859.firstproject.payload.product.ProductItemRequest;
import huydqpc07859.firstproject.repositories.ProductItemRepository;
import huydqpc07859.firstproject.repositories.ProductRepository;
import huydqpc07859.firstproject.repositories.VariationOptionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductItemService {
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ProductItemRepository productItemRepository;
    private final VariationOptionRepository variationOptionRepository;

    public List<ProductItem> findAllByProduct(long id) {

        return new ArrayList<>();
    }

    public ProductItem findById() {

        return new ProductItem();
    }

    public ProductItem add(ProductItemRequest request) {
        Product product = productRepository.findById(request.getIdProduct())
                .orElseThrow(() -> new IllegalArgumentException("Product is not found"));
        List<VariationOption> productItems = variationOptionRepository.findAllById(request.getIdVariationOptions());

        ProductItem productItem = ProductItem.builder()
                .imageUrl(request.getImageUrl())
                .quantity(request.getQuantity())
                .product(product)
                .variationOptions(productItems)
                .build();

        product.getProductItems().add(productItem);
        productRepository.save(product);
        return productItem;
    }

    public ProductItem edit(ProductItemRequest request) {
        List<VariationOption> productItems = variationOptionRepository.findAllById(request.getIdVariationOptions());

        ProductItem productItem = ProductItem.builder()
                .imageUrl(request.getImageUrl())
                .quantity(request.getQuantity())
                .variationOptions(productItems)
                .build();

        return productItemRepository.save(productItem);
    }

    public ProductItem remove() {

        return new ProductItem();
    }
    public ProductItem restore() {

        return new ProductItem();
    }

}
