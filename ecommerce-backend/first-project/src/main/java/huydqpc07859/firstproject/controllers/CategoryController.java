package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.category.CategoryNameRequest;
import huydqpc07859.firstproject.services.CategoryService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("api/category")
public class CategoryController {
    private final CategoryService service;

    @GetMapping("")
    public ResponseEntity<CommonResponse> findAll() {
        return ResponseEntity.ok(new CommonResponse(service.findAll()));
    }

    @GetMapping("parents")
    public ResponseEntity<CommonResponse> findAllParents() {
        return ResponseEntity.ok(new CommonResponse(service.findAllParent()));
    }

    @PostMapping("add")
    public ResponseEntity<CommonResponse> add(@RequestBody CategoryNameRequest request) {
        service.add(request);
        return ResponseEntity.ok(new CommonResponse("Add category successfully"));
    }

    @PostMapping("edit")
    public ResponseEntity<CommonResponse> edit(@RequestBody CategoryNameRequest request) {
        service.edit(request);
        return ResponseEntity.ok(new CommonResponse("Edit category successfully"));
    }

    @PostMapping("remove")
    public ResponseEntity<CommonResponse> remove(@RequestBody CategoryNameRequest request) {
        service.remove(request);
        return ResponseEntity.ok(new CommonResponse("Remove category successfully"));
    }

    @GetMapping("/{parentName}")
    public ResponseEntity<CommonResponse> findByParentName(@PathVariable("parentName") String parentName) {
        return ResponseEntity.ok(new CommonResponse(service.findByNameResponse(parentName)));
    }
}
