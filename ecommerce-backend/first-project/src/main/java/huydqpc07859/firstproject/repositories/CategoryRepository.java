package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.category.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findByName(String name);
    List<ProductCategory> findAllByParentCategoryIsNullAndDeletedIsFalse();


    boolean existsByName(String s);
}
