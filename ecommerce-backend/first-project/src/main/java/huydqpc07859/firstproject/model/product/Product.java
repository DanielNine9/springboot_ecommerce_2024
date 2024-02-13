package huydqpc07859.firstproject.model.product;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private String imageUrl;
    private boolean deleted;
    private double discount;
    private Integer rank;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductItem> productItems;
    @ManyToOne
    private ProductCategory productCategory;
    @ManyToOne
    private User user;
    @ManyToMany(mappedBy = "favProducts", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> users;
    @CreationTimestamp
    private LocalDateTime created_at;
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
