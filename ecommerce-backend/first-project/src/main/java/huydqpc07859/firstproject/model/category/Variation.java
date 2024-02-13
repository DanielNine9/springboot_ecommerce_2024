package huydqpc07859.firstproject.model.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
@Data
public class Variation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String name;
    @ManyToOne
    ProductCategory productCategory;
    @OneToMany(mappedBy = "variation", cascade = CascadeType.ALL)
    List<VariationOption> variationOptions;

    @JsonProperty("variationOptions")
    public List<String> getVariationOptionsJson() {
        return variationOptions.stream().map(VariationOption::getValue).toList();
    }
}


