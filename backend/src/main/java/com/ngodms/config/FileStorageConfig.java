package com.ngodms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageConfig {

    @Value("${app.file.upload-dir:uploads/learning-materials}")
    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }
}
