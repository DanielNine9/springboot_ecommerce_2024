package huydqpc07859.firstproject.services.product;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.user.User;
import huydqpc07859.firstproject.model.user.UserPrincipal;
import huydqpc07859.firstproject.payload.category.CategoryNameRequest;
import huydqpc07859.firstproject.payload.product.AddProductRequest;
import huydqpc07859.firstproject.payload.product.EditProductRequest;
import huydqpc07859.firstproject.payload.product.ProductResponse;
import huydqpc07859.firstproject.repositories.CategoryRepository;
import huydqpc07859.firstproject.repositories.ProductRepository;
import huydqpc07859.firstproject.repositories.UserRepository;
import huydqpc07859.firstproject.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;

    public Product add(AddProductRequest request) {
        ProductCategory productCategory = categoryRepository.findByName(request.getNameCategory())
                .orElseThrow(() -> new RuntimeException("This category is not found"));

        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new RuntimeException("User is not found"));

        Product product = Product.builder()
                .name(request.getName())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .productCategory(productCategory)
                .productItems(new ArrayList<>())
                .deleted(false)
                .users(new ArrayList<>())
                .user(user)
                .discount(request.getDiscount())
                .build();

        return productRepository.save(product);
    }

    public Product remove(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.setDeleted(true);

        return productRepository.save(product);
    }

    public Product restore(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.setDeleted(false);

        return productRepository.save(product);
    }

    public Product edit(EditProductRequest request) {
        Product product = productRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        if(!request.getNameCategory().isBlank()){
            ProductCategory category = categoryService.findByName(request.getName());
            product.setProductCategory(category);
        }
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setDeleted(request.isDeleted());

        return productRepository.save(product);
    }

    public ProductResponse findById(Long id) {
        return productRepository.findById(id).map(ProductResponse::new).orElseThrow(() -> new RuntimeException("This product is not found"));
    }

    public List<ProductResponse> findAll() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList());
    }
    public List<ProductResponse> findByCategoryName(String request) {
        Optional<ProductCategory> categoryOptional = categoryRepository.findByName(request);
        if (categoryOptional.isPresent()) {
            List<Product> list = productRepository.findAllByProductCategory(categoryOptional.get());
            return list.stream().map(ProductResponse::new).toList();
        }
        return Collections.emptyList();
    }
}
