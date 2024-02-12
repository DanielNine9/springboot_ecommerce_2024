package huydqpc07859.firstproject.model.admin;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
@Data
public class ConfigAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long quantityOfBestSeller = 10;

    public ConfigAdmin(Long id) {
        this.id = id;
    }
}
