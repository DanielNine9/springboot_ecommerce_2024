package huydqpc07859.firstproject.services;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.payload.category.CategoryNameRequest;
import huydqpc07859.firstproject.payload.category.CategoryResponse;
import huydqpc07859.firstproject.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> findAll(){
        return categoryRepository.findAll()
                .stream().map(CategoryResponse::new).toList();
    }
    public ProductCategory add(CategoryNameRequest request) {
        boolean exists = categoryRepository.findByName(request.getName()).isPresent();
        if(exists){
            throw new RuntimeException("Name of category is exists");
        }

        ProductCategory productCategory = ProductCategory.builder()
                .name(request.getName())
                .childCategories(new ArrayList<>())
                .variations(new ArrayList<>())
                .products(new ArrayList<>())
                .imageUrl(request.getImageUrl())
                .deleted(false)
                .top(request.isTop())
                .build();


        if(!request.getParentName().isBlank()){
            if(request.getName().equals(request.getParentName())){
                throw new IllegalArgumentException("Name and parent name can not be the same");
            }
            ProductCategory parent = categoryRepository.findByName(request.getParentName())
                    .orElseThrow(() -> new IllegalArgumentException("Parent category name is not found"));
            if(parent.isDeleted()){
                throw new IllegalArgumentException("Parent category name is not found");
            }
            productCategory.setParentCategory(parent);
            parent.getChildCategories().add(productCategory);
            return categoryRepository.save(parent);
        }
        return categoryRepository.save(productCategory);
    }

    public ProductCategory remove(CategoryNameRequest request){
        Optional<ProductCategory> exists = categoryRepository.findByName(request.getName());
        if(!exists.isPresent()){
            throw new RuntimeException("Name of category is not exists");
        }
        ProductCategory category = exists.get();
        category.setDeleted(true);

        return categoryRepository.save(category);
    }

    public ProductCategory findByName(String name) {
        return categoryRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("Name of category is not exists"));
    }
    public CategoryResponse findByNameResponse(String name) {
        return categoryRepository.findByName(name).map(CategoryResponse::new).orElseThrow(() -> new IllegalArgumentException("Name of category is not exists"));
    }

    public List<CategoryResponse> findAllParent(){
        return categoryRepository.findAllByParentCategoryIsNullAndDeletedIsFalse().stream().map(CategoryResponse::new).toList();
    }


    public void edit(CategoryNameRequest request) {
        ProductCategory category = categoryRepository.findByName(request.getName()).orElseThrow(() ->
                new RuntimeException("This category is not found"));

        category.setName(request.getName());
        category.setDeleted(request.isDeleted());
        category.setTop(request.isTop());
        category.setImageUrl(request.getImageUrl());
        if(!request.getParentName().isBlank()){
            if(request.getName().equals(request.getParentName())){
                throw new IllegalArgumentException("Name and parent name can not be the same");
            }
            ProductCategory parent = categoryRepository.findByName(request.getParentName())
                    .orElseThrow(() -> new IllegalArgumentException("Parent category name is not found"));
            if(parent.isDeleted()){
                throw new IllegalArgumentException("Parent category name is not found");
            }
            System.out.println(request.getParentName());
            category.setParentCategory(parent);
            parent.getChildCategories().add(category);
            categoryRepository.save(parent);
            return;
        }else {
            category.setParentCategory(null);
        }

        categoryRepository.save(category);
    }
}
