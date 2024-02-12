package huydqpc07859.firstproject.payload.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VariationOptionRequest {
    private String value;
    private String variationName;
}
