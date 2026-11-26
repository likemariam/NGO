package com.ngodms.lms;

import com.ngodms.lms.repository.MaterialRepository;
import com.ngodms.lms.service.FileStorageService;
import com.ngodms.lms.service.MaterialService;
import com.ngodms.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MaterialServiceTest {

    @Mock MaterialRepository materialRepository;
    @Mock FileStorageService fileStorageService;
    @Mock UserRepository userRepository;
    @InjectMocks MaterialService materialService;

    @Test
    void findAll_returnsEmptyList_whenNoMaterials() {
        when(materialRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of());
        assertThat(materialService.findAll()).isEmpty();
    }
}
