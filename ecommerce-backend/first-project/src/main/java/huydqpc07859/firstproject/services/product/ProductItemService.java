package huydqpc07859.firstproject.services.product;

import huydqpc07859.firstproject.model.category.VariationOption;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import huydqpc07859.firstproject.payload.product.EditProductItemRequest;
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

    public List<ProductItem> findAllByProductId(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product is not found"));
        return productItemRepository.findByProduct(product);
    }

    public ProductItem findById() {

        return new ProductItem();
    }

    public ProductItem add(ProductItemRequest request) {
        Product product = productRepository.findById(request.getIdProduct())
                .orElseThrow(() -> new RuntimeException("Product is not found"));
        System.out.println(request.getIdVariationOptions());
        List<VariationOption> variationOptions =
                variationOptionRepository
                        .findAllByIdIn(request.getIdVariationOptions());
        ProductItem item = ProductItem.builder()
                .product(product)
                .imageUrl(request.getImageUrl())
                .quantity(request.getQuantity())
                .variationOptions(variationOptions)
                .build();
        variationOptions.forEach(option -> option.getProductItems().add(item));

        product.getProductItems().add(item);
        productRepository.save(product);
        return item;
    }

    public ProductItem edit(EditProductItemRequest request) {
        System.out.println(request);
        ProductItem productItem = productItemRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Product item is not found"));
        List<VariationOption> variationOptions =
                variationOptionRepository
                        .findAllByIdIn(request.getIdVariationOptions());

        productItem.setImageUrl(request.getImageUrl());
        productItem.setQuantity(request.getQuantity());
        productItem.setVariationOptions(variationOptions);

        if(!variationOptions.isEmpty()){
            variationOptions.forEach(option -> option.getProductItems().add(productItem));
            variationOptionRepository.saveAll(variationOptions);
        }

        productItemRepository.save(productItem);
        return productItem;
    }

    public ProductItem remove() {

        return new ProductItem();
    }

    public ProductItem restore() {

        return new ProductItem();
    }

}
