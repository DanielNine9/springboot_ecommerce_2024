package huydqpc07859.firstproject.services;


import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;

public class ImageService {
    private final Path storage = Paths.get("uploads");

    public ImageService() {
        try {
            if (!Files.exists(storage))
                Files.createDirectories(storage);
        } catch (IOException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private boolean isImageFile(String fileNameExtension) {
        return Arrays.asList(new String[]{"png", "jpg", "jpeg", "bmp"})
                .contains(fileNameExtension.trim().toLowerCase());
    }

    public String storeFile(MultipartFile file) {
        try {

            if (file.isEmpty()) {
                return null;
            }

            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            if (!isImageFile(fileExtension)) {
                throw new RuntimeException("You can only upload image file");
            }

            float fileSizeInMegabytes = file.getSize() / 1_000_000f;
            if (fileSizeInMegabytes > 5.0f) {
                throw new RuntimeException("File must be <= 5Mb");
            }
            String generatedFileName = UUID.randomUUID().toString().replace("-", "");
//            while (imageRepository.findByUrl(generatedFileName).isPresent()) {
//                generatedFileName = UUID.randomUUID().toString().replace("-", "");
//            }
            generatedFileName += "." + fileExtension;
            Path destinationFilePath = this.storage.resolve(Paths.get(generatedFileName)).normalize().toAbsolutePath();
            if (!destinationFilePath.getParent().equals(this.storage.toAbsolutePath())) {
                throw new RuntimeException("Cannot store file out side current  directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
//                imageRepository.save(Image.builder().url(generatedFileName).build());
            }
            System.out.println(destinationFilePath);
            return generatedFileName;
        } catch (IOException | RuntimeException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    public byte[] readFileContent(String fileName) {
        try {
            Path file = storage.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new RuntimeException("Could not read file: " + fileName);
            }
            return StreamUtils.copyToByteArray(resource.getInputStream());
        } catch (Exception ex) {
            throw new RuntimeException("Error reading file: " + fileName, ex);
        }
    }
}
