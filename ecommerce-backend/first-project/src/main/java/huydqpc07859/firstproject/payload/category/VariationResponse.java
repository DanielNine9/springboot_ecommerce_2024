package huydqpc07859.firstproject.payload.category;

import huydqpc07859.firstproject.model.category.Variation;
import huydqpc07859.firstproject.model.category.VariationOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VariationResponse {
    private String name;
    private String categoryName;
    List<VariationOptionResponse> variationOptions;

    public VariationResponse(Variation var){
        this.name = var.getName();
        this.categoryName = var.getProductCategory().getName();
        this.variationOptions = var.getVariationOptions().stream().map(VariationOptionResponse::new).toList();
    }
}
