package com.et4.app.controller;

import com.et4.app.model.Image;
import com.et4.app.repository.ImageRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageController {

    private final ImageRepository images;

    public ImageController(ImageRepository images) {
        this.images = images;
    }

    // Body: { "dataUrl": "data:image/png;base64,AAAA..." }
    @PostMapping
    public ResponseEntity<?> upload(@RequestBody Map<String, String> body) {
        String dataUrl = body.get("dataUrl");
        if (dataUrl == null || dataUrl.isBlank()) {
            return ResponseEntity.badRequest().body("Missing dataUrl");
        }

        // Parse data URL
        if (!dataUrl.startsWith("data:image/")) {
            return ResponseEntity.badRequest().body("Only data:image/* URLs are accepted");
        }
        int comma = dataUrl.indexOf(',');
        if (comma < 0) return ResponseEntity.badRequest().body("Invalid data URL");

        String meta = dataUrl.substring(5, comma); // e.g. "image/png;base64"
        String base64 = dataUrl.substring(comma + 1);

        String contentType;
        int sc = meta.indexOf(';');
        if (sc > 0) {
            contentType = meta.substring(0, sc); // image/png
        } else {
            contentType = meta;
        }

        byte[] bytes = Base64.getDecoder().decode(base64.getBytes(StandardCharsets.UTF_8));
        if (bytes.length == 0) return ResponseEntity.badRequest().body("Empty image");

        // size cap 10MB
        if (bytes.length > 10 * 1024 * 1024) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("Image exceeds 10MB");
        }

        Image img = new Image();
        img.setContentType(contentType);
        img.setData(bytes);
        Image saved = images.save(img);

        return ResponseEntity.ok(Map.of(
                "id", saved.getId(),
                "url", "/api/images/" + saved.getId()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> get(@PathVariable Integer id) {
        Optional<Image> opt = images.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Image img = opt.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(img.getContentType()));
        // 30 days cache
        headers.setCacheControl(CacheControl.maxAge(Duration.ofDays(30)).cachePublic());
        return new ResponseEntity<>(img.getData(), headers, HttpStatus.OK);
    }
}
