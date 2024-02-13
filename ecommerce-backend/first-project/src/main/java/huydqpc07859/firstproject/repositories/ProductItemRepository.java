package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.model.product.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {

    List<ProductItem> findByProduct(Product product);
}
