import { useRef } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Camera } from "lucide-react";

// Same normalizer logic you used for activities
const normalizeImageSrc = (image) => {
  if (!image) return "";
  const s = String(image);
  if (s.startsWith("data:image/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/api/images")) return `http://localhost:8080${s}`;
  return s; // last resort
};

/**
 * ProfilePhoto
 * Props:
 *  - value: string | null (data URL or http(s) URL or /api/images/..)
 *  - onChange: (newValue: string | null) => void
 *  - editable: boolean (show upload/remove controls)
 *  - size: number (px)
 *  - initials: string fallback initials for Avatar when no image
 */
const ProfilePhoto = ({
  value,
  onChange,
  editable = false,
  size = 110,
  initials = "?"
}) => {
  const fileRef = useRef(null);
  const src = normalizeImageSrc(value);

  const pickFile = () => fileRef.current?.click();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Unsupported file type. Please choose an image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      window.alert("Image too large (max 10MB).");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result || "");
      onChange?.(dataUrl); // push data URL to parent state
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {src ? (
        <img
          src={src}
          alt="Profile"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #6E003C"
          }}
          loading="lazy"
          onError={(e) => {
            // if image fails to load, clear it so Avatar fallback shows next render
            onChange?.(null);
          }}
        />
      ) : (
        <Avatar
          alt="Profile initials"
          sx={{ width: size, height: size, fontSize: Math.max(18, size * 0.25) }}
        >
          {initials}
        </Avatar>
      )}

      {editable && (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
          <Button
            variant="contained"
            color="salmon"
            onClick={pickFile}
            startIcon={<Camera size={18} />}
          >
            Upload
          </Button>
          {value && (
            <Button
              variant="outlined"
              color="salmon"
              onClick={() => onChange?.(null)}
            >
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
