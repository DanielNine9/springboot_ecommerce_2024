package huydqpc07859.firstproject.payload.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VariationsRequest {
    private List<String> names;
    private String categoryName;
}
