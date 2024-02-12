package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.admin.AdminRequest;
import huydqpc07859.firstproject.services.admin.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("api/admin/config")
public class AdminController {
    private final AdminService adminService;

    @PostMapping()
    public ResponseEntity<CommonResponse> config(@RequestBody AdminRequest request) {
        adminService.config(request);
        return ResponseEntity.ok(new CommonResponse("Config successfully"));
    }

    @GetMapping
    public ResponseEntity<CommonResponse> getConfig() {
        return ResponseEntity.ok(new CommonResponse(adminService.getConfig()));
    }


}
