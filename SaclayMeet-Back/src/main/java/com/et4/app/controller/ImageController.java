package com.et4.app.controller;

import com.et4.app.model.Image;
import com.et4.app.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {

    private final ImageRepository imageRepository;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> get(@PathVariable Integer id) {
        Image img = imageRepository.findById(id).orElse(null);
        if (img == null) return ResponseEntity.notFound().build();

        String ct = img.getContentType() != null ? img.getContentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE;
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(ct))
                .cacheControl(CacheControl.noCache())
                .body(img.getContent());
    }
}
