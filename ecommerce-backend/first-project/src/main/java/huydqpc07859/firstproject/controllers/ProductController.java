package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.product.AddProductRequest;
import huydqpc07859.firstproject.payload.product.EditProductRequest;
import huydqpc07859.firstproject.services.product.ProductService;
import huydqpc07859.firstproject.utils.ImageStorageUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@AllArgsConstructor
@RequestMapping("api/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<CommonResponse> getProducts() {
        return ResponseEntity.ok(new CommonResponse(productService.findAll()));
    }

    @PostMapping("add")
    public ResponseEntity<CommonResponse> addProduct(@RequestBody AddProductRequest request)  {
            productService.add(request);
            return ResponseEntity.ok(new CommonResponse("Add product successfully"));
    }

    @PostMapping("edit")
    public ResponseEntity<CommonResponse> editProduct(@RequestBody EditProductRequest request) {
        productService.edit(request);
        return ResponseEntity.ok(new CommonResponse("Add product successfully"));
    }

    @PostMapping("remove/{productId}")
    public ResponseEntity<CommonResponse> removeProduct(@PathVariable("productId") Long request) {
        productService.remove(request);
        return ResponseEntity.ok(new CommonResponse("Remove product successfully"));
    }

    @GetMapping("category/{categoryName}")
    public ResponseEntity<CommonResponse> getProducts(@PathVariable("categoryName") String request) {
        return ResponseEntity.ok(new CommonResponse(productService.findByCategoryName(request)));
    }

    @GetMapping("{productId}")
    public ResponseEntity<CommonResponse> getProducts(@PathVariable("productId") Long request) {
        return ResponseEntity.ok(new CommonResponse(productService.findById(request)));
    }
}
