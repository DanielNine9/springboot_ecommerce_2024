package huydqpc07859.firstproject.services.product;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.category.Variation;
import huydqpc07859.firstproject.payload.category.VariationRequest;
import huydqpc07859.firstproject.payload.category.VariationResponse;
import huydqpc07859.firstproject.payload.category.VariationsRequest;
import huydqpc07859.firstproject.repositories.CategoryRepository;
import huydqpc07859.firstproject.repositories.VariationRepository;
import jakarta.persistence.PersistenceException;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Var;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VariationService {
    private final VariationRepository variationRepository;
    private final CategoryRepository categoryRepository;

    public Variation add(VariationRequest request) {
        ProductCategory category = categoryRepository.findByName(request.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category name is not found"));

        boolean exists = variationRepository.findByName(request.getName()).isPresent();

        if (exists) {
            throw new RuntimeException("Variation is already taken");
        }

        Variation variation = Variation.builder()
                .name(request.getName())
                .productCategory(category)
                .variationOptions(new ArrayList<>())
                .build();

        category.getVariations().add(variation);
        categoryRepository.save(category);

        return variation;
    }

    public Variation delete(String nameVariation) {
        Variation variation = variationRepository.findByName(nameVariation).orElseThrow(() -> new RuntimeException("This variation is not found"));
        variationRepository.deleteById(variation.getId());
        return variation;
    }

    public List<VariationResponse> findAllByCategoryName(String categoryName) {
        ProductCategory category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new RuntimeException("Category name is not found"));

        return category.getVariations().stream()
                .map(VariationResponse::new)
                .collect(Collectors.toList());
    }

    public void addAll(VariationsRequest request) {
        // Find the product category by name
        ProductCategory category = categoryRepository.findByName(request.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category name is not found"));
        // Check for duplicate values in the request
        Set<String> uniqueNames = new HashSet<>(request.getNames());
        if (uniqueNames.size() < request.getNames().size()) {
            throw new RuntimeException("Duplicate values are not allowed in the request");
        }

        // Check if any of the variations already exist
        List<Variation> existingVariations = variationRepository.findAllByNameIn(request.getNames());
        if (!existingVariations.isEmpty()) {
            throw new RuntimeException("Variation is already taken");
        }

        // Add variations to the product category
        for (String name : request.getNames()) {
            Variation variation = new Variation();
            variation.setName(name);
            variation.setProductCategory(category);
            category.getVariations().add(variation);
        }

        // Save the product category with new variations
        categoryRepository.save(category);
    }

}
