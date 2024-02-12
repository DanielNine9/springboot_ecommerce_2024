package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.category.Variation;
import huydqpc07859.firstproject.model.category.VariationOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VariationOptionRepository extends JpaRepository<VariationOption, Long> {
    Optional<VariationOption> findByValueAndVariation(String value, Variation var);

    List<VariationOption> findAllByValueInAndVariation(List<String> values, Variation variation);
}
