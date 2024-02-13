package huydqpc07859.firstproject.payload.category;

import huydqpc07859.firstproject.model.category.VariationOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VariationOptionResponse
{
    private Long id;
    private String value;
    private String variationName;
    public VariationOptionResponse(VariationOption option) {
        this.id = option.getId();
        this.value = option.getValue();
        this.variationName = option.getVariation().getName();
    }
}
