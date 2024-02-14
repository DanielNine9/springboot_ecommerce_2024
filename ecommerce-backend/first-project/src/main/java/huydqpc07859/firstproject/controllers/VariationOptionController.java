package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.category.VariationOptionRequest;
import huydqpc07859.firstproject.payload.category.VariationOptionResponse;
import huydqpc07859.firstproject.payload.category.VariationOptionsRequest;
import huydqpc07859.firstproject.services.product.VariationOptionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/var-option")
@AllArgsConstructor
public class VariationOptionController {
    private final VariationOptionService service;

    @PostMapping("add")
    public ResponseEntity<CommonResponse> add(@RequestBody VariationOptionRequest request) {
        if(request.getValue().isBlank()){
            throw new RuntimeException("The value is not empty");
        }

        return ResponseEntity.ok(new CommonResponse(service.add(request)));
    }

    @PostMapping("add-all")
    public ResponseEntity<CommonResponse> addAll(@RequestBody VariationOptionsRequest request) {
        service.addAll(request);
        return ResponseEntity.ok(new CommonResponse("Add variation options successfully"));
    }

    @DeleteMapping("delete-all/item/{idItem}")
    public ResponseEntity<CommonResponse> deleteAllByItemId(@PathVariable("idItem") Long idItem) {
        service.deleteAllVariationOptionsOfItemId(idItem);
        return ResponseEntity.ok(new CommonResponse("Delete all variation options successfully"));
    }

    @DeleteMapping("delete-all/{varName}")
    public ResponseEntity<CommonResponse> deleteAllByVariation(@PathVariable("varName") String request) {
        service.deleteAllByVariation(request);
        return ResponseEntity.ok(new CommonResponse("Delete all variation options successfully"));
    }

    @GetMapping("{varName}")
    public ResponseEntity<CommonResponse> getByVarName(@PathVariable("varName") String varName) {
        return ResponseEntity.ok(new CommonResponse(service.findByVarName(varName)));
    }

    @DeleteMapping("{varName}")
    public ResponseEntity<CommonResponse> delete(@RequestBody VariationOptionRequest request) {
        service.remove(request);
        return ResponseEntity.ok(new CommonResponse("Delete variation option successfully"));
    }



}
