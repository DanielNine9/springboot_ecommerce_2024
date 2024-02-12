package huydqpc07859.firstproject.controllers;

import huydqpc07859.firstproject.payload.CommonResponse;
import huydqpc07859.firstproject.utils.ImageStorageUtil;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api/images")
public class ImageController {
    private ImageStorageUtil imageStorageUtil;
    private final String baseUri = "http://localhost:8080";

    @PostMapping(value = "/upload")
    public ResponseEntity<CommonResponse> uploadImage(
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        try {
            // Store the uploaded image file
            String fileName = imageStorageUtil.storeFile(file);
            if (fileName == null) {
                throw new RuntimeException("Failed to upload image. Please try again.");
            }

            // Construct the full image URL using the base URI and the filename
            String imageUrl = baseUri + "/api/images/" + fileName;

            // Return the full image URL
            return ResponseEntity.ok(new CommonResponse(imageUrl));
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
    @GetMapping("/{fileName:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        try {
            byte[] imageData = imageStorageUtil.readFileContent(fileName);
            ByteArrayResource resource = new ByteArrayResource(imageData);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Adjust the content type based on the image file format
                    .body(imageData);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

