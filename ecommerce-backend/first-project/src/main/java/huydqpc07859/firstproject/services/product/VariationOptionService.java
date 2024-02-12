package huydqpc07859.firstproject.services.product;

import huydqpc07859.firstproject.model.category.ProductCategory;
import huydqpc07859.firstproject.model.category.Variation;
import huydqpc07859.firstproject.model.category.VariationOption;
import huydqpc07859.firstproject.payload.category.VariationOptionRequest;
import huydqpc07859.firstproject.payload.category.VariationOptionResponse;
import huydqpc07859.firstproject.payload.category.VariationOptionsRequest;
import huydqpc07859.firstproject.payload.category.VariationsRequest;
import huydqpc07859.firstproject.repositories.VariationOptionRepository;
import huydqpc07859.firstproject.repositories.VariationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VariationOptionService {
    private final VariationRepository variationRepository;
    private final VariationOptionRepository variationOptionRepository;

    public VariationOption add(VariationOptionRequest request) {
        Variation var = variationRepository.findByName(request.getVariationName())
                .orElseThrow(() -> new RuntimeException("Variation with name " + request.getVariationName()
                        + " is not found"));

        boolean exists = variationOptionRepository.findByValueAndVariation(request.getValue(), var).isPresent();
        if(exists){
            throw new RuntimeException("The value is present");
        }
        VariationOption varOption = VariationOption.builder()
                .variation(var)
                .value(request.getValue())
                .productItems(new ArrayList<>())
                .build();
        var.getVariationOptions().add(varOption);
        variationRepository.save(var);
        return varOption;
    }

    public void addAll(VariationOptionsRequest request) {
        // Find the variation by name
        Set<String> setValues = new HashSet<>(request.getValues());
        if(setValues.size() < request.getValues().size()){
            throw new RuntimeException("Duplicate value options are not allowed in the request");
        }
        Variation variation = variationRepository.findByName(request.getVariationName())
                .orElseThrow(() -> new RuntimeException("Variation with name " + request.getVariationName() + " is not found"));


        // Find all variation options by values and the associated variation
        List<VariationOption> existingOptions = variationOptionRepository.findAllByValueInAndVariation(request.getValues(), variation);



        if (!existingOptions.isEmpty()) {
            throw new RuntimeException("One or more values already exist for this variation");
        }

        // Create new variation options and associate them with the variation
        List<VariationOption> newOptions = new ArrayList<>();
        for (String value : request.getValues()) {
            VariationOption newOption = new VariationOption();
            newOption.setVariation(variation);
            newOption.setValue(value);
            newOptions.add(newOption);
        }
        variation.getVariationOptions().addAll(newOptions);

        // Save the new variation options
        variationRepository.save(variation);
    }


    public void remove(VariationOptionRequest request) {
        Variation var = variationRepository.findByName(request.getVariationName())
                .orElseThrow(() -> new RuntimeException("Variation with name " + request.getVariationName()
                        + " is not found"));

        VariationOption varOption = variationOptionRepository
                .findByValueAndVariation(request.getValue(), var).orElseThrow(() ->
                        new RuntimeException("This value is not found"));

        variationOptionRepository.delete(varOption);
//        var.getVariationOptions().remove(varOption);
    }

    public List<VariationOptionResponse> findByVarName(String varName) {
        Variation var = variationRepository.findByName(varName).orElseThrow(
                () -> new RuntimeException("This variation is not found")
        );
        return var.getVariationOptions()
                .stream().map(VariationOptionResponse::new).collect(Collectors.toList());
    }

    public void deleteAllByVariation(String variationName) {
        Variation var = variationRepository
                .findByName(variationName)
                .orElseThrow(() -> new RuntimeException("This variation is not found"));

        List<VariationOption> opts = var.getVariationOptions();
        if(opts.size() > 0){
            var.setVariationOptions(new ArrayList<>());
            variationOptionRepository.deleteAll(opts);
        }
        variationRepository.save(var);
    }
}
