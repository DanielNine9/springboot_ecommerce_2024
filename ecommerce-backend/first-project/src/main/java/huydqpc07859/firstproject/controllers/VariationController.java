package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.category.VariationRequest;
import huydqpc07859.firstproject.payload.category.VariationsRequest;
import huydqpc07859.firstproject.services.product.VariationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("api/variation")
public class VariationController {
    private final VariationService variationService;

    @PostMapping("add")
    public ResponseEntity<CommonResponse> add(@RequestBody VariationRequest request) {
        variationService.add(request);
        return ResponseEntity
                .ok(new CommonResponse("Add variation for " + request.getCategoryName() + " successfully"));
    }

    @PostMapping("add-all")
    public ResponseEntity<CommonResponse> addAll(@RequestBody VariationsRequest request) {
        variationService.addAll(request);
        return ResponseEntity
                .ok(new CommonResponse("Add variations for " + request.getCategoryName() + " successfully"));
    }

    @GetMapping("{categoryName}")
    public ResponseEntity<CommonResponse> findAllByCategory(@PathVariable("categoryName") String categoryName) {

        return ResponseEntity.ok(new CommonResponse(variationService.findAllByCategoryName(categoryName)));
    }

    @DeleteMapping("delete/{nameVariation}")
    public ResponseEntity<CommonResponse> delete(@PathVariable("nameVariation") String nameVariation) {
        variationService.delete(nameVariation);
        return ResponseEntity
                .ok(new CommonResponse("Delete variation successfully"));
    }

}
