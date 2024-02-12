package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.category.Variation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VariationRepository extends JpaRepository<Variation, Long> {
    Optional<Variation> findByName(String name);
    List<Variation> findAllByNameIn(List<String> names);

    void deleteByName(String name);
}
