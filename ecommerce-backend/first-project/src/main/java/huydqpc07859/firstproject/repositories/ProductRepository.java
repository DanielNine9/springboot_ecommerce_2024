package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByProductCategory(ProductCategory productCategory);
}
