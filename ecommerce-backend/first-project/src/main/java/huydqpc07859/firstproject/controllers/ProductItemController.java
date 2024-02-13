package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.model.product.Product;
import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.product.ProductItemRequest;
import huydqpc07859.firstproject.services.product.ProductItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("api/product-item")
public class ProductItemController {
    private final ProductItemService productItemService;

    @PostMapping("/add")
    public ResponseEntity<CommonResponse> add(@RequestBody ProductItemRequest request) {
        System.out.println(request);
        productItemService.add(request);
        return ResponseEntity.ok(new CommonResponse("Add item successfully"));

    }

    @PostMapping("edit")
    public ResponseEntity<CommonResponse> edit(@RequestBody ProductItemRequest request) {
        productItemService.edit(request);
        return ResponseEntity.ok(new CommonResponse("Edit item successfully"));

    }

    @GetMapping
    public ResponseEntity<CommonResponse> get() {
        return ResponseEntity.ok(new CommonResponse(""));

    }

    @GetMapping("/{productId}")
    public ResponseEntity<CommonResponse> getAll(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(new CommonResponse(productItemService.findAllByProductId(productId)));
    }
}
