package huydqpc07859.firstproject.model.category;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}


