package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.payload.user.AddUserRequest;
import huydqpc07859.firstproject.payload.user.EditUserRequest;
import huydqpc07859.firstproject.services.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/user")
@AllArgsConstructor
public class UserController {
    UserService userService;
    @GetMapping
    public ResponseEntity<CommonResponse> getUsers(
            @RequestParam(value = "email", defaultValue = "") String email,
            @RequestParam(value = "role", defaultValue = "") String role,
            @RequestParam(value = "address", defaultValue = "") String address
    ) {
        return ResponseEntity.ok(userService.getUsers(email, role, address));
    }

    @PostMapping("add")
    public ResponseEntity<CommonResponse> addUser(@RequestBody AddUserRequest request) {
        return ResponseEntity.ok(userService.addUser(request));
    }

    @PostMapping("edit")
    public ResponseEntity<CommonResponse> editUser(@RequestBody EditUserRequest request) {
        return ResponseEntity.ok(userService.editUser(request));
    }
}
