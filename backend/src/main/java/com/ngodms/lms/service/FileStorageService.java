package com.ngodms.lms.service;

import com.ngodms.common.exception.BadRequestException;
import com.ngodms.config.FileStorageConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final FileStorageConfig config;

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
        "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt", "png", "jpg", "jpeg", "mp4");

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        String original = file.getOriginalFilename();
        String extension = original != null && original.contains(".")
            ? original.substring(original.lastIndexOf(".") + 1).toLowerCase()
            : "";

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("File type not allowed: " + extension);
        }

        try {
            Path dir = Paths.get(config.getUploadDir());
            Files.createDirectories(dir);

            String fileName = UUID.randomUUID() + "." + extension;
            Path target = dir.resolve(fileName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            throw new BadRequestException("Could not store file: " + e.getMessage());
        }
    }

    public void delete(String fileName) {
        try {
            Files.deleteIfExists(Paths.get(config.getUploadDir()).resolve(fileName));
        } catch (IOException ignored) {
        }
    }
}
